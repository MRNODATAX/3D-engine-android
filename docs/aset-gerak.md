# Aset gerak bawaan: sumber, lisensi, dan cara membuat ulang

## Ringkasan

Aplikasi membundel **14 klip animasi** yang bukan buatan saya dan bukan milik Mate Engine:

| Berkas | Klip asal | Durasi | Ukuran | SHA-256 |
| --- | --- | --- | --- | --- |
| `idle_loop.vrma` | `Idle_Loop` | 2,50 s | 42.150 B | `3dd5cd9ea339fc9dc34348df928d4f85ba4fcbc2ffe6558087363ee9909704fb` |
| `idle_talk.vrma` | `Idle_Talking_Loop` | 2,92 s | 47.096 B | `660121d6dcd46456c66544e2192ad098ca40c285ce0d53dedcd3d091d428fd3f` |
| `walk_loop.vrma` | `Walk_Loop` | 1,33 s | 28.415 B | `21703b838c14605f99ab002395e56052d210cdc61c96394f2b17f308f651376c` |
| `dance_loop.vrma` | `Dance_Loop` | 1,00 s | 24.469 B | `a730f967f5e641aaad3ac400c1d2f4e87bddfc3bda0835672d6bbbc8054759be` |
| `interact.vrma` | `Interact` | 2,00 s | 36.255 B | `16fae05b4406863f10e87437fd8b0fc01778dc833130a572643816ecb151d476` |
| `idle_torch.vrma` | `Idle_Torch_Loop` | 1,25 s | 27.421 B | `cdb602f66d71025aad3bc5b7647e5b7b3bf22103fc5e629506985f7cfb604b1f` |
| `spell_idle.vrma` | `Spell_Simple_Idle_Loop` | 2,08 s | 37.255 B | `361932887be4602b8e81b9916b46d39a61a7174ff206472098b8fc3265552376` |
| `sitting_enter.vrma` | `Sitting_Enter` | 1,29 s | 27.930 B | `33318d0b628ec1367fb10c909279ba849c0215818ec1e1b55be08ba621ab55b5` |
| `sitting_idle.vrma` | `Sitting_Idle_Loop` | 1,67 s | 32.350 B | `feb5aafe12c74b3481ee0847f55270862d92944636bf83ac686b156c0a799f57` |
| `sitting_exit.vrma` | `Sitting_Exit` | 1,00 s | 24.471 B | `b13fdfb89530e803bbe7078c570917f1a109446efe2a8f4c5d2d3dbe1b69b6d7` |
| `sitting_talk.vrma` | `Sitting_Talking_Loop` | 2,92 s | 47.099 B | `2a4f359685c98727dc43ca550e0bfa9c8df2031fc09307ec77e0f6ea82e43a32` |
| `crouch_idle.vrma` | `Crouch_Idle_Loop` | 2,92 s | 47.098 B | `bfb7f8bc80ff4e2ce63d964d6a5dbfb9ef316aa0bc0980fa655c3c449f8ee80d` |
| `jump_start.vrma` | `Jump_Start` | 1,33 s | 28.416 B | `9a0bb3bbd8d4a1b2ccd5b4a0dc319fb785471f9c87e153e2d77e70fe5fbb26b4` |
| `jump_land.vrma` | `Jump_Land` | 1,25 s | 27.420 B | `c228386f2d2e42a42bc1a8adcfabc218831058e5942a0ccbebf7e87d8fd140e5` |

Total **477.845 byte (± 466,6 KB)** untuk 14 klip, di bawah anggaran 900 KB
(`web/test/vrma.test.mjs` gagal bila melewati). Karena kecil, klip ikut di APK sehingga avatar langsung
bergerak tanpa impor manual.

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

### Format `.vrma` yang benar (pelajaran dari kegagalan CI pertama)

Loader `VRMAnimationLoaderPlugin` (three-vrm) **tidak** menerima delta rotasi yang sudah dinormalkan.
Yang ia harapkan:

1. **hierarki tulang rig sumber beserta transformasi istirahatnya** ikut ditulis di berkas;
2. track rotasi berisi **rotasi lokal mentah** rig sumber — loader sendiri yang mengubahnya:

   ```
   rotasi_normal(bone) = W_rest(parent) × L(t) × W_rest(bone)⁻¹
   ```

3. track translasi **hanya** untuk `hips`, nilainya posisi lokal `hips` (bukan offset);
4. posisi istirahat `hips` **tidak boleh nol**: loader memakainya sebagai pembagi skala
   (`tinggiHipsVRM / tinggiHipsAnimasi`). Berkas versi pertama saya menulis node tanpa translasi,
   sehingga tinggi hips = 0 → skala `Infinity` → avatar lenyap dan uji render gagal dengan
   `silhouette (NaN)`.

Skrip sekarang menolak (exit non-zero) bila tinggi istirahat hips < 0,2 m, jadi kegagalan yang sama
tidak bisa lolos lagi.

## Verifikasi

`web/test/render-smoke.mjs` (berjalan di CI) memuat avatar VRM sungguhan lalu:

1. memutar klip bawaan `dance` dan memastikan ada `AnimationAction` aktif;
2. menghentikannya, lalu memastikan sudut lengan kembali **< 45°** dari vertikal
   (bukti perbaikan "tangan stuck di atas");
3. memutar `idle` dan memastikan rotasi lengan berubah antar-cuplikan (klip benar-benar bergerak).

Bila salah satu gagal, CI merah — bukan sekadar catatan di dokumen.

`web/test/vrma.test.mjs` (`npm run test:vrma`) menguji berkasnya tanpa browser: meniru matematika
loader, memastikan hierarki + tinggi hips wajar, tidak ada NaN, kuaternion bernorma 1, ayunan hips
masuk akal, lengan `idle_loop` berada di bawah (50–100° dari T-pose) dan `dance_loop` ≥ 2× lebih
banyak bergerak daripada idle. Total keempat klip dijaga < 1 MB.
