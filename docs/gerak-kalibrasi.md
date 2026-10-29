# Kalibrasi gerak: hasil pembongkaran `.anim` Mate Engine

Dokumen ini dibuat dari **berkas animasi asli Mate Engine** yang dibaca langsung lewat GitHub API,
dianalisis dengan `scripts/analisis-anim.py`, lalu dipakai menyesuaikan `web/src/motion.js`.

Berkas `.anim` **tidak** disimpan di repo (lisensi Mate Engine melarang redistribusi aset). Yang
disimpan hanya hasil ukur di bawah dan skrip analisisnya.

## Metode

1. `.anim` adalah YAML Unity dengan blok `- curve:` berisi kurva otot humanoid
   (`attribute: Spine Left-Right`, `Head Turn Left-Right`, dan seterusnya).
2. Setiap kurva diambil pasangan `time`/`value`, lalu dihitung amplitudo, durasi, dan frekuensi
   dominan dengan DFT manual (tanpa numpy, supaya skrip jalan di mana saja).
3. Kurva dinormalisasi Unity ke −1..1. Konversi ke derajat memakai asumsi satu sumbu otot
   mewakili ±75°, **jadi angka derajat di bawah adalah perkiraan**, bukan nilai pasti. Yang akurat
   adalah angka frekuensi, durasi, dan perbandingan antar-kurva.

## Berkas yang diukur

| Klip | Kurva terbaca | Durasi |
| --- | --- | --- |
| `PET_IDLE.anim` | 131 | 2,45 s |
| `walk_cycle_sexy_01_light.anim` | 131 | 1,42 s |
| `PET_DANCING_2.anim` | 153 | 1,33 s |

## Yang diubah pada `motion.js` karena data ini

| Parameter | Sebelum | Sesudah | Alasan (terukur) |
| --- | --- | --- | --- |
| Napas dada | 1,5° @ 0,22 Hz | 1,1° @ 0,35 Hz | Chest Front-Back 1,1° @ 0,40 Hz |
| Napas tulang punggung | 0,5° | 2,2° | Spine Front-Back 2,3° @ 0,70 Hz |
| Goyangan badan | 1,3° @ 0,10 Hz | 4,3° @ 0,30 Hz | Spine Left-Right 5,1° @ 0,30 Hz |
| Pandangan kepala | ±15,8° | ±4,2° | Head Turn 4,2°, Head Nod 4,0° |
| Ayunan lengan diam | 2,6° | 1,1° | Left Arm Down-Up 1,1° |
| Langkah kaki | 24° @ 1,60 Hz | 31,5° @ 0,70 Hz | Kaki 36,5–38°, siklus 0,70 Hz |
| Tari: lengan | 46° | 39° @ 2,25 Hz | Lengan 36,8–39,1° @ 2,25–2,30 Hz |
| Tari: dada | 6,9° | 23° | Chest Front-Back 27,2° |

Kesan yang muncul setelah kalibrasi: gerakan diam jadi **lebih hidup di badan, lebih tenang di
kepala** — kebalikan dari versi pertama yang kepalanya menoleh ke sana kemari seperti mencari
sesuatu.

## Batas kejujuran

- Angka derajat adalah perkiraan dari pemetaan otot Unity, bukan hasil pengukuran visual.
- `PET_SLEEPING.anim` tidak terbaca kurvanya (klip itu menyimpan rotasi penuh, bukan kurva otot),
  jadi animasi tidur di aplikasi ini murni rancangan sendiri, bukan hasil kalibrasi.
- Tidak ada satu pun berkas `.anim`, `.mp3`, atau material Mate Engine yang masuk ke repo ini.

## Tabel lengkap hasil skrip

### PET_IDLE

| Kurva otot | Amplitudo (unit otot) | ± Derajat | Frekuensi (Hz) | Durasi (s) |
| --- | --- | --- | --- | --- |
| Left Upper Leg Front-Back | 0.282 | 10.6 | 0.00 | 2.45 |
| Right Upper Leg Front-Back | 0.187 | 7.0 | 2.90 | 2.45 |
| Spine Left-Right | 0.136 | 5.1 | 0.30 | 2.45 |
| Head Turn Left-Right | 0.112 | 4.2 | 0.50 | 2.45 |
| Head Nod Down-Up | 0.106 | 4.0 | 0.25 | 2.45 |
| Spine Front-Back | 0.060 | 2.3 | 0.70 | 2.45 |
| Chest Front-Back | 0.029 | 1.1 | 0.40 | 2.45 |
| Left Arm Down-Up | 0.029 | 1.1 | 0.30 | 2.45 |
| Right Arm Down-Up | 0.016 | 0.6 | 1.35 | 2.45 |

| Parameter kita | Sekarang | Terukur | Saran |
| --- | --- | --- | --- |
| walk / leftUpperLeg.x | 24.1° | 10.6° | turunkan ~0.4x |
| walk / rightUpperLeg.x | 24.1° | 7.0° | turunkan ~0.3x |
| sway / spine.z | 1.3° | 5.1° | naikkan ~4.1x |
| look / head.y | 15.8° | 4.2° | turunkan ~0.3x |
| look / head.x | 11.5° | 4.0° | turunkan ~0.3x |
| breath / spine.x | 0.5° | 2.3° | naikkan ~4.4x |
| breath / chest.x | 1.5° | 1.1° | pertahankan |
| arm / leftUpperArm.z | 2.6° | 1.1° | turunkan ~0.4x |

### walk_cycle_sexy_01_light

| Kurva otot | Amplitudo (unit otot) | ± Derajat | Frekuensi (Hz) | Durasi (s) |
| --- | --- | --- | --- | --- |
| Right Upper Leg Front-Back | 1.014 | 38.0 | 0.75 | 1.42 |
| Left Upper Leg Front-Back | 0.975 | 36.5 | 0.80 | 1.42 |
| Spine Left-Right | 0.271 | 10.1 | 0.65 | 1.42 |
| Head Turn Left-Right | 0.205 | 7.7 | 0.75 | 1.42 |
| Spine Front-Back | 0.045 | 1.7 | 1.55 | 1.42 |
| Head Nod Down-Up | 0.044 | 1.6 | 1.45 | 1.42 |
| Chest Front-Back | 0.033 | 1.3 | 2.75 | 1.42 |
| Left Arm Down-Up | 0.023 | 0.9 | 0.00 | 1.42 |
| Right Arm Down-Up | 0.023 | 0.9 | 0.75 | 1.42 |

| Parameter kita | Sekarang | Terukur | Saran |
| --- | --- | --- | --- |
| walk / rightUpperLeg.x | 24.1° | 38.0° | naikkan ~1.6x |
| walk / leftUpperLeg.x | 24.1° | 36.5° | naikkan ~1.5x |
| sway / spine.z | 1.3° | 10.1° | naikkan ~8.1x |
| look / head.y | 15.8° | 7.7° | turunkan ~0.5x |
| breath / spine.x | 0.5° | 1.7° | naikkan ~3.3x |
| look / head.x | 11.5° | 1.6° | turunkan ~0.1x |
| breath / chest.x | 1.5° | 1.3° | pertahankan |
| arm / leftUpperArm.z | 2.6° | 0.9° | turunkan ~0.3x |

### PET_DANCING_2

| Kurva otot | Amplitudo (unit otot) | ± Derajat | Frekuensi (Hz) | Durasi (s) |
| --- | --- | --- | --- | --- |
| Left Arm Down-Up | 1.043 | 39.1 | 2.30 | 1.33 |
| Right Arm Down-Up | 0.980 | 36.8 | 2.25 | 1.33 |
| Chest Front-Back | 0.725 | 27.2 | 0.60 | 1.33 |
| Left Upper Leg Front-Back | 0.720 | 27.0 | 3.00 | 1.33 |
| Right Upper Leg Front-Back | 0.694 | 26.0 | 2.90 | 1.33 |
| Head Turn Left-Right | 0.599 | 22.4 | 1.60 | 1.33 |
| Head Nod Down-Up | 0.433 | 16.2 | 3.00 | 1.33 |
| Spine Left-Right | 0.211 | 7.9 | 1.55 | 1.33 |
| Spine Front-Back | 0.088 | 3.3 | 3.05 | 1.33 |

| Parameter kita | Sekarang | Terukur | Saran |
| --- | --- | --- | --- |
| arm / leftUpperArm.z | 2.6° | 39.1° | naikkan ~15.2x |
| arm / rightUpperArm.z | 2.6° | 36.8° | naikkan ~14.3x |
| breath / chest.x | 1.5° | 27.2° | naikkan ~18.2x |
| walk / leftUpperLeg.x | 24.1° | 27.0° | pertahankan |
| walk / rightUpperLeg.x | 24.1° | 26.0° | pertahankan |
| look / head.y | 15.8° | 22.4° | pertahankan |
| look / head.x | 11.5° | 16.2° | pertahankan |
| sway / spine.z | 1.3° | 7.9° | naikkan ~6.3x |
