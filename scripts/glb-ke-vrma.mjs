#!/usr/bin/env node
/**
 * Mengubah klip humanoid dari glTF biasa (mis. Universal Animation Library milik Quaternius,
 * CC0) menjadi berkas `.vrma` (VRM Animation) yang bisa diputar avatar VRM mana pun.
 *
 * Kenapa perlu retarget, bukan salin rotasi:
 * Tulang rig sumber punya orientasi istirahat sendiri. Yang bisa dipindahkan ke VRM hanyalah
 * **perubahan orientasi terhadap pose istirahat**, dinyatakan di ruang yang sejajar dunia.
 * Karena itu skrip ini menghitung:
 *
 *     delta_world(bone) = W_anim × W_rest⁻¹
 *     rotasi_normal(bone) = delta_world(parent)⁻¹ × delta_world(bone)
 *
 * `rotasi_normal` persis bentuk yang dipakai sendi humanoid ternormalisasi VRM, sehingga
 * hasilnya bisa dipakai model VRM 0.x maupun 1.0 tanpa penyesuaian.
 *
 * Pemakaian:
 *   node scripts/glb-ke-vrma.mjs --input ual.gltf --bin ual.bin \
 *        --clip Idle_Loop:idle_loop --clip Dance_Loop:dance_loop --out app/src/main/assets/animations
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

// ---------------------------------------------------------------------------- kuaternion

const qIdentity = () => [0, 0, 0, 1];

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

function qConj(q) {
  return [-q[0], -q[1], -q[2], q[3]];
}

function qNorm(q) {
  const length = Math.hypot(q[0], q[1], q[2], q[3]) || 1;
  return [q[0] / length, q[1] / length, q[2] / length, q[3] / length];
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
    restRotation: qNorm(node.rotation ? node.rotation.slice() : qIdentity()),
    restTranslation: node.translation ? node.translation.slice() : [0, 0, 0],
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

function worldRotation(info, locals) {
  const cache = new Array(info.length).fill(null);
  const resolve = (index) => {
    if (cache[index]) return cache[index];
    const node = info[index];
    const local = locals[index] || node.restRotation;
    const parentWorld = node.parent >= 0 ? resolve(node.parent) : qIdentity();
    const world = qMul(parentWorld, local);
    cache[index] = world;
    return world;
  };
  return resolve;
}

function sampleTrack(times, values, t) {
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
  return qSlerp(qNorm(values[lo]), qNorm(values[hi]), alpha);
}

function sampleVector(times, values, t) {
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
  return values[lo].map((value, i) => value + (values[hi][i] - value) * alpha);
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
    const padded = buffer.length % 4 === 0 ? buffer : Buffer.concat([buffer, Buffer.alloc(4 - (buffer.length % 4))]);
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
    const view = this.pushFloat32(flat);
    this.accessors.push({ bufferView: view, componentType: 5126, count: quats.length, type: 'VEC4' });
    return this.accessors.length - 1;
  }

  addVec3Accessor(vectors) {
    const flat = [];
    vectors.forEach((v) => flat.push(...v));
    const view = this.pushFloat32(flat);
    this.accessors.push({ bufferView: view, componentType: 5126, count: vectors.length, type: 'VEC3' });
    return this.accessors.length - 1;
  }
}

function convert({ gltf, bin, clipName, outputName, fps = 30 }) {
  const clip = gltf.animations.find((animation) => animation.name === clipName);
  if (!clip) throw new Error(`klip "${clipName}" tidak ditemukan`);

  const info = buildNodeInfo(gltf);
  const bones = new Map();
  info.forEach((node) => {
    const bone = BONE_MAP[node.name];
    if (bone) bones.set(node.index, bone);
  });
  if (bones.size < 15) {
    throw new Error(`hanya ${bones.size} tulang yang cocok; periksa BONE_MAP`);
  }

  // Kanal rotasi/translasi dari klip sumber.
  const rotationTracks = new Map();
  const translationTracks = new Map();
  let endTime = 0;
  clip.channels.forEach((channel) => {
    const sampler = clip.samplers[channel.sampler];
    const times = readAccessor(gltf, bin, sampler.input).map((row) => row[0]);
    endTime = Math.max(endTime, times[times.length - 1] || 0);
    if (channel.target.path === 'rotation') {
      rotationTracks.set(channel.target.node, { times, values: readAccessor(gltf, bin, sampler.output) });
    } else if (channel.target.path === 'translation') {
      translationTracks.set(channel.target.node, { times, values: readAccessor(gltf, bin, sampler.output) });
    }
  });

  // Pose istirahat di ruang dunia (untuk delta).
  const resolveRest = worldRotation(info, info.map((node) => node.restRotation));
  const restWorld = info.map((node) => resolveRest(node.index));

  const steps = Math.max(2, Math.round(endTime * fps));
  const times = Array.from({ length: steps + 1 }, (_, index) => (index / steps) * endTime);

  const samples = new Map(); // boneIndex -> quats
  const hipsPositions = [];
  bones.forEach((_, index) => samples.set(index, []));

  times.forEach((t) => {
    const locals = info.map((node) => {
      const track = rotationTracks.get(node.index);
      return track ? sampleTrack(track.times, track.values, t) : node.restRotation;
    });
    const resolveAnim = worldRotation(info, locals);
    const animWorld = info.map((node) => resolveAnim(node.index));

    // delta_world = W_anim × W_rest⁻¹
    const deltas = new Map();
    bones.forEach((_, index) => {
      deltas.set(index, qMul(animWorld[index], qConj(restWorld[index])));
    });

    bones.forEach((_, index) => {
      const parent = info[index].parent;
      // Cari tulang terdekat di atasnya yang juga dipetakan ke humanoid VRM.
      let parentMapped = -1;
      let cursor = parent;
      while (cursor >= 0) {
        if (bones.has(cursor)) {
          parentMapped = cursor;
          break;
        }
        cursor = info[cursor].parent;
      }
      const parentDelta = parentMapped >= 0 ? deltas.get(parentMapped) : qIdentity();
      const local = qMul(qConj(parentDelta), deltas.get(index));
      samples.get(index).push(qNorm(local));
    });

    const hipsTrack = translationTracks.get([...bones.entries()].find(([, bone]) => bone === 'hips')[0]);
    const hipsIndex = [...bones.entries()].find(([, bone]) => bone === 'hips')[0];
    if (hipsTrack) {
      const value = sampleVector(hipsTrack.times, hipsTrack.values, t);
      const rest = info[hipsIndex].restTranslation;
      hipsPositions.push([value[0] - rest[0], value[1] - rest[1], value[2] - rest[2]]);
    } else {
      hipsPositions.push([0, 0, 0]);
    }
  });

  // glTF keluaran.
  const builder = new Builder();
  const timeAccessor = builder.addTimeAccessor(times);
  const nodes = [];
  const humanBones = {};
  bones.forEach((bone, index) => {
    nodes.push({ name: bone });
  });
  const nodeIndex = new Map();
  [...bones.keys()].forEach((sourceIndex, outputIndex) => nodeIndex.set(sourceIndex, outputIndex));

  const animationChannels = [];
  const animationSamplers = [];
  bones.forEach((bone, sourceIndex) => {
    const quats = samples.get(sourceIndex);
    const outputAccessor = builder.addQuatAccessor(quats);
    animationSamplers.push({ input: timeAccessor, output: outputAccessor, interpolation: 'LINEAR' });
    animationChannels.push({ sampler: animationSamplers.length - 1, target: { node: nodeIndex.get(sourceIndex), path: 'rotation' } });
    humanBones[bone] = { node: nodeIndex.get(sourceIndex) };
  });

  const hipsSource = [...bones.entries()].find(([, bone]) => bone === 'hips')[0];
  if (hipsSource !== undefined) {
    const positionAccessor = builder.addVec3Accessor(hipsPositions);
    animationSamplers.push({ input: timeAccessor, output: positionAccessor, interpolation: 'LINEAR' });
    animationChannels.push({
      sampler: animationSamplers.length - 1,
      target: { node: nodeIndex.get(hipsSource), path: 'translation' },
    });
  }

  // Sambungkan bufferViews ke satu buffer.
  const buffer = Buffer.concat(builder.chunks);
  const output = {
    asset: { version: '2.0', generator: 'mate-engine-android/glb-ke-vrma' },
    extensionsUsed: ['VRMC_vrm_animation'],
    extensions: {
      VRMC_vrm_animation: {
        specVersion: '1.0',
        humanoid: { humanBones },
      },
    },
    scene: 0,
    scenes: [{ nodes: nodes.map((_, index) => index) }],
    nodes,
    animations: [
      {
        name: outputName,
        channels: animationChannels,
        samplers: animationSamplers,
      },
    ],
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
    bones: bones.size,
    duration: endTime,
  };
}

// ---------------------------------------------------------------------------- CLI

function parseArgs(argv) {
  const args = { clips: [], fps: 30 };
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
    console.error('pemakaian: node scripts/glb-ke-vrma.mjs --input a.gltf --bin a.bin --clip Sumber:keluaran --out folder');
    process.exitCode = 1;
    return;
  }
  const gltf = JSON.parse(readFileSync(args.input, 'utf8'));
  const bin = readFileSync(args.bin || args.input.replace(/\.gltf$/, '.bin'));
  mkdirSync(args.out, { recursive: true });

  args.clips.forEach(({ source, target }) => {
    const result = convert({ gltf, bin, clipName: source, outputName: target, fps: args.fps });
    const path = join(args.out, `${target}.vrma`);
    writeFileSync(path, result.bytes);
    console.log(
      `${target}.vrma  ${(result.bytes.length / 1024).toFixed(1)} KB  ` +
        `${result.bones} tulang  ${result.duration.toFixed(2)} s`,
    );
  });
}

main();
