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

Catatan penting untuk #5: **"tidak bisa tembus pandang"** bisa berarti dua hal yang sangat berbeda,
dan salah pilih akan merusak aplikasi. Dua tafsirnya:

- **Tafsir A — jendela overlay tidak boleh tembus sentuhan.** Sentuhan pada area kosong jendela
  jangan menembus ke aplikasi di bawah (mis. tombol di aplikasi lain tidak ikut tertekan).
  Ini artinya jendela jadi `FLAG_NOT_TOUCH_MODAL`-nya dicabut/blokir area. Konsekuensinya: aplikasi
  di belakang **tidak bisa dipakai** selama overlay aktif — bertentangan dengan konsep avatar di atas
  aplikasi lain.
- **Tafsir B — model tidak boleh tembus pandang secara visual.** Opasitas avatar selalu 100%
  (transparan hanya di piksel kosong), tidak tembus ke latar. Ini bisa diwujudkan sebagai setelan
  yang **mengunci opasitas di 100%** dan mematikan slider opasitas.

Rencana ini mengasumsikan **B**, karena A membuat aplikasi tidak berguna. Kalau maksudnya A,
beri tahu sebelum eksekusi; solusi tengahnya "mode blokir sentuhan" yang bisa dinyalakan sendiri.

## 2. Status saat ini (sudah di branch, bukan rencana)

Ini sudah dikerjakan dan di-push sebelum permintaan "rencana dulu" — jadi bukan usulan, tapi keadaan
yang perlu diverifikasi:

| Hal | Keadaan |
| --- | --- |
| 5 kandidat logo | **sudah ada** di `docs/logo-pilihan/` + halaman `docs/logo-pilihan.html`; belum diterapkan ke APK |
| Klip tambahan | **7 klip** (bukan 5–10): `jump_loop`, `push_loop`, `walk_formal`, `jog_loop`, `kneel_fix`, `crouch_walk`, `drive_idle` → total **21 klip**, 740 KB |
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

## 5. Keputusan yang dibutuhkan dari kamu

1. **Logo:** pilih A / B / C / D / E.
2. **"Tidak tembus pandang":** maksudnya opasitas avatar selalu 100% (tafsir B), atau blokir sentuhan
   ke aplikasi di bawah (tafsir A)?
3. **Klip 8–10:** cukup 21 klip sekarang (7 baru), atau lanjut cari sumber tambahan di Tahap 5?
