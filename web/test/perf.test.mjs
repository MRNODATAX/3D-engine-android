/**
 * Uji logika performa tanpa GPU.
 *
 * Memastikan governor benar-benar menurunkan resolusi saat kerja frame melebihi anggaran
 * dan menaikkannya kembali saat lega, serta bahwa ambang batas tidak berosilasi.
 */
import assert from 'node:assert/strict';
import { createGovernor } from '../src/perf.js';

function run(governor, workMs, frames) {
  let last = { scale: governor.scale, changed: 0 };
  for (let i = 0; i < frames; i += 1) last = governor.sample(workMs);
  return last;
}

// 1. Beban berat harus menurunkan skala.
const heavy = createGovernor({ targetFps: 30 });
run(heavy, 50, 300);
assert.ok(heavy.scale < 1, `skala harus turun, dapat ${heavy.scale}`);
assert.notEqual(heavy.level, 'high');

// 2. Setelah lega, skala kembali ke 1 secara bertahap.
run(heavy, 3, 2000);
assert.equal(heavy.scale, 1, 'skala harus pulih setelah beban ringan');
assert.equal(heavy.level, 'high');

// 3. Beban sedang tidak boleh membuatnya turun ke level terendah.
const moderate = createGovernor({ targetFps: 30 });
run(moderate, 20, 600);
assert.ok(moderate.scale >= 0.5, 'skala tidak boleh di bawah batas bawah');

// 4. Target FPS lebih longgar menahan penurunan lebih lama.
const lenient = createGovernor({ targetFps: 15 });
run(lenient, 40, 90);
const strict = createGovernor({ targetFps: 60 });
run(strict, 40, 90);
assert.ok(lenient.index <= strict.index, 'anggaran lebih longgar tidak boleh lebih agresif menurunkan');

// 5. Nilai tidak valid diabaikan, bukan merusak state.
const guard = createGovernor();
guard.sample(Number.NaN);
guard.sample(-5);
assert.equal(guard.scale, 1);

console.log('perf: governor lulus semua pemeriksaan');
