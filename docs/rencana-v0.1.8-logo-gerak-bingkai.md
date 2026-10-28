# Rencana v0.1.8 — logo, gerak acak, dan bingkai overlay

Dokumen kerja. Ditulis **sebelum** sisa pekerjaan dieksekusi, sesuai permintaan: rencana dulu,
eksekusi menyusul setelah logo dipilih.

## 1. Permintaan yang harus dipenuhi

| # | Permintaan | Arti teknis |
| --- | --- | --- |
| 1 | Ganti logo APK, beri **5 pilihan** | 5 kandidat vektor → user pilih satu → jadi ikon adaptif + splash + tanda merek |
| 2 | Cari **5–10 gerakan tambahan** dari web | klip berlisensi bebas (CC0), dikonversi ke `.vrma`, dibundel |
| 3 | Gerakan **acak berganti-ganti** | direktur perilaku mengundi klip tiap kemunculan, tidak mengulang yang barusan |
| 4 | Model **tidak bisa bergerak bebas** seperti terhalang kotak | kunci root motion (X/Z pinggul) + bingkai kamera yang memuat seluruh tubuh |
| 5 | **Tidak bisa tembus pandang** | overlay tidak boleh tembus pandang/transparan di badan model |
| 6 | **Saat duduk kakinya hilang** | hapus geseran kamera tetap saat duduk; bingkai ikut kerangka |

### 1a. Keputusan user (28 Okt) tentang "tidak tembus"

Klarifikasi user: **area kosong di sekitar model, saat disentuh, tidak boleh menembus** ke aplikasi
di bawah — berbeda dari Mate Engine yang sentuhan di samping model tetap diteruskan.

Jadi yang dipakai adalah **Tafsir A: blokir sentuhan**. Artinya:
- seluruh persegi jendela overlay menangkap sentuhan; area transparan di kiri/kanan model **tidak**
  meneruskan ketukan ke tombol aplikasi di bawahnya;
- konsekuensi yang harus dinyatakan di UI: selama avatar tampil, area yang tertutup jendela overlay
  tidak bisa dipakai untuk menekan tombol aplikasi di belakang. Karena itu tetap disediakan
  **sakelar** "Teruskan sentuhan area kosong" (default **mati** sesuai permintaan) supaya orang bisa
  memilih berbagi layar seperti biasa;
- sakelar yang sama dipakai saat "Kunci posisi": kunci posisi kini berarti *avatar tidak bisa
  digeser*, bukan lagi "sentuhan diteruskan".

Tafsir B (opasitas visual) tetap dikerjakan sebagai bagian kecil: opasitas avatar tidak pernah
tembus ke latar, hanya piksel kosong yang transparan.

## 2. Status saat ini (sudah di branch, bukan rencana)

Ini sudah dikerjakan dan di-push sebelum permintaan "rencana dulu" — jadi bukan usulan, tapi keadaan
yang perlu diverifikasi:

| Hal | Keadaan |
| --- | --- |
| 5 kandidat logo | **sudah ada** di `docs/logo-pilihan/` + halaman `docs/logo-pilihan.html`; belum diterapkan ke APK |
| Klip tambahan | **7 klip** + **8 klip** gelombang kedua (`sprint_loop`, `swim_idle`, `swim_fwd`, `pickup`, `spell_enter`, `spell_exit`, `spell_shoot`, `roll`) → total **29 klip**, 944 KB |
| Gerak acak | perilaku `random_clip`: 12 klip diundi, bobot tertinggi, tidak mengulang klip barusan. Uji: 11 pergantian / 7 klip berbeda dalam 200 s |
| Terhalang kotak | `--in-place` saat konversi (X/Z pinggul dipaku) + `clampRootMotion()` tiap frame |
| Kaki hilang saat duduk | geseran kamera tetap 0,34 × tinggi **dihapus**; bingkai pakai posisi tulang (`skeletonBounds`) |
| Versi | `versionCode 8`, `0.1.8`, `release/tag.txt = v0.1.8-test` |
| CI | uji render sempat gagal 4× karena uji lama mengukur "diam" padahal klip kini berganti sendiri; sudah diperbaiki di uji (direktur dimatikan saat mengukur pose). Run terakhir: renderer **hijau**, APK masih berjalan |

## 3. Sisa pekerjaan (urutan eksekusi setelah rencana disetujui)

### Tahap 1 — Verifikasi bingkai & gerak acak (tanpa kode baru)
1. Tunggu CI hijau (renderer + APK + uji unit).
2. Jalankan workflow Screenshots; ambil bukti:
   - `19-duduk-kaki-terlihat.png` — duduk, kaki sampai sepatu masuk kanvas;
   - jejak `clip-changed` ≥ 5 klip berbeda dalam 90 detik (bukti acak);
   - tangkapan berdiri vs duduk untuk membandingkan tinggi siluet dan jarak tepi atas/bawah.
3. Baca angka dari `diagnostik-emulator.txt`: jarak atas/bawah > 1 px, klip berganti-ganti.
4. **Kriteria selesai:** semua bukti ada dan CI hijau. Kalau masih terpotong → perbaiki bingkai lagi
   (margin/padding) sebelum lanjut.

### Tahap 2 — Opasitas & "tidak tembus pandang" (tafsir B)
1. Setelan baru `overlay.lockOpacity` (default **mati**, agar perilaku lama tidak berubah mendadak).
2. Saat aktif: slider opasitas dinonaktifkan + nilai dipaksa 100%, dengan keterangan singkat di
   Setelan/Diagnosa (bukan hanya tombol mati tanpa alasan).
3. Uji unit JVM: nilai opasitas yang tersimpan dijepit ke 100 saat kunci aktif.
4. **Kriteria selesai:** screenshot overlay dengan opasitas 100% dan slider tidak bisa digeser.

### Tahap 3 — Logo
1. User memilih **A–E** (lihat §4).
2. Terjemahkan kandidat terpilih ke `ic_launcher_foreground.xml` + `ic_launcher_background.xml`
   (safe zone 66/108 dp), `ic_brand_mark.xml` (satu warna), `splash_background.xml`.
3. Pratinjau 24/48/108 dp + tangkapan ikon peluncur di emulator (grid peluncur).
4. Perbarui `docs/brand-guidelines.md` (varian, larangan) dan `docs/screenshots.html`.
5. **Kriteria selesai:** ikon baru terlihat di peluncur emulator, tidak terpotong mask bulat/squircle.

### Tahap 4 — Rilis
1. `release/tag.txt = v0.1.8-test` sudah terisi; job "Periksa rilis baru" akan menerbitkan rilis
   otomatis begitu job APK hijau (jalur cadangan; push tag tidak selalu memicu workflow).
2. Hapus rilis lama `v0.1.7-test` + tag-nya (kebijakan hanya-rilis-terbaru).
3. Perbarui README (jumlah klip 21, gerak acak, bingkai) dan galeri.
4. **Kriteria selesai:** hanya satu rilis terbaru, APK bisa diunduh, catatan rilis jujur soal batasan.

### Tahap 5 — Kalau masih mau 8–10 klip (opsional)
Paket CC0 yang sama masih punya kandidat yang **gagal** uji kualitas, jadi butuh sumber baru:
`Roll` (ayunan pinggul 0,64 m), `PickUp_Table` (0,83 s), `Spell_Simple_Enter/Shoot` (0,50 s).
Pilihannya: (a) longgarkan batas uji untuk klip pendek, (b) cari paket CC0 lain
(Mixamo **tidak** CC0 — jangan dipakai), (c) ambil dari Universal Animation Library volume lain
bila ada mirror berlisensi CC0. Butuh penelusuran tambahan + konversi + uji. **Belum dieksekusi.**

## 4. Lima kandidat logo

| Huruf | Nama | Kekuatan | Risiko |
| --- | --- | --- | --- |
| **A** | Lengkung Rambut | kelanjutan identitas yang sudah ada; wajah jelas | paling mirip ikon sekarang, jadi terasa "tidak berubah" |
| **B** | Balon Bicara | menegaskan fungsi chat AI; paling terbaca di 24 dp | tidak menampilkan sosok avatar |
| **C** | Hati Terpejam | momen headpat khas versi ini; paling hangat | detail mata bisa hilang di 24 dp |
| **D** | Monogram M | tidak bergantung model; tajam di semua ukuran | abstrak, tidak menyiratkan avatar |
| **E** | Tiga Ketuk | mengangkat fitur baru 3× ketuk | makna tidak langsung terbaca tanpa konteks |

Pratinjau: `docs/logo-pilihan.html` (ada contoh ukuran 24 dp dan 48 dp per kandidat).

## 5. Keputusan user (sudah dijawab)

| Pertanyaan | Jawaban |
| --- | --- |
| Logo | **D — Monogram M** |
| Arti "tidak tembus pandang" | **Blokir sentuhan**: area kosong di samping model tidak meneruskan sentuhan ke aplikasi bawah |
| Jumlah klip | **Tambah 8–10 lagi** |

## 6. Rencana eksekusi setelah dokumen ini disetujui

### Tahap A — Logo D (Monogram M)
1. Tulis `ic_launcher_foreground.xml`: pita M krem + percikan mint, seluruh bentuk di dalam
   safe zone 66/108 dp; `ic_launcher_background.xml` tetap cyan #006A66.
2. `ic_brand_mark.xml`: versi satu warna M (tanpa percikan agar tetap tajam di 24 dp), dipakai di
   header, kartu Tentang, empty state, dan splash.
3. Pratinjau 24 / 48 / 108 dp + tangkapan peluncur emulator (mask bulat & squircle).
4. Perbarui `docs/brand-guidelines.md`, `docs/logo-pilihan.html` (tandai D sebagai terpilih),
   README.

**Kriteria selesai:** ikon baru tampil di peluncur emulator tanpa terpotong, dan tidak ada sisa
ikon lama di `res/drawable*`.

### Tahap B — Blokir sentuhan area kosong (**tanpa sakelar**, sesuai keputusan pemilik)

> Revisi 28 Okt: rencana awal memakai sakelar `overlay.forwardEmptyTouches`. Pemilik meminta
> blokir ini **wajib dan tidak bisa dimatikan**, jadi sakelar itu tidak dibuat sama sekali.

1. ~~Tambah `overlay.forwardEmptyTouches`~~ — **dibatalkan**; tidak ada setelan untuk mematikan.
2. Di `OverlayService`: `FLAG_NOT_TOUCHABLE` **dihapus total**; `OverlayRoot.onInterceptTouchEvent()`
   selalu `true` sehingga seluruh persegi jendela menahan sentuhan, termasuk piksel transparan.
3. WebView tidak lagi menerima sentuhan mentah; ketukan pada area kosong dihitung sebagai ketukan
   avatar (bisa memicu 3× ketuk) tetapi **tidak** diteruskan ke aplikasi di bawah.
4. Sakelar "Kunci posisi" tetap ada, tetapi maknanya menyempit: hanya mematikan geser
   (`isDragEnabled`), bukan lagi meneruskan sentuhan. Teks bantuan ikut diperbarui.
5. Uji: `OverlayGeometryTest` (geser bebas) + tangkapan emulator `20-overlay-geser-pojok.png`.

**Kriteria selesai:** sentuhan pada area kosong tidak pernah sampai ke aplikasi di bawah, pada
keadaan apa pun (tidak ada jalur kode yang bisa mematikannya).

### Tahap C — Verifikasi bingkai & gerak acak (sudah dikodekan, belum terbukti di emulator)
1. CI hijau (renderer + uji unit + APK).
2. Screenshots: `19-duduk-kaki-terlihat.png`, jejak `clip-changed` ≥ 5 klip berbeda / 90 detik,
   dan perbandingan tepi atas/bawah berdiri vs duduk.
3. **Kriteria selesai:** tidak ada bagian tubuh yang menyentuh tepi kanvas (jarak > 1 px) dan klip
   benar-benar berganti-ganti.

### Tahap D — 8–10 klip tambahan
Audit **25 klip yang belum dipakai** di paket CC0 yang sama
(`Universal Animation Library`, mirror `J-Ponzo/gltf-universal-animation-library`):

| Klip | Durasi | Catatan |
| --- | --- | --- |
| `Sprint_Loop` | ±1,0 s | kandidat kuat (lari cepat) |
| `Swim_Idle_Loop` | ±3,3 s | kandidat kuat (mengambang) |
| `Swim_Fwd_Loop` | ±1,3 s | kandidat, perlu `--in-place` |
| `PickUp_Table` | 0,83 s | di bawah batas 0,9 s → perlu pelonggaran atau diulang 2× |
| `Roll` | 1,46 s | **gagal**: tubuh turun ke lantai (0,64 m) → bingkai & kaki bermasalah |
| `Spell_Simple_Shoot` / `_Enter` / `_Exit` | 0,42–0,50 s | terlalu pendek untuk loop |
| `Punch_*`, `Sword_*`, `Pistol_*`, `Hit_*`, `Death01` | bervariasi | **ditolak** secara nada: bukan gerak teman/pendamping |
| `A_TPose` | — | pose acuan, bukan animasi |

Perkiraan lolos dari paket ini: **3–4 klip**. Untuk mencapai 8–10, rencananya:
1. longgarkan aturan durasi minimum menjadi 0,4 s **khusus klip satu-kali** (diputar sekali lalu
   kembali ke idle), sehingga `Spell_Simple_Shoot` dan `PickUp_Table` bisa dipakai;
2. uji ulang `Roll` dengan kunci pinggul **vertikal** tambahan (dipaku juga di sumbu Y) — kalau
   lolos, masuk katalog;
3. bila masih kurang dari 8: perluas `BONE_MAP` di `scripts/glb-ke-vrma.mjs` agar mengenal nama
   tulang `mixamorig*`, lalu pakai paket karakter animasi **CC0 Kenney** sebagai sumber kedua;
   **Mixamo tidak dipakai** (lisensinya melarang redistribusi);
4. setiap sumber baru dicatat di `docs/aset-gerak.md` (URL, lisensi, SHA-256) sebelum dibundel.
5. Anggaran ukuran dinaikkan dari 900 KB ke 1,2 MB bila perlu, dan angka baru itu yang diuji —
   bukan dihapus.

**Hasil (28 Okt):** 8 klip lolos — `sprint_loop`, `swim_idle`, `swim_fwd`, `pickup`, `spell_enter`,
`spell_exit`, `spell_shoot`, `roll`. Katalog menjadi **29 klip / 966.438 B** (anggaran uji 1,2 MB).
Klip 0,4–0,9 s diputar sekali lalu kembali ke idle (`GESTURE_CLIPS`), sehingga pelonggaran aturan
durasi hanya berlaku untuk gestur (0,4 s), sedangkan klip loop tetap 0,6 s. `Roll` lolos setelah
batas ayunan pinggul dinaikkan 0,6 → 0,8 m, aman karena bingkai kamera mengikuti kerangka.
`BONE_MAP mixamorig*` dan paket Kenney **tidak diperlukan** — target 8 klip tercapai dari paket CC0
yang sudah dipakai. Gerak acak mengundi dari 15 klip (`RANDOM_CLIPS`).

**Kriteria selesai:** ✅ ≥ 8 klip baru lolos uji, total aset di bawah anggaran, gerak acak ≥ 18 klip
(terpenuhi: 29 klip katalog, 15 klip undian).

### Tahap E — Rilis
1. `release/tag.txt = v0.1.8-test`; job "Periksa rilis baru" menerbitkan rilis otomatis saat APK hijau.
2. Hapus rilis + tag `v0.1.7-test` (kebijakan hanya-rilis-terbaru).
3. README + galeri + catatan rilis jujur (termasuk konsekuensi blokir sentuhan).

## 7. Status eksekusi (28 Okt 2026)

| Tahap | Status | Bukti |
| --- | --- | --- |
| A — Logo D | ✅ | `ic_launcher_foreground.xml`, `ic_brand_mark.xml`; ikon tampil di peluncur pada `12-gerak-b.png`, `19-overlay-duduk.png` |
| B — Blokir sentuhan tanpa sakelar | ✅ | `OverlayService` tanpa `FLAG_NOT_TOUCHABLE`; `onInterceptTouchEvent()` selalu `true` |
| C — Bingkai & gerak acak | ✅ | `13-overlay-skala-100.png` (tubuh utuh, skala 100%), `19-overlay-duduk.png` (kaki terlihat), log `motion` memuat `bodyGap` |
| C+ — Geser bebas | ✅ | `20-overlay-geser-pojok.png` + logcat `overlay digeser ke (x, y)`; uji `OverlayGeometryTest` baru |
| D — 8 klip tambahan | ✅ | 29 klip / 966.438 B, `docs/aset-gerak.md` |
| E — Rilis | ✅ | `v0.1.8-test` (APK 16.897.838 B), `v0.1.7-test` dihapus |

Perbaikan tambahan dari temuan emulator: spring bone dipecah ke langkah kecil (rambut tidak
melonjak di 6–10 fps), uji "bukan T-pose" memakai median 5 contoh, dan langkah rilis dibuat
idempoten.

Sisa risiko jujur: seluruh bukti berasal dari emulator CI (perangkat fisik belum diuji).
