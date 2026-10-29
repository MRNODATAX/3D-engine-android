# Rencana: gerakan, suara, dan skala

Status: **rencana, belum dikerjakan.** Dokumen ini disusun dari pembacaan kode yang ada dan
sumber Mate Engine, bukan dari asumsi. Setiap klaim teknis menyebut berkas dan barisnya.

---

## 0. Diagnosis: kenapa terasa "tanpa gerakan" dan "tidak bisa dibesar-kecilkan"

### 0.1 Skala: bukan sekadar bug slider, ada dua sistem yang saling bertabrakan

| Lokasi | Perilaku sekarang |
| --- | --- |
| `OverlayGeometry.windowSize()` | Lebar **jendela** overlay = `scalePercent` × lebar layar, dikunci 25–100%, tinggi = 1,9 × lebar |
| `renderer.js:167 applyScale()` | Skala **model** di dalam jendela = `scalePercent / 100`, dikunci 0,25–1,5 |
| `renderer.js:151 frameModel()` | Kamera selalu memasang model agar mengisi tinggi jendela |

Akibatnya satu slider mengubah dua hal sekaligus:

1. Jendela mengecil **dan** model mengecil → pada 50% hasil akhirnya ≈ 25% dari ukuran awal,
   bukan 50%. Rentang efektifnya menyusut drastis, jadi terasa "tidak berubah".
2. `frameModel()` membingkai ulang kamera setiap model dimuat, sehingga perubahan skala setelah
   model tampil hanya mengubah ukuran objek di dalam bidikan yang sudah pas — bagian tubuh
   terpotong saat diperbesar, bukan bertambah besar di layar.
3. Tidak ada gestur **cubit-dua-jari** di overlay. Satu-satunya jalan adalah slider di Beranda,
   dan itu pun hanya berpengaruh setelah "Terapkan" memanggil `OverlayService.applySettings()`.

**Perbaikan yang diusulkan (Fase 0):**

- Pisahkan dua konsep: *ukuran jendela* (selalu cukup besar, mis. 60% layar, transparan) dan
  *skala model* (25–200%, bebas).
- `frameModel()` → hitung sekali "tinggi bidikan" acuan; `applyScale()` mengubah jarak kamera
  (`camera.position.z`), bukan `scene.scale`, sehingga model benar-benar membesar tanpa terpotong.
- Tambah **cubit dua jari** pada overlay (pinch) + umpan balik getar halus per 5%.
- Simpan skala sebagai float (`scalePercent` 25–200) dan tampilkan angka live di Beranda
  ("Ukuran 135%") supaya perubahan bisa diverifikasi mata.
- Uji unit baru: `OverlayGeometryTest` untuk rentang 25–200 dan kamus pinch → persen.

### 0.2 Gerakan: yang ada sekarang hanya napas dan kedip

`renderer.js:332 updateIdle()` hanya melakukan:

- `applyRelaxedPose()` — pose rileks statis (lengan turun);
- `chest.rotation.x = sin(t·1.15)·0.0072` — napas;
- `spine.rotation.z = sin(t·0.6)·0.008` — goyangan sangat kecil.

Itu 2 derajat-an getaran halus: secara visual **hampir diam**. Tidak ada perpindahan berat badan,
tidak ada gerak kepala, tidak ada ayunan lengan, tidak ada reaksi sentuhan. `.vrma` hanya berputar
bila pengguna mengimpor berkas sendiri — dan aplikasi tidak menyertakan satu pun.

Mate Engine punya lapisan gerak yang jauh lebih kaya (dari daftar 278 skrip):

| Skrip Mate Engine | Perannya |
| --- | --- |
| `AvatarLocomotionController` | keadaan diam ↔ jalan |
| `AvatarSwayController` | goyangan tubuh saat menganggur |
| `AvatarGravityController` | jatuh/bergantung di tepi layar |
| `AvatarSleepController` | tidur setelah lama tidak disentuh |
| `AvatarAnimatorController` | state machine animasi |
| `UniversalBlendshapes`, `BlendshapeManager` | ekspresi wajah |
| `PetVoiceReactionHandler` + `PetRegionOverride` | reaksi per area sentuh (kepala, telinga, badan) |

### 0.3 Suara: yang ada hanya nada sintetis

`VoicePack.kt` sudah benar strukturnya (event → klip), tetapi klip bawaannya nada 55–120 ms hasil
sintesis. Tidak ada ucapan, tidak ada reaksi vokal. `SpeechController` memakai TTS perangkat yang
suaranya robotik dan tidak selalu tersedia untuk bahasa Indonesia.

---

## 1. Batasan yang tidak bisa dilanggar (dan jalan keluarnya)

`LICENSE.md` Mate Engine menolak redistribusi aset: audio, model, tekstur, animasi. Paket
`MIKU TEST v1` adalah rekaman pihak ketiga. Artinya **tidak boleh** menyalin `.anim`, `.mp3`, atau
`.wav` Mate Engine ke repo publik ini.

Maka "reverse engineering" di sini saya artikan secara teknis dan jujur:

> Membongkar berkas `.anim` Mate Engine (YAML Unity) untuk **mengukur** parameter geraknya —
> amplitudo, frekuensi, durasi transisi, urutan sendi — lalu **menulis ulang** gerakan itu sebagai
> generator prosedural milik kita sendiri. Data turunan (angka), bukan berkas aslinya.

Ini menghasilkan gerakan yang terasa mirip tanpa membawa satu byte pun aset berhak cipta. Untuk
pengguna yang memang punya Mate Engine, aplikasi tetap menyediakan jalur **impor `.vrma`/voice pack
milik sendiri** (sudah ada untuk `.vrma`, akan dilengkapi untuk audio).

---

## 2. Fase pekerjaan

### Fase 0 — Perbaikan skala (½ hari)
1. Pisahkan jendela dan model seperti §0.1.
2. Slider 25–200% + label angka live + tombol "Pas" (reset 100%).
3. Pinch-to-zoom di overlay, tersimpan otomatis.
4. Uji unit rentang + CI.

**Kriteria terima:** menggeser slider dari 50% ke 200% membuat avatar di layar jelas ~4× lebih
besar, tanpa kepala terpotong, dan nilainya bertahan setelah overlay dimatikan/dinyalakan.

### Fase 1 — Mesin gerak prosedural (inti "tidak boring") (2–3 hari)
Menulis `web/src/motion.js`:

| Lapisan | Isi | Padanan Mate Engine |
| --- | --- | --- |
| `idle` | berat badan bergeser kiri–kanan 0,25 Hz, pinggul ikut, lengan menyilang halus | `AvatarSwayController` |
| `breath` | dada + bahu, 0,22 Hz, amplitudo 3× lebih besar dari sekarang | bawaan |
| `look` | kepala + mata mengikuti arah acak tiap 4–9 detik, mendongak saat "mengobrol" | `HeadTracking` (tidak ada di port) |
| `blink` | kedip ganda sesekali, kedip pelan saat mengantuk | `UpdateBlink` |
| `sleep` | setelah 3 menit tanpa interaksi: bahu turun, kepala miring, kedip melambat | `AvatarSleepController` |
| `walk` | siklus jalan di tempat, 1,6 Hz, lengan berlawanan fase, pinggul naik-turun 2 cm | `PET_LOCOMOTION` |
| `dance` | 3 varian pendek (bob, sway, spin), dipicu manual | `enableDancingToggle` |
| `react` | kejut saat digeser, senang saat kepala disentuh, malu saat perut disentuh | `PetVoiceReactionHandler` |

Semua lapisan di-blend dengan bobot (bukan menimpa), memakai spring damping seperti M3 Expressive
agar perpindahan antar-keadaan tidak patah. Spring bone VRM otomatis bereaksi karena kita
menggerakkan parent-nya.

**Kriteria terima:** video 15 detik tanpa interaksi memperlihatkan minimal 4 jenis gerak berbeda;
tidak ada sendi yang melengkung mustahil (uji rentang rotasi per sendi).

### Fase 2 — Reverse engineering `.anim` untuk kalibrasi (1–2 hari)
Skrip `scripts/analisis-anim.py`:

1. Parse YAML `.anim` Unity → ambil `m_MuscleClip` / kurva otot humanoid
   (`Spine Front-Back`, `Left Arm Down-Up`, dst.).
2. Konversi nilai otot (−1..1) → sudut, hitung amplitudo, frekuensi dominan (FFT sederhana),
   durasi ramp.
3. Bandingkan dengan parameter `motion.js`, tulis tabel selisih ke `docs/gerak-kalibrasi.md`.
4. Sesuaikan angka `motion.js` agar mendekati karakter Mate Engine.

Berkas `.anim` tetap **tidak** masuk repo. Yang masuk hanya tabel angka dan skrip analisisnya.

### Fase 3 — Suara (2 hari)
Tiga lapis, bisa dipilih pengguna:

| Lapis | Cara kerja | Status |
| --- | --- | --- |
| **A. Gemini TTS** | `gemini-2.5-flash-preview-tts` + `responseModalities: ["AUDIO"]`, balasan WAV 24 kHz diputar `MediaPlayer`; pakai kunci Gemini yang sudah tersimpan | Terverifikasi di dokumentasi Google ([docs](https://ai.google.dev/gemini-api/docs/generate-content/speech-generation)) |
| **B. Voice pack sendiri** | impor folder/berkas ke `files/voicepack/`, pemetaan per event + tombol "Dengarkan" | Sudah ada fondasinya di `VoicePack.kt` |
| **C. Nada sintetis** | yang sekarang, tetap sebagai fallback offline | Ada |

Lip-sync: amplitudo audio (RMS per 50 ms) → `expressionManager.setValue('aa', x)` supaya mulut
bergerak sesuai suara, bukan pola sinus buta seperti sekarang.

**Kriteria terima:** balasan chat berbunyi dalam bahasa Indonesia dengan mulut bergerak sinkron;
bila kunci tidak ada, jatuh ke TTS perangkat lalu ke nada, tanpa crash.

### Fase 4 — Verifikasi & rilis
- Uji render menambah pemeriksaan: setelah 10 detik diam, ada ≥3 sendi yang berubah > 2°.
- Tangkapan layar emulator: Beranda (slider 200%), overlay diam 10 detik, overlay saat chat.
- Rilis `v0.1.4-test`, dokumentasi diperbarui.

---

## 3. Risiko

| Risiko | Dampak | Mitigasi |
| --- | --- | --- |
| Gerakan prosedural terlihat "gemetar" | terlihat murah | semua amplitudo dalam derajat kecil, diuji di emulator + perangkat |
| Spring bone berlebihan saat skala besar | rambut menembus badan | batasi `springBoneUpdate` saat delta besar, damping naik |
| Gemini TTS berbayar per karakter | biaya pengguna | hanya balasan chat yang dibacakan, batas 600 karakter, bisa dimatikan |
| Pinch di overlay bertabrakan dengan drag | sulit digeser | dua jari = skala, satu jari = geser; ambang 8 px |

## 4. Yang tidak dikerjakan di ronde ini

Duduk di jendela/taskbar, food system, alarm, Minecraft/Discord RPC, head tracking kamera depan.
Alasannya: butuh izin kamera / integrasi luar yang jauh lebih besar dari permintaan sekarang.
