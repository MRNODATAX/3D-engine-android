# Panduan merek & antarmuka Mate Engine Android

Dokumen hidup. Angka di sini **dihitung** dari token di
`app/src/main/java/.../ui/theme/Tokens.kt` dan dijaga uji `DesignTokenTest.kt`.

## 1. Ringkasan cepat

| Hal | Nilai |
| --- | --- |
| Warna utama | `#006A66` (cyan tua) |
| Warna terang (tema gelap) | `#6FE0D8` |
| Latar terang / gelap | `#F4FBFA` / `#0E1113` |
| Font | **Outfit** (variable, OFL-1.1, 110.884 B) + fallback sistem |
| Gaya | Expressive Cyan: bersih, lapang, sudut membulat, aksen cyan secukupnya |
| Ikon | Vektor Material satu warna; **tidak ada emoji/stiker sebagai ikon** |

## 2. Palet & kontras terukur

Semua rasio di bawah dihitung dengan rumus luminans WCAG 2.1 dan diuji otomatis.

| Pasangan | Rasio | Ambang | Status |
| --- | --- | --- | --- |
| `onSurface` `#0B1B1A` / surface `#FFFFFF` | 17,71:1 | 4,5 | ✅ |
| `onSurfaceVariant` `#4F615E` / surface | 6,55:1 | 4,5 | ✅ |
| `onSurfaceVariant` / background `#F4FBFA` | 6,25:1 | 4,5 | ✅ |
| `primary` `#006A66` / background | 6,16:1 | 4,5 | ✅ |
| `onPrimary` `#EAFFFD` / primary | 6,22:1 | 4,5 | ✅ |
| `primaryContainer` `#9FF2EA` / `onPrimaryContainer` `#00423F` | 8,84:1 | 4,5 | ✅ |
| `success` `#1F7A4D` / `#E6F4EC` | 4,69:1 | 4,5 | ✅ |
| `warning` `#8A5A00` / `#FBF1DC` | 5,28:1 | 4,5 | ✅ |
| `error` `#A5352B` / `#FBEAE8` | 5,74:1 | 4,5 | ✅ |
| `onSurface` gelap `#E8EDEF` / `#0E1113` | 16,05:1 | 4,5 | ✅ |
| `primary` gelap `#6FE0D8` / `#0E1113` | 12,03:1 | 4,5 | ✅ |
| **`outline` `#7A9490` / surface** | **3,25:1** | 3,0 | ✅ (sebelumnya `#9FB4B1` = 2,18:1 ❌) |
| **`outline` gelap `#5A6C72` / surface gelap** | **3,13:1** | 3,0 | ✅ (sebelumnya `#2B3338` = 1,34:1 ❌) |

Catatan: kartu putih di atas latar `#F4FBFA` hanya berbeda 1,05:1. Karena itu **batas kartu wajib
terlihat** — kartu tidak boleh mengandalkan beda warna permukaan.

## 3. Skala bentuk & jarak

| Token | Nilai | Pemakaian |
| --- | --- | --- |
| `extraSmall` | 8dp | chip kecil, badge |
| `small` | 12dp | tombol, kolom isian |
| `medium` | 20dp | **kartu** (dipakai `SectionCard`) |
| `large` | 24dp | lembar/dialog |
| `extraLarge` | 28dp | panel |

Jarak memakai kelipatan 4/8: isi kartu **20dp**, antar-elemen **12dp**, antar-kartu **16dp**,
margin layar **20dp**. Target sentuh minimal **48dp**, jarak antar target minimal **8dp**.

## 4. Tipografi

- Keluarga: **Outfit** untuk display/headline/title/body; `labelLarge` dan label kecil tetap
  memakai font sistem agar angka dan lambang tidak berubah bentuk.
- Berkas & lisensi: `app/src/main/res/font/outfit.ttf`, `docs/lisensi/OFL-Outfit.txt`.
- Skala teks minimum: **12sp** (`labelMedium`) — sebelumnya label seksi 11sp.
- Perataan: judul halaman `headlineSmall` (24sp, SemiBold), badan `bodyMedium` (14sp), bantuan
  `bodySmall` (12sp).

## 5. Logo & tanda merek

| Varian | Berkas | Pemakaian |
| --- | --- | --- |
| Ikon peluncur (adaptif) | `ic_launcher_foreground.xml` + `ic_launcher_background` | launcher, ikon 108dp dengan safe zone 66dp |
| Tanda merek satu warna | `res/drawable/ic_brand_mark.xml` | header 24dp, kartu Tentang 40dp, empty state 56dp, splash 96dp |
| Wordmark | teks "Mate Engine", `labelLarge`, SemiBold, tracking normal | di samping tanda merek di header |

Aturan:

- **Clear space** minimal setinggi tanda; tanda tidak pernah menempel teks lain.
- Ukuran minimum **24dp**; di bawah itu gunakan varian tanpa detail bahu.
- Warna mengikuti `?attr/colorPrimary` (tint), bukan warna tetap — otomatis benar di tema gelap.
- **Dilarang**: gradien pada tanda, bayangan, outline tambahan, regangkan/putar, ganti warna di luar
  palet, tempel di latar ramai tanpa bidang pengaman.
- Splash: warna `#F4FBFA` + tanda 96dp di tengah, tanpa animasi keluar, tanpa dependency tambahan
  (cukup `android:windowBackground`).

## 6. Aturan antarmuka yang dijaga otomatis

| Aturan | Bukti |
| --- | --- |
| Bilah navigasi ≤ 5 tujuan | `NavigationTest.kt` (`Screen.bottomBar`) |
| Kontras teks ≥ 4,5:1, batas ≥ 3:1 | `DesignTokenTest.kt` |
| Tidak ada label membungkus di tombol/chip | `maxLines = 1`, `softWrap = false` + tangkapan layar |
| Target sentuh ≥ 48dp | `IconButton` dengan `Modifier.size(48.dp)` |
| Maksimal satu catatan (`InfoNote`) per layar | tinjauan layar + `HomeScreen`/`AnimationScreen` |

## 7. Keputusan yang tidak boleh dibalik tanpa alasan

1. Tanpa dynamic color (warna mengikuti wallpaper) — identitas produk harus tetap.
2. Tanpa emoji sebagai ikon.
3. Overlay avatar tidak pernah diberi panel/kartu di belakangnya; piksel kosong transparan penuh.
4. Rilis hanya menyimpan build uji terbaru.
