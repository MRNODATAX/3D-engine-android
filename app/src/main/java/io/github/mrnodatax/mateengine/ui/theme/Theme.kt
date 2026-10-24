package io.github.mrnodatax.mateengine.ui.theme

import android.app.Activity
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.material3.Typography
import androidx.compose.runtime.Composable
import androidx.compose.runtime.SideEffect
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalView
import androidx.core.view.WindowCompat

/**
 * Warna netral dengan satu aksen cyan. Sengaja tidak memakai dynamic color agar identitas
 * produk tidak berubah mengikuti wallpaper; tema terang/gelap tetap mengikuti sistem.
 */
private val Cyan = Color(0xFF0E7490)
private val CyanLight = Color(0xFF4DD6F0)

private val LightColors = lightColorScheme(
    primary = Cyan,
    onPrimary = Color.White,
    primaryContainer = Color(0xFFE3F4F8),
    onPrimaryContainer = Color(0xFF04333C),
    secondary = Color(0xFF4C6169),
    onSecondary = Color.White,
    background = Color(0xFFFAFAFA),
    onBackground = Color(0xFF14181B),
    surface = Color(0xFFFFFFFF),
    onSurface = Color(0xFF14181B),
    surfaceVariant = Color(0xFFF2F4F5),
    onSurfaceVariant = Color(0xFF5B666D),
    outline = Color(0xFFDDE1E3),
    outlineVariant = Color(0xFFE9EDEE),
    error = Color(0xFFA5352B),
    onError = Color.White,
    errorContainer = Color(0xFFFBEAE8),
    onErrorContainer = Color(0xFF4A150F),
)

private val DarkColors = darkColorScheme(
    primary = CyanLight,
    onPrimary = Color(0xFF04191D),
    primaryContainer = Color(0xFF10333A),
    onPrimaryContainer = Color(0xFFBEF0F9),
    secondary = Color(0xFFA6BAC1),
    onSecondary = Color(0xFF0B1418),
    background = Color(0xFF0E1113),
    onBackground = Color(0xFFE8EDEF),
    surface = Color(0xFF171C1F),
    onSurface = Color(0xFFE8EDEF),
    surfaceVariant = Color(0xFF1F262A),
    onSurfaceVariant = Color(0xFF9AA7AD),
    outline = Color(0xFF2B3338),
    outlineVariant = Color(0xFF232B2F),
    error = Color(0xFFF09086),
    onError = Color(0xFF3A1C18),
    errorContainer = Color(0xFF3A1C18),
    onErrorContainer = Color(0xFFFBD9D4),
)

val SuccessColor: Color @Composable get() = if (isSystemInDarkTheme()) Color(0xFF6CD39C) else Color(0xFF1F7A4D)
val SuccessContainer: Color @Composable get() = if (isSystemInDarkTheme()) Color(0xFF12301F) else Color(0xFFE6F4EC)
val WarningColor: Color @Composable get() = if (isSystemInDarkTheme()) Color(0xFFE4B25C) else Color(0xFF8A5A00)
val WarningContainer: Color @Composable get() = if (isSystemInDarkTheme()) Color(0xFF33290F) else Color(0xFFFBF1DC)

@Composable
fun MateEngineTheme(content: @Composable () -> Unit) {
    val dark = isSystemInDarkTheme()
    val colors = if (dark) DarkColors else LightColors
    val view = LocalView.current
    if (!view.isInEditMode) {
        SideEffect {
            val window = (view.context as? Activity)?.window ?: return@SideEffect
            window.statusBarColor = Color.Transparent.toArgb()
            window.navigationBarColor = Color.Transparent.toArgb()
            WindowCompat.getInsetsController(window, view).apply {
                isAppearanceLightStatusBars = !dark
                isAppearanceLightNavigationBars = !dark
            }
        }
    }
    MaterialTheme(
        colorScheme = colors,
        typography = MateTypography,
        content = content,
    )
}

private val MateTypography = Typography()
