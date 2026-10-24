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

    /** Ukuran window overlay dari persentase ukuran avatar dan ukuran layar. */
    fun windowSize(screenWidth: Int, screenHeight: Int, scalePercent: Int, density: Float): Pair<Int, Int> {
        val minWidth = (140 * density).toInt()
        val width = (screenWidth * (scalePercent.coerceIn(25, 100) / 100f)).toInt()
            .coerceIn(minWidth, screenWidth)
        val height = (width * 1.9f).toInt().coerceAtMost((screenHeight * 0.9f).toInt())
        return width to height
    }

    fun defaultPlacement(width: Int, height: Int, screenWidth: Int, screenHeight: Int, density: Float): Placement {
        val margin = (12 * density).toInt()
        return clamp(screenWidth - width - margin, screenHeight - height - margin, width, height, screenWidth, screenHeight)
    }
}
