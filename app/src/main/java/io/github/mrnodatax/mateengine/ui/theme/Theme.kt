package io.github.mrnodatax.mateengine.ui.theme

import android.app.Activity
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.material3.Shapes
import androidx.compose.material3.Typography
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.ui.unit.dp
import androidx.compose.runtime.Composable
import androidx.compose.runtime.SideEffect
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalView
import androidx.core.view.WindowCompat

/**
 * Arah desain "Expressive Cyan" (opsi 1 yang di-ACC): biji warna cyan tua #006A66 dengan
 * permukaan pucat #F4FBFA, bentuk besar, dan sudut 20–28dp. Tetap tanpa dynamic color agar
 * identitas produk tidak berubah mengikuti wallpaper; tema terang/gelap mengikuti sistem.
 */
private val Cyan = Color(0xFF006A66)
private val CyanLight = Color(0xFF6FE0D8)

private val LightColors = lightColorScheme(
    primary = Cyan,
    onPrimary = Color(0xFFEAFFFD),
    primaryContainer = Color(0xFF9FF2EA),
    onPrimaryContainer = Color(0xFF00423F),
    secondary = Color(0xFF4A635F),
    onSecondary = Color.White,
    secondaryContainer = Color(0xFFDFF3F0),
    onSecondaryContainer = Color(0xFF0B1B1A),
    background = Color(0xFFF4FBFA),
    onBackground = Color(0xFF0B1B1A),
    surface = Color(0xFFFFFFFF),
    onSurface = Color(0xFF0B1B1A),
    surfaceVariant = Color(0xFFE7F2F0),
    onSurfaceVariant = Color(0xFF4F615E),
    outline = Color(0xFF9FB4B1),
    outlineVariant = Color(0xFFDCE9E7),
    error = Color(0xFFA5352B),
    onError = Color.White,
    errorContainer = Color(0xFFFBEAE8),
    onErrorContainer = Color(0xFF4A150F),
)

private val DarkColors = darkColorScheme(
    primary = CyanLight,
    onPrimary = Color(0xFF00312E),
    primaryContainer = Color(0xFF114A46),
    onPrimaryContainer = Color(0xFFC9FBF5),
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
        shapes = MateShapes,
        content = content,
    )
}

private val MateTypography = Typography()

/** Skala bentuk Expressive: kontrol kecil 12dp, kartu 20dp, panel 28dp. */
private val MateShapes = Shapes(
    extraSmall = RoundedCornerShape(8.dp),
    small = RoundedCornerShape(12.dp),
    medium = RoundedCornerShape(20.dp),
    large = RoundedCornerShape(24.dp),
    extraLarge = RoundedCornerShape(28.dp),
)
