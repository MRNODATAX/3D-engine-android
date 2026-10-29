# Rencana finalisasi v1.0.0 — Mate Engine Android

Status dokumen: **rencana yang diajukan**, belum dieksekusi.
Disusun 29 Oktober 2026, setelah rilis `v0.1.13-test` (perbaikan jendela siluet + geser).

Dokumen ini menjawab satu pertanyaan: **apa lagi yang harus dibuktikan sebelum aplikasi ini boleh
disebut "selesai" (v1.0.0) dan dipasang orang lain tanpa ditemani penjelasan?**

---

## 0. Definisi "selesai" untuk v1.0.0

v1.0.0 dianggap jadi bila **lima syarat** ini terpenuhi, semuanya dengan bukti yang bisa dicek
ulang (bukan klaim):

| # | Syarat | Bukti yang harus ada |
| --- | --- | --- |
| 1 | Bisa dipasang di Android 8–16 tanpa crash saat pertama dibuka | CI memasang APK di emulator API 26 **dan** API 36, aplikasi terbuka, overlay muncul |
| 2 | Memenuhi syarat Play (bila kita memilih jalur Play) | `targetSdk 36`, AAB ter-sign, deklarasi izin & FGS, kebijakan privasi tertaut |
| 3 | Semua yang diklaim di README benar-benar ada di APK itu | tabel kesetaraan fitur diperbarui + tangkapan layar dari APK yang sama |
| 4 | Gangguan yang sudah dilaporkan tidak kembali | uji regresi untuk siluet, geser sampai tepi, gerak-mandiri, dan stabilitas |
| 5 | Pengguna bisa memulihkan diri saat ada masalah | Diagnosa menampilkan penyebab + tombol "Pulihkan renderer" dan "Setel ulang posisi" yang benar-benar bekerja |

Sampai kelima syarat itu ada buktinya, versi tetap berlabel **uji** (`-test`), sesuai kebijakan
rilis yang sudah dipakai sampai sekarang.

---

## 1. Audit jujur: posisi proyek hari ini

### 1.1 Yang sudah terbukti (dengan angka dari CI)

| Area | Bukti terukur | Sumber |
| --- | --- | --- |
| Overlay transparan + siluet | Jendela mengikuti tubuh, `n=7 terkecil=61% median=74% terbesar=100% -> pengurangan luas median 26%` | run Screenshots `40822524661` |
| Avatar utuh (bukan hanya kaki) | `06`, `19`, `20b` menampilkan rambut→sepatu; `debug-gpu` menunjukkan buffer 577×1098 dengan quad penuh terisi | `docs/siluet-overlay.md` |
| Geser sampai tepi | `geser selesai: jendela 526x1919 di (41, 0) dari layar 1080x2400` — tepi kiri & atas tercapai | diagnostik emulator |
| Cameras/gerak | `bodyGap` atas 70 px / bawah 72 px; 29 klip `vrma`; `armLeftDeg` median 33–40° saat diam | run Screenshots |
| Uji otomatis | 80 `@Test` Kotlin (4 kelas) + 8 berkas uji JS (termasuk render Chromium) | `app/src/test`, `web/test` |
| Rilis | APK debug 17,2 MB, rilis terbaru `v0.1.13-test` | GitHub Releases |

### 1.2 Yang **belum** terbukti / masih terbuka

| Celah | Kenapa penting | Status |
| --- | --- | --- |
| `targetSdk` masih **34**, AGP 8.5.2, Gradle 8.7 | Play menolak unggahan baru sejak 31 Agustus 2026 (perpanjangan habis **1 November 2026**) | **blocker** |
| Belum diuji di Android 15/16 | edge-to-edge dipaksa, perilaku overlay/inset bisa berbeda | **blocker** |
| APK rilis masih **tanda tangan debug** | tidak bisa dipasang sebagai pembaruan resmi; Play menolak | **blocker** |
| Belum ada AAB (`bundleRelease`) | Play memakai `.aab`, bukan `.apk` | **blocker** |
| Deklarasi izin & FGS `specialUse` belum disiapkan | Play meminta deskripsi + skenario + **video demo** per tipe FGS | **blocker** (jalur Play) |
| Tidak ada kebijakan privasi | aplikasi memakai API key Gemini milik pengguna, meski disimpan terenkripsi | **blocker** (jalur Play) |
| `docs/android-parity.md` masih versi 0.1.0 | README menautkannya; isinya sudah salah (mis. "AI chat: belum ada") | tinggi |
| `docs/verification.md` masih run `40064663684` | semua bukti baru tidak tercatat | tinggi |
| Galeri `docs/screenshots.html` belum memuat `19`, `20`, `20b` | bukti visual perbaikan terbaru tidak tampil | sedang |
| T7 dari rencana v0.1.10: bagian "Sentuhan & Reaksi" di Pengaturan | 15 gaya hanya bisa dipicu dari overlay, tidak bisa dicoba dari aplikasi | sedang |
| T6: rotasi belum diuji otomatis | kelas bug yang pernah terjadi (posisi keluar layar) | sedang |
| WebView mati / renderer crash | belum ada pemulihan otomatis (`onRenderProcessGone`) | sedang |
| Performa di perangkat nyata | emulator memakai GL perangkat lunak (2–7 fps), angka FPS belum mewakili HP | sedang |
| Alarm/timer, screenshot transparan, jalan otomatis | fitur desktop yang belum ada; belum diklaim, jadi bukan blocker | rendah |

---

## 2. Referensi internet dan apa yang mengubah rencana ini

| # | Sumber | Yang saya ambil |
| --- | --- | --- |
| R1 | [Target API level Play 2026](https://primetestlab.com/blog/google-play-target-api-level-2026) · [versi ringkas](https://dev.to/dainyjose/google-play-requires-android-16-api-level-36-by-august-31-2026-react-native-migration-guide-1d51) | Sejak **31 Agu 2026** unggahan baru/update harus `targetSdk 36`; perpanjangan berakhir **1 Nov 2026**; aplikasi lama minimal API 35 agar tetap ditemukan. → F1 jadi P0 dan mendesak (hari ini 29 Okt). |
| R2 | [Behavior changes Android 16 (API 36)](https://developer.android.com/about/versions/16/behavior-changes-16) | Opt-out edge-to-edge **dimatikan**; batasan orientasi/rasio **diabaikan** di layar lebar. → F2 harus memverifikasi tata letak lebar & insets, bukan menambah opt-out. |
| R3 | [About AGP — versi minimum](https://developer.android.com/build/releases/about-agp) · [pengalaman migrasi API 36](https://dev.to/mr_w_9b5b6145a065f4e5605/migrating-10-android-apps-to-target-api-36-in-one-weekend-a8l) | `compileSdk 36` butuh **AGP 8.9+**, AGP 8.9 butuh **Gradle 8.11.1+**, JDK 17. AGP 8.9 menandai `resourceConfigurations` usang → pindah ke `androidResources.localeFilters`. |
| R4 | [FGS & deklarasi Play](https://support.google.com/googleplay/android-developer/answer/13392821) | Untuk `FOREGROUND_SERVICE_SPECIAL_USE` kita harus menyiapkan: deskripsi fungsi, dampak bila ditunda/dihentikan, **tautan video demo**, dan pemilihan use case di App content. → F4 punya deliverable non-kode (video). |
| R5 | [Mate Engine X3.2 / rilis terbaru](https://github.com/shinyflvre/Mate-Engine/releases) · [Steam news](https://steamcommunity.com/app/3625270/allnews/) | Yang perlu dipertimbangkan untuk paritas: **jalan otomatis saat idle**, **timer sampai 24 jam 59 menit**, **avatar acak saat mulai**, perbaikan "avatar bisa diseret keluar tepi". Tiga yang pertama masuk daftar opsional; yang terakhir sudah kita perbaiki di v0.1.13. |
| R6 | [SYSTEM_ALERT_WINDOW: special app access](https://support.google.com/googleplay/android-developer/answer/13392821) (konteks izin) | Izin overlay adalah *special app access*, bukan runtime permission: alur harus menjelaskan tujuan **sebelum** membuka Setelan, dan aplikasi harus tetap berguna bila izin ditolak. → F4 menambah uji "izin ditolak". |
| R7 | [16 KB page size — konsekuensi Play](https://dev.to/keel_alican_akyol/google-plays-api-36-extension-ends-nov-1-heres-what-actually-changes-in-a-react-native-app-414m) | Hanya berdampak pada pustaka native. Proyek ini murni Kotlin + WebView, jadi cukup **dibuktikan** tidak ada `.so` di APK, bukan diubah. |
| R8 | [Catatan rilis Mate Engine: headpat butuh gerakan memutar/bolak-balik](https://steamcommunity.com/app/3625270/allnews/) | Perilaku headpat kita (ketuk/elus) perlu diuji agar tidak bertabrakan dengan gestur geser setelah ambang geser di badan diturunkan ke ~22 dp. → masuk F5 (uji regresi sentuh). |

Catatan kejujuran: R1–R3 menentukan **tanggal dan versi alat**; R4/R6 menentukan **berkas yang harus
disiapkan**; R5 hanya memengaruhi daftar fitur opsional. Tidak ada angka kurva/aset dari Mate Engine
yang disalin — batas legal yang sudah dipegang tetap sama.

---

## 3. Peta celah → tahap

Prioritas: **P0** = menghalangi v1.0.0 dirilis; **P1** = kualitas yang akan dikeluhkan pengguna;
**P2** = paritas fitur, boleh menyusul setelah v1.0.0.

| Tahap | Prioritas | Isi singkat | Alasan |
| --- | --- | --- | --- |
| F1 | P0 | Naikkan toolchain ke API 36 | R1–R3; tenggat 1 Nov 2026 |
| F2 | P0 | Verifikasi edge-to-edge, layar lebar, predictive back di API 36 | R2 |
| F3 | P0 | Matriks uji perangkat: API 26, 34, 36 (emulator CI) | R1, R2 |
| F4 | P0 | Kesiapan Play: AAB, tanda tangan, deklarasi izin/FGS, privasi | R4, R6 |
| F5 | P1 | Regresi sentuh & gestur (headpat vs geser, tekan-lama, area kosong) | R8 |
| F6 | P1 | Ketahanan: renderer mati, WebView crash, layanan dibunuh sistem, pemulihan | keluhan "glitch" berulang |
| F7 | P1 | Ruang gerak performa: anggaran frame, laporan di Diagnosa, uji kelancaran | emulator ≠ HP |
| F8 | P1 | T7 pengaturan "Sentuhan & Reaksi" + coba tiap gaya | T7 tertunda sejak v0.1.10 |
| F9 | P1 | T6 rotasi otomatis + tangkapan 4 sudut | T6 tertunda |
| F10 | P0 | Dokumen & bukti: parity, verification, galeri, README, CHANGELOG, checklist | syarat #3 dan #5 di §0 |

---

## 4. Rincian tahap

### F1 — Toolchain API 36 (P0)

Langkah:

1. `gradle-wrapper.properties`: Gradle **8.11.1** (atau 8.12).
2. `build.gradle.kts` akar: AGP **8.9.1**, Kotlin tetap 1.9.24 (cukup; dinaikkan hanya bila AGP
   menolak, karena Compose compiler 1.5.14 terikat ke Kotlin 1.9).
3. `app/build.gradle.kts`: `compileSdk = 36`, `targetSdk = 36`, `buildToolsVersion` bawaan AGP.
4. Migrasi `resourceConfigurations += listOf("id","en")` → `androidResources { localeFilters += ... }`.
5. CI: pasang SDK platform 36 (`sdkmanager`), tambahkan langkah `aapt2 dump badging` yang
   menegaskan `targetSdkVersion:'36'`.

Kriteria terima:

- `CI hijau` (Renderer, APK, Screenshots).
- `aapt2 dump badging app-debug.apk` menampilkan `targetSdkVersion:'36'` dan `sdkVersion:'26'`.
- Tidak ada `.so` di dalam APK (`unzip -l ... | grep -c '\.so$'` = 0) → bukti R7 tidak berlaku.
- Peringatan AGP tentang SDK yang belum diuji = 0.

Risiko utama: Compose 1.6/BOM 2024.06 dengan compileSdk 36 biasanya aman, tetapi `activity-compose`
1.9.0 perlu dinaikkan ke 1.10.x bila `enableEdgeToEdge` berperilaku berbeda di API 36.

### F2 — Edge-to-edge, layar lebar, predictive back (P0)

- Audit tiap layar: sudahkah memakai `WindowInsets.safeDrawing` (kini hanya `MainActivity` yang
  memakainya di level Scaffold; cek lima layar tidak menambah padding ganda).
- Uji dua ukuran: 1080×2400 (potret) dan 2400×1080 (lanskap), plus emulator tablet 1600×2560
  (lebar ≥ 600 dp) untuk memastikan `NavigationRail` yang dipakai, bukan bottom bar.
- Predictive back: `BackHandler` di layar Chat/Animasi harus tetap berfungsi; uji dengan
  `adb shell input keyevent KEYCODE_BACK` dan `adb shell cmd gesture` bila tersedia.

Kriteria terima: tangkapan `25-lebar-tablet` dan `26-lanskap-overlay`; tidak ada teks terpotong
status bar (ukur piksel: baris teratas konten ≥ tinggi status bar); tombol kembali menutup layar
detail, bukan aplikasi.

### F3 — Matriks perangkat (P0)

Tambahkan job kedua di `screenshots.yml` (atau workflow `device-matrix.yml`) yang menjalankan
emulator **API 26** dan **API 36** dengan langkah minimal: pasang, buka, aktifkan overlay,
tunggu `avatar-ready`, ambil tangkapan, cek `dumpsys window` hanya satu jendela avatar.

Kriteria terima: tiga baris (26 / 34 / 36) hijau di ringkasan CI. API 26 penting karena `minSdk 26`
dan `specialUse` FGS baru ada di 34 (jalur cadangan harus tetap jalan).

### F4 — Kesiapan Play (P0, hanya bila kamu memilih jalur Play)

Deliverable:

1. `signing`: keystore rilis di secret CI (`ANDROID_KEYSTORE_BASE64` + 4 variabel yang sudah dibaca
   `app/build.gradle.kts`), lalu `bundleRelease` + `apkRelease`.
2. `docs/privasi.md` → kebijakan privasi ringkas: data apa yang **tidak** dikirim (avatar, klip,
   riwayat chat tersimpan lokal), API key Gemini disimpan terenkripsi AES-GCM di Android Keystore,
   tidak ada analitik/pelacakan; tautan ke halaman ini dipakai di Play Console dan di layar
   Pengaturan.
3. Deklarasi FGS `specialUse`: teks deskripsi + dampak bila sistem menunda/menghentikan + **video
   demo 30–60 detik** (rekam dari emulator: aktifkan overlay → kembali ke launcher → avatar tetap
   tampil → hentikan dari notifikasi).
4. Data safety: "tidak mengumpulkan data" + penjelasan bahwa pesan chat dikirim ke Gemini atas
   permintaan pengguna dengan key miliknya.
5. `versionCode 100`, `versionName "1.0.0"`, tag `v1.0.0`.

Kriteria terima: `bundletool validate`/`aapt2 dump badging` pada AAB; APK rilis bisa dipasang
menimpa `-test` (applicationId sama, versi lebih tinggi) tanpa kehilangan avatar tersimpan.

### F5 — Regresi sentuh & gestur (P1)

Uji baru di `web/test/touch.test.mjs` dan emulator:

| Skenario | Harapan | Alat |
| --- | --- | --- |
| Elus kepala bolak-balik | headpat terpicu, avatar **tidak** bergeser | uji JS + logcat `gestur UP … menyeret=false` |
| Geser dari badan 30 dp | avatar bergeser (ambang 22 dp) | logcat `menyeret=true` |
| Geser dari pinggir jendela | avatar bergeser walau jari tidak di bodi | logcat |
| Ketuk area kosong di dalam jendela | **tidak** menembus ke aplikasi bawah (blokir tetap) | `uiautomator dump` sebelum/sesudah |
| Tiga ketuk | menu cepat terbuka | logcat `menu cepat dibuka` |

Kriteria terima: 5/5 lulus, dan tangkapan `27-blokir-area-kosong` memperlihatkan aplikasi Setelan
di belakang tidak berubah setelah ketukan di luar tubuh.

### F6 — Ketahanan & pemulihan (P1)

- `WebViewClient.onRenderProcessGone`: buat ulang WebView, muat ulang renderer, catat di Diagnosa
  ("renderer dipulihkan 1×").
- `OverlayService` mendeteksi `webView` mati/kosong (tidak ada pesan 10 detik padahal layar aktif)
  → tawarkan pemulihan otomatis sekali, lalu berhenti mencoba (agar tidak loop).
- Uji: `adb shell am kill io.github.mrnodatax.mateengine.debug` lalu buka aplikasi; dan
  `adb shell am force-stop` pada proses renderer WebView; avatar kembali dalam ≤ 8 detik.

Kriteria terima: dua skenario pulih tanpa membuka aplikasi dari awal; Diagnosa menampilkan jumlah
pemulihan.

### F7 — Anggaran performa (P1)

- Ukur `workMs` median dan p95 dari `stats` pada tiga kondisi: diam, berjalan, tari.
- Tambah uji `smoothness.test.mjs`: tidak ada frame > 3× median berturut-turut (micro-stutter),
  dan `renderScale` tidak turun di bawah 0,75 pada beban diam.
- Tampilkan di Diagnosa: `workMs` median, jumlah penurunan kualitas, dan saran konkret
  ("turunkan skala ke 60%") — bukan janji.

Kriteria terima: angka median/p95 tercatat di `docs/chat-dan-performa.md` dengan tanggal & perangkat.

### F8 — Pengaturan "Sentuhan & Reaksi" (P1, T7)

- Bagian baru di dalam tab Pengaturan yang sudah ada (tanpa tab ke-6): daftar 15 gaya, tiap baris
  menampilkan ekspresi + durasi + tombol ▶ yang memicu gaya itu di overlay lewat intent yang sudah
  ada (`ACTION_PLAY_BUILTIN`/reaction), plus sakelar "suara reaksi".
- Uji Compose: 15 baris tampil, tombol mengirim aksi yang benar (fake service/receiver).

Kriteria terima: tangkapan `28-pengaturan-reaksi`; 15 gaya bisa dicoba tanpa menutup Pengaturan.

### F9 — Rotasi otomatis (P1, T6)

- Skrip CI: `user_rotation 0 → 1 → 0`, di tiap langkah ambil `dumpsys` posisi jendela + tangkapan.
- Asersi: posisi jendela selalu di dalam layar (toleransi 2 px), ukuran jendela berubah mengikuti
  `windowSize()`, `bodyGap` tetap ≥ 12 px.

Kriteria terima: tangkapan `29-rotasi-lanskap` + `30-rotasi-kembali`; log 20 rotasi tanpa
pelanggaran (loop di skrip CI).

### F10 — Dokumen & bukti (P0)

- `docs/android-parity.md`: tulis ulang untuk 1.0.0 (chat, reaksi, menu cepat, overlay siluet,
  jalan otomatis = belum ada, alarm = belum ada).
- `docs/verification.md`: ganti tabel run lama dengan 5 run terakhir + metrik §5.
- `docs/screenshots.html`: tambah `19`, `20`, `20b`, `27`–`30`; tiap gambar menyebut run ID.
- `README.md`: status versi, syarat izin, tautan privasi, "cara menghentikan overlay".
- `CHANGELOG.md` (baru): ringkas 0.1.0 → 1.0.0.

Kriteria terima: setiap klaim di README punya tautan bukti; tidak ada angka lama yang tertinggal
(`grep -rn "0\.1\.0\b" docs README.md` = hanya di riwayat).

---

## 5. Rencana re-check: metrik dan ambangnya

Setiap tahap ditutup dengan tabel ini terisi **angka nyata**, bukan centang.

| Metrik | Alat | Ambang lulus | Disimpan di |
| --- | --- | --- | --- |
| `targetSdk` | `aapt2 dump badging` | 36 | log CI + `verification.md` |
| Jumlah pustaka native | `unzip -l \| grep '\.so$'` | 0 | log CI |
| Jendela overlay | `dumpsys window windows \| grep -c "MateEngine avatar"` | 1 | `diagnostik-emulator.txt` |
| Tubuh utuh | `bodyGap.top ≥ 12`, `bodyGap.bottom ≥ 12` | lulus di semua klip uji | `motion-state` |
| Geser ke tepi | jarak ke tepi terdekat | ≤ 48 px | `geser selesai …` |
| Penghematan area sentuhan | median persen desain | ≤ 80% (pengurangan ≥ 20%) | diagnostik |
| Waktu siap | `am start` → `avatar-ready` | ≤ 25 dtk di emulator, ≤ 6 dtk di HP | logcat |
| Stabilitas 10 menit | tidak ada crash/ANR | 0 | logcat |
| Pemulihan renderer | `am kill` → avatar kembali | ≤ 8 dtk | logcat |
| Ukuran rilis | `ls -l` AAB/APK | APK ≤ 20 MB | CI |
| Kelancaran | `workMs` p95 / median | ≤ 2,5× | `stats` |

Laporan akhir v1.0.0 = tabel di atas terisi + tautan run ID, dengan kolom "lulus/gagal apa adanya".

---

## 6. Urutan kerja dan perkiraan waktu

| Urutan | Tahap | Perkiraan | Catatan |
| --- | --- | --- | --- |
| 1 | F1 toolchain | 1 hari | paling rawan; semua CI harus hijau sebelum lanjut |
| 2 | F2 + F9 (rotasi & lebar) | 1 hari | satu skrip CI, dua tangkapan |
| 3 | F3 matriks perangkat | 1 hari | menambah waktu CI ±10 menit/run |
| 4 | F6 + F5 | 1–2 hari | uji regresi sentuh paling penting untuk keluhan berulang |
| 5 | F7 + F8 | 1–2 hari | F8 menyentuh UI, butuh 1 iterasi desain |
| 6 | F4 kesiapan Play | 1–2 hari | termasuk merekam video demo FGS |
| 7 | F10 dokumen | 0,5 hari | dilakukan **setelah** semua angka terkumpul |
| 8 | Rilis `v1.0.0` | 0,5 hari | `versionCode 100`, AAB + APK, catatan rilis |

Total realistis: **7–9 hari kerja** dengan ritme verifikasi lewat CI (tiap putaran Screenshots
±12 menit).

---

## 7. Risiko & mitigasi

| Risiko | Kemungkinan | Dampak | Mitigasi |
| --- | --- | --- | --- |
| AGP 8.9 bentrok dengan Kotlin 1.9.24 / Compose compiler 1.5.14 | sedang | build merah berhari-hari | naikkan Kotlin+Compose bersama (Kotlin 2.0 + Compose plugin) **hanya jika** gagal; siapkan PR terpisah |
| Edge-to-edge menggeser tata letak di API 36 | tinggi | tampilan rusak | uji F2 mendahului F4; tangkapan sebelum/sesudah |
| Emulator API 36 tidak stabil di runner (KVM/GL) | sedang | CI lambat/merah palsu | batasi uji perangkat ke langkah minimal; kegagalan emulator dibedakan dari kegagalan kode |
| Play menolak `specialUse` karena dianggap bukan inti | sedang | rilis Play tertunda | siapkan video demo + deskripsi; rencana B: distribusi GitHub (sideload) dengan label uji |
| Keystore rilis hilang | rendah | tidak bisa memperbarui aplikasi | simpan keystore + kata sandi di tempat aman pengguna, **jangan** di repo |
| Regresi siluet kembali | rendah | keluhan utama terulang | uji `bodyGap` dan `debug-gpu` sudah ada; tambahkan `potongan jendela` ke asersi CI |

---

## 8. Yang **tidak** dikerjakan di v1.0.0

Supaya batasnya jelas (dan tidak ada klaim berlebih):

- Duduk di jendela aplikasi lain / taskbar: butuh `AccessibilityService` atau `MediaProjection`,
  keduanya menambah izin sensitif.
- Screenshot transparan, sistem makanan, timer/alarm, avatar acak saat mulai, jalan otomatis
  (fitur Mate Engine X3.2 yang belum ada di sisi Android) — masuk daftar "setelah 1.0".
- Pelacakan wajah/kamera, bloom/AO, multi-avatar.
- Dukungan bahasa selain Indonesia/Inggris.
- Click-through per piksel (Android tidak menyediakannya untuk `TYPE_APPLICATION_OVERLAY`); yang
  kita pakai tetap **jendela mengikuti siluet**.

---

## 9. Keputusan yang perlu kamu ambil sebelum saya mulai F4

1. **Jalur distribusi:** Play Store, atau tetap GitHub Releases (sideload) dengan label uji?
   Play menambah 2–3 hari untuk deklarasi + video + privasi.
2. **Fitur sebelum 1.0:** apakah timer/alarm dan "jalan otomatis saat idle" (dua fitur Mate Engine
   X3.2 yang paling terasa) harus masuk v1.0.0, atau setelahnya?
3. **Nama & versi rilis:** `1.0.0` sekarang, atau tetap `0.x` sampai semua keluhan pengguna awal
   selesai?
4. **Batas bahasa:** Indonesia saja (sekarang id+en tersedia di resource) — cukup?

Bila kamu tidak memilih apa pun, saya mengambil default yang paling aman:
**sideload GitHub + label uji**, tanpa fitur baru sebelum stabilitas, versi **1.0.0**, bahasa id/en.

---

## 10. Mulai dari mana (usulan konkret)

Kalau disetujui, urutan kerja saya pada putaran berikutnya:

1. F1: PR kecil "chore(build): API 36" → tunggu CI hijau → baru sentuh hal lain.
2. F2/F9: tambah langkah rotasi + tangkapan tablet di `capture-screenshots.sh`.
3. F5/F6: uji regresi sentuh & pemulihan renderer.
4. F7/F8: angka performa + layar pengaturan reaksi.
5. F4/F10: kesiapan rilis & dokumen.

Tiap tahap ditutup dengan: **angka**, **status lulus/gagal apa adanya**, dan **tautan run CI** —
sama seperti yang sudah kita lakukan untuk perbaikan siluet.
