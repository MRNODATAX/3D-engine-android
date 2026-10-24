package io.github.mrnodatax.mateengine.chat

/** Persona waifu yang bisa diubah pengguna; tidak ada nilai yang tidak bisa diedit. */
data class Persona(
    val name: String = "Waifu",
    val userName: String = "Kamu",
    val personality: String = "hangat, perhatian, suka bercanda ringan, dan setia menemani",
    val speakingStyle: String = "kalimat pendek, santai, tidak berlebihan",
    val language: String = "Indonesia",
)

data class ChatMessage(
    val id: Long,
    val role: Role,
    val text: String,
    val timestamp: Long,
    val failed: Boolean = false,
) {
    enum class Role { USER, MODEL }
}

data class ChatSettings(
    val model: String = DEFAULT_MODEL,
    val ttsEnabled: Boolean = false,
    val voicePackEnabled: Boolean = true,
) {
    companion object {
        /**
         * Model default. Dapat diganti dari UI; bila nama model tidak dikenali API,
         * aplikasi menampilkan pesan galat dari server, bukan menebak.
         */
        const val DEFAULT_MODEL = "gemini-2.5-flash"
        val SUGGESTED_MODELS = listOf("gemini-2.5-flash", "gemini-2.5-flash-lite", "gemini-2.0-flash")
    }
}

/**
 * Penyusun instruksi sistem.
 *
 * Dibuat sebagai fungsi murni agar bisa diuji tanpa jaringan. Isinya meniru pola Mate Engine
 * (prompt persona yang dapat diedit pengguna), bukan menyalin teks prompt miliknya.
 */
object PersonaPrompt {
    fun build(persona: Persona): String = buildString {
        appendLine("Kamu adalah ${persona.name}, karakter pendamping (waifu) milik pengguna.")
        appendLine("Pengguna ingin dipanggil \"${persona.userName}\".")
        appendLine("Kepribadianmu: ${persona.personality}.")
        appendLine("Gaya bicara: ${persona.speakingStyle}.")
        appendLine("Bahasa jawaban: ${persona.language}.")
        appendLine()
        appendLine("Aturan:")
        appendLine("1. Jawab maksimal 3 kalimat pendek, kecuali pengguna meminta penjelasan panjang.")
        appendLine("2. Tetap dalam karakter, tetapi jangan mengaku sebagai manusia sungguhan bila ditanya.")
        appendLine("3. Jangan mengarang fakta tentang perangkat, data pengguna, atau kejadian yang tidak kamu ketahui.")
        appendLine("4. Jangan menampilkan markdown tabel, kode, atau tautan kecuali diminta.")
        appendLine("5. Hindari konten seksual eksplisit dan ujaran kebencian.")
        append("6. Bila pengguna meminta bantuan teknis di aplikasi ini, jawab singkat dan jujur tentang batas kemampuanmu.")
    }

    /** Riwayat dipotong agar biaya token dan latensi tetap terkendali. */
    fun trimHistory(messages: List<ChatMessage>, limit: Int = 24): List<ChatMessage> =
        messages.filterNot { it.failed }.takeLast(limit.coerceAtLeast(0))
}

/** Pemetaan galat HTTP Gemini menjadi kalimat yang bisa ditindaklanjuti pengguna. */
object GeminiErrorMapper {
    data class MappedError(val userMessage: String, val retryable: Boolean, val hint: String? = null)

    fun map(httpCode: Int, apiStatus: String?, apiMessage: String?): MappedError {
        val raw = apiMessage?.take(300)
        return when {
            httpCode == 400 && (apiStatus == "INVALID_ARGUMENT" || raw?.contains("API key", true) == true) ->
                MappedError(
                    "API key ditolak. Periksa kembali kunci Gemini di halaman Chat.",
                    retryable = false,
                    hint = raw,
                )
            httpCode == 401 || httpCode == 403 ->
                MappedError("Kunci tidak punya izin untuk model ini. Coba model lain atau buat kunci baru.", false, raw)
            httpCode == 404 ->
                MappedError("Nama model tidak dikenali server. Pilih model dari daftar saran.", false, raw)
            httpCode == 429 ->
                MappedError("Kuota atau batas laju tercapai. Tunggu sebentar lalu coba lagi.", true, raw)
            httpCode in 500..599 ->
                MappedError("Server Gemini sedang bermasalah. Coba lagi beberapa saat.", true, raw)
            httpCode == 0 ->
                MappedError("Tidak dapat menghubungi server. Periksa koneksi internet.", true, raw)
            else ->
                MappedError("Permintaan gagal (HTTP $httpCode).", true, raw)
        }
    }
}
