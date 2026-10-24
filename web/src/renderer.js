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
import { applyRelaxedPose } from './pose.js';

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
  blinkDuration: 0.16,
  idleTime: 0,
  frameBudget: 1 / 30,
  lastFrameTime: 0,
  framesThisSecond: 0,
  fpsReportAt: 0,
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
  // Kamera diarahkan ke pusat tubuh agar avatar 0.x dan 1.0 sama-sama masuk frame.
  state.camera.position.set(center.x, center.y + height * 0.02, center.z + height * 1.35);
  state.camera.lookAt(center.x, center.y, center.z);
  state.camera.updateProjectionMatrix();
  applyScale();
}

function applyScale() {
  if (!state.vrm) return;
  // Skala diterapkan ke scene VRM (bukan kamera) agar overlay tetap 1:1 dengan piksel.
  const factor = Math.max(0.25, Math.min(1.5, state.scale / 100));
  state.vrm.scene.scale.setScalar(factor);
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

    state.scene.add(vrm.scene);
    state.vrm = vrm;
    state.avatarInfo = describeVrm(vrm);
    state.mixer = new THREE.AnimationMixer(vrm.scene);
    frameModel(vrm);
    state.ready = true;
    state.idleTime = 0;
    state.poseBlend = 0;
    post('avatar-ready', { info: state.avatarInfo });
  } catch (error) {
    fail('load-failed', `Gagal memuat avatar: ${error?.message || error}`, true);
  }
}

async function loadAnimation(url, name, options = {}) {
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

function updateIdle(delta) {
  if (!state.vrm) return;

  // Pose rileks selalu menjadi lapisan dasar, termasuk saat animasi berjalan: klip .vrma
  // sering hanya menggerakkan sebagian bone, sehingga lengan bisa tetap T-pose.
  // Animasi menimpa bone yang benar-benar dianimasikannya pada mixer.update berikutnya.
  if (state.poseBlend < 1) {
    state.poseBlend = Math.min(1, state.poseBlend + delta);
  }
  applyRelaxedPose(state.vrm, state.poseBlend);

  // Napas prosedural hanya saat tidak ada animasi yang diputar.
  if (state.animationName) return;
  state.idleTime += delta;
  const chest = state.vrm.humanoid?.getNormalizedBoneNode('chest');
  const spine = state.vrm.humanoid?.getNormalizedBoneNode('spine');
  const sway = Math.sin(state.idleTime * 1.15 * state.speed) * 0.012;
  if (chest) chest.rotation.x = sway * 0.6;
  if (spine) spine.rotation.z = Math.sin(state.idleTime * 0.6) * 0.008;
}

function animate(now) {
  requestAnimationFrame(animate);
  if (!state.ready || state.paused || state.lostContext) return;

  const interval = 1000 / Math.max(5, state.targetFps);
  if (now - state.lastFrameTime < interval - 1) return;
  const delta = Math.min(0.05, Math.max(0.001, (now - state.lastFrameTime) / 1000));
  state.lastFrameTime = now;

  updateBlink(delta);
  updateIdle(delta);
  if (state.mixer) state.mixer.update(delta);
  if (state.vrm) state.vrm.update(delta);

  state.renderer.render(state.scene, state.camera);
  state.framesThisSecond += 1;
  if (now - state.fpsReportAt >= 1000) {
    post('fps', { value: state.framesThisSecond });
    state.framesThisSecond = 0;
    state.fpsReportAt = now;
  }
}

function resize() {
  if (!state.renderer) return;
  const { width, height } = canvasSize();
  state.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, state.quality === 'low' ? 1 : CONFIG.maxPixelRatio));
  state.renderer.setSize(width, height, false);
  state.camera.aspect = width / height;
  state.camera.updateProjectionMatrix();
}

function setQuality(quality) {
  state.quality = ['low', 'medium', 'high'].includes(quality) ? quality : 'medium';
  if (!state.renderer) return;
  state.renderer.setPixelRatio(
    Math.min(window.devicePixelRatio || 1, state.quality === 'low' ? 1 : state.quality === 'medium' ? 1.5 : CONFIG.maxPixelRatio),
  );
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
  setScale: (percent) => {
    state.scale = Number(percent) || 100;
    applyScale();
  },
  setTargetFps: (fps) => {
    state.targetFps = Math.max(5, Math.min(60, Number(fps) || 30));
  },
  setQuality,
  setAnimationSpeed: (speed) => {
    state.speed = Math.max(0.5, Math.min(2, Number(speed) || 1));
    if (state.currentAction) state.currentAction.timeScale = state.speed;
  },
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
