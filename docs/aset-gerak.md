# Aset gerak bawaan: sumber, lisensi, dan cara membuat ulang

## Ringkasan

Aplikasi membundel **4 klip animasi** yang bukan buatan saya dan bukan milik Mate Engine:

| Berkas | Klip asal | Durasi | Ukuran | SHA-256 |
| --- | --- | --- | --- | --- |
| `idle_loop.vrma` | `Idle_Loop` | 2,50 s | 36.455 B | `8691c79c0f0250b182360fb207bab95ccbd7728f43e573132cb1f0cb49b2e456` |
| `idle_talk.vrma` | `Idle_Talking_Loop` | 2,92 s | 41.401 B | `e04712ead5fda928bddf17a884332bcb14cb65fc6501a5d01ebd6bbabeded87a` |
| `walk_loop.vrma` | `Walk_Loop` | 1,33 s | 22.720 B | `af910e451df2d14be0da3b17ee6f52dce33b9268aa76de0c179bc913b71da0a0` |
| `dance_loop.vrma` | `Dance_Loop` | 1,00 s | 18.774 B | `71c579941616a463ee7da4972729d649379114a3f786f216782405ad4f0fa1f0` |

Total ± 119 KB. Karena kecil, klip ikut di APK sehingga avatar langsung bergerak tanpa impor manual.

## Sumber & lisensi

- **Asal klip**: Quaternius, *Universal Animation Library* —
  <https://quaternius.com/packs/universalanimationlibrary.html>
  (halaman menyebut **CC0**; 120+ klip humanoid, termasuk idle, jalan, tari, duduk).
- **Berkas yang saya unduh**: mirror GitHub `J-Ponzo/gltf-universal-animation-library`
  (`glTF/AnimationLibrary_Godot_Standard.gltf` + `.bin`, lisensi repo `CC0-1.0`).
- **Status hukum pemakaian di sini**: Quaternius mengizinkan aset dipakai dan disertakan di dalam
  produk (termasuk yang didistribusikan); yang dilarang adalah menjual/mendistribusikan ulang aset
  sebagai paket aset berdiri sendiri. Aplikasi ini menyertakan klip sebagai bagian dari produk, bukan
  sebagai paket animasi yang dijual — jadi pemakaian ini sesuai ketentuan.
- **Yang berubah**: berkas asli berformat glTF (rig `DEF-*`), saya retarget menjadi `.vrma`
  (VRM Animation) dengan `scripts/glb-ke-vrma.mjs`. Retargeting ini karya sendiri, bukan bagian dari
  paket asli.
- **Atribusi**: tidak diwajibkan oleh CC0, tetapi tetap dicantumkan di README dan halaman Pengaturan
  sebagai bentuk kejujuran provenance.

## Yang **tidak** dipakai

| Sumber | Alasan |
| --- | --- |
| Aset Mate Engine (`.anim`, `.mp3`, prefab, model) | `LICENSE.md` mereka melarang redistribusi aset; repo ini publik |
| Paket suara MIKU TEST v1 | rekaman pihak ketiga (Hatsune Miku) |
| Mixamo | boleh dipakai dalam proyek, tetapi tidak boleh didistribusikan sebagai library animasi |
| VRoid 7 paket `.vrma` gratis | lisensinya terikat pemakaian di VRoid Hub/aplikasi terkait; saya tidak menyalinnya, hanya menautkan sebagai saran impor pengguna |

## Cara membuat ulang

```bash
bash scripts/siapkan-klip-cc0.sh          # unduh + konversi ke app/src/main/assets/animations
```

Skrip memakai `api.github.com` (Contents API + Blobs API) karena `raw.githubusercontent.com` tidak
selalu tersedia di lingkungan build. Konversi dilakukan oleh `scripts/glb-ke-vrma.mjs`.

### Kenapa perlu retarget, bukan salin rotasi

Tulang rig sumber punya orientasi istirahat sendiri. Yang bisa dipindahkan ke VRM adalah
**perubahan orientasi terhadap pose istirahat** di ruang sejajar dunia:

```
delta_world(bone)   = W_anim × W_rest⁻¹
rotasi_normal(bone) = delta_world(parent)⁻¹ × delta_world(bone)
```

`rotasi_normal` adalah bentuk yang dipakai sendi humanoid ternormalisasi VRM, jadi hasilnya bisa
dipakai model VRM 0.x maupun 1.0.

## Verifikasi

`web/test/render-smoke.mjs` (berjalan di CI) memuat avatar VRM sungguhan lalu:

1. memutar klip bawaan `dance` dan memastikan ada `AnimationAction` aktif;
2. menghentikannya, lalu memastikan sudut lengan kembali **< 45°** dari vertikal
   (bukti perbaikan "tangan stuck di atas");
3. memutar `idle` dan memastikan rotasi lengan berubah antar-cuplikan (klip benar-benar bergerak).

Bila salah satu gagal, CI merah — bukan sekadar catatan di dokumen.
