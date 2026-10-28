package io.github.mrnodatax.mateengine.overlay

import android.content.Context
import android.util.Log
import android.view.KeyEvent
import androidx.compose.ui.platform.ComposeView
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.LifecycleOwner
import androidx.lifecycle.LifecycleRegistry
import androidx.lifecycle.ViewModelStore
import androidx.lifecycle.ViewModelStoreOwner
import androidx.lifecycle.ViewTreeLifecycleOwner
import androidx.lifecycle.ViewTreeViewModelStoreOwner
import androidx.savedstate.SavedStateRegistry
import androidx.savedstate.SavedStateRegistryController
import androidx.savedstate.SavedStateRegistryOwner
import androidx.savedstate.ViewTreeSavedStateRegistryOwner

/**
 * [ComposeView] yang bisa hidup di dalam Service.
 *
 * Compose butuh `LifecycleOwner`, `ViewModelStoreOwner`, dan `SavedStateRegistryOwner` dari View
 * tree. Di Activity semuanya sudah dipasang otomatis; di Service harus dibuat sendiri. Tanpa ini
 * `ComposeView` gagal ("ViewTreeLifecycleOwner not found") dan menu tidak pernah tampil.
 */
class QuickMenuHost(
    context: Context,
    private val onCloseRequested: () -> Unit,
) : ComposeView(context), LifecycleOwner, ViewModelStoreOwner, SavedStateRegistryOwner {

    private val lifecycleRegistry = LifecycleRegistry(this)
    private val savedStateController = SavedStateRegistryController.create(this)
    private val store = ViewModelStore()

    init {
        savedStateController.performAttach()
        savedStateController.performRestore(null)
        // Compose hanya menggambar bila owner minimal STARTED.
        lifecycleRegistry.currentState = Lifecycle.State.RESUMED
        // Memakai setter statis (bukan ekstensi ktx) supaya tidak bergantung versi artefak ktx.
        ViewTreeLifecycleOwner.set(this, this)
        ViewTreeSavedStateRegistryOwner.set(this, this)
        ViewTreeViewModelStoreOwner.set(this, this)
    }

    override val lifecycle: Lifecycle get() = lifecycleRegistry

    override val viewModelStore: ViewModelStore get() = store

    override val savedStateRegistry: SavedStateRegistry get() = savedStateController.savedStateRegistry

    override fun dispatchKeyEvent(event: KeyEvent): Boolean {
        // Tombol kembali menutup menu, bukan menutup aplikasi di bawah overlay.
        if (event.keyCode == KeyEvent.KEYCODE_BACK) {
            if (event.action == KeyEvent.ACTION_UP) onCloseRequested()
            return true
        }
        return super.dispatchKeyEvent(event)
    }

    fun destroy() {
        runCatching { lifecycleRegistry.currentState = Lifecycle.State.DESTROYED }
        runCatching { store.clear() }
        Log.i(TAG, "menu cepat dilepas")
    }

    private companion object {
        const val TAG = "MateEngineOverlay"
    }
}
