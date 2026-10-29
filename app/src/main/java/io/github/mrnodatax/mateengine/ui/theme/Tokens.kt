package io.github.mrnodatax.mateengine.ui.theme

import kotlin.math.abs
import kotlin.math.max
import kotlin.math.min
import kotlin.math.pow

/**
 * Token warna "Expressive Cyan" sebagai nilai ARGB.
 *
 * Kenapa dipisah dari [Theme.kt]: warna di sini bisa diuji tanpa Android (uji unit JVM), sehingga
 * kontras teks dan batas kartu bisa dijaga otomatis. Sebelumnya `outline` terang hanya 2,18:1 —
 * garis kartu nyaris tidak terlihat di atas latar #F4FBFA.
 */
object MateTokens {
    const val BrandPrimary = 0xFF006A66
    const val BrandPrimaryLight = 0xFF6FE0D8

    const val Background = 0xFFF4FBFA
    const val Surface = 0xFFFFFFFF
    const val OnSurface = 0xFF0B1B1A
    const val OnSurfaceVariant = 0xFF4F615E

    /** Batas kontrol & kartu. Dinaikkan dari 0xFF9FB4B1 (2,18:1) ke 3,25:1. */
    const val Outline = 0xFF7A9490
    const val OutlineVariant = 0xFFDCE9E7

    const val BackgroundDark = 0xFF0E1113
    const val SurfaceDark = 0xFF171C1F
    const val OnSurfaceDark = 0xFFE8EDEF
    const val OnSurfaceVariantDark = 0xFF9AA7AD

    /** Batas kartu tema gelap. Dinaikkan dari 0xFF2B3338 (1,34:1) ke 3,13:1. */
    const val OutlineDark = 0xFF5A6C72
    const val OutlineVariantDark = 0xFF3A464C

    // --- dipakai menu cepat overlay (View biasa, di luar MaterialTheme) ---
    const val PrimaryContainer = 0xFF9FF2EA
    const val OnPrimaryContainer = 0xFF00423F
    const val PrimaryContainerDark = 0xFF114A46
    const val OnPrimaryContainerDark = 0xFFC9FBF5
    const val AccentInk = 0xFFEAFFFD
    const val AccentInkDark = 0xFF00312E
    const val Bubble = 0xFFE7F2F0
    const val BubbleDark = 0xFF1F262A
    const val ErrorDark = 0xFFF09086

    const val Success = 0xFF1F7A4D
    const val SuccessContainer = 0xFFE6F4EC
    const val Warning = 0xFF8A5A00
    const val WarningContainer = 0xFFFBF1DC
    const val Error = 0xFFA5352B
    const val ErrorContainer = 0xFFFBEAE8

    /** Permukaan tambahan (M3 Expressive): dipakai kartu & lembar agar hierarki terlihat. */
    const val SurfaceContainerLow = 0xFFEFF7F6
    const val SurfaceContainerHigh = 0xFFE4F0EE
    const val SurfaceContainerLowDark = 0xFF141A1D
    const val SurfaceContainerHighDark = 0xFF222A2E

    /** Ambang WCAG: 4,5:1 untuk teks normal, 3:1 untuk batas komponen antarmuka. */
    const val MIN_TEXT_CONTRAST = 4.5
    const val MIN_BORDER_CONTRAST = 3.0
}

/**
 * Skala radius "Expressive Cyan 2.0" (dp).
 *
 * Mengikuti skala Material 3 Expressive yang menambah dua langkah di atas `large`, tetapi
 * dipersempit menjadi lima langkah supaya tidak ada sudut yang "hampir sama":
 * kontrol di dalam kartu 12, kartu 20, panel 28, lembar 36, dan pil penuh memakai [FULL].
 * Diuji `DesignTokenTest` agar tetap naik monoton dan tetap di rentang 8–36 dp (ACC desain).
 */
object MateRadius {
    const val SMALL = 8
    const val MEDIUM = 12
    const val LARGE = 20
    const val EXTRA_LARGE = 28
    const val EXTRA_EXTRA_LARGE = 36

    /** Nilai untuk pil/lingkaran: `RoundedCornerShape(50)` (persen), bukan dp. */
    const val FULL_PERCENT = 50

    /** Selisih radius anak di dalam induk = padding induk (aturan M3 Expressive). */
    fun innerRadius(outer: Int, padding: Int): Int = (outer - padding).coerceAtLeast(SMALL)
}

/** Ekstrak kanal RGB 0..1 dari nilai ARGB. */
private fun channels(argb: Long): Triple<Double, Double, Double> {
    val r = ((argb shr 16) and 0xFF) / 255.0
    val g = ((argb shr 8) and 0xFF) / 255.0
    val b = (argb and 0xFF) / 255.0
    fun linear(c: Double): Double = if (c <= 0.04045) c / 12.92 else ((c + 0.055) / 1.055).pow(2.4)
    return Triple(linear(r), linear(g), linear(b))
}

/** Luminans relatif menurut WCAG 2.1. */
fun relativeLuminance(argb: Long): Double {
    val (r, g, b) = channels(argb)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** Rasio kontras antara dua warna ARGB (1..21). */
fun contrastRatio(foreground: Long, background: Long): Double {
    val a = relativeLuminance(foreground)
    val b = relativeLuminance(background)
    val lighter = max(a, b)
    val darker = min(a, b)
    return (lighter + 0.05) / (darker + 0.05)
}

/** Pembulatan dua desimal yang tidak bergantung pada Locale (untuk pesan uji). */
fun formatRatio(value: Double): String {
    val rounded = (value * 100).toInt() / 100.0
    return if (abs(rounded - rounded.toLong()) < 1e-9) "${rounded.toLong()}:1" else "$rounded:1"
}
