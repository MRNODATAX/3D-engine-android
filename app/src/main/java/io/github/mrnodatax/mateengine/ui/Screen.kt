package io.github.mrnodatax.mateengine.ui

import androidx.annotation.DrawableRes
import io.github.mrnodatax.mateengine.R

/**
 * Tujuan navigasi aplikasi.
 *
 * Aturan desain: bilah navigasi bawah maksimal **5 tujuan** (`ui-ux-pro-max`, kategori Navigation).
 * Karena itu [Diagnostics] tidak lagi punya tab sendiri; halaman tetap ada dan bisa dibuka dari
 * Pengaturan atau lewat intent debug `--es screen diagnostics` (dipakai skrip tangkapan layar).
 *
 * Ikon memakai **Material Symbols (outlined)** dari `res/drawable/ic_symbol_*.xml`; berkas itu
 * dibuat oleh `scripts/siapkan-ikon-simbol.sh` (Apache-2.0). Sebelumnya tab Chat memakai ikon
 * surat (`Email`) dan tab Animasi memakai segitiga putar — semantiknya salah dan gayanya campur.
 */
enum class Screen(
    val label: String,
    @param:DrawableRes val icon: Int,
    val navLabel: String = label,
    val inBottomBar: Boolean = true,
) {
    Home(T.navHome, R.drawable.ic_symbol_home),
    Avatar(T.navAvatar, R.drawable.ic_symbol_person),
    Chat(T.navChat, R.drawable.ic_symbol_chat_bubble),
    Animation(T.navAnimation, R.drawable.ic_symbol_animation),
    Diagnostics(T.navDiagnostics, R.drawable.ic_symbol_troubleshoot, inBottomBar = false),
    Settings(T.navSettings, R.drawable.ic_symbol_settings, T.navSettingsShort),
    ;

    companion object {
        /** Tujuan yang tampil di bilah navigasi (maks 5). */
        val bottomBar: List<Screen> get() = entries.filter { it.inBottomBar }

        /** Cari tujuan dari nama; null bila tidak dikenal. */
        fun fromName(name: String?): Screen? =
            entries.firstOrNull { it.name.equals(name, ignoreCase = true) }
    }
}
