package io.github.mrnodatax.mateengine

import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.provider.Settings
import androidx.activity.ComponentActivity
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.safeDrawing
import androidx.compose.foundation.layout.windowInsetsPadding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Build
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.NavigationBarItemDefaults
import androidx.compose.material3.NavigationRail
import androidx.compose.material3.NavigationRailItem
import androidx.compose.material3.NavigationRailItemDefaults
import androidx.compose.material3.Scaffold
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.VerticalDivider
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.core.content.ContextCompat
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.LifecycleEventObserver
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import io.github.mrnodatax.mateengine.data.AppRepository
import io.github.mrnodatax.mateengine.data.AvatarAsset
import io.github.mrnodatax.mateengine.overlay.OverlayRuntime
import io.github.mrnodatax.mateengine.overlay.OverlayService
import io.github.mrnodatax.mateengine.ui.T
import io.github.mrnodatax.mateengine.ui.screens.AnimationScreen
import io.github.mrnodatax.mateengine.ui.screens.AvatarScreen
import io.github.mrnodatax.mateengine.ui.screens.DiagnosticsScreen
import io.github.mrnodatax.mateengine.ui.screens.HomeScreen
import io.github.mrnodatax.mateengine.ui.screens.SettingsScreen
import io.github.mrnodatax.mateengine.ui.theme.MateEngineTheme
import io.github.mrnodatax.mateengine.util.DiagnosticAction
import io.github.mrnodatax.mateengine.util.Diagnostics
import kotlinx.coroutines.launch

private enum class Screen(val label: String, val icon: ImageVector) {
    Home(T.navHome, Icons.Filled.Home),
    Avatar(T.navAvatar, Icons.Filled.Person),
    Animation(T.navAnimation, Icons.Filled.PlayArrow),
    Diagnostics(T.navDiagnostics, Icons.Filled.Build),
    Settings(T.navSettings, Icons.Filled.Settings),
}

/** Penanda layar awal dari intent; dipakai juga saat activity menerima intent baru (singleTask). */
private object DebugNavigation {
    val requestedScreen = androidx.compose.runtime.mutableStateOf<String?>(null)
}

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        DebugNavigation.requestedScreen.value = intent?.getStringExtra("screen")
        setContent {
            MateEngineTheme {
                MateEngineApp()
            }
        }
    }

    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        setIntent(intent)
        if (BuildConfig.DEBUG) {
            // Tangkapan layar CI berpindah halaman tanpa mematikan service overlay.
            DebugNavigation.requestedScreen.value = intent.getStringExtra("screen")
        }
    }
}

@Composable
private fun MateEngineApp() {
    val context = LocalContext.current
    val repository = remember { AppRepository.get(context) }
    val state by repository.state.collectAsStateWithLifecycle()
    val runtime by OverlayRuntime.state.collectAsStateWithLifecycle()
    val scope = rememberCoroutineScope()
    val snackbar = remember { SnackbarHostState() }

    // Hook khusus build debug untuk tangkapan layar otomatis di CI:
    //   am start ... --es screen avatar --ez seed_sample true
    LaunchedEffect(Unit) {
        // Hook debug: memulai overlay tanpa membuka izin manual (dipakai tangkapan layar CI).
        if (BuildConfig.DEBUG &&
            (context as? android.app.Activity)?.intent?.getBooleanExtra("start_overlay", false) == true
        ) {
            OverlayService.start(context)
        }
    }

    val initialScreen = remember {
        if (!BuildConfig.DEBUG) {
            Screen.Home
        } else {
            val requested = DebugNavigation.requestedScreen.value
                ?: (context as? android.app.Activity)?.intent?.getStringExtra("screen")
            Screen.entries.firstOrNull { it.name.equals(requested, ignoreCase = true) } ?: Screen.Home
        }
    }
    var screen by remember { mutableStateOf(initialScreen) }
    val requestedScreen by DebugNavigation.requestedScreen
    LaunchedEffect(requestedScreen) {
        if (!BuildConfig.DEBUG) return@LaunchedEffect
        val target = Screen.entries.firstOrNull { it.name.equals(requestedScreen, ignoreCase = true) }
        if (target != null) screen = target
    }
    var overlayGranted by remember { mutableStateOf(Settings.canDrawOverlays(context)) }
    var importingAvatar by remember { mutableStateOf(false) }
    var importingAnimation by remember { mutableStateOf(false) }
    var diagnosticsVersion by remember { mutableIntStateOf(0) }

    // Izin bisa dicabut kapan saja dari setelan sistem: periksa ulang saat aplikasi kembali aktif.
    DisposableEffect(context) {
        val observer = LifecycleEventObserver { _, event ->
            if (event == Lifecycle.Event.ON_RESUME) {
                overlayGranted = Settings.canDrawOverlays(context)
                diagnosticsVersion++
            }
        }
        val lifecycleOwner = context as? androidx.lifecycle.LifecycleOwner
        lifecycleOwner?.lifecycle?.addObserver(observer)
        onDispose { lifecycleOwner?.lifecycle?.removeObserver(observer) }
    }

    LaunchedEffect(Unit) {
        val seed = BuildConfig.DEBUG &&
            (context as? android.app.Activity)?.intent?.getBooleanExtra("seed_sample", false) == true
        if (seed) repository.seedSampleFromAssets()
    }

    val notificationPermissionLauncher = rememberLauncherForActivityResult(
        ActivityResultContracts.RequestPermission(),
    ) { }

    val avatarPicker = rememberLauncherForActivityResult(ActivityResultContracts.OpenDocument()) { uri ->
        if (uri == null) return@rememberLauncherForActivityResult
        importingAvatar = true
        scope.launch {
            repository.importAvatar(uri)
                .onSuccess { asset ->
                    snackbar.showSnackbar("Model diimpor: ${asset.displayName}")
                    if (runtime.running) OverlayService.reloadAvatar(context)
                    screen = Screen.Avatar
                }
                .onFailure { error ->
                    snackbar.showSnackbar("Gagal mengimpor: ${error.message ?: "berkas tidak terbaca"}")
                }
            importingAvatar = false
        }
    }

    val animationPicker = rememberLauncherForActivityResult(ActivityResultContracts.OpenDocument()) { uri ->
        if (uri == null) return@rememberLauncherForActivityResult
        importingAnimation = true
        scope.launch {
            repository.importAnimation(uri)
                .onSuccess { snackbar.showSnackbar("Animasi diimpor: ${it.displayName}") }
                .onFailure { snackbar.showSnackbar("Gagal mengimpor animasi: ${it.message ?: "berkas tidak terbaca"}") }
            importingAnimation = false
        }
    }

    fun ensureNotificationPermission() {
        if (Build.VERSION.SDK_INT >= 33) {
            val granted = ContextCompat.checkSelfPermission(context, Manifest.permission.POST_NOTIFICATIONS) ==
                PackageManager.PERMISSION_GRANTED
            if (!granted) notificationPermissionLauncher.launch(Manifest.permission.POST_NOTIFICATIONS)
        }
    }

    fun openOverlayPermission() {
        val intent = Intent(
            Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
            Uri.parse("package:${context.packageName}"),
        )
        runCatching { context.startActivity(intent) }
            .onFailure { scope.launch { snackbar.showSnackbar("Setelan izin overlay tidak tersedia di perangkat ini.") } }
    }

    fun startOverlay() {
        if (!Settings.canDrawOverlays(context)) {
            openOverlayPermission()
            return
        }
        if (state.selectedAvatar == null) {
            screen = Screen.Avatar
            scope.launch { snackbar.showSnackbar("Impor model .vrm terlebih dahulu.") }
            return
        }
        ensureNotificationPermission()
        OverlayService.start(context)
    }

    val onDiagnosticAction: (DiagnosticAction) -> Unit = { action ->
        Diagnostics.intentFor(context, action)?.let { intent ->
            runCatching { context.startActivity(intent) }
                .onFailure { scope.launch { snackbar.showSnackbar("Setelan tidak tersedia di perangkat ini.") } }
        }
    }

    Surface(Modifier.fillMaxSize(), color = MaterialTheme.colorScheme.background) {
        BoxWithConstraints(Modifier.fillMaxSize()) {
            val wide = maxWidth >= 720.dp
            // Pada jendela lebar tapi pendek (lanskap ponsel), judul rail disembunyikan
            // agar semua item navigasi tetap terlihat tanpa menggulir.
            val showRailTitle = maxHeight >= 560.dp
            val diagnostics = remember(diagnosticsVersion) { Diagnostics.snapshot(context) }

            Scaffold(
                snackbarHost = { SnackbarHost(snackbar) },
                containerColor = MaterialTheme.colorScheme.background,
                contentWindowInsets = WindowInsets.safeDrawing,
            ) { padding ->
                Row(
                    Modifier
                        .fillMaxSize()
                        .padding(padding),
                ) {
                    if (wide) {
                        NavigationRail(containerColor = MaterialTheme.colorScheme.surface) {
                            Column(
                                Modifier
                                    .windowInsetsPadding(WindowInsets.safeDrawing)
                                    .verticalScroll(rememberScrollState()),
                                horizontalAlignment = Alignment.CenterHorizontally,
                            ) {
                                if (showRailTitle) AppTitleBlock()
                                Screen.entries.forEach { entry ->
                                    NavigationRailItem(
                                        selected = screen == entry,
                                        onClick = { screen = entry },
                                        icon = { Icon(entry.icon, contentDescription = null) },
                                        label = { Text(entry.label) },
                                        colors = NavigationRailItemDefaults.colors(
                                            selectedIconColor = MaterialTheme.colorScheme.onPrimaryContainer,
                                            selectedTextColor = MaterialTheme.colorScheme.primary,
                                            indicatorColor = MaterialTheme.colorScheme.primaryContainer,
                                            unselectedIconColor = MaterialTheme.colorScheme.onSurfaceVariant,
                                            unselectedTextColor = MaterialTheme.colorScheme.onSurfaceVariant,
                                        ),
                                    )
                                }
                            }
                        }
                        VerticalDivider(color = MaterialTheme.colorScheme.outlineVariant)
                    }
                    Column(Modifier.weight(1f)) {
                        if (!wide) AppHeader(screen)
                        Box(Modifier.weight(1f)) {
                            when (screen) {
                                Screen.Home -> HomeScreen(
                                    state = state,
                                    runtime = runtime,
                                    overlayGranted = overlayGranted,
                                    onStart = { startOverlay() },
                                    onStop = { OverlayService.stop(context) },
                                    onRequestPermission = { openOverlayPermission() },
                                    onImportModel = { avatarPicker.launch(arrayOf("*/*")) },
                                    onScaleChange = { value ->
                                        repository.updateOverlay { it.copy(scalePercent = value) }
                                        if (runtime.running) OverlayService.applySettings(context)
                                    },
                                    onOpacityChange = { value ->
                                        repository.updateOverlay { it.copy(opacityPercent = value) }
                                        if (runtime.running) OverlayService.applySettings(context)
                                    },
                                    onLockChange = { locked ->
                                        repository.updateOverlay { it.copy(locked = locked) }
                                        if (runtime.running) OverlayService.applySettings(context)
                                    },
                                    onUseAvatar = { asset -> useAvatar(repository, asset, runtime.running, context, snackbar, scope) },
                                    onPlayAnimation = {
                                        state.selectedAnimation?.let { OverlayService.playAnimation(context, it.id) }
                                    },
                                )
                                Screen.Avatar -> AvatarScreen(
                                    state = state,
                                    importing = importingAvatar,
                                    onImport = { avatarPicker.launch(arrayOf("*/*")) },
                                    onUse = { asset -> useAvatar(repository, asset, runtime.running, context, snackbar, scope) },
                                    onDelete = { asset ->
                                        repository.deleteAvatar(asset.id)
                                        if (runtime.running) OverlayService.reloadAvatar(context)
                                    },
                                )
                                Screen.Animation -> AnimationScreen(
                                    state = state,
                                    runtime = runtime,
                                    importing = importingAnimation,
                                    onImport = { animationPicker.launch(arrayOf("*/*")) },
                                    onPlay = { animation -> OverlayService.playAnimation(context, animation.id) },
                                    onStop = { OverlayService.stopAnimation(context) },
                                    onDelete = { animation -> repository.deleteAnimation(animation.id) },
                                    onLoopChange = { loop ->
                                        repository.setAnimationOptions(loop, state.shuffleAnimation, state.animationSpeedPercent)
                                    },
                                    onShuffleChange = { shuffle ->
                                        repository.setAnimationOptions(state.loopAnimation, shuffle, state.animationSpeedPercent)
                                    },
                                    onSpeedChange = { speed ->
                                        repository.setAnimationOptions(state.loopAnimation, state.shuffleAnimation, speed)
                                        if (runtime.running) OverlayService.applySettings(context)
                                    },
                                )
                                Screen.Diagnostics -> DiagnosticsScreen(
                                    snapshot = diagnostics,
                                    onAction = onDiagnosticAction,
                                    onCopied = { scope.launch { snackbar.showSnackbar(T.copied) } },
                                )
                                Screen.Settings -> SettingsScreen(
                                    state = state,
                                    versionName = BuildConfig.VERSION_NAME,
                                    versionCode = BuildConfig.VERSION_CODE,
                                    buildType = BuildConfig.BUILD_TYPE,
                                    onFpsChange = { value ->
                                        repository.updateOverlay { it.copy(targetFps = value) }
                                        if (runtime.running) OverlayService.applySettings(context)
                                    },
                                    onQualityChange = { value ->
                                        repository.updateOverlay { it.copy(quality = value) }
                                        if (runtime.running) OverlayService.applySettings(context)
                                    },
                                    onClearCache = {
                                        repository.clearRenderCache()
                                        scope.launch { snackbar.showSnackbar(T.clearCacheDone) }
                                    },
                                    onDeleteAll = {
                                        repository.deleteAllData()
                                        OverlayService.stop(context)
                                        scope.launch { snackbar.showSnackbar("Semua data aplikasi dihapus") }
                                    },
                                    onOpenDesktopRelease = {
                                        runCatching {
                                            context.startActivity(
                                                Intent(
                                                    Intent.ACTION_VIEW,
                                                    Uri.parse("https://github.com/shinyflvre/Mate-Engine/releases"),
                                                ),
                                            )
                                        }
                                    },
                                )
                            }
                        }
                        if (!wide) {
                            NavigationBar(containerColor = MaterialTheme.colorScheme.surface) {
                                Screen.entries.forEach { entry ->
                                    NavigationBarItem(
                                        selected = screen == entry,
                                        onClick = { screen = entry },
                                        icon = { Icon(entry.icon, contentDescription = null) },
                                        label = { Text(entry.label) },
                                        colors = NavigationBarItemDefaults.colors(
                                            selectedIconColor = MaterialTheme.colorScheme.onPrimaryContainer,
                                            selectedTextColor = MaterialTheme.colorScheme.primary,
                                            indicatorColor = MaterialTheme.colorScheme.primaryContainer,
                                            unselectedIconColor = MaterialTheme.colorScheme.onSurfaceVariant,
                                            unselectedTextColor = MaterialTheme.colorScheme.onSurfaceVariant,
                                        ),
                                    )
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

private fun useAvatar(
    repository: AppRepository,
    asset: AvatarAsset,
    running: Boolean,
    context: android.content.Context,
    snackbar: SnackbarHostState,
    scope: kotlinx.coroutines.CoroutineScope,
) {
    repository.selectAvatar(asset.id)
    if (running) OverlayService.reloadAvatar(context)
    scope.launch { snackbar.showSnackbar("Avatar aktif: ${asset.displayName}") }
}

@Composable
private fun AppHeader(screen: Screen) {
    Column(Modifier.padding(start = 20.dp, end = 20.dp, top = 16.dp, bottom = 8.dp)) {
        Text(
            "Mate Engine",
            style = MaterialTheme.typography.labelLarge,
            color = MaterialTheme.colorScheme.primary,
            fontWeight = FontWeight.SemiBold,
        )
        Text(
            screen.label,
            style = MaterialTheme.typography.headlineSmall,
            fontWeight = FontWeight.SemiBold,
            modifier = Modifier.padding(top = 2.dp),
        )
        Text(
            T.tagline,
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
        )
    }
}

@Composable
private fun AppTitleBlock() {
    Column(Modifier.padding(vertical = 20.dp, horizontal = 8.dp), horizontalAlignment = Alignment.CenterHorizontally) {
        Text(
            "Mate",
            style = MaterialTheme.typography.titleMedium,
            color = MaterialTheme.colorScheme.primary,
            fontWeight = FontWeight.Bold,
        )
        Text(
            "Engine",
            style = MaterialTheme.typography.titleMedium,
            fontWeight = FontWeight.Bold,
        )
    }
}
