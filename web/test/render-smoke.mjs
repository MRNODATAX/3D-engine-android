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

  await page.waitForTimeout(1200);
  // Regresi: pose rileks tidak boleh terakumulasi tiap frame.
  // Tunggu blend selesai (1 detik) agar pembacaan tidak menangkap transisi.
  await page.waitForFunction(() => window.MateEngine.debugPose().blend >= 1, null, { timeout: 20000 });
  const poseEarly = await page.evaluate(() => window.MateEngine.debugPose());
  await page.waitForTimeout(3000);
  const poseLate = await page.evaluate(() => window.MateEngine.debugPose());
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
  assert(
    widthRatio < 0.62,
    `silhouette terlalu lebar (${widthRatio.toFixed(2)}), kemungkinan avatar masih T-pose`,
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
    await page.waitForTimeout(1500);
    const animatedWidth = await page.evaluate(() => {
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
      return { width: maxX - minX, height: maxY - minY };
    });
    const animatedRatio = animatedWidth.width / Math.max(1, animatedWidth.height);
    assert(
      animatedRatio < 0.62,
      `avatar kembali T-pose saat animasi berjalan (rasio ${animatedRatio.toFixed(2)})`,
    );
    console.log(`✓ animasi diputar: ${playing.name} (${playing.duration.toFixed(2)} detik), silhouette tetap ${animatedRatio.toFixed(2)}`);
  } else {
    console.log('… fixture .vrma tidak tersedia, uji animasi dilewati');
  }

  // ------------------------------------------------------------------ klip bawaan + pagar lengan
  const builtin = await page.evaluate(async () => {
    const list = window.MateEngine.builtinClips();
    const played = await window.MateEngine.playBuiltin('dance');
    await new Promise((resolve) => setTimeout(resolve, 1200));
    const during = window.MateEngine.poseMetrics();
    window.MateEngine.stopAnimation();
    await new Promise((resolve) => setTimeout(resolve, 900));
    const afterStop = window.MateEngine.poseMetrics();
    window.MateEngine.resetPose();
    const afterReset = window.MateEngine.poseMetrics();
    return { list, played, during, afterStop, afterReset };
  });
  assert(builtin.list.length >= 4, `klip bawaan kurang: ${builtin.list.length}`);
  assert(builtin.played === true, 'klip bawaan gagal diputar');
  console.log(`  klip bawaan: ${builtin.list.map((item) => item.file).join(', ')}`);
  assert(
    builtin.during?.hasAction === true,
    `tidak ada action aktif setelah memutar klip bawaan: ${JSON.stringify(builtin.during)}`,
  );
  // Perbaikan H1: setelah animasi dihentikan, tangan harus kembali ke bawah (< 45° dari vertikal).
  for (const key of ['leftArmDeg', 'rightArmDeg']) {
    const value = builtin.afterStop?.[key];
    assert(
      typeof value === 'number' && value < 45,
      `tangan tidak kembali setelah animasi berhenti (${key} = ${value}°, ${JSON.stringify(builtin.afterStop)})`,
    );
  }
  console.log(
    `✓ pose kembali normal setelah animasi berhenti: kiri ${builtin.afterStop.leftArmDeg}°, kanan ${builtin.afterStop.rightArmDeg}°`,
  );

  // Idle bawaan harus membuat sendi bergerak: bandingkan metrik dua waktu berbeda.
  const idleMotion = await page.evaluate(async () => {
    window.MateEngine.playBuiltin('idle');
    const samples = [];
    for (let i = 0; i < 6; i += 1) {
      await new Promise((resolve) => setTimeout(resolve, 350));
      samples.push(window.MateEngine.debugPose());
    }
    return samples;
  });
  const deltas = idleMotion
    .slice(1)
    .map((sample, index) => Math.abs((sample.leftUpperArmZ ?? 0) - (idleMotion[index].leftUpperArmZ ?? 0)));
  const moved = Math.max(...deltas);
  assert(moved > 0.001, `klip idle tidak mengubah pose lengan (delta ${moved})`);
  console.log(`✓ klip idle menggerakkan lengan (delta maksimum ${moved.toFixed(4)} rad)`);

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
