/**
 * Polyfill kecil untuk WebView lama.
 *
 * Android 8.x (minSdk 26) bisa membawa WebView bawaan Chrome 6x yang belum mengenal
 * `Object.fromEntries` (Chrome 73) maupun `Array.prototype.at` (Chrome 92). Sintaks modern
 * seperti `?.` dan `??` sudah diturunkan oleh esbuild (target `chrome61`), tetapi API runtime
 * tidak bisa diturunkan oleh bundler — karena itu ditambahkan di sini.
 *
 * Semua definisi bersifat "isi hanya bila belum ada", sehingga WebView modern dan Node
 * (untuk uji) sama sekali tidak berubah perilakunya.
 */

if (typeof Object.fromEntries !== 'function') {
  Object.fromEntries = function fromEntries(iterable) {
    const hasil = {};
    for (const pasangan of iterable) {
      // Mengikuti spesifikasi: setiap entri harus bisa diubah menjadi objek.
      const entri = Object(pasangan);
      hasil[entri[0]] = entri[1];
    }
    return hasil;
  };
}

if (typeof Object.hasOwn !== 'function') {
  Object.hasOwn = function hasOwn(objek, kunci) {
    return Object.prototype.hasOwnProperty.call(objek, kunci);
  };
}

if (typeof Array.prototype.at !== 'function') {
  // eslint-disable-next-line no-extend-native
  Array.prototype.at = function at(indeks) {
    const panjang = this.length >>> 0;
    let i = Math.trunc(indeks) || 0;
    if (i < 0) i += panjang;
    return i < 0 || i >= panjang ? undefined : this[i];
  };
}

if (typeof String.prototype.at !== 'function') {
  // eslint-disable-next-line no-extend-native
  String.prototype.at = function at(indeks) {
    const karakter = Array.from(this);
    return karakter.at(indeks);
  };
}

if (typeof String.prototype.replaceAll !== 'function') {
  // eslint-disable-next-line no-extend-native
  String.prototype.replaceAll = function replaceAll(cari, ganti) {
    if (cari instanceof RegExp) {
      // Perilaku asli mewajibkan regex global; cara termudah: pakai replace biasa.
      return this.replace(cari, ganti);
    }
    return this.split(String(cari)).join(String(ganti));
  };
}

export const polyfillDipasang = true;
