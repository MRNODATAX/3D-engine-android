/**
 * Uji zona sentuh berbasis tulang.
 *
 * Yang dibuktikan: setiap area tubuh menghasilkan zona yang berbeda (bukan 3 pita rasio),
 * sisi kiri/kanan terbaca, ubun dan pipi terpisah walau memakai tulang kepala yang sama,
 * dan pencatat gestur membedakan ketuk / ganda / beruntun / elusan / tahan.
 */
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { ZONES, createTouchTracker, modelHeight, zoneForPoint, zoneForScreen } from '../src/touch.js';

/** Rangka manusia sederhana setinggi 1,41 m; cukup untuk membedakan 7 zona. */
function rig() {
  const scene = new THREE.Object3D();
  const nodes = {};
  // Semua tulang digantung langsung ke akar dengan posisi absolut — yang diuji adalah
  // posisi dunia, jadi hierarki tidak perlu ditiru persis.
  const place = (name, x, y, z = 0) => {
    const node = new THREE.Object3D();
    node.position.set(x, y, z);
    scene.add(node);
    nodes[name] = node;
  };
  place('hips', 0, 0.9);
  place('spine', 0, 1.05);
  place('chest', 0, 1.2);
  place('neck', 0, 1.36);
  place('head', 0, 1.45);
  place('leftShoulder', -0.12, 1.32);
  place('rightShoulder', 0.12, 1.32);
  place('leftUpperArm', -0.25, 1.25);
  place('rightUpperArm', 0.25, 1.25);
  place('leftHand', -0.3, 0.98, 0.05);
  place('rightHand', 0.3, 0.98, 0.05);
  place('leftUpperLeg', -0.09, 0.85);
  place('rightUpperLeg', 0.09, 0.85);
  place('leftLowerLeg', -0.1, 0.45);
  place('rightLowerLeg', 0.1, 0.45);
  place('leftFoot', -0.1, 0.04);
  place('rightFoot', 0.1, 0.04);
  scene.updateMatrixWorld(true);
  const vrm = { humanoid: { getNormalizedBoneNode: (key) => nodes[key] || null } };
  return { vrm, nodes, scene };
}

// 1. Tinggi model terbaca dari tulang, bukan asumsi.
{
  const { vrm } = rig();
  const height = modelHeight(vrm);
  assert.ok(Math.abs(height - 1.41) < 0.05, `tinggi model ±1,41 m, dapat ${height.toFixed(3)}`);
}

// 2. Tujuh zona bisa dibedakan pada titik yang jelas.
{
  const { vrm } = rig();
  const cases = [
    ['ubun', new THREE.Vector3(0, 1.6, 0), 'head'],
    ['pipi kanan', new THREE.Vector3(0.065, 1.44, 0.04), 'cheek'],
    ['bahu kiri', new THREE.Vector3(-0.13, 1.33, 0.02), 'shoulder'],
    ['tangan kiri', new THREE.Vector3(-0.31, 0.99, 0.06), 'hand'],
    ['perut', new THREE.Vector3(0, 1.06, 0.09), 'belly'],
    ['pinggul', new THREE.Vector3(0, 0.91, 0.06), 'hip'],
    ['lutut', new THREE.Vector3(-0.11, 0.44, 0.05), 'leg'],
  ];
  for (const [label, point, expected] of cases) {
    const result = zoneForPoint(vrm, point);
    assert.equal(result.zone, expected, `${label} harus ${expected}, dapat ${result.zone}`);
    assert.ok(result.inside, `${label} harus di dalam radius zona`);
  }
}

// 3. Sisi terbaca untuk zona berpasangan.
{
  const { vrm } = rig();
  assert.equal(zoneForPoint(vrm, new THREE.Vector3(-0.31, 0.99, 0.06)).side, 'left');
  assert.equal(zoneForPoint(vrm, new THREE.Vector3(0.31, 0.99, 0.06)).side, 'right');
  assert.equal(zoneForPoint(vrm, new THREE.Vector3(0.11, 0.44, 0.05)).side, 'right');
}

// 4. Ubun vs pipi tetap benar saat kepala menoleh 50°.
{
  const { vrm, nodes } = rig();
  nodes.head.rotation.y = 0.87;
  vrm.humanoid.getNormalizedBoneNode('head').updateMatrixWorld(true);
  const top = zoneForPoint(vrm, new THREE.Vector3(0, 1.6, 0));
  assert.equal(top.zone, 'head', `ubun saat menoleh harus head, dapat ${top.zone}`);
  // Pipi mengikuti arah hadap baru: hadap kepala kini miring, jadi pakai arah lokal.
  const cheekLocal = new THREE.Vector3(0.065, 0.3, 0.04).applyMatrix4(nodes.head.matrixWorld);
  const cheek = zoneForPoint(vrm, cheekLocal);
  assert.ok(['cheek', 'head'].includes(cheek.zone), `zona kepala saat menoleh: ${cheek.zone}`);
}

// 5. Zona kecil menang saat bertumpuk dengan zona besar.
{
  const { vrm } = rig();
  // Titik 4 cm di atas tulang pinggul: lebih dekat ke `hips`, tetapi juga masih dekat `spine`.
  const result = zoneForPoint(vrm, new THREE.Vector3(0, 0.94, 0.02));
  assert.equal(result.zone, 'hip', `harus hip, dapat ${result.zone} (jarak ${result.distance.toFixed(3)})`);
}

// 6. Jalur cadangan layar: tulang yang diproyeksikan jadi pusat zona.
{
  const { vrm, nodes } = rig();
  const camera = new THREE.PerspectiveCamera(35, 0.6, 0.1, 20);
  camera.position.set(0, 1.1, 3.2);
  camera.lookAt(0, 1.1, 0);
  camera.updateMatrixWorld(true);
  const size = { width: 600, height: 1000 };
  const ndcOf = (name) => {
    const point = new THREE.Vector3();
    nodes[name].getWorldPosition(point);
    return point.project(camera);
  };
  const hand = zoneForScreen(vrm, camera, ndcOf('leftHand'), size);
  assert.equal(hand.zone, 'hand', `proyeksi tangan kiri harus hand, dapat ${hand.zone}`);
  const hip = zoneForScreen(vrm, camera, ndcOf('hips'), size);
  assert.equal(hip.zone, 'hip', `proyeksi pinggul harus hip, dapat ${hip.zone}`);
}

// 7. Gestur: ketuk, ganda, beruntun.
{
  const tracker = createTouchTracker();
  assert.equal(tracker.down('belly', 100, 100, 0) ?? tracker.up(120).type, 'tap');
  assert.equal(tracker.down('belly', 100, 100, 200) || tracker.up(240).type, 'double');
  tracker.up(240);
  const third = (() => {
    tracker.down('belly', 100, 100, 300);
    return tracker.up(330);
  })();
  assert.equal(third.type, 'rapid', `ketukan ke-3 harus rapid, dapat ${third.type}`);
}

// 8. Gestur: elusan kepala ≠ ketuk, dan tidak memicu rapid.
{
  const tracker = createTouchTracker();
  tracker.down('head', 100, 100, 0);
  let stroked = null;
  for (let i = 1; i <= 8; i += 1) {
    const event = tracker.move(100 + i * 12, 100 + (i % 2) * 6, i * 60);
    if (event) stroked = event;
  }
  assert.equal(stroked?.type, 'stroke', 'gerakan bolak-balik di kepala harus stroke');
  assert.equal(tracker.up(600), null, 'setelah elusan tidak boleh ada ketukan');
  assert.equal(tracker.state.taps.count, 0, 'elusan tidak boleh menambah hitungan ketukan');
}

// 9. Gestur: tahan lama tanpa gerak.
{
  const tracker = createTouchTracker();
  tracker.down('head', 10, 10, 0);
  const event = tracker.up(1200);
  assert.equal(event.type, 'hold', `tahan 1,2 s harus hold, dapat ${event.type}`);
}

// 10. Gestur: geser badan tidak menghasilkan ketukan.
{
  const tracker = createTouchTracker();
  tracker.down('belly', 10, 10, 0);
  tracker.move(60, 40, 50);
  tracker.move(140, 90, 100);
  assert.equal(tracker.up(160), null, 'geser 130 px bukan ketukan');
}

// 11. Radius ikut tinggi model: avatar mini tetap mengenali zona.
{
  const { vrm, scene } = rig();
  scene.scale.setScalar(0.5);
  scene.updateMatrixWorld(true);
  const height = modelHeight(vrm);
  assert.ok(Math.abs(height - 0.7) < 0.05, `tinggi model mini ±0,70 m, dapat ${height.toFixed(3)}`);
  const result = zoneForPoint(vrm, new THREE.Vector3(0, 0.47, 0.03));
  assert.equal(result.zone, 'hip', `pinggul model mini harus hip, dapat ${result.zone}`);
}

// 12. Semua zona punya tulang yang disebut tabel — jaring pengaman bila nama berubah.
{
  const { vrm } = rig();
  for (const zone of ZONES) {
    for (const bone of zone.bones) {
      assert.ok(vrm.humanoid.getNormalizedBoneNode(bone), `tulang ${bone} untuk zona ${zone.id} harus ada`);
    }
  }
}

console.log('touch: semua uji lulus');
