# Rencana v0.1.10 — sentuhan kaya, gaya reaktif, bingkai, dan rotasi

**Status: RENCANA, belum ada kode yang diubah.** Versi terbit sekarang `v0.1.9-test`
(`versionCode 9`). Ronde ini menargetkan `versionCode 10` / `0.1.10`, rilis uji baru di GitHub
Releases (tag lama tidak bisa dipakai ulang — job rilis akan *skipped*).

Permintaan yang dijawab dokumen ini:

1. Sentuhan pada area sensitif (pinggul/kemaluan) memberi **gerakan + suara** reaksi, mirip
   perilaku Mate Engine.
2. Gaya jadi **jauh lebih interaktif**: 15 gaya (malas, boring, tidur-tiduran, marah, ngambek,
   sayang, peluk, malu, kaget, ketawa, geli, bangga, lompat, melambai, ngantuk) lengkap dengan
   ekspresi + gerakan yang cocok.
3. **Masih tidak bisa dipencet sebagian area kosong** di sekitar karakter (wajib, tanpa setelan
   mematikannya) — tetapi blokirannya harus **jauh lebih kecil** dari sekarang.
4. Karakter boleh bergerak, **tetapi tidak sampai menyentuh tepi layar** — ada "bingkai" penahan.
5. Ada penyesuaian saat layar **vertikal ↔ horizontal** (dan inset status bar / navigasi / poni).
6. Rencana **terstruktur + re-check**, dengan referensi internet.

---

## 0. Audit dulu: apa yang sudah ada, apa yang belum (bukti, bukan dugaan)

Saya baca ulang kode sebelum menulis rencana. Ini yang **sudah** ada:

| Hal | Bukti di repo |
| --- | --- |
| Ketuk overlay → zona → JS | `OverlayService.kt:1008` membagi tinggi jendela jadi 3 pita (`head` < 0,22 / `shoulder` < 0,45 / `body`) — **hanya rasio vertikal, bukan tulang** |
| `react()` di JS | `web/src/renderer.js:943` — 3 tipe (`head`/`shoulder`/`body`), ekspresi `happy`/`surprised` |
| Pose reaksi | `web/src/motion.js:245` — amplop `sin(π·p)`, 1,6 s, hanya 3 cabang |
| Direktur perilaku + mood | `web/src/behavior.js` — preset `idle_loop`, `look_around`, `weight_shift`, `stretch`, `wave_hello`, `talk_self`, `pose_cute`; mood `ceria`/`kalem`/`pemalu` |
| Bingkai kamera ikut kerangka | `web/src/renderer.js:216 skeletonBounds()` + `frameGaps()` (:192) → sudah dikirim tiap 1 s ke Android sebagai `bodyGap` di `post('motion-state')` (:827) |
| Suara | `VoicePack.kt:21` — 7 event (`ui_click`, `drag_start/stop`, `bubble_on/off`, `chat_blip/stream`), WAV sintetis 55–120 ms |
| Penjepit posisi | `OverlayGeometry.clamp()` — masih memperbolehkan **38 %** jendela keluar layar (`MIN_VISIBLE = 0.62`) |
| Ukuran jendela | `OverlayGeometry.windowSize()` — tinggi = `scalePercent × tinggi layar`, rasio 1,9 |
| Rotasi | `AndroidManifest.xml:33` activity punya `configChanges` **lengkap**, tetapi **layanan overlay tidak** dan tidak ada `DisplayListener` |

Yang **belum** ada dan menjadi pekerjaan ronde ini:

- Deteksi zona per **tulang** (kepala, pipi, tangan, perut, pinggul, kaki) dengan uji sinar 3D.
- Reaksi lebih dari 3 tipe; belum ada ekspresi `>_<`, belum ada ekspresi marah/sedih/relaxed.
- Belum ada SFX reaksi; belum ada jalur impor suara per event.
- Jendela masih **persegi penuh** `scale% × tinggi layar` → area kosong besar ikut menelan sentuhan.
- Belum ada penahan tepi berpegas; belum ada perhitungan inset/cutout.
- Belum ada penyesuaian ulang saat rotasi (posisi bisa "nyangkut" di luar layar).

---

## 1. Riset: yang dilakukan Mate Engine, dan batas yang saya pegang

Ringkasan dari sumber publik (`store.steampowered.com/app/3625270`,
`deepwiki.com/shinyflvre/Mate-Engine/2-avatar-system`, `github.com/shinyflvre/Mate-Engine/releases`):

| Aspek | Cara Mate Engine | Bagaimana saya kerjakan di sini |
| --- | --- | --- |
| Zona sentuh | Bola di sekitar tulang: **Head** r≈0,08; **Intimate Down** r≈0,06 di *Spine*; **Hand L/R** r≈0,10 | Sama secara konsep, **angka ditulis sendiri** dari proporsi tinggi model, bukan menyalin |
| Reaksi | Klip + ekspresi `>_<` + voice clip per zona | Reaksi prosedural + klip CC0 yang sudah dibundel + SFX sintesis sendiri |
| Kepala dielus | Gerak membentuk lingkaran/bolak-balik memicu reaksi khusus | Dihitung dari lintasan sentuhan (`pointermove` di area kepala), bukan sekali ketuk |
| Ekspresi | Blendshape Unity; `>_<` untuk area sensitif & saat digeser | Preset VRM 1.0: `happy`, `angry`, `sad`, `relaxed`, `surprised`, `neutral` + `blink` + `aa/ih/ou/ee/oh`; `>_<` dibuat **prosedural** (kedua mata menutup + alis turun) karena bukan preset VRM |
| Area sensitif | Voice + animasi khusus | **Non-eksplisit**: malu `>_<`, memerah, menutupi badan, mundur, menepis. Tidak ada gerakan/konten seksual |

Batas legal (tetap berlaku): **tidak menyalin** `.anim`, `.mp3`, prefab, atau model Mate Engine; tidak
ada aset pihak ketiga baru. Semua klip tetap CC0 Quaternius yang sudah ada, semua suara baru
**disintesis sendiri** oleh skrip di repo ini. Hasilnya tidak diklaim identik — hanya "terasa mirip".

Referensi teknis Android yang dipakai (sudah dibaca, lihat §2–§5):

- `WindowManager.LayoutParams` — `FLAG_LAYOUT_NO_LIMITS` (jendela boleh keluar layar),
  `FLAG_NOT_TOUCH_MODAL` (sentuhan di luar jendela diteruskan), `FLAG_NOT_FOCUSABLE`.
  **Catatan jujur:** peringatan StackOverflow 77430982 — margin negatif tidak bekerja untuk
  `TYPE_APPLICATION_OVERLAY`, batas keras tetap ukuran layar.
- Android 12+ membatasi *touch pass-through* ke jendela di bawah bila jendela atas punya
  `alpha > getMaximumObscuringOpacityForTouch()` — tetapi aturan itu **tidak** memberi "lubang"
  pada jendela yang bisa disentuh (lihat §5, ini yang menentukan desain kita).
- Rotasi: jangan set `width/height` manual; baca ukuran baru **setelah** layout
  (`onSizeChanged`/`post {}`), dan pada API 30+ pakai `windowManager.currentWindowMetrics`.

---

## 2. Bagian A — Zona sentuh berbasis tulang (7 zona)

Uji sinar (`THREE.Raycaster`) dari titik sentuh ke mesh avatar, lalu pilih zona **tulang terdekat**
dari titik perkenaan. Radius dinyatakan sebagai **fraksi tinggi model**, jadi ikut skala
(25 %–100 %) dan tetap benar saat model diganti.

| Zona | Tulang acuan | Radius (× tinggi model) | Aksen |
| --- | --- | --- | --- |
| `head` | `head` | 0,085 | ubun–dahi |
| `cheek` | `head` + sisi kiri/kanan | 0,055 | pipi; sisi menentukan arah miring kepala |
| `shoulder` | `leftShoulder` / `rightShoulder` | 0,07 | bahu |
| `hand` | `leftHand` / `rightHand` | 0,075 | tangan; bias ke kanan/kiri |
| `belly` | `spine` | 0,075 | perut |
| `hip` | `hips` | 0,055 | **area sensitif** — perilaku sopan, lihat §4 |
| `leg` | `leftLowerLeg` / `rightLowerLeg` | 0,07 | lutut/kaki |

Aturan tambahan:

- **Balapan prioritas**: bila dua bola bersinggungan, menang yang jaraknya ke tulang paling kecil,
  dengan bonus 15 % untuk zona kecil (`cheek`, `hip`) agar tidak selalu kalah dari `head`/`spine`.
- **Elusan** (`head`): akumulasi jarak gerak jari ≥ 60 px dalam ≤ 900 ms di area kepala =
  `headpat` (bukan ketukan). Ini yang memicu Sayang / Malu (pemalu) alih-alih kaget.
- **Ketukan beruntun**: 2 ketukan < 400 ms di zona sama = `double`, 3+ = `rapid` (Geli).
  3 ketukan di **posisi layar** yang sama tetap membuka menu cepat (perilaku lama, jangan diubah).
- **Tahan** (`long press` ≥ 900 ms) di kepala = tidur-tiduran; di tangan = digenggam.

---

## 3. Bagian B — 15 gaya reaksi (tabel lengkap)

Kolom "Gerak" memakai salah satu dari: klip yang **sudah** dibundel (29 klip), lapisan prosedural
`motion.js` (paling sering), atau gabungan. `Ekspresi` memakai preset VRM 1.0 yang tersedia di
model; bila model tidak punya preset itu, dipakai cadangan (`neutral`).

| # | Gaya | Pemicu | Ekspresi | Gerak | Suara | Durasi |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | **Malas** | diam ≥ 90 s, atau ketuk bahu sekali saat energi rendah | `relaxed` 0,5 | berat badan ke satu kaki (6°), bahu turun, kepala miring, lengan menggantung | desah pelan `sigh` | 2,8 s |
| 2 | **Ngantuk** | diam ≥ 150 s | `relaxed` 0,7 + `blink` lambat 0,6 | kepala menunduk naik-turun 0,25 Hz, badan sedikit limbung | `yawn` (hembusan) | 4,0 s |
| 3 | **Tidur-tiduran** | tahan 900 ms di kepala, atau diam ≥ 4 menit | mata tertutup (`blink` 0,95) + `relaxed` 0,3 | `sitting_enter` → `sitting_idle`, napas 0,18 Hz, kepala bersandar | `breath_sleep` (loop halus) | sampai disentuh |
| 4 | **Boring / cemberut** | diam 60–90 s, atau 2× ketuk perut saat mood `kalem` | `neutral` + mata setengah (`blink` 0,35) | pandangan ke samping, dagu di tangan (prosedural), kaki berayun | `tongue_click` | 5,0 s |
| 5 | **Marah** | 3× ketuk cepat di perut/lutut, atau mood turun karena digeser kasar | `angry` 0,95 | injakan kaki (impuls `hips.y`), tangan mengepal, badan condong depan | `huff_hard` + `hmph` | 2,5 s |
| 6 | **Ngambek** | setelah Marah, atau ditinggal 30 s setelah Marah | `sad` 0,85 | memunggung 22° (`root.y`), lengan menyilang, tidak mau disentuh 5 s | `sigh_low` | 6,0 s |
| 7 | **Sayang** | elusan kepala (headpat) | `happy` 0,95 + `blush` 0,4 | kepala miring ke arah elusan, badan mendekat 6 px, tangan ke pipi | `hum_soft` | 2,2 s |
| 8 | **Peluk** | ketuk dada/perut 1× saat `ceria`, atau ikon peluk di menu cepat | `happy` 0,8 + mata tertutup 0,7 | klip `interact` sekali + kedua lengan ke depan (prosedural 35°), badan maju 8 px | `mmm` | 2,0 s |
| 9 | **Malu `>_<`** | zona `hip` (1×), ketuk pipi, atau dipuji di chat | `happy` 0,6 + `sad` 0,3 + **`>_<` prosedural** (mata menutup + alis turun) + `blush` 1,0 | kedua tangan menutup wajah, badan mundur 10 px, lutut rapat | `eep` (gasp pendek) | 2,6 s |
| 10 | **Kaget** | zona `hip` 2× dalam 3 s, atau sentuhan pertama setelah lama | `surprised` 1,0 | `jump_start` sekali, bahu terangkat, tangan ke dada | `gasp` | 1,4 s |
| 11 | **Ketawa** | elusan di leher/perut, atau `rapid` di perut | `happy` 1,0 + mata `^ ^` prosedural | badan bergoyang 1,8 Hz, tangan menutup mulut | `giggle_3` | 2,4 s |
| 12 | **Geli** | `rapid` (≥ 3 ketuk < 1 s) di perut/pinggul | `happy` 0,7 + `surprised` 0,3 | memilin badan 12°, tangan menepis, mundur 6 px | `giggle_short` | 1,8 s |
| 13 | **Bangga** | selesai memutar klip sulit (`roll`, `spell_*`), atau 2× ketuk kepala | `happy` 0,8 + dagu naik | `spell_enter` sekali + tangan di pinggang, dada membusung | `chime_up` | 2,2 s |
| 14 | **Lompat gembira** | mood `ceria` ≥ 70 dan tidak ada interaksi 20 s | `happy` 1,0 | `jump_start` → `jump_land` | `boing` | 1,8 s |
| 15 | **Melambai** | avatar baru muncul, atau 1× ketuk tangan | `happy` 0,7 | klip `interact` + ayun lengan 2,2 Hz | `blip_soft` | 2,0 s |

Catatan ekspresi: `blush` (memerah) **bukan** preset VRM 1.0 — biasanya blendshape kustom model.
Karena itu kode memakai urutan cadangan: `blush` bila ada → `happy` 0,5 + kepala menunduk 8° +
tangan ke pipi bila tidak ada. Jadi reaksi Malu tetap terbaca di model mana pun.

**Penjaga agar tidak norak** (semua angka diuji di CI):

- Satu reaksi pada satu waktu; reaksi baru **mengalah** bila sisa waktu reaksi lama > 40 %.
- Jeda minimal per zona: kepala 600 ms, tangan 800 ms, perut 900 ms, pinggul **2 500 ms**.
- Anti-ulang: gaya yang sama tidak muncul dua kali berurutan (kecuali dipicu eksplisit oleh user).
- Saat klip `.vrma` sedang diputar dari layar Animasi, reaksi hanya lapisan ekspresi + SFX
  (tidak menimpa klip pilihan user).
- Semua reaksi hormat pada tombol bisu dan pada setelan suara terpisah (efek vs chat).

---

## 4. Bagian C — Area sensitif (pinggul): sopan, tidak eksplisit

Ini yang diminta ("gerakan dan suara saat menyentuh bagian kemaluan"), dan ini cara saya
memenuhinya tanpa konten seksual:

| Sentuhan | Reaksi | Suara | Lanjutan |
| --- | --- | --- | --- |
| Ketuk pertama | Malu `>_<` — memerah, menutupi badan dengan kedua tangan, mundur 10 px | `eep` | jeda 2,5 s |
| Ketuk kedua < 3 s | Kaget lalu Ngambek — memunggung, menepis | `gasp` → `hmph` | **menolak disentuh 8 s** |
| Ketuk saat menolak | Hanya geleng kepala + `>_<`, tanpa gerak badan | `hmph` pelan | tidak ada eskalasi |
| Tahan > 600 ms | Menepis tangan + mundur, ekspresi `sad` | `hmph` | kembali ke idle |

Yang **tidak** akan ada: animasi menaiki, desahan bernada, pelepasan pakaian, teks cabul, atau
eskalasi berulang. Zona ini tidak punya setelan mati (konsisten dengan "blokir sentuhan wajib
tanpa toggle"), tetapi reaksinya tidak pernah melewati batas di atas.

---

## 5. Bagian D — Blokir area kosong: apa yang benar-benar mungkin di Android

Ini bagian yang paling banyak salah paham, jadi saya tulis apa adanya.

**Fakta platform:** jendela overlay Android adalah **persegi panjang** dan **tidak punya
*touch pass-through per piksel***. Bila sebuah jendela bisa disentuh, semua sentuhan di dalam
batasnya masuk ke jendela itu — tidak peduli pikselnya transparan. `FLAG_NOT_TOUCHABLE` bekerja
untuk **seluruh** jendela, bukan sebagian. `FLAG_NOT_TOUCH_MODAL` hanya meneruskan sentuhan di
**luar** batas jendela.

Artinya pilihan kita hanya tiga:

| Opsi | Cara | Kelebihan | Kekurangan | Putusan |
| --- | --- | --- | --- | --- |
| **A. Persegi penuh (sekarang)** | jendela = `scale% × tinggi layar` | sederhana | area kosong besar sekali (bisa 40–60 % jendela) | **ditinggalkan** |
| **B. Jendela mengikuti siluet** | Android memakai `bodyGap` yang **sudah** dikirim (1×/detik, akan dinaikkan ke 6×/detik) → jendela mengecil ke kotak tubuh + 6 dp | area kosong turun drastis; tetap 100 % memblokir, tanpa toggle | masih persegi di sekitar tubuh | **DIPILIH** |
| **C. Dua jendela (render + sentuh)** | jendela render `NOT_TOUCHABLE` penuh, jendela sentuh kecil di atasnya | idealnya sama dengan B | dua jendela = dua komposisi, boros & rawan bug fokus | cadangan bila B bermasalah |

**Desain B secara rinci:**

1. Renderer sudah melaporkan `motion-state` berisi `top/bottom/left/right` (jarak tubuh ke tepi
   kanvas). Android menghitung kotak tubuh di koordinat layar:
   `body = windowRect - gaps`.
2. Kotak itu **dihaluskan** (EMA 0,15) + **histeresis** 8 dp supaya jendela tidak bergetar tiap
   frame saat bernapas.
3. Jendela baru = `body + margin 6 dp`, minimal 96 dp (batas sentuh nyaman).
4. Saat pengguna **menggeser**, jendela dikunci ke ukuran kotak tubuh terakhir (tidak mengecil
   di tengah gestur); setelah geser selesai, ukuran mengikuti lagi.
5. Kanvas WebView tetap dirender pada ukuran penuh lalu **dipetakan** ke jendela kecil
   (`WebView` di-scale? **tidak** — lebih aman: jendela kecil tetap menampung kanvas penuh dengan
   `transform: translate(-left, -top)`, sehingga model tidak ikut mengecil). Ini penting: kalau
   WebView di-scale, avatar akan terlihat mengecil saat jendela menyusut.
6. `FLAG_NOT_TOUCH_MODAL` tetap dipasang agar sentuhan di luar jendela diteruskan ke aplikasi bawah.

**Perkiraan angka (dihitung dari rumus yang ada, akan diukur ulang saat uji).** Emulator 1080×2400,
slider 50 % → `windowSize()` memberi jendela **631 × 1200 px** (`1200 / 1,9 = 631`), luas
**757 200 px²**. Tubuh berdiri memenuhi hampir seluruh tinggi kanvas (± 92 %) dan lebar siluet
(kepala–tangan–kaki) biasanya 50–60 % lebar kanvas → kotak tubuh ≈ 350 × 1100 = **385 000 px²**.
Jadi area yang menelan sentuhan turun sekitar **49 %**. Rentang realistisnya **45–60 %** tergantung
pose; saya tidak akan mengklaim angka sebelum mengukurnya.

Kriteria terima T5: **turun ≥ 45 %** tanpa mengubah ukuran avatar di layar. Uji: buka aplikasi lain
(Setelan) di belakang, ketuk tepat di luar kotak tubuh, pastikan daftar Setelan bereaksi; lalu ketuk
avatar, pastikan reaksi muncul.

> Bila hasil ukur < 45 % (mis. lengan terentang saat `roll` membuat kotak melebar), saya laporkan
> angka sebenarnya dan tawarkan opsi C — tanpa mengubah janji "area kosong diblokir".

---

## 6. Bagian E — Bingkai: avatar tidak boleh menyentuh tepi layar

Sekarang `MIN_VISIBLE = 0.62` artinya **38 %** jendela boleh keluar layar. Diganti dengan penahan
berpegas:

1. **Bingkai tetap** = inset aman: status bar (atas), navigasi gestur (bawah), cutout (poni), dan
   margin 8 dp. Dihitung dari `WindowInsets` (`statusBars`, `navigationBars`, `displayCutout`)
   melalui `ViewCompat.setOnApplyWindowInsetsListener` pada root overlay.
2. **Penjepit** `x ∈ [frame.left, frame.right - w]`, `y ∈ [frame.top, frame.bottom - h]`.
   `MIN_VISIBLE` dihapus untuk overlay avatar (tetap dipakai menu cepat, tidak berubah).
3. **Karet** saat digeser melewati batas: geseran diredam (`overshoot × 0,25`), lepas jari →
   pegas kembali ke dalam bingkai (`SpringSpec` 0,35 s, *damping* 0,75) + satu `bounce` kecil.
4. **Lontar** (fling): kecepatan > 800 px/s dibawa, lalu diredam di tepi (tidak memantul keluar).
5. **Bingkai dalam renderer**: `skeletonBounds()` sudah menjaga tubuh utuh di kanvas; ditambah
   margin 4 % di `frameGaps()` agar `roll`/`jump` tidak menyentuh tepi kanvas saat pose ekstrem.
   `bodyGap` dilaporkan 1×/detik; untuk ukuran jendela perlu **6×/detik** (166 ms) — cukup halus,
   masih murah karena hanya membaca 16 posisi tulang.
6. Uji unit baru `OverlayGeometryTest`: untuk 12 kombinasi ukuran layar × skala, posisi hasil
   penjepitan **selalu** di dalam bingkai (properti, bukan angka contoh).

---

## 7. Bagian F — Vertikal ↔ horizontal

| Masalah | Solusi |
| --- | --- |
| Layanan overlay tidak menerima perubahan konfigurasi | Daftarkan `DisplayManager.DisplayListener` di `onCreate`, lepas di `onDestroy` (+ `onConfigurationChanged` pada service dengan `android:configChanges` di manifest, sebagai jalur kedua) |
| Ukuran lama terbaca saat callback | **Selalu** baca ulang lewat `windowManager.currentWindowMetrics.bounds` (API 30+) / `display.getRealMetrics` (API < 30) **di dalam `post {}`**, bukan `resources.displayMetrics` yang bisa tertinggal |
| Bentuk layar berubah (potret ↔ lanskap) | Hitung ulang `windowSize()`; di lanskap batasi tinggi ke `frame.height`, lalu **perkecil** `scalePercent` efektif agar model tetap utuh (dilaporkan di UI sebagai "skala disesuaikan: 62 %") |
| Posisi "nyangkut" di luar layar | Setelah hitung ulang: penjepitan ke bingkai baru; bila avatar tadinya di kanan bawah, ia **dipetakan proporsional** (`x/w` lama → `x/w` baru), lalu dijepit |
| Rotasi saat digeser / saat reaksi | Gestur dibatalkan dengan aman (`ACTION_CANCEL` sintetis), reaksi dihentikan, lalu semuanya diposisikan ulang |
| Lipat/multi-window | Semua ukuran dari `WindowMetrics.bounds` (bukan `Display`), sehingga `freeform`/split ikut benar |
| Rasio 1,9 tidak cocok di lanskap | Kalau `frame.height < 0,6 × frame.width`, pakai rasio 1,35 dan `camera` sedikit mundur (faktor 1,08) — angka diuji lewat `frameGaps()` |

---

## 8. Bagian G — Suara: disintesis sendiri, bisa diganti pengguna

Tidak ada sumber CC0 berisi vokal pendek yang layak, dan memakai rekaman pihak ketiga dilarang
(aturan provenance). Jadi:

1. **Skrip baru `scripts/buat-sfx.py`** (Python stdlib: `wave`, `math`, `random` ber-*seed*).
   Menghasilkan WAV mono 22 050 Hz, 16 bit, puncak −3 dBFS, dipotong dengan *fade* 8 ms.
   Setiap berkas punya "resep" numerik yang dicatat di `docs/aset-suara.md` sehingga bisa
   dibangun ulang dan diverifikasi (SHA-256 dicatat, seperti `docs/aset-gerak.md`).
2. **12 SFX baru** (semua non-verbal, tidak ada ucapan):

   | Berkas | Isi sintesis | Panjang |
   | --- | --- | --- |
   | `me_sigh.wav` | derau putih lolos *low-pass* 900 Hz, amplop turun 0,9 s | 0,9 s |
   | `me_yawn.wav` | dua nada 180→140 Hz + derau, amplop panjang | 1,4 s |
   | `me_huff_hard.wav` | derau *band-pass* 1,2 kHz + klik awal | 0,35 s |
   | `me_hmph.wav` | nada 210 Hz turun cepat + derau hidung | 0,30 s |
   | `me_hum_soft.wav` | dua sinus 196/294 Hz, *vibrato* 5 Hz | 0,8 s |
   | `me_mmm.wav` | sinus 160 Hz + harmonik 2, *envelope* halus | 0,7 s |
   | `me_eep.wav` | nada naik 520→760 Hz, 90 ms, sangat pendek | 0,12 s |
   | `me_gasp.wav` | derau *high-pass* 1,8 kHz, serangan 15 ms | 0,28 s |
   | `me_giggle_3.wav` | 3 denyut 0,09 s, nada 620/700/660 Hz, jeda 0,06 s | 0,45 s |
   | `me_giggle_short.wav` | 2 denyut, lebih pelan | 0,28 s |
   | `me_chime_up.wav` | 3 nada sinus (523/659/784), *decay* eksponensial | 0,6 s |
   | `me_boing.wav` | nada 300 Hz dengan *pitch bend* turun + *tremolo* | 0,35 s |

3. **`VoicePack.Event` diperluas** dari 7 → 19 event; `VoicePack` sudah mendukung berkas pengguna
   per event (`userFiles`), jadi jalur "pakai suaramu sendiri" **otomatis** ikut berlaku.
4. Batas aman: puncak −3 dBFS, tidak ada nada > 4 kHz yang keras (hindari sakit telinga), durasi
   total tambahan < 250 KB. Volume efek terpisah dari volume chat (setelan sudah ada).

---

## 9. Tahap eksekusi (berurutan, tiap tahap bisa berhenti)

| Tahap | Isi | Berkas utama | Kriteria terima | Uji |
| --- | --- | --- | --- | --- |
| **T1** | Zona per tulang + `raycast` + tabel radius | `web/src/touch.js` (baru), `renderer.js`, `OverlayService.kt` | 7 zona terdeteksi; log zona benar untuk 7 titik ketuk yang berbeda | uji unit `web/test/touch.test.mjs` (proyeksi bone → zona) |
| **T2** | Mesin reaksi: 15 gaya, mood, cooldown, anti-ulang | `web/src/reactions.js` (baru), `motion.js` | tiap gaya punya ekspresi + gerak; tidak ada dua reaksi tumpang tindih; cooldown dipatuhi | uji `reactions.test.mjs`: 200 pemicu acak, 0 pelanggaran jeda |
| **T3** | SFX sintesis + VoicePack 19 event | `scripts/buat-sfx.py`, `res/raw/*.wav`, `VoicePack.kt` | 12 WAV ≤ 250 KB; event baru terpicu pada reaksi yang tepat | uji Android `VoicePackTest` (event → resource ada) |
| **T4** | Bingkai berpegas + inset/cutout | `OverlayService.kt`, `OverlayGeometry.kt` | properti: posisi selalu di dalam bingkai; karet & pegas mulus | `OverlayGeometryTest` (12 kombinasi) |
| **T5** | Jendela mengikuti siluet (blokir area kosong mengecil) | `renderer.js` (`frameGaps` → `body-box`), `OverlayService.kt` | luas yang menelan sentuhan turun ≥ 45 % (target realistis 45–60 %); model tidak mengecil; blokir tetap 100 % | uji manual + screenshot + `dumpsys` |
| **T6** | Rotasi & ukuran layar | `DisplayListener`, `windowSize()`, manifest | potret→lanskap→potret: avatar selalu utuh di dalam bingkai, tidak keluar layar | uji instrumen `RotationTest` (Robolectric/emulator) |
| **T7** | UI: bagian "Sentuhan & Reaksi" di Pengaturan (daftar 15 gaya + tombol coba) + pratinjau | `ui/screens/SettingsScreen.kt` (tab yang ada, **tanpa tab ke-6**) | daftar gaya bisa dicoba satu per satu dari aplikasi | uji Compose + screenshot |
| **T8** | Rilis `v0.1.10-test` | `app/build.gradle.kts`, `release/tag.txt`, `docs/` | CI hijau, APK terpasang, tangkapan emulator baru | `gh run watch` |

Urutan penting: **T1–T3 dulu** (yang paling diminta), T5/T6 menyusul karena menyentuh `OverlayService`
yang paling rawan. Bila waktu mepet, T7 bisa ditunda tanpa memengaruhi permintaan inti.

---

## 10. Re-check: tiap permintaan → cara saya membuktikannya

| Permintaan user | Bukti yang akan saya lampirkan |
| --- | --- |
| Gerakan + suara saat sentuh area sensitif | Tangkapan **28** (ekspresi `>_<` + tangan menutupi badan) + rekaman durasi & nama SFX dari logcat (`sentuhan: zona hip → gaya malu`) |
| 15 gaya interaktif | Tabel §3 + tangkapan **25** (Sayang/headpat), **26** (Ngambek), **27** (Malu), **29** (Ketawa) |
| Ekspresi cocok dengan gerak | Uji `poseMetrics()` + nilai ekspresi tercatat di `motion-state`; tidak ada gaya yang memakai ekspresi kosong (fallback dicatat) |
| Area kosong masih tidak bisa dipencet | Tangkapan **30**: aplikasi Setelan di belakang — ketukan di luar kotak tubuh membuka Setelan; ketukan pada avatar memicu reaksi |
| Blokir tanpa setelan mati | `grep -r "allowTouchThrough"` = tidak ada; uji Android memastikan tidak ada preferensi terkait |
| Avatar tidak sampai tepi layar | Tangkapan **31**: avatar digeser ke 4 sudut, jarak ke tepi ≥ 8 dp + inset (diukur dari piksel gambar) |
| Penyesuaian vertikal/horizontal | Tangkapan **32** (potret) & **33** (lanskap) setelah rotasi paksa `adb shell settings put system user_rotation 1` |
| Ada re-check, bukan klaim | Dokumen ini + CI run ID di pesan akhir, dan setiap tahap ditutup dengan hasil uji (lulus/gagal apa adanya) |

**Re-check setelah implementasi** (yang akan saya periksa ulang, bukan asumsikan):

1. `web/test` lulus semua (termasuk 2 uji baru: `touch`, `reactions`).
2. `frameGaps()` di semua 15 gaya: `top/bottom/left/right ≥ 4 %` kanvas (tidak ada kaki terpotong).
3. Tidak ada reaksi yang menumpuk: log 10 menit pemakaian acak, 0 tumpang tindih.
4. `dumpsys window` memastikan hanya **satu** jendela overlay avatar (+1 menu cepat saat dibuka).
5. After-rotation: `layoutParams.x/y` selalu di dalam bingkai di 20 rotasi beruntun.
6. Ukuran APK tetap < 30 MB dan total aset suara < 250 KB.
7. Tidak ada aset pihak ketiga baru: `git diff --stat` hanya berisi WAV hasil `scripts/buat-sfx.py`
   + klip CC0 yang sudah ada.

---

## 11. Risiko & mitigasi

| Risiko | Dampak | Mitigasi |
| --- | --- | --- |
| Jendela mengecil lalu avatar terlihat mengecil | mengubah tampilan yang sudah disetujui | kanvas tetap dirender penuh + `translate` (§5.5); uji: ukuran model di layar identik sebelum/sesudah |
| Jendela bergetar mengikuti napas | mengganggu | EMA + histeresis 8 dp + kunci saat gestur |
| Raycast soal performa | frame drop | raycast hanya saat `ACTION_DOWN`/`MOVE` (bukan tiap frame), `firstHitOnly`, mesh dibatasi |
| `>_<` tidak ada di semua model | ekspresi jatuh ke `neutral` | `>_<` prosedural (blink + alis), jadi selalu ada |
| SFX terdengar murahan | kualitas | 2 putaran dengar; bila kurang, saya turunkan jumlah nada dan perbanyak derau lembut |
| Rotasi memicu *crash* layanan | overlay mati | semua panggilan `windowManager` dibungkus `runCatching` (pola yang sudah dipakai), `OverlayRuntime.reportError` |
| Uji emulator tidak bisa menekan area di luar jendela | bukti lemah | uji manual di emulator + `input tap` ke koordinat tetap, hasil dibaca dari `dumpsys activity` (aplikasi mana yang di depan) |

---

## 12. Yang tidak dikerjakan ronde ini

- Bukan *port* kode Mate Engine, dan tidak ada aset mereka.
- Tidak ada konten seksual, tidak ada eskalasi area sensitif.
- Tidak ada tab ke-6, tidak ada font baru selain Outfit, tidak ada dynamic color.
- Tidak mengubah 29 klip CC0 yang sudah ada, tidak menambah klip baru (belum perlu).
- Klip "tidur berbaring" tidak ada di paket CC0 yang dipakai; tidur-tiduran dipetakan ke
  `sitting_enter → sitting_idle` + pose prosedural. Kalau kamu ingin benar-benar berbaring,
  itu pekerjaan klip baru dan saya pisahkan ke ronde berikutnya.

---

## 13. Yang perlu kamu putuskan sebelum saya mulai

| # | Pertanyaan | Saran saya |
| --- | --- | --- |
| 1 | Suara: **non-verbal saja** (desah, huff, giggle — aman & sopan) atau **plus vokal pendek** (`a`, `e`, `hm` lewat sintesis forman)? | Non-verbal + `hm`/`mmm` (opsi 1). Vokal forman penuh berisiko terdengar aneh |
| 2 | Area sensitif: cukup reaksi §4, atau kamu mau zona itu **tidak aktif** sama sekali? | Cukup §4 (malu, kaget, menolak) — sesuai permintaan "mirip Mate Engine" tapi sopan |
| 3 | Jendela mengikuti siluet (B) diterima, atau kamu lebih suka tetap persegi penuh (A)? | **B**, karena itu satu-satunya cara memperkecil area yang memblokir tanpa melanggar "wajib blokir" |
| 4 | Rilis: langsung `v0.1.10-test` setelah T1–T6, atau tunggu T7 (UI daftar gaya) selesai? | Rilis setelah T6, T7 menyusul di `v0.1.11-test` |

Jawab seperlunya (mis. "gas, pakai saran semua"), dan saya mulai dari **T1**.
