# WebView <-> JavaScript interface dipanggil lewat refleksi nama method.
-keepclassmembers class io.github.mrnodatax.mateengine.overlay.RendererBridge {
    public *;
}
-keepattributes JavascriptInterface
-keep class io.github.mrnodatax.mateengine.overlay.RendererBridge { *; }
