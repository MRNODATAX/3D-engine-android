package io.github.mrnodatax.mateengine.data

/** Metadata yang benar-benar dibaca dari berkas VRM, bukan diisi manual. */
data class VrmMetadata(
    val name: String,
    val versionLabel: String,
    val authors: List<String>,
    val licenseUrl: String?,
    val redistribution: Boolean?,
    val humanoidBones: Int,
    val expressionPresets: Int,
)

data class AvatarAsset(
    val id: String,
    val displayName: String,
    val fileName: String,
    val sizeBytes: Long,
    val importedAt: Long,
    val metadata: VrmMetadata?,
)

data class AnimationAsset(
    val id: String,
    val displayName: String,
    val fileName: String,
    val sizeBytes: Long,
    val importedAt: Long,
)

data class OverlayPrefs(
    val scalePercent: Int = 62,
    val opacityPercent: Int = 100,
    val targetFps: Int = 30,
    val quality: String = "medium",
    val locked: Boolean = false,
    val offsetX: Int = -1,
    val offsetY: Int = -1,
    val memorySaver: Boolean = true,
)

data class AppState(
    val avatars: List<AvatarAsset> = emptyList(),
    val animations: List<AnimationAsset> = emptyList(),
    val selectedAvatarId: String? = null,
    val selectedAnimationId: String? = null,
    val overlay: OverlayPrefs = OverlayPrefs(),
    val loopAnimation: Boolean = true,
    val shuffleAnimation: Boolean = false,
    val animationSpeedPercent: Int = 100,
) {
    val selectedAvatar: AvatarAsset? get() = avatars.firstOrNull { it.id == selectedAvatarId }
    val selectedAnimation: AnimationAsset? get() = animations.firstOrNull { it.id == selectedAnimationId }
}
