/**
 * Renderer avatar VRM untuk overlay Mate Engine Android.
 *
 * Kontrak dengan lapisan Android:
 *   Android -> JS : window.MateEngine.*  (lewat evaluateJavascript)
 *   JS -> Android : window.MateBridge.postMessage(json)
 *
 * Renderer tidak pernah mengambil alih sentuhan atau menggambar panel: kanvas
 * selalu transparan di luar model, sehingga aplikasi di belakang tetap terlihat.
 */
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm';
import { VRMAnimationLoaderPlugin, createVRMAnimationClip } from '@pixiv/three-vrm-animation';
import { applyRelaxedPose, captureRestPose } from './pose.js';
import { collectStats, createGovernor, downscaleTextures } from './perf.js';
import { createMotion } from './motion.js';

const CONFIG = {
  maxPixelRatio: 2,
  cameraFov: 26,
  targetFps: 30,
  heightPadding: 1.06,
};

const state = {
  renderer: null,
  scene: null,
  camera: null,
  clock: null,
  vrm: null,
  mixer: null,
  currentAction: null,
  avatarUrl: null,
  avatarInfo: null,
  ready: false,
  paused: false,
  scale: 100,
  targetFps: 30,
  quality: 'medium',
  blinkTimer: 0,
  blinkPhase: 0,
  poseBlend: 0,
  restPose: {},
  blinkDuration: 0.16,
  idleTime: 0,
  frameBudget: 1 / 30,
  lastFrameTime: 0,
  framesThisSecond: 0,
  fpsReportAt: 0,
  governor: createGovernor({ targetFps: CONFIG.targetFps }),
  renderScale: 1,
  workMsAvg: 0,
  statsReportAt: 0,
  textureInfo: null,
  talking: 0,
  talkSeed: 0,
  motion: createMotion(),
  interacted: false,
  speech: null,
  animationName: null,
  loop: true,
  speed: 1,
  lostContext: false,
};

function post(type, payload = {}) {
  const message = JSON.stringify({ type, ...payload });
  try {
    if (window.MateBridge && typeof window.MateBridge.postMessage === 'function') {
      window.MateBridge.postMessage(message);
    }
  } catch (error) {
    /* bridge belum terpasang: abaikan, renderer tetap jalan */
  }
  if (window.__MATE_TEST__) {
    (window.__MATE_EVENTS__ ||= []).push({ type, ...payload });
  }
}

function fail(code, message, fatal = false) {
  post('error', { code, message, fatal });
  const overlay = document.getElementById('error');
  if (overlay) {
    overlay.hidden = false;
    overlay.textContent = message;
  }
}

function canvasSize() {
  return {
    width: Math.max(1, window.innerWidth),
    height: Math.max(1, window.innerHeight),
  };
}

function initThree() {
  const canvas = document.getElementById('stage');
  const { width, height } = canvasSize();

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: state.quality !== 'low',
    powerPreference: 'high-performance',
    premultipliedAlpha: true,
    preserveDrawingBuffer: window.__MATE_TEST__ === true,
  });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, CONFIG.maxPixelRatio));
  renderer.setSize(width, height, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NoToneMapping;

  const scene = new THREE.Scene();
  scene.background = null;

  const camera = new THREE.PerspectiveCamera(CONFIG.cameraFov, width / height, 0.05, 60);
  camera.position.set(0, 1.25, 3.2);
  camera.lookAt(0, 1.1, 0);

  // Cahaya netral: MToon memakai warna material, jadi intensitas dijaga wajar.
  scene.add(new THREE.AmbientLight(0xffffff, Math.PI * 0.62));
  const key = new THREE.DirectionalLight(0xffffff, Math.PI * 0.42);
  key.position.set(0.6, 2.2, 2.4);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xdfe9ee, Math.PI * 0.16);
  rim.position.set(-1.4, 1.4, -1.8);
  scene.add(rim);

  canvas.addEventListener('webglcontextlost', (event) => {
    event.preventDefault();
    state.lostContext = true;
    fail('gl-lost', 'Konteks WebGL hilang. Avatar akan dipulihkan saat layar aktif kembali.', false);
  });
  canvas.addEventListener('webglcontextrestored', () => {
    state.lostContext = false;
    post('context-restored');
    if (state.avatarUrl) loadAvatar(state.avatarUrl);
  });

  state.renderer = renderer;
  state.scene = scene;
  state.camera = camera;
  state.clock = new THREE.Clock();
}

function loader() {
  const gltfLoader = new GLTFLoader();
  gltfLoader.register((parser) => new VRMLoaderPlugin(parser));
  gltfLoader.register((parser) => new VRMAnimationLoaderPlugin(parser));
  return gltfLoader;
}

function frameModel(vrm) {
  const box = new THREE.Box3().setFromObject(vrm.scene);
  if (box.isEmpty()) return;
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);

  const height = Math.max(size.y, 0.1);
  // Bingkai memakai tinggi total kotak model (termasuk rambut) dan jarak yang memberi margin
  // atas-bawah, supaya kepala tidak terpotong saat jendela overlay tinggi (skala 100%).
  state.frameHeight = height;
  state.camera.position.set(center.x, center.y, center.z + height * 1.6);
  state.camera.lookAt(center.x, center.y, center.z);
  state.camera.updateProjectionMatrix();
  // Skala model TIDAK lagi diterapkan di sini: ukuran avatar ditentukan oleh ukuran window
  // overlay di sisi Android, dan kamera selalu membingkai model agar mengisi window itu.
  state.vrm.scene.scale.setScalar(1);
}

function describeVrm(vrm) {
  const meta = vrm.meta || {};
  const expressionNames = Object.keys(vrm.expressionManager?.expressionMap || {});
  const humanBones = Object.keys(vrm.humanoid?.humanBones || {});
  let springJoints = 0;
  vrm.springBoneManager?.joints?.forEach(() => { springJoints += 1; });
  return {
    name: meta.name || meta.title || 'Tanpa nama',
    version: meta.metaVersion === '0' ? 'VRM 0.x' : 'VRM 1.0',
    authors: meta.authors || (meta.author ? [meta.author] : []),
    licenseUrl: meta.licenseUrl || meta.otherLicenseUrl || null,
    redistribution: meta.allowRedistribution ?? meta.redistributionAllowed ?? null,
    commercial: meta.commercialUsage ?? meta.commercialUssageName ?? null,
    expressions: expressionNames.slice(0, 24),
    humanoidBones: humanBones.length,
    springJoints,
  };
}

async function loadAvatar(url) {
  if (!state.vrm && !url) return;
  state.ready = false;
  state.avatarUrl = url;
  post('avatar-loading', { url });

  if (state.vrm) {
    state.scene.remove(state.vrm.scene);
    VRMUtils.deepDispose(state.vrm.scene);
    state.vrm = null;
    state.mixer = null;
    state.currentAction = null;
  }

  try {
    const gltf = await loader().loadAsync(url);
    const vrm = gltf.userData.vrm;
    if (!vrm) {
      fail('not-vrm', 'Berkas terbaca, tetapi tidak berisi data VRM.', true);
      return;
    }

    // VRM 0.x menghadap -Z; diputar agar menghadap kamera seperti di desktop.
    VRMUtils.rotateVRM0(vrm);
    vrm.scene.traverse((object) => {
      object.frustumCulled = false;
      if (object.isMesh && object.material) {
        object.material.side = THREE.FrontSide;
      }
    });

    // Optimasi tekstur: batas resolusi mengikuti kualitas render yang dipilih.
    const textureCap = state.quality === 'low' ? 512 : state.quality === 'medium' ? 1024 : 2048;
    state.textureInfo = downscaleTextures(vrm.scene, textureCap);
    post('textures', {
      resized: state.textureInfo.resized,
      kept: state.textureInfo.skipped,
      maxSize: state.textureInfo.maxSize,
    });

    state.scene.add(vrm.scene);
    state.vrm = vrm;
    state.avatarInfo = describeVrm(vrm);
    state.governor.reset();
    state.renderScale = 1;
    applyPixelRatio();
    state.mixer = new THREE.AnimationMixer(vrm.scene);
    frameModel(vrm);
    state.ready = true;
    state.idleTime = 0;
    state.restPose = captureRestPose(vrm);
    state.poseBlend = 1;
    applyRelaxedPose(vrm, 1, state.restPose);
    post('avatar-ready', { info: state.avatarInfo });
  } catch (error) {
    fail('load-failed', `Gagal memuat avatar: ${error?.message || error}`, true);
  }
}

async function loadAnimation(url, name, options = {}) {
  state.interacted = true;
  if (!state.vrm || !state.mixer) {
    fail('no-avatar', 'Pilih avatar sebelum memutar animasi.', false);
    return;
  }
  try {
    const gltf = await loader().loadAsync(url);
    const vrmAnimation = gltf.userData.vrmAnimations?.[0];
    if (!vrmAnimation) {
      fail('not-vrma', 'Berkas bukan animasi VRM (.vrma).', false);
      return;
    }
    const clip = createVRMAnimationClip(vrmAnimation, state.vrm);
    const action = state.mixer.clipAction(clip);
    action.setLoop(options.loop === false ? THREE.LoopOnce : THREE.LoopRepeat, Infinity);
    action.clampWhenFinished = true;
    action.timeScale = state.speed;

    if (state.currentAction && state.currentAction !== action) {
      state.currentAction.fadeOut(0.25);
    }
    action.reset().fadeIn(0.25).play();
    state.currentAction = action;
    state.animationName = name || null;
    post('animation-playing', { name: name || null, duration: clip.duration });
  } catch (error) {
    fail('animation-failed', `Gagal memuat animasi: ${error?.message || error}`, false);
  }
}

function stopAnimation() {
  if (state.currentAction) {
    state.currentAction.fadeOut(0.2);
    state.currentAction = null;
  }
  if (state.mixer) state.mixer.stopAllAction();
  state.animationName = null;
  post('animation-stopped');
}

function updateBlink(delta) {
  const expression = state.vrm?.expressionManager;
  if (!expression) return;
  state.blinkTimer -= delta;

  if (state.blinkPhase === 0 && state.blinkTimer <= 0) {
    state.blinkPhase = 1;
    state.blinkTimer = state.blinkDuration;
  } else if (state.blinkPhase === 1) {
    const value = 1 - Math.abs(state.blinkTimer / state.blinkDuration - 0.5) * 2;
    expression.setValue('blink', Math.max(0, Math.min(1, value)));
    if (state.blinkTimer <= 0) {
      state.blinkPhase = 2;
      state.blinkTimer = 0.05;
    }
  } else if (state.blinkPhase === 2 && state.blinkTimer <= 0) {
    expression.setValue('blink', 0);
    state.blinkPhase = 0;
    state.blinkTimer = 2.4 + Math.random() * 4.6;
  }
}

/**
 * Animasi bicara sederhana: mulut (`aa`) bergerak dan ekspresi senang muncul sebentar.
 * Dipakai saat balasan chat diterima; bukan pengganti animasi ucapan sungguhan.
 */
function updateTalking(delta) {
  const expression = state.vrm?.expressionManager;
  if (!expression) return;

  // Lip-sync dari amplop audio asli bila tersedia (Gemini TTS), bukan pola sinus.
  if (state.speech) {
    const elapsed = performance.now() - state.speech.startedAt;
    if (elapsed >= state.speech.durationMs || state.speech.levels.length === 0) {
      state.speech = null;
      state.talking = 0;
      expression.setValue('aa', 0);
      post('talking-stopped', {});
      return;
    }
    const ratio = elapsed / state.speech.durationMs;
    const index = Math.min(
      state.speech.levels.length - 1,
      Math.max(0, Math.floor(ratio * state.speech.levels.length)),
    );
    expression.setValue('aa', state.speech.levels[index] ?? 0);
    return;
  }

  if (state.talking > 0) {
    state.talking -= delta * 1000;
    state.talkSeed += delta * 12;
    const openness = 0.25 + Math.abs(Math.sin(state.talkSeed)) * 0.45;
    expression.setValue('aa', Math.min(1, openness));
    if (state.talking <= 0) {
      expression.setValue('aa', 0);
    }
  }
}

function updateIdle(delta) {
  if (!state.vrm) return;

  // Pose rileks selalu menjadi lapisan dasar, termasuk saat animasi berjalan: klip .vrma
  // sering hanya menggerakkan sebagian bone, sehingga lengan bisa tetap T-pose.
  // Animasi menimpa bone yang benar-benar dianimasikannya pada mixer.update berikutnya.
  // Diterapkan penuh (tidak bertahap) karena WebView overlay di-throttle saat tidak terlihat,
  // sehingga transisi berbasis frame bisa berhenti di tengah pose.
  applyRelaxedPose(state.vrm, 1, state.restPose);

  // Gerak tubuh (napas, goyangan, pandangan, lokomosi) ditangani motion.js,
  // bukan lagi dua sinus kecil di sini.
  state.idleTime += delta;
}

function animate(now) {
  requestAnimationFrame(animate);
  if (!state.ready || state.paused || state.lostContext) return;

  const interval = 1000 / Math.max(5, state.targetFps);
  if (now - state.lastFrameTime < interval - 1) return;
  const delta = Math.min(0.05, Math.max(0.001, (now - state.lastFrameTime) / 1000));
  state.lastFrameTime = now;

  const workStart = performance.now();
  updateBlink(delta);
  updateIdle(delta);
  updateTalking(delta);

  // Urutan penting: buang offset prosedural frame lalu, jalankan klip animasi,
  // baru tambahkan gerak prosedural di atasnya, lalu perbarui spring bone.
  state.motion.resetToBase();
  if (state.mixer) state.mixer.update(delta);
  if (state.vrm) {
    state.motion.update(state.vrm, delta, { talking: state.talking > 0, interacted: state.interacted });
    state.interacted = false;
    state.vrm.update(delta);
  }

  state.renderer.render(state.scene, state.camera);
  const workMs = performance.now() - workStart;
  state.workMsAvg = state.workMsAvg === 0 ? workMs : state.workMsAvg * 0.9 + workMs * 0.1;

  // Governor adaptif: turunkan resolusi bila kerja frame melebihi anggaran.
  const decision = state.governor.sample(workMs);
  if (decision.changed !== 0) {
    state.renderScale = decision.scale;
    applyPixelRatio();
    post('quality-change', {
      scale: state.renderScale,
      level: state.governor.level,
      direction: decision.changed < 0 ? 'turun' : 'naik',
      avgWorkMs: Math.round(decision.avgWorkMs || workMs),
    });
  }

  state.framesThisSecond += 1;
  if (now - state.fpsReportAt >= 1000) {
    post('fps', { value: state.framesThisSecond, workMs: Math.round(state.workMsAvg) });
    state.framesThisSecond = 0;
    state.fpsReportAt = now;
  }
  // Jejak gerak: dipakai uji emulator untuk membuktikan sendi benar-benar bergerak.
  if (now - (state.motionLogAt || 0) >= 5000) {
    state.motionLogAt = now;
    const debug = state.motion.debug();
    console.info('motion ' + JSON.stringify(debug));
    post('motion-state', debug);
  }

  if (now - state.statsReportAt >= 2000) {
    state.statsReportAt = now;
    post('stats', {
      ...collectStats(state.renderer, state.vrm),
      fpsTarget: state.targetFps,
      renderScale: Number(state.renderScale.toFixed(2)),
      qualityLevel: state.governor.level,
      workMs: Math.round(state.workMsAvg),
    });
  }
}

function qualityCap() {
  if (state.quality === 'low') return 1;
  if (state.quality === 'medium') return 1.5;
  return CONFIG.maxPixelRatio;
}

function applyPixelRatio() {
  if (!state.renderer) return;
  const base = Math.min(window.devicePixelRatio || 1, qualityCap());
  state.renderer.setPixelRatio(Math.max(0.5, base * state.renderScale));
}

function resize() {
  if (!state.renderer) return;
  const { width, height } = canvasSize();
  applyPixelRatio();
  state.renderer.setSize(width, height, false);
  state.camera.aspect = width / height;
  state.camera.updateProjectionMatrix();
}

function setQuality(quality) {
  state.quality = ['low', 'medium', 'high'].includes(quality) ? quality : 'medium';
  resize();
}

/** API yang dipanggil lapisan Android. Semua argumen primitif/string. */
window.MateEngine = {
  loadAvatar,
  loadAnimation,
  stopAnimation,
  play: () => { state.paused = false; },
  pause: () => { state.paused = true; },
  setPaused: (value) => { state.paused = !!value; },
  setTargetFps: (fps) => {
    state.targetFps = Math.max(5, Math.min(60, Number(fps) || 30));
    state.governor.setTargetFps(state.targetFps);
  },
  setQuality,
  setAnimationSpeed: (speed) => {
    state.speed = Math.max(0.5, Math.min(2, Number(speed) || 1));
    if (state.currentAction) state.currentAction.timeScale = state.speed;
  },
  debugPose: () => {
    const bone = state.vrm?.humanoid?.getNormalizedBoneNode('leftUpperArm');
    const rest = state.restPose.leftUpperArm || null;
    return {
      leftUpperArmZ: bone ? bone.rotation.z : null,
      restZ: rest ? rest.z : null,
      offsetZ: bone && rest ? bone.rotation.z - rest.z : null,
      hasRestPose: Object.keys(state.restPose).length > 0,
      blend: state.poseBlend,
      animation: state.animationName,
    };
  },
  setLocomotion: (mode) => {
    const applied = state.motion.setLocomotion(mode);
    post('locomotion', { mode: applied });
    return applied;
  },
  nextDance: () => {
    const variant = state.motion.nextDance();
    post('locomotion', { mode: 'dance', variant });
    return variant;
  },
  setReducedMotion: (value) => {
    state.motion.setReducedMotion(value);
  },
  react: (type) => {
    state.interacted = true;
    state.motion.react(type);
    const expression = state.vrm?.expressionManager;
    if (expression) {
      // Ekspresi dipilih dari yang benar-benar ada di model ini.
      const pick = (names) => names.find((name) => expression.expressionMap?.[name]);
      if (type === 'head') {
        const happy = pick(['happy', 'joy', 'fun']);
        const surprised = pick(['surprised', 'surprise']);
        if (surprised) {
          expression.setValue(surprised, 0.8);
          setTimeout(() => expression.setValue(surprised, 0), 900);
        } else if (happy) {
          expression.setValue(happy, 0.7);
          setTimeout(() => expression.setValue(happy, 0), 900);
        }
      } else {
        const happy = pick(['happy', 'joy', 'fun']);
        if (happy) {
          expression.setValue(happy, 0.55);
          setTimeout(() => expression.setValue(happy, 0), 1200);
        }
      }
    }
    post('reaction', { type });
  },
  motionDebug: () => state.motion.debug(),
  /**
   * levels: array amplitudo 0..1 (satu nilai per ~50 ms), durationMs: durasi audio.
   * Dipakai OverlayService setelah Gemini TTS menghasilkan WAV.
   */
  setSpeechEnvelope: (levels, durationMs) => {
    const clean = Array.isArray(levels)
      ? levels.map((v) => Math.max(0, Math.min(1, Number(v) || 0)))
      : [];
    state.speech = {
      levels: clean,
      durationMs: Math.max(200, Number(durationMs) || 2000),
      startedAt: performance.now(),
    };
    state.talking = state.speech.durationMs;
    post('talking', { duration: state.speech.durationMs, source: 'envelope', samples: clean.length });
    return clean.length;
  },
  startTalking: (durationMs) => {
    state.talking = Math.max(400, Math.min(20000, Number(durationMs) || 2500));
    state.talkSeed = 0;
    const expression = state.vrm?.expressionManager;
    if (expression) {
      expression.setValue('happy', 0.6);
      setTimeout(() => expression.setValue('happy', 0), 1200);
    }
    post('talking', { duration: state.talking });
  },
  stopTalking: () => {
    state.talking = 0;
    state.vrm?.expressionManager?.setValue('aa', 0);
  },
  trimMemory: () => {
    const released = { animations: 0, lists: true };
    try {
      state.mixer?.stopAllAction();
      if (state.mixer) {
        state.mixer.uncacheRoot(state.vrm?.scene);
        released.animations = 1;
      }
      state.renderer?.renderLists?.dispose?.();
      THREE.Cache.clear();
    } catch (error) {
      /* pembersihan bersifat best-effort */
    }
    post('memory-trimmed', released);
  },
  stats: () => ({ ...collectStats(state.renderer, state.vrm), renderScale: state.renderScale, workMs: state.workMsAvg }),
  status: () => ({
    ready: state.ready,
    avatar: state.avatarInfo,
    animation: state.animationName,
    fps: state.targetFps,
    quality: state.quality,
  }),
};

async function boot() {
  try {
    initThree();
    window.addEventListener('resize', resize);
    window.addEventListener('orientationchange', () => setTimeout(resize, 120));
    document.addEventListener('visibilitychange', () => post('visibility', { hidden: document.hidden }));
    requestAnimationFrame(animate);
    post('renderer-ready', { webgl2: !!state.renderer?.capabilities?.isWebGL2 });
  } catch (error) {
    fail('init-failed', `Renderer gagal dimulai: ${error?.message || error}`, true);
  }
}

boot();
