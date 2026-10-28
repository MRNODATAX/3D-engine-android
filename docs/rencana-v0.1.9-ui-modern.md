# Rencana v0.1.9 — Finishing UI (Expressive Cyan 2.0)

Status: **rencana, belum dieksekusi.** Dokumen ini disusun 28 Oktober 2026 setelah meninjau kode UI,
20 tangkapan emulator terakhir, dan referensi resmi Material 3 Expressive.

Ringkas: warna dan identitas "Expressive Cyan" **dipertahankan**, tetapi chrome, tipografi, bentuk,
gerak, dan katalog klip dirapikan supaya terasa 2026 — bukan aplikasi daftar-kartu biasa. Semua
perubahan tetap bisa diuji: token kontras, uji unit, dan tangkapan emulator.

---

## 1. Apa yang dinilai "belum modern" (bukti, bukan kesan)

| # | Temuan | Bukti | Dampak |
| --- | --- | --- | --- |
| F1 | Subjudul tiap layar sama: "Avatar VRM di atas aplikasi lain" | `screenshots/01..05` | Tidak memberi informasi; ruang judul terbuang |
| F2 | Header hanya brand kecil + judul; tidak ada elemen ekspresif | `MainActivity.kt` `AppHeader()` | Terasa seperti aplikasi alat, bukan pendamping |
| F3 | Kartu putih bertumpuk, batas tipis, tanpa hierarki visual | `Components.kt` `SectionCard` | Halaman terasa datar & panjang |
| F4 | Avatar — bintang aplikasinya — **tidak pernah muncul di dalam app** | semua tangkapan | Tidak ada "wow", tidak ada rasa memiliki |
| F5 | Katalog klip 24–29 item ditata sebagai chip 2 kolom, tanpa cari/kategori/indikator klip aktif yang jelas | `AnimationScreen.kt:158-200`, `03-animasi.png` | Sulit dipakai; pengguna tidak tahu apa yang sedang diputar |
| F6 | Teks "Dua puluh satu klip" **basi** (sekarang 29) | `AnimationScreen.kt:157` | Klaim salah di UI |
| F7 | Baris tombol `Putar` + `×` + `+` tanpa label, ukuran & gaya beda | `03-animasi.png` | Pengguna menebak fungsi |
| F8 | Ikon memakai set bawaan minimal (`Email` untuk tab Chat, `PlayArrow` untuk Animasi) | `MainActivity.kt` impor ikon | Semantik salah, gaya ikon campur (filled) |
| F9 | Layar Chat: gutter 14/20 dp tidak konsisten, kartu menempel tepi | `ChatScreen.kt:161-176`, `11-chat.png` | Terlihat "belum selesai" dibanding layar lain |
| F10 | Tidak ada animasi transisi antar tab; hanya indikator nav standar | `MainActivity.kt` (tanpa `AnimatedContent`) | Terasa kaku |
| F11 | Status/feedback memakai chip + catatan abu-abu; tidak ada state kosong yang mengarahkan aksi | `11-chat.png`, `03-animasi.png` | Pengguna bingung langkah berikutnya |
| F12 | Slider & switch memakai gaya default M3 1.2 (tanpa stop indicator, tanpa nilai menempel) | `Components.kt` `SliderField` | Kontrol terasa generik |

## 2. Referensi yang dipakai (dan yang sengaja tidak)

| Sumber | Yang diambil | Yang tidak diambil |
| --- | --- | --- |
| [Material 3 Expressive — start building](https://m3.material.io/blog/building-with-m3-expressive) | 5 komponen baru (button group, FAB menu, loading indicator, split button, toolbar) + 35 bentuk & shape morph | FAB menu (aplikasi ini tanpa FAB mengambang) |
| [Motion physics](https://m3.material.io/styles/motion/overview/how-it-works) | Skema spring `expressive`/`standard`; stiffness & damping sebagai token, bukan durasi+easing | Overshoot berlebihan di kontrol kecil |
| [App bars](https://m3.material.io/components/app-bars/overview) | *medium/large flexible app bar* sebagai pengganti header statis | Search app bar global (tab maksimal 5, pencarian cukup di layar Animasi) |
| [Button groups](https://m3.material.io/components/button-groups/overview) | *connected button group* sebagai pengganti segmented button & baris tombol F7 | Button group untuk aksi destruktif |
| [Loading indicator](https://m3.material.io/components/loading-indicator/overview) | Indikator morphing untuk tunggu < 5 detik (muat renderer, kirim chat) | Indikator untuk proses panjang (tetap progress determinate) |
| [Shape — 35 bentuk](https://m3.material.io/styles/shape/overview-principles) | Bentuk dekoratif untuk bingkai avatar (cookie/clover), bukan untuk area sentuh | Bentuk aneh pada tombol yang harus mudah ditebak |
| [Compose Material 3 rilis 1.5.0](https://developer.android.com/jetpack/androidx/releases/compose-material3) | `MaterialExpressiveTheme`, `ButtonGroup`, `WavyProgressIndicator`, `SplitButton`, `FloatingToolbar` sudah stabil | — |
| [Edge-to-edge Compose](https://developer.android.com/develop/ui/compose/system/setup-e2e) | Insets eksplisit; tidak pakai padding keras | — |
| [Now in Android (contoh resmi)](https://getstream.io/blog/exploring-now-in-android/) | Pola: bottom bar hanya di compact, nav rail di lebar; `Scaffold` transparan | Struktur modular multi-modul (terlalu besar untuk repo ini) |
| [Compose-first (I/O 2026)](https://android-developers.googleblog.com/2026/05/android-ui-development-is-compose-first.html) | Konfirmasi arah: semua UI baru tetap Compose | — |
| Tangkapan Mate Engine desktop (riset lama `docs/research/`) | Perilaku (duduk, headpat), bukan tampilan | Tidak menyalin aset/angka kurva/nama internal |

Catatan lisensi: Material Symbols/Apache 2.0 untuk ikon baru — atribusi ditulis di `docs/lisensi/`.
Outfit (OFL) tetap satu-satunya font; tidak menambah font baru.

## 3. Arah desain "Expressive Cyan 2.0"

**Prinsip**
1. **Avatar dulu, teks kemudian.** Setiap layar punya satu titik fokus visual; Beranda memakai
   pratinjau avatar, bukan paragraf.
2. **Satu bahasa bentuk.** Skala radius 8 / 12 / 20 / 28 / 36 dp + `full` untuk pil. Kartu memakai
   20 dp, kontrol dalam kartu 12 dp, tombol utama pil penuh (sudah ACC).
3. **Gerak berbasis spring**, maksimal 1–2 elemen bergerak per layar (batas yang sudah dipakai).
4. **Warna tetap** (#006A66). Tidak ada dynamic color — identitas produk tidak boleh berubah
   mengikuti wallpaper (keputusan lama, dipertahankan).
5. **Jujur.** Angka di UI dihitung dari data (`BuiltinClips.all.size`), bukan ditulis tangan.

**Token baru (`ui/theme/Tokens.kt`, `Theme.kt`)**
- `MateShapes`: small 8, medium 12, large 20, extraLarge 28, extraLargeIncreased 36, full.
- `MateMotion`: `expressive = spring(dampingRatio = 0.72f, stiffness = 380f)`,
  `standard = spring(0.9f, 700f)`, `snappy = spring(1f, 900f)`.
- Warna baru hanya bila lolos kontras: `surfaceContainerLow` (#EFF7F6), `surfaceContainerHigh`
  (#E4F0EE), dan versi gelapnya; semua diuji `DesignTokenTest` (≥ 4,5:1 teks, ≥ 3:1 batas).
- `MateType`: `headlineMedium` dipertegas (28 sp, SemiBold, tracking −0,4), `titleMedium` 18 sp,
  `labelLarge` 13 sp SemiBold. Outfit tetap.

**Chrome**
- `AppHeader` diganti **large flexible header**: judul layar + subjudul kontekstual
  (mis. "Beranda — 3 avatar · 29 klip · overlay aktif"), mengecil saat digulir (spring, satu elemen).
- Bottom bar: ikon Material Symbols *outlined* dengan bentuk indikator pil; label tetap.
  Kandidat set: `home`, `person`, `chat_bubble`, `animation`, `settings`.

## 4. Rencana kerja bertahap

Setiap tahap = 1 commit + 1 putaran CI (±6 menit) + tangkapan emulator. Tidak ada tahap yang
menggabungkan lebih dari ±6 berkas agar kegagalan mudah dilacak.

### Tahap 1 — Fondasi token & chrome (tanpa naik versi library)
1. `MateShapes`, `MateMotion`, `MateType` di `ui/theme/`; `Theme.kt` memakainya.
2. `SectionCard` baru: `surfaceContainerLow`, radius 20, batas 1 dp hanya pada keadaan gelap,
   padding 20 dp, slot `trailing` (untuk chip status).
3. `AppHeader` → `FlexibleHeader` (judul + subjudul kontekstual, animasi tinggi spring).
4. Ikon nav: 5 vector drawable Material Symbols (outlined) di `res/drawable/`, ganti `Email`→
   `chat_bubble`, `PlayArrow`→`animation`. Ukuran file < 2 KB per ikon.
5. `SliderField`: nilai menempel di ujung kanan, track 8 dp, thumb 20 dp, stop indicator halus.
6. Uji: `DesignTokenTest` (kontras + skala radius), `NavigationTest` tetap lulus.

**Selesai bila:** tidak ada ikon semantik salah, header tidak lagi mengulang subjudul yang sama,
kontras semua pasangan ≥ ambang, CI hijau.

### Tahap 2 — Beranda: hero avatar + kontrol ringkas
1. `AvatarHeroCard`: bingkai bentuk dekoratif (cookie/clover 28 dp) berisi **pratinjau avatar**.
   - Opsi murah (default): ambil hasil render overlay terakhir bila tersedia, jika tidak tampilkan
     potongan `ic_brand_mark` + klip aktif sebagai teks. Tidak mengklaim pratinjau hidup.
   - Opsi penuh (butuh keputusan, lihat §7): WebView kecil memuat `assets/renderer/index.html`
     dalam mode `preview` (tanpa direktur perilaku, 15 fps, dihentikan saat layar tidak terlihat).
2. Status overlay jadi satu baris **pil status** (aktif/berhenti/izin belum ada) + tombol utama pil
   penuh. Teks penjelasan panjang pindah ke lembar "Tentang overlay" (bottom sheet).
3. `Tinggi avatar` & `Opasitas` digabung dalam satu baris "Kontrol cepat" dengan nilai besar di
   kanan dan ikon; "Kunci posisi" jadi baris sakelar dengan penjelasan 1 baris.
4. `AnimatedContent` antar tab (fade + slide 12 dp, spring `standard`).

**Selesai bila:** Beranda menampilkan avatar secara visual, tinggi konten 1 layar tanpa menggulir
pada 1080×2400, dan tangkapan `21-beranda-2.png` terbaca jelas.

### Tahap 3 — Animasi: katalog 29 klip yang benar-benar bisa dipakai
1. Teks jumlah dihitung: `"${BuiltinClips.all.size} klip animasi CC0…"` (menutup F6).
2. Pencarian contained (M3 `SearchBar` gaya baru) + filter kategori:
   *Dasar* (idle, talk, walk, dance), *Sosial* (wave, interact, headpat), *Aksi*
   (jump, push, sprint, jog, roll, pickup), *Pose* (duduk, jongkok, kneel, tidur),
   *Lainnya* (sihir, renang). Kategori disimpan sebagai data, bukan hardcode di layar.
3. Chip klip → kartu kecil 2 kolom: label + ikon kategori + penanda klip aktif (pil berisi
   indikator berdenyut halus saat diputar).
4. Baris `Putar` + `×` + `+` diganti **connected button group**: `Putar` (utama) · `Berhenti` ·
   `Impor` — masing-masing berlabel, target ≥ 48 dp.
5. Pemutar `.vrma` impor: tampilkan nama berkas, durasi, dan slider kecepatan (sudah ada di state).

**Selesai bila:** 29 klip dapat ditemukan ≤ 2 ketukan/pencarian, klip aktif selalu terlihat,
tidak ada teks jumlah yang basi.

### Tahap 4 — Konsistensi layar lain
1. `ChatScreen`: gutter 20 dp, kartu header ringkas (nama persona + chip kunci), aksi
   `Isi kunci`/`Persona` dipindah ke menu ⋮, hapus riwayat pakai konfirmasi (bukan ikon telanjang).
2. Balon pesan: radius 20/20/20/6, warna pengguna `primaryContainer`, asisten `surfaceContainerHigh`.
3. `AvatarScreen`: daftar kartu avatar dengan bentuk bingkai dekoratif + chip "aktif".
4. `DiagnosticsScreen`: tabel status → daftar baris ikon + teks; warna hanya untuk status nyata.
5. `SettingsScreen`: kelompokkan (Tampilan, Overlay, Suara, Data); item destruktif dipisah di bawah.
6. Empty state semua layar: ikon 48 dp + 1 kalimat + 1 tombol aksi.

### Tahap 5 — Gerak, aksesibilitas, dan polesan
1. Animasi tekan (scale 0,97 + spring `snappy`) pada tombol utama; tanpa animasi berlebih.
2. Loading: `LoadingIndicator` (Compose M3 1.5) untuk memuat renderer/mengirim chat < 5 detik.
3. Haptik ringan saat mulai/berhenti overlay dan saat klip dipilih (API 26+).
4. Audit sentuh: semua target ≥ 48 dp; jarak ≥ 8 dp; `contentDescription` untuk semua ikon aksi.
5. Mode teks besar (fontScale 1,5): tidak ada teks terpotong di 5 layar (uji emulator).

### Tahap 6 — Verifikasi & rilis
1. Tangkapan baru: `21-beranda-2`, `22-animasi-katalog`, `23-chat-2`, `24-pengaturan-2`,
   `25-teks-besar`, `26-lebar-2`; `docs/screenshots.html` diperbarui.
2. `scripts/capture-screenshots.sh` menambah pemeriksaan: jumlah klip di UI == `BuiltinClips.all.size`,
   dan tidak ada kartu yang menempel tepi (piksel tepi).
3. `release/tag.txt = v0.1.9-test`, rilis uji terbaru saja (`v0.1.8-test` dihapus setelah hijau).
4. PR #1 ditutup/diperbarui dengan bukti baru.

## 5. Kriteria selesai keseluruhan

- [ ] Tidak ada teks jumlah klip yang ditulis manual di UI.
- [ ] Setiap layar punya satu titik fokus visual; tidak ada subjudul identik di 5 layar.
- [ ] Semua target sentuh ≥ 48 dp, semua ikon aksi punya `contentDescription`.
- [ ] Kontras: teks ≥ 4,5:1, batas kontrol ≥ 3:1 (dijaga `DesignTokenTest`).
- [ ] Maksimal 5 tab, animasi 1–2 elemen per layar.
- [ ] Tangkapan emulator untuk 5 layar + tema gelap + jendela lebar + fontScale 1,5.
- [ ] CI hijau (Renderer, APK, Screenshots) dan rilis `v0.1.9-test` terbit.

## 6. Biaya, risiko, dan batas

| Hal | Kenyataan |
| --- | --- |
| Iterasi | Sandbox ini **tidak punya JDK/Android SDK**; setiap perubahan Kotlin hanya terbukti lewat CI (±6 menit/putaran). Karena itu tiap tahap dibuat kecil. |
| Versi library | Sekarang Compose BOM `2024.06.00` (M3 1.2) → belum ada `MaterialExpressiveTheme`, `ButtonGroup`, `WavyProgressIndicator`, `MaterialShapes`. |
| Naik versi | Diuji terpisah (Tahap 1b, opsional): BOM → rilis 2026, `material3 1.5.x`, `androidx.graphics:graphics-shapes`. Risiko: perubahan API (`FilterChip` border, `SearchBar`, `Slider`), waktu build naik. Bila gagal, kembalikan BOM dan pakai bentuk kustom (hasil visual hampir sama). |
| APK | +150–400 KB bila ikon vector & shapes ditambahkan; masih jauh di bawah batas. |
| Pratinjau avatar | WebView renderer kedua = +30–60 MB RAM saat Beranda terbuka; wajib dihentikan saat layar tidak terlihat. |
| Larangan tetap | Tanpa dynamic color, tanpa font baru selain Outfit, tanpa menyalin aset/angka kurva Mate Engine, tanpa menambah tab ke-6. |

## 7. Keputusan yang saya butuhkan sebelum eksekusi

1. **Pratinjau avatar di Beranda**: cukup versi murah (potongan render terakhir/monogram) atau
   penuh (WebView renderer hidup, ±15 fps, hanya saat Beranda terlihat)?
2. **Naik versi Compose**: boleh (mendapat komponen Expressive asli) atau tetap versi sekarang
   lalu tiru bentuknya secara manual (lebih aman, hasil 80–90% mirip)?
3. **Urutan**: mulai dari Beranda (dampak terbesar) atau fondasi dulu (token + chrome, semua layar
   ikut berubah sekaligus)?

Jawaban "Gas" tanpa memilih = saya pakai default: pratinjau murah, **tanpa** naik versi, urutan
Tahap 1 → 2 → 3 → 4 → 5 → 6.
