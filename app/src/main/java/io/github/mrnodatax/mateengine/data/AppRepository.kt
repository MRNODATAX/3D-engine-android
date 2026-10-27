package io.github.mrnodatax.mateengine.data

import android.content.Context
import android.content.SharedPreferences
import android.net.Uri
import android.provider.OpenableColumns
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.withContext
import org.json.JSONArray
import org.json.JSONObject
import java.io.File
import java.util.UUID

/**
 * Penyimpanan tunggal aplikasi.
 *
 * Berkas hasil impor **disalin** ke penyimpanan aplikasi, sehingga avatar tetap tersedia
 * setelah izin SAF sementara berakhir. Berkas asli milik pengguna tidak diubah atau dihapus.
 */
class AppRepository private constructor(context: Context) {

    private val appContext = context.applicationContext
    private val prefs: SharedPreferences =
        appContext.getSharedPreferences("mate_engine_state", Context.MODE_PRIVATE)
    private val avatarDir = File(appContext.filesDir, "avatars").apply { mkdirs() }
    private val animationDir = File(appContext.filesDir, "animations").apply { mkdirs() }

    private val _state = MutableStateFlow(load())
    val state: StateFlow<AppState> = _state.asStateFlow()

    fun avatarFile(asset: AvatarAsset): File = File(avatarDir, asset.fileName)
    fun animationFile(asset: AnimationAsset): File = File(animationDir, asset.fileName)

    /** Berkas contoh debug (hanya ada pada build debug, lihat scripts/fetch-test-vrm.sh). */
    fun bundledSample(): File? = runCatching {
        val file = File(appContext.filesDir, "sample/vrm1-twist-sample.vrm")
        if (file.isFile) file else null
    }.getOrNull()

    suspend fun importAvatar(uri: Uri): Result<AvatarAsset> = withContext(Dispatchers.IO) {
        runCatching {
            val name = displayName(uri) ?: "avatar.vrm"
            val id = UUID.randomUUID().toString()
            val target = File(avatarDir, "$id-${sanitize(name)}")
            copyTo(uri, target)
            if (target.length() == 0L) {
                target.delete()
                error("Berkas kosong atau tidak bisa dibaca.")
            }
            val metadata = VrmMetaReader.read(target)
                ?: run {
                    target.delete()
                    error("Berkas bukan VRM/GLB yang valid. Metadata VRM tidak ditemukan.")
                }
            val asset = AvatarAsset(
                id = id,
                displayName = metadata.name.ifBlank { name.substringBeforeLast('.') },
                fileName = target.name,
                sizeBytes = target.length(),
                importedAt = System.currentTimeMillis(),
                metadata = metadata,
            )
            val current = _state.value
            update(current.copy(avatars = current.avatars + asset, selectedAvatarId = asset.id))
            asset
        }
    }

    suspend fun importAnimation(uri: Uri): Result<AnimationAsset> = withContext(Dispatchers.IO) {
        runCatching {
            val name = displayName(uri) ?: "animasi.vrma"
            val id = UUID.randomUUID().toString()
            val target = File(animationDir, "$id-${sanitize(name)}")
            copyTo(uri, target)
            if (target.length() == 0L) {
                target.delete()
                error("Berkas kosong atau tidak bisa dibaca.")
            }
            val asset = AnimationAsset(
                id = id,
                displayName = name.substringBeforeLast('.').ifBlank { name },
                fileName = target.name,
                sizeBytes = target.length(),
                importedAt = System.currentTimeMillis(),
            )
            val current = _state.value
            update(current.copy(animations = current.animations + asset, selectedAnimationId = asset.id))
            asset
        }
    }

    /**
     * Hanya dipakai build debug/CI untuk menyiapkan data tangkapan layar.
     * Berkas contoh dibaca dari aset aplikasi, bukan dari penyimpanan pengguna.
     */
    suspend fun seedSampleFromAssets(): Result<Unit> = withContext(Dispatchers.IO) {
        runCatching {
            fun copyAsset(assetPath: String, targetDir: File, targetName: String): File {
                val target = File(targetDir, targetName)
                appContext.assets.open(assetPath).use { input ->
                    target.outputStream().use { output -> input.copyTo(output) }
                }
                return target
            }

            val modelFile = copyAsset("testmodels/vrm1-twist-sample.vrm", avatarDir, "sample-vrm1-twist.vrm")
            val metadata = VrmMetaReader.read(modelFile) ?: error("metadata model contoh tidak terbaca")
            val avatar = AvatarAsset(
                id = "sample-avatar",
                displayName = metadata.name,
                fileName = modelFile.name,
                sizeBytes = modelFile.length(),
                importedAt = System.currentTimeMillis(),
                metadata = metadata,
            )

            val animations = runCatching {
                val vrma = copyAsset("testmodels/test.vrma", animationDir, "sample-idle.vrma")
                listOf(
                    AnimationAsset(
                        id = "sample-animation",
                        displayName = "idle-loop",
                        fileName = vrma.name,
                        sizeBytes = vrma.length(),
                        importedAt = System.currentTimeMillis(),
                    ),
                )
            }.getOrDefault(emptyList())

            val current = _state.value
            update(
                current.copy(
                    avatars = listOf(avatar) + current.avatars.filterNot { it.id == avatar.id },
                    animations = animations + current.animations.filterNot { item -> animations.any { it.id == item.id } },
                    selectedAvatarId = avatar.id,
                    // Animasi tidak dipilih otomatis: overlay harus menampilkan idle saat tangkapan layar,
                    // dan animasi tetap bisa diputar manual dari halaman Animasi.
                    selectedAnimationId = current.selectedAnimationId,
                ),
            )
            Unit
        }
    }

    fun selectAvatar(id: String?) {
        val current = _state.value
        if (current.avatars.none { it.id == id } && id != null) return
        update(current.copy(selectedAvatarId = id))
    }

    fun selectAnimation(id: String?) {
        val current = _state.value
        if (current.animations.none { it.id == id } && id != null) return
        update(current.copy(selectedAnimationId = id))
    }

    fun deleteAvatar(id: String) {
        val current = _state.value
        current.avatars.firstOrNull { it.id == id }?.let { avatarFile(it).delete() }
        val remaining = current.avatars.filterNot { it.id == id }
        update(
            current.copy(
                avatars = remaining,
                selectedAvatarId = if (current.selectedAvatarId == id) remaining.firstOrNull()?.id else current.selectedAvatarId,
            ),
        )
    }

    fun deleteAnimation(id: String) {
        val current = _state.value
        current.animations.firstOrNull { it.id == id }?.let { animationFile(it).delete() }
        val remaining = current.animations.filterNot { it.id == id }
        update(
            current.copy(
                animations = remaining,
                selectedAnimationId = if (current.selectedAnimationId == id) remaining.firstOrNull()?.id else current.selectedAnimationId,
            ),
        )
    }

    fun updateOverlay(transform: (OverlayPrefs) -> OverlayPrefs) {
        val current = _state.value
        update(current.copy(overlay = transform(current.overlay)))
    }

    fun setAnimationOptions(loop: Boolean, shuffle: Boolean, speedPercent: Int) {
        val current = _state.value
        update(current.copy(loopAnimation = loop, shuffleAnimation = shuffle, animationSpeedPercent = speedPercent.coerceIn(50, 200)))
    }

    fun clearRenderCache() {
        File(appContext.cacheDir, "WebView").deleteRecursively()
        File(appContext.cacheDir, "webview_cache").deleteRecursively()
    }

    fun deleteAllData() {
        avatarDir.deleteRecursively()
        animationDir.deleteRecursively()
        avatarDir.mkdirs()
        animationDir.mkdirs()
        prefs.edit().clear().apply()
        _state.value = AppState()
    }

    private fun copyTo(uri: Uri, target: File) {
        appContext.contentResolver.openInputStream(uri).use { input ->
            requireNotNull(input) { "Tidak bisa membuka berkas yang dipilih." }
            target.outputStream().use { output -> input.copyTo(output, DEFAULT_BUFFER_SIZE) }
        }
    }

    private fun displayName(uri: Uri): String? {
        appContext.contentResolver.query(uri, arrayOf(OpenableColumns.DISPLAY_NAME), null, null, null)?.use { cursor ->
            if (cursor.moveToFirst() && !cursor.isNull(0)) return cursor.getString(0)
        }
        return uri.lastPathSegment?.substringAfterLast('/')
    }

    private fun sanitize(name: String): String =
        name.replace(Regex("[^A-Za-z0-9._-]"), "_").take(64).ifBlank { "berkas" }

    private fun update(next: AppState) {
        _state.value = next
        persist(next)
    }

    private fun persist(state: AppState) {
        val json = JSONObject().apply {
            put("avatars", JSONArray().apply {
                state.avatars.forEach { avatar ->
                    put(JSONObject().apply {
                        put("id", avatar.id)
                        put("displayName", avatar.displayName)
                        put("fileName", avatar.fileName)
                        put("sizeBytes", avatar.sizeBytes)
                        put("importedAt", avatar.importedAt)
                        avatar.metadata?.let { meta ->
                            put("meta", JSONObject().apply {
                                put("name", meta.name)
                                put("versionLabel", meta.versionLabel)
                                put("authors", JSONArray(meta.authors))
                                put("licenseUrl", meta.licenseUrl ?: JSONObject.NULL)
                                put("redistribution", meta.redistribution ?: JSONObject.NULL)
                                put("humanoidBones", meta.humanoidBones)
                                put("expressionPresets", meta.expressionPresets)
                            })
                        }
                    })
                }
            })
            put("animations", JSONArray().apply {
                state.animations.forEach { animation ->
                    put(JSONObject().apply {
                        put("id", animation.id)
                        put("displayName", animation.displayName)
                        put("fileName", animation.fileName)
                        put("sizeBytes", animation.sizeBytes)
                        put("importedAt", animation.importedAt)
                    })
                }
            })
            put("selectedAvatarId", state.selectedAvatarId ?: JSONObject.NULL)
            put("selectedAnimationId", state.selectedAnimationId ?: JSONObject.NULL)
            put("overlay", JSONObject().apply {
                put("scalePercent", state.overlay.scalePercent)
                put("opacityPercent", state.overlay.opacityPercent)
                put("targetFps", state.overlay.targetFps)
                put("quality", state.overlay.quality)
                put("locked", state.overlay.locked)
                put("offsetX", state.overlay.offsetX)
                put("offsetY", state.overlay.offsetY)
                put("memorySaver", state.overlay.memorySaver)
                put("motion", state.overlay.motion)
            })
            put("loopAnimation", state.loopAnimation)
            put("shuffleAnimation", state.shuffleAnimation)
            put("animationSpeedPercent", state.animationSpeedPercent)
        }
        prefs.edit().putString(KEY_STATE, json.toString()).apply()
    }

    private fun load(): AppState {
        val raw = prefs.getString(KEY_STATE, null) ?: return AppState()
        return runCatching {
            val json = JSONObject(raw)
            val avatars = json.optJSONArray("avatars")?.let { array ->
                buildList {
                    for (index in 0 until array.length()) {
                        val item = array.optJSONObject(index) ?: continue
                        val meta = item.optJSONObject("meta")?.let { metaJson ->
                            VrmMetadata(
                                name = metaJson.optString("name"),
                                versionLabel = metaJson.optString("versionLabel", "VRM"),
                                authors = metaJson.optJSONArray("authors")?.let { authors ->
                                    buildList { for (i in 0 until authors.length()) add(authors.optString(i)) }
                                }.orEmpty(),
                                licenseUrl = metaJson.optString("licenseUrl").takeIf { it.isNotBlank() && it != "null" },
                                redistribution = if (metaJson.isNull("redistribution")) null else metaJson.optBoolean("redistribution"),
                                humanoidBones = metaJson.optInt("humanoidBones"),
                                expressionPresets = metaJson.optInt("expressionPresets"),
                            )
                        }
                        val file = File(avatarDir, item.optString("fileName"))
                        // Berkas bisa hilang karena pembersihan sistem: jangan tampilkan entri hantu.
                        if (!file.isFile) continue
                        add(
                            AvatarAsset(
                                id = item.optString("id"),
                                displayName = item.optString("displayName"),
                                fileName = item.optString("fileName"),
                                sizeBytes = item.optLong("sizeBytes"),
                                importedAt = item.optLong("importedAt"),
                                metadata = meta,
                            ),
                        )
                    }
                }
            }.orEmpty()

            val animations = json.optJSONArray("animations")?.let { array ->
                buildList {
                    for (index in 0 until array.length()) {
                        val item = array.optJSONObject(index) ?: continue
                        val file = File(animationDir, item.optString("fileName"))
                        if (!file.isFile) continue
                        add(
                            AnimationAsset(
                                id = item.optString("id"),
                                displayName = item.optString("displayName"),
                                fileName = item.optString("fileName"),
                                sizeBytes = item.optLong("sizeBytes"),
                                importedAt = item.optLong("importedAt"),
                            ),
                        )
                    }
                }
            }.orEmpty()

            val overlayJson = json.optJSONObject("overlay")
            AppState(
                avatars = avatars,
                animations = animations,
                selectedAvatarId = json.optString("selectedAvatarId").takeIf { it.isNotBlank() && it != "null" },
                selectedAnimationId = json.optString("selectedAnimationId").takeIf { it.isNotBlank() && it != "null" },
                overlay = OverlayPrefs(
                    scalePercent = overlayJson?.optInt("scalePercent", 62) ?: 62,
                    opacityPercent = overlayJson?.optInt("opacityPercent", 100) ?: 100,
                    targetFps = overlayJson?.optInt("targetFps", 30) ?: 30,
                    quality = overlayJson?.optString("quality", "medium") ?: "medium",
                    locked = overlayJson?.optBoolean("locked", false) ?: false,
                    offsetX = overlayJson?.optInt("offsetX", -1) ?: -1,
                    offsetY = overlayJson?.optInt("offsetY", -1) ?: -1,
                    memorySaver = overlayJson?.optBoolean("memorySaver", true) ?: true,
                    motion = overlayJson?.optString("motion", "idle")?.takeIf { it.isNotBlank() } ?: "idle",
                ),
                loopAnimation = json.optBoolean("loopAnimation", true),
                shuffleAnimation = json.optBoolean("shuffleAnimation", false),
                animationSpeedPercent = json.optInt("animationSpeedPercent", 100),
            )
        }.getOrDefault(AppState())
    }

    companion object {
        private const val KEY_STATE = "state"

        @Volatile
        private var instance: AppRepository? = null

        fun get(context: Context): AppRepository =
            instance ?: synchronized(this) {
                instance ?: AppRepository(context).also { instance = it }
            }
    }
}
