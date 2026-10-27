package io.github.mrnodatax.mateengine.chat

import android.content.Context
import io.github.mrnodatax.mateengine.overlay.OverlayRuntime
import android.util.Log
import io.github.mrnodatax.mateengine.overlay.OverlayService
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import kotlinx.coroutines.Dispatchers

data class ChatUiState(
    val persona: Persona = Persona(),
    val settings: ChatSettings = ChatSettings(),
    val messages: List<ChatMessage> = emptyList(),
    val hasApiKey: Boolean = false,
    val sending: Boolean = false,
    val error: String? = null,
    val errorHint: String? = null,
    val isSpeaking: Boolean = false,
    val lastSpeech: String? = null,
)

/**
 * Menyatukan repository, klien Gemini, TTS, dan reaksi avatar.
 *
 * Semua pesan galat berasal dari respons server yang sebenarnya; tidak ada teks balasan
 * contoh yang dipalsukan bila jaringan atau kunci gagal.
 */
class ChatController(context: Context) {

    private val TAG = "MateEngineChat"

    private val appContext = context.applicationContext
    val repository = ChatRepository.get(appContext)
    private val client = GeminiClient()
    private val tts = GeminiTts()
    private val speech = SpeechController(appContext)

    private val _ui = MutableStateFlow(fromRepository())
    val ui: StateFlow<ChatUiState> = _ui.asStateFlow()

    private fun fromRepository(): ChatUiState {
        val state = repository.state.value
        return ChatUiState(
            persona = state.persona,
            settings = state.settings,
            messages = state.messages,
            hasApiKey = state.hasApiKey,
        )
    }

    fun refresh() {
        _ui.value = _ui.value.copy(
            persona = repository.state.value.persona,
            settings = repository.state.value.settings,
            messages = repository.state.value.messages,
            hasApiKey = repository.state.value.hasApiKey,
        )
    }

    fun saveApiKey(value: String) {
        repository.saveApiKey(value)
        _ui.value = _ui.value.copy(hasApiKey = repository.state.value.hasApiKey, error = null)
    }

    fun clearApiKey() {
        repository.clearApiKey()
        _ui.value = _ui.value.copy(hasApiKey = false)
    }

    fun savePersona(persona: Persona) {
        repository.savePersona(persona)
        _ui.value = _ui.value.copy(persona = persona)
    }

    fun updateSettings(settings: ChatSettings) {
        repository.saveSettings(settings)
        _ui.value = _ui.value.copy(settings = settings)
        if (settings.ttsEnabled) speech.initialize()
    }

    fun clearHistory() {
        repository.clearHistory()
        _ui.value = _ui.value.copy(messages = emptyList(), error = null)
    }

    fun send(text: String, scope: CoroutineScope) {
        val trimmed = text.trim()
        if (trimmed.isEmpty() || _ui.value.sending) return
        val key = repository.apiKey()
        if (key.isNullOrBlank()) {
            _ui.value = _ui.value.copy(error = "Isi API key Gemini terlebih dahulu.", errorHint = null)
            return
        }
        val history = repository.state.value.messages
        repository.addMessage(ChatMessage.Role.USER, trimmed)
        _ui.value = _ui.value.copy(messages = repository.state.value.messages, sending = true, error = null, errorHint = null)

        scope.launch {
            val result = client.generate(
                apiKey = key,
                model = repository.state.value.settings.model,
                persona = repository.state.value.persona,
                history = history,
                userText = trimmed,
            )
            when (result) {
                is GeminiClient.Result.Success -> {
                    repository.addMessage(ChatMessage.Role.MODEL, result.text)
                    _ui.value = _ui.value.copy(
                        messages = repository.state.value.messages,
                        sending = false,
                        error = null,
                        errorHint = null,
                    )
                    reactToReply(result.text, key)
                }
                is GeminiClient.Result.Failure -> {
                    repository.addMessage(
                        ChatMessage.Role.MODEL,
                        result.mapped.userMessage,
                        failed = true,
                    )
                    _ui.value = _ui.value.copy(
                        messages = repository.state.value.messages,
                        sending = false,
                        error = result.mapped.userMessage,
                        errorHint = result.mapped.hint,
                    )
                }
            }
        }
    }

    /**
     * Reaksi avatar terhadap balasan.
     *
     * Urutan upaya: Gemini TTS (suara natural + lip-sync dari amplitudo audio) → TTS perangkat →
     * animasi mulut saja tanpa suara. Tidak ada audio yang dibundel di APK.
     */
    private suspend fun reactToReply(text: String, apiKey: String) {
        val settings = repository.state.value.settings
        val running = OverlayRuntime.state.value.running

        if (settings.ttsEnabled && settings.ttsEngine == "gemini") {
            _ui.value = _ui.value.copy(isSpeaking = true)
            val result = tts.synthesize(
                apiKey = apiKey,
                text = text,
                voiceName = settings.ttsVoice,
                cacheDir = java.io.File(appContext.cacheDir, "speech"),
            )
            _ui.value = _ui.value.copy(isSpeaking = false)
            when (result) {
                is GeminiTts.Result.Success -> {
                    val clip = result.clip
                    speech.playClip(clip)
                    if (running) OverlayService.playEnvelope(appContext, clip.envelope.toFloatArray(), clip.durationMs)
                    _ui.value = _ui.value.copy(lastSpeech = "Gemini TTS · ${clip.durationMs / 1000.0}s")
                    return
                }
                is GeminiTts.Result.Failure -> {
                    // Ditampilkan apa adanya; jangan diam-diam pura-pura bersuara.
                    _ui.value = _ui.value.copy(error = result.message, errorHint = "Beralih ke TTS perangkat.")
                    Log.w(TAG, "Gemini TTS gagal: ${result.message}")
                }
            }
        }

        if (settings.ttsEnabled) {
            speech.initialize()
            speech.speak(text)
            _ui.value = _ui.value.copy(lastSpeech = "TTS perangkat")
        }

        // Tanpa audio: tetap gerakkan mulut selama perkiraan durasi bicara.
        if (running) OverlayService.speak(appContext, text, (text.length * 55).coerceIn(1200, 12_000))
    }

    fun stopSpeech() {
        speech.stop()
        OverlayService.stopSpeaking(appContext)
    }

    fun shutdown() {
        speech.shutdown()
    }
}
