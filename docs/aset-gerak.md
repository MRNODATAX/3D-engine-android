# Aset gerak bawaan: sumber, lisensi, dan cara membuat ulang

## Ringkasan

Aplikasi membundel **4 klip animasi** yang bukan buatan saya dan bukan milik Mate Engine:

| Berkas | Klip asal | Durasi | Ukuran | SHA-256 |
| --- | --- | --- | --- | --- |
| `idle_loop.vrma` | `Idle_Loop` | 2,50 s | 48.841 B | `c97b6925865f1190fa1df44fea762c4e991839eb1e6f7872b2ca8d0ffd715629` |
| `idle_talk.vrma` | `Idle_Talking_Loop` | 2,92 s | 53.787 B | `653fdaac802344687afda2c23814ccf8825ca19b8101116b7623041d76342951` |
| `walk_loop.vrma` | `Walk_Loop` | 1,33 s | 35.106 B | `7676ca13b3a37d17a79ec36cb04f2c319861970525ba83eab0b27d535c60f0aa` |
| `dance_loop.vrma` | `Dance_Loop` | 1,00 s | 31.160 B | `06ecaf3951acfa84e18e636154e86304235c39f1027f67487eb95204a2597159` |

Total ± 165 KB (24 fps). Karena kecil, klip ikut di APK sehingga avatar langsung bergerak tanpa impor manual.

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
