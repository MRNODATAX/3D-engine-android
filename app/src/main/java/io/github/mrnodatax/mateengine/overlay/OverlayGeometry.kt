package io.github.mrnodatax.mateengine.overlay

/** Perhitungan murni posisi overlay supaya bisa diuji tanpa perangkat. */
object OverlayGeometry {

    data class Placement(val x: Int, val y: Int)

    /**
     * Menjaga window overlay tetap terlihat penuh di layar.
     *
     * @param x posisi kiri window (piksel, relatif gravitasi TOP|START)
     * @param y posisi atas window
     */
    fun clamp(x: Int, y: Int, width: Int, height: Int, screenWidth: Int, screenHeight: Int): Placement {
        val maxX = (screenWidth - width).coerceAtLeast(0)
        val maxY = (screenHeight - height).coerceAtLeast(0)
        return Placement(x.coerceIn(0, maxX), y.coerceIn(0, maxY))
    }

    /**
     * Ukuran window overlay.
     *
     * `scalePercent` berarti **persentase tinggi layar** yang ingin ditempati avatar, bukan lebar.
     * Sebelumnya satu nilai dipakai dua kali (lebar jendela *dan* skala model), sehingga menggeser
     * slider ke 50% menghasilkan avatar ~25% dan terasa "tidak berubah".
     */
    fun windowSize(screenWidth: Int, screenHeight: Int, scalePercent: Int, density: Float): Pair<Int, Int> {
        val minWidth = (140 * density).toInt()
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

    /** Rasio tinggi:lebar kotak avatar (potret berdiri). */
    private const val ASPECT = 1.9f

    fun defaultPlacement(width: Int, height: Int, screenWidth: Int, screenHeight: Int, density: Float): Placement {
        val margin = (12 * density).toInt()
        return clamp(screenWidth - width - margin, screenHeight - height - margin, width, height, screenWidth, screenHeight)
    }
}
