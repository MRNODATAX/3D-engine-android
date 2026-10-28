package io.github.mrnodatax.mateengine.overlay

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.app.Service
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.content.pm.ServiceInfo
import android.content.res.Configuration
import android.graphics.Color
import android.graphics.PixelFormat
import android.os.Build
import android.os.Handler
import android.os.IBinder
import android.hardware.display.DisplayManager
import android.os.Looper
import android.util.Log
import android.view.Gravity
import android.view.MotionEvent
import android.view.WindowInsets
import android.view.View
import android.view.WindowManager
import android.webkit.WebResourceRequest
import io.github.mrnodatax.mateengine.chat.ChatController
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.cancel
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.launch
import android.webkit.ConsoleMessage
import android.webkit.WebChromeClient
import android.webkit.WebResourceError
import android.webkit.WebResourceResponse
import android.webkit.WebViewClient
import android.webkit.WebSettings
import android.webkit.WebView
import android.widget.FrameLayout
import androidx.core.app.NotificationCompat
import androidx.webkit.WebViewAssetLoader
import io.github.mrnodatax.mateengine.MainActivity
import io.github.mrnodatax.mateengine.R
import io.github.mrnodatax.mateengine.data.AppRepository
import io.github.mrnodatax.mateengine.data.AvatarAsset
import io.github.mrnodatax.mateengine.data.OverlayPrefs
import io.github.mrnodatax.mateengine.chat.ChatRepository
import io.github.mrnodatax.mateengine.voice.VoicePack
import org.json.JSONObject
import java.io.File

/**
 * Menampilkan avatar sebagai window overlay transparan di atas aplikasi lain.
 *
 * Batasan platform yang disengaja:
 * - Window overlay berbentuk persegi; sentuhan pada piksel transparan tetap ditangkap overlay.
 * - Sentuhan pada area kosong di sekitar model **tidak pernah** diteruskan ke aplikasi di bawah.
 *   Jendela avatar selalu menangkap sentuhan di dalam batasnya (permintaan pemilik aplikasi:
 *   area kosong tidak boleh tembus), jadi tidak ada flag NOT_TOUCHABLE sama sekali.
 * - "Kunci posisi" berarti avatar tidak bisa digeser; sentuhan tetap ditahan oleh overlay.
 */
class OverlayService : Service() {

    private lateinit var windowManager: WindowManager
    private lateinit var repository: AppRepository
    private val mainHandler = Handler(Looper.getMainLooper())

    private var rootView: OverlayRoot? = null
    private var webView: WebView? = null
    private var params: WindowManager.LayoutParams? = null
    private var rendererReady = false
    private var loadedAvatarFileName: String? = null
    private var notificationManager: NotificationManager? = null
    private var memorySaver = true
    private var lastFpsReportAt = 0L
    private var lastTrimAt = 0L

    // ---- bingkai & jendela siluet (v0.1.10) ----
    // `designX/designY/designWidth/designHeight` adalah jendela **desain**: ukuran yang dipakai
    // kanvas WebView. Jendela yang benar-benar dipasang (`params`) lebih kecil dan mengikuti
    // siluet tubuh; kanvas digambar penuh lalu digeser dengan margin negatif, sehingga avatar
    // TIDAK ikut mengecil saat jendelanya menyusut.
    private var designX = 0
    private var designY = 0
    private var designWidth = 0
    private var designHeight = 0
    private var lastFrame: OverlayGeometry.Frame? = null
    private var lastVisible: OverlayGeometry.Rect? = null
    private var bodyBox: OverlayGeometry.BodyBox? = null
    private var bodyBoxAt = 0L
    private var silhouetteSuspended = false
    private var lastResizeAt = 0L
    private var canvasOffsetX = 0
    private var canvasOffsetY = 0
    private var settleAnim: Runnable? = null
    private var nudgeReturn: OverlayGeometry.Placement? = null
    private var lastScreenWidth = 0
    private var lastScreenHeight = 0

    /**
     * Pemantau layar: rotasi, lipat, dan multi-window. `DisplayListener` dipakai sebagai jalur
     * utama karena layanan overlay tidak selalu menerima `onConfigurationChanged`.
     */
    private val displayListener = object : DisplayManager.DisplayListener {
        override fun onDisplayAdded(displayId: Int) = Unit
        override fun onDisplayRemoved(displayId: Int) = Unit
        override fun onDisplayChanged(displayId: Int) {
            mainHandler.post { onScreenChanged("display") }
        }
    }
    private val voicePack by lazy { VoicePack(this) }

    // ---- menu cepat (avatar diketuk 3×) ----
    private var menuView: QuickMenuView? = null
    private var menuParams: WindowManager.LayoutParams? = null
    private var menuController: QuickMenuController? = null
    private var menuChatJob: Job? = null
    private val serviceScope = CoroutineScope(SupervisorJob() + Dispatchers.Main.immediate)

    /** Chat AI di balon obrolan memakai ChatController yang sama dengan tab Chat. */
    private val chatController by lazy { ChatController(this) }

    /**
     * Pemangkasan memori berkala, setara peran `MemoryTrim.cs` di Mate Engine tetapi
     * memakai mekanisme Android: renderer membuang cache animasi/daftar render, JVM
     * melakukan GC bila pengguna mengaktifkan penghemat memori.
     */
    private val trimTask = object : Runnable {
        override fun run() {
            if (memorySaver) trimMemory(forced = false)
            mainHandler.postDelayed(this, TRIM_INTERVAL_MS)
        }
    }

    private val configurationReceiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context?, intent: Intent?) {
            mainHandler.post { applyLayout(recenter = false) }
        }
    }

    override fun onCreate() {
        super.onCreate()
        repository = AppRepository.get(this)
        windowManager = getSystemService(WindowManager::class.java)
        notificationManager = getSystemService(NotificationManager::class.java)
        createChannel()
        startInForeground(repository.state.value.selectedAvatar?.displayName)
        OverlayRuntime.update { it.copy(running = true, rendererReady = false, lastError = null) }
        voicePack.initialize()
        memorySaver = repository.state.value.overlay.memorySaver
        showOverlay()
        mainHandler.postDelayed(trimTask, TRIM_INITIAL_DELAY_MS)
        Log.i(TAG, "service onCreate selesai, overlay=${rootView != null}")
        registerReceiver(configurationReceiver, IntentFilter(Intent.ACTION_CONFIGURATION_CHANGED))
        runCatching {
            getSystemService(DisplayManager::class.java)?.registerDisplayListener(
                displayListener,
                mainHandler,
            )
        }.onFailure { Log.w(TAG, "DisplayListener tidak terpasang: ${it.message}") }
    }

    /**
     * Dipanggil saat layar berubah bentuk (rotasi/lipat). Ukuran baru **tidak** dibaca di dalam
     * callback: nilainya masih basi. Ukuran dibaca ulang setelah layout (`post`) dan sekali lagi
     * setelah 150 ms, karena sebagian perangkat baru menyelesaikan transisi setelah itu.
     */
    override fun onConfigurationChanged(newConfig: Configuration) {
        super.onConfigurationChanged(newConfig)
        mainHandler.post { onScreenChanged("config") }
    }

    private fun onScreenChanged(source: String) {
        val (screenWidth, screenHeight) = screenBounds()
        Log.i(TAG, "layar berubah ($source): ${screenWidth}x$screenHeight")
        remapPositionForNewScreen(screenWidth, screenHeight)
        rootView?.post {
            applyLayout(recenter = false)
            rootView?.postDelayed({ applyLayout(recenter = false) }, 150)
        }
    }

    /** Peta posisi proporsional supaya avatar tidak "nyangkut" di luar layar setelah rotasi. */
    private fun remapPositionForNewScreen(screenWidth: Int, screenHeight: Int) {
        val prefs = repository.state.value.overlay
        if (lastScreenWidth <= 0 || lastScreenHeight <= 0) {
            lastScreenWidth = screenWidth
            lastScreenHeight = screenHeight
            return
        }
        if (lastScreenWidth == screenWidth && lastScreenHeight == screenHeight) return
        if (prefs.offsetX >= 0 && prefs.offsetY >= 0) {
            val scaleX = screenWidth.toFloat() / lastScreenWidth
            val scaleY = screenHeight.toFloat() / lastScreenHeight
            val newX = (prefs.offsetX * scaleX).toInt()
            val newY = (prefs.offsetY * scaleY).toInt()
            repository.updateOverlay { it.copy(offsetX = newX, offsetY = newY) }
            Log.i(TAG, "posisi avatar dipetakan ulang (${prefs.offsetX}, ${prefs.offsetY}) -> ($newX, $newY)")
        }
        lastScreenWidth = screenWidth
        lastScreenHeight = screenHeight
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        val action = intent?.action ?: ACTION_START
        Log.i(TAG, "service onStartCommand action=$action")
        when (action) {
            ACTION_STOP -> {
                stopSelf()
                return START_NOT_STICKY
            }
            ACTION_APPLY_SETTINGS -> applySettings()
            ACTION_RELOAD_AVATAR -> reloadAvatar()
            ACTION_PLAY_ANIMATION -> playAnimation(intent?.getStringExtra(EXTRA_ANIMATION_ID))
            ACTION_STOP_ANIMATION -> evaluate("window.MateEngine.stopAnimation()")
            ACTION_SPEAK -> speak(intent?.getStringExtra(EXTRA_SPEECH_TEXT), intent?.getIntExtra(EXTRA_SPEECH_MS, 2600) ?: 2600)
            ACTION_STOP_SPEAKING -> evaluate("window.MateEngine.stopTalking()")
            ACTION_TRIM_MEMORY -> trimMemory(forced = true)
            ACTION_LOCOMOTION -> applyLocomotion(intent?.getStringExtra(EXTRA_LOCOMOTION))
            ACTION_PLAY_BUILTIN -> evaluate("window.MateEngine.playBuiltin(${JSONObject.quote(intent?.getStringExtra(EXTRA_BUILTIN) ?: "idle")})")
            ACTION_SET_SEATED -> {
                val seated = intent?.getBooleanExtra(EXTRA_SEATED, true) ?: true
                evaluate("window.MateEngine.setSeated($seated)")
                Log.i(TAG, "mode duduk: $seated")
            }
            ACTION_QUICK_MENU -> showQuickMenu(
                when (intent?.getStringExtra(EXTRA_QUICK_SCREEN)) {
                    "clips" -> QuickMenuScreen.CLIPS
                    "chat" -> QuickMenuScreen.CHAT
                    else -> QuickMenuScreen.ROOT
                },
            )
            ACTION_RESET_POSE -> {
                evaluate("window.MateEngine.resetPose()")
                Log.i(TAG, "pose avatar direset ke pose rileks")
            }
            ACTION_SPEECH_ENVELOPE -> {
                val levels = intent?.getFloatArrayExtra(EXTRA_ENVELOPE) ?: FloatArray(0)
                val duration = intent?.getIntExtra(EXTRA_SPEECH_MS, 2000) ?: 2000
                applySpeechEnvelope(levels, duration)
            }
            else -> Unit
        }
        return START_NOT_STICKY
    }

    override fun onBind(intent: Intent?): IBinder? = null

    override fun onDestroy() {
        Log.i(TAG, "service onDestroy")
        runCatching { unregisterReceiver(configurationReceiver) }
        runCatching { getSystemService(DisplayManager::class.java)?.unregisterDisplayListener(displayListener) }
        settleAnim?.let { mainHandler.removeCallbacks(it) }
        webView?.let { view ->
            (view.parent as? FrameLayout)?.removeView(view)
            view.destroy()
        }
        hideQuickMenu()
        menuChatJob?.cancel()
        runCatching { chatController.shutdown() }
        runCatching { serviceScope.cancel() }
        rootView?.let { view -> runCatching { windowManager.removeView(view) } }
        webView = null
        rootView = null
        params = null
        mainHandler.removeCallbacks(trimTask)
        OverlayRuntime.markStopped()
        voicePack.release()
        super.onDestroy()
    }

    // ---------------------------------------------------------------- overlay window

    private fun showOverlay() {
        val prefs = repository.state.value.overlay
        val density = resources.displayMetrics.density
        val (screenWidth, screenHeight) = screenBounds()
        val frame = currentFrame()
        val (width, height) = designSize()
        lastScreenWidth = screenWidth
        lastScreenHeight = screenHeight
        val placement = if (prefs.offsetX >= 0 && prefs.offsetY >= 0) {
            OverlayGeometry.clampToFrame(prefs.offsetX, prefs.offsetY, width, height, frame)
        } else {
            // Default: pojok kanan bawah di dalam bingkai.
            val margin = (12 * density).toInt()
            OverlayGeometry.clampToFrame(
                frame.right - width - margin,
                frame.bottom - height - margin,
                width,
                height,
                frame,
            )
        }
        designX = placement.x
        designY = placement.y
        designWidth = width
        designHeight = height
        lastFrame = frame

        // Tanpa FLAG_NOT_TOUCHABLE: seluruh persegi jendela menahan sentuhan, termasuk piksel
        // transparan di samping model. FLAG_NOT_TOUCH_MODAL hanya membuat jendela lain tetap bisa
        // fokus (mis. papan ketik), bukan meneruskan sentuhan ke aplikasi di bawah.
        val windowFlags = WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE or
            WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL or
            WindowManager.LayoutParams.FLAG_LAYOUT_IN_SCREEN

        val layoutParams = WindowManager.LayoutParams(
            width,
            height,
            WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY,
            windowFlags,
            PixelFormat.TRANSLUCENT,
        ).apply {
            gravity = Gravity.TOP or Gravity.START
            x = placement.x
            y = placement.y
            alpha = prefs.opacityPercent / 100f
            title = "MateEngine avatar"
        }

        val container = OverlayRoot(this)
        val view = buildWebView()
        container.addView(
            view,
            FrameLayout.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT, FrameLayout.LayoutParams.MATCH_PARENT),
        )
        container.onDragFinished = { x, y ->
            // x/y adalah posisi **desain**, bukan posisi jendela siluet yang lebih kecil.
            repository.updateOverlay { it.copy(offsetX = x, offsetY = y) }
            Log.i(TAG, "overlay digeser ke ($x, $y) desain ${width}x$height")
        }
        container.onScaleChanged = { percent ->
            repository.updateOverlay { it.copy(scalePercent = percent) }
            applyLayout(recenter = false)
        }
        container.onPointer = { phase, x, y -> pipePointer(phase, x, y) }
        container.onTripleTap = { showQuickMenu() }
        container.onDragVelocity = { vx, vy ->
            evaluate("window.MateEngine.setDragVelocity($vx, $vy)")
        }
        container.isDragEnabled = !prefs.locked

        runCatching {
            windowManager.addView(container, layoutParams)
        }.onFailure { error ->
            Log.e(TAG, "gagal menambah overlay", error)
            OverlayRuntime.reportError("Overlay ditolak sistem: ${error.message ?: error::class.simpleName}")
            stopSelf()
            return
        }

        rootView = container
        webView = view
        params = layoutParams
        applySilhouette(force = true)
        Log.i(TAG, "overlay window ditambahkan ${width}x$height di (${placement.x}, ${placement.y}), locked=${prefs.locked}")

        view.loadUrl("$ASSET_BASE/assets/renderer/index.html")
    }

    private fun buildWebView(): WebView {
        val assetLoader = WebViewAssetLoader.Builder()
            .setDomain(ASSET_HOST)
            .addPathHandler("/assets/", WebViewAssetLoader.AssetsPathHandler(this))
            .addPathHandler("/avatars/", WebViewAssetLoader.InternalStoragePathHandler(this, File(filesDir, "avatars")))
            .addPathHandler("/animations/", WebViewAssetLoader.InternalStoragePathHandler(this, File(filesDir, "animations")))
            .build()

        return WebView(this).apply {
            setBackgroundColor(Color.TRANSPARENT)
            setLayerType(View.LAYER_TYPE_HARDWARE, null)
            isVerticalScrollBarEnabled = false
            isHorizontalScrollBarEnabled = false
            overScrollMode = View.OVER_SCROLL_NEVER
            settings.apply {
                javaScriptEnabled = true
                domStorageEnabled = true
                allowFileAccess = false
                allowContentAccess = false
                mediaPlaybackRequiresUserGesture = false
                cacheMode = WebSettings.LOAD_DEFAULT
                mixedContentMode = WebSettings.MIXED_CONTENT_NEVER_ALLOW
            }
            addJavascriptInterface(RendererBridge { message -> mainHandler.post { handleRendererMessage(message) } }, "MateBridge")
            webChromeClient = object : WebChromeClient() {
                override fun onConsoleMessage(message: ConsoleMessage): Boolean {
                    Log.w(TAG, "console ${message.messageLevel()}: ${message.message()} (${message.sourceId()}:${message.lineNumber()})")
                    return true
                }
            }
            webViewClient = object : WebViewClient() {
                override fun onReceivedError(
                    view: WebView,
                    request: WebResourceRequest,
                    error: WebResourceError,
                ) {
                    Log.e(TAG, "webview error ${error.errorCode} ${request.url}: ${error.description}")
                }

                override fun shouldInterceptRequest(
                    view: WebView,
                    request: WebResourceRequest,
                ): WebResourceResponse? = assetLoader.shouldInterceptRequest(request.url)

                override fun shouldOverrideUrlLoading(view: WebView, request: WebResourceRequest): Boolean {
                    // Renderer tidak boleh keluar dari aset lokal.
                    return request.url.host != ASSET_HOST
                }
            }
        }
    }

    /** Ukuran layar penuh. API 30+ memakai `WindowMetrics` supaya lipat/multi-window ikut benar. */
    private fun screenBounds(): Pair<Int, Int> {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            val bounds = runCatching { windowManager.currentWindowMetrics.bounds }.getOrNull()
            if (bounds != null && bounds.width() > 0 && bounds.height() > 0) {
                return bounds.width() to bounds.height()
            }
        }
        val metrics = resources.displayMetrics
        return metrics.widthPixels to metrics.heightPixels
    }

    /**
     * Inset sistem (status bar, navigasi, poni). Diperlukan supaya avatar tidak berhenti tepat
     * di bawah status bar atau di belakang garis navigasi — itulah "bingkai" yang diminta.
     */
    private fun systemInsets(): OverlayGeometry.Insets {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            val insets = runCatching {
                windowManager.currentWindowMetrics.windowInsets.getInsetsIgnoringVisibility(
                    WindowInsets.Type.systemBars() or WindowInsets.Type.displayCutout(),
                )
            }.getOrNull()
            if (insets != null) {
                return OverlayGeometry.Insets(insets.left, insets.top, insets.right, insets.bottom)
            }
        }
        val density = resources.displayMetrics.density
        // Cadangan API 26–29: tinggi status bar dari resource sistem, navigasi 48 dp.
        val statusId = resources.getIdentifier("status_bar_height", "dimen", "android")
        val statusBar = if (statusId > 0) resources.getDimensionPixelSize(statusId) else (24 * density).toInt()
        return OverlayGeometry.Insets(0, statusBar, 0, (48 * density).toInt())
    }

    private fun currentFrame(): OverlayGeometry.Frame {
        val density = resources.displayMetrics.density
        val (screenWidth, screenHeight) = screenBounds()
        val frame = OverlayGeometry.frame(
            screenWidth,
            screenHeight,
            systemInsets(),
            (FRAME_MARGIN_DP * density).toInt(),
        )
        lastFrame = frame
        return frame
    }

    /** Ukuran jendela **desain** (kanvas): tetap sama seperti sebelum v0.1.10. */
    private fun designSize(): Pair<Int, Int> {
        val prefs = repository.state.value.overlay
        val density = resources.displayMetrics.density
        val (screenWidth, screenHeight) = screenBounds()
        return OverlayGeometry.windowSize(screenWidth, screenHeight, prefs.scalePercent, density)
    }

    /**
     * Terapkan jendela siluet: jendela yang dipasang hanya sebesar tubuh + margin, sedangkan
     * kanvas WebView tetap berukuran desain dan digeser dengan margin negatif.
     *
     * Inilah yang memperkecil area kosong yang menelan sentuhan (permintaan: area kosong tetap
     * diblokir, tetapi blokirannya tidak boleh selebar layar) tanpa mengubah ukuran avatar.
     */
    private fun applySilhouette(force: Boolean = false) {
        val container = rootView ?: return
        val layoutParams = params ?: return
        if (designWidth <= 0 || designHeight <= 0) return
        val density = resources.displayMetrics.density
        val frame = currentFrame()
        val fresh = bodyBox != null && System.currentTimeMillis() - bodyBoxAt <= BODY_BOX_TTL_MS
        val box = if (fresh && !silhouetteSuspended) bodyBox else null
        val visible = OverlayGeometry.visibleRect(
            designX = designX,
            designY = designY,
            designWidth = designWidth,
            designHeight = designHeight,
            box = box,
            edgePx = (SILHOUETTE_EDGE_DP * density).toInt(),
            minSizePx = (MIN_TOUCH_DP * density).toInt(),
            frame = frame,
        )
        val tolerance = (SILHOUETTE_TOLERANCE_DP * density).toInt()
        val now = System.currentTimeMillis()
        if (!force) {
            if (!OverlayGeometry.shouldResize(lastVisible, visible, tolerance)) return
            // Paling cepat 4× per detik: tiap perubahan ukuran memicu relayout jendela.
            if (now - lastResizeAt < RESIZE_INTERVAL_MS) return
        }
        lastResizeAt = now
        lastVisible = visible
        layoutParams.width = visible.width
        layoutParams.height = visible.height
        layoutParams.x = visible.left
        layoutParams.y = visible.top
        runCatching { windowManager.updateViewLayout(container, layoutParams) }
            .onFailure { Log.w(TAG, "gagal menerapkan jendela siluet: ${it.message}") }
        // Kanvas penuh, digeser negatif: avatar tidak mengecil, hanya jendelanya yang memotong.
        canvasOffsetX = visible.left - designX
        canvasOffsetY = visible.top - designY
        webView?.let { view ->
            val paramsChild = view.layoutParams as? FrameLayout.LayoutParams
            if (paramsChild != null) {
                paramsChild.width = designWidth
                paramsChild.height = designHeight
                paramsChild.leftMargin = -canvasOffsetX
                paramsChild.topMargin = -canvasOffsetY
                view.layoutParams = paramsChild
            }
        }
        val blocked = OverlayGeometry.blockedFraction(designWidth, designHeight, visible)
        Log.i(
            TAG,
            "jendela siluet ${visible.width}x${visible.height} di (${visible.left}, ${visible.top}) " +
                "= ${(blocked * 100).toInt()}% dari desain ${designWidth}x$designHeight",
        )
    }

    /**
     * Geser jendela desain (dan jendela siluet mengikutinya) lalu jepit ke bingkai.
     * Dipakai saat pengguna menggeser avatar dan saat reaksi "mundur/maju".
     */
    private fun moveDesignTo(x: Int, y: Int, animate: Boolean = false) {
        val frame = currentFrame()
        val target = OverlayGeometry.clampToFrame(x, y, designWidth, designHeight, frame)
        if (!animate) {
            designX = target.x
            designY = target.y
            applySilhouette(force = true)
            return
        }
        settleAnim?.let { mainHandler.removeCallbacks(it) }
        val fromX = designX
        val fromY = designY
        val startedAt = System.currentTimeMillis()
        val duration = 320f
        val step = object : Runnable {
            override fun run() {
                val progress = ((System.currentTimeMillis() - startedAt) / duration).coerceIn(0f, 1f)
                // Ease-out kubik: cepat di awal, lembut saat masuk bingkai.
                val eased = 1f - (1f - progress) * (1f - progress) * (1f - progress)
                designX = (fromX + (target.x - fromX) * eased).toInt()
                designY = (fromY + (target.y - fromY) * eased).toInt()
                applySilhouette(force = true)
                if (progress < 1f) mainHandler.postDelayed(this, 16) else settleAnim = null
            }
        }
        settleAnim = step
        mainHandler.post(step)
    }

    /** Posisi avatar saat ini sebagai nilai desain (dipakai gestur & simpan pengaturan). */
    private fun currentDesignPlacement(): OverlayGeometry.Placement =
        OverlayGeometry.Placement(designX, designY)

    private fun applyLayout(recenter: Boolean) {
        val prefs = repository.state.value.overlay
        val (width, height) = designSize()
        designWidth = width
        designHeight = height
        val frame = currentFrame()
        val target = if (recenter || prefs.offsetX < 0 || prefs.offsetY < 0) {
            val density = resources.displayMetrics.density
            val margin = (12 * density).toInt()
            OverlayGeometry.clampToFrame(frame.right - width - margin, frame.bottom - height - margin, width, height, frame)
        } else {
            OverlayGeometry.clampToFrame(prefs.offsetX, prefs.offsetY, width, height, frame)
        }
        designX = target.x
        designY = target.y
        // Ukuran desain berubah (slider skala / rotasi): pengukuran tubuh lama tidak berlaku.
        bodyBox = null
        applySilhouette(force = true)
    }

    private fun applySettings() {
        val prefs = repository.state.value.overlay
        applyLayout(recenter = false)
        params?.let { layoutParams ->
            layoutParams.alpha = prefs.opacityPercent / 100f
            // Jendela tetap menangkap sentuhan apa pun status kuncinya; yang berubah hanya
            // boleh-digeser atau tidak.
            rootView?.let { view ->
                view.isDragEnabled = !prefs.locked
                runCatching { windowManager.updateViewLayout(view, layoutParams) }
            }
        }
        evaluate("window.MateEngine.setTargetFps(${prefs.targetFps})")
        evaluate("window.MateEngine.setQuality(${JSONObject.quote(prefs.quality)})")
        evaluate("window.MateEngine.setAnimationSpeed(${repository.state.value.animationSpeedPercent / 100f})")
        evaluate("window.MateEngine.setLocomotion(${JSONObject.quote(prefs.motion)})")
        memorySaver = prefs.memorySaver
        voicePack.setEnabled(ChatRepository.get(this).state.value.settings.voicePackEnabled)
        // Avatar bisa berubah ukuran/posisi: menu yang sedang terbuka ikut menyesuaikan.
        menuView?.post { updateMenuPosition() }
        notifyState(notificationText())
    }

    // ---------------------------------------------------------------- renderer

    private fun handleRendererMessage(raw: String) {
        val payload = runCatching { JSONObject(raw) }.getOrNull() ?: return
        // Log dipakai diagnosa di perangkat dan tangkapan layar CI.
        Log.i(TAG, "renderer: ${payload.optString("type")} ${raw.take(220)}")
        when (payload.optString("type")) {
            "renderer-ready" -> {
                rendererReady = true
                OverlayRuntime.update {
                    it.copy(rendererReady = true, webgl2 = payload.optBoolean("webgl2", false), lastError = null)
                }
                applySettings()
                loadSelectedAvatar()
            }
            "avatar-ready" -> {
                val info = payload.optJSONObject("info")
                val name = info?.optString("name")?.takeIf { it.isNotBlank() }
                OverlayRuntime.update { it.copy(modelName = name, lastError = null) }
                notifyState(notificationText())
                repository.state.value.selectedAnimation?.let { animation ->
                    if (repository.state.value.selectedAnimationId != null) playAnimation(animation.id, auto = true)
                }
            }
            "avatar-loading" -> OverlayRuntime.update { it.copy(lastError = null) }
            "fps" -> {
                val value = payload.optInt("value")
                val workMs = payload.optInt("workMs")
                OverlayRuntime.update { it.copy(fps = value, workMs = workMs) }
                // Notifikasi diperbarui paling sering sekali per 10 detik agar tidak memicu
                // pembaruan window terus-menerus.
                val now = System.currentTimeMillis()
                if (now - lastFpsReportAt >= 10_000) {
                    lastFpsReportAt = now
                    notifyState(notificationText())
                }
            }
            "stats" -> OverlayRuntime.update {
                it.copy(
                    triangles = payload.optInt("triangles"),
                    drawCalls = payload.optInt("calls"),
                    textures = payload.optInt("textures"),
                    bones = payload.optInt("bones"),
                    springJoints = payload.optInt("springJoints"),
                    renderScale = payload.optDouble("renderScale", 1.0).toFloat(),
                    qualityLevel = payload.optString("qualityLevel", "high"),
                    workMs = payload.optInt("workMs"),
                )
            }
            "quality-change" -> {
                OverlayRuntime.update {
                    it.copy(
                        renderScale = payload.optDouble("scale", 1.0).toFloat(),
                        qualityLevel = payload.optString("level", "high"),
                    )
                }
                Log.i(TAG, "kualitas render: ${payload.optString("direction")} ke ${payload.optDouble("scale")} (${payload.optString("level")})")
            }
            "textures" -> {
                OverlayRuntime.update { it.copy(texturesResized = payload.optInt("resized")) }
                Log.i(TAG, "tekstur diperkecil: ${payload.optInt("resized")}, dipertahankan: ${payload.optInt("kept")}, batas ${payload.optInt("maxSize")}px")
            }
            "talking" -> OverlayRuntime.update { it.copy(talking = true) }
            "body-box" -> {
                // Kotak tubuh (piksel kanvas) dari renderer: dasar jendela siluet. Dikirim
                // beberapa kali per detik hanya saat berubah nyata.
                // Payload berisi **fraksi** kanvas (0..1) — bebas satuan, jadi tidak perlu
                // menebak apakah WebView melaporkan CSS px atau piksel fisik.
                val fracLeft = payload.optDouble("left", Double.NaN)
                val fracTop = payload.optDouble("top", Double.NaN)
                val fracRight = payload.optDouble("right", Double.NaN)
                val fracBottom = payload.optDouble("bottom", Double.NaN)
                if (listOf(fracLeft, fracTop, fracRight, fracBottom).all { it.isFinite() }) {
                    // Potong **hanya mendatar**. Pengukuran tegak pernah membuat avatar tampak
                    // sebatas kaki di emulator (satu frame pengukuran yang meleset langsung
                    // memotong badan), sedangkan ruang kosong yang bisa dihemat memang di kiri
                    // dan kanan — model mengisi ~90 % tinggi kanvas tetapi hanya ~60 % lebarnya.
                    //
                    // Cadangan 2 % di kiri/kanan: pengukuran bisa sedikit meleset (mesh menonjol,
                    // spring bone), dan memotong lengan jauh lebih buruk daripada jendela 2 %
                    // lebih lebar.
                    val left = ((fracLeft - SAFETY_MARGIN).coerceIn(0.0, 1.0) * designWidth).toInt()
                    val top = 0
                    val right = ((1.0 - fracRight + SAFETY_MARGIN).coerceIn(0.0, 1.0) * designWidth).toInt()
                    val bottom = designHeight
                    Log.i(
                        TAG,
                        "kotak tubuh: fraksi ${fracLeft}/${fracTop}/${fracRight}/${fracBottom} " +
                            "-> px ($left, $top) - ($right, $bottom) dari desain ${designWidth}x$designHeight " +
                            "(css ${payload.optDouble("cssWidth")}x${payload.optDouble("cssHeight")})",
                    )
                    // Nilai dari renderer adalah **celah** dari tiap tepi, bukan tepi kotak:
                    // lebar badan = 1 - kiri - kanan, tinggi = 1 - atas - bawah.
                    val fracWidth = 1.0 - fracLeft - fracRight
                    val fracHeight = 1.0 - fracTop - fracBottom
                    if (fracWidth < MIN_BODY_FRACTION || fracHeight < MIN_BODY_FRACTION) {
                        // Frame pengukuran belum sah (tulang tanpa matriks dunia). Dulu kotak
                        // setipis 0,3 % sempat dipakai: jendela menyempit jadi garis dan hanya
                        // sepatu yang tampak di emulator. Lebih baik tetap memakai kotak lama.
                        Log.w(
                            TAG,
                            "kotak tubuh terlalu kecil (${fracWidth}x${fracHeight} fraksi), diabaikan",
                        )
                    } else if (right > left && bottom > top) {
                        // Dihaluskan: pengukuran mentah berubah ratusan piksel tiap frame saat
                        // klip berganti atau kamera membingkai ulang.
                        val measured = OverlayGeometry.BodyBox(left, top, right, bottom)
                        bodyBox = OverlayGeometry.smoothBox(bodyBox, measured, SMOOTH_ALPHA)
                        bodyBoxAt = System.currentTimeMillis()
                        if (!silhouetteSuspended) applySilhouette()
                    } else {
                        Log.w(TAG, "kotak tubuh tidak masuk akal (fraksi $fracLeft/$fracTop/$fracRight/$fracBottom), diabaikan")
                    }
                }
            }
            "touch-zone" -> rootView?.setTouchOnBody(payload.optBoolean("inside", false))
            "reaction" -> {
                val style = payload.optString("style")
                Log.i(TAG, "reaksi: $style (zona ${payload.optString("zone", "-")}, sumber ${payload.optString("source", "-")})")
            }
            "reaction-end" -> Log.i(TAG, "reaksi selesai: ${payload.optString("style")}")
            "reaction-rejected" -> Log.i(
                TAG,
                "reaksi ditolak: ${payload.optString("style")} (aktif: ${payload.optString("active", "-")})",
            )
            "reaction-sfx" -> {
                val key = payload.optString("name")
                if (key.isNotBlank() && ChatRepository.get(this).state.value.settings.voicePackEnabled) {
                    val event = VoicePack.Event.fromKey(key)
                    if (event != null) {
                        // Efek reaksi lebih pelan dari klik UI supaya tidak mengagetkan.
                        voicePack.play(event, 0.7f)
                        Log.i(TAG, "sfx reaksi: $key")
                    }
                }
            }
            "nudge" -> {
                val dx = payload.optInt("dx")
                val dy = payload.optInt("dy")
                if (dx != 0 || dy != 0) applyNudge(dx, dy, payload.optString("style"))
            }
            "debug-view" -> Log.i(TAG, "debug-view $payload")
            "debug-paint" -> Log.i(TAG, "debug-paint $payload")
            "motion-state" -> {
                // Jejak gerak tiap 5 detik: bukti bahwa sendi benar-benar bergerak, sekaligus
                // sumber angka "motion {...}" yang dibaca uji emulator.
                Log.i(TAG, "motion $payload")
            }
            "memory-trimmed" -> Log.i(TAG, "memori dipangkas: $raw")
            "animation-playing" -> {
                val name = payload.optString("name").takeIf { it.isNotBlank() }
                OverlayRuntime.update { it.copy(animationName = name) }
            }
            "animation-stopped" -> OverlayRuntime.update { it.copy(animationName = null, clipName = null) }
            "clip-changed" -> {
                OverlayRuntime.update { it.copy(clipName = payload.optString("clip").takeIf { value -> value.isNotBlank() }) }
            }
            "seated" -> {
                val seated = payload.optBoolean("seated")
                OverlayRuntime.update { it.copy(seated = seated) }
                Log.i(TAG, "avatar ${if (seated) "duduk" else "berdiri"}")
            }
            "error" -> {
                val message = payload.optString("message", "Renderer melaporkan kesalahan.")
                Log.w(TAG, "renderer error ${payload.optString("code")}: $message")
                OverlayRuntime.reportError(message)
                notifyState(message)
            }
        }
    }

    private fun evaluate(script: String) {
        mainHandler.post {
            webView?.evaluateJavascript(script, null)
        }
    }

    private fun avatarUrl(asset: AvatarAsset): String = "$ASSET_BASE/avatars/${asset.fileName}"

    private fun loadSelectedAvatar() {
        val state = repository.state.value
        val asset = state.selectedAvatar
        if (asset == null) {
            OverlayRuntime.update { it.copy(modelName = null) }
            OverlayRuntime.reportError("Belum ada model. Impor berkas .vrm terlebih dahulu.")
            notifyState("Belum ada model avatar")
            return
        }
        if (!repository.avatarFile(asset).isFile) {
            OverlayRuntime.reportError("Berkas model tidak ditemukan. Impor ulang berkas .vrm.")
            return
        }
        if (loadedAvatarFileName == asset.fileName && rendererReady) {
            // Avatar yang sama sudah dimuat; cukup sinkronkan pengaturan.
            applySettings()
            return
        }
        loadedAvatarFileName = asset.fileName
        evaluate("window.MateEngine.loadAvatar(${JSONObject.quote(avatarUrl(asset))})")
    }

    private fun applyLocomotion(mode: String?) {
        val value = when (mode) {
            "walk", "dance" -> mode
            "dance-next" -> {
                evaluate("window.MateEngine.nextDance()")
                "dance"
            }
            else -> "idle"
        }
        repository.updateOverlay { it.copy(motion = value) }
        if (value != "dance-next") evaluate("window.MateEngine.setLocomotion(${JSONObject.quote(value)})")
        Log.i(TAG, "gerak prosedural: $value")
    }

    private fun reloadAvatar() {
        loadedAvatarFileName = null
        rendererReady = webView != null
        if (webView != null) loadSelectedAvatar()
    }

    private fun playAnimation(id: String?, auto: Boolean = false) {
        val state = repository.state.value
        val animation = state.animations.firstOrNull { it.id == id } ?: state.selectedAnimation ?: return
        val file = repository.animationFile(animation)
        if (!file.isFile) {
            if (!auto) OverlayRuntime.reportError("Berkas animasi tidak ditemukan.")
            return
        }
        val loop = state.loopAnimation
        val script = "window.MateEngine.loadAnimation(" +
            "${JSONObject.quote("$ASSET_BASE/animations/${animation.fileName}")}, " +
            "${JSONObject.quote(animation.displayName)}, {loop: $loop})"
        evaluate(script)
    }

    // ---------------------------------------------------------------- reaksi sentuhan

    private var lastHapticBucket = -1

    /** Getar halus tiap kelipatan 5% saat cubit, seperti kontrol sistem. */
    private fun hapticTick(percent: Int) {
        val bucket = percent / 5
        if (bucket == lastHapticBucket) return
        lastHapticBucket = bucket
        val vibrator = if (Build.VERSION.SDK_INT >= 31) {
            (getSystemService(VIBRATOR_MANAGER_SERVICE) as? android.os.VibratorManager)?.defaultVibrator
        } else {
            @Suppress("DEPRECATION")
            getSystemService(VIBRATOR_SERVICE) as? android.os.Vibrator
        } ?: return
        if (!vibrator.hasVibrator()) return
        runCatching {
            if (Build.VERSION.SDK_INT >= 26) {
                vibrator.vibrate(android.os.VibrationEffect.createOneShot(8, 60))
            } else {
                @Suppress("DEPRECATION")
                vibrator.vibrate(8)
            }
        }
    }

    // ---------------------------------------------------------------- menu cepat (3x ketuk)

    /**
     * Menu yang muncul setelah avatar diketuk tiga kali.
     *
     * Jendelanya terpisah dari jendela avatar karena isinya lebih lebar daripada avatar; dengan
     * begitu overlay avatar tetap transparan penuh dan menu bisa diletakkan di sisi yang lapang.
     * Jendela hanya menjadi fokus saat balon Chat dibuka, supaya aplikasi di bawah tidak kehilangan
     * fokus saat menu sekadar tampil.
     */
    private fun showQuickMenu(screen: QuickMenuScreen = QuickMenuScreen.ROOT) {
        if (OverlayRuntime.state.value.running.not()) return
        val controller = menuController ?: QuickMenuController().also { menuController = it }
        controller.seated = OverlayRuntime.state.value.seated
        controller.activeClip = OverlayRuntime.state.value.clipName
        controller.hasApiKey = chatController.ui.value.hasApiKey
        controller.screen = screen

        if (menuView == null) buildMenuWindow(controller) else {
            menuView?.render()
            updateMenuPosition()
        }
        setMenuFocusable(screen == QuickMenuScreen.CHAT)
        if (screen == QuickMenuScreen.CHAT) observeChat(controller)
        Log.i(TAG, "menu cepat dibuka: ${screen.name.lowercase()}")
    }

    private fun buildMenuWindow(controller: QuickMenuController) {
        val callbacks = QuickMenuCallbacks(
            onAction = { action -> performMenuAction(controller, action) },
            onClip = { key ->
                evaluate("window.MateEngine.playBuiltin(${JSONObject.quote(key)})")
                controller.activeClip = key
                hideQuickMenu()
            },
            onSend = { text -> sendChatFromMenu(text) },
            onClose = { hideQuickMenu() },
            onOpenChatApp = {
                hideQuickMenu()
                openAppScreen("chat")
            },
        )

        val host = QuickMenuView(this, controller, callbacks)
        host.render()

        val layoutParams = WindowManager.LayoutParams(
            WindowManager.LayoutParams.WRAP_CONTENT,
            WindowManager.LayoutParams.WRAP_CONTENT,
            WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY,
            // Bisa menerima sentuhan di dalam batasnya, meneruskan sisanya ke aplikasi di bawah.
            WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL or
                WindowManager.LayoutParams.FLAG_LAYOUT_IN_SCREEN or
                WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE,
            PixelFormat.TRANSLUCENT,
        ).apply {
            gravity = Gravity.TOP or Gravity.START
            softInputMode = WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE
            title = "MateEngine menu"
        }

        runCatching { windowManager.addView(host, layoutParams) }
            .onFailure { error ->
                // Tanpa menu, avatar tetap jalan; jangan sampai service ikut mati.
                Log.e(TAG, "gagal menampilkan menu cepat", error)
                OverlayRuntime.reportError("Menu cepat tidak bisa tampil: ${error.message ?: error::class.simpleName}")
                return
            }

        menuView = host
        menuParams = layoutParams
        host.post { updateMenuPosition() }
        // Tinggi kartu baru diketahui setelah layout; posisikan ulang sekali lagi.
        host.postDelayed({ updateMenuPosition() }, 120)
    }

    private fun updateMenuPosition() {
        val host = menuView ?: return
        val layoutParams = menuParams ?: return
        val metrics = resources.displayMetrics
        val margin = (12 * metrics.density).toInt()
        val menuWidth = if (host.width > 0) host.width else (300 * metrics.density).toInt()
        val menuHeight = if (host.height > 0) host.height else (300 * metrics.density).toInt()
        val avatar = params
        val (x, y) = if (avatar == null) {
            margin to (metrics.heightPixels / 3)
        } else {
            QuickMenuPlacement.forAvatar(
                avatarX = avatar.x,
                avatarY = avatar.y,
                avatarWidth = avatar.width,
                avatarHeight = avatar.height,
                menuWidth = menuWidth,
                menuHeight = menuHeight,
                screenWidth = metrics.widthPixels,
                screenHeight = metrics.heightPixels,
                marginPx = margin,
            )
        }
        if (layoutParams.x == x && layoutParams.y == y) return
        layoutParams.x = x
        layoutParams.y = y
        runCatching { windowManager.updateViewLayout(host, layoutParams) }
    }

    private fun setMenuFocusable(focusable: Boolean) {
        val host = menuView ?: return
        val layoutParams = menuParams ?: return
        val updated = if (focusable) {
            layoutParams.flags and WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE.inv()
        } else {
            layoutParams.flags or WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE
        }
        if (updated == layoutParams.flags) return
        layoutParams.flags = updated
        runCatching { windowManager.updateViewLayout(host, layoutParams) }
        if (focusable) host.requestFocus()
    }

    private fun hideQuickMenu() {
        menuChatJob?.cancel()
        menuChatJob = null
        val host = menuView ?: return
        menuView = null
        menuParams = null
        runCatching { windowManager.removeView(host) }
    }

    private fun performMenuAction(controller: QuickMenuController, action: QuickMenuAction) {
        when (action) {
            QuickMenuAction.ANIMATIONS -> {
                controller.activeClip = OverlayRuntime.state.value.clipName
                controller.screen = QuickMenuScreen.CLIPS
                setMenuFocusable(false)
                menuView?.render()
                menuView?.post { updateMenuPosition() }
            }
            QuickMenuAction.CHAT -> {
                controller.screen = QuickMenuScreen.CHAT
                setMenuFocusable(true)
                observeChat(controller)
                menuView?.render()
                menuView?.post { updateMenuPosition() }
                chatController.refresh()
            }
            QuickMenuAction.SEAT -> {
                val seated = !OverlayRuntime.state.value.seated
                evaluate("window.MateEngine.setSeated($seated)")
                controller.seated = seated
                OverlayRuntime.update { it.copy(seated = seated) }
                menuView?.render()
                Log.i(TAG, "menu cepat: duduk=$seated")
            }
            QuickMenuAction.SETTINGS -> {
                hideQuickMenu()
                openAppScreen("settings")
            }
        }
    }

    private fun sendChatFromMenu(text: String) {
        val controller = menuController ?: return
        chatController.refresh()
        if (!chatController.ui.value.hasApiKey) {
            controller.hasApiKey = false
            return
        }
        controller.error = null
        controller.sending = true
        menuView?.setBusy(true)
        chatController.send(text, serviceScope)
        Log.i(TAG, "menu cepat: pesan chat dikirim (${text.length} karakter)")
    }

    /** Menyalin status chat terbaru ke panel; balasan juga otomatis dibacakan ChatController. */
    private fun observeChat(controller: QuickMenuController) {
        menuChatJob?.cancel()
        menuChatJob = serviceScope.launch {
            chatController.ui.collect { ui ->
                controller.hasApiKey = ui.hasApiKey
                controller.sending = ui.sending
                controller.error = ui.error
                controller.showMessages(ui.messages)
                menuView?.render()
                menuView?.post { updateMenuPosition() }
            }
        }
    }

    private fun openAppScreen(screen: String) {
        runCatching {
            startActivity(
                Intent(this, MainActivity::class.java)
                    .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP)
                    .putExtra("screen", screen),
            )
        }
    }

    // ---------------------------------------------------------------- sentuhan

    /**
     * Meneruskan satu kejadian sentuh ke renderer beserta **koordinat kanvas**.
     *
     * Zona tubuh (kepala, pipi, tangan, perut, pinggul, lutut) ditentukan di sisi JS dari
     * posisi tulang — bukan lagi dari pita rasio tinggi jendela. Koordinat dikonversi dari
     * koordinat jendela ke koordinat kanvas: kanvas lebih besar dari jendela siluet dan
     * digeser [canvasOffsetX]/[canvasOffsetY].
     */
    private fun pipePointer(phase: String, x: Float, y: Float) {
        if (designWidth <= 0 || designHeight <= 0) return
        // Dikirim sebagai fraksi kanvas (0..1): renderer yang mengalikan dengan ukuran
        // kanvasnya sendiri, jadi tidak ada asumsi CSS px vs piksel fisik di sini.
        val fx = ((x + canvasOffsetX) / designWidth).coerceIn(0f, 1f)
        val fy = ((y + canvasOffsetY) / designHeight).coerceIn(0f, 1f)
        evaluate("window.MateEngine.pointer('$phase', $fx, $fy)")
    }

    /**
     * Geser kecil saat reaksi (mundur saat malu, maju saat peluk), selalu lewat penjepitan
     * bingkai. Setelah 2,2 detik avatar kembali ke posisi semula supaya sentuhan berulang tidak
     * mendorongnya ke pojok layar.
     */
    private fun applyNudge(dx: Int, dy: Int, style: String) {
        if (silhouetteSuspended) return
        val density = resources.displayMetrics.density
        val maxShift = (32 * density).toInt()
        val shiftX = dx.coerceIn(-maxShift, maxShift)
        val shiftY = dy.coerceIn(-maxShift, maxShift)
        val origin = nudgeReturn ?: currentDesignPlacement().also { nudgeReturn = it }
        moveDesignTo(designX + shiftX, designY + shiftY)
        Log.i(TAG, "reaksi $style menggeser avatar ($shiftX, $shiftY)")
        mainHandler.postDelayed({
            val back = nudgeReturn ?: origin
            nudgeReturn = null
            moveDesignTo(back.x, back.y, animate = true)
        }, 2200)
    }

    // ---------------------------------------------------------------- suara & memori

    /**
     * Menandai avatar sedang "berbicara": ekspresi mulut beranimasi singkat dan,
     * bila VoicePack aktif, klip stream chat diputar (peran `chatBotStreamClip`).
     */
    private fun speak(text: String?, durationMs: Int) {
        val chat = ChatRepository.get(this)
        if (chat.state.value.settings.voicePackEnabled) voicePack.play(VoicePack.Event.CHAT_STREAM)
        evaluate("window.MateEngine.startTalking(${durationMs.coerceIn(400, 20000)})")
        OverlayRuntime.update { it.copy(talking = true) }
        if (!text.isNullOrBlank()) Log.i(TAG, "ucapan diputar untuk ${text.length} karakter")
    }

    /**
     * Lip-sync memakai amplop amplitudo audio asli (RMS per 50 ms dari WAV Gemini TTS),
     * bukan pola sinus seperti sebelumnya.
     */
    private fun applySpeechEnvelope(levels: FloatArray, durationMs: Int) {
        if (levels.isEmpty()) {
            evaluate("window.MateEngine.startTalking(${durationMs.coerceIn(400, 60000)})")
            return
        }
        val json = levels.joinToString(prefix = "[", postfix = "]") { value ->
            String.format(java.util.Locale.US, "%.2f", value)
        }
        evaluate("window.MateEngine.setSpeechEnvelope($json, ${durationMs.coerceIn(200, 120000)})")
        OverlayRuntime.update { it.copy(talking = true) }
        Log.i(TAG, "lip-sync: ${levels.size} sampel amplop, ${durationMs}ms")
    }

    private fun trimMemory(forced: Boolean) {
        lastTrimAt = System.currentTimeMillis()
        evaluate("window.MateEngine.trimMemory()")
        val runtime = OverlayRuntime.state.value
        runCatching { Runtime.getRuntime().gc() }
        OverlayRuntime.update { it.copy(lastTrimAt = lastTrimAt) }
        if (forced) {
            OverlayRuntime.reportError("Pemangkasan memori dijalankan. FPS ${runtime.fps}, tekstur ${runtime.textures}.")
        }
        Log.i(TAG, "trim memori (forced=$forced) pada $lastTrimAt")
    }

    override fun onTrimMemory(level: Int) {
        super.onTrimMemory(level)
        // Padanan Android untuk MemoryTrim.cs: sistem menekan memori -> lepaskan cache renderer.
        if (level >= TRIM_MEMORY_RUNNING_LOW) {
            Log.i(TAG, "onTrimMemory level=$level, memangkas renderer")
            evaluate("window.MateEngine.trimMemory()")
            runCatching { webView?.clearCache(true) }
        }
    }

    // ---------------------------------------------------------------- notification

    private fun createChannel() {
        val channel = NotificationChannel(
            CHANNEL_ID,
            getString(R.string.notification_channel_name),
            NotificationManager.IMPORTANCE_LOW,
        ).apply {
            description = getString(R.string.notification_channel_description)
            setShowBadge(false)
        }
        notificationManager?.createNotificationChannel(channel)
    }

    private fun buildNotification(text: String): Notification {
        val contentIntent = PendingIntent.getActivity(
            this,
            0,
            Intent(this, MainActivity::class.java).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP),
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE,
        )
        val stopIntent = PendingIntent.getService(
            this,
            1,
            Intent(this, OverlayService::class.java).setAction(ACTION_STOP),
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE,
        )
        val animationIntent = PendingIntent.getService(
            this,
            2,
            Intent(this, OverlayService::class.java).setAction(ACTION_PLAY_ANIMATION),
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE,
        )
        return NotificationCompat.Builder(this, CHANNEL_ID)
            .setSmallIcon(R.drawable.ic_notification)
            .setContentTitle(getString(R.string.notification_title))
            .setContentText(text)
            .setContentIntent(contentIntent)
            .setOngoing(true)
            .setSilent(true)
            .setPriority(NotificationCompat.PRIORITY_LOW)
            .setCategory(NotificationCompat.CATEGORY_SERVICE)
            .addAction(0, getString(R.string.notification_stop), stopIntent)
            .addAction(0, getString(R.string.notification_play_animation), animationIntent)
            .build()
    }

    private fun startInForeground(modelName: String?) {
        val notification = buildNotification(modelName ?: getString(R.string.notification_no_model))
        if (Build.VERSION.SDK_INT >= 34) {
            startForeground(
                NOTIFICATION_ID,
                notification,
                ServiceInfo.FOREGROUND_SERVICE_TYPE_SPECIAL_USE,
            )
        } else {
            startForeground(NOTIFICATION_ID, notification)
        }
    }

    private fun notificationText(): String {
        val runtime = OverlayRuntime.state.value
        val model = runtime.modelName ?: getString(R.string.notification_no_model)
        return if (runtime.fps > 0) "$model · ${runtime.fps} fps" else model
    }

    private fun notifyState(text: String) {
        runCatching { notificationManager?.notify(NOTIFICATION_ID, buildNotification(text)) }
    }

    // ---------------------------------------------------------------- drag

    private inner class OverlayRoot(context: Context) : FrameLayout(context) {
        var isDragEnabled: Boolean = true
        var onDragFinished: ((Int, Int) -> Unit)? = null
        var onScaleChanged: ((Int) -> Unit)? = null
        var onPointer: ((String, Float, Float) -> Unit)? = null
        var onTripleTap: (() -> Unit)? = null
        var onDragVelocity: ((Float, Float) -> Unit)? = null
        private val taps = TapCounter()

        private var downRawX = 0f
        private var downRawY = 0f
        // Kecepatan geser untuk ayunan badan (piksel/detik).
        private var lastMoveX = 0f
        private var lastMoveY = 0f
        private var lastMoveAt = 0L
        private var lastVelocitySentAt = 0L
        private var startX = 0
        private var startY = 0
        private var dragging = false
        private var downTime = 0L
        private var designStartX = 0
        private var designStartY = 0
        /** Diisi dari JS (`touch-zone`): sentuhan mendarat di badan atau di margin kosong. */
        private var touchOnBody = false

        fun setTouchOnBody(value: Boolean) {
            touchOnBody = value
        }

        // Cubit dua jari: satu jari = geser, dua jari = ubah ukuran.
        private var pinching = false
        private var pinchStartDistance = 0f
        private var pinchStartPercent = 100
        private var lastScaleSentAt = 0L

        /**
         * Selalu `true`: semua sentuhan di dalam jendela ditahan di sini, tidak pernah diteruskan
         * ke WebView maupun ke aplikasi di bawah. Inilah yang membuat area kosong di sekitar model
         * tidak "tembus".
         */
        override fun onInterceptTouchEvent(event: MotionEvent): Boolean = true

        private fun distance(event: MotionEvent): Float {
            if (event.pointerCount < 2) return 0f
            val dx = event.getX(0) - event.getX(1)
            val dy = event.getY(0) - event.getY(1)
            return kotlin.math.hypot(dx, dy)
        }

        override fun onTouchEvent(event: MotionEvent): Boolean {
            val layoutParams = params ?: return false
            when (event.actionMasked) {
                MotionEvent.ACTION_DOWN -> {
                    downRawX = event.rawX
                    downRawY = event.rawY
                    downTime = System.currentTimeMillis()
                    // Jendela siluet dikunci selama gestur: ukurannya tidak boleh berubah di
                    // tengah gerakan (jendela yang mengecil saat jari menempel terasa "lepas").
                    silhouetteSuspended = true
                    touchOnBody = false
                    onPointer?.invoke("down", event.x, event.y)
                    val design = currentDesignPlacement()
                    designStartX = design.x
                    designStartY = design.y

                    lastMoveX = event.rawX
                    lastMoveY = event.rawY
                    lastMoveAt = downTime
                    startX = layoutParams.x
                    startY = layoutParams.y
                    dragging = false
                    pinching = false
                    return true
                }
                MotionEvent.ACTION_POINTER_DOWN -> {
                    if (event.pointerCount >= 2) {
                        pinching = true
                        dragging = false
                        pinchStartDistance = distance(event).coerceAtLeast(1f)
                        pinchStartPercent = repository.state.value.overlay.scalePercent
                    }
                    return true
                }
                MotionEvent.ACTION_MOVE -> {
                    if (pinching && event.pointerCount >= 2) {
                        val factor = distance(event) / pinchStartDistance
                        val percent = OverlayGeometry.scaleFromPinch(pinchStartPercent, factor)
                        val now = System.currentTimeMillis()
                        // Dibatasi ~16 pembaruan per detik supaya window tidak di-recycle terus-menerus.
                        if (percent != repository.state.value.overlay.scalePercent && now - lastScaleSentAt >= 60) {
                            lastScaleSentAt = now
                            onScaleChanged?.invoke(percent)
                            hapticTick(percent)
                        }
                        return true
                    }
                    if (!dragging && !pinching) onPointer?.invoke("move", event.x, event.y)
                    val dx = (event.rawX - downRawX).toInt()
                    val dy = (event.rawY - downRawY).toInt()
                    // Posisi terkunci: gerakan jari diabaikan, tetapi sentuhan tetap ditahan.
                    if (!isDragEnabled) return true
                    if (!dragging) {
                        // Geser hanya dimulai bila sentuhan **tidak** mengenai badan (margin
                        // kosong), atau setelah avatar ditahan ~0,3 dtk. Tanpa aturan ini,
                        // mengelus kepala akan ikut menyeret avatar ke seluruh layar.
                        val held = System.currentTimeMillis() - downTime >= GRAB_HOLD_MS
                        val canGrab = !touchOnBody || held
                        if (canGrab && (kotlin.math.abs(dx) > 8 || kotlin.math.abs(dy) > 8)) {
                            dragging = true
                            voicePack.play(VoicePack.Event.DRAG_START, 0.5f)
                        }
                    }
                    if (!dragging) return true

                    // Kecepatan geser (piksel/detik) dikirim ~20×/detik ke renderer supaya badan
                    // ikut miring seperti tertinggal, lalu mereda sendiri setelah jari berhenti.
                    val nowMs = System.currentTimeMillis()
                    val span = (nowMs - lastMoveAt).coerceAtLeast(16L)
                    if (nowMs - lastVelocitySentAt >= 50) {
                        val vx = (event.rawX - lastMoveX) * 1000f / span
                        val vy = (event.rawY - lastMoveY) * 1000f / span
                        lastMoveX = event.rawX
                        lastMoveY = event.rawY
                        lastMoveAt = nowMs
                        lastVelocitySentAt = nowMs
                        onDragVelocity?.invoke(vx, vy)
                    }

                    // Geser memakai posisi DESAIN; jendela siluet mengikuti dengan selisih tetap.
                    // Di luar bingkai gerakan diredam (karet), lalu dilepas kembali oleh pegas.
                    val frame = currentFrame()
                    val placement = OverlayGeometry.dragPlacement(
                        designStartX + dx,
                        designStartY + dy,
                        designWidth,
                        designHeight,
                        frame,
                    )
                    designX = placement.x
                    designY = placement.y
                    // Jangan menulis layoutParams di sini: posisi jendela dan pergeseran kanvas di
                    // dalamnya HARUS dihitung di satu tempat (`applySilhouette`). Dulu keduanya
                    // diubah terpisah, dan setelah avatar digeser isi kanvas bisa bergeser
                    // terhadap jendelanya (avatar tampak hanya sebatas kaki di emulator).
                    applySilhouette(force = true)
                    return true
                }
                MotionEvent.ACTION_POINTER_UP -> {
                    if (pinching) {
                        pinching = false
                        onDragFinished?.invoke(designX, designY)
                        Log.i(TAG, "pinch selesai pada ${repository.state.value.overlay.scalePercent}%")
                    }
                    return true
                }
                MotionEvent.ACTION_UP, MotionEvent.ACTION_CANCEL -> {
                    onPointer?.invoke("up", event.x, event.y)
                    when {
                        dragging -> {
                            onDragFinished?.invoke(designX, designY)
                            onDragVelocity?.invoke(0f, 0f)
                            voicePack.play(VoicePack.Event.DRAG_STOP, 0.5f)
                        }
                        !pinching -> {
                            // 3 ketukan cepat di titik yang sama membuka menu cepat. Reaksinya
                            // sendiri ditentukan JS (`reactions.js`), jadi tidak ada dua sumber.
                            if (taps.register(event.rawX, event.rawY, System.currentTimeMillis()) >= 3) {
                                taps.reset()
                                onTripleTap?.invoke()
                            }
                        }
                    }
                    silhouetteSuspended = false
                    dragging = false
                    pinching = false
                    // Kembalikan jendela ke dalam bingkai dengan pegas, lalu ukuran siluet
                    // diperbarui lagi (di luar gestur).
                    val frame = currentFrame()
                    val clamped = OverlayGeometry.clampToFrame(designX, designY, designWidth, designHeight, frame)
                    if (clamped.x != designX || clamped.y != designY) {
                        moveDesignTo(designX, designY, animate = true)
                    } else {
                        applySilhouette(force = true)
                    }
                    return true
                }
            }
            return false
        }
    }

    companion object {
        const val ACTION_START = "io.github.mrnodatax.mateengine.action.START_OVERLAY"
        const val ACTION_STOP = "io.github.mrnodatax.mateengine.action.STOP_OVERLAY"
        const val ACTION_APPLY_SETTINGS = "io.github.mrnodatax.mateengine.action.APPLY_SETTINGS"
        const val ACTION_RELOAD_AVATAR = "io.github.mrnodatax.mateengine.action.RELOAD_AVATAR"
        const val ACTION_PLAY_ANIMATION = "io.github.mrnodatax.mateengine.action.PLAY_ANIMATION"
        const val ACTION_STOP_ANIMATION = "io.github.mrnodatax.mateengine.action.STOP_ANIMATION"
        const val ACTION_SPEAK = "io.github.mrnodatax.mateengine.action.SPEAK_REPLY"
        const val ACTION_STOP_SPEAKING = "io.github.mrnodatax.mateengine.action.STOP_SPEAKING"
        const val ACTION_TRIM_MEMORY = "io.github.mrnodatax.mateengine.action.TRIM_MEMORY"
        const val ACTION_LOCOMOTION = "io.github.mrnodatax.mateengine.action.SET_LOCOMOTION"
        const val ACTION_PLAY_BUILTIN = "io.github.mrnodatax.mateengine.action.PLAY_BUILTIN"
        const val EXTRA_BUILTIN = "builtin_clip"
        const val ACTION_RESET_POSE = "io.github.mrnodatax.mateengine.action.RESET_POSE"
        const val ACTION_QUICK_MENU = "io.github.mrnodatax.mateengine.action.QUICK_MENU"
        const val EXTRA_QUICK_SCREEN = "quick_screen"
        const val ACTION_SET_SEATED = "io.github.mrnodatax.mateengine.action.SET_SEATED"
        const val EXTRA_SEATED = "seated"
        const val EXTRA_LOCOMOTION = "locomotion"
        const val EXTRA_ANIMATION_ID = "animation_id"
        const val EXTRA_SPEECH_TEXT = "speech_text"
        const val EXTRA_SPEECH_MS = "speech_ms"
        const val ACTION_SPEECH_ENVELOPE = "io.github.mrnodatax.mateengine.action.SPEECH_ENVELOPE"
        const val EXTRA_ENVELOPE = "speech_envelope"
        /** Margin bingkai: jarak minimum avatar ke tepi aman layar. */
        private const val FRAME_MARGIN_DP = 8f
        /** Tambahan ruang di sekitar siluet tubuh di dalam jendela siluet. */
        private const val SILHOUETTE_EDGE_DP = 6f
        /** Jendela tidak pernah lebih kecil dari ini, supaya masih nyaman disentuh. */
        private const val MIN_TOUCH_DP = 96f
        /** Cadangan ruang di sekitar kotak tubuh (fraksi kanvas) — jaring pengaman pengukuran. */
        private const val SAFETY_MARGIN = 0.02
        /**
         * Kotak tubuh yang lebih sempit/pendek dari ini (fraksi kanvas) ditolak: nilainya
         * berasal dari frame pengukuran yang belum sah (tulang belum punya matriks dunia) dan
         * kalau dipakai, jendela siluet menyempit jadi garis sehingga badan terpotong.
         */
        private const val MIN_BODY_FRACTION = 0.06f
        /** Bobot penghalusan kotak tubuh; 0,25 ≈ 4 pembaruan untuk mendekati nilai baru. */
        private const val SMOOTH_ALPHA = 0.25f
        /** Perubahan tepi di bawah ini (8 dp) tidak memicu perubahan ukuran jendela. */
        private const val SILHOUETTE_TOLERANCE_DP = 8f
        /** Jarak minimum antar-perubahan ukuran jendela. */
        private const val RESIZE_INTERVAL_MS = 260L
        /** Lama avatar harus ditahan sebelum boleh diseret (supaya elusan tidak jadi geseran). */
        private const val GRAB_HOLD_MS = 300L
        /** Pengukuran tubuh lebih tua dari ini dianggap basi → kembali ke jendela penuh. */
        private const val BODY_BOX_TTL_MS = 2000L
        private const val TRIM_INITIAL_DELAY_MS = 10_000L
        private const val TRIM_INTERVAL_MS = 600_000L
        private const val TAG = "MateEngineRender"

        private const val ASSET_HOST = "appassets.androidplatform.net"
        private const val ASSET_BASE = "https://$ASSET_HOST"
        private const val CHANNEL_ID = "overlay_avatar"
        private const val NOTIFICATION_ID = 4102

        fun start(context: Context) {
            val intent = Intent(context, OverlayService::class.java).setAction(ACTION_START)
            if (Build.VERSION.SDK_INT >= 26) context.startForegroundService(intent) else context.startService(intent)
        }

        /** Menghentikan service tanpa menghidupkannya kembali bila memang belum berjalan. */
        fun stop(context: Context) {
            context.stopService(Intent(context, OverlayService::class.java))
        }

        fun applySettings(context: Context) {
            if (!OverlayRuntime.state.value.running) return
            context.startService(Intent(context, OverlayService::class.java).setAction(ACTION_APPLY_SETTINGS))
        }

        fun reloadAvatar(context: Context) {
            if (!OverlayRuntime.state.value.running) return
            context.startService(Intent(context, OverlayService::class.java).setAction(ACTION_RELOAD_AVATAR))
        }

        fun playAnimation(context: Context, animationId: String?) {
            if (!OverlayRuntime.state.value.running) return
            context.startService(
                Intent(context, OverlayService::class.java)
                    .setAction(ACTION_PLAY_ANIMATION)
                    .putExtra(EXTRA_ANIMATION_ID, animationId),
            )
        }

        fun speak(context: Context, text: String?, durationMs: Int) {
            if (!OverlayRuntime.state.value.running) return
            context.startService(
                Intent(context, OverlayService::class.java)
                    .setAction(ACTION_SPEAK)
                    .putExtra(EXTRA_SPEECH_TEXT, text)
                    .putExtra(EXTRA_SPEECH_MS, durationMs),
            )
        }

        fun playEnvelope(context: Context, levels: FloatArray, durationMs: Int) {
            if (!OverlayRuntime.state.value.running) return
            context.startService(
                Intent(context, OverlayService::class.java)
                    .setAction(ACTION_SPEECH_ENVELOPE)
                    .putExtra(EXTRA_ENVELOPE, levels)
                    .putExtra(EXTRA_SPEECH_MS, durationMs),
            )
        }

        fun stopSpeaking(context: Context) {
            if (!OverlayRuntime.state.value.running) return
            context.startService(Intent(context, OverlayService::class.java).setAction(ACTION_STOP_SPEAKING))
        }

        fun playBuiltin(context: Context, name: String) {
            if (!OverlayRuntime.state.value.running) return
            context.startService(
                Intent(context, OverlayService::class.java)
                    .setAction(ACTION_PLAY_BUILTIN)
                    .putExtra(EXTRA_BUILTIN, name),
            )
        }

        fun setSeated(context: Context, seated: Boolean) {
            if (!OverlayRuntime.state.value.running) return
            context.startService(
                Intent(context, OverlayService::class.java)
                    .setAction(ACTION_SET_SEATED)
                    .putExtra(EXTRA_SEATED, seated),
            )
        }

        /** Membuka menu cepat dari luar service (dipakai tangkapan layar CI & pintasan). */
        fun showQuickMenu(context: Context, screen: QuickMenuScreen = QuickMenuScreen.ROOT) {
            if (!OverlayRuntime.state.value.running) return
            context.startService(
                Intent(context, OverlayService::class.java)
                    .setAction(ACTION_QUICK_MENU)
                    .putExtra(
                        EXTRA_QUICK_SCREEN,
                        when (screen) {
                            QuickMenuScreen.CLIPS -> "clips"
                            QuickMenuScreen.CHAT -> "chat"
                            QuickMenuScreen.ROOT -> "root"
                        },
                    ),
            )
        }

        fun resetPose(context: Context) {
            if (!OverlayRuntime.state.value.running) return
            context.startService(Intent(context, OverlayService::class.java).setAction(ACTION_RESET_POSE))
        }

        fun setLocomotion(context: Context, mode: String) {
            if (!OverlayRuntime.state.value.running) return
            context.startService(
                Intent(context, OverlayService::class.java)
                    .setAction(ACTION_LOCOMOTION)
                    .putExtra(EXTRA_LOCOMOTION, mode),
            )
        }

        fun trimMemory(context: Context) {
            if (!OverlayRuntime.state.value.running) return
            context.startService(Intent(context, OverlayService::class.java).setAction(ACTION_TRIM_MEMORY))
        }

        fun stopAnimation(context: Context) {
            if (!OverlayRuntime.state.value.running) return
            context.startService(Intent(context, OverlayService::class.java).setAction(ACTION_STOP_ANIMATION))
        }
    }
}
