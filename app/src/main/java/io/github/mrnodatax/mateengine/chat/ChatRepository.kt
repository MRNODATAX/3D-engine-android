package io.github.mrnodatax.mateengine.chat

import android.content.Context
import android.content.SharedPreferences
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import org.json.JSONArray
import org.json.JSONObject

data class ChatState(
    val persona: Persona = Persona(),
    val settings: ChatSettings = ChatSettings(),
    val messages: List<ChatMessage> = emptyList(),
    val hasApiKey: Boolean = false,
)

/** Riwayat dan persona disimpan lokal di penyimpanan privat aplikasi. */
class ChatRepository private constructor(context: Context) {

    private val prefs: SharedPreferences = context.getSharedPreferences("mate_chat", Context.MODE_PRIVATE)
    private val secretStore = SecretStore(context)

    private val _state = MutableStateFlow(load())
    val state: StateFlow<ChatState> = _state.asStateFlow()

    fun apiKey(): String? = secretStore.readApiKey()

    fun saveApiKey(value: String) {
        secretStore.saveApiKey(value)
        _state.value = _state.value.copy(hasApiKey = secretStore.hasApiKey())
    }

    fun clearApiKey() {
        secretStore.clearApiKey()
        _state.value = _state.value.copy(hasApiKey = false)
    }

    fun savePersona(persona: Persona) {
        prefs.edit()
            .putString("persona", JSONObject().apply {
                put("name", persona.name)
                put("userName", persona.userName)
                put("personality", persona.personality)
                put("speakingStyle", persona.speakingStyle)
                put("language", persona.language)
            }.toString())
            .apply()
        _state.value = _state.value.copy(persona = persona)
    }

    fun saveSettings(settings: ChatSettings) {
        prefs.edit()
            .putString("model", settings.model)
            .putBoolean("tts", settings.ttsEnabled)
            .putBoolean("voicePack", settings.voicePackEnabled)
            .apply()
        _state.value = _state.value.copy(settings = settings)
    }

    fun addMessage(role: ChatMessage.Role, text: String, failed: Boolean = false): ChatMessage {
        val message = ChatMessage(
            id = System.currentTimeMillis(),
            role = role,
            text = text,
            timestamp = System.currentTimeMillis(),
            failed = failed,
        )
        val updated = (_state.value.messages + message).takeLast(MAX_MESSAGES)
        persistMessages(updated)
        _state.value = _state.value.copy(messages = updated)
        return message
    }

    fun clearHistory() {
        persistMessages(emptyList())
        _state.value = _state.value.copy(messages = emptyList())
    }

    private fun persistMessages(messages: List<ChatMessage>) {
        val array = JSONArray()
        messages.forEach { message ->
            array.put(JSONObject().apply {
                put("id", message.id)
                put("role", message.role.name)
                put("text", message.text)
                put("timestamp", message.timestamp)
                put("failed", message.failed)
            })
        }
        prefs.edit().putString("messages", array.toString()).apply()
    }

    private fun load(): ChatState {
        val persona = prefs.getString("persona", null)?.let { raw ->
            runCatching {
                val json = JSONObject(raw)
                Persona(
                    name = json.optString("name", "Waifu"),
                    userName = json.optString("userName", "Kamu"),
                    personality = json.optString("personality", Persona().personality),
                    speakingStyle = json.optString("speakingStyle", Persona().speakingStyle),
                    language = json.optString("language", "Indonesia"),
                )
            }.getOrNull()
        } ?: Persona()

        val settings = ChatSettings(
            model = prefs.getString("model", ChatSettings.DEFAULT_MODEL) ?: ChatSettings.DEFAULT_MODEL,
            ttsEnabled = prefs.getBoolean("tts", false),
            voicePackEnabled = prefs.getBoolean("voicePack", true),
        )

        val messages = prefs.getString("messages", null)?.let { raw ->
            runCatching {
                val array = JSONArray(raw)
                buildList {
                    for (index in 0 until array.length()) {
                        val item = array.optJSONObject(index) ?: continue
                        add(
                            ChatMessage(
                                id = item.optLong("id"),
                                role = runCatching { ChatMessage.Role.valueOf(item.optString("role")) }
                                    .getOrDefault(ChatMessage.Role.MODEL),
                                text = item.optString("text"),
                                timestamp = item.optLong("timestamp"),
                                failed = item.optBoolean("failed"),
                            ),
                        )
                    }
                }
            }.getOrNull()
        }.orEmpty()

        return ChatState(
            persona = persona,
            settings = settings,
            messages = messages,
            hasApiKey = secretStore.hasApiKey(),
        )
    }

    companion object {
        private const val MAX_MESSAGES = 200

        @Volatile
        private var instance: ChatRepository? = null

        fun get(context: Context): ChatRepository =
            instance ?: synchronized(this) {
                instance ?: ChatRepository(context.applicationContext).also { instance = it }
            }
    }
}
