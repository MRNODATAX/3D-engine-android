package io.github.mrnodatax.mateengine.chat

import android.content.Context
import io.github.mrnodatax.mateengine.overlay.OverlayRuntime
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
)

/**
 * Menyatukan repository, klien Gemini, TTS, dan reaksi avatar.
 *
 * Semua pesan galat berasal dari respons server yang sebenarnya; tidak ada teks balasan
 * contoh yang dipalsukan bila jaringan atau kunci gagal.
 */
class ChatController(context: Context) {

    private val appContext = context.applicationContext
    val repository = ChatRepository.get(appContext)
    private val client = GeminiClient()
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
                    reactToReply(result.text)
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

    /** Reaksi avatar: mulut bergerak selama perkiraan durasi bicara, plus TTS bila aktif. */
    private fun reactToReply(text: String) {
        val durationMs = (text.length * 55).coerceIn(1200, 12_000)
        if (OverlayRuntime.state.value.running) {
            OverlayService.speak(appContext, text, durationMs)
        }
        if (repository.state.value.settings.ttsEnabled) {
            speech.initialize()
            speech.speak(text)
        }
    }

    fun stopSpeech() {
        speech.stop()
        OverlayService.stopSpeaking(appContext)
    }

    fun shutdown() {
        speech.shutdown()
    }
}
