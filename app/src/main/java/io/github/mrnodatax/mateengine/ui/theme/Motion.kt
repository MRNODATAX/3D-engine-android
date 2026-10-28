package io.github.mrnodatax.mateengine.ui.theme

import androidx.compose.animation.core.FloatSpringSpec
import androidx.compose.animation.core.spring

/**
 * Gerak "Expressive Cyan 2.0": pegas, bukan durasi+easing.
 *
 * Alasan: Material 3 Expressive memakai sistem fisika (stiffness + damping) sebagai model gerak
 * utama — https://m3.material.io/styles/motion/overview/how-it-works. Dengan pegas, gerakan bisa
 * disela di tengah tanpa terlihat patah, dan "rasa" aplikasi konsisten di semua animasi.
 *
 * Batas produk tetap berlaku: maksimal **1–2 elemen bergerak per layar**, jadi pegas ini hanya
 * dipakai untuk perpindahan halaman dan umpan balik tekan tombol — bukan untuk semua hal.
 */
object MateMotion {
    /** Untuk momen utama (mis. perpindahan tab, kartu status muncul). */
    val expressive: FloatSpringSpec = spring(dampingRatio = 0.72f, stiffness = 380f)

    /** Untuk perubahan sehari-hari yang tidak perlu berlebihan. */
    val standard: FloatSpringSpec = spring(dampingRatio = 0.9f, stiffness = 700f)

    /** Untuk umpan balik tekan: cepat, hampir tanpa pantulan. */
    val snappy: FloatSpringSpec = spring(dampingRatio = 1f, stiffness = 900f)

    /** Durasi nominal pegas di atas (ms) untuk API yang hanya menerima durasi. */
    const val EXPRESSIVE_MILLIS = 420
    const val STANDARD_MILLIS = 260
    const val SNAPPY_MILLIS = 120

    /** Skala umpan balik tekan tombol utama (Material: 0,95–0,98). */
    const val PRESS_SCALE = 0.97f
}
