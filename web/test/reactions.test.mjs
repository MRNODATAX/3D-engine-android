/**
 * Uji mesin reaksi.
 *
 * Yang dibuktikan: 15 gaya lengkap (ekspresi + gerak + suara), tidak ada sendi salah nama,
 * suara tidak berulang tiap frame, jeda & prioritas dipatuhi, dan ekspresi selalu kembali ke
 * nol sehingga wajah tidak "nyangkut".
 */
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { STYLES, createReactions, envelopeOf, styleById, styleForTouch } from '../src/reactions.js';
import { createMotion } from '../src/motion.js';

const KNOWN_BONES = new Set([
  'hips', 'spine', 'chest', 'neck', 'head',
  'leftShoulder', 'rightShoulder', 'leftUpperArm', 'rightUpperArm',
  'leftLowerArm', 'rightLowerArm', 'leftUpperLeg', 'rightUpperLeg',
  'leftLowerLeg', 'rightLowerLeg', 'leftHand', 'rightHand', 'leftFoot', 'rightFoot',
]);

/** Jalankan reaksi sampai selesai, catat semua frame. */
function play(reactions, id, seconds = 6, dt = 1 / 30, context = {}) {
  reactions.trigger(id, context);
  const frames = [];
  const steps = Math.round(seconds / dt);
  for (let i = 0; i < steps; i += 1) {
    const frame = reactions.update(dt);
    frames.push(frame);
  }
  return frames;
}

// 1. Minimal 15 gaya, id unik, dan tiap gaya punya isi yang lengkap.
{
  assert.ok(STYLES.length >= 15, `minimal 15 gaya, dapat ${STYLES.length}`);
  const ids = new Set();
  for (const style of STYLES) {
    assert.ok(!ids.has(style.id), `id ganda: ${style.id}`);
    ids.add(style.id);
    assert.ok(style.label && style.label.length > 2, `${style.id} harus punya label`);
    assert.ok(style.duration >= 1000, `${style.id} durasi minimal 1 s`);
    assert.ok(Object.keys(style.pose || {}).length > 0, `${style.id} harus punya pose`);
    assert.ok(Object.keys(style.expr || {}).length > 0, `${style.id} harus punya ekspresi`);
    for (const bone of Object.keys(style.pose)) {
      assert.ok(KNOWN_BONES.has(bone), `${style.id}: tulang "${bone}" tidak dikenal`);
      const delta = style.pose[bone];
      assert.equal(delta.length, 3, `${style.id}.${bone} harus [x, y, z]`);
      for (const value of delta) {
        assert.ok(Number.isFinite(value) && Math.abs(value) <= 1.2, `${style.id}.${bone} di luar batas: ${value}`);
      }
    }
    for (const wave of style.wave || []) {
      assert.ok(KNOWN_BONES.has(wave.bone), `${style.id}: gelombang pada tulang tak dikenal ${wave.bone}`);
      assert.ok(['x', 'y', 'z'].includes(wave.axis), `${style.id}: sumbu gelombang ${wave.axis}`);
      assert.ok(wave.hz > 0 && wave.hz < 8, `${style.id}: hz gelombang wajar`);
    }
    for (const [name, value] of Object.entries(style.expr)) {
      assert.ok(value >= 0 && value <= 1, `${style.id}: ekspresi ${name} harus 0..1`);
    }
  }
  // Gaya yang diminta pengguna harus ada semua.
  for (const id of [
    'malas', 'ngantuk', 'tidur', 'boring', 'marah', 'ngambek', 'sayang', 'peluk',
    'malu', 'kaget', 'ketawa', 'geli', 'bangga', 'lompat', 'lambai',
  ]) {
    assert.ok(styleById(id), `gaya ${id} harus ada`);
  }
}

// 2. Amplop: `pulse` mulai dan berakhir di nol, `plateau` mencapai 1.
{
  const pulse = styleById('kaget');
  assert.ok(envelopeOf(pulse, 0) < 1e-6 && envelopeOf(pulse, 1) < 1e-6);
  assert.ok(Math.abs(envelopeOf(pulse, 0.5) - 1) < 1e-6);
  const plateau = styleById('ngambek');
  assert.ok(Math.abs(envelopeOf(plateau, 0.5) - 1) < 1e-6, 'plateau harus penuh di tengah');
  assert.ok(envelopeOf(plateau, 0) < 1e-6);
}

// 3. Gerak dan ekspresi benar-benar keluar, lalu kembali nol.
{
  const reactions = createReactions();
  const frames = play(reactions, 'sayang', 4);
  const middle = frames[Math.floor(frames.length * 0.25)];
  assert.equal(middle.styleId, 'sayang');
  assert.ok(Object.keys(middle.layers).length >= 3, 'sayang harus menggerakkan ≥ 3 tulang');
  assert.ok(middle.expression.happy > 0.5, `ekspresi happy harus kuat di tengah, dapat ${middle.expression.happy}`);
  assert.ok(middle.layers.head.z > 0.01, 'kepala harus miring saat sayang');
  const last = frames[frames.length - 1];
  assert.equal(last.styleId, null, 'setelah durasi habis tidak ada gaya aktif');
  assert.deepEqual(last.layers, {}, 'tidak boleh ada sisa rotasi');
  assert.deepEqual(last.expression, {}, 'tidak boleh ada sisa ekspresi');
}

// 4. Suara berbunyi tepat sekali, bukan tiap frame.
{
  const reactions = createReactions();
  const frames = play(reactions, 'kaget', 3);
  const all = frames.flatMap((frame) => frame.sfx);
  assert.deepEqual(all, ['gasp'], `suara harus sekali, dapat ${JSON.stringify(all)}`);
  // Gaya dengan suara susulan.
  const reactions2 = createReactions();
  const marah = play(reactions2, 'marah', 4).flatMap((frame) => frame.sfx);
  assert.deepEqual(marah, ['huff_hard', 'hmph'], `marah harus dua suara berurutan, dapat ${JSON.stringify(marah)}`);
}

// 5. Jeda (cooldown) dipatuhi, dan `force` menembusnya.
{
  const reactions = createReactions();
  play(reactions, 'sayang', 3);
  const second = reactions.trigger('sayang');
  assert.equal(second, false, 'sayang tidak boleh langsung berulang (jeda 6 s)');
  const forced = reactions.trigger('sayang', { force: true });
  assert.equal(forced, true, 'perintah eksplisit pengguna boleh menembus jeda');
}

// 6. Prioritas: sentuhan (2) tidak boleh dipotong direktur (1); malu (3) menang atas semuanya.
{
  const reactions = createReactions();
  reactions.trigger('sayang', { source: 'touch' });
  reactions.update(1 / 30);
  assert.equal(reactions.trigger('malas', { source: 'director' }), false, 'gaya otomatis harus mengalah');
  assert.equal(reactions.trigger('malu', { source: 'touch' }), true, 'malu berprioritas 3 boleh memotong');
  assert.equal(reactions.active, 'malu');
  assert.ok(reactions.state.rejected >= 1, 'penolakan harus tercatat');
}

// 7. Anti-ulang untuk gaya pendek yang sama, berturut-turut.
{
  const reactions = createReactions();
  play(reactions, 'kaget', 2);
  assert.equal(reactions.trigger('kaget'), false, 'gaya yang baru selesai tidak boleh langsung berulang');
  assert.equal(reactions.trigger('kaget', { force: true }), true, 'kecuali dipaksa');
}

// 8. Ngambek menolak sentuhan selama 5 detik pertama.
{
  const reactions = createReactions();
  reactions.trigger('ngambek');
  const frame = reactions.update(1 / 30);
  assert.equal(frame.rejectTouch, true, 'setelah ngambek, sentuhan harus ditolak');
  const later = [];
  for (let i = 0; i < 240; i += 1) later.push(reactions.update(1 / 30)); // 8 detik
  assert.equal(later[later.length - 1].rejectTouch, false, 'penolakan harus berakhir');
}

// 9. Tidur bisa dibangunkan (`interrupt`), dan yaw memunggung hanya saat ngambek.
{
  const reactions = createReactions();
  reactions.trigger('tidur', { force: true });
  for (let i = 0; i < 60; i += 1) reactions.update(1 / 30); // 2 detik
  const sleeping = reactions.update(1 / 30);
  assert.equal(sleeping.eyes, 'closed', 'tidur memakai mata tertutup');
  assert.equal(sleeping.styleId, 'tidur');
  assert.equal(reactions.interrupt(), true, 'interrupt harus berhasil');
  assert.equal(reactions.update(1 / 30).styleId, null);

  const reactions2 = createReactions();
  reactions2.trigger('ngambek', { force: true });
  for (let i = 0; i < 45; i += 1) reactions2.update(1 / 30);
  const ngambek = reactions2.update(1 / 30);
  assert.ok(ngambek.yaw < -0.2, `ngambek harus memunggung, yaw ${ngambek.yaw}`);
}

// 10. Penurunan gerak (aksesibilitas) memperkecil amplitudo.
{
  const normal = createReactions();
  const reduced = createReactions({ reducedMotion: true });
  const peak = (reactions) => {
    let max = 0;
    reactions.trigger('marah', { force: true });
    for (let i = 0; i < 60; i += 1) {
      const frame = reactions.update(1 / 30);
      max = Math.max(max, Math.abs(frame.layers.head?.x || 0));
    }
    return max;
  };
  const a = peak(normal);
  const b = peak(reduced);
  assert.ok(b < a * 0.5, `gerak teredam harus < 50 % (${b.toFixed(3)} vs ${a.toFixed(3)})`);
}

// 11. Riwayat dan debug tidak melempar, dan tiap gaya bisa dimainkan tanpa error.
{
  for (const style of STYLES) {
    const reactions = createReactions();
    play(reactions, style.id, Math.max(3, style.duration / 1000 + 0.5), 1 / 30, { force: true });
    const debug = reactions.debug();
    assert.ok(debug.history.length >= 1, `${style.id} harus tercatat di riwayat`);
    assert.ok(reactions.cooldownLeft(style.id) > 0, `${style.id} harus masuk jeda setelah selesai`);
  }
}

// 12. Peta sentuhan: 7 zona × 5 gestur selalu menghasilkan gaya yang benar-benar ada.
{
  const zones = ['head', 'cheek', 'shoulder', 'hand', 'belly', 'hip', 'leg'];
  const gestures = ['tap', 'double', 'rapid', 'stroke', 'hold'];
  for (const zone of zones) {
    for (const gesture of gestures) {
      const id = styleForTouch({ zone, gesture });
      if (id === null) {
        // hanya elusan di luar kepala yang boleh kosong
        assert.equal(gesture, 'stroke', `${zone}/${gesture} tidak boleh kosong`);
        assert.ok(!['head', 'cheek'].includes(zone));
        continue;
      }
      assert.ok(styleById(id), `${zone}/${gesture} → gaya tak dikenal "${id}"`);
    }
  }
  // Aturan yang diminta pengguna, dicek satu per satu.
  assert.equal(styleForTouch({ zone: 'hip', gesture: 'tap' }), 'malu', 'sentuh area sensitif = malu, non-eksplisit');
  assert.equal(styleForTouch({ zone: 'hip', gesture: 'double' }), 'kaget', 'sentuhan kedua = kaget');
  assert.equal(styleForTouch({ zone: 'hip', gesture: 'rapid' }), 'geli', 'beruntun = geli');
  assert.equal(styleForTouch({ zone: 'head', gesture: 'stroke' }), 'sayang', 'elusan kepala = sayang');
  assert.equal(styleForTouch({ zone: 'head', gesture: 'hold' }), 'tidur', 'tahan kepala = tidur');
  assert.equal(styleForTouch({ zone: 'belly', gesture: 'rapid' }), 'geli', 'perut beruntun = geli');
  assert.equal(styleForTouch({ zone: 'belly', gesture: 'double' }), 'marah', 'perut dua ketuk = marah');
}

// 13. Integrasi dengan mesin gerak: reaksi benar-benar mengubah sendi, lalu bersih lagi.
{
  const BONES = [
    'hips', 'spine', 'chest', 'neck', 'head',
    'leftShoulder', 'rightShoulder', 'leftUpperArm', 'rightUpperArm',
    'leftLowerArm', 'rightLowerArm', 'leftUpperLeg', 'rightUpperLeg',
    'leftLowerLeg', 'rightLowerLeg',
  ];
  const nodes = {};
  for (const key of BONES) nodes[key] = new THREE.Object3D();
  const vrm = { humanoid: { getNormalizedBoneNode: (key) => nodes[key] || null } };
  const motion = createMotion();
  const reactions = createReactions();
  reactions.trigger('peluk', { force: true });

  const angleOf = (node) => 2 * Math.acos(Math.min(1, Math.abs(node.quaternion.w)));
  const run = (seconds) => {
    const steps = Math.round(seconds * 30);
    let peak = 0;
    for (let i = 0; i < steps; i += 1) {
      const frame = reactions.update(1 / 30);
      motion.resetToBase();
      motion.update(vrm, 1 / 30, { reaction: frame });
      peak = Math.max(peak, angleOf(nodes.leftUpperArm));
    }
    return peak;
  };
  const peakWithReaction = run(1.5);
  assert.ok(peakWithReaction > 0.3, `lengan harus terangkat saat peluk, dapat ${peakWithReaction.toFixed(3)} rad`);
  // Setelah reaksi habis, offset tidak boleh menumpuk: sudut kembali kecil.
  const peakAfter = run(3);
  assert.ok(peakAfter < peakWithReaction, 'setelah reaksi, lengan harus kembali turun');
  assert.equal(motion.debug().reactionStyle, null, 'tidak ada gaya aktif setelah selesai');
  const length = nodes.leftUpperArm.quaternion.length();
  assert.ok(Math.abs(length - 1) < 1e-3, `quaternion tetap ternormalisasi (${length})`);
}

console.log('reactions: semua uji lulus');
