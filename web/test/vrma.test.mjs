/**
 * Uji berkas `.vrma` hasil konversi (tanpa browser).
 *
 * Uji ini meniru matematika `VRMAnimationLoaderPlugin` dari @pixiv/three-vrm-animation:
 *
 *     rotasi_normal(bone) = W_rest(parent) × L(t) × W_rest(bone)⁻¹
 *
 * lalu memeriksa hal-hal yang dulu membuat uji render gagal (avatar lenyap karena NaN):
 *   1. hierarki tulang + transformasi istirahat benar-benar ada di berkas;
 *   2. tinggi istirahat `hips` masuk akal (loader memakainya sebagai pembagi skala);
 *   3. tidak ada NaN / Inf di akses float;
 *   4. kuaternion bernorma 1, ayunan translasi hips wajar (tidak melempar avatar ke luar kamera);
 *   5. klip benar-benar menggerakkan tubuh: `idle_loop` tenang dengan lengan di bawah
 *      (bukan terangkat), `dance_loop` jumlah gerak seluruh sendi jauh lebih besar.
 */
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.resolve(here, '../../app/src/main/assets/animations');

const CLIPS = [
  'idle_loop',
  'idle_talk',
  'walk_loop',
  'dance_loop',
  'interact',
  'idle_torch',
  'spell_idle',
  'sitting_enter',
  'sitting_idle',
  'sitting_exit',
  'sitting_talk',
  'crouch_idle',
  'jump_start',
  'jump_land',
];

/** Anggaran ukuran seluruh klip yang dibundel (lihat docs/rencana-v3 §4). */
const BUDGET_BYTES = 900 * 1024;

function qMul(a, b) {
  const [ax, ay, az, aw] = a;
  const [bx, by, bz, bw] = b;
  return [
    aw * bx + ax * bw + ay * bz - az * by,
    aw * by - ax * bz + ay * bw + az * bx,
    aw * bz + ax * by - ay * bx + az * bw,
    aw * bw - ax * bx - ay * by - az * bz,
  ];
}
const qConj = (q) => [-q[0], -q[1], -q[2], q[3]];
const qLen = (q) => Math.hypot(q[0], q[1], q[2], q[3]);
/** Sudut rotasi yang diwakili kuaternion (0..π). */
const qAngle = (q) => 2 * Math.acos(Math.min(1, Math.abs(q[3])));

function readFloats(gltf, buffer, accessorIndex) {
  const accessor = gltf.accessors[accessorIndex];
  const view = gltf.bufferViews[accessor.bufferView];
  const width = { SCALAR: 1, VEC3: 3, VEC4: 4 }[accessor.type];
  const stride = view.byteStride || width * 4;
  const base = (view.byteOffset || 0) + (accessor.byteOffset || 0);
  const rows = [];
  for (let i = 0; i < accessor.count; i += 1) {
    const row = [];
    for (let c = 0; c < width; c += 1) {
      row.push(buffer.readFloatLE(base + i * stride + c * 4));
    }
    rows.push(row);
  }
  return rows;
}

function analyze(name) {
  const file = path.join(assetsDir, `${name}.vrma`);
  if (!existsSync(file)) throw new Error(`${name}.vrma tidak ditemukan (jalankan scripts/siapkan-klip-cc0.sh)`);
  const gltf = JSON.parse(readFileSync(file, 'utf8'));
  const buffer = Buffer.from(gltf.buffers[0].uri.split(',')[1], 'base64');

  const ext = gltf.extensions?.VRMC_vrm_animation;
  if (!ext) throw new Error(`${name}: ekstensi VRMC_vrm_animation hilang`);
  const humanBones = ext.humanoid?.humanBones || {};
  if (Object.keys(humanBones).length < 20) {
    throw new Error(`${name}: humanBones terlalu sedikit (${Object.keys(humanBones).length})`);
  }

  // Validasi semua akses float.
  let maxAbs = 0;
  gltf.accessors.forEach((accessor) => {
    readFloats(gltf, buffer, gltf.accessors.indexOf(accessor)).forEach((row) =>
      row.forEach((value) => {
        if (!Number.isFinite(value)) throw new Error(`${name}: nilai tidak terbatas pada accessor`);
        maxAbs = Math.max(maxAbs, Math.abs(value));
      }),
    );
  });

  // Hierarki + rotasi istirahat dunia.
  const parents = new Array(gltf.nodes.length).fill(-1);
  gltf.nodes.forEach((node, index) => (node.children || []).forEach((child) => (parents[child] = index)));
  const restWorld = new Array(gltf.nodes.length).fill(null);
  const resolveRest = (index) => {
    if (restWorld[index]) return restWorld[index];
    const rotation = gltf.nodes[index].rotation || [0, 0, 0, 1];
    const parent = parents[index] >= 0 ? resolveRest(parents[index]) : [0, 0, 0, 1];
    restWorld[index] = qMul(parent, rotation);
    return restWorld[index];
  };
  gltf.nodes.forEach((_, index) => resolveRest(index));

  const hipsIndex = humanBones.hips?.node;
  if (hipsIndex == null) throw new Error(`${name}: tidak ada tulang hips`);

  // Tinggi istirahat hips (posisi dunia) harus > 0, kalau tidak loader menghasilkan NaN.
  const hipsTranslation = gltf.nodes[hipsIndex].translation || [0, 0, 0];
  const parentIndex = parents[hipsIndex];
  const parentRotation = parentIndex >= 0 ? restWorld[parentIndex] : [0, 0, 0, 1];
  const rotated = (() => {
    const [x, y, z, w] = parentRotation;
    const [vx, vy, vz] = hipsTranslation;
    const tx = 2 * (y * vz - z * vy);
    const ty = 2 * (z * vx - x * vz);
    const tz = 2 * (x * vy - y * vx);
    return [
      vx + w * tx + (y * tz - z * ty),
      vy + w * ty + (z * tx - x * tz),
      vz + w * tz + (x * ty - y * tx),
    ];
  })();
  if (!(rotated[1] > 0.4 && rotated[1] < 1.6)) {
    throw new Error(`${name}: tinggi istirahat hips ${rotated[1].toFixed(3)} m di luar rentang wajar`);
  }

  // Kanal animasi.
  const animation = gltf.animations?.[0];
  if (!animation) throw new Error(`${name}: tidak ada animasi`);
  let duration = 0;
  let frameCount = 0;
  const rotations = new Map();
  let hipsTranslationRange = 0;
  animation.channels.forEach((channel) => {
    const sampler = animation.samplers[channel.sampler];
    const times = readFloats(gltf, buffer, sampler.input).map((row) => row[0]);
    duration = Math.max(duration, times[times.length - 1]);
    frameCount = Math.max(frameCount, times.length);
    const values = readFloats(gltf, buffer, sampler.output);
    if (channel.target.path === 'rotation') {
      values.forEach((q) => {
        if (Math.abs(qLen(q) - 1) > 0.01) throw new Error(`${name}: kuaternion tidak bernorma 1 (${qLen(q)})`);
      });
      rotations.set(channel.target.node, values);
    } else if (channel.target.path === 'translation') {
      if (channel.target.node !== hipsIndex) throw new Error(`${name}: translasi hanya boleh untuk hips`);
      // Nilai track adalah posisi lokal absolut (~tinggi pinggul). Yang harus wajar adalah
      // ayunannya terhadap rata-rata, bukan besarnya.
      const mean = [0, 1, 2].map((axis) => values.reduce((sum, v) => sum + v[axis], 0) / values.length);
      values.forEach((v) => {
        hipsTranslationRange = Math.max(
          hipsTranslationRange,
          Math.hypot(v[0] - mean[0], v[1] - mean[1], v[2] - mean[2]),
        );
      });
    }
  });
  if (hipsTranslationRange > 0.6) {
    throw new Error(`${name}: ayunan hips ${hipsTranslationRange.toFixed(2)} m terlalu besar`);
  }
  if (!(duration > 0.9)) throw new Error(`${name}: durasi ${duration.toFixed(2)} s terlalu pendek`);

  /** Sudut rotasi ternormalisasi (delta dari T-pose) untuk satu tulang, seluruh frame. */
  const normalizedAngles = (bone) => {
    const nodeIndex = humanBones[bone]?.node;
    if (nodeIndex == null) return [];
    const parent = parents[nodeIndex];
    const parentRest = parent >= 0 ? restWorld[parent] : [0, 0, 0, 1];
    const boneRestInverse = qConj(restWorld[nodeIndex]);
    const locals = rotations.get(nodeIndex);
    if (!locals) return [];
    return locals.map((local) => qAngle(qMul(parentRest, qMul(local, boneRestInverse))));
  };

  const deg = (rad) => (rad * 180) / Math.PI;
  const leftArm = normalizedAngles('leftUpperArm').map(deg);
  const rightArm = normalizedAngles('rightUpperArm').map(deg);
  // Jumlah rentang sudut semua kanal rotasi: ukuran kasar "banyaknya gerak".
  let totalSpread = 0;
  rotations.forEach((values) => {
    const angles = values.map((q) => deg(qAngle(q)));
    totalSpread += Math.max(...angles) - Math.min(...angles);
  });
  return {
    totalSpread,
    name,
    size: readFileSync(file).length,
    duration,
    frameCount,
    hipsY: rotated[1],
    maxAbs,
    leftArmMin: Math.min(...leftArm),
    leftArmMax: Math.max(...leftArm),
    rightArmMax: Math.max(...rightArm),
  };
}

let failures = 0;
const results = [];
for (const name of CLIPS) {
  try {
    const result = analyze(name);
    results.push(result);
    console.log(
      `✓ ${name}: ${(result.size / 1024).toFixed(1)} KB, ${result.duration.toFixed(2)} s, ` +
        `${result.frameCount} frame, hips ${result.hipsY.toFixed(2)} m, ` +
        `lengan kiri ${result.leftArmMin.toFixed(0)}–${result.leftArmMax.toFixed(0)}°, ` +
        `gerak ${result.totalSpread.toFixed(0)}°`,
    );
  } catch (error) {
    failures += 1;
    console.error(`✗ ${error.message}`);
  }
}

try {
  const idle = results.find((result) => result.name === 'idle_loop');
  const dance = results.find((result) => result.name === 'dance_loop');
  if (idle && dance) {
    // T-pose = 0°. Saat diam, lengan harus di bawah (50–100° dari T-pose), bukan terangkat.
    if (!(idle.leftArmMax > 50 && idle.leftArmMax < 100)) {
      throw new Error(
        `idle_loop tidak menempatkan lengan di bawah (delta ${idle.leftArmMax.toFixed(0)}° dari T-pose)`,
      );
    }
    // Idle harus tenang, tari harus jauh lebih banyak bergerak (semua sendi, bukan hanya lengan).
    if (!(idle.totalSpread < 120)) {
      throw new Error(`idle_loop terlalu berisik (total gerak ${idle.totalSpread.toFixed(0)}°)`);
    }
    if (!(dance.totalSpread > 200 && dance.totalSpread > idle.totalSpread * 2)) {
      throw new Error(
        `dance_loop (${dance.totalSpread.toFixed(0)}°) tidak jauh lebih aktif dari idle ` +
          `(${idle.totalSpread.toFixed(0)}°)`,
      );
    }
    const total = results.reduce((sum, result) => sum + result.size, 0);
    if (total > BUDGET_BYTES) {
      throw new Error(`total klip ${(total / 1024).toFixed(1)} KB melebihi anggaran 900 KB`);
    }
    if (results.length !== CLIPS.length) {
      throw new Error(`hanya ${results.length} dari ${CLIPS.length} klip yang diperiksa`);
    }
    console.log(
      `✓ total ${results.length} klip ${(total / 1024).toFixed(1)} KB (< 900 KB), lengan di bawah saat diam ` +
        `(${idle.leftArmMax.toFixed(0)}°), tari ${(dance.totalSpread / idle.totalSpread).toFixed(1)}× lebih aktif`,
    );
  } else {
    throw new Error('klip idle/dance tidak lengkap');
  }
} catch (error) {
  failures += 1;
  console.error(`✗ ${error.message}`);
}

if (failures) {
  console.error(`vrma: ${failures} pemeriksaan gagal`);
  process.exit(1);
}
console.log('vrma: semua pemeriksaan lulus');
