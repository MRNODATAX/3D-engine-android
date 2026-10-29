# Jendela siluet overlay: penyebab dan perbaikan (v0.1.12 → v0.1.13)

Catatan ini menyimpan temuan yang mahal: beberapa versi berturut-turut "avatar hanya tampak
sebatas kaki" dan penyebabnya bukan pengukuran tulang, bukan material, bukan kamera.

## Gejala

- Tangkapan `06-overlay` kosong (hanya wallpaper), `19-overlay-duduk` hanya lutut–sepatu,
  `20-overlay-pojok` hanya kaki.
- Log renderer justru melaporkan badan mengisi kanvas (`bodyGap` atas 70 px, bawah 72 px),
  semua 13 mesh tergambar (20 draw call, 70.116 segitiga), `glError 0`, dan kotak tiap mesh
  hasil *skinning* berada di NDC yang wajar (−0,8 … 0,4).

## Penyebab sebenarnya

Renderer dulu memakai **kanvas seukuran jendela desain** (1010×1919) yang dipasang di dalam
jendela siluet kecil (mis. 446×1919) dengan margin negatif. Permukaan GL WebView tidak pernah
ikut membesar sebesar kanvas itu. Bukti terukur (probe `debug-gpu`, quad penuh layar):

```
viewport [0,0,385,732]  size [385,732]  buffer [577,1098]
quad penuh layar hanya mengisi (0,0)-(494,370) piksel  ← 2/3 permukaan tidak pernah tergambar
```

Karena hanya sepertiga bawah permukaan yang valid, bagian bawah avatar (kaki/sepatu) yang
kebetulan jatuh di sana tampak, sisanya hilang.

## Perbaikan

1. **Kanvas = jendela.** WebView dipasang `MATCH_PARENT`; tidak ada lagi margin negatif
   (`OverlayService.applyWindowRect` hanya mengirim `setWindowSlice`).
2. **Potongan bingkai lewat kamera.** `camera.setViewOffset` di renderer memproyeksikan bagian
   bingkai desain yang terlihat, jadi avatar tidak mengecil dan tidak bergeser.
3. **Laporan tetap fraksi desain.** `body-box` dan `pointer` memakai `toDesignFractions()`,
   sehingga protokol fraksi 0..1 di sisi Android tidak berubah.
4. **Tanpa `LAYER_TYPE_HARDWARE` paksa.** Layer perangkat keras membuat permukaan WebView
   berukuran tetap; atribut itu dihapus dari `buildWebView()`.
5. **Margin bawah kotak tubuh 17 %** (dulu 8 %): sepatu menjulur di bawah tulang kaki.
   Uji render menuntut `bodyGap.bottom >= 12 px`.

## Bukti setelah perbaikan

- `06-overlay.png`, `19-overlay-duduk.png`, `20b-overlay-pojok-menepet.png`: avatar utuh dari
  rambut sampai sepatu; log `potongan jendela` menyertai setiap perubahan jendela.
- Penghematan area sentuhan tetap berjalan: `n=7 terkecil=61% median=74% terbesar=100%
  -> pengurangan luas median 26%`.

## Catatan diagnostik

`readPixels` tiap 3 detik dan render probe kamera lebar **dihapus** setelah dipakai: keduanya
menghentikan pipeline GPU dan membuat animasi tersendat di perangkat. Diagnosa piksel hanya
aktif bila `window.__MATE_PAINT_DEBUG__ === true`.
