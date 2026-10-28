# Mate Engine untuk Android

Pendamping karakter VRM: pilih model `.vrm` milikmu, beri izin overlay, lalu jalankan avatar
transparan di atas aplikasi lain.

Ini **port Android yang sedang dibangun**, bukan tiruan tampilan. Acuan perilaku adalah
[Mate Engine desktop](https://github.com/shinyflvre/Mate-Engine/releases) (AGPL v3 & MateProv2).
Fitur yang belum dipindahkan tidak diklaim tersedia — lihat [kesetaraan fitur](docs/android-parity.md)
dan [catatan riset](docs/research/mate-engine-reference.md).

## Status saat ini

Sudah berjalan di kode dan diuji otomatis:

- impor `.vrm` lewat pemilih berkas sistem, disalin ke penyimpanan aplikasi;
- metadata model dibaca dari berkas (format, lisensi, jumlah humanoid bone, ekspresi);
- overlay transparan di atas aplikasi lain lewat foreground service, dengan drag, skala, opasitas,
  batas FPS, dan kunci posisi;
- render VRM 1.0/0.x (MToon, spring bone) serta pemutar animasi `.vrma` (putar/berhenti, loop, kecepatan);
- kedip dan napas prosedural saat tidak ada animasi;
- halaman Diagnosa yang membaca izin, pembatasan baterai, versi WebView, dan status service apa adanya;
- semua teks bahasa Indonesia, tema terang/gelap mengikuti sistem, tata letak adaptif
  (navigation bar di ponsel, navigation rail di jendela lebar);
- **chat waifu** memakai Gemini API key milikmu sendiri (kunci dienkripsi di Android Keystore),
  persona siap pakai yang bisa diedit, riwayat lokal, reaksi mulut avatar, TTS opsional;
- **gerak hidup**: 14 klip CC0 (idle, bicara, jalan, tari, melambai, duduk, tidur) + direktur
  perilaku yang memilih sendiri kapan melambai, melihat sekitar, menggeser berat badan, duduk di
  tepi layar, atau tertidur — dengan suasana yang berubah (ceria setelah disentuh, kalem saat lama
  diam). Ayunan badan saat avatar digeser, mata menutup saat kepala ditepuk;
- **menu cepat 3× ketuk**: ketuk avatar tiga kali untuk membuka panel berisi Gerak (klip bawaan),
  balon **Chat AI** langsung di atas aplikasi lain, tombol Duduk/Berdiri, dan pintasan Setelan;
- **ukuran avatar** 25–100% tinggi layar, bisa dicubit dua jari langsung di overlay;
- **suara waifu** lewat Gemini TTS (suara natural, mulut bergerak mengikuti amplitudo audio asli),
  dengan cadangan TTS perangkat;
- **optimasi performa**: batas FPS, resolusi render adaptif, downscale tekstur, statistik nyata
  (triangles/draw call/tulang), dan pemangkasan memori berkala.

Belum ada: duduk di jendela/taskbar (duduk baru di tepi layar), screenshot transparan, timer/alarm,
Workshop, food system, partikel headpat, head tracking, chibi, bloom/AO.

> Chat butuh koneksi internet dan kunci Gemini milikmu. Kunci tidak pernah dibundel di APK dan
> tidak dikirim ke server mana pun selain `generativelanguage.googleapis.com`.

Rincian provenance, lisensi aset, dan status verifikasi: [`docs/chat-dan-performa.md`](docs/chat-dan-performa.md).

> Aplikasi **tidak** membundel avatar bawaan Mate Engine. Model Yorshka berlisensi *All Rights
> Reserved* dan tidak boleh didistribusikan ulang.

## Tangkapan layar

[`docs/screenshots.html`](docs/screenshots.html) memuat tangkapan layar asli APK yang berjalan di
emulator Android 14 (diambil otomatis lewat `adb screencap` di CI, bukan mockup), termasuk panel
menu cepat yang dibuka dengan tiga ketukan sungguhan.

## Unduh dan pasang (build uji)

Hanya build uji terbaru yang disimpan; rilis versi lama sudah dihapus agar tidak ada yang
mengunduh APK dengan bug gerak.

Build uji terbaru: [Release `v0.1.7-test`](https://github.com/MRNODATAX/3D-engine-android/releases/tag/v0.1.7-test)
(`MateEngine-v0.1.7-test-debug.apk`, ditandatangani kunci debug). Rilis ini membawa **gerak hidup**:
direktur perilaku (avatar bergerak sendiri, suasana ceria/kalem), 14 klip CC0, duduk di tepi layar,
ayunan saat digeser, headpat, serta wajah baru — 5 tab, kontras batas kartu diperbaiki, logo dan
splash, font Outfit, serta **menu cepat 3× ketuk** untuk gerak, chat AI, dan duduk.

1. Unduh APK di perangkat, lalu izinkan pemasangan dari sumber tidak dikenal untuk aplikasi
   pengelola berkas/browser yang dipakai.
2. Buka **Mate Engine**, buka **Diagnosa**, periksa izin overlay, notifikasi, dan versi WebView.
3. **Avatar → Impor .vrm**, pilih model VRM milikmu (VRM 1.0 maupun 0.x).
4. Klip bawaan langsung jalan: avatar diam bergerak, klip bicara saat balasan chat, dan tombol
   **Perbaiki pose** di layar Animasi bila tangan terlihat terangkat.
4. **Beranda → Jalankan avatar**, izinkan "tampil di atas aplikasi lain", lalu tekan Home.
5. Bila avatar tidak muncul, salin **ringkasan diagnosa** dan lampirkan saat melapor.

Build debug memakai `applicationId` `io.github.mrnodatax.mateengine.debug`, sehingga tidak
menimpa build rilis bertanda tangan dan datanya terpisah. Karena masih debug, APK ini bukan
untuk distribusi luas.

Bukti pengujian otomatis dan daftar yang **belum** terverifikasi ada di
[docs/verification.md](docs/verification.md).

## Arsitektur

```
MainActivity (Compose Material 3)
  ├── AppRepository + VrmMetaReader        penyimpanan & metadata VRM
  └── OverlayService (foreground)
        ├── WindowManager TYPE_APPLICATION_OVERLAY  (transparan, draggable)
        └── WebView + WebViewAssetLoader
              └── renderer three.js + @pixiv/three-vrm   (WebGL, latar transparan)
```

- Renderer adalah bundel JavaScript di `app/src/main/assets/renderer/` yang dihasilkan dari `web/`.
- Berkas model dan animasi disajikan ke WebView lewat domain lokal `appassets.androidplatform.net`.
  WebView tidak pernah memuat halaman internet.
- Komunikasi renderer ↔ Android memakai `window.MateBridge.postMessage(json)` (satu arah) dan
  `window.MateEngine.*` untuk perintah.

## Prasyarat

- JDK 17
- Android SDK 34 (compileSdk 34, minSdk 26)
- Node.js 20 untuk membangun ulang renderer

## Membangun

Renderer (hanya bila `web/` diubah):

```bash
cd web
npm ci
npm run build          # menghasilkan app/src/main/assets/renderer/{renderer.js,index.html}
```

APK:

```bash
# Gradle 8.7, misalnya lewat gradle/actions/setup-gradle atau Gradle lokal
gradle :app:assembleDebug
```

Bila ingin menyertakan model uji berlisensi redistribusi (10,8 MB, tidak disimpan di Git):

```bash
bash scripts/fetch-test-vrm.sh app/src/main/assets/testmodels
```

## Pengujian

```bash
gradle :app:testDebugUnitTest          # metaloader VRM, geometri overlay, tap 3× & kontras token
cd web && npm run test:render          # render headless: VRM asli, transparansi, animasi
```

Uji render membutuhkan Chromium: `npx playwright install chromium`.

## CI dan distribusi

`.github/workflows/android.yml`:

1. `renderer` — `npm ci`, ambil fixture, build bundel, uji render Chromium, unggah artefak.
2. `android` — uji unit JVM, `assembleDebug`, `assembleRelease`, unggah APK.
3. `release` — hanya untuk tag `v*`: menandatangani APK dan membuat GitHub Release.

Rilis normal diterbitkan saat tag `v*` di-push. Bila push tag tidak memicu workflow (pernah
terjadi), `release/tag.txt` yang berisi versi baru akan memicu job rilis yang sama; berkas itu
diabaikan bila rilis dengan versi tersebut sudah ada, jadi aman dibiarkan di repo.

Penandatanganan rilis memerlukan secret repo berikut (tidak pernah disimpan di Git):

| Secret | Isi |
| --- | --- |
| `ANDROID_KEYSTORE_BASE64` | keystore `.jks` yang di-`base64` |
| `ANDROID_KEYSTORE_PASSWORD` | password keystore |
| `ANDROID_KEY_ALIAS` | alias kunci |
| `ANDROID_KEY_PASSWORD` | password kunci |

Tanpa secret tersebut, CI hanya menghasilkan APK debug dan APK release *unsigned*.
Karena sandbox pengembangan tidak memiliki Android SDK maupun perangkat, APK dibangun di CI;
pemasangan dan verifikasi perilaku di HP dilakukan oleh pemilik perangkat.

## Batasan yang harus diketahui

- Overlay Android selalu berbentuk persegi; sentuhan pada piksel transparan tetap ditangkap overlay.
- Beberapa ROM (HyperOS, ColorOS, Funtouch, One UI) membatasi overlay atau service latar. Halaman
  Diagnosa menunjukkan kondisi sebenarnya dan jalan menuju setelan terkait.
- Renderer berjalan di WebView; performa bergantung pada WebView dan GPU perangkat. Resolusi render
  turun otomatis saat frame terlalu lambat, lalu naik lagi ketika lega.
- Chat Gemini butuh kunci dari Google AI Studio. Bila kuota habis atau kunci salah, aplikasi
  menampilkan pesan server apa adanya, bukan jawaban palsu.
- Suara bawaan adalah nada sintetis buatan sendiri. Klip suara dan voice pack Mate Engine
  (termasuk pack Miku) **tidak** disertakan karena lisensinya melarang redistribusi.

## Lisensi dan kredit

- Kode port ini mengikuti ketentuan proyek asal; Mate Engine desktop berlisensi AGPL v3 &
  MateProv2. Nama dan identitas produk mengacu pada Mate Engine karya `shinyflvre`.
- Pola perilaku yang diport dari Mate Engine (bukan berkasnya): VoicePack berbasis event,
  batas FPS, pemangkasan memori, statistik model, dan penyimpanan prompt persona.
- `three` (MIT), `@pixiv/three-vrm` (MIT), VRM 1.0 specification (VRM Consortium).
- Model uji: `VRM1_Constraint_Twist_Sample` © pixiv Inc., lisensi VRM 1.0 dengan
  `allowRedistribution: true`; hanya dipakai sebagai fixture pengujian, bukan avatar produk.
