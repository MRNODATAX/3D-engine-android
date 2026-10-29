# Riset acuan: Mate Engine desktop → Android

Dokumen ini mencatat **fakta yang bisa diverifikasi** dari sumber resmi, plus batas klaim.
Diperbarui: 24 Oktober 2026.

## 1. Sumber resmi

| Sumber | Isi yang dipakai |
| --- | --- |
| https://github.com/shinyflvre/Mate-Engine/releases | Daftar rilis, catatan perubahan, aset rilis |
| https://github.com/shinyflvre/Mate-Engine (README) | Deskripsi produk, tabel perbandingan fitur, lisensi |
| https://store.steampowered.com/app/3625270/MateEngine/ | Halaman produk resmi (tautan dari README) |
| https://vrm.dev/ , https://github.com/pixiv/three-vrm | Spesifikasi VRM 1.0 dan pustaka runtime yang dipakai |

## 2. Fakta rilis desktop

- Rilis stabil terakhir: **Public Release X3.3.0** + **HOTFIX-1**, dipublikasikan 19 Januari 2026
  (`tag_name: Public-Release-X3.3.0`). Aset: `Public.Release.X3.3.0-HOTFIX-1.zip`, 830,8 MB,
  platform Windows.
- Nama produk: **MateEngine**; penulis repo `shinyflvre`; distribusi berbayar/opsional di Steam,
  versi GitHub gratis.
- README menyatakan lisensi campuran: **GNU AGPL v3 & MateProv2 License**, dan model bawaan
  (Yorshka) berstatus **All Rights Reserved** serta **tidak boleh didistribusikan ulang**.
  Karena itu proyek Android ini tidak memakai, tidak membundel, dan tidak meniru aset Yorshka.
- Rilis X3.3 memuat (dikutip dari catatan rilis):
  - berjalan di desktop otomatis saat avatar **Idle**, dapat diaktifkan di Settings (eksperimental);
  - perbaikan *window sitting* (layering, Y height, animasi duduk baru);
  - perbaikan RAM leak saat berpindah avatar mod; perbaikan penghapusan mod; perbaikan frame drop
    pada Memory Optimization Mode.
- Rilis X3.2 memuat: timer tanpa batas (maks. 24 jam 59 menit + pesan kustom), shuffle & loop pada
  Dance Player, rentang Y Offset lebih lebar, "Start With Random Avatar", jalan tanpa Steam.
- Rilis X3.1 memuat: screenshot avatar resolusi tinggi dengan latar transparan
  (disimpan ke `Pictures/MateScreenshots`), opsi *Resize Window* 3 skala, perbaikan animasi duduk.
- Fitur desktop yang terdokumentasi di README/tabel perbandingan: avatar VRM kustom, shader kustom,
  dukungan Workshop/mod, duduk di jendela & taskbar, idle/drag/dance animation, head/eye/spine
  tracking, alarm/timer, screensaver, touch regions, SFX, partikel, FPS control, always-on-top,
  chibi mode, bloom/AO, MSAA, big screen, AI chat (LLM Qwen 2.5 1.5B), IK, screenshot.

Fakta tersebut adalah **perilaku aplikasi desktop Windows**. Tidak satu pun di antaranya otomatis
berlaku di Android.

## 3. Batas klaim (metode REA)

Skill `morluto/rea` menekankan: klaim harus berdasar bukti dari artefak/sumber yang diperiksa, dan
cakupan pemeriksaan harus dinyatakan. Penerapan di proyek ini:

- **Diperiksa**: repositori ini, catatan rilis resmi + README Mate Engine (API GitHub),
  metadata lisensi model uji VRM (chunk JSON glTF), versi paket `three` / `@pixiv/three-vrm` (npm).
- **Tidak diperiksa**: biner Windows `Public.Release.X3.3.0-HOTFIX-1.zip` (830 MB, di luar cakupan;
  tidak didekompilasi), kode sumber Mate Engine (repo tidak memuat source aplikasi), dan
  **perangkat Android fisik** (tidak ada akses USB/adb).
- **Konsekuensi**: setiap fitur Android ditandai salah satu dari
  `diport` (perilaku dipindahkan), `diport sebagian`, atau `belum ada`. Klaim "setara desktop"
  tidak dibuat tanpa pengujian di perangkat.

## 4. Konsekuensi teknis Android

| Kebutuhan desktop | Padanan Android yang realistis |
| --- | --- |
| Jendela avatar transparan selalu di atas | `TYPE_APPLICATION_OVERLAY` + `PixelFormat.TRANSLUCENT`, foreground service |
| Duduk di jendela/taskbar aplikasi lain | Tidak ada taskbar; posisi bebas + snap tepi layar |
| Drag avatar | Drag pada window overlay (batas tepi layar) |
| Render VRM + MToon + spring bone | WebView/WebGL + `three` + `@pixiv/three-vrm` |
| Impor model/paket dari disk | Storage Access Framework (URI izin persisten) |
| Dance player | Pemutar `.vrma` (VRM Animation) dengan loop/shuffle |
| Screenshot transparan | Belum ada (butuh pipeline capture terpisah) |
| AI chat, Workshop, food, IK tracking | Belum ada |

Batasan platform yang harus jujur disampaikan ke pengguna:

1. Window overlay berbentuk **persegi panjang**; sentuhan pada piksel transparan tetap ditangkap
   overlay, jadi tidak ada *click-through* per piksel (Android tidak menyediakannya untuk overlay).
2. Setiap produsen (Xiaomi/HyperOS, Oppo/ColorOS, vivo, Samsung, dsb.) dapat mematikan izin
   "tampil di atas aplikasi lain" atau membunuh service latar. Aplikasi menyediakan halaman
   **Diagnosa** untuk membaca kondisi nyata perangkat, bukan tombol yang berpura-pura memperbaiki.
3. Model VRM di atas ~20 MB dengan MToon + spring bone membebani GPU; aplikasi membatasi FPS dan
   menyediakan mode kualitas.

## 5. Model uji

Sampel uji: `VRM1_Constraint_Twist_Sample.vrm` dari repositori `pixiv/three-vrm`
(`packages/three-vrm/examples/models/`), 10,8 MB.

Metadata lisensi dari chunk JSON glTF (VRMC_vrm.meta), dibaca langsung dari berkas:

```
name: VRM1_Constraint_Twist_Sample
authors: ["pixiv Inc."]
copyrightInformation: "(c) 2022 pixiv Inc."
licenseUrl: https://vrm.dev/licenses/1.0/
avatarPermission: everyone
commercialUsage: corporation
allowRedistribution: true
modification: allowModificationRedistribution
creditNotation: unnecessary
allowAntisocialOrHateUsage: false
```

Artinya redistribusi dan modifikasi diizinkan. Model ini dipakai hanya sebagai **fixture uji**
(build debug + pengujian otomatis), bukan avatar produk.
