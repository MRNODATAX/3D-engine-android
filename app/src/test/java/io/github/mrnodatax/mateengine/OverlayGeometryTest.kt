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
    // ------------------------------------------------------------ bingkai & siluet (v0.1.10)

    @Test
    fun `bingkai menghormati inset sistem dan margin`() {
        val frame = OverlayGeometry.frame(
            screenWidth = 1080,
            screenHeight = 2400,
            insets = OverlayGeometry.Insets(left = 0, top = 96, right = 0, bottom = 132),
            marginPx = 22,
        )
        assertEquals(22, frame.left)
        assertEquals(118, frame.top)
        assertEquals(1058, frame.right)
        assertEquals(2246, frame.bottom)
    }

    @Test
    fun `posisi avatar selalu di dalam bingkai untuk 12 kombinasi layar dan skala`() {
        val layouts = listOf(
            Triple(1080, 2400, 25), Triple(1080, 2400, 50), Triple(1080, 2400, 100),
            Triple(720, 1280, 25), Triple(720, 1280, 60), Triple(720, 1280, 100),
            Triple(1440, 3120, 25), Triple(1440, 3120, 70), Triple(1440, 3120, 100),
            Triple(2400, 1080, 25), Triple(2400, 1080, 60), Triple(2400, 1080, 100),
        )
        var insideCount = 0
        for ((screenW, screenH, scale) in layouts) {
            val frame = OverlayGeometry.frame(
                screenW, screenH,
                OverlayGeometry.Insets(0, 80, 0, 120), marginPx = 20,
            )
            val (width, height) = OverlayGeometry.windowSize(screenW, screenH, scale, 2.75f)
            // Coba keempat sudut + nilai ekstrem: semuanya harus berakhir di dalam bingkai.
            val attempts = listOf(
                -9999 to -9999, 9999 to -9999, -9999 to 9999, 9999 to 9999, 0 to 0,
            )
            for ((rawX, rawY) in attempts) {
                val placement = OverlayGeometry.clampToFrame(rawX, rawY, width, height, frame)
                val fitsX = width <= frame.width
                val fitsY = height <= frame.height
                if (fitsX) {
                    assertTrue("x keluar bingkai: ${placement.x} (${frame.left}..${frame.right - width})", placement.x >= frame.left)
                    assertTrue("x keluar bingkai kanan: ${placement.x}", placement.x + width <= frame.right)
                } else {
                    assertEquals("jendela lebih lebar dari bingkai harus rata kiri", frame.left, placement.x)
                }
                if (fitsY) {
                    assertTrue("y keluar bingkai: ${placement.y}", placement.y >= frame.top)
                    assertTrue("y keluar bingkai bawah: ${placement.y}", placement.y + height <= frame.bottom)
                } else {
                    assertEquals("jendela lebih tinggi dari bingkai harus rata atas", frame.top, placement.y)
                }
                insideCount += 1
            }
        }
        assertEquals(60, insideCount)
    }

    @Test
    fun `karet saat digeser melewati bingkai tetapi tidak kabur`() {
        val frame = OverlayGeometry.frame(1080, 2400, OverlayGeometry.Insets(0, 100, 0, 100), marginPx = 20)
        val width = 400
        val height = 700
        val maxX = frame.right - width
        // Di dalam bingkai: posisi apa adanya.
        assertEquals(500, OverlayGeometry.dragPlacement(500, 600, width, height, frame).x)
        // Melewati kanan: hanya 28 % dari kelebihan yang diikuti, maksimal 56 px.
        val pulled = OverlayGeometry.dragPlacement(maxX + 200, 600, width, height, frame).x
        assertTrue("harus diredam, dapat $pulled", pulled in (maxX + 1)..(maxX + 56))
        val hard = OverlayGeometry.dragPlacement(maxX + 2000, 600, width, height, frame).x
        assertEquals(maxX + 56, hard)
        // Melewati kiri.
        val left = OverlayGeometry.dragPlacement(-500, 600, width, height, frame).x
        assertTrue("kiri harus diredam, dapat $left", left in (frame.left - 56)..(frame.left - 1))
    }

    @Test
    fun `jendela siluet mengecil tetapi tidak lebih kecil dari batas sentuh`() {
        val frame = OverlayGeometry.frame(1080, 2400, OverlayGeometry.Insets(0, 0, 0, 0), marginPx = 0)
        // Jendela desain 631x1200 di (100, 300); tubuh mengisi tengahnya.
        val box = OverlayGeometry.BodyBox(left = 130, top = 40, right = 500, bottom = 1160)
        val visible = OverlayGeometry.visibleRect(
            designX = 100, designY = 300, designWidth = 631, designHeight = 1200,
            box = box, edgePx = 16, minSizePx = 264, frame = frame,
        )
        // Kanan-kiri mengikuti kotak tubuh, bukan seluruh jendela.
        assertEquals(100 + 130 - 16, visible.left)
        assertEquals(100 + 500 + 16, visible.right)
        assertEquals(300 + 40 - 16, visible.top)
        assertEquals(300 + 1160 + 16, visible.bottom)
        val blocked = OverlayGeometry.blockedFraction(631, 1200, visible)
        assertTrue("area yang menelan sentuhan harus turun, dapat $blocked", blocked < 0.75f)

        // Kotak sangat kecil: jendela berhenti di batas sentuh minimum 96 dp (264 px @2,75).
        val tiny = OverlayGeometry.BodyBox(left = 300, top = 600, right = 320, bottom = 640)
        val small = OverlayGeometry.visibleRect(100, 300, 631, 1200, tiny, 16, 264, frame)
        assertTrue("lebar minimum dihormati, dapat ${small.width}", small.width >= 264)
        assertTrue("tinggi minimum dihormati, dapat ${small.height}", small.height >= 264)
    }

    @Test
    fun `pengukuran tubuh yang tidak masuk akal ditolak`() {
        val frame = OverlayGeometry.frame(1080, 2400, OverlayGeometry.Insets(0, 0, 0, 0), marginPx = 0)
        // Kotak setinggi 8 % kanvas = pengukuran rusak (salah satuan); jangan dipotong.
        val broken = OverlayGeometry.BodyBox(left = 100, top = 500, right = 400, bottom = 600)
        val visible = OverlayGeometry.visibleRect(100, 300, 631, 1200, broken, 16, 264, frame)
        assertEquals(1200, visible.height)
        assertEquals(631, visible.width)
    }

    @Test
    fun `pemotongan dibatasi 28 persen per sisi`() {
        val frame = OverlayGeometry.frame(1080, 2400, OverlayGeometry.Insets(0, 0, 0, 0), marginPx = 0)
        // Kotak yang hanya menutup bagian bawah kanvas: tanpa batas, kepala ikut terpotong.
        val bottomHalf = OverlayGeometry.BodyBox(left = 100, top = 700, right = 500, bottom = 1200)
        val visible = OverlayGeometry.visibleRect(0, 0, 631, 1200, bottomHalf, 16, 264, frame)
        // 28 % dari 1200 = 336 → paling cepat mulai di y = 336.
        assertEquals(336, visible.top)
        // …dan tinggi minimal 44 % kanvas.
        assertTrue("tinggi minimal 44 %, dapat ${visible.height}", visible.height >= (1200 * 0.44f).toInt() - 1)
    }

    @Test
    fun `tanpa pengukuran tubuh jendela tetap ukuran penuh`() {
        val frame = OverlayGeometry.frame(1080, 2400, OverlayGeometry.Insets(0, 0, 0, 0), marginPx = 0)
        val visible = OverlayGeometry.visibleRect(100, 300, 631, 1200, null, 16, 264, frame)
        assertEquals(631, visible.width)
        assertEquals(1200, visible.height)
        assertEquals(1.0f, OverlayGeometry.blockedFraction(631, 1200, visible), 0.0001f)
    }

    @Test
    fun `jendela siluet tidak pernah keluar dari jendela desain`() {
        val frame = OverlayGeometry.frame(1080, 2400, OverlayGeometry.Insets(0, 0, 0, 0), marginPx = 0)
        // Kotak tubuh melewati tepi kanvas (mis. saat `roll`): hasil tetap di dalam desain.
        val box = OverlayGeometry.BodyBox(left = -80, top = -60, right = 720, bottom = 1300)
        val visible = OverlayGeometry.visibleRect(200, 200, 631, 1200, box, 16, 264, frame)
        assertTrue(visible.left >= 200)
        assertTrue(visible.top >= 200)
        assertTrue(visible.right <= 200 + 631)
        assertTrue(visible.bottom <= 200 + 1200)
    }

}
