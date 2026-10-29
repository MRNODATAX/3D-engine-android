# Chat waifu & performa renderer

Dokumen ini menjelaskan apa yang **diport** dari sumber Mate Engine, apa yang **tidak** dipakai
karena lisensi, dan bagaimana setiap klaim bisa diperiksa ulang. Tidak ada fitur di bawah ini
yang ditandai "selesai" hanya karena kodenya ditulis: status verifikasi dicantumkan terpisah.

## 1. Ringkasan keputusan

| Kebutuhan | Sumber di Mate Engine | Yang dipakai di aplikasi ini |
| --- | --- | --- |
| Chat dengan waifu | `Assets/LLMUnity/*` (LLM lokal Qwen 2.5 1.5B) | **Diganti** Gemini REST API dengan **kunci milik pengguna** |
| Persona siap pakai | `AISystemPromptBinder.cs` (prompt teks yang bisa diedit) | Pola yang sama: `Persona` + `PersonaPrompt.build()`, dapat diedit di UI |
| Suara reaksi | `MEVoicePack.cs` (klip per event, bukan TTS) | `VoicePack.kt`: sistem event yang sama; **audio disintesis sendiri** |
| Ucapan balasan | tidak ada di Mate Engine (tidak ada TTS) | `SpeechController.kt` memakai TTS perangkat (opsional) |
| Gerak/animasi | `AvatarAnimatorController`, `PET_LOCOMOTION/*.anim`, `.vrma` | Tetap memakai **berkas `.vrma` milik pengguna**; tidak ada `.anim` yang disalin |
| Batas FPS | `FPSLimiter.cs` | `targetFps` 15–60, `setTargetFps()` di renderer |
| Pemangkasan memori | `MemoryTrim.cs` (GC + `UnloadUnusedAssets`) | `onTrimMemory()` + trim berkala 10 menit + `trimMemory()` renderer |
| Statistik model | `RuntimeModelStats.cs` | `collectStats()`: triangles, draw call, tekstur, tulang, spring joint |

## 2. Lisensi: mengapa tidak ada aset yang disalin

`LICENSE.md` Mate Engine (MateEngine Pro License v2.1) menyatakan:

- kode berlisensi AGPL + MateProv2: distribusi hanya boleh dengan lisensi yang sama, tanpa komersial;
- **aset (audio, visual, model, tekstur, animasi) tidak boleh didistribusikan ulang atau dijual**;
- paket suara `Assets/MATE ENGINE - VOICE PACKS/MIKU TEST v1/` adalah rekaman pihak ketiga
  (Hatsune Miku) dan tidak boleh disebarkan dalam bentuk apa pun.

Karena itu:

1. **Tidak ada** berkas `.mp3`, `.wav`, `.anim`, material, atau prefab dari repo Mate Engine di
   dalam APK ini.
2. Suara bawaan aplikasi **dibuat sendiri secara prosedural** (nada pendek yang dihasilkan
   skrip) dan disimpan di `app/src/main/res/raw/me_*.wav`.
3. Pengguna dapat menaruh pack suara sendiri di `files/voicepack/` dengan nama berkas sesuai
   kunci event (`ui_click`, `drag_start`, `drag_stop`, `bubble_on`, `bubble_off`, `chat_blip`,
   `chat_stream`; format mp3/ogg/wav/m4a).
4. Seluruh kode Kotlin/JS di repo ini adalah implementasi baru; tidak ada berkas `.cs` Mate
   Engine yang disalin. Yang diambil adalah **pola perilaku** (event suara, batas FPS, trim
   memori), yang boleh dipelajari dan diimplementasikan ulang.

## 3. Chat

### Alur

1. Pengguna menekan **Chat** → mengisi API key Gemini.
2. Kunci dienkripsi AES-GCM dengan kunci di **Android Keystore** (`SecretStore.kt`) dan hanya
   dikirim ke `generativelanguage.googleapis.com` saat mengirim pesan.
3. `GeminiClient.generate()` memanggil `POST /v1beta/models/{model}:generateContent` dengan
   header `x-goog-api-key`, `systemInstruction` dari persona, dan riwayat maksimal 24 pesan
   (`PersonaPrompt.trimHistory`).
4. Balasan ditambahkan ke riwayat lokal (`ChatRepository`), avatar menandai "berbicara"
   (`window.MateEngine.startTalking`) dan VoicePack memutar klip `chat_stream`.
5. Jika TTS aktif, `SpeechController` membacakan balasan memakai mesin TTS perangkat.

### Persona default (sudah terisi)

- Nama: `Waifu`, memanggil pengguna `Kamu`
- Kepribadian: hangat, perhatian, suka bercanda ringan, setia menemani
- Gaya: kalimat pendek, santai, tidak berlebihan; bahasa Indonesia
- Aturan: maksimal 3 kalimat, tetap dalam karakter, tidak mengarang fakta, menolak konten
  seksual eksplisit/ujaran kebencian

Semua field bisa diubah lewat dialog **Persona**; nilai kosong akan dikembalikan ke default.

### Penanganan galat

`GeminiErrorMapper` memetakan kode HTTP/`error.status` menjadi kalimat yang bisa ditindaklanjuti
(kunci ditolak, model tidak dikenal, kuota habis, server 5xx, jaringan mati, balasan diblokir
filter keamanan). Pesan asli server ditampilkan sebagai petunjuk, bukan disembunyikan.

## 4. Performa

| Optimasi | Implementasi | Bukti |
| --- | --- | --- |
| Batas FPS | `setTargetFps` → loop `requestAnimationFrame` diperketat | angka `fps` di Diagnosa |
| Resolusi adaptif | `perf.js` governor: turun bila kerja frame > 92% anggaran, naik bila < 55% | event `quality-change` di logcat |
| Pixel ratio | `qualityCap()` 1.0 / 1.5 / devicePixelRatio | `Resolusi render` di Diagnosa |
| Downscale tekstur | `downscaleTextures()` batas 512/1024/2048 px | event `textures` di logcat |
| Statistik nyata | `collectStats()` dari `renderer.info` + skeleton | panel "Performa renderer" |
| Hemat memori | `onTrimMemory`, trim 10 menit, tombol "Pangkas" | log `trim memori` |

Governor diuji tanpa GPU di `web/test/perf.test.mjs` (dijalankan pada CI Build → langkah
"Uji logika performa").

## 5. Status verifikasi

| Bagian | Status | Bukti |
| --- | --- | --- |
| Uji governor performa | lulus lokal | `node test/perf.test.mjs` |
| Build APK | lihat run CI terakhir | tab Actions |
| Chat dengan kunci asli | **belum diverifikasi** | perlu kunci Gemini milik pengguna; tidak ada kunci di CI |
| TTS perangkat | **belum diverifikasi di perangkat** | emulator CI tidak dijamin punya mesin TTS bahasa Indonesia |
| Gemini TTS + lip-sync | **kode + uji unit lulus, belum diuji dengan kunci asli** | `GeminiTtsTest` menguji parsing WAV 24 kHz dan amplop RMS; panggilan jaringan butuh kunci |
| Mesin gerak | **lulus uji headless + bukti emulator** | `motion.test.mjs` (6 skenario) dan `12-gerak-a/b.png` berbeda |
| Skala 25–100% | **terbukti di emulator** | `13-overlay-skala-100.png` vs `14-overlay-skala-40.png` |

Bagian yang belum diverifikasi **tidak** diklaim berfungsi. Untuk mengujinya: pasang APK debug,
buka tab Chat, isi kunci, kirim satu pesan.
