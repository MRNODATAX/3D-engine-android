package io.github.mrnodatax.mateengine.ui.theme

import android.app.Activity
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.material3.Shapes
import androidx.compose.material3.Typography
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.ExperimentalTextApi
import androidx.compose.ui.text.font.FontVariation
import androidx.compose.ui.text.font.FontWeight
import io.github.mrnodatax.mateengine.R
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
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
    background = Color(MateTokens.Background),
    onBackground = Color(MateTokens.OnSurface),
    surface = Color(MateTokens.Surface),
    onSurface = Color(MateTokens.OnSurface),
    surfaceVariant = Color(MateTokens.SurfaceContainerHigh),
    onSurfaceVariant = Color(MateTokens.OnSurfaceVariant),
    // Batas kartu harus terlihat: 2,18:1 → 3,25:1 (lihat MateTokens & DesignTokenTest).
    outline = Color(MateTokens.Outline),
    outlineVariant = Color(MateTokens.OutlineVariant),
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
    background = Color(MateTokens.BackgroundDark),
    onBackground = Color(MateTokens.OnSurfaceDark),
    surface = Color(MateTokens.SurfaceDark),
    onSurface = Color(MateTokens.OnSurfaceDark),
    surfaceVariant = Color(MateTokens.SurfaceContainerHighDark),
    onSurfaceVariant = Color(MateTokens.OnSurfaceVariantDark),
    outline = Color(MateTokens.OutlineDark),
    outlineVariant = Color(MateTokens.OutlineVariantDark),
    error = Color(0xFFF09086),
    onError = Color(0xFF3A1C18),
    errorContainer = Color(0xFF3A1C18),
    onErrorContainer = Color(0xFFFBD9D4),
)

val SuccessColor: Color @Composable get() = if (isSystemInDarkTheme()) Color(0xFF6CD39C) else Color(MateTokens.Success)
val SuccessContainer: Color @Composable get() = if (isSystemInDarkTheme()) Color(0xFF12301F) else Color(MateTokens.SuccessContainer)
val WarningColor: Color @Composable get() = if (isSystemInDarkTheme()) Color(0xFFE4B25C) else Color(MateTokens.Warning)
val WarningContainer: Color @Composable get() = if (isSystemInDarkTheme()) Color(0xFF33290F) else Color(MateTokens.WarningContainer)

@OptIn(ExperimentalTextApi::class)
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

/**
 * Tipografi merek: Outfit (variable font, lisensi OFL-1.1) untuk judul dan teks isi.
 * Berkas: `res/font/outfit.ttf` (110.884 B) + `docs/lisensi/OFL-Outfit.txt`.
 * Font sistem tetap dipakai sebagai fallback untuk karakter yang tidak ada di Outfit.
 */
@OptIn(ExperimentalTextApi::class)
private fun outfit(weight: Int) = Font(
    resId = R.font.outfit,
    weight = FontWeight(weight),
    // Berkas ini font VARIABEL dengan sumbu wght. Tanpa `variationSettings`, Android memakai
    // instance default berkas (terlalu tipis) sehingga teks tampak pucat. Setiap berat harus
    // dipatok eksplisit.
    variationSettings = FontVariation.Settings(FontVariation.weight(weight)),
)

private val Outfit = FontFamily(
    outfit(300),
    outfit(400),
    outfit(500),
    outfit(600),
    outfit(700),
)

private val BaseTypography = Typography()

private val MateTypography = Typography(
    displayLarge = BaseTypography.displayLarge.copy(fontFamily = Outfit),
    // Judul layar dipertegas + dirapatkan sedikit: Outfit SemiBold 28 sp dengan tracking −0,4
    // terbaca sebagai judul, bukan subjudul. Ukuran lain mengikuti skala M3.
    headlineMedium = BaseTypography.headlineMedium.copy(
        fontFamily = Outfit,
        fontWeight = FontWeight.SemiBold,
        letterSpacing = (-0.4).sp,
    ),
    displayMedium = BaseTypography.displayMedium.copy(fontFamily = Outfit),
    displaySmall = BaseTypography.displaySmall.copy(fontFamily = Outfit),
    headlineLarge = BaseTypography.headlineLarge.copy(fontFamily = Outfit),
    headlineSmall = BaseTypography.headlineSmall.copy(fontFamily = Outfit),
    titleLarge = BaseTypography.titleLarge.copy(fontFamily = Outfit, fontWeight = FontWeight.SemiBold),
    titleMedium = BaseTypography.titleMedium.copy(fontFamily = Outfit, fontWeight = FontWeight.SemiBold),
    titleSmall = BaseTypography.titleSmall.copy(fontFamily = Outfit),
    bodyLarge = BaseTypography.bodyLarge.copy(fontFamily = Outfit),
    bodyMedium = BaseTypography.bodyMedium.copy(fontFamily = Outfit),
    bodySmall = BaseTypography.bodySmall.copy(fontFamily = Outfit),
    // Label memakai Outfit juga, dengan berat tegas agar tetap terbaca di ukuran kecil.
    labelLarge = BaseTypography.labelLarge.copy(fontFamily = Outfit, fontWeight = FontWeight.Medium),
    labelMedium = BaseTypography.labelMedium.copy(fontFamily = Outfit, fontWeight = FontWeight.Medium),
    labelSmall = BaseTypography.labelSmall.copy(fontFamily = Outfit, fontWeight = FontWeight.Medium),
)

/** Nama merek untuk header & kartu Tentang. */
val BrandName = "Mate Engine"


/**
 * Skala bentuk dari satu sumber ([MateRadius]): kontrol kecil 12 dp, kartu 20 dp, panel 28 dp,
 * lembar 36 dp. Sebelumnya `large` 24 dp tidak pernah dipakai sehingga skalanya terasa acak.
 */
private val MateShapes = Shapes(
    extraSmall = RoundedCornerShape(MateRadius.SMALL.dp),
    small = RoundedCornerShape(MateRadius.MEDIUM.dp),
    medium = RoundedCornerShape(MateRadius.LARGE.dp),
    large = RoundedCornerShape(MateRadius.EXTRA_LARGE.dp),
    extraLarge = RoundedCornerShape(MateRadius.EXTRA_EXTRA_LARGE.dp),
)
