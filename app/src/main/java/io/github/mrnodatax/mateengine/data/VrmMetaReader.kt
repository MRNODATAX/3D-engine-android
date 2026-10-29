package io.github.mrnodatax.mateengine.data

import org.json.JSONObject
import java.io.File
import java.nio.ByteBuffer
import java.nio.ByteOrder

/**
 * Membaca header GLB (12 byte) dan chunk JSON pertama untuk mendapatkan metadata VRM.
 *
 * Sengaja tidak memakai renderer: halaman Avatar harus bisa menampilkan format, lisensi,
 * dan jumlah bone sebelum model dijalankan, dan tanpa mengklaim nilai yang tidak ada
 * di berkas.
 */
object VrmMetaReader {

    private const val MAGIC_GLTF = 0x46546C67 // "glTF"
    private const val CHUNK_JSON = 0x4E4F534A // "JSON"
    private const val HEADER_BYTES = 20

    fun read(file: File): VrmMetadata? = runCatching {
        if (!file.isFile) return null
        // Chunk JSON selalu berada di awal berkas; baca sebagian saja agar model 100 MB tidak dimuat penuh.
        val header = ByteArray(HEADER_BYTES)
        file.inputStream().use { stream ->
            var read = 0
            while (read < HEADER_BYTES) {
                val count = stream.read(header, read, HEADER_BYTES - read)
                if (count <= 0) return null
                read += count
            }
            val buffer = ByteBuffer.wrap(header).order(ByteOrder.LITTLE_ENDIAN)
            if (buffer.int != MAGIC_GLTF) return null
            if (buffer.int != 2) return null
            buffer.int // panjang total, tidak dipakai
            val chunkLength = buffer.int
            if (buffer.int != CHUNK_JSON) return null
            if (chunkLength <= 0 || chunkLength > 32 * 1024 * 1024) return null

            val jsonBytes = ByteArray(chunkLength)
            var filled = 0
            while (filled < chunkLength) {
                val count = stream.read(jsonBytes, filled, chunkLength - filled)
                if (count <= 0) return null
                filled += count
            }
            parseJson(String(jsonBytes, Charsets.UTF_8))
        }
    }.getOrNull()

    /** Dipakai uji unit dengan byte GLB sintetis maupun berkas asli. */
    fun parse(bytes: ByteArray): VrmMetadata? = runCatching {
        if (bytes.size < HEADER_BYTES) return null
        val buffer = ByteBuffer.wrap(bytes).order(ByteOrder.LITTLE_ENDIAN)
        if (buffer.int != MAGIC_GLTF) return null
        if (buffer.int != 2) return null
        buffer.int
        val chunkLength = buffer.int
        if (buffer.int != CHUNK_JSON) return null
        if (chunkLength <= 0 || chunkLength > bytes.size - HEADER_BYTES) return null
        parseJson(String(bytes, HEADER_BYTES, chunkLength, Charsets.UTF_8))
    }.getOrNull()

    private fun parseJson(json: String): VrmMetadata? {
        val root = JSONObject(json)
        val extensions = root.optJSONObject("extensions") ?: return null

        extensions.optJSONObject("VRMC_vrm")?.let { vrm1 ->
            val meta = vrm1.optJSONObject("meta")
            val humanoid = vrm1.optJSONObject("humanoid")?.optJSONObject("humanBones")?.length() ?: 0
            val expressions = vrm1.optJSONObject("expressions")
                ?.optJSONObject("preset")?.length() ?: 0

            val authors = meta?.optJSONArray("authors")?.let { array ->
                buildList { for (index in 0 until array.length()) array.optString(index).takeIf { it.isNotBlank() }?.let(::add) }
            }.orEmpty()

            return VrmMetadata(
                name = meta?.optString("name")?.takeIf { it.isNotBlank() } ?: "Tanpa nama",
                versionLabel = "VRM 1.0",
                authors = authors,
                licenseUrl = meta?.optString("licenseUrl")?.takeIf { it.isNotBlank() },
                redistribution = meta?.takeIf { it.has("allowRedistribution") }?.optBoolean("allowRedistribution"),
                humanoidBones = humanoid,
                expressionPresets = expressions,
            )
        }

        extensions.optJSONObject("VRM")?.let { vrm0 ->
            val meta = vrm0.optJSONObject("meta")
            val humanoid = vrm0.optJSONObject("humanoid")?.optJSONObject("humanBones")?.length() ?: 0
            val expressions = vrm0.optJSONObject("blendShapeMaster")
                ?.optJSONArray("blendShapeGroups")?.length() ?: 0
            val author = meta?.optString("author")?.takeIf { it.isNotBlank() }

            return VrmMetadata(
                name = meta?.optString("title")?.takeIf { it.isNotBlank() } ?: "Tanpa nama",
                versionLabel = "VRM 0.x",
                authors = listOfNotNull(author),
                licenseUrl = meta?.optString("otherLicenseUrl")?.takeIf { it.isNotBlank() }
                    ?: meta?.optString("licenseName")?.takeIf { it.isNotBlank() },
                redistribution = meta?.takeIf { it.has("redistributionAllowed") }?.optBoolean("redistributionAllowed"),
                humanoidBones = humanoid,
                expressionPresets = expressions,
            )
        }

        return null
    }
}
