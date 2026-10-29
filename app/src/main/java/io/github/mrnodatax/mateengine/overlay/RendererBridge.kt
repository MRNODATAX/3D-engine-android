package io.github.mrnodatax.mateengine.overlay

import android.webkit.JavascriptInterface

/**
 * Jembatan satu arah dari renderer ke service.
 *
 * Hanya menerima satu method sederhana; renderer tidak diberi akses ke objek Android lain,
 * dan WebView tidak pernah memuat halaman dari internet.
 */
class RendererBridge(private val onMessage: (String) -> Unit) {

    @JavascriptInterface
    fun postMessage(message: String) {
        onMessage(message)
    }
}
