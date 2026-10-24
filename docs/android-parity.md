# Kesetaraan fitur: Mate Engine desktop → Android

Status per 24 Oktober 2026, aplikasi versi 0.1.0.

Arti label:

- **Diport** — perilaku sudah diimplementasikan di Android dan dapat diuji.
- **Diport sebagian** — inti perilaku ada, tetapi cakupannya lebih sempit daripada desktop.
- **Belum ada** — belum diimplementasikan. Tidak diklaim tersedia.
- **Tidak berlaku** — konsep desktop tidak punya padanan di Android.

| Fitur desktop | Status Android | Keterangan |
| --- | --- | --- |
| Avatar VRM kustom | **Diport** | Impor `.vrm` lewat pemilih sistem; berkas disalin ke penyimpanan aplikasi; metadata dibaca dari berkas |
| Avatar transparan di atas aplikasi lain | **Diport** | `TYPE_APPLICATION_OVERLAY`, `PixelFormat.TRANSLUCENT`, latar WebView transparan |
| Always on top | **Diport (bawaan)** | Overlay Android selalu di atas; tidak ada tombol mati karena tidak diizinkan sistem |
| Drag avatar | **Diport** | Geser window, dijepit ke tepi layar, posisi disimpan |
| Skala avatar | **Diport** | Slider 25–100% + hitung ukuran window |
| Opasitas avatar | **Diport** | Slider 30–100% (alpha window) |
| Batas FPS | **Diport** | 15/30/45/60 |
| FPS terukur | **Diport** | Angka berasal dari renderer, ditampilkan setelah benar-benar ada |
| Idle animation | **Diport sebagian** | Napas + kedip prosedural, bukan set animasi idle desktop |
| Dance/animation player | **Diport sebagian** | Impor `.vrma`, putar/berhenti, loop, kecepatan. Belum ada audio/musik dan shuffle berbasis waktu |
| Shuffle | **Diport sebagian** | Tersimpan sebagai opsi; pemilihan acak otomatis belum dijalankan renderer |
| Window/taskbar sitting | **Belum ada** | Android tidak memiliki taskbar; duduk di jendela aplikasi lain butuh deteksi inset per aplikasi |
| Screenshot transparan | **Belum ada** | Butuh pipeline capture terpisah dari renderer |
| Alarm/timer | **Belum ada** | — |
| AI chat | **Belum ada** | — |
| Steam Workshop / mod | **Tidak berlaku** | Tidak ada Steam di Android; impor berkas manual sebagai gantinya |
| Food system (alpha) | **Belum ada** | — |
| Screen saver | **Belum ada** | — |
| Touch regions (headpat) | **Belum ada** | Sentuhan saat ini dipakai untuk menggeser overlay |
| Head/eye/spine tracking | **Belum ada** | — |
| Chibi mode, bloom/AO, MSAA | **Belum ada** | Kualitas render baru sebatas pixel ratio |
| System tray | **Diport sebagian** | Notifikasi foreground dengan aksi Hentikan dan Putar animasi |
| Start with system | **Belum ada** | — |
| Multi monitor | **Tidak berlaku** | — |
| Big screen mode | **Belum ada** | Tata letak lebar (rail) sudah ada |

## Perbedaan arsitektur yang perlu diketahui

1. **Renderer** memakai WebView + WebGL (`three` 0.179.1, `@pixiv/three-vrm` 3.5.5), bukan OpenGL
   native. Konsekuensinya: pemuatan model dan MToon/spring bone mengikuti perilaku pustaka web,
   dan performa bergantung pada WebView perangkat. Ini pilihan sadar agar port bisa dibangun,
   diuji, dan diverifikasi tanpa toolchain engine desktop.
2. **Overlay berbentuk persegi.** Android tidak menyediakan click-through per piksel untuk
   `TYPE_APPLICATION_OVERLAY`. Mode "Kunci posisi" membuat window `FLAG_NOT_TOUCHABLE` sehingga
   sentuhan diteruskan ke aplikasi di bawah, dengan konsekuensi avatar tidak bisa digeser.
3. **Service bisa dihentikan sistem** bila pengguna tidak mengecualikan optimasi baterai. Aplikasi
   menampilkan kondisi sebenarnya di halaman Diagnosa, bukan menjanjikan perbaikan otomatis.

## Cara status di atas diverifikasi

| Lapisan | Alat | Cakupan |
| --- | --- | --- |
| Pembaca metadata VRM | `VrmMetaReaderTest` (JVM) | GLB sintetis VRM 1.0/0.x, berkas negatif, berkas model uji asli |
| Geometri overlay | `OverlayGeometryTest` (JVM) | Penjepitan posisi, ukuran window, penempatan awal |
| Renderer VRM | `web/test/render-smoke.mjs` (Chromium headless, CI) | VRM asli termuat, bone terdeteksi, piksel avatar muncul, latar transparan, `.vrma` menggerakkan bone |
| APK | CI `assembleDebug` / `assembleRelease` | Kompilasi, uji unit, artefak APK |
| Perilaku di perangkat | **belum terverifikasi** | Butuh pemasangan di HP; lihat bagian diagnosa |
