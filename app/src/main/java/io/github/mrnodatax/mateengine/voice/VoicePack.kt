package io.github.mrnodatax.mateengine.voice

import android.content.Context
import android.media.AudioAttributes
import android.media.SoundPool
import android.util.Log
import io.github.mrnodatax.mateengine.R
import java.io.File

/**
 * Sistem suara berbasis event, meniru peran `MEVoicePack` di Mate Engine:
 * klip audio dipetakan ke kejadian (mulai/selesai geser, buka/tutup overlay, chat, UI),
 * bukan sintesis per kalimat.
 *
 * Suara bawaan di aplikasi ini **dihasilkan sendiri secara prosedural** (lihat
 * `app/src/main/res/raw/`), sehingga tidak ada aset audio Mate Engine yang didistribusikan
 * ulang. Pengguna dapat menimpa tiap event dengan pack miliknya sendiri.
 */
class VoicePack(context: Context) {

    enum class Event(val key: String, val defaultRes: Int) {
        UI_CLICK("ui_click", R.raw.me_ui_click),
        DRAG_START("drag_start", R.raw.me_drag_start),
        DRAG_STOP("drag_stop", R.raw.me_drag_stop),
        BUBBLE_ON("bubble_on", R.raw.me_bubble_on),
        BUBBLE_OFF("bubble_off", R.raw.me_bubble_off),
        CHAT_BLIP("chat_blip", R.raw.me_chat_blip),
        CHAT_STREAM("chat_stream", R.raw.me_chat_stream),

        // 15 efek reaksi (v0.1.10). Semua non-verbal, disintesis sendiri oleh
        // scripts/buat-sfx.py — tidak ada rekaman pihak ketiga. Nama kunci sama dengan nama
        // berkas di renderer (`reactions.js` → `sfx`), jadi menambah gaya baru cukup menambah
        // satu entri di sini tanpa memetakan ulang.
        REACTION_SIGH("sigh", R.raw.me_sigh),
        REACTION_SIGH_LOW("sigh_low", R.raw.me_sigh_low),
        REACTION_YAWN("yawn", R.raw.me_yawn),
        REACTION_TONGUE_CLICK("tongue_click", R.raw.me_tongue_click),
        REACTION_HUFF_HARD("huff_hard", R.raw.me_huff_hard),
        REACTION_HMPH("hmph", R.raw.me_hmph),
        REACTION_HUM_SOFT("hum_soft", R.raw.me_hum_soft),
        REACTION_MMM("mmm", R.raw.me_mmm),
        REACTION_EEP("eep", R.raw.me_eep),
        REACTION_GASP("gasp", R.raw.me_gasp),
        REACTION_GIGGLE_3("giggle_3", R.raw.me_giggle_3),
        REACTION_GIGGLE_SHORT("giggle_short", R.raw.me_giggle_short),
        REACTION_CHIME_UP("chime_up", R.raw.me_chime_up),
        REACTION_BOING("boing", R.raw.me_boing),
        REACTION_BLIP_SOFT("blip_soft", R.raw.me_blip_soft);

        companion object {
            /** Cari event dari kunci, dipakai saat renderer mengirim nama efek reaksi. */
            fun fromKey(key: String): Event? = entries.firstOrNull { it.key == key }
        }
    }

    private val appContext = context.applicationContext
    private val soundIds = mutableMapOf<Event, Int>()
    private val userFiles = mutableMapOf<Event, File>()
    private var pool: SoundPool? = null
    private var enabled = true

    fun initialize() {
        if (pool != null) return
        pool = SoundPool.Builder()
            .setMaxStreams(4)
            .setAudioAttributes(
                AudioAttributes.Builder()
                    .setUsage(AudioAttributes.USAGE_ASSISTANCE_SONIFICATION)
                    .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
                    .build(),
            )
            .build()
        scanUserPack()
        Event.entries.forEach { event ->
            val userFile = userFiles[event]
            val id = if (userFile != null) {
                runCatching { pool?.load(userFile.absolutePath, 1) ?: 0 }.getOrDefault(0)
            } else {
                runCatching {
                    appContext.resources.openRawResourceFd(event.defaultRes)?.use { fd ->
                        pool?.load(fd, 1) ?: 0
                    } ?: 0
                }.getOrDefault(0)
            }
            if (id != 0) soundIds[event] = id
        }
    }

    fun setEnabled(value: Boolean) {
        enabled = value
    }

    fun play(event: Event, volume: Float = 0.8f) {
        if (!enabled) return
        val id = soundIds[event] ?: return
        runCatching { pool?.play(id, volume, volume, 1, 0, 1f) }
    }

    /**
     * Pack pengguna: satu berkas per event di `files/voicepack/`.
     * Nama berkas memakai salah satu kunci event, mis. `chat_blip.mp3`.
     */
    fun scanUserPack(): Int {
        userFiles.clear()
        val dir = File(appContext.filesDir, DIR)
        if (!dir.isDirectory) return 0
        val supported = setOf("mp3", "ogg", "wav", "m4a")
        dir.listFiles()?.forEach { file ->
            val ext = file.extension.lowercase()
            if (!file.isFile || ext !in supported) return@forEach
            val event = Event.entries.firstOrNull { file.nameWithoutExtension.equals(it.key, ignoreCase = true) }
            if (event != null) userFiles[event] = file
        }
        Log.i(TAG, "voice pack pengguna: ${userFiles.size} event")
        return userFiles.size
    }

    fun userPackEvents(): List<String> = userFiles.keys.map { it.key }.sorted()

    fun release() {
        pool?.release()
        pool = null
        soundIds.clear()
    }

    companion object {
        const val DIR = "voicepack"
        private const val TAG = "MateEngineVoice"
    }
}
