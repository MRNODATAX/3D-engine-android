/**
 * Uji direktur perilaku dengan jam palsu (tanpa browser, tanpa three.js).
 *
 * Yang dibuktikan:
 *  1. dalam 60 detik tanpa input, avatar memunculkan banyak perilaku dari beberapa jenis;
 *  2. tidak pernah ada dua perilaku aktif bersamaan;
 *  3. cooldown dihormati (perilaku sama tidak muncul terlalu rapat);
 *  4. bicara & lokomosi membatalkan perilaku otomatis;
 *  5. suasana berubah: baru disentuh → ceria, lama diam → kalem;
 *  6. mode gerak dikurangi hanya memakai perilaku tenang;
 *  7. jadwal deterministik untuk seed yang sama.
 */
import { createBehaviorDirector, BEHAVIORS } from '../src/behavior.js';

// `calm` menandai mode gerak dikurangi: pemilihan acak dikunci.

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function run(seconds, { dt = 1 / 30, ctx = {}, director } = {}) {
  const events = [];
  let now = 0;
  const step = 1000 / 30;
  const frames = Math.round((seconds * 1000) / step);
  for (let i = 0; i < frames; i += 1) {
    now += step;
    const behavior = director.update(now, {
      talking: false,
      locomotion: 'idle',
      idleMs: now,
      ...ctx,
    });
    if (behavior && events[events.length - 1]?.id !== behavior.id) {
      events.push({ id: behavior.id, at: now });
    }
    void dt;
  }
  return events;
}

let failures = 0;

// ---------------------------------------------------------------- 1. kekayaan perilaku
try {
  const director = createBehaviorDirector({ seed: 7 });
  const events = run(90, { director });
  const kinds = new Set(events.map((event) => event.id));
  assert(events.length >= 8, `hanya ${events.length} perilaku dalam 90 s`);
  assert(kinds.size >= 4, `hanya ${kinds.size} jenis perilaku: ${[...kinds].join(', ')}`);
  // Tidak boleh ada pengulangan langsung saat masih ada pilihan lain.
  let repeats = 0;
  for (let i = 1; i < events.length; i += 1) if (events[i].id === events[i - 1].id) repeats += 1;
  assert(repeats === 0, `perilaku yang sama tampil dua kali berurutan (${repeats}×)`);
  console.log(`✓ 90 s tanpa input: ${events.length} perilaku, ${kinds.size} jenis (${[...kinds].join(', ')})`);
} catch (error) {
  failures += 1;
  console.error(`✗ kekayaan perilaku: ${error.message}`);
}

// ------------------------------------------------- 2. satu perilaku aktif, durasi sesuai katalog
try {
  const director = createBehaviorDirector({ seed: 11 });
  let now = 0;
  const spans = new Map(); // key -> {id, start, end}
  let current = null;
  let currentSpan = null;
  for (let i = 0; i < 30 * 90; i += 1) {
    now += 1000 / 30;
    const behavior = director.update(now, { talking: false, locomotion: 'idle', idleMs: now });
    const id = behavior?.id ?? null;
    if (id !== current) {
      if (currentSpan) currentSpan.end = now;
      if (id) {
        currentSpan = { id, start: now, end: null };
        spans.set(`${id}#${Math.round(now)}`, currentSpan);
      } else {
        currentSpan = null;
      }
      current = id;
    }
  }
  if (currentSpan) currentSpan.end = now;
  let violations = 0;
  for (const span of spans.values()) {
    const duration = span.end - span.start;
    const definition = BEHAVIORS.find((behavior) => behavior.id === span.id);
    // Toleransi satu frame untuk pembulatan.
    if (duration > definition.maxMs + 40 || (duration < definition.minMs - 40 && span.end !== now)) {
      violations += 1;
    }
  }
  assert(violations === 0, `${violations} perilaku berdurasi di luar katalog`);
  assert(spans.size >= 10, `hanya ${spans.size} perilaku dalam 90 s`);
  console.log(`✓ ${spans.size} perilaku, semuanya berdurasi sesuai katalog (satu aktif pada satu waktu)`);
} catch (error) {
  failures += 1;
  console.error(`✗ durasi perilaku: ${error.message}`);
}

// ---------------------------------------------------------------- 3. cooldown
try {
  const director = createBehaviorDirector({ seed: 3 });
  const events = run(90, { director });
  const byId = new Map();
  for (const event of events) {
    const list = byId.get(event.id) ?? [];
    list.push(event.at);
    byId.set(event.id, list);
  }
  let violations = 0;
  for (const [id, times] of byId) {
    const definition = BEHAVIORS.find((behavior) => behavior.id === id);
    for (let i = 1; i < times.length; i += 1) {
      if (times[i] - times[i - 1] < definition.cooldownMs - 1) violations += 1;
    }
  }
  assert(violations === 0, `ada ${violations} pelanggaran cooldown`);
  console.log('✓ cooldown tiap perilaku dihormati');
} catch (error) {
  failures += 1;
  console.error(`✗ cooldown: ${error.message}`);
}

// ---------------------------------------------------------------- 4. bicara & lokomosi
try {
  const director = createBehaviorDirector({ seed: 5 });
  let now = 0;
  for (let i = 0; i < 30 * 5; i += 1) {
    now += 1000 / 30;
    director.update(now, { talking: false, locomotion: 'idle', idleMs: now });
  }
  const activeBefore = director.currentId();
  for (let i = 0; i < 30 * 2; i += 1) {
    now += 1000 / 30;
    const result = director.update(now, { talking: true, locomotion: 'idle', idleMs: now });
    assert(result === null, 'perilaku tetap berjalan saat bicara');
  }
  assert(director.currentId() === null, `perilaku ${director.currentId()} tidak dibatalkan saat bicara`);
  for (let i = 0; i < 30 * 2; i += 1) {
    now += 1000 / 30;
    const result = director.update(now, { talking: false, locomotion: 'walk', idleMs: now });
    assert(result === null, 'perilaku tetap berjalan saat berjalan');
  }
  console.log(`✓ bicara & berjalan membatalkan perilaku (sebelumnya: ${activeBefore ?? 'tidak ada'})`);
} catch (error) {
  failures += 1;
  console.error(`✗ pembatalan: ${error.message}`);
}

// ---------------------------------------------------------------- 5. suasana
try {
  const ceria = createBehaviorDirector({ seed: 9 });
  let now = 0;
  ceria.update((now += 16), { talking: false, locomotion: 'idle', idleMs: 0, interacted: true });
  const moodCeria = ceria.state.mood;

  const kalem = createBehaviorDirector({ seed: 9 });
  let later = 0;
  for (let i = 0; i < 30 * 3; i += 1) {
    later += 1000 / 30;
    kalem.update(later, { talking: false, locomotion: 'idle', idleMs: 100000 });
  }
  const moodKalem = kalem.state.mood;
  assert(moodCeria === 'ceria', `suasana setelah interaksi = ${moodCeria}`);
  assert(moodKalem === 'kalem', `suasana setelah lama diam = ${moodKalem}`);
  console.log(`✓ suasana berubah: baru disentuh → ${moodCeria}, lama diam → ${moodKalem}`);
} catch (error) {
  failures += 1;
  console.error(`✗ suasana: ${error.message}`);
}

// ---------------------------------------------------------------- 6. mode gerak dikurangi
try {
  const director = createBehaviorDirector({ seed: 13, reducedMotion: true });
  const events = run(120, { director });
  const kinds = new Set(events.map((event) => event.id));
  const allowed = new Set(['look_around', 'weight_shift']);
  for (const id of kinds) {
    assert(allowed.has(id), `perilaku ${id} muncul walau mode gerak dikurangi`);
  }
  assert(events.length >= 1, 'tidak ada perilaku sama sekali pada mode gerak dikurangi');
  console.log(`✓ mode gerak dikurangi: hanya ${[...kinds].join(', ')} (${events.length} kejadian)`);
} catch (error) {
  failures += 1;
  console.error(`✗ mode gerak dikurangi: ${error.message}`);
}

// ---------------------------------------------------------------- 6b. gerak acak berganti
try {
  const director = createBehaviorDirector({ seed: 11 });
  const clips = [];
  let now = 0;
  for (let i = 0; i < 6000; i += 1) {
    now += 1000 / 30;
    const behavior = director.update(now, { talking: false, locomotion: 'idle', idleMs: now });
    if (behavior && behavior.id === 'random_clip') {
      const clip = behavior.clip;
      if (clips[clips.length - 1] !== clip) clips.push(clip);
    }
  }
  const unique = new Set(clips);
  // Ambang diturunkan dari 8 → 6 setelah katalog perilaku bertambah (gestur sihir/memungut/
  // berguling ikut tampil); yang penting tetap banyak pergantian dan klipnya bervariasi.
  assert(clips.length >= 6, `hanya ${clips.length} pergantian gerak acak dalam 200 s`);
  assert(unique.size >= 5, `hanya ${unique.size} klip berbeda: ${[...unique].join(', ')}`);
  let same = 0;
  for (let i = 1; i < clips.length; i += 1) if (clips[i] === clips[i - 1]) same += 1;
  assert(same === 0, `klip acak sama dua kali berurutan (${same}×)`);
  console.log(`✓ gerak acak: ${clips.length} pergantian, ${unique.size} klip berbeda`);
} catch (error) {
  failures += 1;
  console.error(`✗ gerak acak: ${error.message}`);
}

// ---------------------------------------------------------------- 7. determinisme
try {
  const first = run(45, { director: createBehaviorDirector({ seed: 42 }) });
  const second = run(45, { director: createBehaviorDirector({ seed: 42 }) });
  assert(
    JSON.stringify(first.map((event) => event.id)) === JSON.stringify(second.map((event) => event.id)),
    'seed sama menghasilkan urutan berbeda',
  );
  console.log(`✓ deterministik: seed 42 → ${first.map((event) => event.id).join(' > ')}`);
} catch (error) {
  failures += 1;
  console.error(`✗ determinisme: ${error.message}`);
}

if (failures) {
  console.error(`behavior: ${failures} pemeriksaan gagal`);
  process.exit(1);
}
console.log('behavior: semua pemeriksaan lulus');
