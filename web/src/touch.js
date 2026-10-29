/**
 * Zona sentuh berbasis tulang.
 *
 * Kenapa bukan pita rasio: kode lama membagi tinggi jendela jadi 3 pita (head < 22 %,
 * shoulder < 45 %, sisanya body). Akibatnya menyentuh telinga, tangan yang terangkat, atau
 * lutut menghasilkan reaksi yang sama, dan tangan yang sedang di depan perut ikut terhitung
 * "badan". Modul ini memakai posisi tulang sungguhan.
 *
 * Dua jalur dipakai bersama:
 * 1. `zoneForPoint()` — jalur utama. Renderer melempar sinar ke mesh avatar, mendapat titik
 *    di permukaan tubuh, lalu modul ini memilih tulang terdekat.
 * 2. `zoneForScreen()` — cadangan bila sinar tidak mengenai apa pun (model tipis, sudut
 *    ekstrem). Semua tulang zona diproyeksikan ke layar, dipilih yang paling dekat.
 *
 * Semua radius dinyatakan sebagai fraksi tinggi model, jadi tetap benar untuk avatar setinggi
 * 1,2 m maupun 1,8 m, dan ikut mengecil saat slider skala diturunkan.
 *
 * Berkas ini tidak menyentuh DOM/WebGL: bisa diuji di Node dengan tulang three.js biasa.
 */
import * as THREE from 'three';

/**
 * Tabel zona. `bonus` membagi jarak ternormalisasi, jadi nilai > 1 membuat zona kecil
 * (pipi, pinggul) menang atas zona besar saat bertumpuk — tanpa itu, lutut selalu kalah
 * dari perut karena tulang `spine` ada di tengah tubuh.
 */
export const ZONES = [
  { id: 'head', bones: ['head'], radius: 0.085, bonus: 1.0 },
  { id: 'cheek', bones: ['head'], radius: 0.055, bonus: 1.15 },
  { id: 'shoulder', bones: ['leftShoulder', 'rightShoulder'], radius: 0.07, bonus: 1.0 },
  { id: 'hand', bones: ['leftHand', 'rightHand'], radius: 0.075, bonus: 1.0 },
  { id: 'belly', bones: ['spine'], radius: 0.075, bonus: 1.0 },
  { id: 'hip', bones: ['hips'], radius: 0.055, bonus: 1.15 },
  { id: 'leg', bones: ['leftLowerLeg', 'rightLowerLeg'], radius: 0.07, bonus: 1.0 },
];

/** Semua tulang yang pernah dibaca, untuk pengukuran tinggi model. */
const HEIGHT_BONES = [
  'head', 'leftFoot', 'rightFoot', 'leftHand', 'rightHand',
  'leftLowerLeg', 'rightLowerLeg', 'hips', 'spine',
];

const _a = new THREE.Vector3();
const _b = new THREE.Vector3();
const _up = new THREE.Vector3();
const _right = new THREE.Vector3();

function bone(vrm, name) {
  const humanoid = vrm?.humanoid;
  if (!humanoid) return null;
  return humanoid.getNormalizedBoneNode?.(name) || humanoid.getRawBoneNode?.(name) || null;
}

function worldPosition(vrm, name, target) {
  const node = bone(vrm, name);
  if (!node) return null;
  node.updateWorldMatrix(true, false);
  return node.getWorldPosition(target);
}

/**
 * Tinggi model (meter), diukur dari tulang — bukan dari `Box3.setFromObject` yang memakai
 * bounding box geometri statis. Diambil dari kepala ke kaki, dengan cadangan lebar bahu
 * bila kaki tidak ada (model setengah badan).
 */
export function modelHeight(vrm) {
  let top = -Infinity;
  let bottom = Infinity;
  let found = 0;
  for (const name of HEIGHT_BONES) {
    const point = worldPosition(vrm, name, _a);
    if (!point) continue;
    found += 1;
    top = Math.max(top, point.y);
    bottom = Math.min(bottom, point.y);
  }
  const span = top - bottom;
  if (found >= 2 && Number.isFinite(span) && span > 0.25) return span;
  // Cadangan: lebar bahu × 3,2 kira-kira setinggi tubuh manusia.
  const left = worldPosition(vrm, 'leftShoulder', _a);
  const right = worldPosition(vrm, 'rightShoulder', _b);
  if (left && right) {
    const width = left.distanceTo(right);
    if (width > 0.05) return width * 3.2;
  }
  return 1.5;
}

/** Bagian mana yang lebih dekat: kiri atau kanan (relatif terhadap arah hadap model). */
function sideOf(vrm, name) {
  if (!name) return null;
  if (name.startsWith('left')) return 'left';
  if (name.startsWith('right')) return 'right';
  return null;
}

/**
 * Pilih zona untuk satu titik di permukaan tubuh (koordinat dunia).
 *
 * @returns {{zone: string, bone: string, distance: number, side: string|null, inside: boolean}}
 */
export function zoneForPoint(vrm, point) {
  const height = modelHeight(vrm);
  let best = null;
  for (const zone of ZONES) {
    for (const boneName of zone.bones) {
      const position = worldPosition(vrm, boneName, _b);
      if (!position) continue;
      const distance = position.distanceTo(point);
      const radiusWorld = zone.radius * height;
      // Jarak dibagi bonus: zona kecil lebih mudah menang saat dua bola bertumpuk.
      const score = distance / zone.bonus;
      if (!best || score < best.score) {
        best = { zone: zone.id, bone: boneName, distance, score, radiusWorld, def: zone };
      }
    }
  }
  if (!best) return { zone: 'belly', bone: 'spine', distance: Infinity, side: null, inside: false };

  // Pipi vs ubun: keduanya memakai tulang `head`, jadi dipisah dari arah titik terhadap kepala
  // (relatif terhadap rotasi kepala, bukan sumbu dunia — kepala bisa menoleh).
  let zoneId = best.zone;
  if (zoneId === 'head' || zoneId === 'cheek') {
    const resolved = splitHeadZone(vrm, point, height);
    if (resolved) zoneId = resolved;
  }
  // `inside` dihitung dari radius zona **hasil pemisahan**: titik 15 cm di atas kepala masih
  // masuk radius ubun (0,085 × tinggi), walau di luar radius pipi (0,055 × tinggi).
  const radius = (ZONES.find((zone) => zone.id === zoneId)?.radius ?? 0.06) * height;
  return {
    zone: zoneId,
    bone: best.bone,
    distance: best.distance,
    side: sideOf(vrm, best.bone),
    inside: best.distance <= radius * 1.55,
    radiusWorld: radius,
  };
}

/**
 * Ubun (headpat) = bagian atas kepala. Pipi = sisi bawah kepala.
 * Dipisah memakai sumbu lokal tulang kepala supaya tetap benar saat kepala menoleh/miring.
 */
function splitHeadZone(vrm, point, height) {
  const headNode = bone(vrm, 'head');
  if (!headNode) return null;
  headNode.updateWorldMatrix(true, false);
  const headPos = headNode.getWorldPosition(_a).clone();
  const radius = 0.085 * height;
  headNode.getWorldQuaternion(new THREE.Quaternion()).normalize();
  // Sumbu lokal kepala: +Y ke atas, +X ke kanan (dalam ruang lokal tulang).
  const local = point.clone().sub(headPos).applyQuaternion(
    headNode.getWorldQuaternion(new THREE.Quaternion()).invert(),
  );
  const vertical = local.y / radius;
  const lateral = local.x / radius;
  const forward = local.z / radius;
  if (vertical > 0.42) return 'head';
  if (Math.abs(lateral) > 0.3 && forward > -0.2 && vertical > -0.35) return 'cheek';
  return 'head';
}

/**
 * Cadangan tanpa sinar: proyeksikan tulang ke layar, pilih yang terdekat dalam piksel.
 * `ndc` adalah koordinat ternormalisasi (-1..1) dari sentuhan.
 */
export function zoneForScreen(vrm, camera, ndc, size) {
  if (!camera) return { zone: 'belly', bone: 'spine', distance: Infinity, side: null, inside: false };
  const height = modelHeight(vrm);
  const width = Math.max(1, size?.width || 1);
  const pixelHeight = Math.max(1, size?.height || 1);
  let best = null;
  const projected = new THREE.Vector3();
  for (const zone of ZONES) {
    for (const boneName of zone.bones) {
      const position = worldPosition(vrm, boneName, _b);
      if (!position) continue;
      projected.copy(position).project(camera);
      const dx = ((projected.x - ndc.x) * width) / 2;
      const dy = ((projected.y - ndc.y) * pixelHeight) / 2;
      const pixels = Math.hypot(dx, dy);
      // Radius zona dalam piksel: fraksi tinggi model × tinggi kanvas.
      const radiusPixels = (zone.radius * height * pixelHeight) / Math.max(0.2, frameSpan(vrm));
      const score = pixels / Math.max(1, radiusPixels) / zone.bonus;
      if (!best || score < best.score) {
        best = {
          zone: zone.id, bone: boneName, distance: pixels, score,
          inside: pixels <= radiusPixels * 1.6, side: sideOf(vrm, boneName),
        };
      }
    }
  }
  if (!best) return { zone: 'belly', bone: 'spine', distance: Infinity, side: null, inside: false };
  if (best.zone === 'head') {
    // Di jalur layar tidak ada titik 3D; ubun = setengah atas tulang kepala di layar.
    const headPos = worldPosition(vrm, 'head', _b);
    if (headPos) {
      projected.copy(headPos).project(camera);
      const dy = ((projected.y - ndc.y) * pixelHeight) / 2;
      best.zone = dy > 0 ? 'head' : (Math.abs(((projected.x - ndc.x) * width) / 2) > 12 ? 'cheek' : 'head');
    }
  }
  return best;
}

/** Tinggi tubuh dalam satuan layar (dipakai untuk mengubah radius meter → piksel). */
function frameSpan(vrm) {
  let top = -Infinity;
  let bottom = Infinity;
  for (const name of HEIGHT_BONES) {
    const point = worldPosition(vrm, name, _a);
    if (!point) continue;
    top = Math.max(top, point.y);
    bottom = Math.min(bottom, point.y);
  }
  const span = top - bottom;
  return Number.isFinite(span) && span > 0.05 ? span : 1.5;
}

/**
 * Pencatat gestur: membedakan ketuk, ketuk ganda, ketukan beruntun, elusan, dan tahan.
 *
 * Semua ambang waktu disuntikkan lewat opsi supaya uji bisa memakai waktu palsu dan tidak
 * bergantung pada jam dinding.
 */
export function createTouchTracker(options = {}) {
  const strokeDistance = options.strokeDistance ?? 60;
  const strokeWindow = options.strokeWindow ?? 900;
  const doubleWindow = options.doubleWindow ?? 400;
  const rapidWindow = options.rapidWindow ?? 1000;
  const holdMs = options.holdMs ?? 900;
  const relaxMs = options.relaxMs ?? 1400;

  const state = {
    down: null,
    strokes: 0,
    taps: { zone: null, count: 0, lastAt: 0 },
    lastEvent: null,
    events: 0,
  };

  function reset() {
    state.down = null;
    state.strokes = 0;
  }

  return {
    state,
    down(zone, x, y, t) {
      state.down = { zone, x0: x, y0: y, x, y, t0: t, path: 0, stroke: false };
    },
    /**
     * Selama jari bergerak. Elusan hanya dihitung pada zona kepala: mengelus perut bukan
     * headpat. Jarak dihitung dari lintasan jari, bukan dari jarak awal–akhir, supaya gerakan
     * bolak-balik kecil di tempat tetap terhitung sebagai elusan.
     */
    move(x, y, t) {
      const down = state.down;
      if (!down) return null;
      down.path += Math.hypot(x - down.x, y - down.y);
      down.x = x;
      down.y = y;
      if (down.zone === 'head' || down.zone === 'cheek') {
        if (!down.stroke && down.path >= strokeDistance && t - down.t0 <= strokeWindow) {
          down.stroke = true;
          state.strokes += 1;
          state.lastEvent = { type: 'stroke', zone: 'head', at: t };
          return state.lastEvent;
        }
      }
      return null;
    },
    /** Lepas jari. Mengembalikan satu peristiwa atau null. */
    up(t) {
      const down = state.down;
      state.down = null;
      if (!down) return null;
      const duration = t - down.t0;
      if (down.path >= Math.max(strokeDistance, 24)) {
        if (down.stroke) return null; // elusan sudah dilaporkan di `move`
        return null; // geser badan: ditangani sisi Android
      }
      if (duration >= holdMs) {
        state.lastEvent = { type: 'hold', zone: down.zone, at: t, duration };
        return state.lastEvent;
      }
      const taps = state.taps;
      const sameZone = taps.zone === down.zone;
      const near = sameZone && t - taps.lastAt <= (taps.count >= 2 ? rapidWindow : doubleWindow);
      taps.zone = down.zone;
      taps.lastAt = t;
      taps.count = near ? taps.count + 1 : 1;
      let type = 'tap';
      if (taps.count === 2) type = 'double';
      if (taps.count >= 3) {
        type = 'rapid';
        taps.count = 0;
      }
      state.lastEvent = { type, zone: down.zone, at: t, count: taps.count, duration };
      return state.lastEvent;
    },
    /** Dipakai renderer untuk mengeluarkan `>_<` saat digeser pelan-pelan (di luar gestur ketuk). */
    markStroke(t) {
      state.strokes += 1;
      state.lastEvent = { type: 'stroke', zone: 'head', at: t };
      return state.lastEvent;
    },
    /** Reset hitungan ketukan setelah lama tidak ada sentuhan. */
    tick(t) {
      if (state.taps.zone && t - state.taps.lastAt > relaxMs) {
        state.taps.zone = null;
        state.taps.count = 0;
      }
    },
    get strokes() {
      return state.strokes;
    },
    consumeStrokes() {
      const value = state.strokes;
      state.strokes = 0;
      return value;
    },
  };
}
