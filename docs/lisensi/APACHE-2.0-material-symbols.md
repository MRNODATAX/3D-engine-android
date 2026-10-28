# Material Symbols — Apache License 2.0

Ikon tab navigasi dan ikon aksi di aplikasi ini berasal dari **Material Symbols (outlined)**
milik Google, diambil dari <https://github.com/google/material-design-icons>.

- Berkas sumber: `symbols/web/<nama>/materialsymbolsoutlined/<nama>_24px.svg`
- Berkas hasil: `app/src/main/res/drawable/ic_symbol_<nama>.xml` (Vector Drawable, dibuat oleh
  `scripts/siapkan-ikon-simbol.sh`, bukan disunting tangan)
- Lisensi: **Apache License, Version 2.0** — <https://www.apache.org/licenses/LICENSE-2.0>
- Perubahan yang dilakukan: SVG 960×960 diubah menjadi Android Vector Drawable (offset `viewBox`
  dipindah ke `<group translate>`, warna diisi `#FF000000` lalu di-tint di aplikasi).

Ikon dipakai apa adanya sebagai glyph (tanpa perubahan bentuk). Tidak ada aset Mate Engine
desktop yang disalin.

## Daftar ikon yang dibundel

| Nama | Dipakai untuk |
| --- | --- |
| `home` | tab Beranda |
| `person` | tab Avatar |
| `chat_bubble` | tab Chat (pengganti ikon surat `Email` yang semantiknya salah) |
| `animation` | tab Animasi (pengganti segitiga putar) |
| `settings` | tab Setelan |
| `troubleshoot` | halaman Diagnosa |

Menambah ikon baru: jalankan `scripts/siapkan-ikon-simbol.sh <nama> [<nama>…]`, lalu catat di tabel
ini.
