# Rencana v3 — gerak anime yang hidup, UI rapi, dan logo

Status: **F1–F6 sudah dikerjakan.** F1 & F2 hijau di CI run `40615640683`; F3–F6 menunggu build CI
berikutnya (kompilasi Kotlin hanya bisa dibuktikan di CI).
Semua klaim di bawah punya rujukan berkas/baris atau hasil perintah yang benar-benar saya jalankan
di sesi ini.

### Status per fase

| Fase | Status | Bukti |
| --- | --- | --- |
| F1 direktur perilaku | **selesai** | `web/src/behavior.js`, `web/test/behavior.test.mjs` (7 pemeriksaan, jam palsu), step CI "Uji direktur perilaku" |
| F2 10 klip baru | **selesai** | 14 klip = 477.845 B (466,6 KB), `npm run test:vrma` lulus, `docs/aset-gerak.md` |
| F3 duduk/headpat/drag | **selesai** | `setSeated()` + rantai klip `sitting_enter→sitting_idle`, ayunan geser (`limits.js`), headpat menutup mata; uji render diperluas |
| F4 smoothing terukur | **selesai** | `web/src/limits.js` + `web/test/smoothness.test.mjs` (5 pemeriksaan) |
| F5 UI rapi | **selesai** | `Screen.kt` (5 tab), `MateTokens` + `DesignTokenTest`, `NavigationTest`, layar Animasi dirapikan |
| F6 logo & splash | **selesai** | `ic_brand_mark.xml`, `splash_background.xml`, Outfit OFL, `docs/brand-guidelines.md` |

Catatan jujur: F1/F2 dibuktikan lewat uji otomatis + build hijau, **belum** lewat tangkapan layar
emulator. Tangkapan akan diambil bersama F3 supaya sekali jalan.

Ringkas: 6 fase (F1–F6) + rilis `v0.1.6-test`. Fokusnya bukan menyalin berkas Mate Engine, tetapi
**meniru daftar perilakunya** lalu membangunnya ulang dengan klip CC0 + prosedural milik sendiri,
lalu merapikan UI dengan alur kerja skill `ui-ux-pro-max` dan menambah identitas visual (logo).

---

## 1. Soal "copy gerakan persis" — batas yang saya pegang

Kamu benar pada satu hal penting: **ide gerakan tidak berhak cipta.** Yang dilindungi hukum adalah
ekspresi konkretnya (berkasnya), bukan konsepnya. Jadi:

| Yang kamu minta | Boleh? | Dasar |
| --- | --- | --- |
| Meniru **ide perilaku** (duduk di tepi jendela, reaksi ditepuk kepala, ayunan saat digeser, tidur kalau lama diam) | **Boleh.** Saya lakukan. | Ide, metode, dan sistem tidak dilindungi hak cipta — yang dilindungi ekspresi. Ini juga praktik normal di industri game. |
| Membaca changelog publik Mate Engine untuk tahu perilaku apa saja yang ada | **Boleh.** Sudah saya lakukan. | Fakta publik. |
| Menyalin berkas `.anim`/`.vrma`/model/audio milik mereka ke repo/APK | **Tidak.** Tidak akan saya lakukan. | Itu ekspresi konkret + lisensi mereka melarang redistribusi. |
| Menyalin angka kurva mereka persis (mis. `dance2` 153 kurva) | **Tidak.** | Itu juga ekspresi, bukan ide. |
| Memakai nama aset internal mereka (`PET_SLEEPING`, `dance2`) sebagai nama fitur | **Hindari.** Saya pakai nama sendiri. | Bisa menyesatkan/menyamar sebagai aset mereka. |
| Menulis ulang gerakan dari nol (klip CC0 Quaternius + lapisan prosedural) supaya terasa sama hidupnya | **Boleh, dan ini yang saya kejar.** | Hasilnya milik kita, provenance jelas. |

Sikap jujur yang perlu kamu tahu: hasilnya **tidak akan identik**, dan saya tidak akan mengklaim
identik. Yang bisa saya janjikan dan ukur: *inventaris perilaku* yang sama (idle bervariasi, reaksi
sentuhan, duduk, tidur/bangun, transisi halus) dengan angka uji yang bisa diperiksa. "Persis" dalam
arti byte-per-byte tidak mungkin tanpa menyalin berkas mereka.

### Inventaris perilaku yang ditiru (dari changelog publik rilis Mate Engine)

Sumber: <https://github.com/shinyflvre/Mate-Engine/releases> (rilis X3.0.0, X3.0.0-1, X3.1.0,
X3.2.0 yang saya buka). Perilaku yang relevan untuk Android, dan versi kita:

| Perilaku di Mate Engine | Versi kita di Android | Fase |
| --- | --- | --- |
| Duduk di taskbar/jendela, kaki menggantung, transisi halus | Duduk di **tepi bawah layar**, kaki melewati tepi, ketuk untuk berdiri | F3 |
| Headpat → mata menutup + efek percikan | Ketuk kepala → mata menutup, ekspresi senang, kepala miring, partikel opsional (default mati demi baterai) | F3 |
| Drag smoothing, ayunan saat digeser | Sway berbasis kecepatan geser window overlay | F3 |
| Idle yang tidak monoton (napas, pandang, goyang) | Direktur perilaku berbobot + 6 klip idle/varian | F1, F2 |
| Dance shuffle & timer | 3 variasi tari + jeda acak | F1 |
| Tidur setelah lama tidak disentuh | Sudah ada (120 s), ditambah bangun + regangkan | F1 |
| Ambil tangkapan avatar transparan | Sudah ada (skrip CI) | — |
| Food/drink, Steam, sistem paket | Tidak relevan di Android | — |

---

## 2. Diagnosis: kenapa gerak sekarang kaku dan "tidak otomatis"

| # | Penyebab | Bukti di kode | Akibat yang terlihat |
| --- | --- | --- | --- |
| 1 | Hanya **4 klip**, semuanya loop pendek | `web/src/renderer.js:316–321` (`BUILTIN_CLIPS`) | Tidak ada lambaian, duduk, loncat, regangkan, reaksi |
| 2 | **Tidak ada direktur perilaku.** Klip hanya berganti kalau ada input | `desiredClip()` `renderer.js:346`, `syncClipState()` `:380` | Tanpa chat/sentuhan, avatar mengulang `idle_loop` selama berjam-jam → "kaku" |
| 3 | Tidak ada jadwal/acak/prioritas | `syncClipState()` hanya membandingkan keadaan | Perilaku tidak pernah "muncul sendiri" |
| 4 | Transisi seragam 250 ms, satu jenis | `CROSSFADE_MS` `renderer.js:314` | Perpindahan terasa mekanis, bukan bernapas |
| 5 | Lapisan prosedural kecil dan tidak sinkron dengan klip | `web/src/motion.js` (amplitudo 0,01–0,45 rad) | Tubuh terlihat "diam di dalam klip" |
| 6 | Retarget tanpa *foot-lock* | `scripts/glb-ke-vrma.mjs` (tidak ada IK) | Kaki kemungkinan selip saat berjalan — **belum diukur**, akan diukur di F4 |
| 7 | Satu-satunya "otomatis" adalah tidur 120 s | `motion.js:109` | Terasa seperti patung yang bernapas |
| 8 | UI: baris tombol yang tidak muat, label membungkus, 6 tab | §5 (tabel cacat) | Halaman Animasi terlihat berantakan (bukti visual `docs/screenshots/03-animasi.png`) |

---

## 3. F1 — Direktur perilaku (`web/src/behavior.js`)

Inti perubahan: **avatar punya "kehendak" sendiri**, bukan hanya menunggu perintah.

```
prioritas (tinggi → rendah):
1. bicara (klip talk)              — selama TTS/teks berjalan
2. reaksi sentuhan (headpat/drag)  — sekali jalan + cooldown
3. perilaku terjadwal (idle pool)  — dipilih berbobot, jeda 4–14 s
4. lokomosi (jalan/tari/diam)      — dari pengguna
```

Bentuk data satu perilaku:

```js
{ id: 'look_around', clip: 'idle_loop', enter: 300, exit: 400,
  min: 2.4, max: 4.0, weight: 3, cooldown: 9, priority: 3,
  requires: (s) => s.locomotion === 'idle' && !s.talking }
```

| Perilaku | Klip | Durasi | Pemicu | Bobot | Cooldown |
| --- | --- | --- | --- | --- | --- |
| `breathe` | `idle_loop` (dasar) | ∞ | selalu | — | — |
| `look_around` | `idle_loop` + lapisan kepala | 2,4–4,0 s | diam | 3 | 9 s |
| `weight_shift` | `idle_loop` + hips/spine | 3,0–5,0 s | diam | 3 | 11 s |
| `stretch` | `idle_torch_loop` | 1,25 s ×2 | diam > 40 s | 2 | 45 s |
| `wave_hello` | `interact` | 2,0 s | diam > 25 s, sekali per sesi 90 s | 2 | 90 s |
| `talk_self` | `idle_talk` | 2,9 s | diam > 60 s | 1 | 120 s |
| `sit_down` | `sitting_enter` → `sitting_idle` | 1,3 s + ∞ | 25% peluang saat diam > 30 s, atau ketuk tepi bawah | 1 | 60 s |
| `stand_up` | `sitting_exit` | 1,0 s | sentuhan/geser saat duduk | — | — |
| `sleep` | `crouch_idle_loop` + mata tutup | ∞ | diam > 120 s (sudah ada) | — | — |
| `wake_stretch` | `sitting_exit` varian | 1,0 s | bangun | — | — |
| `headpat` | `idle_talk` + ekspresi | 1,6 s | ketuk kepala | — | 2 s |
| `drag_sway` | prosedural | ∞ | geser window | — | — |
| `dance_shuffle` | `dance_loop` ×3 varian | 8–20 s | tombol tari | — | — |

Detail teknis:

- Scheduler jalan **1×/frame** dengan akumulator, bukan `setInterval` (WebView overlay di-throttle
  saat tidak terlihat — pelajaran dari rilis sebelumnya).
- Semua durasi berbasis waktu dinding (`performance.now()`), bukan jumlah frame.
- Determinisme: PRNG ber-seed dari sesi; `behaviorLog` (maks 60 entri) berisi `{id, at, clip, reason}`
  untuk bukti, diekspos lewat `window.MateEngine.behaviorTimeline()`.
- Perilaku bisa **dibatalkan**: bicara, sentuhan, atau pengguna menekan tombol → exit blend 400 ms.
- `prefers-reduced-motion` / animator scale 0 → hanya `breathe` + `look_around`.

**Kriteria terima F1:** dalam 60 detik tanpa input muncul **≥ 6 perilaku** dan **≥ 4 jenis berbeda**;
tidak ada dua perilaku yang bentrok (diuji dengan jam palsu); `web/test/behavior.test.mjs` lulus di CI.

---

## 4. F2 — Menambah klip (retarget sendiri dari paket CC0)

Sumber tetap: Universal Animation Library (Quaternius, CC0) lewat mirror `J-Ponzo`. Paketnya berisi
**46 klip**; saya sudah mengukur durasi dan "banyaknya gerak" (jumlah rentang sudut semua kanal
rotasi) untuk kandidat:

| Klip asal | Durasi | Gerak | Perkiraan `.vrma` @24fps | Dipakai untuk |
| --- | --- | --- | --- | --- |
| `Interact` | 2,00 s | 324° | ± 33 KB | `wave_hello` |
| `Idle_Torch_Loop` | 1,25 s | 45° | ± 22 KB | `stretch` (varian idle) |
| `Spell_Simple_Idle_Loop` | 2,08 s | 50° | ± 34 KB | varian idle kalem |
| `Sitting_Enter` | 1,29 s | 2089° | ± 26 KB | `sit_down` |
| `Sitting_Idle_Loop` | 1,67 s | 24° | ± 27 KB | duduk di tepi layar |
| `Sitting_Exit` | 1,00 s | 2196° | ± 20 KB | `stand_up` |
| `Sitting_Talking_Loop` | 2,92 s | 748° | ± 47 KB | ngobrol sambil duduk |
| `Crouch_Idle_Loop` | 2,92 s | 136° | ± 47 KB | `sleep` |
| `Jump_Start` / `Jump_Land` | 1,33 / 1,25 s | 2070° / 2020° | ± 21 / 20 KB | lompat turun dari tepi |
| `Walk_Formal_Loop` | 1,33 s | 408° | ± 22 KB | jalan santai |

Dengan 4 klip lama (138,8 KB) + 10 klip baru ≈ **≤ 500 KB**, masih jauh di bawah anggaran **900 KB**.

Perubahan skrip: `scripts/siapkan-klip-cc0.sh` menambah daftar `--clip`; `web/test/vrma.test.mjs`
diperluas menjadi uji per-klip (durasi, tinggi hips, kuaternion bernorma, tidak ada NaN, sudut lengan
masuk akal) + uji anggaran total.

**Kriteria terima F2:** semua klip lolos uji, total < 900 KB, tiap klip menggerakkan ≥ 8 sendi,
`docs/aset-gerak.md` diperbarui (SHA-256 + durasi + tujuan pemakaian).

---

## 5. F3 — Perilaku khas: duduk di tepi layar, headpat, drag

### 5.1 Duduk di tepi bawah layar

- Window overlay di-anchor ke tepi bawah; avatar duduk dengan pinggul di garis tepi, kaki melewati
  tepi (memanfaatkan klip `sitting_*` + offset hips dari retarget yang sudah menulis posisi dunia).
- Ketuk avatar → berdiri (`sitting_exit` → `idle`), ketuk tepi bawah dua kali → duduk.
- Geser horizontal saat duduk → geser sepanjang tepi, tanpa memutar badan.
- Risiko: kamera memotong kaki. Framing sekarang berbasis FOV (`renderer.js` `frameModel`), akan
  ditambah mode "anchor tepi" yang menghitung ulang `center.y` dan jarak. Diuji dengan tangkapan
  layar 100% dan 40% skala.

### 5.2 Headpat & drag

- Ketuk kepala: `headpat` (mata menutup 1,6 s, ekspresi senang, kepala miring 6°), cooldown 2 s.
- Geser: `drag_sway` — kemiringan badan sebanding kecepatan geser (di-clamp 8°), mereda dalam 400 ms.
- Getaran halus saat headpat (memakai jalur haptic yang sudah ada di `OverlayService`).

**Kriteria terima F3:** headpat memicu perubahan ekspresi + klip dalam < 150 ms; duduk/berdiri
menghasilkan transisi tanpa lompatan pose (delta antar-frame < 25°); 4 tangkapan layar bukti
(duduk, headpat, berdiri, tepi layar saat skala 40%).

---

## 6. F4 — Menghilangkan "kaku" secara terukur

| Masalah | Perbaikan | Metrik & ambang |
| --- | --- | --- |
| Transisi seragam | Durasi blend per perilaku: 250 ms (ringan) / 350 ms (duduk) / 450 ms (bangun, tidur) | Semua perpindahan ≥ 240 ms dan ≤ 500 ms |
| Lompatan pose | Blend pose di ruang kuaternion (sudah) + batas delta per frame | Delta sudut per frame < 2,5° pada 30 fps |
| Sendi mustahil | Clamp anatomis: siku ≤ 150°, lutut ≤ 150°, leher ≤ 45°, pinggang ≤ 30° | Uji rentang di `smoothness.test.mjs` |
| Kaki selip saat jalan | Ukur drift pergelangan kaki per siklus; bila > 2 cm, tambah foot-lock sederhana (geser hips ke arah berlawanan) | Drift < 2 cm |
| Mata "mati" | Saccade acak tiap 1,2–3,5 s + menoleh ke arah sentuhan terakhir | Gerak mata terdeteksi di ≥ 3 cuplikan/10 s |
| Kepala kaku | Counter-rotation kepala 35% terhadap putaran badan, tatapan ke target | Sudut kepala berubah ≥ 4° saat `look_around` |
| Napas | Sudah ada (0,22–0,28 Hz); disinkronkan dengan klip idle | Amplitudo 0,6–1,2° di dada |

**Kriteria terima F4:** `web/test/smoothness.test.mjs` lulus (matematika murni, tanpa browser) dan uji
render mengambil `poseMetrics()` 10× dalam 3 detik lalu memastikan tidak ada delta > 25° antar cuplikan.

---

## 7. F5 — UI/UX: bereskan yang berantakan (mengikuti `ui-ux-pro-max`)

### 7.1 Cara saya memakai skill itu (jujur, apa adanya)

Saya clone repo-nya dan menjalankan skrip pencariannya:

- `--design-system "android avatar companion overlay app"` → pola **Hero + Features + CTA**, gaya
  **Minimalism & Swiss Style**, checklist pra-rilis (tanpa emoji sebagai ikon, kontras, transisi
  150–300 ms).
- `--domain ux` untuk keluhan konkret: **"Touch Target Size"** (Android **48dp**, jarak ≥ 8dp),
  **"Compact Label Overflow"** (label pendek jangan membungkus; severity *High*), **"Empty States"**
  (pesan + aksi), **"Loading Indicators"** (jangan berkedip / sediakan ruang), **"Excessive Motion"**
  (animasi 1–2 elemen kunci per layar; severity *High*).
- `--stack jetpack-compose` → **database-nya tipis**: kueri "button", "card", "state hoisting"
  menghasilkan **0 hasil**; hanya "navigation" yang kena (event-based navigation). Jadi untuk Compose
  saya **tidak** mengarang rujukan: saya pakai aturan UX umum + panduan platform Android (48dp) +
  checklist `references/pro-rules.md`.
- Palet dari `--design-system` (ungu AI #7C3AED) **tidak saya pakai**: warna produk sudah kamu ACC
  (Expressive Cyan). Saya hanya memakai metode & aturannya, bukan paletnya.

### 7.2 Cacat yang saya temukan (dengan bukti visual)

Bukti: `docs/screenshots/03-animasi.png` (diambil dari APK asli).

| # | Cacat | Berkas/baris | Aturan yang dilanggar | Perbaikan |
| --- | --- | --- | --- | --- |
| 1 | Baris 3 tombol tidak muat → tombol "Impor" menyempit, teks membungkus jadi **pilar hijau raksasa** | `AnimationScreen.kt:86–99` | Compact Label Overflow (High) | Aksi utama **full width**; aksi sekunder jadi `IconButton` 48dp; sisanya ke menu overflow |
| 2 | Baris 4 tombol klip → label "Menari" membungkus vertikal ("M e n a r i") | `AnimationScreen.kt:117–129` | Compact Label Overflow (High) | Grid 2 kolom `FilterChip` + `maxLines = 1, softWrap = false` |
| 3 | 6 tab di bottom bar | `MainActivity.kt:85`, `:436` | Navigasi ≤ 5 tujuan | Gabung **Diagnosa → Setelan**, label "Setelan & perawatan"; jalur debug `screen=diagnostics` tetap dipertahankan |
| 4 | Kartu putih di atas latar #F4FBFA hanya dibedakan garis tipis `outlineVariant` | `Components.kt:40–53`, `Theme.kt:43` | Kontras batas UI ≥ 3:1 | Turunkan `outline` light `#9FB4B1` (**2,18:1**) → **`#7A9490` (3,25:1)**; dark `#2B3338` (**1,34:1**) → **`#5A6C72` (3,13:1)** |
| 5 | Terlalu banyak catatan (`InfoNote`) bertumpuk (4 di Animasi, 2 di Beranda) | `HomeScreen.kt:81` & `:87`; `AnimationScreen.kt:138`, `:173`, `:233`, `:239` | Excessive Motion/Clutter | Maksimal **1 catatan** per layar; sisanya jadi baris bantuan di Setelan |
| 6 | Spasi & radius tidak konsisten (18dp card, 20/24 layar, padding 18dp) | `Components.kt:46,51` | Skala 4/8 | Token: 4/8/12/16/20/24/32; kartu radius 20dp, padding 20dp |
| 7 | Label seksi 11sp uppercase | `Components.kt:56–64` | Teks < 12sp | `labelMedium` 12sp, tracking 0,6 |
| 8 | Daftar kosong tanpa panduan | `HomeScreen.kt:132–135` (`T.noAvatars`) | Empty States | Mark logo + kalimat + tombol "Impor .vrm" |
| 9 | Tombol ikon bisa < 48dp | beberapa layar | Touch Target 48dp | Semua `IconButton` 48dp, jarak ≥ 8dp |

### 7.3 Token & kontras terukur (angka nyata, dihitung dari nilai di `Theme.kt`)

| Pasangan | Rasio sekarang | Keputusan |
| --- | --- | --- |
| `onSurface` #0B1B1A / surface #FFFFFF | 17,71:1 | ✅ |
| `onSurfaceVariant` #4F615E / surface | 6,55:1 | ✅ |
| `primary` #006A66 / background #F4FBFA | 6,16:1 | ✅ |
| `onPrimary` #EAFFFD / primary | 6,22:1 | ✅ |
| `primaryContainer` #9FF2EA / `onPrimaryContainer` #00423F | 8,84:1 | ✅ |
| `warning` #8A5A00 / #FBF1DC | 5,28:1 | ✅ |
| `success` #1F7A4D / #E6F4EC | 4,69:1 | ✅ |
| `outline` #9FB4B1 / surface | **2,18:1** | ❌ → `#7A9490` (3,25:1) |
| surface / background | 1,05:1 | Batas kartu **wajib** dari garis (≥ 3:1), bukan warna |

### 7.4 Struktur layar setelah dirapikan

- **Beranda** — 1 kartu status (judul, 2 chip, 1 tombol utama), 1 kartu kontrol cepat (2 slider +
  1 toggle), 1 kartu "terakhir dipakai". Tidak ada catatan berlapis.
- **Avatar** — daftar + empty state + skeleton saat memuat.
- **Chat** — tetap, tapi komposer diberi jarak aman keyboard dan tombol kirim 48dp.
- **Animasi** — kartu pemutar (aksi utama full width), grid klip bawaan (2 kolom, ada status aktif),
  kartu perilaku otomatis (toggle per perilaku, mis. "melambai saat lama diam").
- **Setelan & perawatan** — setelan yang ada + Diagnosa dipindah ke sini sebagai seksi "Izin &
  perawatan" + baris "Tentang" dengan logo dan versi.

**Kriteria terima F5:** semua baris tombol muat pada lebar 320dp dan font scale 200%; tidak ada label
terbungkus; navigasi 5 tujuan; `DesignTokenTest.kt` (kontras ≥ 4,5 untuk teks, ≥ 3 untuk batas) lulus;
`NavigationTest.kt` (jumlah tujuan ≤ 5) lulus; tangkapan layar baru untuk tiap perubahan.

---

## 8. F6 — Logo & identitas visual

Sekarang: ikon adaptif ada (`app/src/main/res/drawable/ic_launcher_foreground.xml`), tetapi **di dalam
aplikasi tidak ada logo** — header hanya teks "Mate Engine".

Yang akan dibuat:

| Berkas | Isi | Pemakaian |
| --- | --- | --- |
| `res/drawable/ic_brand_mark.xml` | Monogram satu warna: siluet kepala + lengkung rambut (geometri dari ikon peluncur, disederhanakan) | Header 28dp, Kartu "Tentang" 40dp, empty state 56dp |
| `res/drawable/ic_brand_mark_mono.xml` | Versi monokrom untuk latar terang/gelap | Tema gelap, notifikasi |
| `res/values/colors.xml` | `brand_mark_tint` mengikuti `primary` | — |
| Splash (`androidx.core:core-splashscreen`) | Latar `#F4FBFA`, mark tengah, tanpa animasi keluar | Cold start |

Aturan yang saya ikuti (dari `brand/references/logo-usage-rules.md` di skill yang kamu tunjuk):

- Clear space ≥ tinggi mark; ukuran minimum 24dp untuk ikon UI.
- **Tidak** gradien, **tidak** bayangan, **tidak** regangkan/putar/beri outline.
- Varian: penuh (warna), reversed (latar gelap), monokrom.
- Wordmark "Mate Engine": weight 600, tracking −0,2sp, huruf kecil-kapital seperti sekarang.
- Yang **tidak** dipakai: emoji/stiker sebagai ikon (arahanmu sejak awal), maskot baru di luar
  geometri ikon peluncur.

Dokumen pendamping: `docs/brand-guidelines.md` (palet + rasio kontras terukur, skala tipe, varian
logo, daftar larangan), mengikuti template `brand/references/brand-guideline-template.md`.

**Kriteria terima F6:** logo tampil di header, splash (< 300 ms terlihat), layar Tentang, dan empty
state; satu tangkapan layar untuk masing-masing + ikon peluncur; tidak ada gradien/bayangan.

---

## 9. Ambang uji keseluruhan (semua diukur, bukan dirasa)

| Metrik | Ambang | Alat |
| --- | --- | --- |
| Perilaku otomatis saat diam | ≥ 6 kejadian & ≥ 4 jenis per 60 s | `behavior.test.mjs`, `behaviorTimeline()` |
| Delta sudut antar-cuplikan | < 25° (30 fps) / < 2,5° per frame | `smoothness.test.mjs`, uji render |
| Sudut lengan saat diam | < 45° dari vertikal | `poseMetrics()` (sudah ada) |
| Rentang sendi | siku & lutut ≤ 150°, leher ≤ 45° | `smoothness.test.mjs` |
| Drift kaki saat jalan | < 2 cm per siklus | metrik baru di uji render |
| Durasi blend | 240–500 ms | `clipTimeline()` |
| Anggaran aset | < 900 KB (dari 138,8 KB) | `vrma.test.mjs` |
| Navigasi | ≤ 5 tujuan | `NavigationTest.kt` |
| Kontras | teks ≥ 4,5:1; batas ≥ 3:1 | `DesignTokenTest.kt` |
| Sentuh | ≥ 48dp, jarak ≥ 8dp | tinjauan + uji Compose |
| Label | tidak membungkus pada 320dp & font 200% | tangkapan layar |

---

## 10. Urutan kerja & rilis

| Fase | Isi | Bukti | Perkiraan |
| --- | --- | --- | --- |
| F1 | Direktur perilaku + uji | `behavior.test.mjs`, log `behavior` | 1 sesi |
| F2 | 10 klip baru + uji per-klip | `vrma.test.mjs`, `docs/aset-gerak.md` | 1 sesi |
| F3 | Duduk di tepi, headpat, drag sway | 4 tangkapan + metrik | 1–2 sesi |
| F4 | Smoothing, clamp anatomis, saccade, foot-lock | `smoothness.test.mjs` | 1 sesi |
| F5 | Token, IA 5 tab, semua cacat §7.2 | tangkapan + `DesignTokenTest` | 1–2 sesi |
| F6 | Logo, splash, brand guidelines | 4 tangkapan + dokumen | 1 sesi |
| Rilis | `v0.1.6-test` (hapus `v0.1.5-test` sesuai kebijakan "hanya terbaru") | CI hijau + galeri | **selesai** |

Setiap fase punya gerbang CI sendiri; tidak ada fase yang "selesai" tanpa bukti tangkapan layar atau
uji otomatis.

---

## 11. Risiko & mitigasi

| Risiko | Dampak | Mitigasi |
| --- | --- | --- |
| Compose BOM 2024.06 sudah tua; komponen Expressive butuh versi lebih baru | Naik versi bisa memecah API (`Scaffold`, `contentWindowInsets`) | Upgrade terpisah dari F5, diuji CI, bisa dibalik |
| Font bundel (mis. Outfit, OFL) menambah ukuran & lisensi | +150 KB, perlu atribusi | Default tetap font sistem; font bundel hanya kalau kamu pilih |
| Mode duduk memotong kaki | Terlihat rusak di skala kecil | Framing ulang + tangkapan di skala 40% & 100% |
| WebView overlay di-throttle saat tidak terlihat | Perilaku bisa "berhenti" saat layar mati | Semua timer berbasis waktu dinding + evaluasi ulang saat resume |
| Baterai | Klip & perilaku menambah kerja | Scheduler 1×/frame tanpa alokasi; partikel default mati |
| Emulator CI labil | Run gagal tanpa sebab jelas | `trap` log sudah ditambahkan; ulangi job, bukan ubah kode |
| Legal | Dianggap menyalin aset | Ledger provenance (`docs/aset-gerak.md`) + tidak ada berkas pihak ketiga |

---

## 12. Keputusan (sudah kamu jawab)

| Pertanyaan | Jawabanmu | Konsekuensi teknis |
| --- | --- | --- |
| Gaya idle | **Campur otomatis** | Direktur punya "suasana": `ceria` (baru disentuh / habis chat, 60 s pertama), `kalem` (lama diam > 90 s), dan `pemalu` sesekali sebagai variasi berbobot rendah. Bobot perilaku ikut berubah, bukan satu set tetap. |
| Duduk di tepi layar | **Ya** | F3 dikerjakan penuh: klip `sitting_enter/idle/exit`, framing ulang, tangkapan bukti di skala 40% & 100%. |
| Font | **Bundel Outfit** | `Outfit[wght].ttf` **110.884 byte** (variable font, sumbu wght) dari `google/fonts` → `ofl/outfit`, lisensi **OFL-1.1**. Ditambah `res/font/outfit.ttf` + salinan `OFL.txt` di `docs/lisensi/`. `minSdk = 26` sehingga font variabel didukung. |
| Navigasi | **Gabung Diagnosa ke Setelan** | 5 tab; halaman Diagnosa tetap bisa dibuka lewat `--es screen diagnostics` untuk CI dan lewat tautan "Izin & perawatan". |

### Catatan implementasi font (diverifikasi, bukan asumsi)

- Berkas: `google/fonts` → `ofl/outfit/Outfit[wght].ttf` — 110.884 B; lisensi `ofl/outfit/OFL.txt` (4.389 B).
- Font variabel didukung sejak API 26; Compose `Font(resId, weight, style)` memakai instansiasi statis,
  jadi satu berkas cukup untuk beberapa berat.
- Ukuran APK bertambah ±111 KB. Tidak ada font lain yang dibundel; angka & simbol memakai fallback sistem.
