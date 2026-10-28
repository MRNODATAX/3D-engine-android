package io.github.mrnodatax.mateengine.overlay

/** Perhitungan murni posisi overlay supaya bisa diuji tanpa perangkat. */
object OverlayGeometry {

    data class Placement(val x: Int, val y: Int)

    /**
     * Menjaga window overlay tetap cukup terlihat, tetapi **tidak lagi mengurungnya** di dalam layar.
     *
     * Dulu posisi dijepit ketat (`0 .. screen - window`). Akibatnya avatar di skala 100% — yang
     * jendelanya setinggi layar — tidak bisa digeser sama sekali; terasa seperti "tertahan bingkai".
     * Sekarang jendela boleh keluar tepi layar sampai hanya [minVisible] bagiannya yang tersisa,
     * sehingga avatar bisa diletakkan di mana pun di layar (pojok, tepi, tengah) dan tetap bisa
     * diambil kembali.
     *
     * @param x posisi kiri window (piksel, relatif gravitasi TOP|START)
     * @param y posisi atas window
     * @param minVisible bagian window yang harus tetap terlihat (0..1)
     */
    fun clamp(
        x: Int,
        y: Int,
        width: Int,
        height: Int,
        screenWidth: Int,
        screenHeight: Int,
        minVisible: Float = MIN_VISIBLE,
    ): Placement {
        val fraction = minVisible.coerceIn(0.3f, 1f)
        val keepX = (minOf(width, screenWidth) * fraction).toInt().coerceAtLeast(1)
        val keepY = (minOf(height, screenHeight) * fraction).toInt().coerceAtLeast(1)
        return Placement(
            x.coerceIn(-(width - keepX), screenWidth - keepX),
            y.coerceIn(-(height - keepY), screenHeight - keepY),
        )
    }

    /**
     * Ukuran window overlay.
     *
     * `scalePercent` berarti **persentase tinggi layar** yang ingin ditempati avatar, bukan lebar.
     * Sebelumnya satu nilai dipakai dua kali (lebar jendela *dan* skala model), sehingga menggeser
     * slider ke 50% menghasilkan avatar ~25% dan terasa "tidak berubah".
     */
    fun windowSize(screenWidth: Int, screenHeight: Int, scalePercent: Int, density: Float): Pair<Int, Int> {
        // 96dp: masih nyaman disentuh, tetapi tidak lagi memaksa avatar besar saat slider di 25%.
        val minWidth = (96 * density).toInt()
        val percent = scalePercent.coerceIn(MIN_SCALE, MAX_SCALE) / 100f
        val targetHeight = (screenHeight * percent).toInt()
        var width = (targetHeight / ASPECT).toInt()
            .coerceAtMost(screenWidth)
            .coerceAtLeast(minWidth.coerceAtMost(screenWidth))
        var height = (width * ASPECT).toInt()
        if (height > screenHeight) {
            height = screenHeight
            width = (height / ASPECT).toInt()
        }
        return width to height
    }

    /** Skala hasil cubit dua jari; dipakai agar pinch dan slider memakai rumus yang sama. */
    fun scaleFromPinch(startPercent: Int, pinchFactor: Float): Int {
        if (!pinchFactor.isFinite() || pinchFactor <= 0f) return startPercent.coerceIn(MIN_SCALE, MAX_SCALE)
        val scaled = startPercent * pinchFactor
        return scaled.toInt().coerceIn(MIN_SCALE, MAX_SCALE)
    }

    const val MIN_SCALE = 25
    const val MAX_SCALE = 100

    /** Bagian jendela overlay yang wajib tetap terlihat saat avatar digeser ke tepi. */
    const val MIN_VISIBLE = 0.62f

    /** Rasio tinggi:lebar kotak avatar (potret berdiri). */
    private const val ASPECT = 1.9f

    fun defaultPlacement(width: Int, height: Int, screenWidth: Int, screenHeight: Int, density: Float): Placement {
        val margin = (12 * density).toInt()
        return clamp(screenWidth - width - margin, screenHeight - height - margin, width, height, screenWidth, screenHeight)
    }
    // ---------------------------------------------------------------- bingkai (v0.1.10)
    //
    // Sebelum v0.1.10 posisi avatar dijepit dengan `clamp()` di atas, yang membolehkan 38 %
    // jendela keluar layar. Itu membuat avatar bisa menempel — bahkan menembus — tepi layar.
    // Sejak v0.1.10 avatar memakai bingkai: kotak aman di dalam inset sistem (status bar,
    // navigasi, poni) + margin. Semua di bawah ini fungsi murni, diuji di OverlayGeometryTest.

    /** Inset sistem dalam piksel (status bar, navigasi, poni). */
    data class Insets(val left: Int, val top: Int, val right: Int, val bottom: Int) {
        val isZero: Boolean get() = left == 0 && top == 0 && right == 0 && bottom == 0
    }

    /** Kotak tempat avatar boleh berada, dalam koordinat layar. */
    data class Frame(val left: Int, val top: Int, val right: Int, val bottom: Int) {
        val width: Int get() = (right - left).coerceAtLeast(1)
        val height: Int get() = (bottom - top).coerceAtLeast(1)
    }

    /**
     * Bingkai = layar dikurangi inset sistem dan margin.
     * Hasilnya tidak pernah lebih kecil dari [minSize] supaya avatar tetap bisa ditaruh.
     */
    fun frame(screenWidth: Int, screenHeight: Int, insets: Insets, marginPx: Int, minSize: Int = 120): Frame {
        val left = (insets.left + marginPx).coerceAtLeast(0)
        val top = (insets.top + marginPx).coerceAtLeast(0)
        val right = (screenWidth - insets.right - marginPx).coerceAtLeast(left + minSize)
        val bottom = (screenHeight - insets.bottom - marginPx).coerceAtLeast(top + minSize)
        return Frame(left, top, right, bottom)
    }

    /**
     * Jepit jendela agar seluruhnya berada di dalam bingkai.
     *
     * Bila jendela lebih besar dari bingkai (mis. skala 100 % di layar pendek), jendela
     * diratakan dengan tepi bingkai — bukan dibiarkan meluber keluar layar.
     */
    fun clampToFrame(x: Int, y: Int, width: Int, height: Int, frame: Frame): Placement {
        val maxX = (frame.right - width).coerceAtLeast(frame.left)
        val maxY = (frame.bottom - height).coerceAtLeast(frame.top)
        return Placement(x.coerceIn(frame.left, maxX), y.coerceIn(frame.top, maxY))
    }

    /**
     * Posisi saat jari sedang menggeser: di luar bingkai gerakan diredam (karet), tetapi tetap
     * ada batas keras [maxOverPx] supaya jendela tidak "kabur" jauh dari jari.
     */
    fun dragPlacement(
        rawX: Int,
        rawY: Int,
        width: Int,
        height: Int,
        frame: Frame,
        resistance: Float = 0.28f,
        maxOverPx: Int = 56,
    ): Placement {
        fun damp(raw: Int, limitMax: Int, limitMin: Int): Int {
            if (raw > limitMax) {
                val over = (raw - limitMax) * resistance
                return limitMax + minOf(over, maxOverPx.toFloat()).toInt()
            }
            if (raw < limitMin) {
                val over = (limitMin - raw) * resistance
                return limitMin - minOf(over, maxOverPx.toFloat()).toInt()
            }
            return raw
        }
        val maxX = (frame.right - width).coerceAtLeast(frame.left)
        val maxY = (frame.bottom - height).coerceAtLeast(frame.top)
        return Placement(damp(rawX, maxX, frame.left), damp(rawY, maxY, frame.top))
    }

    /** Kotak tubuh hasil pembacaan tulang, dalam piksel kanvas. */
    data class BodyBox(val left: Int, val top: Int, val right: Int, val bottom: Int) {
        val width: Int get() = (right - left).coerceAtLeast(1)
        val height: Int get() = (bottom - top).coerceAtLeast(1)
    }

    /** Persegi dalam koordinat layar. */
    data class Rect(val left: Int, val top: Int, val right: Int, val bottom: Int) {
        val width: Int get() = (right - left).coerceAtLeast(1)
        val height: Int get() = (bottom - top).coerceAtLeast(1)
        val area: Long get() = width.toLong() * height.toLong()
    }

    /**
     * Jendela yang benar-benar terlihat: irisan antara jendela desain dan kotak tubuh + [edgePx].
     *
     * Inilah yang memperkecil area kosong yang menelan sentuhan. Penting: kanvas WebView **tidak**
     * ikut mengecil — ia digambar pada ukuran desain lalu digeser dengan margin negatif, sehingga
     * avatar tidak berubah ukuran di layar (lihat `OverlayService.applySilhouette`).
     *
     * @param box kotak tubuh; `null` berarti pengukuran belum tersedia → pakai jendela desain penuh
     *            (perilaku lama, aman: tidak pernah ada jendela yang salah tempat).
     */
    fun visibleRect(
        designX: Int,
        designY: Int,
        designWidth: Int,
        designHeight: Int,
        box: BodyBox?,
        edgePx: Int,
        minSizePx: Int,
        frame: Frame,
        maxCropRatio: Float = MAX_CROP_RATIO,
    ): Rect {
        val design = Rect(designX, designY, designX + designWidth, designY + designHeight)
        // Pengukuran yang tidak masuk akal lebih berbahaya daripada tidak ada pengukuran:
        // kotak setinggi < 30 % kanvas berarti renderer melaporkan satuan/kanvas yang berbeda,
        // dan memakainya akan memotong badan (pernah terjadi: avatar hanya tampak sebatas kaki).
        val plausible = box != null && box.height >= designHeight * 0.3f && box.width >= designWidth * 0.12f
        if (!plausible || box == null) {
            // Tanpa pengukuran tubuh: jendela desain dipotong bingkai saja.
            return Rect(
                design.left.coerceAtLeast(frame.left),
                design.top.coerceAtLeast(frame.top),
                design.right.coerceAtMost(frame.right),
                design.bottom.coerceAtMost(frame.bottom),
            )
        }
        var left = designX + box.left - edgePx
        var top = designY + box.top - edgePx
        var right = designX + box.right + edgePx
        var bottom = designY + box.bottom + edgePx
        // Jangan pernah lebih besar dari jendela desain, dan jangan sampai lebih kecil dari
        // ukuran sentuh minimum (96 dp) — jendela mini yang tidak bisa disentuh lebih buruk
        // daripada jendela besar yang menelan sentuhan.
        left = left.coerceAtLeast(design.left)
        top = top.coerceAtLeast(design.top)
        right = right.coerceAtMost(design.right)
        bottom = bottom.coerceAtMost(design.bottom)
        // Batas pemotongan per sisi: apa pun hasil pengukurannya, jendela tidak boleh menyisakan
        // kurang dari ~44 % dimensi desain, supaya badan tidak pernah terpotong separuh.
        val cropCapX = (designWidth * maxCropRatio).toInt()
        val cropCapY = (designHeight * maxCropRatio).toInt()
        left = left.coerceAtMost(design.left + cropCapX)
        top = top.coerceAtMost(design.top + cropCapY)
        right = right.coerceAtLeast(design.right - cropCapX)
        bottom = bottom.coerceAtLeast(design.bottom - cropCapY)
        val cx = (left + right) / 2
        val cy = (top + bottom) / 2
        if (right - left < minSizePx) {
            left = (cx - minSizePx / 2).coerceAtLeast(design.left)
            right = (left + minSizePx).coerceAtMost(design.right)
        }
        if (bottom - top < minSizePx) {
            top = (cy - minSizePx / 2).coerceAtLeast(design.top)
            bottom = (top + minSizePx).coerceAtMost(design.bottom)
        }
        return Rect(left, top, right, bottom)
    }

    /**
     * Penghalusan kotak tubuh (rata-rata bergerak eksponensial).
     *
     * Tanpa ini, setiap kali bingkai kamera atau klip berubah, jendela ikut melompat — di
     * emulator tercatat berubah 58 % → 51 % → 67 % → 80 % → 28 % dalam tiga detik. Nilai
     * `alpha` kecil = lebih halus tetapi lebih lambat mengikuti.
     */
    fun smoothBox(previous: BodyBox?, next: BodyBox, alpha: Float = 0.2f): BodyBox {
        if (previous == null) return next
        val a = alpha.coerceIn(0.05f, 1f)
        fun blend(old: Int, new: Int) = (old + (new - old) * a).toInt()
        return BodyBox(
            left = blend(previous.left, next.left),
            top = blend(previous.top, next.top),
            right = blend(previous.right, next.right),
            bottom = blend(previous.bottom, next.bottom),
        )
    }

    /**
     * Histeresis: terapkan ukuran baru hanya bila berubah lebih dari [tolerancePx] pada salah
     * satu sisi. Perubahan 1–2 px tidak boleh memicu `updateViewLayout` — itu membuat jendela
     * bergetar mengikuti napas avatar dan membuang baterai.
     */
    fun shouldResize(previous: Rect?, next: Rect, tolerancePx: Int): Boolean {
        if (previous == null) return true
        val tolerance = tolerancePx.coerceAtLeast(1)
        return kotlin.math.abs(previous.left - next.left) > tolerance ||
            kotlin.math.abs(previous.top - next.top) > tolerance ||
            kotlin.math.abs(previous.right - next.right) > tolerance ||
            kotlin.math.abs(previous.bottom - next.bottom) > tolerance
    }

    /**
     * Batas maksimum pemotongan per sisi. 0,28 berarti jendela tidak pernah lebih pendek dari
     * 44 % tinggi desain, sekalipun pengukuran tubuh kacau.
     */
    const val MAX_CROP_RATIO = 0.28f

    /** Bagian jendela desain yang menelan sentuhan, 0..1. Dipakai untuk mengukur pengurangan. */
    fun blockedFraction(designWidth: Int, designHeight: Int, visible: Rect): Float {
        val total = designWidth.toLong() * designHeight
        if (total <= 0) return 1f
        return (visible.area.toFloat() / total).coerceIn(0f, 1f)
    }

}
