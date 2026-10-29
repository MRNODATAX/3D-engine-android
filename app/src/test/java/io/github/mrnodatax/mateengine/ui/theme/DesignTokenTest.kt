package io.github.mrnodatax.mateengine.ui.theme

import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * Uji kontras token warna nyata yang dipakai aplikasi (bukan angka karangan).
 *
 * Aturan yang dipakai (WCAG 2.1 AA + panduan komponen UI):
 *  - teks normal minimal 4,5:1;
 *  - batas komponen antarmuka (garis kartu, tombol outline) minimal 3:1.
 *
 * Uji ini menangkap regresi seperti `outline` lama #9FB4B1 yang hanya 2,18:1 sehingga garis kartu
 * nyaris tidak terlihat di atas latar terang.
 */
class DesignTokenTest {

    private val textPairs = listOf(
        "onSurface / surface" to (MateTokens.OnSurface to MateTokens.Surface),
        "onSurface / background" to (MateTokens.OnSurface to MateTokens.Background),
        "onSurfaceVariant / surface" to (MateTokens.OnSurfaceVariant to MateTokens.Surface),
        "onSurfaceVariant / background" to (MateTokens.OnSurfaceVariant to MateTokens.Background),
        "primary / background" to (MateTokens.BrandPrimary to MateTokens.Background),
        "success / successContainer" to (MateTokens.Success to MateTokens.SuccessContainer),
        "warning / warningContainer" to (MateTokens.Warning to MateTokens.WarningContainer),
        "error / errorContainer" to (MateTokens.Error to MateTokens.ErrorContainer),
        "dark onSurface / dark surface" to (MateTokens.OnSurfaceDark to MateTokens.SurfaceDark),
        "dark onSurfaceVariant / dark surface" to (MateTokens.OnSurfaceVariantDark to MateTokens.SurfaceDark),
        "dark primary / dark background" to (MateTokens.BrandPrimaryLight to MateTokens.BackgroundDark),
        // Permukaan baru v0.1.9: kartu di atas permukaan lebih tinggi harus tetap terbaca.
        "onSurfaceVariant / surfaceContainerLow" to (MateTokens.OnSurfaceVariant to MateTokens.SurfaceContainerLow),
        "onSurfaceVariant / surfaceContainerHigh" to (MateTokens.OnSurfaceVariant to MateTokens.SurfaceContainerHigh),
        "dark onSurfaceVariant / dark containerLow" to (MateTokens.OnSurfaceVariantDark to MateTokens.SurfaceContainerLowDark),
        "dark onSurfaceVariant / dark containerHigh" to (MateTokens.OnSurfaceVariantDark to MateTokens.SurfaceContainerHighDark),
    )

    private val borderPairs = listOf(
        "outline / surface" to (MateTokens.Outline to MateTokens.Surface),
        "outline / background" to (MateTokens.Outline to MateTokens.Background),
        "dark outline / dark surface" to (MateTokens.OutlineDark to MateTokens.SurfaceDark),
    )

    @Test
    fun `teks memenuhi kontras AA`() {
        val failures = mutableListOf<String>()
        for ((name, pair) in textPairs) {
            val ratio = contrastRatio(pair.first, pair.second)
            if (ratio < MateTokens.MIN_TEXT_CONTRAST) {
                failures += "$name = ${formatRatio(ratio)} (< ${MateTokens.MIN_TEXT_CONTRAST}:1)"
            }
        }
        assertTrue(failures.joinToString("; "), failures.isEmpty())
    }

    @Test
    fun `batas kartu terlihat minimal 3 banding 1`() {
        val failures = mutableListOf<String>()
        for ((name, pair) in borderPairs) {
            val ratio = contrastRatio(pair.first, pair.second)
            if (ratio < MateTokens.MIN_BORDER_CONTRAST) {
                failures += "$name = ${formatRatio(ratio)} (< ${MateTokens.MIN_BORDER_CONTRAST}:1)"
            }
        }
        assertTrue(failures.joinToString("; "), failures.isEmpty())
    }

    @Test
    fun `warna batas lama memang gagal`() {
        // Bukti bahwa uji ini benar-benar menangkap masalah: nilai lama 0xFF9FB4B1 hanya 2,18:1.
        val oldBorder = contrastRatio(0xFF9FB4B1, MateTokens.Surface)
        assertTrue("nilai lama seharusnya di bawah ambang", oldBorder < MateTokens.MIN_BORDER_CONTRAST)
        val improved = contrastRatio(MateTokens.Outline, MateTokens.Surface)
        assertTrue("nilai baru harus lebih baik dari nilai lama", improved > oldBorder)
    }
}

/**
 * Skala bentuk "Expressive Cyan 2.0": radius harus naik monoton, tetap di rentang 8–36 dp
 * (ACC desain), dan radius anak di dalam induk tidak boleh lebih besar dari induknya.
 */
class RadiusTokenTest {

    private val scale = listOf(
        MateRadius.SMALL,
        MateRadius.MEDIUM,
        MateRadius.LARGE,
        MateRadius.EXTRA_LARGE,
        MateRadius.EXTRA_EXTRA_LARGE,
    )

    @Test
    fun `skala radius naik monoton`() {
        for (i in 1 until scale.size) {
            assertTrue(
                "radius ke-$i (${scale[i]}) harus lebih besar dari ${scale[i - 1]}",
                scale[i] > scale[i - 1],
            )
        }
    }

    @Test
    fun `radius tetap di rentang 8 sampai 36 dp`() {
        assertTrue("radius terkecil ${scale.first()}", scale.first() == 8)
        assertTrue("radius terbesar ${scale.last()}", scale.last() == 36)
        for (value in scale) {
            assertTrue("radius $value di luar 8..36 dp", value in 8..36)
        }
    }

    @Test
    fun `radius anak tidak melebihi induk`() {
        // Kartu 20 dp dengan padding 8 dp -> kontrol dalam 12 dp.
        assertTrue(MateRadius.innerRadius(MateRadius.LARGE, 8) == MateRadius.MEDIUM)
        // Padding lebih besar dari radius tidak boleh membuat radius negatif.
        assertTrue(MateRadius.innerRadius(MateRadius.LARGE, 40) == MateRadius.SMALL)
    }
}
