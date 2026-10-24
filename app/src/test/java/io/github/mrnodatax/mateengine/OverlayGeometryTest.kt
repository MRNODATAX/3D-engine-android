package io.github.mrnodatax.mateengine

import io.github.mrnodatax.mateengine.overlay.OverlayGeometry
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

class OverlayGeometryTest {

    @Test
    fun `posisi dijepit agar window tetap di layar`() {
        val placement = OverlayGeometry.clamp(5000, -400, 400, 600, 1080, 1920)
        assertEquals(680, placement.x)
        assertEquals(0, placement.y)
    }

    @Test
    fun `posisi negatif menjadi nol`() {
        val placement = OverlayGeometry.clamp(-120, -30, 400, 600, 1080, 1920)
        assertEquals(0, placement.x)
        assertEquals(0, placement.y)
    }

    @Test
    fun `window lebih besar dari layar tidak menghasilkan posisi negatif`() {
        val placement = OverlayGeometry.clamp(100, 100, 1400, 2200, 1080, 1920)
        assertEquals(0, placement.x)
        assertEquals(0, placement.y)
    }

    @Test
    fun `ukuran window mengikuti persentase dan batas minimum`() {
        val (width, height) = OverlayGeometry.windowSize(1080, 2400, 62, 2.75f)
        assertTrue("lebar harus masuk layar", width <= 1080)
        assertTrue("lebar minimal 140dp", width >= (140 * 2.75f).toInt() - 1)
        assertEquals((width * 1.9f).toInt(), height)
    }

    @Test
    fun `persentase kecil tetap menghormati batas minimum`() {
        val (width, _) = OverlayGeometry.windowSize(1080, 2400, 25, 3f)
        assertEquals((140 * 3f).toInt(), width)
    }

    @Test
    fun `penempatan awal berada di kanan bawah dengan margin`() {
        val placement = OverlayGeometry.defaultPlacement(400, 700, 1080, 1920, 2f)
        assertEquals(1080 - 400 - 24, placement.x)
        assertEquals(1920 - 700 - 24, placement.y)
    }
}
