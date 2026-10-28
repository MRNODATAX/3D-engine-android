package io.github.mrnodatax.mateengine.overlay

import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * Uji logika menu "ketuk avatar 3×".
 *
 * Yang dijaga: ketukan santai tetap terhitung, ketukan lambat/berpindah tempat TIDAK memicu menu
 * (supaya mengelus avatar dua kali tidak tiba-tiba membuka panel), dan katalog klip memetakan
 * nama klip renderer ke label yang sama dengan yang dipakai layar Animasi.
 */
class QuickMenuTest {

    @Test
    fun `tiga ketukan cepat memicu menu`() {
        val taps = TapCounter()
        assertEquals(1, taps.register(100f, 200f, 0))
        assertEquals(2, taps.register(104f, 198f, 260))
        assertEquals(3, taps.register(101f, 203f, 520))
    }

    @Test
    fun `jeda lebih dari 700 ms memulai hitungan baru`() {
        val taps = TapCounter()
        taps.register(100f, 200f, 0)
        taps.register(100f, 200f, 300)
        // 900 ms setelah ketukan kedua: pengguna berhenti, lalu mengetuk lagi.
        assertEquals(1, taps.register(100f, 200f, 1200))
    }

    @Test
    fun `ketukan berpindah tempat memulai hitungan baru`() {
        val taps = TapCounter()
        assertEquals(1, taps.register(100f, 200f, 0))
        // 500 px jauhnya: bukan bagian dari ketukan beruntun yang sama.
        assertEquals(1, taps.register(400f, 600f, 200))
        assertEquals(2, taps.register(404f, 596f, 400))
    }

    @Test
    fun `reset mengosongkan hitungan`() {
        val taps = TapCounter()
        taps.register(10f, 10f, 0)
        taps.register(10f, 10f, 100)
        taps.reset()
        assertEquals(1, taps.register(10f, 10f, 200))
    }

    @Test
    fun `ketukan keempat tidak memicu menu dua kali`() {
        val taps = TapCounter()
        taps.register(0f, 0f, 0)
        taps.register(0f, 0f, 100)
        assertEquals(3, taps.register(0f, 0f, 200))
        taps.reset()
        assertEquals(1, taps.register(0f, 0f, 300))
    }

    @Test
    fun `label klip mengikuti nama yang dilaporkan renderer`() {
        assertEquals("Diam", BuiltinClips.labelOf("idle_loop"))
        assertEquals("Bicara", BuiltinClips.labelOf("sitting_talk"))
        assertEquals("Menari", BuiltinClips.labelOf("dance_loop"))
        assertEquals("Duduk", BuiltinClips.labelOf("sitting_enter"))
        assertNull(BuiltinClips.labelOf("klip-tidak-dikenal"))
        assertNull(BuiltinClips.labelOf(null))
    }

    @Test
    fun `tombol klip menyala untuk alias yang sama`() {
        assertTrue(BuiltinClips.isActive("idle", "idle_loop"))
        assertTrue(BuiltinClips.isActive("sitting_idle", "sitting_enter"))
        assertFalse(BuiltinClips.isActive("dance", "idle_loop"))
        assertFalse(BuiltinClips.isActive("dance", null))
    }

    @Test
    fun `semua klip yang diputar direktur punya label`() {
        // Nama klip acak di web/src/behavior.js harus dikenali katalog label Android,
        // supaya tombol "Gerak" bisa menyorot klip yang sedang berjalan.
        val playedByDirector = listOf(
            "idle_loop", "idle_talk", "walk_loop", "dance_loop", "interact", "idle_torch",
            "spell_idle", "crouch_idle", "sitting_enter", "sitting_idle", "sitting_exit",
            "sitting_talk", "walk_formal", "jog_loop", "jump_loop", "push_loop",
            "kneel_fix", "crouch_walk", "drive_idle",
            "sprint_loop", "swim_idle", "swim_fwd", "pickup",
            "spell_enter", "spell_exit", "spell_shoot", "roll",
        )
        val missing = playedByDirector.filter { BuiltinClips.labelOf(it) == null }
        assertTrue("klip tanpa label: $missing", missing.isEmpty())
    }

    @Test
    fun `katalog klip memuat tambahan v0_1_8`() {
        listOf(
            "walk_formal" to "Jalan santai",
            "jog_loop" to "Lari kecil",
            "jump_loop" to "Lompat",
            "push_loop" to "Mendorong",
            "crouch_walk" to "Merangkak",
            "kneel_fix" to "Berjongkok",
            "drive_idle" to "Duduk santai",
        ).forEach { (key, label) ->
            assertEquals(label, BuiltinClips.labelOf(key))
            assertTrue(BuiltinClips.all.any { it.key == key })
        }
    }

    @Test
    fun `menu cepat tidak lebih dari enam klip`() {
        // Batas dibuat supaya panel tetap muat di layar kecil tanpa menggulir.
        assertTrue(BuiltinClips.quick.size <= 6)
        assertTrue(BuiltinClips.quick.all { it.label.isNotBlank() && it.label.length <= 12 })
    }

    @Test
    fun `empat aksi utama tersedia dan bisa dicari dari id`() {
        assertEquals(4, QuickMenuAction.entries.size)
        assertEquals(QuickMenuAction.CHAT, QuickMenuAction.fromId("chat"))
        assertEquals(QuickMenuAction.SEAT, QuickMenuAction.fromId("duduk"))
        assertNull(QuickMenuAction.fromId("tidak-ada"))
        QuickMenuAction.entries.forEach { action ->
            assertTrue("label ${action.label} terlalu panjang", action.label.length <= 12)
        }
    }

    @Test
    fun `menu diletakkan di bawah avatar yang ada di separuh atas layar`() {
        val (x, y) = QuickMenuPlacement.forAvatar(
            avatarX = 600,
            avatarY = 300,
            avatarWidth = 400,
            avatarHeight = 800,
            menuWidth = 300,
            menuHeight = 700,
            screenWidth = 1080,
            screenHeight = 2000,
            marginPx = 30,
        )
        assertEquals("di bawah avatar + margin", 300 + 800 + 30, y)
        assertEquals("di tengah avatar", 600 + (400 - 300) / 2, x)
    }

    @Test
    fun `menu diletakkan di atas avatar yang ada di separuh bawah layar`() {
        val (_, y) = QuickMenuPlacement.forAvatar(
            avatarX = 100,
            avatarY = 1400,
            avatarWidth = 400,
            avatarHeight = 500,
            menuWidth = 700,
            menuHeight = 600,
            screenWidth = 1080,
            screenHeight = 2000,
            marginPx = 20,
        )
        assertEquals(1400 - 600 - 20, y)
    }

    @Test
    fun `avatar tinggi dan sempit menaruh menu di samping`() {
        val (x, y) = QuickMenuPlacement.forAvatar(
            avatarX = 300,
            avatarY = 200,
            avatarWidth = 320,
            avatarHeight = 1600,
            menuWidth = 400,
            menuHeight = 700,
            screenWidth = 1080,
            screenHeight = 2000,
            marginPx = 24,
        )
        // 300 + 320 + 24 = 644, muat 400 + 24 → sisi kanan.
        assertEquals(644, x)
        assertEquals("sejajar tengah avatar", 200 + 800 - 350, y)
    }

    @Test
    fun `avatar tinggi yang memenuhi lebar layar tetap dapat posisi tanpa keluar layar`() {
        val (x, y) = QuickMenuPlacement.forAvatar(
            avatarX = 200,
            avatarY = 200,
            avatarWidth = 660,
            avatarHeight = 1600,
            menuWidth = 800,
            menuHeight = 700,
            screenWidth = 1080,
            screenHeight = 2000,
            marginPx = 24,
        )
        // Tidak ada ruang di samping → jatuh ke aturan atas/bawah, tetap di dalam layar.
        assertTrue(x >= 24)
        assertTrue(x + 800 <= 1080)
        assertTrue(y >= 24)
        assertTrue(y + 700 <= 2000)
    }

    @Test
    fun `menu selalu dijepit agar tidak keluar layar`() {
        val (x, y) = QuickMenuPlacement.forAvatar(
            avatarX = 0,
            avatarY = 0,
            avatarWidth = 200,
            avatarHeight = 200,
            menuWidth = 900,
            menuHeight = 900,
            screenWidth = 1080,
            screenHeight = 2000,
            marginPx = 24,
        )
        assertEquals("tidak boleh negatif", 24, x)
        assertTrue("masih di dalam layar", y >= 24)

        val (x2, y2) = QuickMenuPlacement.forAvatar(
            avatarX = 1000,
            avatarY = 1950,
            avatarWidth = 80,
            avatarHeight = 60,
            menuWidth = 800,
            menuHeight = 700,
            screenWidth = 1080,
            screenHeight = 2000,
            marginPx = 24,
        )
        assertTrue(x2 + 800 <= 1080)
        assertTrue(y2 + 700 <= 2000)
    }
}

/**
 * Katalog klip harus sama dengan yang benar-benar dibundel renderer, dan harus bisa dicari.
 *
 * Dulu `BuiltinClips.all` hanya 17 entri sementara `assets/animations` berisi 29 berkas, sehingga
 * layar Animasi (dan header Beranda) menyebut angka yang salah.
 */
class BuiltinClipCatalogTest {

    @Test
    fun `katalog berisi 29 klip`() {
        assertEquals(29, BuiltinClips.all.size)
    }

    @Test
    fun `kunci klip unik dan tidak kosong`() {
        val keys = BuiltinClips.all.map { it.key }
        assertEquals("ada kunci ganda: $keys", keys.size, keys.toSet().size)
        for (clip in BuiltinClips.all) {
            assertTrue("${clip.key} tanpa label", clip.label.isNotBlank())
            assertTrue("${clip.key} tanpa kunci", clip.key.isNotBlank())
        }
    }

    @Test
    fun `semua kategori terisi`() {
        val counts = BuiltinClips.countByCategory()
        for (category in ClipCategory.entries) {
            assertTrue("kategori ${category.label} kosong", (counts[category] ?: 0) > 0)
        }
        assertEquals(BuiltinClips.all.size, counts.values.sum())
    }

    @Test
    fun `pencarian mencocokkan label dan kunci klip`() {
        assertEquals(listOf("Berenang"), BuiltinClips.filter("berenang").map { it.label })
        // "swim" adalah nama berkas, bukan label Indonesia.
        assertEquals(listOf("Berenang"), BuiltinClips.filter("swim_fwd").map { it.label })
        assertTrue("pencarian kosong harus mengembalikan semua", BuiltinClips.filter("  ").size == BuiltinClips.all.size)
        assertTrue("pencarian tak dikenal harus kosong", BuiltinClips.filter("zzz").isEmpty())
    }

    @Test
    fun `filter kategori tidak mencampur kategori lain`() {
        val pose = BuiltinClips.filter("", ClipCategory.POSE)
        assertTrue("kategori Pose kosong", pose.isNotEmpty())
        assertTrue("ada klip non-Pose di filter Pose", pose.all { it.category == ClipCategory.POSE })
        assertTrue(
            "filter kategori + pencarian harus bekerja bersama",
            BuiltinClips.filter("duduk", ClipCategory.POSE).any { it.label == "Duduk" },
        )
    }

    @Test
    fun `menu cepat tetap enam klip`() {
        assertEquals(6, BuiltinClips.quick.size)
        assertTrue(
            "klip menu cepat harus ada di katalog",
            BuiltinClips.quick.all { quick -> BuiltinClips.all.any { it.key == quick.key } },
        )
    }
}
