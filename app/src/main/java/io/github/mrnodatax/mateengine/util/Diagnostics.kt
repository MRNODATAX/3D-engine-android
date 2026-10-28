package io.github.mrnodatax.mateengine.util

import android.Manifest
import android.app.ActivityManager
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build
import android.os.PowerManager
import android.provider.Settings
import androidx.core.content.ContextCompat
import androidx.webkit.WebViewCompat
import io.github.mrnodatax.mateengine.BuildConfig
import io.github.mrnodatax.mateengine.overlay.OverlayRuntime

enum class DiagnosticStatus { OK, WARN, BLOCKED, UNKNOWN }

enum class DiagnosticAction { OVERLAY_PERMISSION, BATTERY_OPTIMIZATION, NOTIFICATIONS, APP_DETAILS, WEBVIEW_UPDATER }

data class DiagnosticItem(
    val id: String,
    val title: String,
    val detail: String,
    val status: DiagnosticStatus,
    val action: DiagnosticAction? = null,
    val actionLabel: String = "Buka setelan",
)

data class DiagnosticsSnapshot(
    val deviceLabel: String,
    val androidLabel: String,
    val romLabel: String,
    val items: List<DiagnosticItem>,
    val report: String,
)

/**
 * Membaca kondisi perangkat apa adanya. Tidak ada tombol yang mengaku bisa memperbaiki
 * pembatasan milik produsen; yang tersedia hanya jalan menuju setelan sistem yang relevan.
 */
object Diagnostics {

    fun snapshot(context: Context): DiagnosticsSnapshot {
        val overlayGranted = Settings.canDrawOverlays(context)
        val notificationsGranted = if (Build.VERSION.SDK_INT >= 33) {
            ContextCompat.checkSelfPermission(context, Manifest.permission.POST_NOTIFICATIONS) == PackageManager.PERMISSION_GRANTED
        } else {
            true
        }
        val powerManager = context.getSystemService(PowerManager::class.java)
        val ignoringBattery = powerManager?.isIgnoringBatteryOptimizations(context.packageName) == true
        val activityManager = context.getSystemService(ActivityManager::class.java)
        val backgroundRestricted = activityManager?.isBackgroundRestricted == true
        val webViewPackage = runCatching { WebViewCompat.getCurrentWebViewPackage(context) }.getOrNull()
        val runtime = OverlayRuntime.state.value

        val items = buildList {
            add(
                DiagnosticItem(
                    id = "overlay",
                    title = "Izin tampil di atas aplikasi",
                    detail = if (overlayGranted) {
                        "Diizinkan · diperiksa langsung dari sistem"
                    } else {
                        "Ditolak · avatar tidak bisa muncul sebelum izin diberikan"
                    },
                    status = if (overlayGranted) DiagnosticStatus.OK else DiagnosticStatus.BLOCKED,
                    action = DiagnosticAction.OVERLAY_PERMISSION,
                ),
            )
            add(
                DiagnosticItem(
                    id = "battery",
                    title = "Optimasi baterai",
                    detail = if (ignoringBattery) {
                        "Dikecualikan · service tidak dibatasi saat layar mati"
                    } else {
                        "Dibatasi sistem · service bisa dihentikan saat layar mati atau aplikasi lain aktif"
                    },
                    status = if (ignoringBattery) DiagnosticStatus.OK else DiagnosticStatus.WARN,
                    action = DiagnosticAction.BATTERY_OPTIMIZATION,
                    actionLabel = if (ignoringBattery) "Buka setelan" else "Minta pengecualian",
                ),
            )
            add(
                DiagnosticItem(
                    id = "restriction",
                    title = "Pembatasan latar belakang",
                    detail = if (backgroundRestricted) {
                        "Aktif · sistem membatasi pekerjaan latar aplikasi ini"
                    } else {
                        "Tidak aktif · sistem tidak melaporkan pembatasan"
                    },
                    status = if (backgroundRestricted) DiagnosticStatus.WARN else DiagnosticStatus.OK,
                    action = DiagnosticAction.APP_DETAILS,
                ),
            )
            add(
                DiagnosticItem(
                    id = "notifications",
                    title = "Izin notifikasi",
                    detail = if (notificationsGranted) {
                        "Diizinkan · notifikasi service bisa ditampilkan"
                    } else {
                        "Ditolak · service tetap berjalan, tetapi notifikasi penghentian tidak terlihat"
                    },
                    status = if (notificationsGranted) DiagnosticStatus.OK else DiagnosticStatus.WARN,
                    action = DiagnosticAction.NOTIFICATIONS,
                ),
            )
            add(
                DiagnosticItem(
                    id = "webview",
                    title = "WebView renderer",
                    detail = webViewPackage?.let { "${it.packageName} ${it.versionName}" }
                        ?: "Tidak terdeteksi · renderer avatar tidak bisa dimulai",
                    status = if (webViewPackage != null) DiagnosticStatus.OK else DiagnosticStatus.BLOCKED,
                    action = if (webViewPackage != null) null else DiagnosticAction.WEBVIEW_UPDATER,
                ),
            )
            add(
                DiagnosticItem(
                    id = "runtime",
                    title = "Service overlay",
                    detail = when {
                        runtime.running && runtime.rendererReady -> "Berjalan · renderer siap · ${runtime.fps.coerceAtLeast(0)} fps terakhir"
                        runtime.running -> "Berjalan · menunggu renderer"
                        else -> "Tidak berjalan"
                    },
                    status = if (runtime.running) DiagnosticStatus.OK else DiagnosticStatus.UNKNOWN,
                    action = null,
                ),
            )
            runtime.lastError?.let { error ->
                add(
                    DiagnosticItem(
                        id = "last_error",
                        title = "Kesalahan terakhir dari renderer",
                        detail = error,
                        status = DiagnosticStatus.WARN,
                    ),
                )
            }
            add(
                DiagnosticItem(
                    id = "device_profile",
                    title = "Profil perangkat uji",
                    detail = "Perangkat ini belum diverifikasi resmi; laporkan hasilnya bila avatar tidak muncul.",
                    status = DiagnosticStatus.UNKNOWN,
                ),
            )
        }

        val deviceLabel = "${Build.MANUFACTURER.replaceFirstChar { it.uppercase() }} ${Build.MODEL}"
        val androidLabel = "Android ${Build.VERSION.RELEASE} (API ${Build.VERSION.SDK_INT})"
        val romLabel = romLabel()

        val report = buildString {
            appendLine("perangkat: $deviceLabel")
            appendLine("android: ${Build.VERSION.RELEASE} (API ${Build.VERSION.SDK_INT})")
            appendLine("rom: $romLabel")
            appendLine("fingerprint: ${Build.FINGERPRINT}")
            appendLine("overlay: ${if (overlayGranted) "granted" else "denied"}")
            appendLine("battery_exempt: $ignoringBattery")
            appendLine("background_restricted: $backgroundRestricted")
            appendLine("notifications: ${if (notificationsGranted) "granted" else "denied"}")
            appendLine("webview: ${webViewPackage?.versionName ?: "tidak terdeteksi"}")
            appendLine("service_running: ${runtime.running}")
            appendLine("renderer_ready: ${runtime.rendererReady}")
            appendLine("last_fps: ${runtime.fps}")
            append("app: ${BuildConfig.VERSION_NAME} (${BuildConfig.VERSION_CODE}) ${BuildConfig.BUILD_TYPE}")
        }

        return DiagnosticsSnapshot(deviceLabel, androidLabel, romLabel, items, report)
    }

    /**
     * Deteksi ROM hanya dari sidik build. Bila tidak dikenali, hasilnya "tidak terdeteksi"
     * dan bukan tebakan.
     */
    fun romLabel(): String {
        val fingerprint = (Build.DISPLAY + " " + Build.FINGERPRINT + " " + Build.PRODUCT).lowercase()
        return when {
            fingerprint.contains("hyperos") -> "HyperOS (Xiaomi)"
            fingerprint.contains("miui") -> "MIUI (Xiaomi)"
            fingerprint.contains("coloros") || fingerprint.contains("oplus") -> "ColorOS/Realme UI (Oppo)"
            fingerprint.contains("oneui") || fingerprint.contains("samsung") -> "One UI (Samsung)"
            fingerprint.contains("funtouch") || fingerprint.contains("vivo") -> "Funtouch OS (vivo)"
            fingerprint.contains("harmony") -> "HarmonyOS"
            fingerprint.contains("emui") -> "EMUI (Huawei)"
            fingerprint.contains("originos") -> "OriginOS (vivo)"
            else -> "Tidak terdeteksi dari sidik build"
        }
    }

    fun intentFor(context: Context, action: DiagnosticAction): Intent? = when (action) {
        DiagnosticAction.OVERLAY_PERMISSION -> Intent(
            Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
            Uri.parse("package:${context.packageName}"),
        )
        DiagnosticAction.BATTERY_OPTIMIZATION -> Intent(
            Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS,
            Uri.parse("package:${context.packageName}"),
        )
        DiagnosticAction.NOTIFICATIONS -> Intent(Settings.ACTION_APP_NOTIFICATION_SETTINGS)
            .putExtra(Settings.EXTRA_APP_PACKAGE, context.packageName)
        DiagnosticAction.APP_DETAILS -> Intent(
            Settings.ACTION_APPLICATION_DETAILS_SETTINGS,
            Uri.parse("package:${context.packageName}"),
        )
        DiagnosticAction.WEBVIEW_UPDATER -> Intent(
            Intent.ACTION_VIEW,
            Uri.parse("market://details?id=com.google.android.webview"),
        )
    }.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
}
