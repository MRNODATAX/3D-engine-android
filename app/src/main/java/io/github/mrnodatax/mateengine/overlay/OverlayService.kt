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
        showOverlay()
        registerReceiver(configurationReceiver, IntentFilter(Intent.ACTION_CONFIGURATION_CHANGED))
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        val action = intent?.action ?: ACTION_START
        when (action) {
            ACTION_STOP -> {
                stopSelf()
                return START_NOT_STICKY
            }
            ACTION_APPLY_SETTINGS -> applySettings()
            ACTION_RELOAD_AVATAR -> reloadAvatar()
            ACTION_PLAY_ANIMATION -> playAnimation(intent?.getStringExtra(EXTRA_ANIMATION_ID))
            ACTION_STOP_ANIMATION -> evaluate("window.MateEngine.stopAnimation()")
            else -> Unit
        }
        return START_NOT_STICKY
    }

    override fun onBind(intent: Intent?): IBinder? = null

    override fun onDestroy() {
        runCatching { unregisterReceiver(configurationReceiver) }
        webView?.let { view ->
            (view.parent as? FrameLayout)?.removeView(view)
            view.destroy()
        }
        rootView?.let { view -> runCatching { windowManager.removeView(view) } }
        webView = null
        rootView = null
        params = null
        OverlayRuntime.markStopped()
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
        container.isDragEnabled = !prefs.locked

        runCatching {
            windowManager.addView(container, layoutParams)
        }.onFailure { error ->
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
        evaluate("window.MateEngine.setScale(${prefs.scalePercent})")
        evaluate("window.MateEngine.setTargetFps(${prefs.targetFps})")
        evaluate("window.MateEngine.setQuality(${JSONObject.quote(prefs.quality)})")
        evaluate("window.MateEngine.setAnimationSpeed(${repository.state.value.animationSpeedPercent / 100f})")
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
            "fps" -> OverlayRuntime.update { it.copy(fps = payload.optInt("value")) }
            "animation-playing" -> {
                val name = payload.optString("name").takeIf { it.isNotBlank() }
                OverlayRuntime.update { it.copy(animationName = name) }
            }
            "animation-stopped" -> OverlayRuntime.update { it.copy(animationName = null) }
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

        private var downRawX = 0f
        private var downRawY = 0f
        private var startX = 0
        private var startY = 0
        private var dragging = false

        override fun onInterceptTouchEvent(event: MotionEvent): Boolean = isDragEnabled

        override fun onTouchEvent(event: MotionEvent): Boolean {
            val layoutParams = params ?: return false
            when (event.actionMasked) {
                MotionEvent.ACTION_DOWN -> {
                    downRawX = event.rawX
                    downRawY = event.rawY
                    startX = layoutParams.x
                    startY = layoutParams.y
                    dragging = false
                    return true
                }
                MotionEvent.ACTION_MOVE -> {
                    val dx = (event.rawX - downRawX).toInt()
                    val dy = (event.rawY - downRawY).toInt()
                    if (!dragging && (kotlin.math.abs(dx) > 8 || kotlin.math.abs(dy) > 8)) dragging = true
                    if (!dragging) return true
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
                MotionEvent.ACTION_UP, MotionEvent.ACTION_CANCEL -> {
                    if (dragging) {
                        onDragFinished?.invoke(layoutParams.x, layoutParams.y)
                    }
                    dragging = false
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
        const val EXTRA_ANIMATION_ID = "animation_id"
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

        fun stopAnimation(context: Context) {
            if (!OverlayRuntime.state.value.running) return
            context.startService(Intent(context, OverlayService::class.java).setAction(ACTION_STOP_ANIMATION))
        }
    }
}
