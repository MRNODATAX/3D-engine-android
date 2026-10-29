/**
 * Uji polyfill WebView lama.
 *
 * Yang dibuktikan: setiap shim benar-benar memasang fungsinya ketika API asli tidak ada
 * (kondisi WebView Chrome 6x di Android 8.x), dan perilakunya sama dengan API asli —
 * termasuk kasus batas (indeks negatif, di luar panjang, pemisah string).
 *
 * Fungsi asli disimpan lalu dipulihkan, supaya berkas uji lain di proses yang sama tidak
 * terpengaruh.
 */
import assert from 'node:assert/strict';

const simpan = {
  fromEntries: Object.fromEntries,
  hasOwn: Object.hasOwn,
  arrayAt: Array.prototype.at,
  stringAt: String.prototype.at,
  replaceAll: String.prototype.replaceAll,
};

function tanpaApi() {
  delete Object.fromEntries;
  delete Object.hasOwn;
  delete Array.prototype.at;
  delete String.prototype.at;
  delete String.prototype.replaceAll;
}

function pulihkan() {
  Object.fromEntries = simpan.fromEntries;
  Object.hasOwn = simpan.hasOwn;
  Array.prototype.at = simpan.arrayAt;
  String.prototype.at = simpan.stringAt;
  String.prototype.replaceAll = simpan.replaceAll;
}

tanpaApi();
assert.equal(typeof Object.fromEntries, 'undefined', 'API asli harus hilang sebelum uji');
await import('../src/polifill.js');

assert.equal(typeof Object.fromEntries, 'function', 'Object.fromEntries tidak terpasang');
assert.deepEqual(Object.fromEntries([['a', 1], ['b', 2]]), { a: 1, b: 2 });
assert.deepEqual(Object.fromEntries(new Map([[1, 'satu']])), { 1: 'satu' });

assert.equal(Object.hasOwn({ x: 1 }, 'x'), true);
assert.equal(Object.hasOwn({ x: 1 }, 'y'), false);
assert.equal(Object.hasOwn(Object.create({ x: 1 }), 'x'), false);

const daftar = ['a', 'b', 'c'];
assert.equal(daftar.at(0), 'a');
assert.equal(daftar.at(-1), 'c');
assert.equal(daftar.at(-4), undefined);
assert.equal(daftar.at(3), undefined);
assert.equal(daftar.at(1.7), 'b', 'indeks pecahan harus dipotong ke bawah');

assert.equal('halo'.at(-1), 'o');
assert.equal('halo'.at(9), undefined);

assert.equal('a-b-c'.replaceAll('-', '+'), 'a+b+c');
assert.equal('aaa'.replaceAll('a', 'b'), 'bbb');
assert.equal('a.b'.replaceAll('.', '_'), 'a_b');
assert.equal('abc'.replace(/b/, 'X'), 'aXc');

pulihkan();
console.log('polifill: semua uji lulus');
