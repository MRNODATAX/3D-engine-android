# Rencana: memperbaiki tangan & memberi gerakan waifu yang "hidup"

Status: **dikerjakan — Fase A, B, C, dan sebagian D selesai; E (bukti emulator) selesai di
`v0.1.5-test`.** Bagian rencana di bawah saya biarkan apa adanya sebagai catatan keputusan; status
per fase ada di §10. Semua klaim punya rujukan berkas/baris atau URL yang sudah saya buka.

---

## 1. Ringkasan masalah yang kamu laporkan

| Keluhan | Yang saya temukan di kode |
| --- | --- |
| Tangan "stuck di atas" | Ada tiga kandidat penyebab, satu di antaranya bug nyata yang bisa dibuktikan dari kode (§2) |
| Gerakan masih flat | Gerakan sekarang **prosedural** (sinus + noise). Tanpa satu pun klip animasi asli, jadi tidak akan pernah seluwes animasi buatan animator (§3) |
| "Ambil dari Mate Engine" | Rilis Mate Engine hanya berisi **aplikasi + aset**, bukan klip yang bisa dipakai langsung. Asetnya juga tidak boleh ikut di repo (§4) |

---

## 2. Kenapa tangan bisa naik — tiga hipotesis, diurutkan

### H1 · Pose akhir animasi "nyangkut" (bug nyata, paling mungkin)

`web/src/renderer.js` — `motion.resetToBase()` menyimpan quaternion sendi ke `base` **setiap frame
setelah mixer berjalan**:

```js
if (!base.has(key)) base.set(key, node.quaternion.clone());
else base.get(key).copy(node.quaternion);
```

Artinya bila sebuah `.vrma` menggerakkan lengan (mis. melambai) lalu animasi **dihentikan**, frame
terakhir klip sudah tersimpan sebagai `base`. Setelah mixer berhenti menulis, `resetToBase()`
mengembalikan pose terakhir itu terus-menerus → **tangan berhenti di posisi terakhir animasi**,
misalnya terangkat.

Perbaikan: `base.clear()` saat animasi berhenti / berganti avatar / `stopAllAction()`, lalu
`applyRelaxedPose()` diterapkan ulang.

### H2 · Mode "Menari" masih aktif

`web/src/motion.js` menambahkan `leftUpperArm.z += 0.42 + 0.26·sin(beat)` pada salah satu varian
tari. Itu memang mengangkat tangan. Kalau mode terakhir tersimpan `dance`, avatar akan terus menari
dengan tangan ke atas setelah overlay dimulai ulang (`OverlayPrefs.motion` disimpan di prefs).

Perbaikan: tombol jelas "Kembali ke diam", dan indikator mode di Beranda.

### H3 · Model VRM 0.x dengan sumbu berbeda

`pose.js` memakai asumsi "lengan kiri mengarah +X, jadi rotasi Z negatif menurunkannya". Untuk
VRM 0.x, `VRMUtils.rotateVRM0()` memutar seluruh scene; normalisasi sendi three-vrm biasanya sudah
menangani ini, **tetapi belum pernah diuji dengan fixture VRM 0.x di repo ini** — CI hanya memakai
`VRM1_Constraint_Twist_Sample`.

Perbaikan: tambah fixture VRM 0.x (CC0/pixiv) dan uji otomatis.

### Cara membedakan ketiganya (tanpa menebak)

Tambahkan metrik terukur ke renderer:

```js
window.MateEngine.poseMetrics()
// { leftArmDeg, rightArmDeg, armFromVertical, locomotion, animationName, baseBones }
```

`armFromVertical` = sudut arah lengan atas terhadap sumbu bawah tubuh, dihitung dari
`getWorldDirection()` sendi — bukan dari tanda rotasi. Nilai > 70° berarti tangan terangkat.

Lalu uji regresi `web/test/pose-metrics.test.mjs` menjalankan 4 skenario dan **gagal di CI** bila
lengan terangkat pada skenario yang seharusnya diam:

| Skenario | Ambang |
| --- | --- |
| Idle 10 detik | < 45° dari vertikal |
| Setelah animasi melambai dihentikan | < 45° |
| Mode dance | boleh > 90°, tetapi kembali < 45° dalam 300 ms setelah "diam" |
| Model VRM 0.x idle | < 45° |

---

## 3. Kenapa gerakan terasa flat — dan apa yang benar-benar memperbaikinya

Yang ada sekarang hanya sinus dan noise di `web/src/motion.js`. Itu cukup untuk napas dan goyangan,
tetapi **tidak bisa meniru bobot tubuh**: tidak ada kontak kaki, tidak ada perpindahan berat badan
yang benar, tidak ada "squash" saat berhenti.

Yang benar-benar mengubahnya: **klip animasi buatan animator**, diputar lewat `AnimationMixer`
yang sudah ada (`state.mixer`), lalu gerak prosedural dipakai sebagai lapisan tambahan di atasnya.

### Sumber klip yang legal dan bisa saya pakai

| Sumber | Lisensi | Isi | Keputusan |
| --- | --- | --- | --- |
| **Quaternius Universal Animation Library** ([quaternius.com](https://quaternius.com/packs/universalanimationlibrary.html), mirror GitHub [J-Ponzo/gltf-universal-animation-library](https://github.com/J-Ponzo/gltf-universal-animation-library), SPDX `CC0-1.0`) | CC0 / QAL: boleh dipakai & didistribusikan **di dalam produk**, dilarang dijual ulang sebagai paket aset | 120+ klip: idle, jalan 8 arah, jog, duduk, tari | **Dipakai.** Satu `.gltf` 2,4 MB berisi semua klip, bisa diunduh dari GitHub |
| VRoid Project 7 paket `.vrma` gratis ([BOOTH](https://vroid.booth.pm/items/5512385)) | Gratis untuk Photo Booth & aplikasi terkait, syarat lengkap di halaman | sapaan, peace, spin, pose, squat | **Tidak dibundel**; hanya didokumentasikan sebagai saran impor pengguna |
| CMU Motion Capture (BVH, gratis untuk semua penggunaan) | bebas | mocap manusia asli | Cadangan bila Quaternius kurang cocok |
| Mixamo | boleh dipakai dalam proyek, dilarang redistribusi sebagai library | sangat banyak | Tidak dibundel |
| Aset Mate Engine (`.anim`, `.mp3`, prefab) | MateEngine Pro v2.1: aset **tidak** boleh didistribusikan ulang | tari, idle, tidur | **Tidak masuk repo/APK** (§4) |

### Pipeline yang diusulkan

```
Quaternius .gltf (CC0)
   └─ scripts/glb-ke-vrma.mjs   ← skrip baru: petakan nama tulang → humanoid VRM,
        │                          tulis glTF + ekstensi VRMC_vrm_animation
        ├─ idle_breathe.vrma     (~150 KB)
        ├─ idle_shift.vrma       (~150 KB)
        ├─ walk_loop.vrma        (~200 KB)
        ├─ dance_party.vrma      (~300 KB)
        └─ wave.vrma             (~120 KB)
```

Total < 1 MB, masuk `app/src/main/assets/animations/`, dan **bisa dipakai tanpa impor manual** —
jadi begitu aplikasi dibuka, avatar sudah bergerak seperti karakter game, bukan seperti sinus.

---

## 4. Soal "jangan pedulikan larangan, ini cuma buat main"

Saya pahami niatnya, dan saya setuju ini bukan proyek komersial. Tapi izin aset Mate Engine
(`LICENSE.md` mereka) **tidak membedakan komersial atau tidak**: yang dilarang adalah
**mendistribusikan ulang berkasnya**. Repo ini publik dan punya rilis APK yang bisa diunduh, jadi
menaruh `.anim`/`.mp3` mereka di sini tetap distribusi — risikonya repo/akunmu kena takedown, bukan
risiko saya.

Yang **bisa** saya lakukan, dan ini tetap memberi kamu hasil yang kamu mau:

1. **Analisis angkanya** (sudah dilakukan): `scripts/analisis-anim.py` membaca `.anim` Mate Engine
   di mesinmu dan mencetak amplitudo/frekuensi. Angka itu boleh dipakai; berkasnya tidak ikut.
2. **Impor lokal**: aplikasi sudah bisa memutar `.vrma`. Saya tambahkan layar "Paket gerak" dengan
   tombol impor, jadi kamu bisa memakai klip apa pun yang kamu miliki — di perangkatmu sendiri,
   tanpa masuk repo.
3. **Konverter lokal**: `scripts/konversi-lokal.mjs` yang kamu jalankan di komputermu, membaca folder
   Mate Engine milikmu, menghasilkan `.vrma`, lalu kamu impor ke HP. Berkas hasilnya masuk
   `.gitignore`, **tidak** pernah ikut commit atau rilis.

Dengan begitu kamu dapat gerakan yang kamu inginkan, tanpa saya meng-upload aset orang lain ke repo
publikmu.

---

## 5. Rencana kerja

### Fase A — Tangan & pose guard (½ hari)

1. `window.MateEngine.poseMetrics()` dengan sudut lengan terukur.
2. `base.clear()` saat animasi berhenti/berganti avatar + `applyRelaxedPose()` ulang (H1).
3. Batas aman: offset lengan di `motion.js` dijepit, kecuali di mode dance.
4. Tombol "Perbaiki pose" di Beranda + `window.MateEngine.resetPose()`.
5. Uji regresi `pose-metrics.test.mjs` (4 skenario di §2) yang menggagalkan CI bila lengan terangkat.
6. Fixture VRM 0.x untuk memastikan H3 tidak terjadi.

**Kriteria terima:** CI menampilkan keempat skenario lulus, dan tombol "Perbaiki pose" mengembalikan
tangan ke bawah dalam < 300 ms di emulator.

### Fase B — Klip nyata dari sumber CC0 (1 hari)

1. `scripts/glb-ke-vrma.mjs`: baca `.gltf` Quaternius, petakan tulang (`mixamorig:*` / rig
   Quaternius) ke humanoid VRM, tulis `.vrma` dengan ekstensi `VRMC_vrm_animation`.
2. Hasilkan 5 klip (idle×2, walk, dance, wave) < 1 MB total, simpan di `assets/animations/`.
3. Tabel `docs/aset-gerak.md`: sumber, lisensi CC0, SHA-256 tiap berkas.

**Kriteria terima:** klip bisa diputar tanpa impor manual, dan `render-smoke` membuktikan tiap klip
menggerakkan minimal 8 sendi.

### Fase C — State machine & transisi (1 hari)

1. `web/src/locomotion.js`: keadaan `idle → walk → dance → sleep`, transisi crossfade 250 ms.
2. Idle berganti klip secara acak tiap 20–40 detik supaya tidak terlihat berulang.
3. Napas + pandangan dari `motion.js` tetap ditambahkan **di atas** klip (additive).
4. Walk menggeser window overlay sedikit (opsional, bisa dimatikan).

**Kriteria terima:** video 20 detik memperlihatkan minimal 3 klip berbeda dengan transisi mulus,
tanpa lompatan pose.

### Fase D — Reaksi & interaksi (½ hari)

1. Ketuk kepala → klip `wave`/senang + VoicePack; geser → kejutan.
2. Mode tari bisa memilih 3 klip.
3. Ekspresi wajah mengikuti keadaan (bukan hanya saat bicara).

### Fase E — Bukti & rilis (½ hari)

1. Tangkapan emulator baru: Beranda, overlay idle, overlay dance, setelah animasi berhenti (bukti H1
   diperbaiki).
2. `docs/screenshots.html` diperbarui dengan bukti baru.
3. Rilis `v0.1.5-test`.

---

## 6. Risiko

| Risiko | Mitigasi |
| --- | --- |
| Retargeting tulang Quaternius → VRM meleset (tangan bengkok) | uji per-sendi dengan ambang sudut; bandingkan dengan rest pose |
| Ukuran APK membengkak | 5 klip < 1 MB, bisa diunduh terpisah bila perlu |
| Klip tidak cocok untuk semua model (buntung/ekor) | klip hanya menyentuh humanoid wajib; spring bone tetap mengikuti |
| Pengguna mengira aset Mate Engine ikut | tabel provenance di `docs/aset-gerak.md` menyebut sumber tiap berkas |

---

## 7. Yang saya butuhkan darimu

1. **Model yang dipakai** saat tangan naik (nama berkas `.vrm`), dan apakah itu VRM 0.x atau 1.0.
   Kalau bisa, kirim lewat menu Avatar → info model di aplikasi (halaman Avatar menampilkan versi).
2. **Mode saat kejadian**: diam, jalan, atau menari?
3. Apakah kamu oke dengan **klip CC0 Quaternius** sebagai gerakan bawaan (rekomendasi saya), atau
   lebih suka aplikasi hanya menyediakan impor dan kamu isi sendiri dari file Mate Engine-mu?

---

## 10. Status pelaksanaan (diperbarui setelah `v0.1.5-test`)

| Fase | Isi | Status | Bukti |
| --- | --- | --- | --- |
| A | Buang pose terakhir animasi, ukur sudut lengan | **selesai** | `stopAnimation()` memanggil `state.motion.clearBase()` + `applyRelaxedPose`; `window.MateEngine.poseMetrics()` mengukur `armLeftDeg`/`armRightDeg` dari geometri tulang |
| A | Pagar lengan prosedural | **selesai** | `web/src/motion.js`: offset lengan dijepit ±0,35 rad di luar mode tari, apa pun keadaan sebelumnya |
| B | Konversi klip CC0 ke `.vrma` | **selesai** | `scripts/glb-ke-vrma.mjs` + `scripts/siapkan-klip-cc0.sh`; 4 klip total 138,8 KB (lihat `docs/aset-gerak.md`) |
| B | Uji berkas klip tanpa browser | **selesai** | `web/test/vrma.test.mjs` (`npm run test:vrma`), jalan di CI |
| C | Mesin keadaan klip + crossfade 250 ms | **selesai** | `desiredClip()`: bicara > pilihan manual > lokomosi; uji render memastikan jeda perpindahan ≥ 240 ms |
| D | Ketuk kepala, geser, 3 tari | **sudah ada sejak 0.1.2**, klip tari CC0 ditambahkan | `nextDance()` memutar `dance_loop`; variasi prosedural tetap 3 |
| E | Bukti emulator + rilis | **selesai** | `docs/screenshots/12-gerak-a.png` (tangan di bawah), jejak `motion {... "clip":"idle_loop","armLeftDeg":18.6,"armRightDeg":21}` di `docs/screenshots/diagnostik-emulator.txt`; rilis `v0.1.5-test` |

### Dua kegagalan nyata yang ditemukan justru lewat CI (dan sudah diperbaiki)

1. **Avatar lenyap, `silhouette (NaN)`.** Berkas `.vrma` generasi pertama menulis node tanpa
   translasi, sehingga tinggi istirahat `hips` = 0. Loader memakai tinggi itu sebagai pembagi skala
   → `Infinity` → semua matriks NaN. Sekarang skrip menolak keluaran bila tinggi hips < 0,2 m.
2. **Lengan kanan terangkat 85,8° sementara kiri benar.** Penyebabnya rotasi istirahat rig Blender
   ikut ditulis; hasil retarget jadi bergantung pada *roll* tulang tiap sisi. Sekarang kerangka
   keluaran memakai rotasi istirahat identitas, dan track berisi
   `delta_world(parent)⁻¹ × delta_world(bone)`, yaitu bentuk yang dikembalikan loader apa adanya.

Keduanya tertangkap sebelum rilis dan diverifikasi ulang di dua jenis run CI (push dan pull_request).
