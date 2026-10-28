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
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.safeDrawing
import androidx.compose.foundation.layout.windowInsetsPadding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Build
import androidx.compose.material.icons.filled.Email
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
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
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
import io.github.mrnodatax.mateengine.chat.ChatController
import io.github.mrnodatax.mateengine.ui.screens.AvatarScreen
import io.github.mrnodatax.mateengine.ui.screens.ChatScreen
import io.github.mrnodatax.mateengine.ui.screens.DiagnosticsScreen
import io.github.mrnodatax.mateengine.ui.screens.HomeScreen
import io.github.mrnodatax.mateengine.ui.screens.SettingsScreen
import io.github.mrnodatax.mateengine.R
import io.github.mrnodatax.mateengine.ui.Screen
import io.github.mrnodatax.mateengine.ui.theme.BrandName
import io.github.mrnodatax.mateengine.ui.theme.MateEngineTheme
import io.github.mrnodatax.mateengine.util.DiagnosticAction
import io.github.mrnodatax.mateengine.util.Diagnostics
import kotlinx.coroutines.launch

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
            Screen.fromName(requested) ?: Screen.Home
        }
    }
    var screen by remember { mutableStateOf(initialScreen) }
    val requestedScreen by DebugNavigation.requestedScreen
    LaunchedEffect(requestedScreen) {
        if (!BuildConfig.DEBUG) return@LaunchedEffect
        val target = Screen.fromName(requestedScreen)
        if (target != null) screen = target
    }
    var overlayGranted by remember { mutableStateOf(Settings.canDrawOverlays(context)) }
    var importingAvatar by remember { mutableStateOf(false) }
    var importingAnimation by remember { mutableStateOf(false) }
    var diagnosticsVersion by remember { mutableIntStateOf(0) }
    val chatController = remember { ChatController(context) }
    val chatUi by chatController.ui.collectAsStateWithLifecycle()
    DisposableEffect(chatController) { onDispose { chatController.shutdown() } }

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
        // Ekstra debug untuk tangkapan layar bukti skala: --ei scale 100
        val debugScale = (context as? android.app.Activity)?.intent?.getIntExtra("scale", -1) ?: -1
        if (BuildConfig.DEBUG && debugScale > 0) {
            repository.updateOverlay { it.copy(scalePercent = debugScale.coerceIn(25, 100)) }
        }
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
                                Screen.bottomBar.forEach { entry ->
                                    NavigationRailItem(
                                        selected = screen == entry,
                                        onClick = { screen = entry },
                                        icon = { Icon(entry.icon, contentDescription = null) },
                                        label = {
                                            Text(
                                                entry.navLabel,
                                                maxLines = 1,
                                                softWrap = false,
                                                overflow = TextOverflow.Ellipsis,
                                                style = MaterialTheme.typography.labelSmall,
                                            )
                                        },
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
                                Screen.Chat -> ChatScreen(
                                    ui = chatUi,
                                    onSaveApiKey = { chatController.saveApiKey(it) },
                                    onClearApiKey = { chatController.clearApiKey() },
                                    onSavePersona = { chatController.savePersona(it) },
                                    onSettingsChange = { chatController.updateSettings(it) },
                                    onSend = { text -> chatController.send(text, scope) },
                                    onClearHistory = { chatController.clearHistory() },
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
                                    onLocomotionChange = { mode ->
                                        repository.updateOverlay { it.copy(motion = mode) }
                                        if (runtime.running) OverlayService.setLocomotion(context, mode)
                                    },
                                    onNextDance = { if (runtime.running) OverlayService.setLocomotion(context, "dance-next") },
                                    onPlayBuiltin = { name -> if (runtime.running) OverlayService.playBuiltin(context, name) },
                                    onResetPose = { if (runtime.running) OverlayService.resetPose(context) },
                                    seated = runtime.seated,
                                    onSeatedChange = { seated ->
                                        if (runtime.running) OverlayService.setSeated(context, seated)
                                    },
                                    onStartAvatar = { startOverlay() },
                                )
                                Screen.Diagnostics -> DiagnosticsScreen(
                                    snapshot = diagnostics,
                                    runtime = runtime,
                                    onAction = onDiagnosticAction,
                                    onCopied = { scope.launch { snackbar.showSnackbar(T.copied) } },
                                )
                                Screen.Settings -> SettingsScreen(
                                    onOpenDiagnostics = { screen = Screen.Diagnostics },
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
                                    onMemorySaverChange = { value ->
                                        repository.updateOverlay { it.copy(memorySaver = value) }
                                        if (runtime.running) OverlayService.applySettings(context)
                                    },
                                    onTrimMemory = { OverlayService.trimMemory(context) },
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
                                Screen.bottomBar.forEach { entry ->
                                    NavigationBarItem(
                                        selected = screen == entry,
                                        onClick = { screen = entry },
                                        icon = { Icon(entry.icon, contentDescription = null) },
                                        label = {
                                            Text(
                                                entry.navLabel,
                                                maxLines = 1,
                                                softWrap = false,
                                                overflow = TextOverflow.Ellipsis,
                                                style = MaterialTheme.typography.labelSmall,
                                            )
                                        },
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
        Row(verticalAlignment = Alignment.CenterVertically) {
            // Tanda merek 24dp: satu warna, tanpa gradien/bayangan (lihat docs/brand-guidelines.md).
            Icon(
                painter = painterResource(R.drawable.ic_brand_mark),
                contentDescription = null,
                tint = MaterialTheme.colorScheme.primary,
                modifier = Modifier.size(24.dp),
            )
            Text(
                BrandName,
                style = MaterialTheme.typography.labelLarge,
                color = MaterialTheme.colorScheme.primary,
                fontWeight = FontWeight.SemiBold,
                modifier = Modifier.padding(start = 8.dp),
            )
        }
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
