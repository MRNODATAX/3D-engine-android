/**
 * Mesin reaksi: 15 gaya (malas, ngantuk, tidur-tiduran, boring, marah, ngambek, sayang,
 * peluk, malu, kaget, ketawa, geli, bangga, lompat gembira, melambai).
 *
 * Kenapa modul terpisah: `motion.js` mengurus gerak yang *selalu* ada (napas, goyangan,
 * pandangan). Reaksi punya siklus hidup sendiri — dipicu, bertahan, meredup, punya jeda dan
 * prioritas. Mencampurnya ke `motion.js` membuat berkas itu jadi 700 baris dan sulit diuji.
 *
 * Kontrak dengan pemanggil:
 *   const reactions = createReactions();
 *   reactions.trigger('sayang', { source: 'touch' });
 *   const frame = reactions.update(dt);      // { layers, expression, eyes, sfx, yaw, nudge }
 *   state.motion.update(vrm, dt, { reaction: frame });
 *
 * `layers` berisi delta rotasi per tulang dalam radian dan digabung secara aditif oleh mesin
 * gerak, jadi tidak pernah menimpa klip animasi yang sedang diputar.
 *
 * Semua angka adalah hasil kalibrasi sendiri (lihat docs/rencana-v0.1.10-interaksi.md §3).
 * Tidak ada berkas animasi atau suara pihak ketiga di sini.
 */

/** Batas atas tiap sumbu supaya tidak ada sendi yang menekuk mustahil. */
const POSE_CLAMP = 1.2;

/**
 * Prioritas: 1 = direktur perilaku (otomatis), 2 = sentuhan pengguna, 3 = perintah eksplisit
 * (tombol "coba" di Pengaturan). Reaksi berprioritas lebih rendah tidak boleh memotong yang
 * sedang berjalan, jadi sentuhan pengguna selalu menang atas gaya otomatis.
 */
export const STYLES = [
  {
    id: 'malas',
    label: 'Malas',
    priority: 1,
    duration: 2800,
    cooldown: 12000,
    shape: 'plateau',
    eyes: 'half',
    expr: { relaxed: 0.5 },
    pose: {
      hips: [0, 0, 0.09],
      spine: [0.02, 0, -0.06],
      head: [0.05, 0.06, 0.1],
      leftShoulder: [0, 0, -0.05],
      rightShoulder: [0, 0, 0.05],
      leftUpperArm: [0, 0, 0.05],
      rightUpperArm: [0, 0, -0.05],
    },
    sfx: 'sigh',
  },
  {
    id: 'ngantuk',
    label: 'Ngantuk',
    priority: 1,
    duration: 4000,
    cooldown: 20000,
    shape: 'plateau',
    eyes: 'slow',
    expr: { relaxed: 0.7 },
    pose: {
      head: [0.2, 0, 0.05],
      neck: [0.1, 0, 0],
      spine: [0.05, 0, 0],
      leftUpperArm: [0, 0, 0.06],
      rightUpperArm: [0, 0, -0.06],
    },
    wave: [{ bone: 'head', axis: 'x', amplitude: 0.05, hz: 0.25 }],
    sfx: 'yawn',
  },
  {
    id: 'tidur',
    label: 'Tidur-tiduran',
    priority: 2,
    duration: 120000,
    cooldown: 60000,
    shape: 'plateau',
    ramp: 0.18,
    eyes: 'closed',
    expr: { relaxed: 0.3 },
    pose: {
      head: [0.26, 0.1, 0.12],
      neck: [0.12, 0, 0.05],
      spine: [0.1, 0, 0],
      chest: [0.04, 0, 0],
      leftUpperArm: [0, 0, 0.12],
      rightUpperArm: [0, 0, -0.12],
    },
    wave: [{ bone: 'chest', axis: 'x', amplitude: 0.012, hz: 0.18 }],
    clip: 'sitting_idle',
    clipStart: 'sitting_enter',
    /** Tidur berakhir saat disentuh — ditangani renderer lewat `interrupt()`. */
    interruptible: true,
    sfx: null,
  },
  {
    id: 'boring',
    label: 'Boring',
    priority: 1,
    duration: 5000,
    cooldown: 25000,
    shape: 'plateau',
    eyes: 'half',
    expr: { neutral: 0.6 },
    pose: {
      head: [0.07, 0.2, 0.07],
      chest: [0, 0, 0.04],
      leftUpperArm: [0, 0, 0.04],
      rightUpperArm: [0, 0, -0.04],
    },
    wave: [{ bone: 'leftLowerLeg', axis: 'x', amplitude: 0.12, hz: 0.8 }],
    sfx: 'tongue_click',
  },
  {
    id: 'marah',
    label: 'Marah',
    priority: 2,
    duration: 2500,
    cooldown: 12000,
    shape: 'pulse',
    eyes: 'angry',
    expr: { angry: 0.95 },
    pose: {
      head: [-0.08, 0, 0],
      chest: [-0.05, 0, 0],
      spine: [-0.05, 0, 0],
      leftUpperArm: [0.1, 0, 0.16],
      rightUpperArm: [0.1, 0, -0.16],
      leftLowerArm: [0.35, 0, 0],
      rightLowerArm: [0.35, 0, 0],
    },
    wave: [{ bone: 'hips', axis: 'y', amplitude: 0.035, hz: 3 }],
    sfx: 'huff_hard',
    sfxFollow: { name: 'hmph', at: 0.45 },
  },
  {
    id: 'ngambek',
    label: 'Ngambek',
    priority: 2,
    duration: 6000,
    cooldown: 15000,
    shape: 'plateau',
    eyes: 'half',
    expr: { sad: 0.85 },
    pose: {
      head: [0.12, -0.3, 0.05],
      chest: [0.02, -0.06, 0],
      leftUpperArm: [0.35, 0, 0.5],
      rightUpperArm: [0.35, 0, -0.5],
      leftLowerArm: [0.5, 0, 0],
      rightLowerArm: [0.5, 0, 0],
    },
    /** Memunggung: seluruh model diputar, bukan hanya kepala. */
    yaw: -0.4,
    sfx: 'sigh_low',
    /** Selama ngambek, sentuhan ditolak (lihat `rejectTouchMs`). */
    rejectTouchMs: 5000,
  },
  {
    id: 'sayang',
    label: 'Sayang',
    priority: 2,
    duration: 2200,
    cooldown: 6000,
    shape: 'pulse',
    eyes: 'closed',
    expr: { happy: 0.95 },
    pose: {
      head: [0.06, 0, 0.16],
      chest: [0.03, 0, 0],
      leftUpperArm: [0.25, 0, 0.2],
      rightUpperArm: [0.25, 0, -0.2],
      leftLowerArm: [0.6, 0, 0],
      rightLowerArm: [0.6, 0, 0],
    },
    wave: [{ bone: 'head', axis: 'z', amplitude: 0.03, hz: 0.6 }],
    sfx: 'hum_soft',
  },
  {
    id: 'peluk',
    label: 'Peluk',
    priority: 2,
    duration: 2000,
    cooldown: 20000,
    shape: 'pulse',
    eyes: 'closed',
    expr: { happy: 0.8 },
    clip: 'interact',
    pose: {
      spine: [0.08, 0, 0],
      head: [0.1, 0, 0],
      leftUpperArm: [0.9, 0, 0.35],
      rightUpperArm: [0.9, 0, -0.35],
      leftLowerArm: [0.5, 0, 0],
      rightLowerArm: [0.5, 0, 0],
    },
    /** Badan maju sedikit ke arah layar (dipakai Android untuk menggeser jendela). */
    nudge: [0, -8],
    sfx: 'mmm',
  },
  {
    id: 'malu',
    label: 'Malu (>_<)',
    priority: 3,
    duration: 2600,
    cooldown: 5000,
    shape: 'pulse',
    eyes: 'squint',
    expr: { happy: 0.45, sad: 0.3, angry: 0.12 },
    pose: {
      head: [0.18, 0, 0],
      spine: [0.12, 0, 0],
      chest: [0.06, 0, 0],
      leftUpperArm: [0.5, 0, 0.55],
      rightUpperArm: [0.5, 0, -0.55],
      leftLowerArm: [1.0, 0, 0],
      rightLowerArm: [1.0, 0, 0],
      leftUpperLeg: [0, 0, 0.05],
      rightUpperLeg: [0, 0, -0.05],
    },
    /** Mundur saat malu: jendela digeser menjauh 10 px. */
    nudge: [0, 10],
    sfx: 'eep',
  },
  {
    id: 'kaget',
    label: 'Kaget',
    priority: 2,
    duration: 1400,
    cooldown: 4000,
    shape: 'pulse',
    eyes: 'wide',
    expr: { surprised: 1.0 },
    clip: 'jump_start',
    pose: {
      head: [-0.16, 0, 0],
      neck: [-0.08, 0, 0],
      spine: [-0.12, 0, 0],
      leftShoulder: [0, 0, 0.25],
      rightShoulder: [0, 0, -0.25],
      leftUpperArm: [0.3, 0, 0.2],
      rightUpperArm: [0.3, 0, -0.2],
    },
    nudge: [0, 6],
    sfx: 'gasp',
  },
  {
    id: 'ketawa',
    label: 'Ketawa',
    priority: 2,
    duration: 2400,
    cooldown: 8000,
    shape: 'pulse',
    eyes: 'squint',
    expr: { happy: 1.0 },
    pose: {
      head: [0.12, 0, 0.06],
      chest: [0.1, 0, 0],
      spine: [0.14, 0, 0],
      leftLowerArm: [0.55, 0, 0],
      rightLowerArm: [0.55, 0, 0],
    },
    wave: [
      { bone: 'hips', axis: 'x', amplitude: 0.04, hz: 1.8 },
      { bone: 'head', axis: 'z', amplitude: 0.05, hz: 1.8 },
    ],
    sfx: 'giggle_3',
  },
  {
    id: 'geli',
    label: 'Geli',
    priority: 2,
    duration: 1800,
    cooldown: 6000,
    shape: 'pulse',
    eyes: 'squint',
    expr: { happy: 0.7, surprised: 0.3 },
    pose: {
      head: [0.05, 0, 0.08],
      leftUpperArm: [0.3, 0, 0.5],
      rightUpperArm: [0.3, 0, -0.5],
      leftLowerArm: [0.3, 0, 0],
      rightLowerArm: [0.3, 0, 0],
    },
    wave: [
      { bone: 'spine', axis: 'y', amplitude: 0.22, hz: 2.6 },
      { bone: 'head', axis: 'y', amplitude: 0.18, hz: 2.6 },
    ],
    nudge: [0, 6],
    sfx: 'giggle_short',
  },
  {
    id: 'bangga',
    label: 'Bangga',
    priority: 2,
    duration: 2200,
    cooldown: 15000,
    shape: 'pulse',
    eyes: 'normal',
    expr: { happy: 0.8 },
    clip: 'spell_enter',
    pose: {
      chest: [-0.1, 0, 0],
      head: [-0.08, 0, 0],
      leftUpperArm: [0.35, 0, 0.55],
      rightUpperArm: [0.35, 0, -0.55],
      leftLowerArm: [0.9, 0, 0],
      rightLowerArm: [0.9, 0, 0],
    },
    sfx: 'chime_up',
  },
  {
    id: 'lompat',
    label: 'Lompat gembira',
    priority: 1,
    duration: 1800,
    cooldown: 30000,
    shape: 'pulse',
    eyes: 'normal',
    expr: { happy: 1.0 },
    clips: ['jump_start', 'jump_land'],
    pose: {
      spine: [0.05, 0, 0],
      head: [-0.05, 0, 0],
      leftUpperArm: [0, 0, 0.4],
      rightUpperArm: [0, 0, -0.4],
    },
    sfx: 'boing',
  },
  {
    id: 'lambai',
    label: 'Melambai',
    priority: 1,
    duration: 2000,
    cooldown: 45000,
    shape: 'pulse',
    eyes: 'normal',
    expr: { happy: 0.7 },
    clip: 'interact',
    pose: {
      head: [0.04, 0, 0.05],
      rightUpperArm: [0.6, 0, -1.05],
      rightLowerArm: [0.3, 0, 0],
    },
    wave: [{ bone: 'rightLowerArm', axis: 'z', amplitude: 0.35, hz: 2.2 }],
    sfx: 'blip_soft',
  },
];

/**
 * Peta keputusan: (zona, gestur) → gaya reaksi.
 *
 * Ditulis sebagai data supaya bisa diuji dan diubah tanpa menyentuh renderer. Gestur berasal
 * dari `touch.js` (`tap`, `double`, `rapid`, `stroke`, `hold`); zona berasal dari
 * `zoneForPoint()`. Kombinasi yang tidak ada di peta punya cadangan per zona.
 */
export const TOUCH_MAP = {
  head: { stroke: 'sayang', hold: 'tidur', double: 'bangga', rapid: 'kaget', tap: 'sayang' },
  cheek: { tap: 'malu', stroke: 'sayang', double: 'malu', rapid: 'kaget', hold: 'tidur' },
  shoulder: { tap: 'lambai', double: 'bangga', rapid: 'kaget', hold: 'peluk', stroke: 'sayang' },
  hand: { tap: 'lambai', hold: 'peluk', double: 'kaget', rapid: 'geli' },
  belly: { tap: 'ketawa', rapid: 'geli', double: 'marah', hold: 'peluk' },
  hip: { tap: 'malu', double: 'kaget', rapid: 'geli', hold: 'malu', stroke: 'malu' },
  leg: { tap: 'kaget', rapid: 'marah', double: 'geli' },
};

/** Cadangan bila kombinasi zona/gestur tidak ada di peta. */
const ZONE_FALLBACK = {
  head: 'sayang', cheek: 'malu', shoulder: 'lambai', hand: 'lambai',
  belly: 'ketawa', hip: 'malu', leg: 'kaget',
};

/**
 * @param {{zone: string, gesture: string}} input
 * @returns {string|null} id gaya, atau null bila tidak ada reaksi yang cocok
 */
export function styleForTouch({ zone, gesture }) {
  const map = TOUCH_MAP[zone];
  const byGesture = map?.[gesture];
  if (byGesture) return byGesture;
  // Elusan hanya bermakna di sekitar kepala; di tempat lain diabaikan.
  if (gesture === 'stroke') return zone === 'head' || zone === 'cheek' ? 'sayang' : null;
  return ZONE_FALLBACK[zone] || null;
}

const BY_ID = new Map(STYLES.map((style) => [style.id, style]));

/** Nama ekspresi VRM 1.0 yang dipakai; sisanya dibiarkan apa adanya. */
export const EXPRESSION_KEYS = ['happy', 'sad', 'angry', 'relaxed', 'surprised', 'neutral'];

export function styleById(id) {
  return BY_ID.get(id) || null;
}

/** Amplop waktu: `pulse` naik-turun, `plateau` naik, tahan, lalu turun. */
export function envelopeOf(style, progress) {
  const p = Math.min(1, Math.max(0, progress));
  if (style?.shape === 'plateau') {
    const ramp = style.ramp ?? 0.12;
    return Math.min(1, Math.min(p, 1 - p) / ramp);
  }
  return Math.sin(p * Math.PI);
}

function clampPose(value) {
  return Math.max(-POSE_CLAMP, Math.min(POSE_CLAMP, value));
}

/**
 * @param {object} options
 * @param {number} options.reducedMotion skala gerak 0..1 (aksesibilitas)
 */
export function createReactions(options = {}) {
  const state = {
    clock: 0, // milidetik
    current: null,
    cooldowns: new Map(),
    lastFinished: null,
    history: [],
    rejected: 0,
    reducedMotion: options.reducedMotion ? 0.35 : 1,
    rejectUntil: 0,
  };

  function cooldownLeft(id) {
    const until = state.cooldowns.get(id) || 0;
    return Math.max(0, until - state.clock);
  }

  /**
   * Picu gaya. Mengembalikan `true` bila diterima.
   * Aturan:
   *  - prioritas lebih rendah dari yang aktif → ditolak (direktur tidak boleh memotong sentuhan);
   *  - masih dalam jeda → ditolak, kecuali `force` (perintah eksplisit pengguna);
   *  - gaya yang sama tidak boleh berulang langsung, kecuali `force`.
   */
  function trigger(id, context = {}) {
    const style = BY_ID.get(id);
    if (!style) return false;
    const force = context.force === true;
    const priority = context.priority ?? style.priority;
    if (state.current && priority < state.current.priority && !force) {
      state.rejected += 1;
      return false;
    }
    if (!force && cooldownLeft(id) > 0) {
      state.rejected += 1;
      return false;
    }
    if (!force && state.lastFinished === id && state.current === null && style.duration < 2500) {
      state.rejected += 1;
      return false;
    }
    state.current = {
      style,
      id,
      priority,
      startedAt: state.clock,
      duration: style.duration,
      source: context.source || 'auto',
      fired: new Set(),
    };
    state.history.push({ id, at: state.clock, source: state.current.source });
    if (state.history.length > 40) state.history.shift();
    if (style.rejectTouchMs) state.rejectUntil = state.clock + style.rejectTouchMs;
    return true;
  }

  /** Hentikan reaksi sekarang (dipakai saat tidur dibangunkan atau avatar diganti). */
  function interrupt(reason = 'interrupt') {
    if (!state.current) return false;
    state.current = null;
    state.lastFinished = reason === 'interrupt' ? null : state.lastFinished;
    return true;
  }

  function update(dt) {
    const deltaMs = Math.max(0, Number(dt) || 0) * 1000;
    state.clock += deltaMs;
    const frame = {
      styleId: null,
      label: null,
      progress: 0,
      layers: {},
      expression: {},
      eyes: 'normal',
      yaw: 0,
      nudge: null,
      sfx: [],
      rejectTouch: state.clock < state.rejectUntil,
    };
    const current = state.current;
    if (!current) return frame;

    const age = state.clock - current.startedAt;
    if (age >= current.duration) {
      state.cooldowns.set(current.id, state.clock + current.style.cooldown);
      state.lastFinished = current.id;
      state.current = null;
      return frame;
    }
    const progress = age / current.duration;
    const envelope = envelopeOf(current.style, progress) * state.reducedMotion;
    frame.styleId = current.id;
    frame.label = current.style.label;
    frame.progress = Number(progress.toFixed(4));
    frame.eyes = current.style.eyes || 'normal';
    frame.yaw = (current.style.yaw || 0) * envelope;
    frame.nudge = current.style.nudge || null;

    // Pose statis.
    for (const [bone, delta] of Object.entries(current.style.pose || {})) {
      const layer = (frame.layers[bone] = frame.layers[bone] || { x: 0, y: 0, z: 0 });
      layer.x += clampPose(delta[0] * envelope);
      layer.y += clampPose(delta[1] * envelope);
      layer.z += clampPose(delta[2] * envelope);
    }
    // Gerakan berirama di atas pose.
    for (const wave of current.style.wave || []) {
      const layer = (frame.layers[wave.bone] = frame.layers[wave.bone] || { x: 0, y: 0, z: 0 });
      const phase = 2 * Math.PI * wave.hz * (age / 1000) + (wave.phase || 0);
      layer[wave.axis] = clampPose(layer[wave.axis] + Math.sin(phase) * wave.amplitude * envelope);
    }
    // Ekspresi wajah mengikuti amplop yang sama supaya tidak "nyangkut" setelah reaksi selesai.
    for (const [name, value] of Object.entries(current.style.expr || {})) {
      frame.expression[name] = Number((value * envelope).toFixed(3));
    }
    // Suara: sekali di awal, plus susulan bila ada. Dihitung dari `fired` agar tidak berulang tiap frame.
    const emit = (name, atFraction) => {
      if (!name || current.fired.has(name)) return;
      if (progress + 0.001 < atFraction) return;
      current.fired.add(name);
      frame.sfx.push(name);
    };
    emit(current.style.sfx, 0.02);
    if (current.style.sfxFollow) emit(current.style.sfxFollow.name, current.style.sfxFollow.at);

    return frame;
  }

  return {
    state,
    trigger,
    interrupt,
    update,
    cooldownLeft,
    get active() {
      return state.current ? state.current.id : null;
    },
    /** Klip yang perlu diputar sekali saat reaksi ini mulai (atau null). */
    clipFor(id) {
      return BY_ID.get(id)?.clip || BY_ID.get(id)?.clips?.[0] || null;
    },
    debug() {
      return {
        clock: Math.round(state.clock),
        active: state.current?.id || null,
        lastFinished: state.lastFinished,
        rejected: state.rejected,
        history: state.history.slice(-5).map((entry) => entry.id),
      };
    },
  };
}
