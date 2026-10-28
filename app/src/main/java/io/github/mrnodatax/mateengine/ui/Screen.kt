package io.github.mrnodatax.mateengine.ui

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Build
import androidx.compose.material.icons.filled.Email
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.material.icons.filled.Settings
import androidx.compose.ui.graphics.vector.ImageVector

/**
 * Tujuan navigasi aplikasi.
 *
 * Aturan desain: bilah navigasi bawah maksimal **5 tujuan** (`ui-ux-pro-max`, kategori Navigation).
 * Karena itu [Diagnostics] tidak lagi punya tab sendiri; halaman tetap ada dan bisa dibuka dari
 * Pengaturan atau lewat intent debug `--es screen diagnostics` (dipakai skrip tangkapan layar).
 */
enum class Screen(
    val label: String,
    val icon: ImageVector,
    val navLabel: String = label,
    val inBottomBar: Boolean = true,
) {
    Home(T.navHome, Icons.Filled.Home),
    Avatar(T.navAvatar, Icons.Filled.Person),
    Chat(T.navChat, Icons.Filled.Email),
    Animation(T.navAnimation, Icons.Filled.PlayArrow),
    Diagnostics(T.navDiagnostics, Icons.Filled.Build, inBottomBar = false),
    Settings(T.navSettings, Icons.Filled.Settings, T.navSettingsShort),
    ;

    companion object {
        /** Tujuan yang tampil di bilah navigasi (maks 5). */
        val bottomBar: List<Screen> get() = entries.filter { it.inBottomBar }

        /** Cari tujuan dari nama; null bila tidak dikenal. */
        fun fromName(name: String?): Screen? =
            entries.firstOrNull { it.name.equals(name, ignoreCase = true) }
    }
}
