package io.github.mrnodatax.mateengine

import io.github.mrnodatax.mateengine.overlay.OverlayGeometry
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

class OverlayGeometryTest {

    @Test
    fun `menarik terlalu jauh ke kanan tetap menyisakan bagian yang terlihat`() {
        val placement = OverlayGeometry.clamp(5000, -400, 400, 600, 1080, 1920)
        // 62% dari 400 px = 248 px harus tetap di layar.
        assertEquals(1080 - 248, placement.x)
        // Ke atas: 62% dari 600 px = 372 px tetap terlihat.
        assertEquals(-(600 - 372), placement.y)
    }

    @Test
    fun `avatar boleh digeser sampai tepi layar`() {
        val placement = OverlayGeometry.clamp(-120, -30, 400, 600, 1080, 1920)
        assertEquals(-120, placement.x)
        assertEquals(-30, placement.y)
    }

    @Test
    fun `jendela setinggi layar tetap bisa digeser naik turun`() {
        // Kondisi nyata skala 100%: jendela 1080x1920 di layar 1080x2000.
        val (width, height) = OverlayGeometry.windowSize(1080, 2000, 100, 2.75f)
        val top = OverlayGeometry.clamp(0, -height, width, height, 1080, 2000)
        val bottom = OverlayGeometry.clamp(0, 2000, width, height, 1080, 2000)
        assertTrue("harus bisa naik, dapat ${top.y}", top.y < 0)
        assertTrue("harus bisa turun, dapat ${bottom.y}", bottom.y > 0)
        assertTrue("selisih jangkauan cukup besar", bottom.y - top.y >= (height * 0.7f).toInt())
    }

    @Test
    fun `window lebih besar dari layar tetap dijaga agar terlihat`() {
        val inside = OverlayGeometry.clamp(100, 100, 1400, 2200, 1080, 1920)
        // Posisi yang masih wajar tidak diubah.
        assertEquals(100, inside.x)
        assertEquals(100, inside.y)

        val far = OverlayGeometry.clamp(9999, 9999, 1400, 2200, 1080, 1920)
        // Jendela lebih besar dari layar: batas dihitung dari sisi layar (62% tetap terlihat).
        assertEquals(1080 - (1080 * 0.62f).toInt(), far.x)
        assertEquals(1920 - (1920 * 0.62f).toInt(), far.y)
    }

    @Test
    fun `ukuran window mengikuti persentase dan batas minimum`() {
        val (width, height) = OverlayGeometry.windowSize(1080, 2400, 62, 2.75f)
        assertTrue("lebar harus masuk layar", width <= 1080)
        assertTrue("lebar minimal 96dp", width >= (96 * 2.75f).toInt() - 1)
        assertEquals((width * 1.9f).toInt(), height)
    }

    @Test
    fun `persentase kecil tetap menghormati batas minimum`() {
        val (width, _) = OverlayGeometry.windowSize(400, 800, 25, 3f)
        assertEquals((96 * 3f).toInt(), width)
    }

    @Test
    fun `skala benar-benar mengubah tinggi avatar 4x`() {
        val (w25, h25) = OverlayGeometry.windowSize(1080, 2400, 25, 2.75f)
        val (w100, h100) = OverlayGeometry.windowSize(1080, 2400, 100, 2.75f)
        assertTrue("tinggi 25% harus sekitar 600px, dapat $h25", h25 in 560..640)
        assertTrue("tinggi 100% harus mendekati tinggi layar, dapat $h100", h100 >= 2000)
        assertTrue("avatar harus tumbuh minimal 3x", h100 / h25.toFloat() >= 3f)
        assertTrue("lebar harus tumbuh sebanding", w100 > w25 * 3)
    }

    @Test
    fun `rasio kotak avatar dipertahankan`() {
        val (width, height) = OverlayGeometry.windowSize(1080, 2400, 62, 2.75f)
        assertEquals((width * 1.9f).toInt(), height)
    }

    @Test
    fun `pinch dijepit ke rentang yang didukung`() {
        assertEquals(OverlayGeometry.MAX_SCALE, OverlayGeometry.scaleFromPinch(80, 4f))
        assertEquals(OverlayGeometry.MIN_SCALE, OverlayGeometry.scaleFromPinch(30, 0.1f))
        assertEquals(62, OverlayGeometry.scaleFromPinch(62, 1f))
        assertEquals(62, OverlayGeometry.scaleFromPinch(62, Float.NaN))
        assertEquals(31, OverlayGeometry.scaleFromPinch(62, 0.5f))
    }

    @Test
    fun `penempatan awal berada di kanan bawah dengan margin`() {
        val placement = OverlayGeometry.defaultPlacement(400, 700, 1080, 1920, 2f)
        assertEquals(1080 - 400 - 24, placement.x)
        assertEquals(1920 - 700 - 24, placement.y)
    }
}
