/**
 * Mesin gerak prosedural untuk avatar VRM.
 *
 * Semua lapisan bersifat **aditif di atas** pose hasil mixer animasi, bukan menimpa.
 * Nilai amplitudo diambil dalam radian dan sengaja kecil (0,01–0,45) supaya tidak ada sendi
 * yang melengkung mustahil. Karakter gerak mengacu pada perilaku Mate Engine yang dibaca dari
 * skripnya (lihat docs/rencana-gerak-suara-skala.md §2 Fase 1), lalu ditulis ulang di sini —
 * tidak ada berkas animasi milik Mate Engine yang dipakai.
 */
import * as THREE from 'three';

const _euler = new THREE.Euler();
const _quat = new THREE.Quaternion();

const DEG = Math.PI / 180;

/** Sendi yang dikendalikan mesin gerak. Nama mengikuti humanoid VRM 1.0. */
const CONTROLLED = [
  'hips',
  'spine',
  'chest',
  'neck',
  'head',
  'leftShoulder',
  'rightShoulder',
  'leftUpperArm',
  'rightUpperArm',
  'leftLowerArm',
  'rightLowerArm',
  'leftUpperLeg',
  'rightUpperLeg',
  'leftLowerLeg',
  'rightLowerLeg',
];

const LOCOMOTIONS = ['idle', 'walk', 'dance'];

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

/** Pseudo-random deterministik supaya gerakan tidak melompat tiap muat ulang. */
function noise(seed) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

export function createMotion(options = {}) {
  const state = {
    time: 0,
    locomotion: 'idle',
    reducedMotion: Boolean(options.reducedMotion),
    idleSeconds: 0,
    sleepiness: 0,
    blinkSpeed: 1,
    look: { yaw: 0, pitch: 0, targetYaw: 0, targetPitch: 0, nextAt: 2.5, seed: 1 },
    react: { type: null, at: 0, duration: 0 },
    danceVariant: 0,
    lastExpressionChange: 0,
  };

  /** Quaternion acuan per sendi, diambil sesudah mixer.update(). */
  const base = new Map();
  const bones = new Map();

  function resolve(vrm) {
    if (!vrm?.humanoid) return false;
    if (bones.size > 0) return true;
    for (const key of CONTROLLED) {
      const node = vrm.humanoid.getNormalizedBoneNode(key);
      if (node) bones.set(key, node);
    }
    return bones.size > 0;
  }

  /**
   * Kembalikan sendi ke acuan sebelum mixer berjalan.
   *
   * Tanpa langkah ini, offset prosedural akan menumpuk setiap frame pada sendi yang tidak
   * dianimasikan klip, dan avatar perlahan melengkung sampai rusak.
   */
  function resetToBase() {
    for (const [key, node] of bones) {
      const q = base.get(key);
      if (q) node.quaternion.copy(q);
    }
  }

  /** Simpan acuan pasca-mixer, lalu tambahkan semua lapisan gerak. */
  function update(vrm, delta, context = {}) {
    if (!resolve(vrm)) return;
    const talking = Boolean(context.talking);
    const dt = clamp(delta, 0, 0.1);
    state.time += dt;

    // Interaksi apa pun menghapus rasa kantuk.
    if (context.interacted) {
      state.idleSeconds = 0;
      state.sleepiness = 0;
    } else {
      state.idleSeconds += dt;
    }
    // Tidur setelah 2 menit tanpa sentuhan, bangun dalam 3 detik saat disentuh.
    const sleepTarget = state.locomotion === 'idle' && state.idleSeconds > 120 ? 1 : 0;
    state.sleepiness += (sleepTarget - state.sleepiness) * clamp(dt * (sleepTarget > state.sleepiness ? 0.35 : 1.2), 0, 1);
    state.blinkSpeed = 1 - state.sleepiness * 0.6;

    const layers = {
      hips: { x: 0, y: 0, z: 0 },
      spine: { x: 0, y: 0, z: 0 },
      chest: { x: 0, y: 0, z: 0 },
      neck: { x: 0, y: 0, z: 0 },
      head: { x: 0, y: 0, z: 0 },
      leftShoulder: { x: 0, y: 0, z: 0 },
      rightShoulder: { x: 0, y: 0, z: 0 },
      leftUpperArm: { x: 0, y: 0, z: 0 },
      rightUpperArm: { x: 0, y: 0, z: 0 },
      leftLowerArm: { x: 0, y: 0, z: 0 },
      rightLowerArm: { x: 0, y: 0, z: 0 },
      leftUpperLeg: { x: 0, y: 0, z: 0 },
      rightUpperLeg: { x: 0, y: 0, z: 0 },
      leftLowerLeg: { x: 0, y: 0, z: 0 },
      rightLowerLeg: { x: 0, y: 0, z: 0 },
    };

    const t = state.time;
    const reduce = state.reducedMotion ? 0.35 : 1;
    const awake = 1 - state.sleepiness * 0.65;

    // ---- lapisan napas (dada + bahu)
    // Kalibrasi PET_IDLE.anim: Spine Front-Back 2,3° (0,70 Hz), Chest Front-Back 1,1° (0,40 Hz).
    const breath = Math.sin(t * 2 * Math.PI * 0.35);
    layers.chest.x += 0.019 * breath * awake;
    layers.spine.x += 0.038 * breath * awake;
    layers.leftShoulder.z += 0.014 * breath;
    layers.rightShoulder.z -= 0.014 * breath;

    // ---- lapisan goyangan berat badan
    // PET_IDLE.anim: Spine Left-Right 5,1° pada 0,30 Hz; Hips ikut lebih kecil.
    const sway = Math.sin(t * 2 * Math.PI * 0.3);
    layers.hips.z += 0.05 * sway * reduce * awake;
    layers.hips.x += 0.01 * Math.sin(t * 1.1);
    layers.spine.z -= 0.075 * sway * awake;
    layers.chest.z -= 0.02 * sway;
    // Perpindahan berat badan ke kaki juga terlihat di klip aslinya (10,6°/7,0°).
    layers.leftUpperLeg.z += 0.02 * sway;
    layers.rightUpperLeg.z -= 0.02 * sway;

    // ---- lapisan lengan menggantung (PET_IDLE: Left Arm Down-Up ~1,1°)
    const armSwing = Math.sin(t * 2 * Math.PI * 0.3 + 1.1);
    layers.leftUpperArm.z += 0.02 * armSwing * awake;
    layers.rightUpperArm.z -= 0.02 * Math.sin(t * 2 * Math.PI * 0.3) * awake;
    layers.leftLowerArm.x += 0.02 + 0.012 * Math.sin(t * 1.1);
    layers.rightLowerArm.x += 0.02 + 0.012 * Math.sin(t * 1.25);

    // ---- lapisan pandangan mata/kepala, target acak tiap 4–9 detik
    if (t > state.look.nextAt) {
      state.look.seed += 1;
      // Kalibrasi idle: Head Turn Left-Right 4,2°, Head Nod Down-Up 4,0° (total, bukan per sendi).
      state.look.targetYaw = (noise(state.look.seed * 3.1) - 0.5) * 0.15;
      state.look.targetPitch = (noise(state.look.seed * 7.7) - 0.5) * 0.14;
      state.look.nextAt = t + 4 + noise(state.look.seed) * 5;
    }
    state.look.yaw += (state.look.targetYaw - state.look.yaw) * clamp(dt * 2.2, 0, 1);
    state.look.pitch += (state.look.targetPitch - state.look.pitch) * clamp(dt * 2.2, 0, 1);
    layers.neck.y += state.look.yaw * 0.5;
    layers.head.y += state.look.yaw * 0.5;
    layers.neck.x += state.look.pitch * 0.45;
    layers.head.x += state.look.pitch * 0.4;

    // ---- bicara: kepala sedikit mengangguk mengikuti irama kalimat
    if (talking) {
      layers.head.x += 0.02 * Math.sin(t * 6.2);
      layers.neck.y += 0.015 * Math.sin(t * 4.1);
    }

    // ---- lapisan mengantuk
    if (state.sleepiness > 0.02) {
      const s = state.sleepiness;
      layers.head.x += 0.26 * s;
      layers.neck.x += 0.1 * s;
      layers.head.z += 0.09 * s * Math.sin(t * 0.25);
      layers.leftUpperArm.z += 0.1 * s;
      layers.rightUpperArm.z -= 0.1 * s;
      layers.spine.x += 0.05 * s;
    }

    // ---- lokomosi
    if (state.locomotion === 'walk') {
      // Kalibrasi walk_cycle_sexy_01_light.anim: kaki 36,5–38°, siklus 0,70 Hz,
      // Spine Left-Right 10,1°, kaki bawah menekuk saat kaki di belakang.
      const stepHz = 0.7;
      const cycle = Math.sin(t * 2 * Math.PI * stepHz);
      const cycle2 = Math.sin(t * 2 * Math.PI * stepHz + Math.PI);
      layers.leftUpperLeg.x += 0.55 * cycle;
      layers.rightUpperLeg.x += 0.55 * cycle2;
      layers.leftLowerLeg.x += 0.34 * Math.max(0, -cycle);
      layers.rightLowerLeg.x += 0.34 * Math.max(0, -cycle2);
      layers.leftUpperArm.x += 0.18 * cycle2;
      layers.rightUpperArm.x += 0.18 * cycle;
      layers.spine.z += 0.09 * Math.sin(t * 2 * Math.PI * stepHz * 2);
      layers.hips.z += 0.04 * Math.sin(t * 2 * Math.PI * stepHz * 2);
      layers.spine.x += 0.03;
    } else if (state.locomotion === 'dance') {
      // Kalibrasi PET_DANCING_2.anim: lengan 36,8–39,1° (2,25–2,30 Hz), dada 27,2°,
      // kepala menoleh 22,4° dan mengangguk 16,2°.
      const beat = t * 2 * Math.PI * 2.25;
      const v = state.danceVariant % 3;
      if (v === 0) {
        layers.hips.z += 0.12 * Math.sin(beat * 0.5);
        layers.spine.z -= 0.11 * Math.sin(beat * 0.5);
        layers.leftUpperArm.z += 0.42 + 0.26 * Math.sin(beat);
        layers.rightUpperArm.z -= 0.42 + 0.26 * Math.sin(beat + Math.PI);
        layers.chest.x += 0.1 * Math.sin(beat * 0.5 + 1);
        layers.head.z += 0.12 * Math.sin(beat * 0.5);
        layers.head.y += 0.14 * Math.sin(beat * 0.5);
        layers.leftUpperLeg.x += 0.12 * Math.sin(beat * 0.5);
        layers.rightUpperLeg.x -= 0.12 * Math.sin(beat * 0.5);
      } else if (v === 1) {
        layers.spine.x += 0.3 + 0.14 * Math.sin(beat * 0.5);
        layers.chest.x += 0.2 * Math.sin(beat * 0.5 + 1);
        layers.leftUpperArm.x += 0.6 + 0.16 * Math.sin(beat * 0.5);
        layers.rightUpperArm.x += 0.6 + 0.16 * Math.sin(beat * 0.5 + Math.PI);
        layers.head.x += 0.12 * Math.sin(beat * 0.5);
      } else {
        const spin = Math.sin(beat * 0.25);
        layers.hips.y += 0.32 * spin;
        layers.spine.y -= 0.12 * spin;
        layers.leftUpperArm.z += 0.6;
        layers.rightUpperArm.z -= 0.6;
        layers.head.y += 0.2 * spin;
        layers.chest.x += 0.12 * Math.sin(beat * 0.5);
      }
    }

    // ---- reaksi sentuhan (kejut / senang), meluruh dalam ~0,8 detik
    if (state.react.type) {
      const age = (t - state.react.at) * 1000;
      if (age > state.react.duration) {
        state.react.type = null;
      } else {
        const progress = age / state.react.duration;
        const envelope = Math.sin(progress * Math.PI);
        if (state.react.type === 'head') {
          layers.head.x -= 0.18 * envelope;
          layers.chest.x -= 0.05 * envelope;
        } else if (state.react.type === 'body') {
          layers.spine.z += 0.1 * envelope;
          layers.head.z += 0.12 * envelope;
        } else {
          layers.hips.x -= 0.06 * envelope;
          layers.leftUpperArm.z += 0.2 * envelope;
          layers.rightUpperArm.z -= 0.2 * envelope;
        }
      }
    }

    // ---- terapkan: acuan disimpan dulu, lalu offset kecil ditumpuk
    for (const [key, node] of bones) {
      if (!base.has(key)) base.set(key, node.quaternion.clone());
      else base.get(key).copy(node.quaternion);

      const l = layers[key];
      if (!l) continue;
      if (!l.x && !l.y && !l.z) continue;
      _euler.set(l.x, l.y, l.z, 'XYZ');
      _quat.setFromEuler(_euler);
      node.quaternion.multiply(_quat);
    }
  }

  return {
    state,
    resetToBase,
    update,
    setLocomotion(mode) {
      state.locomotion = LOCOMOTIONS.includes(mode) ? mode : 'idle';
      if (state.locomotion !== 'idle') {
        state.idleSeconds = 0;
        state.sleepiness = 0;
      }
      return state.locomotion;
    },
    nextDance() {
      state.danceVariant = (state.danceVariant + 1) % 3;
      state.locomotion = 'dance';
      return state.danceVariant;
    },
    setReducedMotion(value) {
      state.reducedMotion = Boolean(value);
    },
    react(type) {
      state.react = { type, at: state.time, duration: 800 };
      state.idleSeconds = 0;
      state.sleepiness = 0;
      // Menoleh ke arah yang menyentuh.
      state.look.targetYaw = type === 'head' ? 0.18 : 0.05;
      state.look.targetPitch = type === 'head' ? -0.18 : 0.02;
    },
    /** Dipakai uji otomatis: apakah ada gerakan nyata dalam jendela waktu tertentu. */
    debug() {
      return {
        time: Number(state.time.toFixed(2)),
        locomotion: state.locomotion,
        sleepiness: Number(state.sleepiness.toFixed(2)),
        lookYaw: Number(state.look.yaw.toFixed(3)),
        bones: bones.size,
        react: state.react.type,
      };
    },
  };
}
