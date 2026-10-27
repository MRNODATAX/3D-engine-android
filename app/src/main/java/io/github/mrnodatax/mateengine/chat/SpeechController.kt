package io.github.mrnodatax.mateengine.chat

import android.content.Context
import android.media.MediaPlayer
import android.speech.tts.TextToSpeech
import android.speech.tts.UtteranceProgressListener
import android.util.Log
import java.util.Locale

/**
 * Ucapan balasan memakai TextToSpeech perangkat (bukan aset suara Mate Engine).
 *
 * Ini dinyatakan apa adanya di UI: Mate Engine desktop tidak memakai TTS, ia memutar klip
 * VoicePack per event. Di Android, TTS dipakai agar balasan Gemini bisa didengar tanpa
 * mendistribusikan ulang audio berhak cipta.
 */
class SpeechController(context: Context) {

    private val appContext = context.applicationContext
    private var engine: TextToSpeech? = null
    private var available = false
    private var languageSupported: Boolean? = null
    private var pendingText: String? = null
    private var player: MediaPlayer? = null
    var onDone: (() -> Unit)? = null
    var onError: ((String) -> Unit)? = null

    fun initialize() {
        if (engine != null) return
        engine = TextToSpeech(appContext) { status ->
            if (status != TextToSpeech.SUCCESS) {
                Log.w(TAG, "TTS tidak tersedia (status $status)")
                onError?.invoke("Mesin TTS perangkat tidak tersedia.")
                return@TextToSpeech
            }
            val tts = engine ?: return@TextToSpeech
            val result = tts.setLanguage(Locale("id", "ID"))
            languageSupported = result != TextToSpeech.LANG_MISSING_DATA && result != TextToSpeech.LANG_NOT_SUPPORTED
            tts.setOnUtteranceProgressListener(object : UtteranceProgressListener() {
                override fun onStart(utteranceId: String?) = Unit
                override fun onDone(utteranceId: String?) {
                    onDone?.invoke()
                }

                @Deprecated("Dipertahankan untuk API 26")
                override fun onError(utteranceId: String?) {
                    onError?.invoke("Ucapan gagal diputar.")
                }

                override fun onError(utteranceId: String?, errorCode: Int) {
                    onError?.invoke("Ucapan gagal diputar (kode $errorCode).")
                }
            })
            available = true
            pendingText?.let { speak(it) }
            pendingText = null
        }
    }

    fun isAvailable(): Boolean = available

    fun speak(text: String) {
        val clean = text
            .replace(Regex("[*_`#>]"), "")
            .take(MAX_SPEECH_CHARS)
            .trim()
        if (clean.isBlank()) return
        if (engine == null) {
            initialize()
            pendingText = clean
            return
        }
        if (!available) {
            pendingText = clean
            return
        }
        val tts = engine ?: return
        tts.setSpeechRate(0.95f)
        tts.setPitch(1.08f)
        tts.speak(clean, TextToSpeech.QUEUE_FLUSH, null, UTTERANCE_ID)
    }

    /** Memutar WAV hasil Gemini TTS. Envelope mulut dikirim terpisah ke renderer. */
    fun playClip(clip: SpeechClip) {
        stop()
        runCatching {
            player = MediaPlayer().apply {
                setDataSource(clip.file.absolutePath)
                setOnCompletionListener { onDone?.invoke() }
                setOnErrorListener { _, what, extra ->
                    onError?.invoke("Pemutaran audio gagal ($what/$extra)")
                    true
                }
                prepare()
                start()
            }
        }.onFailure { error ->
            onError?.invoke("Audio tidak bisa diputar: ${error.message}")
        }
    }

    fun stop() {
        engine?.stop()
        runCatching {
            player?.let { if (it.isPlaying) it.stop() }
            player?.release()
        }
        player = null
    }

    fun shutdown() {
        stop()
        engine?.stop()
        engine?.shutdown()
        engine = null
        available = false
    }

    companion object {
        private const val TAG = "MateEngineSpeech"
        private const val UTTERANCE_ID = "mate_engine_reply"
        private const val MAX_SPEECH_CHARS = 600
    }
}
