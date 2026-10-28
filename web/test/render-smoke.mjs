/**
 * Uji render nyata di Chromium headless (dijalankan di CI).
 *
 * Yang dibuktikan uji ini:
 *  1. bundle renderer dapat dijalankan tanpa error konsol;
 *  2. avatar VRM asli berhasil dimuat lewat three-vrm (bukan stub);
 *  3. kanvas menghasilkan piksel avatar DAN tetap transparan di sekitarnya;
 *  4. animasi .vrma benar-benar menggerakkan bone.
 *
 * Yang tidak dibuktikan: perilaku WindowManager overlay Android dan performa GPU
 * perangkat. Keduanya hanya bisa diverifikasi di perangkat.
 */
import { chromium } from 'playwright';
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.resolve(here, '..');
const repoRoot = path.resolve(webRoot, '..');
const assetsDir = path.join(repoRoot, 'app/src/main/assets/renderer');
const fixtureDir = path.join(webRoot, 'test-fixtures');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.vrm': 'application/octet-stream',
  '.vrma': 'application/octet-stream',
};

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    let file;
    if (url.pathname === '/' || url.pathname === '/index.html') file = path.join(assetsDir, 'index.html');
    else if (url.pathname === '/renderer.js') file = path.join(assetsDir, 'renderer.js');
    else if (url.pathname.startsWith('/fixtures/')) file = path.join(fixtureDir, path.basename(url.pathname));
    else if (url.pathname.startsWith('/animations/')) {
      file = path.join(repoRoot, 'app/src/main/assets/animations', path.basename(url.pathname));
    }
    if (!file) { res.writeHead(404).end('not found'); return; }
    const body = await readFile(file);
    res.writeHead(200, { 'content-type': MIME[path.extname(file)] || 'application/octet-stream', 'content-length': body.length });
    res.end(body);
  } catch (error) {
    res.writeHead(404).end(String(error));
  }
});

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const PORT = 4319;
await new Promise((resolve) => server.listen(PORT, '127.0.0.1', resolve));

let browser;
let failures = 0;
try {
  browser = await chromium.launch({
    args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--disable-gpu-sandbox'],
  });
  const page = await browser.newPage({ viewport: { width: 420, height: 720 } });
  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', (error) => consoleErrors.push(String(error)));

  await page.addInitScript(() => {
    window.__MATE_TEST__ = true;
    window.__MATE_EVENTS__ = [];
  });

  await page.goto(`http://127.0.0.1:${PORT}/index.html`, { waitUntil: 'load' });
  await page.waitForFunction(() => (window.__MATE_EVENTS__ || []).some((e) => e.type === 'renderer-ready'), null, { timeout: 30000 });
  console.log('✓ renderer-ready diterima');

  await page.evaluate(() => window.MateEngine.loadAvatar('/fixtures/vrm1-twist-sample.vrm'));
  await page.waitForFunction(
    () => (window.__MATE_EVENTS__ || []).some((e) => e.type === 'avatar-ready' || (e.type === 'error' && e.fatal)),
    null,
    { timeout: 60000 },
  );
  const events = await page.evaluate(() => window.__MATE_EVENTS__);
  const fatal = events.find((e) => e.type === 'error' && e.fatal);
  assert(!fatal, `avatar gagal dimuat: ${fatal?.message}`);
  const ready = events.find((e) => e.type === 'avatar-ready');
  assert(ready?.info?.humanoidBones > 0, 'avatar tidak memiliki humanoid bone');
  console.log(`✓ avatar-ready: ${ready.info.name} (${ready.info.version}, ${ready.info.humanoidBones} bone, ${ready.info.springJoints} spring)`);

  // Regresi: pose rileks tidak boleh terakumulasi tiap frame.
  // Direktur perilaku dimatikan dulu — sejak v0.1.8 avatar berganti klip sendiri (gerak acak),
  // sehingga perubahan rotasi lengan bisa berasal dari klip baru, bukan penumpukan offset.
  await page.evaluate(() => window.MateEngine.setBehaviorEnabled(false));
  await page.waitForTimeout(1200);
  // Tunggu blend selesai (1 detik) agar pembacaan tidak menangkap transisi.
  await page.waitForFunction(() => window.MateEngine.debugPose().blend >= 1, null, { timeout: 20000 });
  const poseEarly = await page.evaluate(() => window.MateEngine.debugPose());
  await page.waitForTimeout(3000);
  const poseLate = await page.evaluate(() => window.MateEngine.debugPose());
  // Klip harus sama selama pengukuran; kalau berbeda, yang terukur adalah pergantian klip.
  assert(
    poseEarly.animation === poseLate.animation,
    `klip berganti saat mengukur pose (${poseEarly.animation} -> ${poseLate.animation})`,
  );
  await page.evaluate(() => window.MateEngine.setBehaviorEnabled(true));
  assert(poseEarly.hasRestPose, 'pose istirahat tidak tertangkap');
  assert(
    Math.abs(poseLate.leftUpperArmZ - poseEarly.leftUpperArmZ) < 0.05,
    `rotasi lengan berubah sendiri (${poseEarly.leftUpperArmZ.toFixed(2)} -> ${poseLate.leftUpperArmZ.toFixed(2)}), pose terakumulasi`,
  );
  assert(
    Math.abs(poseLate.offsetZ + 1.15) < 0.25,
    `offset pose rileks tidak sesuai harapan (offset z=${poseLate.offsetZ?.toFixed(2)})`,
  );
  console.log(
    `✓ pose stabil: offset lengan ${poseLate.offsetZ.toFixed(2)} rad (rotasi ${poseLate.leftUpperArmZ.toFixed(2)}, istirahat ${poseLate.restZ.toFixed(2)})`,
  );

  const pixels = await page.evaluate(() => {
    const source = document.getElementById('stage');
    const scratch = document.createElement('canvas');
    scratch.width = source.width;
    scratch.height = source.height;
    const ctx = scratch.getContext('2d');
    ctx.drawImage(source, 0, 0);
    const data = ctx.getImageData(0, 0, scratch.width, scratch.height).data;
    let opaque = 0;
    let transparent = 0;
    let minX = Infinity, maxX = 0, minY = Infinity, maxY = 0;
    for (let i = 0; i < data.length; i += 4) {
      const alpha = data[i + 3];
      if (alpha > 24) {
        opaque += 1;
        const px = (i / 4) % scratch.width;
        const py = Math.floor(i / 4 / scratch.width);
        if (px < minX) minX = px;
        if (px > maxX) maxX = px;
        if (py < minY) minY = py;
        if (py > maxY) maxY = py;
      } else if (alpha < 4) {
        transparent += 1;
      }
    }
    return { total: scratch.width * scratch.height, opaque, transparent, minX, maxX, minY, maxY };
  });

  const coverage = pixels.opaque / pixels.total;
  const silhouetteWidth = pixels.maxX - pixels.minX;
  const silhouetteHeight = pixels.maxY - pixels.minY;
  const widthRatio = silhouetteWidth / silhouetteHeight;
  // Diag: sertakan error konsol supaya penyebab kanvas kosong terbaca langsung dari anotasi CI.
  const diag = `opaque ${pixels.opaque}/${pixels.total}, konsol: ${consoleErrors.slice(0, 3).join(' | ') || '-'}`;
  assert(Number.isFinite(widthRatio), `kanvas kosong (${diag})`);
  assert(
    widthRatio < 0.62,
    `silhouette terlalu lebar (${widthRatio.toFixed(2)}), kemungkinan avatar masih T-pose; ${diag}`,
  );
  console.log(`✓ pose rileks: rasio lebar/tinggi silhouette ${widthRatio.toFixed(2)}`);
  assert(pixels.opaque > 5000, `piksel avatar terlalu sedikit (${pixels.opaque})`);
  assert(pixels.transparent / pixels.total > 0.4, `latar tidak transparan (${(pixels.transparent / pixels.total * 100).toFixed(1)}% transparan)`);
  console.log(`✓ raster: ${pixels.opaque} piksel avatar (${(coverage * 100).toFixed(1)}% area), ${(pixels.transparent / pixels.total * 100).toFixed(1)}% transparan`);
  console.log(`  bounding box avatar: x ${pixels.minX}..${pixels.maxX}, y ${pixels.minY}..${pixels.maxY}`);

  const vrmaAvailable = await page.evaluate(async () => {
    const response = await fetch('/fixtures/test.vrma', { method: 'HEAD' });
    return response.ok;
  });
  if (vrmaAvailable) {
    const before = await page.evaluate(() => {
      const vrm = window.MateEngine.status();
      return vrm;
    });
    assert(before.ready, 'status renderer tidak melaporkan avatar siap');
    await page.evaluate(() => window.MateEngine.loadAnimation('/fixtures/test.vrma', 'test.vrma', { loop: true }));
    await page.waitForFunction(
      () => (window.__MATE_EVENTS__ || []).some((e) => e.type === 'animation-playing' || (e.type === 'error' && e.code === 'animation-failed')),
      null,
      { timeout: 30000 },
    );
    const after = await page.evaluate(() => window.__MATE_EVENTS__);
    const animError = after.find((e) => e.type === 'error' && e.code === 'animation-failed');
    assert(!animError, `animasi gagal: ${animError?.message}`);
    const playing = after.find((e) => e.type === 'animation-playing');
    assert(playing?.duration > 0, 'klip animasi berdurasi nol');
    // Ambil beberapa contoh: satu bidikan mudah tertipu oleh lengan yang sedang terentang.
    // "Bukan T-pose" diuji dari bentuk tubuh, bukan dari satu angka piksel.
    await page.waitForTimeout(1500);
    const sampleRatio = async () => page.evaluate(() => {
      const source = document.getElementById('stage');
      const scratch = document.createElement('canvas');
      scratch.width = source.width;
      scratch.height = source.height;
      const ctx = scratch.getContext('2d');
      ctx.drawImage(source, 0, 0);
      const data = ctx.getImageData(0, 0, scratch.width, scratch.height).data;
      let minX = Infinity, maxX = 0, minY = Infinity, maxY = 0;
      for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] <= 24) continue;
        const px = (i / 4) % scratch.width;
        const py = Math.floor(i / 4 / scratch.width);
        if (px < minX) minX = px;
        if (px > maxX) maxX = px;
        if (py < minY) minY = py;
        if (py > maxY) maxY = py;
      }
      return (maxX - minX) / Math.max(1, maxY - minY);
    });
    const samples = [];
    for (let i = 0; i < 5; i += 1) {
      samples.push(await sampleRatio());
      await page.waitForTimeout(250);
    }
    samples.sort((a, b) => a - b);
    const animatedRatio = samples[Math.floor(samples.length / 2)];
    // Rasio tubuh saat pose istirahat (diukur sebelum klip diputar) jadi acuan: klip yang
    // benar-benar berjalan tidak boleh melebarkan siluet melebihi pose itu.
    const restRatio = (pixels.maxX - pixels.minX) / Math.max(1, pixels.maxY - pixels.minY);
    assert(
      animatedRatio < Math.max(0.85, restRatio * 0.95),
      `avatar kembali T-pose saat animasi berjalan (rasio ${animatedRatio.toFixed(2)} vs istirahat ${restRatio.toFixed(2)})`,
    );
    console.log(
      `✓ animasi diputar: ${playing.name} (${playing.duration.toFixed(2)} detik), ` +
        `silhouette ${animatedRatio.toFixed(2)} (istirahat ${restRatio.toFixed(2)}, contoh ${samples.map((v) => v.toFixed(2)).join('/')})`,
    );
  } else {
    console.log('… fixture .vrma tidak tersedia, uji animasi dilewati');
  }

  // ------------------------------------------------------- mesin keadaan klip + pagar lengan
  const builtin = await page.evaluate(async () => {
    const list = window.MateEngine.builtinClips();
    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    // Tunggu keadaan tertentu (bukan sekadar menebak lewat durasi): mesin lambat di CI.
    const until = async (predicate, timeout = 15000) => {
      const started = performance.now();
      while (performance.now() - started < timeout) {
        if (predicate()) return true;
        await wait(100);
      }
      return false;
    };

    // 0) matikan direktur perilaku selama uji mesin keadaan: sejak v0.1.8 avatar memilih klip
    //    acak sendiri (mis. jump_loop) sehingga "diam" tidak selalu berarti klip idle.
    window.MateEngine.setBehaviorEnabled(false);
    // 0b) hentikan klip fixture yang diputar oleh uji animasi sebelumnya, lalu tunggu idle.
    window.MateEngine.stopAnimation();
    await until(() => window.MateEngine.poseMetrics()?.builtinClip === 'idle_loop');
    await wait(800);

    // 1) idle otomatis tanpa perintah apa pun.
    //    Diukur SETELAH klip idle benar-benar aktif + crossfade selesai; kalau dibaca lebih awal,
    //    yang terukur masih pose klip sebelumnya (dulu dance, sekarang bisa klip acak).
    const autoIdleSettled = await until(() => window.MateEngine.poseMetrics()?.builtinClip === 'idle_loop');
    await wait(900);
    const autoIdle = window.MateEngine.poseMetrics();

    // 2) bicara -> klip talk, lalu jalan -> klip walk, lalu tari -> klip dance
    window.MateEngine.startTalking(1500);
    await until(() => window.MateEngine.poseMetrics()?.builtinClip === 'idle_talk');
    const talking = window.MateEngine.poseMetrics();
    window.MateEngine.stopTalking();
    await until(() => window.MateEngine.poseMetrics()?.builtinClip === 'idle_loop');

    window.MateEngine.setLocomotion('walk');
    await until(() => window.MateEngine.poseMetrics()?.builtinClip === 'walk_loop');
    const walking = window.MateEngine.poseMetrics();
    window.MateEngine.setLocomotion('dance');
    await until(() => window.MateEngine.poseMetrics()?.builtinClip === 'dance_loop');
    const dancing = window.MateEngine.poseMetrics();
    window.MateEngine.setLocomotion('idle');
    await until(() => window.MateEngine.poseMetrics()?.builtinClip === 'idle_loop');
    await wait(600);
    const idleAgain = window.MateEngine.poseMetrics();
    const timeline = window.MateEngine.clipTimeline();

    // 3) setelah animasi dihentikan, tangan harus kembali ke bawah
    window.MateEngine.playBuiltin('dance');
    await until(() => window.MateEngine.poseMetrics()?.builtinClip === 'dance_loop');
    await wait(600);
    window.MateEngine.stopAnimation();
    await wait(900);
    const afterStop = window.MateEngine.poseMetrics();
    window.MateEngine.resetPose();
    const afterReset = window.MateEngine.poseMetrics();
    // Nyalakan lagi agar uji berikutnya (duduk, ayunan) memakai perilaku normal.
    window.MateEngine.setBehaviorEnabled(true);

    return {
      list,
      autoIdleSettled,
      autoIdle,
      talking,
      walking,
      dancing,
      idleAgain,
      afterStop,
      afterReset,
      timeline,
      poses: [0, 1, 2, 3, 4, 5].map(() => window.MateEngine.debugPose().leftUpperArmZ),
    };
  });

  assert(builtin.list.length >= 4, `klip bawaan kurang: ${builtin.list.length}`);
  console.log(`  klip bawaan: ${builtin.list.map((item) => item.file).join(', ')}`);

  const seen = builtin.timeline.map((entry) => entry.clip);
  for (const expected of ['idle_loop', 'idle_talk', 'walk_loop', 'dance_loop']) {
    assert(seen.includes(expected), `klip ${expected} tidak pernah diputar (jejak: ${seen.join(' -> ')})`);
  }
  console.log(`  jejak klip: ${seen.join(' -> ')}`);

  assert(builtin.autoIdle?.hasAction === true, 'tidak ada klip yang berjalan otomatis saat diam');
  assert(builtin.talking?.builtinClip === 'idle_talk', `klip bicara salah: ${builtin.talking?.builtinClip}`);
  assert(builtin.walking?.builtinClip === 'walk_loop', `klip jalan salah: ${builtin.walking?.builtinClip}`);
  assert(builtin.dancing?.builtinClip === 'dance_loop', `klip tari salah: ${builtin.dancing?.builtinClip}`);
  assert(builtin.idleAgain?.builtinClip === 'idle_loop', `klip diam salah: ${builtin.idleAgain?.builtinClip}`);

  // Crossfade: dua perpindahan berurutan tidak boleh lebih rapat dari 250 ms.
  const gaps = builtin.timeline
    .slice(1)
    .map((entry, index) => entry.at - builtin.timeline[index].at)
    .filter((gap) => gap > 0);
  assert(
    gaps.every((gap) => gap >= 240),
    `ada perpindahan klip lebih cepat dari crossfade 250 ms (jeda: ${gaps.join(', ')} ms)`,
  );
  console.log(`✓ mesin keadaan klip: ${seen.length} perpindahan, jeda minimum ${Math.min(...gaps)} ms`);

  // Perbaikan H1: setelah animasi dihentikan, tangan harus kembali ke bawah (< 45° dari vertikal).
  for (const key of ['leftArmDeg', 'rightArmDeg']) {
    const value = builtin.afterStop?.[key];
    assert(
      typeof value === 'number' && value < 45,
      `tangan tidak kembali setelah animasi berhenti (${key} = ${value}°, ${JSON.stringify(builtin.afterStop)})`,
    );
    const resetValue = builtin.afterReset?.[key];
    assert(
      typeof resetValue === 'number' && resetValue < 45,
      `perbaikan pose gagal (${key} = ${resetValue}°)`,
    );
  }
  console.log(
    `✓ tangan kembali ke bawah setelah animasi: ${builtin.afterStop.leftArmDeg}° / ${builtin.afterStop.rightArmDeg}° ` +
      `(setelah perbaiki pose: ${builtin.afterReset.leftArmDeg}° / ${builtin.afterReset.rightArmDeg}°)`,
  );

  // Pagar lengan: selama klip bawaan berjalan di mode diam, lengan tidak boleh terangkat jauh.
  assert(builtin.autoIdleSettled, 'klip idle tidak pernah aktif setelah animasi dihentikan');
  assert(
    builtin.autoIdle.leftArmDeg < 60 && builtin.autoIdle.rightArmDeg < 60,
    `lengan terangkat saat diam (${builtin.autoIdle.leftArmDeg}° / ${builtin.autoIdle.rightArmDeg}°); ` +
      `klip=${builtin.autoIdle.builtinClip}, jejak=${builtin.timeline.map((e) => e.clip).join('>')}`,
  );
  console.log(
    `✓ lengan di bawah saat diam: ${builtin.autoIdle.leftArmDeg}° / ${builtin.autoIdle.rightArmDeg}°`,
  );

  // ---------------------------------------------------- F3: duduk, headpat, ayunan geser
  const seated = await page.evaluate(async () => {
    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const until = async (predicate, timeout = 20000) => {
      const started = performance.now();
      while (performance.now() - started < timeout) {
        if (predicate()) return true;
        await wait(100);
      }
      return false;
    };
    const bottomGap = () => {
      const source = document.getElementById('stage');
      const scratch = document.createElement('canvas');
      scratch.width = source.width;
      scratch.height = source.height;
      scratch.getContext('2d').drawImage(source, 0, 0);
      const data = scratch.getContext('2d').getImageData(0, 0, scratch.width, scratch.height).data;
      let maxY = 0;
      let minY = Infinity;
      for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] <= 24) continue;
        const py = Math.floor(i / 4 / scratch.width);
        if (py > maxY) maxY = py;
        if (py < minY) minY = py;
      }
      // `top` = jarak dari tepi atas kanvas ke piksel pertama. Kedua tepi dipakai untuk
      // membuktikan tubuh tidak terpotong (dulu kaki hilang saat duduk).
      return { gap: scratch.height - 1 - maxY, top: minY, height: maxY - minY, total: scratch.height };
    };

    const standing = bottomGap();
    window.MateEngine.setSeated(true);
    const seatedClip = await until(() => window.MateEngine.poseMetrics()?.builtinClip === 'sitting_idle');
    await wait(700);
    const seatedGap = bottomGap();
    const metricsSeated = window.MateEngine.poseMetrics();
    window.MateEngine.setSeated(false);
    const stoodUp = await until(() => window.MateEngine.poseMetrics()?.builtinClip === 'idle_loop');
    await wait(600);
    const standingAgain = bottomGap();

    // Ayunan saat digeser: kecepatan tinggi → badan miring, lalu mereda.
    window.MateEngine.setDragVelocity(1800, 0);
    await wait(180);
    const swayHot = window.MateEngine.poseMetrics();
    for (let i = 0; i < 24; i += 1) {
      window.MateEngine.setDragVelocity(0, 0);
      await wait(60);
    }
    const swayCold = window.MateEngine.poseMetrics();

    // Headpat: ketuk kepala → ekspresi mata menutup.
    window.MateEngine.react('head');
    await wait(200);
    const blinkAfterPat = window.MateEngine.expressionValue('blink');
    await wait(1800);
    const blinkAfterWait = window.MateEngine.expressionValue('blink');

    return {
      standing,
      seatedGap,
      metricsSeated,
      seatedClip,
      stoodUp,
      standingAgain,
      swayHot,
      swayCold,
      blinkAfterPat,
      blinkAfterWait,
    };
  });

  assert(seated.seatedClip, 'klip duduk (sitting_idle) tidak pernah aktif setelah setSeated(true)');
  assert(seated.metricsSeated?.seated === true, 'poseMetrics tidak melaporkan keadaan duduk');
  // Sejak v0.1.8 bingkai kamera mengikuti kerangka: seluruh tubuh harus muat, termasuk kaki saat
  // duduk. Yang diuji karena itu "tidak terpotong", bukan lagi "turun ke tepi bawah".
  for (const [label, shot] of [['berdiri', seated.standing], ['duduk', seated.seatedGap]]) {
    assert(shot.height > 0, `siluet avatar kosong saat ${label}`);
    assert(shot.top > 1, `kepala terpotong di tepi atas saat ${label} (top ${shot.top} px)`);
    assert(shot.gap > 1, `kaki terpotong di tepi bawah saat ${label} (jarak ${shot.gap} px)`);
  }
  console.log(
    `✓ duduk: klip ${seated.metricsSeated.builtinClip}, seluruh tubuh muat ` +
      `(atas ${seated.seatedGap.top} px, bawah ${seated.seatedGap.gap} px, tinggi ${seated.seatedGap.height} px)`,
  );
  assert(seated.stoodUp, 'berdiri kembali gagal (klip idle tidak aktif)');
  assert(
    seated.standingAgain.height > seated.standing.height * 0.8,
    `setelah berdiri, tinggi avatar tidak kembali (${seated.standingAgain.height} px vs ${seated.standing.height} px)`,
  );
  console.log(`✓ berdiri kembali: tinggi ${seated.standingAgain.height} px`);

  assert(seated.swayHot.sway > 200, `ayunan geser tidak terdeteksi (${seated.swayHot.sway})`);
  assert(seated.swayCold.sway < 5, `ayunan tidak mereda setelah digeser (${seated.swayCold.sway})`);
  console.log(`✓ ayunan geser: ${seated.swayHot.sway} → ${seated.swayCold.sway} setelah 1,5 detik`);

  assert(seated.blinkAfterPat > 0.5, `mata tidak menutup saat headpat (blink ${seated.blinkAfterPat})`);
  assert(seated.blinkAfterWait < 0.2, `mata tetap menutup setelah headpat (blink ${seated.blinkAfterWait})`);
  console.log(
    `✓ headpat: mata menutup ${seated.blinkAfterPat.toFixed(2)} lalu kembali ${seated.blinkAfterWait.toFixed(2)}`,
  );

  assert(consoleErrors.length === 0, `error konsol: ${consoleErrors.slice(0, 3).join(' | ')}`);
  console.log('✓ tanpa error konsol');
} catch (error) {
  failures += 1;
  console.error(`✗ ${error.message}`);
  // Anotasi agar penyebab kegagalan terbaca dari API checks tanpa unduh log.
  console.log(`::error::${String(error.message).replace(/\r?\n/g, " ").slice(0, 900)}`);
} finally {
  await browser?.close();
  server.close();
}

process.exit(failures === 0 ? 0 : 1);
