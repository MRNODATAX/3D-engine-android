#!/usr/bin/env node
/**
 * Mengubah klip humanoid dari glTF biasa (mis. Universal Animation Library milik Quaternius,
 * CC0) menjadi berkas `.vrma` (VRM Animation) yang bisa diputar avatar VRM mana pun.
 *
 * Kunci format (lihat @pixiv/three-vrm-animation, `VRMAnimationLoaderPlugin`):
 *   - berkas `.vrma` **wajib membawa hierarki tulang beserta transformasi istirahatnya**;
 *   - track rotasi berisi rotasi **lokal mentah** rig sumber (bukan delta yang sudah dinormalkan),
 *     karena loader sendiri yang mengubahnya ke ruang humanoid ternormalisasi VRM:
 *         rotasi_normal = W_rest(parent) × L(t) × W_rest(bone)⁻¹
 *   - track translasi hanya boleh untuk `hips`, dan nilainya posisi lokal `hips`.
 *   - loader menskalakan hips dengan `tinggiHipsVRM / tinggiHipsAnimasi`, jadi posisi istirahat
 *     hips **tidak boleh nol** (kalau nol, hasilnya NaN dan avatar lenyap — ini pernah terjadi
 *     pada versi pertama skrip dan tertangkap uji render di CI).
 *
 * Pemakaian:
 *   node scripts/glb-ke-vrma.mjs --input ual.gltf --bin ual.bin \
 *        --clip Idle_Loop:idle_loop --clip Dance_Loop:dance_loop --out app/src/main/assets/animations
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

// ---------------------------------------------------------------------------- kuaternion

const qIdentity = () => [0, 0, 0, 1];

function qNorm(q) {
  const length = Math.hypot(q[0], q[1], q[2], q[3]) || 1;
  return [q[0] / length, q[1] / length, q[2] / length, q[3] / length];
}

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

function qSlerp(a, b, t) {
  let dot = a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
  let bb = b;
  if (dot < 0) {
    dot = -dot;
    bb = [-b[0], -b[1], -b[2], -b[3]];
  }
  if (dot > 0.9995) {
    return qNorm([
      a[0] + (bb[0] - a[0]) * t,
      a[1] + (bb[1] - a[1]) * t,
      a[2] + (bb[2] - a[2]) * t,
      a[3] + (bb[3] - a[3]) * t,
    ]);
  }
  const theta = Math.acos(Math.min(1, dot));
  const sinTheta = Math.sin(theta);
  const w1 = Math.sin((1 - t) * theta) / sinTheta;
  const w2 = Math.sin(t * theta) / sinTheta;
  return qNorm([
    a[0] * w1 + bb[0] * w2,
    a[1] * w1 + bb[1] * w2,
    a[2] * w1 + bb[2] * w2,
    a[3] * w1 + bb[3] * w2,
  ]);
}

/** Rotasi kuaternion diterapkan ke vektor (v' = q · v). */
function qRotate(q, v) {
  const [x, y, z, w] = q;
  const [vx, vy, vz] = v;
  // t = 2 · (q.xyz × v)
  const tx = 2 * (y * vz - z * vy);
  const ty = 2 * (z * vx - x * vz);
  const tz = 2 * (x * vy - y * vx);
  return [
    vx + w * tx + (y * tz - z * ty),
    vy + w * ty + (z * tx - x * tz),
    vz + w * tz + (x * ty - y * tx),
  ];
}

// ---------------------------------------------------------------------------- glTF input

function readAccessor(gltf, bin, index) {
  const accessor = gltf.accessors[index];
  const view = gltf.bufferViews[accessor.bufferView];
  const componentCount = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4 }[accessor.type];
  if (accessor.componentType !== 5126) {
    throw new Error(`accessor ${index}: hanya float32 yang didukung (dapat ${accessor.componentType})`);
  }
  const stride = view.byteStride || componentCount * 4;
  const base = (view.byteOffset || 0) + (accessor.byteOffset || 0);
  const result = [];
  for (let i = 0; i < accessor.count; i += 1) {
    const row = [];
    for (let c = 0; c < componentCount; c += 1) {
      row.push(bin.readFloatLE(base + i * stride + c * 4));
    }
    result.push(row);
  }
  return result;
}

function buildNodeInfo(gltf) {
  const parents = new Array(gltf.nodes.length).fill(-1);
  gltf.nodes.forEach((node, index) => {
    (node.children || []).forEach((child) => {
      parents[child] = index;
    });
  });
  return gltf.nodes.map((node, index) => ({
    index,
    name: node.name || `node_${index}`,
    parent: parents[index],
    children: node.children ? node.children.slice() : [],
    restRotation: qNorm(node.rotation ? node.rotation.slice() : qIdentity()),
    restTranslation: node.translation ? node.translation.slice() : [0, 0, 0],
    restScale: node.scale ? node.scale.slice() : [1, 1, 1],
  }));
}

const BONE_MAP = {
  'DEF-hips': 'hips',
  'DEF-spine.001': 'spine',
  'DEF-spine.002': 'chest',
  'DEF-spine.003': 'upperChest',
  'DEF-neck': 'neck',
  'DEF-head': 'head',
  'DEF-shoulder.L': 'leftShoulder',
  'DEF-upper_arm.L': 'leftUpperArm',
  'DEF-forearm.L': 'leftLowerArm',
  'DEF-hand.L': 'leftHand',
  'DEF-shoulder.R': 'rightShoulder',
  'DEF-upper_arm.R': 'rightUpperArm',
  'DEF-forearm.R': 'rightLowerArm',
  'DEF-hand.R': 'rightHand',
  'DEF-thigh.L': 'leftUpperLeg',
  'DEF-shin.L': 'leftLowerLeg',
  'DEF-foot.L': 'leftFoot',
  'DEF-toe.L': 'leftToes',
  'DEF-thigh.R': 'rightUpperLeg',
  'DEF-shin.R': 'rightLowerLeg',
  'DEF-foot.R': 'rightFoot',
  'DEF-toe.R': 'rightToes',
};

function sampleTrack(times, values, t, isQuaternion) {
  if (t <= times[0]) return values[0];
  if (t >= times[times.length - 1]) return values[values.length - 1];
  let lo = 0;
  let hi = times.length - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (times[mid] <= t) lo = mid;
    else hi = mid;
  }
  const span = times[hi] - times[lo] || 1;
  const alpha = (t - times[lo]) / span;
  if (isQuaternion) return qSlerp(values[lo], values[hi], alpha);
  return values[lo].map((value, i) => value + (values[hi][i] - value) * alpha);
}

/** Posisi dunia `hips` dari transformasi istirahat (dipakai loader untuk skala). */
function restHipsWorldY(info, hipsIndex) {
  const chain = [];
  let cursor = hipsIndex;
  while (cursor >= 0) {
    chain.unshift(cursor);
    cursor = info[cursor].parent;
  }
  let position = [0, 0, 0];
  let rotation = qIdentity();
  chain.forEach((index) => {
    const node = info[index];
    const rotated = qRotate(rotation, node.restTranslation);
    position = [position[0] + rotated[0], position[1] + rotated[1], position[2] + rotated[2]];
    rotation = qMul(rotation, node.restRotation);
  });
  return position[1];
}

// ---------------------------------------------------------------------------- glTF output

class Builder {
  constructor() {
    this.chunks = [];
    this.byteLength = 0;
    this.accessors = [];
    this.bufferViews = [];
  }

  pushFloat32(data) {
    const buffer = Buffer.alloc(data.length * 4);
    data.forEach((value, index) => buffer.writeFloatLE(value, index * 4));
    const padded =
      buffer.length % 4 === 0 ? buffer : Buffer.concat([buffer, Buffer.alloc(4 - (buffer.length % 4))]);
    this.bufferViews.push({ buffer: 0, byteOffset: this.byteLength, byteLength: buffer.length });
    this.chunks.push(padded);
    this.byteLength += padded.length;
    return this.bufferViews.length - 1;
  }

  addTimeAccessor(times) {
    const view = this.pushFloat32(times);
    this.accessors.push({
      bufferView: view,
      componentType: 5126,
      count: times.length,
      type: 'SCALAR',
      min: [Math.min(...times)],
      max: [Math.max(...times)],
    });
    return this.accessors.length - 1;
  }

  addQuatAccessor(quats) {
    const flat = [];
    quats.forEach((q) => flat.push(...q));
    this.accessors.push({
      bufferView: this.pushFloat32(flat),
      componentType: 5126,
      count: quats.length,
      type: 'VEC4',
    });
    return this.accessors.length - 1;
  }

  addVec3Accessor(vectors) {
    const flat = [];
    vectors.forEach((v) => flat.push(...v));
    this.accessors.push({
      bufferView: this.pushFloat32(flat),
      componentType: 5126,
      count: vectors.length,
      type: 'VEC3',
    });
    return this.accessors.length - 1;
  }
}

function convert({ gltf, bin, clipName, outputName, fps = 24 }) {
  const clip = gltf.animations?.find((animation) => animation.name === clipName);
  if (!clip) throw new Error(`klip "${clipName}" tidak ditemukan`);

  const info = buildNodeInfo(gltf);
  const humanBones = {};
  info.forEach((node) => {
    const bone = BONE_MAP[node.name];
    if (bone) humanBones[bone] = node.index;
  });
  if (Object.keys(humanBones).length < 15) {
    throw new Error(`hanya ${Object.keys(humanBones).length} tulang yang cocok; periksa BONE_MAP`);
  }
  const hipsIndex = humanBones.hips;

  // Pose istirahat hips tidak boleh nol: loader memakai tingginya sebagai pembagi skala.
  const hipsY = restHipsWorldY(info, hipsIndex);
  if (!(hipsY > 0.2)) {
    throw new Error(`tinggi istirahat hips ${hipsY.toFixed(3)} m terlalu rendah (akan menghasilkan NaN)`);
  }

  const rotationTracks = new Map();
  const translationTracks = new Map();
  let endTime = 0;
  clip.channels.forEach((channel) => {
    const sampler = clip.samplers[channel.sampler];
    const times = readAccessor(gltf, bin, sampler.input).map((row) => row[0]);
    endTime = Math.max(endTime, times[times.length - 1] || 0);
    const values = readAccessor(gltf, bin, sampler.output);
    if (channel.target.path === 'rotation') rotationTracks.set(channel.target.node, { times, values });
    else if (channel.target.path === 'translation') translationTracks.set(channel.target.node, { times, values });
  });
  if (!(endTime > 0)) throw new Error(`klip "${clipName}" berdurasi nol`);

  const steps = Math.max(2, Math.round(endTime * fps));
  const times = Array.from({ length: steps + 1 }, (_, index) => (index / steps) * endTime);

  // Rotasi lokal mentah hasil sampling, per tulang yang dipetakan.
  const sampledRotations = new Map();
  Object.values(humanBones).forEach((nodeIndex) => sampledRotations.set(nodeIndex, []));
  const hipsPositions = [];

  times.forEach((t) => {
    Object.entries(humanBones).forEach(([, nodeIndex]) => {
      const node = info[nodeIndex];
      const track = rotationTracks.get(nodeIndex);
      const value = track
        ? sampleTrack(track.times, track.values, t, true)
        : node.restRotation;
      sampledRotations.get(nodeIndex).push(qNorm(value));
    });

    const hipsTrack = translationTracks.get(hipsIndex);
    hipsPositions.push(
      hipsTrack ? sampleTrack(hipsTrack.times, hipsTrack.values, t, false) : info[hipsIndex].restTranslation,
    );
  });

  const builder = new Builder();
  const timeAccessor = builder.addTimeAccessor(times);

  // Hierarki tulang + transformasi istirahat, apa adanya dari rig sumber.
  const nodes = info.map((node) => {
    const output = { name: node.name };
    if (node.restTranslation.some((value) => value !== 0)) output.translation = node.restTranslation;
    if (node.restRotation.some((value, index) => value !== qIdentity()[index])) output.rotation = node.restRotation;
    if (node.restScale.some((value) => value !== 1)) output.scale = node.restScale;
    if (node.children.length) output.children = node.children;
    return output;
  });
  const roots = info.filter((node) => node.parent < 0).map((node) => node.index);

  const animationChannels = [];
  const animationSamplers = [];

  // Rotasi per tulang humanoid (urutan kunci stabil: sesuai urutan BONE_MAP).
  Object.entries(BONE_MAP).forEach(([, boneName]) => {
    const nodeIndex = humanBones[boneName];
    if (nodeIndex == null) return;
    const outputAccessor = builder.addQuatAccessor(sampledRotations.get(nodeIndex));
    animationSamplers.push({ input: timeAccessor, output: outputAccessor, interpolation: 'LINEAR' });
    animationChannels.push({
      sampler: animationSamplers.length - 1,
      target: { node: nodeIndex, path: 'rotation' },
    });
  });

  // Translasi hanya untuk hips (batasan spesifikasi VRMC_vrm_animation).
  const positionAccessor = builder.addVec3Accessor(hipsPositions);
  animationSamplers.push({ input: timeAccessor, output: positionAccessor, interpolation: 'LINEAR' });
  animationChannels.push({
    sampler: animationSamplers.length - 1,
    target: { node: hipsIndex, path: 'translation' },
  });

  const buffer = Buffer.concat(builder.chunks);
  const output = {
    asset: { version: '2.0', generator: 'mate-engine-android/glb-ke-vrma' },
    extensionsUsed: ['VRMC_vrm_animation'],
    extensions: {
      VRMC_vrm_animation: {
        specVersion: '1.0',
        humanoid: {
          humanBones: Object.fromEntries(
            Object.entries(humanBones).map(([bone, node]) => [bone, { node }]),
          ),
        },
      },
    },
    scene: 0,
    scenes: [{ nodes: roots }],
    nodes,
    animations: [{ name: outputName, channels: animationChannels, samplers: animationSamplers }],
    accessors: builder.accessors,
    bufferViews: builder.bufferViews,
    buffers: [
      {
        byteLength: buffer.length,
        uri: `data:application/octet-stream;base64,${buffer.toString('base64')}`,
      },
    ],
  };

  return {
    json: output,
    bytes: Buffer.from(JSON.stringify(output)),
    bones: Object.keys(humanBones).length,
    duration: endTime,
    hipsY,
    frames: times.length,
  };
}

// ---------------------------------------------------------------------------- CLI

function parseArgs(argv) {
  const args = { clips: [], fps: 24 };
  for (let i = 0; i < argv.length; i += 1) {
    const key = argv[i];
    if (key === '--input') args.input = argv[++i];
    else if (key === '--bin') args.bin = argv[++i];
    else if (key === '--out') args.out = argv[++i];
    else if (key === '--fps') args.fps = Number(argv[++i]);
    else if (key === '--clip') {
      const [source, target] = argv[++i].split(':');
      args.clips.push({ source, target: target || source });
    }
  }
  return args;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.input || args.clips.length === 0) {
    console.error(
      'pemakaian: node scripts/glb-ke-vrma.mjs --input a.gltf --bin a.bin --clip Sumber:keluaran --out folder',
    );
    process.exitCode = 1;
    return;
  }
  const gltf = JSON.parse(readFileSync(args.input, 'utf8'));
  const bin = readFileSync(args.bin || args.input.replace(/\.gltf$/, '.bin'));
  mkdirSync(args.out, { recursive: true });

  args.clips.forEach(({ source, target }) => {
    const result = convert({ gltf, bin, clipName: source, outputName: target, fps: args.fps });
    writeFileSync(join(args.out, `${target}.vrma`), result.bytes);
    console.log(
      `${target}.vrma  ${(result.bytes.length / 1024).toFixed(1)} KB  ` +
        `${result.bones} tulang  ${result.duration.toFixed(2)} s  ` +
        `${result.frames} frame  hips ${result.hipsY.toFixed(2)} m`,
    );
  });
}

main();
