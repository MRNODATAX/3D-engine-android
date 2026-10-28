package io.github.mrnodatax.mateengine.overlay

/** Perhitungan murni posisi overlay supaya bisa diuji tanpa perangkat. */
object OverlayGeometry {

    data class Placement(val x: Int, val y: Int)

    /**
     * Menjaga window overlay tetap cukup terlihat, tetapi **tidak lagi mengurungnya** di dalam layar.
     *
     * Dulu posisi dijepit ketat (`0 .. screen - window`). Akibatnya avatar di skala 100% — yang
     * jendelanya setinggi layar — tidak bisa digeser sama sekali; terasa seperti "tertahan bingkai".
     * Sekarang jendela boleh keluar tepi layar sampai hanya [minVisible] bagiannya yang tersisa,
     * sehingga avatar bisa diletakkan di mana pun di layar (pojok, tepi, tengah) dan tetap bisa
     * diambil kembali.
     *
     * @param x posisi kiri window (piksel, relatif gravitasi TOP|START)
     * @param y posisi atas window
     * @param minVisible bagian window yang harus tetap terlihat (0..1)
     */
    fun clamp(
        x: Int,
        y: Int,
        width: Int,
        height: Int,
        screenWidth: Int,
        screenHeight: Int,
        minVisible: Float = MIN_VISIBLE,
    ): Placement {
        val fraction = minVisible.coerceIn(0.3f, 1f)
        val keepX = (minOf(width, screenWidth) * fraction).toInt().coerceAtLeast(1)
        val keepY = (minOf(height, screenHeight) * fraction).toInt().coerceAtLeast(1)
        return Placement(
            x.coerceIn(-(width - keepX), screenWidth - keepX),
            y.coerceIn(-(height - keepY), screenHeight - keepY),
        )
    }

    /**
     * Ukuran window overlay.
     *
     * `scalePercent` berarti **persentase tinggi layar** yang ingin ditempati avatar, bukan lebar.
     * Sebelumnya satu nilai dipakai dua kali (lebar jendela *dan* skala model), sehingga menggeser
     * slider ke 50% menghasilkan avatar ~25% dan terasa "tidak berubah".
     */
    fun windowSize(screenWidth: Int, screenHeight: Int, scalePercent: Int, density: Float): Pair<Int, Int> {
        // 96dp: masih nyaman disentuh, tetapi tidak lagi memaksa avatar besar saat slider di 25%.
        val minWidth = (96 * density).toInt()
        val percent = scalePercent.coerceIn(MIN_SCALE, MAX_SCALE) / 100f
        val targetHeight = (screenHeight * percent).toInt()
        var width = (targetHeight / ASPECT).toInt()
            .coerceAtMost(screenWidth)
            .coerceAtLeast(minWidth.coerceAtMost(screenWidth))
        var height = (width * ASPECT).toInt()
        if (height > screenHeight) {
            height = screenHeight
            width = (height / ASPECT).toInt()
        }
        return width to height
    }

    /** Skala hasil cubit dua jari; dipakai agar pinch dan slider memakai rumus yang sama. */
    fun scaleFromPinch(startPercent: Int, pinchFactor: Float): Int {
        if (!pinchFactor.isFinite() || pinchFactor <= 0f) return startPercent.coerceIn(MIN_SCALE, MAX_SCALE)
        val scaled = startPercent * pinchFactor
        return scaled.toInt().coerceIn(MIN_SCALE, MAX_SCALE)
    }

    const val MIN_SCALE = 25
    const val MAX_SCALE = 100

    /** Bagian jendela overlay yang wajib tetap terlihat saat avatar digeser ke tepi. */
    const val MIN_VISIBLE = 0.62f

    /** Rasio tinggi:lebar kotak avatar (potret berdiri). */
    private const val ASPECT = 1.9f

    fun defaultPlacement(width: Int, height: Int, screenWidth: Int, screenHeight: Int, density: Float): Placement {
        val margin = (12 * density).toInt()
        return clamp(screenWidth - width - margin, screenHeight - height - margin, width, height, screenWidth, screenHeight)
    }
}
