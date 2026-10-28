/**
 * Batas anatomis sendi (radian) untuk lapisan gerak prosedural.
 *
 * Kenapa perlu: lapisan prosedural menumpuk offset di atas klip animasi. Tanpa pagar, kombinasi
 * napas + goyangan + reaksi bisa menghasilkan siku yang menekuk ke arah mustahil. Batas di sini
 * berlaku per-sumbu dan sengaja longgar (gerak kita kecil), fungsinya menahan kasus ekstrem.
 *
 * Modul ini murni matematika: bisa diuji di Node tanpa three.js.
 */

const DEG = Math.PI / 180;

/**
 * Batas per sendi, dalam derajat, per sumbu Euler (x = tekuk depan-belakang,
 * y = putar kiri-kanan, z = miring samping).
 */
export const JOINT_LIMITS = {
  hips: { x: 12, y: 25, z: 12 },
  spine: { x: 14, y: 18, z: 14 },
  chest: { x: 14, y: 20, z: 14 },
  neck: { x: 25, y: 35, z: 20 },
  head: { x: 28, y: 45, z: 25 },
  leftShoulder: { x: 20, y: 20, z: 20 },
  rightShoulder: { x: 20, y: 20, z: 20 },
  leftUpperArm: { x: 60, y: 55, z: 60 },
  rightUpperArm: { x: 60, y: 55, z: 60 },
  leftLowerArm: { x: 60, y: 20, z: 25 },
  rightLowerArm: { x: 60, y: 20, z: 25 },
  leftUpperLeg: { x: 45, y: 25, z: 25 },
  rightUpperLeg: { x: 45, y: 25, z: 25 },
  leftLowerLeg: { x: 50, y: 12, z: 12 },
  rightLowerLeg: { x: 50, y: 12, z: 12 },
};

/** Batas tekuk total (derajat) yang dianggap masih wajar untuk uji. */
export const JOINT_RANGES = {
  elbow: 150,
  knee: 150,
  neck: 45,
  waist: 30,
};

const DEFAULT_LIMIT = { x: 30, y: 30, z: 30 };

/**
 * Jepit satu offset sendi ke batasnya. Mengembalikan objek baru supaya mudah diuji.
 * @param {string} joint
 * @param {{x:number,y:number,z:number}} offset radian
 */
export function clampJoint(joint, offset) {
  const limit = JOINT_LIMITS[joint] ?? DEFAULT_LIMIT;
  const clamp = (value, degrees) => {
    const max = degrees * DEG;
    return Math.min(max, Math.max(-max, value));
  };
  return {
    x: clamp(offset.x ?? 0, limit.x),
    y: clamp(offset.y ?? 0, limit.y),
    z: clamp(offset.z ?? 0, limit.z),
  };
}

/** Apakah offset sudah berada di dalam batas (tanpa mengubah apa pun)? */
export function isWithinLimits(joint, offset) {
  const limit = JOINT_LIMITS[joint] ?? DEFAULT_LIMIT;
  const within = (value, degrees) => Math.abs(value ?? 0) <= degrees * DEG + 1e-6;
  return within(offset.x, limit.x) && within(offset.y, limit.y) && within(offset.z, limit.z);
}

/**
 * Peluruhan eksponensial yang stabil terhadap delta waktu besar (mis. frame yang di-throttle).
 * @param {number} value nilai sekarang
 * @param {number} target nilai tujuan
 * @param {number} halfLifeMs waktu paruh
 * @param {number} deltaMs
 */
export function decayToward(value, target, halfLifeMs, deltaMs) {
  if (halfLifeMs <= 0) return target;
  const factor = 1 - Math.pow(0.5, Math.max(0, deltaMs) / halfLifeMs);
  return value + (target - value) * Math.min(1, Math.max(0, factor));
}

/**
 * Kemiringan badan karena digeser (drag sway).
 *
 * Saat avatar digeser, badan tertinggal sedikit lalu mengikuti. Nilai dikembalikan dalam radian
 * untuk spine (z) dan head (z, berlawanan arah agar kepala tetap tegak).
 *
 * @param {number} velocityX kecepatan geser horizontal (piksel/detik, positif ke kanan)
 * @param {number} velocityY kecepatan geser vertikal (piksel/detik, positif ke bawah)
 * @returns {{spineZ:number, headZ:number, spineX:number}}
 */
export function dragSway(velocityX, velocityY) {
  const maxLean = 8 * DEG;
  const normalize = (value) => Math.max(-1, Math.min(1, value / 2400));
  const x = normalize(velocityX ?? 0);
  const y = normalize(velocityY ?? 0);
  return {
    spineZ: -x * maxLean,
    headZ: x * maxLean * 0.45,
    spineX: y * maxLean * 0.5,
  };
}
