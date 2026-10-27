package io.github.mrnodatax.mateengine

import io.github.mrnodatax.mateengine.chat.GeminiTts
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test
import java.io.ByteArrayOutputStream
import java.nio.ByteBuffer
import java.nio.ByteOrder
import kotlin.math.PI
import kotlin.math.sin

/**
 * Uji pembacaan WAV dan pembuatan amplop lip-sync tanpa jaringan dan tanpa perangkat.
 * Data yang dipakai adalah WAV yang dibuat di dalam uji, bukan rekaman siapa pun.
 */
class GeminiTtsTest {

    private fun wav(samples: ShortArray, sampleRate: Int = 24_000, channels: Int = 1): ByteArray {
        val dataSize = samples.size * 2
        val out = ByteArrayOutputStream()
        fun writeAscii(value: String) = out.write(value.toByteArray(Charsets.US_ASCII))
        fun writeInt(value: Int) = out.write(
            ByteBuffer.allocate(4).order(ByteOrder.LITTLE_ENDIAN).putInt(value).array(),
        )
        fun writeShort(value: Int) = out.write(
            ByteBuffer.allocate(2).order(ByteOrder.LITTLE_ENDIAN).putShort(value.toShort()).array(),
        )
        writeAscii("RIFF"); writeInt(36 + dataSize); writeAscii("WAVE")
        writeAscii("fmt "); writeInt(16); writeShort(1); writeShort(channels)
        writeInt(sampleRate); writeInt(sampleRate * channels * 2); writeShort(channels * 2); writeShort(16)
        writeAscii("data"); writeInt(dataSize)
        samples.forEach { writeShort(it.toInt()) }
        return out.toByteArray()
    }

    private fun tone(seconds: Double, rate: Int = 24_000, amplitude: Double = 0.5): ShortArray {
        val count = (seconds * rate).toInt()
        return ShortArray(count) { index ->
            (sin(2 * PI * 220 * index / rate) * amplitude * Short.MAX_VALUE).toInt().toShort()
        }
    }

    @Test
    fun `WAV 24kHz mono terbaca dan durasinya benar`() {
        val tts = GeminiTts()
        val parsed = tts.parseWav(wav(tone(1.0)))
        assertNotNull("WAV valid harus terbaca", parsed)
        val (channels, pcm) = parsed!!
        assertEquals(1, channels)
        assertEquals(24_000, pcm.sampleRate)
        assertTrue("durasi harus ~1000ms, dapat ${pcm.durationMs}", pcm.durationMs in 950..1050)
        assertTrue("amplitudo puncak harus tinggi", tts.peakOf(pcm.samples) > 0.4f)
    }

    @Test
    fun `berkas bukan WAV ditolak dengan aman`() {
        val tts = GeminiTts()
        assertNull(tts.parseWav(ByteArray(0)))
        assertNull(tts.parseWav(ByteArray(64) { 7 }))
    }

    @Test
    fun `amplop lip-sync mengikuti keras dan diamnya audio`() {
        val tts = GeminiTts()
        val rate = 24_000
        // 0,5 detik keras lalu 0,5 detik hening.
        val samples = ShortArray(rate) { index ->
            if (index < rate / 2) (sin(2 * PI * 200 * index / rate) * 0.6 * Short.MAX_VALUE).toInt().toShort() else 0
        }
        val parsed = tts.parseWav(wav(samples))!!
        val envelope = tts.buildEnvelope(pcm = parsed)
        assertEquals("satu nilai per 50ms", 20, envelope.size)
        val loud = envelope.take(10).average()
        val quiet = envelope.drop(10).average()
        assertTrue("bagian keras harus > 0,4 (dapat $loud)", loud > 0.4)
        assertTrue("bagian hening harus mendekati 0 (dapat $quiet)", quiet < 0.05)
        assertTrue("semua nilai dalam 0..1", envelope.all { it in 0f..1f })
    }

    @Test
    fun `audio hening tidak menghasilkan NaN`() {
        val tts = GeminiTts()
        val parsed = tts.parseWav(wav(ShortArray(4800)))!!
        val envelope = tts.buildEnvelope(pcm = parsed)
        assertTrue(envelope.isNotEmpty())
        assertTrue(envelope.all { it.isFinite() && it == 0f })
    }
}
