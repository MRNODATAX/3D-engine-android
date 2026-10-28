package io.github.mrnodatax.mateengine.overlay

import kotlin.math.abs
import kotlin.math.sqrt

/**
 * Bagian yang bisa diuji tanpa Android dari fitur "ketuk avatar 3× → menu cepat".
 *
 * Dipisah dari [OverlayService] karena logika ketukan dan katalog klip mudah salah (jarak antar
 * ketukan, jeda, alias nama klip) sementara mengujinya butuh emulator bila menumpang di Service.
 */

/** Layar di dalam menu cepat. */
enum class QuickMenuScreen {
    /** Pilihan utama: Gerak, Chat AI, Duduk/Berdiri, Setelan. */
    ROOT,

    /** Daftar klip bawaan ("gerakan custom"). */
    CLIPS,

    /** Balon obrolan dengan AI. */
    CHAT,
}

/** Aksi di layar utama menu cepat. */
enum class QuickMenuAction(val id: String, val label: String) {
    ANIMATIONS("gerak", "Gerak"),
    CHAT("chat", "Chat AI"),
    SEAT("duduk", "Duduk"),
    SETTINGS("setelan", "Setelan"),
    ;

    companion object {
        fun fromId(id: String?): QuickMenuAction? = entries.firstOrNull { it.id == id }
    }
}

/** Satu klip bawaan yang bisa diputar dari menu cepat. */
data class BuiltinClip(val key: String, val label: String)

/**
 * Katalog klip bawaan (CC0) dengan label bahasa Indonesia.
 *
 * Alias (`idle_loop`, `sitting_enter`, …) ikut dipetakan supaya tombol di menu bisa menyorot klip
 * yang sedang berjalan tanpa menebak-nebak nama berkas.
 */
object BuiltinClips {

    val all: List<BuiltinClip> = listOf(
        BuiltinClip("idle", "Diam"),
        BuiltinClip("talk", "Bicara"),
        BuiltinClip("walk", "Jalan"),
        BuiltinClip("dance", "Menari"),
        BuiltinClip("interact", "Melambai"),
        BuiltinClip("sitting_idle", "Duduk"),
        BuiltinClip("walk_formal", "Jalan santai"),
        BuiltinClip("jog_loop", "Lari kecil"),
        BuiltinClip("jump_loop", "Lompat"),
        BuiltinClip("push_loop", "Mendorong"),
        BuiltinClip("crouch_walk", "Merangkak"),
        BuiltinClip("kneel_fix", "Berjongkok"),
        BuiltinClip("drive_idle", "Duduk santai"),
        BuiltinClip("sprint_loop", "Lari cepat"),
        BuiltinClip("swim_idle", "Mengambang"),
        BuiltinClip("swim_fwd", "Berenang"),
        BuiltinClip("roll", "Berguling"),
    )

    /** Klip yang dipakai menu cepat; dibatasi enam supaya panel tetap muat tanpa menggulir. */
    val quick: List<BuiltinClip> = listOf(
        BuiltinClip("idle", "Diam"),
        BuiltinClip("talk", "Bicara"),
        BuiltinClip("dance", "Menari"),
        BuiltinClip("interact", "Melambai"),
        BuiltinClip("jog_loop", "Lari kecil"),
        BuiltinClip("kneel_fix", "Berjongkok"),
    )

    private val aliases: Map<String, String> = mapOf(
        "idle" to "Diam",
        "idle_loop" to "Diam",
        "idle_torch" to "Diam",
        "spell_idle" to "Diam",
        "crouch_idle" to "Jongkok",
        "talk" to "Bicara",
        "idle_talk" to "Bicara",
        "sitting_talk" to "Bicara",
        "walk" to "Jalan",
        "walk_loop" to "Jalan",
        "dance" to "Menari",
        "dance_loop" to "Menari",
        "interact" to "Melambai",
        "walk_formal" to "Jalan santai",
        "jog_loop" to "Lari kecil",
        "jump_loop" to "Lompat",
        "push_loop" to "Mendorong",
        "crouch_walk" to "Merangkak",
        "kneel_fix" to "Berjongkok",
        "drive_idle" to "Duduk santai",
        "sprint_loop" to "Lari cepat",
        "swim_idle" to "Mengambang",
        "swim_fwd" to "Berenang",
        "pickup" to "Memungut",
        "spell_enter" to "Siap mantra",
        "spell_exit" to "Selesai mantra",
        "spell_shoot" to "Sihir",
        "roll" to "Berguling",
        "sitting_idle" to "Duduk",
        "sitting_enter" to "Duduk",
        "sitting_exit" to "Berdiri",
        "jump_start" to "Lompat",
        "jump_land" to "Mendarat",
    )

    /** Label untuk nama klip apa pun yang dilaporkan renderer, atau null bila tidak dikenal. */
    fun labelOf(clip: String?): String? = clip?.let { aliases[it] }

    /** Apakah tombol untuk [key] harus tampak aktif ketika klip [running] sedang diputar? */
    fun isActive(key: String, running: String?): Boolean {
        if (running == null) return false
        if (key == running) return true
        val runningLabel = labelOf(running) ?: return false
        return labelOf(key) == runningLabel
    }
}

/**
 * Penghitung ketukan beruntun pada avatar.
 *
 * Aturan: ketukan dihitung bersambung bila jedanya ≤ [maxGapMs] dan jaraknya ≤ [maxDistancePx]
 * dari ketukan sebelumnya. Ketukan ke-3 (atau lebih) memicu menu. Angka ini dipilih supaya ketukan
 * santai (sekitar 2–3 ketukan/detik) tetap terbaca, tetapi tidak menyala saat pengguna hanya
 * mengetuk sekali-dua kali untuk mengelus kepala.
 */
class TapCounter(
    private val maxGapMs: Long = 700,
    private val maxDistancePx: Float = 90f,
) {
    private var count = 0
    private var lastAt = Long.MIN_VALUE
    private var lastX = 0f
    private var lastY = 0f

    /** Jumlah ketukan beruntun setelah ketukan ini didaftarkan. */
    fun register(x: Float, y: Float, now: Long): Int {
        val dx = x - lastX
        val dy = y - lastY
        val near = count > 0 && now - lastAt in 0..maxGapMs && sqrt(dx * dx + dy * dy) <= maxDistancePx
        count = if (near) count + 1 else 1
        lastAt = now
        lastX = x
        lastY = y
        return count
    }

    val current: Int get() = count

    fun reset() {
        count = 0
        lastAt = Long.MIN_VALUE
    }
}

/** Posisi menu cepat relatif terhadap jendela avatar. */
object QuickMenuPlacement {

    /**
     * Hitung posisi (x, y) pojok kiri-atas menu dalam koordinat layar.
     *
     * Aturan penempatan:
     * 1. Bila avatar tinggi (menempati > 60% layar, kondisi bawaan overlay), menu diletakkan di
     *    **samping** avatar — di atas/bawah akan menutupi avatar itu sendiri.
     * 2. Bila avatar pendek, menu di bawah avatar ketika avatar ada di separuh atas layar, dan di
     *    atas avatar ketika avatar ada di separuh bawah.
     * Hasil selalu dijepit agar menu tidak keluar layar (termasuk saat avatar menempel di tepi).
     */
    fun forAvatar(
        avatarX: Int,
        avatarY: Int,
        avatarWidth: Int,
        avatarHeight: Int,
        menuWidth: Int,
        menuHeight: Int,
        screenWidth: Int,
        screenHeight: Int,
        marginPx: Int,
    ): Pair<Int, Int> {
        val avatarCenterY = avatarY + avatarHeight / 2
        val tall = avatarHeight * 10 > screenHeight * 6
        val rawX: Int
        val rawY: Int
        val sideRight = avatarX + avatarWidth + marginPx
        val sideLeft = avatarX - menuWidth - marginPx
        val fitsRight = sideRight + menuWidth + marginPx <= screenWidth
        val fitsLeft = sideLeft >= marginPx
        if (tall && (fitsRight || fitsLeft)) {
            // Geser ke samping avatar; pilih sisi yang masih lapang.
            rawX = if (fitsRight) sideRight else sideLeft
            rawY = avatarCenterY - menuHeight / 2
        } else {
            val below = avatarCenterY < screenHeight / 2
            rawX = avatarX + (avatarWidth - menuWidth) / 2
            rawY = if (below) avatarY + avatarHeight + marginPx else avatarY - menuHeight - marginPx
        }
        val maxX = (screenWidth - menuWidth - marginPx).coerceAtLeast(marginPx)
        val maxY = (screenHeight - menuHeight - marginPx).coerceAtLeast(marginPx)
        return rawX.coerceIn(marginPx, maxX) to rawY.coerceIn(marginPx, maxY)
    }

    /** Apakah dua titik cukup dekat untuk dianggap ketukan pada avatar yang sama? */
    fun sameAvatar(x1: Float, y1: Float, x2: Float, y2: Float, maxPx: Float): Boolean =
        abs(x1 - x2) <= maxPx && abs(y1 - y2) <= maxPx
}
