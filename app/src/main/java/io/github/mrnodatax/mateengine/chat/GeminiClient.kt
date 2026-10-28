package io.github.mrnodatax.mateengine.chat

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.json.JSONArray
import org.json.JSONObject
import java.io.BufferedReader
import java.net.HttpURLConnection
import java.net.URL
import java.net.UnknownHostException

/**
 * Klien Gemini paling sederhana yang cukup untuk chat.
 *
 * Kunci dikirim lewat header `x-goog-api-key`, tidak pernah ditulis ke log.
 * Tidak ada pustaka jaringan tambahan agar ukuran APK tetap kecil.
 */
class GeminiClient(
    private val endpointBase: String = "https://generativelanguage.googleapis.com/v1beta/models",
    private val timeoutMs: Int = 30_000,
) {

    sealed interface Result {
        data class Success(val text: String) : Result
        data class Failure(val mapped: GeminiErrorMapper.MappedError, val httpCode: Int) : Result
    }

    suspend fun generate(
        apiKey: String,
        model: String,
        persona: Persona,
        history: List<ChatMessage>,
        userText: String,
    ): Result = withContext(Dispatchers.IO) {
        if (apiKey.isBlank()) {
            return@withContext Result.Failure(
                GeminiErrorMapper.MappedError("API key Gemini belum diisi.", retryable = false),
                400,
            )
        }
        val payload = buildPayload(persona, history, userText)
        val url = URL("$endpointBase/${model.trim()}:generateContent")
        var connection: HttpURLConnection? = null
        try {
            connection = (url.openConnection() as HttpURLConnection).apply {
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
                val body = connection.errorStream?.bufferedReader()?.use(BufferedReader::readText).orEmpty()
                val (status, message) = parseError(body)
                return@withContext Result.Failure(GeminiErrorMapper.map(code, status, message), code)
            }
            val body = connection.inputStream.bufferedReader().use(BufferedReader::readText)
            val text = extractText(body)
            if (text.isBlank()) {
                val (status, message) = parseBlock(body)
                val mapped = if (status != null) {
                    GeminiErrorMapper.MappedError(
                        "Balasan diblokir oleh filter keamanan Gemini ($status). Ubah kalimat lalu coba lagi.",
                        retryable = false,
                        hint = message,
                    )
                } else {
                    GeminiErrorMapper.MappedError("Server mengembalikan balasan kosong.", retryable = true)
                }
                Result.Failure(mapped, 200)
            } else {
                Result.Success(text)
            }
        } catch (error: UnknownHostException) {
            Result.Failure(GeminiErrorMapper.map(0, null, error.message), 0)
        } catch (error: Exception) {
            Result.Failure(
                GeminiErrorMapper.MappedError(
                    "Koneksi ke Gemini gagal: ${error.message ?: error::class.simpleName}",
                    retryable = true,
                ),
                0,
            )
        } finally {
            connection?.disconnect()
        }
    }

    fun buildPayload(persona: Persona, history: List<ChatMessage>, userText: String): JSONObject {
        val contents = JSONArray()
        PersonaPrompt.trimHistory(history).forEach { message ->
            contents.put(
                JSONObject().apply {
                    put("role", if (message.role == ChatMessage.Role.USER) "user" else "model")
                    put("parts", JSONArray().put(JSONObject().put("text", message.text)))
                },
            )
        }
        contents.put(
            JSONObject().apply {
                put("role", "user")
                put("parts", JSONArray().put(JSONObject().put("text", userText)))
            },
        )
        return JSONObject().apply {
            put(
                "systemInstruction",
                JSONObject().put("parts", JSONArray().put(JSONObject().put("text", PersonaPrompt.build(persona)))),
            )
            put("contents", contents)
            put(
                "generationConfig",
                JSONObject().apply {
                    put("temperature", 0.9)
                    put("topP", 0.95)
                    put("maxOutputTokens", 512)
                },
            )
            put(
                "safetySettings",
                JSONArray().apply {
                    listOf("HARM_CATEGORY_HARASSMENT", "HARM_CATEGORY_HATE_SPEECH", "HARM_CATEGORY_SEXUALLY_EXPLICIT")
                        .forEach { category ->
                            put(JSONObject().put("category", category).put("threshold", "BLOCK_MEDIUM_AND_ABOVE"))
                        }
                },
            )
        }
    }

    /** Menggabungkan semua part teks pada kandidat pertama. */
    fun extractText(body: String): String {
        val root = runCatching { JSONObject(body) }.getOrNull() ?: return ""
        val candidates = root.optJSONArray("candidates") ?: return ""
        val first = candidates.optJSONObject(0) ?: return ""
        val parts = first.optJSONObject("content")?.optJSONArray("parts") ?: return ""
        val builder = StringBuilder()
        for (index in 0 until parts.length()) {
            val text = parts.optJSONObject(index)?.optString("text").orEmpty()
            if (text.isNotBlank()) builder.append(text)
        }
        return builder.toString().trim()
    }

    private fun parseError(body: String): Pair<String?, String?> {
        val error = runCatching { JSONObject(body).optJSONObject("error") }.getOrNull()
        return (error?.optString("status")?.takeIf { it.isNotBlank() }) to
            (error?.optString("message")?.takeIf { it.isNotBlank() })
    }

    private fun parseBlock(body: String): Pair<String?, String?> {
        val root = runCatching { JSONObject(body) }.getOrNull() ?: return null to null
        val feedback = root.optJSONObject("promptFeedback")
        val blocked = feedback?.optString("blockReason")?.takeIf { it.isNotBlank() }
        if (blocked != null) return blocked to null
        val finish = root.optJSONArray("candidates")?.optJSONObject(0)?.optString("finishReason")
        return if (!finish.isNullOrBlank() && finish != "STOP") finish to null else null to null
    }
}
