package io.github.mrnodatax.mateengine.overlay

import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

/** Status service overlay yang dibaca UI. Hanya berisi nilai yang benar-benar dilaporkan renderer. */
data class OverlaySnapshot(
    val running: Boolean = false,
    val rendererReady: Boolean = false,
    val modelName: String? = null,
    val animationName: String? = null,
    val webgl2: Boolean? = null,
    val fps: Int = 0,
    val lastError: String? = null,
    val workMs: Int = 0,
    val renderScale: Float = 1f,
    val qualityLevel: String = "high",
    val triangles: Int = 0,
    val drawCalls: Int = 0,
    val textures: Int = 0,
    val bones: Int = 0,
    val springJoints: Int = 0,
    val texturesResized: Int = 0,
    val talking: Boolean = false,
    val lastTrimAt: Long = 0L,
)

object OverlayRuntime {
    private val _state = MutableStateFlow(OverlaySnapshot())
    val state: StateFlow<OverlaySnapshot> = _state.asStateFlow()

    fun update(transform: (OverlaySnapshot) -> OverlaySnapshot) {
        _state.value = transform(_state.value)
    }

    fun reset() {
        _state.value = OverlaySnapshot()
    }

    fun reportError(message: String) {
        _state.value = _state.value.copy(lastError = message)
    }

    fun markStopped() {
        _state.value = _state.value.copy(
            running = false,
            rendererReady = false,
            fps = 0,
            animationName = null,
            talking = false,
        )
    }
}
