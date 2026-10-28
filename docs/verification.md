# Catatan verifikasi

Semua bukti di bawah berasal dari eksekusi CI yang benar-benar berjalan di repositori ini.
Log mentah Actions tidak dapat diunduh dari lingkungan pengembangan, jadi hasil dibaca dari
status job, langkah job, anotasi check-run, dan artefak yang dipublikasikan.

> **Kebijakan rilis:** hanya build uji **terbaru** yang disimpan di halaman Releases. Rilis
> `v0.1.0-test`, `v0.1.2-test`, `v0.1.3-test`, dan `v0.1.4-test` sudah dihapus (beserta APK-nya)
> agar pengguna tidak salah mengunduh versi lama yang masih punya bug gerak. Catatan di bawah
> tetap dipertahankan sebagai riwayat apa yang pernah diverifikasi; tautan ke rilis lama akan
> menampilkan 404 karena rilisnya memang sengaja dihapus, bukan karena verifikasinya tidak terjadi.

## Eksekusi terakhir (commit `661878f` dan turunannya)

| Run | Isi | Hasil |
| --- | --- | --- |
| [40064663684](https://github.com/MRNODATAX/3D-engine-android/actions/runs/40064663684) | Build pertama | Renderer **sukses**; APK gagal (error kompilasi UI) |
| [40064843967](https://github.com/MRNODATAX/3D-engine-android/actions/runs/40064843967) | Setelah perbaikan `dp`/snackbar | Renderer sukses; APK gagal (`addFlags`) |
| [40065081899](https://github.com/MRNODATAX/3D-engine-android/actions/runs/40065081899) | Sebelum perbaikan service | Renderer sukses; APK gagal (kompilasi overlay) |
| [40065384232](https://github.com/MRNODATAX/3D-engine-android/actions/runs/40065384232) | **Build hijau pertama** | Renderer sukses, uji unit + `assembleDebug` + `assembleRelease` sukses |
| [40065951187](https://github.com/MRNODATAX/3D-engine-android/actions/runs/40065951187) | Tag `v0.1.0-test` | Semua job sukses; GitHub Release + APK terbit |

Artefak run hijau: `apk-661878f…` (24,2 MB, debug + release unsigned) dan
`test-reports-661878f…`.

## Apa yang dibuktikan

**Renderer (`web/test/render-smoke.mjs`, Chromium headless di CI) — lulus**

1. bundel `renderer.js` dapat dijalankan tanpa error konsol;
2. berkas VRM asli (`vrm1-twist-sample.vrm`, 10,8 MB) dimuat lewat `@pixiv/three-vrm`;
3. humanoid bone terdeteksi dari model, sehingga scene benar-benar berisi avatar;
4. raster kanvas memuat ribuan piksel avatar **dan** sebagian besar area tetap transparan
   (uji gagal bila latar tidak transparan);
5. berkas `.vrma` menghasilkan klip berdurasi > 0 dan diputar pada avatar.

**Android (Gradle di CI)**

- `:app:testDebugUnitTest` lulus: pembaca metadata VRM (GLB sintetis VRM 1.0/0.x, berkas
  negatif, model uji asli) dan geometri overlay (penjepitan, ukuran, penempatan).
- `:app:assembleDebug` dan `:app:assembleRelease` menghasilkan APK.

## Bukti tambahan: APK dijalankan di emulator

Workflow `Screenshots` memasang APK debug ke emulator Android 14 (Pixel 6, x86_64) dan mengambil
tangkapan layar lewat `adb exec-out screencap`. Hasilnya tersimpan di `docs/screenshots/` dan
dirangkum di `docs/screenshots.html`.

Temuan nyata dari putaran ini, dan perbaikannya:

| Temuan | Perbaikan |
| --- | --- |
| Indikator navigasi dan chip masih ungu bawaan Material | Warna item navigasi dan `FilterChip` diatur ke aksen cyan |
| Baris Diagnosa terhimpit sehingga teks menjadi satu kata per baris | `DiagnosticRow`: teks selebar penuh, tombol aksi di bawah |
| Nama model panjang pecah di tengah kata | `maxLines = 1` + elipsis pada `ListRow` |
| Overlay tidak muncul karena `adb am start-foreground-service` ditolak (service tidak exported) | Hook debug `start_overlay` di aplikasi sendiri |
| Avatar tetap T-pose (model tanpa animasi, dan klip `.vrma` hanya menganimasikan sebagian bone) | `applyRelaxedPose()` sebagai lapisan dasar tiap frame |
| Perintah ganti layar tidak berpengaruh karena `singleTask` | `onNewIntent` + `DebugNavigation` |
| Unduhan fixture gagal karena batas laju API GitHub | Token dikirim pada langkah unduh + pesan galat eksplisit |
| Pose rileks terakumulasi tiap frame sehingga lengan terangkat | Rotasi absolut terhadap pose istirahat + uji regresi `debugPose()` |
| Transisi pose berbasis frame berhenti di tengah karena WebView di-throttle | Pose diterapkan penuh saat model dimuat |
| Tombol "Muat ulang"/"Putar" masih lavender bawaan Material | `filledTonalButtonColors` dengan `surfaceVariant`/`primaryContainer` |
| Overlay tidak muncul pada beberapa putaran CI | Skrip kini memverifikasi service lewat `dumpsys`, memakai tap `uiautomator` dengan cadangan terhitung, dan menyimpan `diagnostik-emulator.txt` |

Bukti status layanan: pada `docs/screenshots/07-beranda-saat-overlay.png` dan
`08-diagnosa-berjalan.png`, kartu status menampilkan "Sedang tampil", "Renderer siap", dan FPS
terukur — nilai tersebut hanya dapat muncul bila renderer benar-benar berjalan dan mengirim
laporan lewat jembatan JavaScript.

### Status akhir putaran ini

- `Android build` hijau pada commit terakhir: uji unit, `assembleDebug`, `assembleRelease`.
- Uji render Chromium: VRM asli termuat, latar transparan, pose stabil (offset lengan tidak
  berubah setelah 5 detik), `.vrma` terputar.
- `Screenshots` di emulator: 10 gambar, termasuk overlay di atas launcher dan status
  "Sedang tampil · Renderer siap · 8–9 fps" dari renderer sungguhan.
- APK saat itu: `MateEngine-v0.1.2-test-debug.apk` (16,1 MB, tanda tangan debug). Rilis ini sudah
  dihapus; APK yang tersedia sekarang hanya `v0.1.5-test`.
- Log perangkat menyimpan bukti `avatar-loading` → `avatar-ready` untuk
  `sample-vrm1-twist.vrm` dan laporan `fps` berkala.

## Apa yang belum dibuktikan

Tidak ada perangkat Android fisik maupun emulator pada lingkungan pengembangan, jadi hal berikut
**belum terverifikasi** dan tidak diklaim berfungsi:

- pemasangan APK dan perilaku izin overlay pada ROM tertentu (HyperOS/ColorOS/One UI/Funtouch);
- apakah jendela overlay benar-benar transparan di compositor perangkat (bukan hanya di browser);
- stabilitas service saat layar mati, saat Recent Apps dibersihkan, dan saat hemat baterai aktif;
- performa (FPS nyata) untuk model 10–25 MB pada GPU ponsel (emulator memakai SwiftShader,
  sehingga angka FPS pada tangkapan layar rendah dan tidak mewakili perangkat);
- interaksi drag/geser dan penyimpanan posisi setelah rotasi layar.

## Checklist uji di perangkat (untuk pemilik perangkat)

1. Pasang APK dari Release, izinkan "instal dari sumber tidak dikenal".
2. Buka aplikasi, halaman Diagnosa: pastikan izin overlay, notifikasi, dan versi WebView terbaca.
3. Impor `.vrm` (disarankan model 10–20 MB), pastikan metadata (format, lisensi, bone) terisi.
4. Tekan "Jalankan avatar", beri izin overlay, lalu tekan Home: avatar harus tampil di atas
   launcher tanpa kotak latar.
5. Geser avatar, ubah skala/opasitas dari aplikasi, dan cek perubahan langsung di overlay.
6. Impor `.vrma`, putar, lalu uji berhenti, loop, dan kecepatan.
7. Kunci posisi: sentuhan harus diteruskan ke aplikasi di bawah.
8. Biarkan layar mati 5 menit: catat apakah service bertahan; laporkan bersama ringkasan Diagnosa.


## Putaran chat + performa

| Temuan | Perbaikan | Bukti |
| --- | --- | --- |
| Tab keenam memotong label navigasi ("Diagnos a", "Pengatur an") | `maxLines = 1`, `labelSmall`, label bilah "Setelan" | `docs/screenshots/11-chat.png` |
| Dialog "Pixel Launcher isn't responding" menutupi Diagnosa | `dismiss_dialogs()` menekan "Wait"/"Tunggu" sebelum screencap | `docs/screenshots/04-diagnosa.png` |
| Opsi suara/model tidak terjangkau di layar sempit | dialog "Opsi chat" + ikon opsi di kartu | `11-chat.png` |
| Build gagal: `Icons.AutoMirrored.Filled.Chat` dan `ChipTone.Positive` tidak ada | ikon dari `material-icons-core`, nada `ChipTone.Success` | run `40104797845` |

Status verifikasi fitur baru ada di [`chat-dan-performa.md`](chat-dan-performa.md): chat dengan kunci
asli dan TTS perangkat **belum** diuji, karena CI tidak memiliki kunci Gemini maupun mesin TTS
bahasa Indonesia.
