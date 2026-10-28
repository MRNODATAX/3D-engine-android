package io.github.mrnodatax.mateengine.ui

import android.annotation.SuppressLint
import android.util.Log
import android.webkit.ConsoleMessage
import android.webkit.JavascriptInterface
import android.webkit.WebChromeClient
import android.graphics.Color as AndroidColor
import android.webkit.WebResourceError
import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalLifecycleOwner
import androidx.compose.ui.viewinterop.AndroidView
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.LifecycleEventObserver
import androidx.webkit.WebViewAssetLoader
import io.github.mrnodatax.mateengine.data.AvatarAsset
import java.io.File
import java.util.concurrent.atomic.AtomicBoolean

/**
 * Pratinjau avatar **hidup** untuk kartu Beranda.
 *
 * Memakai renderer yang sama dengan overlay (`assets/renderer/index.html`) dalam
 * [PREVIEW_QUERY] = `?mode=preview`: 15 fps, kualitas rendah, direktur perilaku mati
 * (lihat `docs/rencana-v0.1.9-ui-modern.md` §7a). Alasannya: kartu kecil tidak perlu gerak acak,
 * dan GPU tidak boleh berebut dengan overlay yang mungkin sedang berjalan.
 *
 * Batasan yang dijaga:
 * - hanya hidup selama composable ini ada (Beranda terlihat) dan activity berstatus STARTED;
 * - bila WebGL gagal/berkas hilang, [onFallback] dipanggil supaya kartu menampilkan monogram —
 *   tidak pernah kotak kosong;
 * - tidak menulis state aplikasi: hanya membaca berkas avatar yang sudah dipilih.
 */
private const val TAG = "MateEnginePreview"
private const val PREVIEW_QUERY = "?mode=preview"
private const val ASSET_HOST = "appassets.androidplatform.net"
private const val PREVIEW_URL = "https://$ASSET_HOST/assets/renderer/index.html$PREVIEW_QUERY"

@SuppressLint("SetJavaScriptEnabled")
@Composable
fun AvatarPreview(
    asset: AvatarAsset?,
    modifier: Modifier = Modifier,
    onFallback: () -> Unit = {},
    onReady: () -> Unit = {},
) {
    if (asset == null) {
        // Belum ada model: tidak ada yang bisa dirender.
        LaunchedEffect(Unit) { onFallback() }
        return
    }
    val context = LocalContext.current
    val lifecycleOwner = LocalLifecycleOwner.current
    var failed by remember(asset.id) { mutableStateOf(false) }
    val notified = remember(asset.id) { AtomicBoolean(false) }

    val webView = remember(asset.id) {
        WebView(context).apply {
            setBackgroundColor(AndroidColor.TRANSPARENT)
            settings.javaScriptEnabled = true
            settings.domStorageEnabled = true
            settings.mediaPlaybackRequiresUserGesture = false
            settings.allowFileAccess = false
            settings.allowContentAccess = false
            isVerticalScrollBarEnabled = false
            isHorizontalScrollBarEnabled = false
            overScrollMode = WebView.OVER_SCROLL_NEVER
            addJavascriptInterface(PreviewBridge(), "MateBridge")
            webChromeClient = object : WebChromeClient() {
                override fun onConsoleMessage(message: ConsoleMessage): Boolean {
                    Log.i(TAG, "console ${message.messageLevel()}: ${message.message()}")
                    return true
                }
            }
            webViewClient = object : WebViewClient() {
                override fun onRenderProcessGone(
                    view: WebView,
                    detail: android.webkit.RenderProcessGoneDetail,
                ): Boolean {
                    Log.w(TAG, "proses render pratinjau berhenti, memakai cadangan monogram")
                    failed = true
                    return true
                }

                private val loader = WebViewAssetLoader.Builder()
                    .setDomain(ASSET_HOST)
                    .addPathHandler("/assets/", WebViewAssetLoader.AssetsPathHandler(context))
                    .addPathHandler(
                        "/avatars/",
                        WebViewAssetLoader.InternalStoragePathHandler(context, File(context.filesDir, "avatars")),
                    )
                    .addPathHandler(
                        "/animations/",
                        WebViewAssetLoader.InternalStoragePathHandler(context, File(context.filesDir, "animations")),
                    )
                    .build()

                override fun shouldInterceptRequest(view: WebView, request: WebResourceRequest) =
                    loader.shouldInterceptRequest(request.url)

                override fun onReceivedError(
                    view: WebView,
                    request: WebResourceRequest,
                    error: WebResourceError,
                ) {
                    // Hanya kegagalan halaman utama yang dianggap fatal; subresource boleh gagal.
                    if (request.isForMainFrame) failed = true
                }

                override fun onPageFinished(view: WebView, url: String) {
                    super.onPageFinished(view, url)
                    if (failed) return
                    Log.i(TAG, "halaman pratinjau selesai dimuat")
                    view.evaluateJavascript(
                        "window.MateEngine && window.MateEngine.loadAvatar(" +
                            "\"https://$ASSET_HOST/avatars/${asset.fileName}\")",
                        null,
                    )
                }
            }
            loadUrl(PREVIEW_URL)
        }
    }

    // Hentikan render saat layar tidak terlihat: hemat baterai dan tidak berebut GPU.
    DisposableEffect(lifecycleOwner, webView) {
        val observer = LifecycleEventObserver { _, event ->
            when (event) {
                Lifecycle.Event.ON_START -> webView.onResume()
                Lifecycle.Event.ON_STOP -> webView.onPause()
                else -> Unit
            }
        }
        lifecycleOwner.lifecycle.addObserver(observer)
        onDispose {
            lifecycleOwner.lifecycle.removeObserver(observer)
            webView.stopLoading()
            webView.loadUrl("about:blank")
            webView.destroy()
        }
    }

    Box(modifier, contentAlignment = Alignment.Center) {
        if (!failed) {
            AndroidView(
                factory = { webView },
                modifier = Modifier.fillMaxSize(),
                onRelease = { it.destroy() },
            )
            LaunchedEffect(webView) {
                // Tanda siap dipakai kartu untuk menyembunyikan kerangka pemuatan.
                webView.postDelayed({
                    if (!notified.getAndSet(true)) onReady()
                }, 900)
            }
        }
    }

    // Jaring pengaman: kalau renderer tidak melaporkan siap dalam 20 detik (GPU lemah, model
    // rusak, atau WebGL tidak tersedia), kartu menampilkan monogram — bukan kotak kosong.
    LaunchedEffect(webView, asset.id) {
        kotlinx.coroutines.delay(20_000)
        if (!notified.get()) {
            Log.w(TAG, "pratinjau tidak melaporkan siap dalam 20 detik; memakai cadangan")
            failed = true
        }
    }

    if (failed) {
        LaunchedEffect(failed) { onFallback() }
    }
}

/** Menyalurkan pesan renderer ke logcat supaya kegagalan pratinjau bisa ditelusuri dari CI. */
private class PreviewBridge {
    @JavascriptInterface
    fun postMessage(message: String) {
        when (typeOf(message)) {
            "avatar-ready" -> {
                Log.i(TAG, "avatar siap: $message")
                PreviewState.ready = true
            }
            "error" -> Log.w(TAG, "renderer error: $message")
            "preview-mode" -> Log.i(TAG, "mode pratinjau aktif: $message")
            else -> Log.i(TAG, "pesan $message")
        }
    }

    /**
     * Mengambil nilai `"type"` dari pesan JSON tanpa pustaka JSON dan tanpa escape regex —
     * pesan berasal dari halaman milik sendiri, jadi cukup pencarian teks lurus.
     */
    private fun typeOf(message: String): String? {
        val key = "\"type\""
        val at = message.indexOf(key)
        if (at < 0) return null
        val colon = message.indexOf(':', at + key.length)
        if (colon < 0) return null
        val open = message.indexOf('"', colon)
        if (open < 0) return null
        val close = message.indexOf('"', open + 1)
        if (close < 0) return null
        return message.substring(open + 1, close)
    }
}

/** Status bersama: dipakai uji & log saja, bukan sumber kebenaran UI. */
internal object PreviewState {
    @Volatile
    var ready: Boolean = false
}
