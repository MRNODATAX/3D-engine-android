package io.github.mrnodatax.mateengine

import io.github.mrnodatax.mateengine.data.VrmMetaReader
import org.json.JSONArray
import org.json.JSONObject
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Assume.assumeTrue
import org.junit.Test
import java.io.File
import java.nio.ByteBuffer
import java.nio.ByteOrder

class VrmMetaReaderTest {

    @Test
    fun `membaca metadata VRM 1_0 dari chunk JSON GLB`() {
        val meta = JSONObject().apply {
            put("name", "Avatar Uji")
            put("authors", JSONArray(listOf("Pembuat A")))
            put("licenseUrl", "https://vrm.dev/licenses/1.0/")
            put("allowRedistribution", true)
        }
        val json = JSONObject().apply {
            put("asset", JSONObject().put("version", "2.0"))
            put(
                "extensions",
                JSONObject().put(
                    "VRMC_vrm",
                    JSONObject()
                        .put("meta", meta)
                        .put(
                            "humanoid",
                            JSONObject().put(
                                "humanBones",
                                JSONObject()
                                    .put("hips", JSONObject())
                                    .put("head", JSONObject())
                                    .put("leftHand", JSONObject()),
                            ),
                        )
                        .put("expressions", JSONObject().put("preset", JSONObject().put("happy", JSONObject()))),
                ),
            )
        }

        val result = VrmMetaReader.parse(glb(json.toString()))
        requireNotNull(result)
        assertEquals("Avatar Uji", result.name)
        assertEquals("VRM 1.0", result.versionLabel)
        assertEquals(listOf("Pembuat A"), result.authors)
        assertEquals(3, result.humanoidBones)
        assertEquals(1, result.expressionPresets)
        assertEquals(true, result.redistribution)
    }

    @Test
    fun `membaca metadata VRM 0_x`() {
        val json = JSONObject().apply {
            put(
                "extensions",
                JSONObject().put(
                    "VRM",
                    JSONObject()
                        .put(
                            "meta",
                            JSONObject()
                                .put("title", "Avatar Lama")
                                .put("author", "Pembuat B")
                                .put("redistributionAllowed", false),
                        )
                        .put("humanoid", JSONObject().put("humanBones", JSONObject().put("hips", JSONObject())))
                        .put(
                            "blendShapeMaster",
                            JSONObject().put(
                                "blendShapeGroups",
                                JSONArray().put(JSONObject()).put(JSONObject()),
                            ),
                        ),
                ),
            )
        }

        val result = VrmMetaReader.parse(glb(json.toString()))
        requireNotNull(result)
        assertEquals("VRM 0.x", result.versionLabel)
        assertEquals("Avatar Lama", result.name)
        assertEquals(listOf("Pembuat B"), result.authors)
        assertEquals(false, result.redistribution)
        assertEquals(2, result.expressionPresets)
    }

    @Test
    fun `menolak berkas yang bukan GLB`() {
        assertNull(VrmMetaReader.parse(ByteArray(64)))
        val gltfJsonOnly = "{\"asset\":{\"version\":\"2.0\"}}".toByteArray()
        assertNull(VrmMetaReader.parse(gltfJsonOnly))
    }

    @Test
    fun `GLB tanpa ekstensi VRM tidak menghasilkan metadata`() {
        val json = JSONObject().put("asset", JSONObject().put("version", "2.0"))
        assertNull(VrmMetaReader.parse(glb(json.toString())))
    }

    @Test
    fun `berkas model uji nyata terbaca bila tersedia`() {
        val candidates = listOf(
            File("src/main/assets/testmodels/vrm1-twist-sample.vrm"),
            File("../web/test-fixtures/vrm1-twist-sample.vrm"),
        )
        val file = candidates.firstOrNull { it.isFile }
        assumeTrue("Model uji tidak tersedia (jalankan scripts/fetch-test-vrm.sh)", file != null)

        val meta = VrmMetaReader.read(file!!)
        requireNotNull(meta)
        assertEquals("VRM 1.0", meta.versionLabel)
        assertTrue("humanoid bone harus terdeteksi", meta.humanoidBones > 0)
        assertEquals(true, meta.redistribution)
        assertFalse(meta.name.isBlank())
    }

    private fun glb(json: String): ByteArray {
        val jsonBytes = json.toByteArray(Charsets.UTF_8)
        val padding = (4 - jsonBytes.size % 4) % 4
        val paddedJson = jsonBytes + ByteArray(padding) { 0x20 }
        val total = 12 + 8 + paddedJson.size
        val buffer = ByteBuffer.allocate(12 + 8 + paddedJson.size).order(ByteOrder.LITTLE_ENDIAN)
        buffer.putInt(0x46546C67) // glTF
        buffer.putInt(2)
        buffer.putInt(total)
        buffer.putInt(paddedJson.size)
        buffer.putInt(0x4E4F534A) // JSON
        buffer.put(paddedJson)
        return buffer.array()
    }
}
