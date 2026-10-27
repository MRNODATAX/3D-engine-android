package io.github.mrnodatax.mateengine.chat

import android.util.Base64
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.json.JSONArray
import org.json.JSONObject
import java.io.File
import java.net.HttpURLConnection
import java.net.URL
import java.nio.ByteBuffer
import java.nio.ByteOrder
import kotlin.math.abs
import kotlin.math.max
import kotlin.math.sqrt

/** Hasil sintesis: berkas WAV, amplop amplitudo untuk lip-sync, dan durasinya. */
data class SpeechClip(
    val file: File,
    val envelope: List<Float>,
    val durationMs: Int,
    val sampleRate: Int,
    val engine: String,
)

/**
 * Suara waifu lewat Gemini TTS.
 *
 * Memakai `gemini-2.5-flash-preview-tts` dengan `responseModalities: ["AUDIO"]`; balasannya
 * WAV 24 kHz mono (16-bit PCM) dalam base64. Dokumentasi:
 * https://ai.google.dev/gemini-api/docs/generate-content/speech-generation
 *
 * Kunci API milik pengguna sendiri, dikirim lewat header `x-goog-api-key`.
 */
class GeminiTts(
    private val endpoint: String =
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent",
    private val timeoutMs: Int = 45_000,
) {

    sealed interface Result {
        data class Success(val clip: SpeechClip) : Result
        data class Failure(val message: String) : Result
    }

    suspend fun synthesize(
        apiKey: String,
        text: String,
        voiceName: String,
        cacheDir: File,
        styleHint: String? = null,
    ): Result = withContext(Dispatchers.IO) {
        if (apiKey.isBlank()) return@withContext Result.Failure("API key Gemini belum diisi.")
        val spoken = text.trim().take(MAX_CHARS)
        if (spoken.isEmpty()) return@withContext Result.Failure("Teks kosong.")

        val prompt = if (styleHint.isNullOrBlank()) spoken else "$styleHint: $spoken"
        val payload = JSONObject().apply {
            put(
                "contents",
                JSONArray().put(
                    JSONObject().apply {
                        put("role", "user")
                        put("parts", JSONArray().put(JSONObject().put("text", prompt)))
                    },
                ),
            )
            put(
                "generationConfig",
                JSONObject().apply {
                    put("responseModalities", JSONArray().put("AUDIO"))
                    put(
                        "speechConfig",
                        JSONObject().put(
                            "voiceConfig",
                            JSONObject().put(
                                "prebuiltVoiceConfig",
                                JSONObject().put("voiceName", voiceName),
                            ),
                        ),
                    )
                },
            )
        }

        var connection: HttpURLConnection? = null
        try {
            connection = (URL(endpoint).openConnection() as HttpURLConnection).apply {
                requestMethod = "POST"
                connectTimeout = timeoutMs
                readTimeout = timeoutMs
                doOutput = true
                setRequestProperty("Content-Type", "application/json; charset=utf-8")
                setRequestProperty("x-goog-api-key", apiKey.trim())
            }
            connection.outputStream.use { it.write(payload.toString().toByteArray(Charsets.UTF_8)) }
            val code = connection.responseCode
            if (code !in 200..299) {
                val body = connection.errorStream?.bufferedReader()?.use { reader -> reader.readText() }.orEmpty()
                val message = runCatching {
                    JSONObject(body).optJSONObject("error")?.optString("message")
                }.getOrNull()
                return@withContext Result.Failure(
                    "Gemini TTS gagal (HTTP $code): ${message?.take(180) ?: "tanpa keterangan"}",
                )
            }
            val body = connection.inputStream.bufferedReader().use { it.readText() }
            val data = extractAudio(base64OrNull(body), body)
                ?: return@withContext Result.Failure(
                    "Balasan TTS tidak memuat audio. Model mungkin menolak teks ini.",
                )
            val file = File(cacheDir, "speech-${System.currentTimeMillis()}.wav").apply {
                parentFile?.mkdirs()
                writeBytes(data)
            }
            val pcm = parseWav(data)
                ?: return@withContext Result.Failure("Audio balikan tidak bisa dibaca sebagai WAV.")
            Result.Success(
                SpeechClip(
                    file = file,
                    envelope = buildEnvelope(pcm.first, pcm.second.samples),
                    durationMs = pcm.second.durationMs,
                    sampleRate = pcm.second.sampleRate,
                    engine = "gemini-tts",
                ),
            )
        } catch (error: Exception) {
            Result.Failure("TTS tidak dapat dihubungi: ${error.message ?: error::class.simpleName}")
        } finally {
            connection?.disconnect()
        }
    }

    /** Beberapa bentuk balasan memakai inlineData, sebagian inline_data. */
    private fun base64OrNull(body: String): String? = runCatching {
        val parts = JSONObject(body).optJSONArray("candidates")
            ?.optJSONObject(0)?.optJSONObject("content")?.optJSONArray("parts") ?: return null
        for (index in 0 until parts.length()) {
            val part = parts.optJSONObject(index) ?: continue
            val inline = part.optJSONObject("inlineData") ?: part.optJSONObject("inline_data") ?: continue
            val data = inline.optString("data")
            if (data.isNotBlank()) return data
        }
        null
    }.getOrNull()

    private fun extractAudio(base64: String?, body: String): ByteArray? {
        if (base64 != null) return runCatching { Base64.decode(base64, Base64.DEFAULT) }.getOrNull()
        // Sebagian endpoint mengembalikan audio lewat fileData; tidak dipakai di sini.
        if (body.isBlank()) return null
        return null
    }

    data class Pcm(val sampleRate: Int, val samples: ShortArray) {
        val durationMs: Int
            get() = if (sampleRate <= 0) 0 else (samples.size * 1000L / sampleRate).toInt()
    }

    /** Membaca WAV PCM 16-bit mono. Mengembalikan null bila formatnya lain. */
    fun parseWav(bytes: ByteArray): Pair<Int, Pcm>? {
        if (bytes.size < 44) return null
        val buffer = ByteBuffer.wrap(bytes).order(ByteOrder.LITTLE_ENDIAN)
        if (bytes[0] != 'R'.code.toByte() || bytes[1] != 'I'.code.toByte()) return null
        var offset = 12
        var sampleRate = 24_000
        var channels = 1
        var bits = 16
        var dataStart = -1
        var dataLength = 0
        while (offset + 8 <= bytes.size) {
            val id = String(bytes, offset, 4, Charsets.US_ASCII)
            val size = buffer.getInt(offset + 4)
            val body = offset + 8
            when (id) {
                "fmt " -> {
                    channels = buffer.getShort(body + 2).toInt().coerceAtLeast(1)
                    sampleRate = buffer.getInt(body + 4)
                    bits = buffer.getShort(body + 14).toInt()
                }
                "data" -> {
                    dataStart = body
                    dataLength = minOf(size, bytes.size - body)
                }
            }
            if (size <= 0) break
            offset = body + size + (size % 2)
        }
        if (dataStart < 0 || dataLength <= 0) return null
        if (bits != 16) return null
        val total = dataLength / 2
        val frames = total / channels
        val samples = ShortArray(frames)
        var index = 0
        for (frame in 0 until frames) {
            // Kalau stereo, ambil kanal pertama saja untuk amplop.
            samples[frame] = buffer.getShort(dataStart + frame * channels * 2)
            index += 1
        }
        if (index == 0) return null
        return channels to Pcm(sampleRate, samples)
    }

    /**
     * Amplop amplitudo untuk lip-sync: RMS per 50 ms, dinormalisasi ke 0..1.
     * Bukan prediksi bentuk mulut, hanya tingkat kenyaringan — cukup untuk sinkron kasar.
     */
    fun buildEnvelope(windowMs: Int = 50, pcm: Pair<Int, Pcm>): List<Float> {
        val (channels, pcmData) = pcm
        if (channels <= 0 || pcmData.samples.isEmpty()) return emptyList()
        val window = max(1, pcmData.sampleRate * windowMs / 1000)
        val result = ArrayList<Float>(pcmData.samples.size / window + 1)
        var index = 0
        var peak = 0f
        while (index < pcmData.samples.size) {
            val end = minOf(index + window, pcmData.samples.size)
            var sum = 0.0
            for (i in index until end) {
                val v = pcmData.samples[i] / 32768.0
                sum += v * v
            }
            val rms = sqrt(sum / (end - index)).toFloat()
            result.add(rms)
            if (rms > peak) peak = rms
            index = end
        }
        if (peak <= 0.0001f) return result.map { 0f }
        // Normalisasi + akar kuadrat supaya mulut tidak selalu terbuka penuh.
        return result.map { value ->
            val normalized = (value / peak).coerceIn(0f, 1f)
            sqrt(normalized) * 0.85f + if (normalized > 0.02f) 0.15f else 0f
        }
    }

    /** Skala amplitudo mentah untuk uji unit. */
    fun peakOf(samples: ShortArray): Float {
        var peak = 0
        for (value in samples) {
            val magnitude = abs(value.toInt())
            if (magnitude > peak) peak = magnitude
        }
        return peak / 32768f
    }

    companion object {
        private const val MAX_CHARS = 600

        /** Suara yang tersedia di Gemini TTS; semuanya bisa dipakai untuk bahasa Indonesia. */
        val VOICES = listOf("Kore", "Puck", "Zephyr", "Charon", "Fenrir", "Aoede")
    }
}
