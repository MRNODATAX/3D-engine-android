package io.github.mrnodatax.mateengine.ui

import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * Aturan navigasi: bilah bawah maksimal lima tujuan (`ui-ux-pro-max`, kategori Navigation).
 * Diagnosa tetap ada sebagai halaman, tetapi tidak memakai tab sendiri.
 */
class NavigationTest {

    @Test
    fun `bilah bawah maksimal lima tujuan`() {
        assertTrue(
            "bilah bawah punya ${Screen.bottomBar.size} tujuan",
            Screen.bottomBar.size <= 5,
        )
        assertTrue("bilah bawah terlalu sedikit", Screen.bottomBar.size >= 4)
    }

    @Test
    fun `diagnosa tidak memakai tab sendiri tetapi tetap bisa dibuka`() {
        assertTrue("Diagnosa seharusnya tidak ada di bilah bawah", Screen.Diagnostics !in Screen.bottomBar)
        assertEquals(Screen.Diagnostics, Screen.fromName("diagnostics"))
        assertEquals(Screen.Diagnostics, Screen.fromName("DIAGNOSTICS"))
    }

    @Test
    fun `setiap tujuan punya ikon Material Symbols sendiri`() {
        val icons = mutableSetOf<Int>()
        for (screen in Screen.entries) {
            assertTrue("${screen.name} tidak punya ikon", screen.icon != 0)
            assertTrue(
                "${screen.name} memakai ikon yang sama dengan tujuan lain",
                icons.add(screen.icon),
            )
        }
    }

    @Test
    fun `label navigasi tidak kosong dan tidak terlalu panjang`() {
        for (screen in Screen.bottomBar) {
            assertTrue("${screen.name} tidak punya label", screen.navLabel.isNotBlank())
            assertTrue(
                "label ${screen.navLabel} terlalu panjang untuk bilah bawah",
                screen.navLabel.length <= 12,
            )
        }
    }

    @Test
    fun `nama tak dikenal tidak menghasilkan tujuan`() {
        assertNull(Screen.fromName("bukan-halaman"))
        assertNull(Screen.fromName(null))
    }
}
