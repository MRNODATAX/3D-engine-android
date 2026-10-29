# Aset suara — 15 efek reaksi (v0.1.10)

Semua berkas di halaman ini **dibuat sendiri** oleh `scripts/buat-sfx.py`. Tidak ada satu byte
audio pihak ketiga di aplikasi ini: paket suara Mate Engine tidak boleh didistribusikan
(`LICENSE.md` mereka), dan tidak ada paket CC0 berisi vokal pendek yang layak dipakai.

## Cara membuat ulang

```bash
python3 scripts/buat-sfx.py          # tulis ulang ke app/src/main/res/raw
python3 scripts/buat-sfx.py --check  # periksa hash tanpa menulis (dipakai CI)
```

Keluaran: mono, 16 000 Hz, PCM 16-bit, puncak **−9 dBFS**, *fade* 8 ms di kedua ujung.
Puncak −9 dBFS dipilih supaya efek reaksi terdengar jelas tetapi tidak mengagetkan: klik UI yang
sudah ada puncaknya 0,14–0,22, reaksi 0,35.

## Daftar berkas

| Berkas | Isi | Durasi | Ukuran | SHA-256 isi PCM |
| --- | --- | --- | --- | --- |
| `me_sigh.wav` | desah pelan | 0.85s | 27244B | `6b5bb85763f7ecd81a8dee22dd11786fc33db43c830bedb096c3ef44f5e5e71d` |
| `me_sigh_low.wav` | desah rendah | 0.95s | 30444B | `f642151221a577d1a0b88ca44e4d57873a2b755d1a2c5a2bfc80e04a2cfbb945` |
| `me_yawn.wav` | menguap | 1.20s | 38444B | `39df9cbdeb87ace60a8e4c2a68f30f361d3f631e36c4c3eebda78c1b1f547b08` |
| `me_tongue_click.wav` | klik lidah (boring) | 0.18s | 5804B | `927f944475b69238db656ae7502b7e350b20a76b638eaba1183ad9f944d355a5` |
| `me_huff_hard.wav` | embusan keras (marah) | 0.34s | 10924B | `6a4537b57bb4b39de9a4208a966d047667305622b32745d3ec5d119ce0634098` |
| `me_hmph.wav` | mendengus (ngambek) | 0.30s | 9644B | `775f939644f295056237703be02e0f78bebcf19900970f5f7470d8efeca92377` |
| `me_hum_soft.wav` | bergumam lembut | 0.70s | 22444B | `f6fd7269de5a52e989d06824adc5d1ba8989e6e59668e942849b12e3ff0b71fb` |
| `me_mmm.wav` | mmm (peluk) | 0.65s | 20844B | `0e2ebacdd9cd40ea9059581d236652200d7f796b6b45053432c85a35ef3e3c36` |
| `me_eep.wav` | eep pendek (malu) | 0.12s | 3884B | `696384506865663bf27bdece0b7af9e239bba8201a1eb57c5896fe326d930ace` |
| `me_gasp.wav` | kaget menahan napas | 0.26s | 8364B | `2aed256fc17f4fc1ae6f0c92fe9a5dcbfb913e1f816ee04ccb651c992c11d19a` |
| `me_giggle_3.wav` | kikik tiga denyut | 0.45s | 14444B | `481b120b4f5729e8c6c6f28f3e9dc49d1d8b97f296828ba7697d679825bbba91` |
| `me_giggle_short.wav` | kikik dua denyut (geli) | 0.26s | 8364B | `3ada50d8dd106570b641f2b6239deece765328fe218a2a1de7d8f60bda1464fd` |
| `me_chime_up.wav` | lonceng naik (bangga) | 0.55s | 17644B | `40409ec08919e042cef282500e35e8d934804c2ee68913c706d3be0e9f66830e` |
| `me_boing.wav` | lompat | 0.34s | 10924B | `c5593d88068928fd4b349af40ac825679bc87f47941b86adad147f1f50964e6d` |
| `me_blip_soft.wav` | bunyi lembut (melambai) | 0.20s | 6444B | `8b6d6a8f7917b33feb15a13a3baa5661490294d0920553360ec2c523ff784d6d` |

total 15 berkas, 235860 byte (230.3 KB).

## Resep (ringkas)

| Berkas | Bahan |
| --- | --- |
| `me_sigh` | derau putih → *low-pass* 900 Hz, serangan 120 ms |
| `me_sigh_low` | derau → *low-pass* 520 Hz, napas lebih panjang |
| `me_yawn` | sinus 205→135 Hz + harmonik 2 + derau 1,1 kHz |
| `me_tongue_click` | dua klik derau *high-pass* 2 kHz + "tock" 780 Hz |
| `me_huff_hard` | derau *band-pass* 700–2 400 Hz, serangan 12 ms |
| `me_hmph` | sinus 215→150 Hz + harmonik 2 dan 3 + derau hidung |
| `me_hum_soft` | sinus 196 Hz + 294 Hz, *vibrato* 5 Hz |
| `me_mmm` | sinus 160 Hz + harmonik 2 dan 3 |
| `me_eep` | sinus 520→760 Hz, 120 ms |
| `me_gasp` | derau 1 200–3 200 Hz, serangan 15 ms |
| `me_giggle_3` | tiga denyut 620/700/660 Hz, jeda 50 ms |
| `me_giggle_short` | dua denyut 640/690 Hz |
| `me_chime_up` | sinus 523/659/784 Hz berurutan, *decay* eksponensial |
| `me_boing` | sinus 300→520→250 Hz + tremolo 12 Hz |
| `me_blip_soft` | dua nada pendek 880 dan 1 175 Hz |

## Penggantian oleh pengguna

`VoicePack` sudah memetakan berkas pengguna per event: taruh `sigh.mp3`, `gasp.ogg`, dan seterusnya
di `files/voicepack/`, nama berkas = kunci event (`VoicePack.Event.key`). Nama kunci sama dengan
nama efek di `web/src/reactions.js`, jadi tidak perlu pemetaan tambahan.
