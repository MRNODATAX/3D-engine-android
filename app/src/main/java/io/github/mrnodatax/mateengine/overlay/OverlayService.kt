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
import android.graphics.Color
import android.graphics.PixelFormat
import android.os.Build
import android.os.Handler
import android.os.IBinder
import android.os.Looper
import android.util.Log
import android.view.Gravity
import android.view.MotionEvent
import android.view.View
import android.view.WindowManager
import android.webkit.WebResourceRequest
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
 * - Bila pengguna mengunci posisi, window menjadi FLAG_NOT_TOUCHABLE sehingga sentuhan
 *   diteruskan sepenuhnya ke aplikasi di bawah, tetapi avatar juga tidak bisa digeser.
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
    private val voicePack by lazy { VoicePack(this) }

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
        webView?.let { view ->
            (view.parent as? FrameLayout)?.removeView(view)
            view.destroy()
        }
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
        val metrics = resources.displayMetrics
        val density = metrics.density

        val (width, height) = OverlayGeometry.windowSize(metrics.widthPixels, metrics.heightPixels, prefs.scalePercent, density)
        val placement = if (prefs.offsetX >= 0 && prefs.offsetY >= 0) {
            OverlayGeometry.clamp(prefs.offsetX, prefs.offsetY, width, height, metrics.widthPixels, metrics.heightPixels)
        } else {
            OverlayGeometry.defaultPlacement(width, height, metrics.widthPixels, metrics.heightPixels, density)
        }

        var windowFlags = WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE or
            WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL or
            WindowManager.LayoutParams.FLAG_LAYOUT_IN_SCREEN
        if (prefs.locked) {
            windowFlags = windowFlags or WindowManager.LayoutParams.FLAG_NOT_TOUCHABLE
        }

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
            repository.updateOverlay { it.copy(offsetX = x, offsetY = y) }
        }
        container.onScaleChanged = { percent ->
            repository.updateOverlay { it.copy(scalePercent = percent) }
            applyLayout(recenter = false)
        }
        container.onTap = { zone -> reactToTouch(zone) }
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

    private fun applyLayout(recenter: Boolean) {
        val container = rootView ?: return
        val layoutParams = params ?: return
        val metrics = resources.displayMetrics
        val prefs = repository.state.value.overlay
        val (width, height) = OverlayGeometry.windowSize(metrics.widthPixels, metrics.heightPixels, prefs.scalePercent, metrics.density)
        layoutParams.width = width
        layoutParams.height = height
        val target = if (recenter || prefs.offsetX < 0 || prefs.offsetY < 0) {
            OverlayGeometry.defaultPlacement(width, height, metrics.widthPixels, metrics.heightPixels, metrics.density)
        } else {
            OverlayGeometry.clamp(prefs.offsetX, prefs.offsetY, width, height, metrics.widthPixels, metrics.heightPixels)
        }
        layoutParams.x = target.x
        layoutParams.y = target.y
        runCatching { windowManager.updateViewLayout(container, layoutParams) }
    }

    private fun applySettings() {
        val prefs = repository.state.value.overlay
        applyLayout(recenter = false)
        params?.let { layoutParams ->
            layoutParams.alpha = prefs.opacityPercent / 100f
            layoutParams.flags = if (prefs.locked) {
                layoutParams.flags or WindowManager.LayoutParams.FLAG_NOT_TOUCHABLE
            } else {
                layoutParams.flags and WindowManager.LayoutParams.FLAG_NOT_TOUCHABLE.inv()
            }
            rootView?.let { view ->
                rootView?.isDragEnabled = !prefs.locked
                runCatching { windowManager.updateViewLayout(view, layoutParams) }
            }
        }
        evaluate("window.MateEngine.setTargetFps(${prefs.targetFps})")
        evaluate("window.MateEngine.setQuality(${JSONObject.quote(prefs.quality)})")
        evaluate("window.MateEngine.setAnimationSpeed(${repository.state.value.animationSpeedPercent / 100f})")
        evaluate("window.MateEngine.setLocomotion(${JSONObject.quote(prefs.motion)})")
        memorySaver = prefs.memorySaver
        voicePack.setEnabled(ChatRepository.get(this).state.value.settings.voicePackEnabled)
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

    private fun reactToTouch(zone: String) {
        val script = "window.MateEngine.react(${JSONObject.quote(zone)})"
        evaluate(script)
        if (ChatRepository.get(this).state.value.settings.voicePackEnabled) {
            voicePack.play(if (zone == "head") VoicePack.Event.BUBBLE_ON else VoicePack.Event.BUBBLE_OFF)
        }
        Log.i(TAG, "sentuhan pada avatar: zona $zone")
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
        var onTap: ((String) -> Unit)? = null
        var onDragVelocity: ((Float, Float) -> Unit)? = null

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

        // Cubit dua jari: satu jari = geser, dua jari = ubah ukuran.
        private var pinching = false
        private var pinchStartDistance = 0f
        private var pinchStartPercent = 100
        private var lastScaleSentAt = 0L

        override fun onInterceptTouchEvent(event: MotionEvent): Boolean = isDragEnabled

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
                    val dx = (event.rawX - downRawX).toInt()
                    val dy = (event.rawY - downRawY).toInt()
                    if (!dragging && (kotlin.math.abs(dx) > 8 || kotlin.math.abs(dy) > 8)) {
                        dragging = true
                        voicePack.play(VoicePack.Event.DRAG_START, 0.5f)
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

                    val metrics = resources.displayMetrics
                    val placement = OverlayGeometry.clamp(
                        startX + dx,
                        startY + dy,
                        layoutParams.width,
                        layoutParams.height,
                        metrics.widthPixels,
                        metrics.heightPixels,
                    )
                    layoutParams.x = placement.x
                    layoutParams.y = placement.y
                    runCatching { windowManager.updateViewLayout(this, layoutParams) }
                    return true
                }
                MotionEvent.ACTION_POINTER_UP -> {
                    if (pinching) {
                        pinching = false
                        onDragFinished?.invoke(layoutParams.x, layoutParams.y)
                        Log.i(TAG, "pinch selesai pada ${repository.state.value.overlay.scalePercent}%")
                    }
                    return true
                }
                MotionEvent.ACTION_UP, MotionEvent.ACTION_CANCEL -> {
                    if (dragging) {
                        onDragFinished?.invoke(layoutParams.x, layoutParams.y)
                        onDragVelocity?.invoke(0f, 0f)
                        voicePack.play(VoicePack.Event.DRAG_STOP, 0.5f)
                    } else if (!pinching && System.currentTimeMillis() - downTime < 300) {
                        // Ketuk singkat (bukan geser) = sentuhan pada avatar.
                        val ratio = (event.y / layoutParams.height.toFloat()).coerceIn(0f, 1f)
                        val zone = when {
                            ratio < 0.22f -> "head"
                            ratio < 0.45f -> "shoulder"
                            else -> "body"
                        }
                        onTap?.invoke(zone)
                    }
                    dragging = false
                    pinching = false
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
        const val ACTION_SET_SEATED = "io.github.mrnodatax.mateengine.action.SET_SEATED"
        const val EXTRA_SEATED = "seated"
        const val EXTRA_LOCOMOTION = "locomotion"
        const val EXTRA_ANIMATION_ID = "animation_id"
        const val EXTRA_SPEECH_TEXT = "speech_text"
        const val EXTRA_SPEECH_MS = "speech_ms"
        const val ACTION_SPEECH_ENVELOPE = "io.github.mrnodatax.mateengine.action.SPEECH_ENVELOPE"
        const val EXTRA_ENVELOPE = "speech_envelope"
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
