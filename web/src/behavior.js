/**
 * Direktur perilaku: membuat avatar punya "kehendak" sendiri.
 *
 * Tanpa modul ini, avatar hanya berpindah klip saat ada input (chat, tombol, sentuhan). Akibatnya,
 * kalau dibiarkan, ia mengulang klip idle yang sama berjam-jam — inilah yang terasa "kaku" dan
 * "tidak otomatis". Di sini perilaku dipilih berbobot, dengan cooldown dan durasi, tanpa
 * bergantung pada jumlah frame (WebView overlay di-throttle saat tidak terlihat).
 *
 * Modul ini **tidak** mengimpor three.js supaya bisa diuji dengan jam palsu di Node.
 *
 * Semua nama perilaku dan angkanya milik proyek ini; tidak ada berkas animasi pihak ketiga yang
 * disalin. Klip yang diputar berasal dari paket CC0 (lihat docs/aset-gerak.md).
 */

/** Suasana menentukan bobot perilaku, bukan daftar terpisah. */
export const MOODS = ['ceria', 'kalem', 'pemalu'];

/**
 * Kumpulan klip untuk perilaku "gerak acak".
 *
 * Setiap kali perilaku ini terpilih, satu klip diundi dari daftar ini — jadi avatar berganti-ganti
 * gerakan alih-alih mengulang pose yang sama. Klip duduk sengaja tidak dimasukkan: duduk punya
 * jalur sendiri (`sit_down`) supaya tidak bertabrakan dengan mode duduk di tepi layar.
 */
export const RANDOM_CLIPS = [
  'idle_torch',
  'spell_idle',
  'crouch_idle',
  'interact',
  'dance_loop',
  'walk_formal',
  'jog_loop',
  'jump_loop',
  'push_loop',
  'kneel_fix',
  'crouch_walk',
  'drive_idle',
];

/**
 * Katalog perilaku.
 *
 * - `clip`   : nama klip bawaan yang diputar (lihat BUILTIN_CLIPS di renderer.js)
 * - `minMs`  : durasi minimum satu kejadian
 * - `maxMs`  : durasi maksimum
 * - `gapMin` / `gapMax` : jeda setelah perilaku selesai sebelum perilaku berikutnya boleh dipilih
 * - `weight` : bobot dasar, dikali bobot suasana
 * - `cooldownMs` : jarak minimum antar kejadian yang sama
 * - `moods`  : suasana yang menguatkan (bobot ×2) atau melemahkan (×0,5) perilaku ini
 * - `requires`: syarat tambahan atas konteks
 */
export const BEHAVIORS = [
  {
    id: 'random_clip',
    // `clips` (bukan `clip`): diundi saat perilaku dimulai, lihat start().
    clips: RANDOM_CLIPS,
    minMs: 2200,
    maxMs: 4200,
    gapMin: 1200,
    gapMax: 3200,
    // Bobot tertinggi: pengguna minta avatar berganti-ganti gerakan, bukan mengulang idle.
    weight: 6,
    cooldownMs: 3500,
    moods: { ceria: 1.3, kalem: 1, pemalu: 0.9 },
  },
  {
    id: 'look_around',
    clip: 'idle_loop',
    minMs: 2400,
    maxMs: 4200,
    gapMin: 2200,
    gapMax: 6500,
    weight: 3,
    cooldownMs: 9000,
    moods: { ceria: 1.2, kalem: 1.4, pemalu: 0.8 },
  },
  {
    id: 'weight_shift',
    clip: 'idle_loop',
    minMs: 3000,
    maxMs: 5200,
    gapMin: 2600,
    gapMax: 7000,
    weight: 3,
    cooldownMs: 11000,
    moods: { ceria: 1, kalem: 1.3, pemalu: 0.9 },
  },
  {
    id: 'stretch',
    clip: 'idle_torch',
    minMs: 2500,
    maxMs: 2500,
    gapMin: 3500,
    gapMax: 8000,
    weight: 2,
    cooldownMs: 45000,
    moods: { ceria: 1, kalem: 1.2, pemalu: 0.6 },
    requires: (ctx) => ctx.idleMs >= 40000,
  },
  {
    id: 'wave_hello',
    clip: 'interact',
    minMs: 2000,
    maxMs: 2000,
    gapMin: 3000,
    gapMax: 7000,
    weight: 2,
    cooldownMs: 90000,
    moods: { ceria: 3, kalem: 0.8, pemalu: 0.4 },
    requires: (ctx) => ctx.idleMs >= 25000,
  },
  {
    id: 'talk_self',
    clip: 'idle_talk',
    minMs: 2900,
    maxMs: 2900,
    gapMin: 4000,
    gapMax: 9000,
    weight: 1,
    cooldownMs: 120000,
    moods: { ceria: 1.6, kalem: 0.5, pemalu: 0.8 },
    requires: (ctx) => ctx.idleMs >= 60000,
  },
  {
    id: 'pose_cute',
    clip: 'spell_idle',
    minMs: 2080,
    maxMs: 2080,
    gapMin: 5000,
    gapMax: 12000,
    weight: 1,
    cooldownMs: 150000,
    moods: { ceria: 2.2, kalem: 0.4, pemalu: 1.4 },
    requires: (ctx) => ctx.idleMs >= 45000,
  },
  {
    id: 'sit_down',
    clip: 'sitting_enter',
    minMs: 1290,
    maxMs: 1290,
    gapMin: 0,
    gapMax: 0,
    weight: 1,
    cooldownMs: 60000,
    moods: { ceria: 1, kalem: 1.6, pemalu: 0.8 },
    requires: (ctx) => ctx.idleMs >= 30000 && ctx.edgeSeatAvailable === true,
  },
  {
    id: 'sleep',
    clip: 'crouch_idle',
    minMs: 6000,
    maxMs: 6000,
    gapMin: 0,
    gapMax: 0,
    weight: 1,
    cooldownMs: 180000,
    moods: { ceria: 0.6, kalem: 2, pemalu: 1 },
    requires: (ctx) => ctx.idleMs >= 120000,
  },
];

/** Perilaku netral saat suasana belum terbentuk atau saat mode gerak dikurangi. */
const CALM_FALLBACK = ['look_around', 'weight_shift'];

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

/**
 * @param {object} options
 * @param {number} [options.seed] seed PRNG agar urutan bisa direproduksi di uji
 * @param {() => number} [options.random] sumber acak alternatif (untuk uji)
 */
export function createBehaviorDirector(options = {}) {
  let random = typeof options.random === 'function' ? options.random : mulberry32(options.seed ?? 20260101);

  const state = {
    mood: 'ceria',
    active: null,
    activeUntil: 0,
    nextAt: 0,
    lastClip: null,
    lastSeen: new Map(),
    history: [],
    moodChangedAt: 0,
    reducedMotion: Boolean(options.reducedMotion),
    lastInteractionAt: -Infinity,
  };

  function mulberry32(seed) {
    let a = seed >>> 0;
    return () => {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /** Suasana diturunkan dari konteks: baru berinteraksi → ceria, lama diam → kalem. */
  function resolveMood(ctx, now) {
    if (now - state.lastInteractionAt < 60000) return 'ceria';
    if (ctx.idleMs >= 90000) return 'kalem';
    if (ctx.armed && ctx.idleMs >= 20000) return 'pemalu';
    return 'ceria';
  }

  function weightOf(behavior, mood) {
    const factor = behavior.moods?.[mood] ?? 1;
    return behavior.weight * factor;
  }

  function eligible(ctx, now) {
    const pool = [];
    for (const behavior of BEHAVIORS) {
      if (behavior.requires && !behavior.requires(ctx)) continue;
      const last = state.lastSeen.get(behavior.id) ?? -Infinity;
      if (now - last < behavior.cooldownMs) continue;
      const weight = weightOf(behavior, state.mood);
      if (weight <= 0) continue;
      pool.push({ behavior, weight });
    }
    // Jangan ulangi perilaku yang barusan tampil bila masih ada pilihan lain:
    // pengulangan langsung membuat gerak terasa berputar-putar, bukan hidup.
    const lastId = state.history[state.history.length - 1]?.id;
    if (lastId && pool.length > 1) {
      const filtered = pool.filter((entry) => entry.behavior.id !== lastId);
      if (filtered.length > 0) return filtered;
    }
    return pool;
  }

  function pickWeighted(pool) {
    const total = pool.reduce((sum, entry) => sum + entry.weight, 0);
    if (total <= 0) return null;
    let target = random() * total;
    for (const entry of pool) {
      target -= entry.weight;
      if (target <= 0) return entry.behavior;
    }
    return pool[pool.length - 1].behavior;
  }

  function start(behavior, now) {
    // Perilaku yang membawa daftar `clips` memilih satu klip acak setiap kali muncul, dan tidak
    // memilih klip yang barusan tampil supaya pergantiannya terlihat.
    let chosen = behavior;
    if (Array.isArray(behavior.clips) && behavior.clips.length > 0) {
      const alternatives = behavior.clips.filter((clip) => clip !== state.lastClip);
      const pool = alternatives.length > 0 ? alternatives : behavior.clips;
      const clip = pool[Math.floor(random() * pool.length)];
      state.lastClip = clip;
      chosen = { ...behavior, clip };
    }
    behavior = chosen;
    const span = behavior.maxMs - behavior.minMs;
    const duration = behavior.minMs + Math.round(random() * Math.max(0, span));
    state.active = behavior;
    state.activeUntil = now + duration;
    state.lastSeen.set(behavior.id, now);
    const gap = behavior.gapMin + random() * Math.max(0, behavior.gapMax - behavior.gapMin);
    state.nextAt = state.activeUntil + gap;
    state.history.push({ id: behavior.id, clip: behavior.clip, at: Math.round(now), durationMs: duration });
    if (state.history.length > 60) state.history.shift();
    return behavior;
  }

  function finish(now) {
    const behavior = state.active;
    state.active = null;
    if (!behavior) return;
    const gap = behavior.gapMin + random() * Math.max(0, behavior.gapMax - behavior.gapMin);
    state.nextAt = now + gap;
  }

  /**
   * @param {number} now waktu dinding (performance.now() atau jam palsu)
   * @param {object} ctx
   * @param {boolean} ctx.talking sedang bicara (membatalkan perilaku yang berjalan)
   * @param {string}  ctx.locomotion 'idle' | 'walk' | 'dance'
   * @param {number}  ctx.idleMs lama tidak ada interaksi
   * @param {boolean} [ctx.interacted] ada sentuhan/geser pada frame ini
   * @param {boolean} [ctx.edgeSeatAvailable] mode duduk di tepi tersedia
   * @param {boolean} [ctx.armed] sudah pernah berinteraksi (mengizinkan suasana pemalu)
   */
  function update(now, ctx = {}) {
    if (ctx.interacted) state.lastInteractionAt = now;

    // Bicara dan lokomosi mengalahkan semua perilaku otomatis.
    if (state.active && (ctx.talking || ctx.locomotion !== 'idle')) {
      finish(now);
    }
    if (ctx.talking || ctx.locomotion !== 'idle') {
      state.active = null;
      if (state.nextAt < now) state.nextAt = now + 1500;
      return null;
    }

    if (state.active) {
      if (now < state.activeUntil) return state.active;
      finish(now);
    }

    state.mood = resolveMood(ctx, now);

    if (now < state.nextAt) return null;
    if (state.reducedMotion) {
      // Mode gerak dikurangi: hanya perilaku tenang, tanpa variasi ekspresif.
      const calm = BEHAVIORS.find((behavior) => CALM_FALLBACK.includes(behavior.id));
      if (calm && now - (state.lastSeen.get(calm.id) ?? -Infinity) >= calm.cooldownMs) return start(calm, now);
      state.nextAt = now + 20000;
      return null;
    }

    const choice = pickWeighted(eligible(ctx, now));
    if (!choice) {
      state.nextAt = now + 4000;
      return null;
    }
    return start(choice, now);
  }

  return {
    state,
    update,
    /** Nama klip yang sedang dipakai perilaku aktif, atau null. */
    currentClip: () => state.active?.clip ?? null,
    currentId: () => state.active?.id ?? null,
    timeline: () => state.history.slice(),
    setMood: (mood) => {
      if (MOODS.includes(mood)) state.mood = mood;
    },
    setReducedMotion: (value) => {
      state.reducedMotion = Boolean(value);
    },
    reset: (now = 0) => {
      state.active = null;
      state.activeUntil = 0;
      state.nextAt = now + 2500;
      state.lastSeen.clear();
      state.history.length = 0;
    },
  };
}
