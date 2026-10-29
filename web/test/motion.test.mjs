/**
 * Uji mesin gerak tanpa GPU.
 *
 * Yang dibuktikan di sini: sendi benar-benar bergerak, gerakan tidak menumpuk dari frame ke
 * frame (bug klasik pada offset prosedural), lokomosi bekerja, dan tidur otomatis menyala.
 */
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { createMotion } from '../src/motion.js';

const BONES = [
  'hips', 'spine', 'chest', 'neck', 'head',
  'leftShoulder', 'rightShoulder', 'leftUpperArm', 'rightUpperArm',
  'leftLowerArm', 'rightLowerArm', 'leftUpperLeg', 'rightUpperLeg',
  'leftLowerLeg', 'rightLowerLeg',
];

function fakeVrm() {
  const nodes = {};
  for (const key of BONES) nodes[key] = new THREE.Object3D();
  return { vrm: { humanoid: { getNormalizedBoneNode: (key) => nodes[key] || null } }, nodes };
}

function run(motion, vrm, seconds, dt = 1 / 30, ctx = {}) {
  const frames = Math.round(seconds / dt);
  for (let i = 0; i < frames; i += 1) {
    motion.resetToBase();
    motion.update(vrm, dt, ctx);
  }
}

function angleOf(node) {
  return 2 * Math.acos(Math.min(1, Math.abs(node.quaternion.w)));
}

// 1. Gerak dasar: sendi berubah nyata dalam 6 detik idle.
{
  const { vrm, nodes } = fakeVrm();
  const motion = createMotion();
  run(motion, vrm, 1);
  const before = { head: angleOf(nodes.head), chest: angleOf(nodes.chest), hips: angleOf(nodes.hips) };
  run(motion, vrm, 6);
  const after = { head: angleOf(nodes.head), chest: angleOf(nodes.chest), hips: angleOf(nodes.hips) };
  const moved = Object.keys(before).filter((k) => Math.abs(after[k] - before[k]) > 0.005);
  assert.ok(moved.length >= 2, `minimal 2 sendi harus bergerak, dapat ${JSON.stringify({ before, after })}`);
  assert.ok(after.chest > 0.01, 'napas harus terlihat pada dada');
}

// 2. Tidak menumpuk: sudut tetap wajar setelah 2 menit, bukan melengkung terus.
{
  const { vrm, nodes } = fakeVrm();
  const motion = createMotion();
  run(motion, vrm, 120);
  for (const key of ['head', 'chest', 'hips', 'spine']) {
    const angle = angleOf(nodes[key]);
    assert.ok(angle < 0.9, `sudut ${key} harus tetap kecil, dapat ${angle.toFixed(3)} rad`);
    assert.ok(Number.isFinite(nodes[key].quaternion.x), `${key} tidak boleh NaN`);
  }
  const length = nodes.head.quaternion.length();
  assert.ok(Math.abs(length - 1) < 1e-3, `quaternion harus tetap ternormalisasi, dapat ${length}`);
}

// 3. Lokomosi jalan menggerakkan kaki dan lengan.
{
  const { vrm, nodes } = fakeVrm();
  const motion = createMotion();
  motion.setLocomotion('walk');
  run(motion, vrm, 2);
  const leg = angleOf(nodes.leftUpperLeg);
  const arm = angleOf(nodes.leftUpperArm);
  assert.ok(leg > 0.15, `kaki harus terayun saat jalan, dapat ${leg.toFixed(3)} rad`);
  assert.ok(arm > 0.1, `lengan harus ikut, dapat ${arm.toFixed(3)} rad`);
  assert.equal(motion.debug().locomotion, 'walk');
}

// 4. Dance mengubah pose lebih besar daripada idle.
{
  const { vrm, nodes } = fakeVrm();
  const motion = createMotion();
  motion.nextDance();
  run(motion, vrm, 3);
  assert.ok(angleOf(nodes.leftUpperArm) > 0.3, 'tangan harus terangkat saat menari');
}

// 5. Tidur otomatis setelah 2 menit tanpa interaksi.
{
  const { vrm } = fakeVrm();
  const motion = createMotion();
  run(motion, vrm, 130);
  assert.ok(motion.debug().sleepiness > 0.5, `harus mengantuk, dapat ${motion.debug().sleepiness}`);
  // Interaksi membangunkan.
  motion.resetToBase();
  motion.update(vrm, 1 / 30, { interacted: true });
  run(motion, vrm, 3, 1 / 30, { interacted: true });
  assert.ok(motion.debug().sleepiness < 0.2, 'sentuhan harus membangunkan');
}

// 6. Reaksi sentuhan menghasilkan simpangan sementara lalu kembali.
{
  const { vrm, nodes } = fakeVrm();
  const motion = createMotion();
  run(motion, vrm, 1);
  motion.react('head');
  // Amplop reaksi berbentuk sin(progress·π): puncaknya di tengah durasi (~0,4 detik).
  run(motion, vrm, 0.4, 1 / 60);
  const peak = angleOf(nodes.head);
  assert.ok(peak > 0.05, `kepala harus bereaksi, dapat ${peak.toFixed(3)} rad`);
  run(motion, vrm, 2);
  assert.equal(motion.debug().react, null, 'reaksi harus berhenti setelah durasinya habis');
}

console.log('motion: semua pemeriksaan lulus (gerak nyata, tanpa penumpukan, lokomosi, tidur, reaksi)');
