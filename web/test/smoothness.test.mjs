/**
 * Uji batas sendi & ayunan geser (matematika murni, tanpa three.js).
 *
 * Yang dibuktikan:
 *  1. offset di luar batas dijepit ke batas anatomis;
 *  2. offset wajar tidak diubah sama sekali;
 *  3. batas tekuk total (siku/lutut/leher/pinggang) masuk akal;
 *  4. ayunan geser sebanding kecepatan, berlawanan arah, dan selalu ≤ 8°;
 *  5. peluruhan kembali ke nol dan stabil untuk delta waktu besar.
 */
import {
  JOINT_LIMITS,
  JOINT_RANGES,
  clampJoint,
  isWithinLimits,
  decayToward,
  dragSway,
} from '../src/limits.js';

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const DEG = Math.PI / 180;
let failures = 0;

// ------------------------------------------------------------------ 1. penjepitan
try {
  let clamped = 0;
  for (const [joint, limit] of Object.entries(JOINT_LIMITS)) {
    const extreme = { x: 5, y: -5, z: 5 }; // jauh di luar batas
    const result = clampJoint(joint, extreme);
    assert(isWithinLimits(joint, result), `${joint}: hasil jepitan masih di luar batas`);
    assert(Math.abs(result.x) <= limit.x * DEG + 1e-9, `${joint}: sumbu x tidak terjepit`);
    assert(Math.abs(result.z) <= limit.z * DEG + 1e-9, `${joint}: sumbu z tidak terjepit`);
    clamped += 1;
  }
  console.log(`✓ ${clamped} sendi dijepit ke batas anatomisnya`);
} catch (error) {
  failures += 1;
  console.error(`✗ penjepitan: ${error.message}`);
}

// ------------------------------------------------------------------ 2. offset wajar utuh
try {
  const samples = [
    { x: 0.02, y: -0.01, z: 0.03 },
    { x: -0.05, y: 0.02, z: 0 },
    { x: 0, y: 0, z: 0 },
  ];
  for (const sample of samples) {
    const result = clampJoint('spine', sample);
    for (const axis of ['x', 'y', 'z']) {
      assert(Math.abs(result[axis] - sample[axis]) < 1e-12, `offset wajar berubah di sumbu ${axis}`);
    }
  }
  console.log('✓ offset kecil (gerak napas/goyangan) tidak diubah');
} catch (error) {
  failures += 1;
  console.error(`✗ offset wajar: ${error.message}`);
}

// ------------------------------------------------------------------ 3. batas total
try {
  // Batas per-sumbu harus konsisten dengan batas total yang dipakai uji gerak.
  assert(JOINT_RANGES.elbow >= 120 && JOINT_RANGES.elbow <= 160, 'batas siku tidak wajar');
  assert(JOINT_RANGES.knee >= 120 && JOINT_RANGES.knee <= 160, 'batas lutut tidak wajar');
  assert(JOINT_RANGES.neck <= 45, 'batas leher terlalu longgar');
  assert(JOINT_RANGES.waist <= 30, 'batas pinggang terlalu longgar');
  for (const joint of ['leftLowerArm', 'rightLowerArm']) {
    const limit = JOINT_LIMITS[joint];
    const total = Math.hypot(limit.x, limit.y, limit.z) * 1; // derajat
    assert(total <= JOINT_RANGES.elbow, `${joint}: total batas ${total.toFixed(0)}° melebihi batas siku`);
  }
  console.log(
    `✓ batas total: siku ≤ ${JOINT_RANGES.elbow}°, lutut ≤ ${JOINT_RANGES.knee}°, ` +
      `leher ≤ ${JOINT_RANGES.neck}°, pinggang ≤ ${JOINT_RANGES.waist}°`,
  );
} catch (error) {
  failures += 1;
  console.error(`✗ batas total: ${error.message}`);
}

// ------------------------------------------------------------------ 4. ayunan geser
try {
  const right = dragSway(1200, 0);
  const left = dragSway(-1200, 0);
  const fast = dragSway(4000, 0);
  assert(right.spineZ < 0, 'geser ke kanan seharusnya memiringkan badan ke kiri');
  assert(left.spineZ > 0, 'geser ke kiri seharusnya memiringkan badan ke kanan');
  assert(Math.abs(right.headZ) < Math.abs(right.spineZ), 'kepala menoleh lebih jauh dari badan');
  assert(Math.sign(right.headZ) === -Math.sign(right.spineZ), 'kepala seharusnya menyeimbangkan badan');
  const max = 8 * DEG;
  for (const value of [right, left, fast, dragSway(0, 9999), dragSway(0, -9999)]) {
    assert(Math.abs(value.spineZ) <= max + 1e-9, `ayunan ${value.spineZ} melebihi 8°`);
    assert(Math.abs(value.spineX) <= max + 1e-9, `ayunan vertikal ${value.spineX} melebihi 8°`);
  }
  assert(Math.abs(fast.spineZ) > Math.abs(right.spineZ), 'geser lebih cepat harus lebih miring');
  console.log(
    `✓ ayunan geser: 1200 px/s → ${(Math.abs(right.spineZ) / DEG).toFixed(1)}°, ` +
      `dibatasi ${(max / DEG).toFixed(0)}°`,
  );
} catch (error) {
  failures += 1;
  console.error(`✗ ayunan geser: ${error.message}`);
}

// ------------------------------------------------------------------ 5. peluruhan
try {
  let value = 1;
  for (let i = 0; i < 60; i += 1) value = decayToward(value, 0, 220, 1000 / 60);
  // Waktu paruh 220 ms: setelah 1 detik tersisa ~0,04 (≈ 4,5 waktu paruh).
  assert(value < 0.06, `peluruhan terlalu lambat (${value.toFixed(3)} setelah 1 detik)`);
  let longer = 1;
  for (let i = 0; i < 60; i += 1) longer = decayToward(longer, 0, 220, 1000 / 60);
  assert(longer <= value + 1e-9, 'peluruhan tidak monoton');
  for (let i = 0; i < 60; i += 1) longer = decayToward(longer, 0, 220, 1000 / 60);
  assert(longer < 0.005, `ayunan belum hilang setelah 2 detik (${longer.toFixed(4)})`);
  // Frame yang di-throttle (mis. 2 detik) tidak boleh menghasilkan nilai negatif/aneh.
  const jumped = decayToward(1, 0, 220, 2000);
  assert(jumped >= 0 && jumped <= 1, `peluruhan untuk delta besar menghasilkan ${jumped}`);
  const halfLife = decayToward(1, 0, 220, 220);
  assert(Math.abs(halfLife - 0.5) < 0.01, `waktu paruh tidak tepat (${halfLife.toFixed(3)})`);
  console.log('✓ peluruhan stabil, waktu paruh tepat, aman untuk frame yang di-throttle');
} catch (error) {
  failures += 1;
  console.error(`✗ peluruhan: ${error.message}`);
}

if (failures) {
  console.error(`smoothness: ${failures} pemeriksaan gagal`);
  process.exit(1);
}
console.log('smoothness: semua pemeriksaan lulus');
