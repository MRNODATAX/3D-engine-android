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
import { createBehaviorDirector } from './behavior.js';
import { createTouchTracker, zoneForPoint, zoneForScreen } from './touch.js';
import { createReactions, styleForTouch } from './reactions.js';

const CONFIG = {
  maxPixelRatio: 2,
  cameraFov: 26,
  targetFps: 30,
  heightPadding: 1.06,
};

/**
 * Mode pratinjau untuk kartu Beranda di aplikasi Android: `index.html?mode=preview`.
 * Lebih hemat daripada overlay (15 fps, kualitas rendah, direktur perilaku mati) karena kartu
 * kecil dan tidak perlu reaksi; lihat docs/rencana-v0.1.9-ui-modern.md §7a.
 */
const PREVIEW_MODE = new URLSearchParams(window.location.search).get('mode') === 'preview';

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
  behavior: createBehaviorDirector(),
  behaviorEnabled: true,
  interacted: false,
  interactedEver: false,
  builtinClip: null,
  clipName: null,
  clipOverride: null,
  clipAppliedAt: 0,
  clipLog: [],
  clipCache: new Map(),
  seated: false,
  sittingEnabled: true,
  pendingChain: null,
  headpatUntil: 0,
  touch: createTouchTracker(),
  reactions: createReactions(),
  reactionFrame: null,
  lastReactionAt: 0,
  reactionExprKeys: new Set(),
  reactionEyesActive: false,
  reactionStyle: null,
  sceneYaw: 0,
  lastNudgeAt: 0,
  speech: null,
  animationName: null,
  loop: true,
  speed: 1,
  lostContext: false,
  preview: PREVIEW_MODE,
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

/**
 * Kotak pembatas dari posisi tulang (bukan dari geometri).
 *
 * `Box3.setFromObject` memakai bounding box geometri yang tidak ikut berubah saat animasi
 * berjalan, sehingga model yang sedang duduk/berguling bisa terpotong di tepi jendela — inilah
 * yang membuat kaki "hilang" saat duduk. Dengan membaca posisi tulang sungguhan, bingkai kamera
 * selalu memuat seluruh tubuh pada pose apa pun.
 */
/**
 * Jarak (piksel CSS) antara tubuh hasil pembacaan tulang dengan tiap tepi kanvas.
 *
 * Dipakai sebagai bukti terukur bahwa tubuh — termasuk kaki saat duduk — tidak terpotong,
 * dan dilaporkan ke Android lewat jejak `motion-state` (lihat scripts/capture-screenshots.sh).
 */
function frameGaps(vrm) {
  const box = skeletonBounds(vrm);
  if (!box || !state.camera) return null;
  // Kedelapan sudut kotak, bukan enam titik di bidang z tengah. Kaki dan tangan menonjol ke
  // depan kamera; memproyeksikannya di z tengah membuatnya terlihat lebih tinggi/rendah dari
  // aslinya, dan kotak yang dilaporkan terlalu pendek. Saat jendela mengikuti kotak itu, kaki
  // ikut terpotong (regresi yang tertangkap di emulator v0.1.10).
  const xs = [box.min.x, box.max.x];
  const ys = [box.min.y, box.max.y];
  const zs = [box.min.z, box.max.z];
  const corners = [];
  for (const x of xs) for (const y of ys) for (const z of zs) corners.push([x, y, z]);
  let minX = Infinity; let maxX = -Infinity; let minY = Infinity; let maxY = -Infinity;
  const point = new THREE.Vector3();
  corners.forEach(([x, y, z]) => {
    point.set(x, y, z).project(state.camera);
    minX = Math.min(minX, point.x); maxX = Math.max(maxX, point.x);
    minY = Math.min(minY, point.y); maxY = Math.max(maxY, point.y);
  });
  const { width, height } = canvasSize();
  const round = (value) => Math.round(value);
  return {
    top: round(((1 - maxY) / 2) * height),
    bottom: round(((1 + minY) / 2) * height),
    left: round(((1 + minX) / 2) * width),
    right: round(((1 - maxX) / 2) * width),
  };
}

function skeletonBounds(vrm) {
  const box = new THREE.Box3();
  const point = new THREE.Vector3();
  const names = [
    'head', 'neck', 'chest', 'spine', 'hips',
    'leftShoulder', 'rightShoulder', 'leftHand', 'rightHand',
    'leftUpperLeg', 'rightUpperLeg', 'leftLowerLeg', 'rightLowerLeg',
    'leftFoot', 'rightFoot',
  ];
  let headY = null;
  let found = 0;
  names.forEach((name) => {
    const bone = vrm.humanoid?.getNormalizedBoneNode(name) || vrm.humanoid?.getRawBoneNode?.(name);
    if (!bone) return;
    bone.getWorldPosition(point);
    found += 1;
    box.expandByPoint(point.clone());
    if (name === 'head' && headY === null) headY = point.y;
  });
  if (box.isEmpty() || found < 8) return null;
  // Ruang untuk rambut di atas tulang kepala dan telapak di bawah pergelangan. Rambut bisa
  // beberapa sentimeter di luar tulang kepala, jadi margin atas dibuat lebih besar.
  const size = new THREE.Vector3();
  box.getSize(size);
  // Kotak setinggi beberapa sentimeter berarti tulang belum punya matriks dunia yang sah
  // (model masih dimuat / ganti pose). Kotak seperti itu jangan dilaporkan: jendela siluet
  // akan menyempit jadi garis tipis dan hanya separuh badan yang terlihat.
  if (size.y < 0.4 || size.x < 0.05) return null;
  const topMargin = Math.max(size.y * 0.12, 0.05);
  const bottomMargin = Math.max(size.y * 0.08, 0.04);
  box.min.y -= bottomMargin;
  box.max.y += topMargin;
  return box;
}

/** Proyeksikan kotak dunia ke fraksi kanvas (celah dari tiap tepi), sama seperti frameGaps. */
function projectBox(box) {
  if (!box || box.isEmpty() || !state.camera) return null;
  const xs = [box.min.x, box.max.x];
  const ys = [box.min.y, box.max.y];
  const zs = [box.min.z, box.max.z];
  let minX = Infinity; let maxX = -Infinity; let minY = Infinity; let maxY = -Infinity;
  const point = new THREE.Vector3();
  for (const x of xs) for (const y of ys) for (const z of zs) {
    point.set(x, y, z).project(state.camera);
    minX = Math.min(minX, point.x); maxX = Math.max(maxX, point.x);
    minY = Math.min(minY, point.y); maxY = Math.max(maxY, point.y);
  }
  return {
    left: Number(((1 + minX) / 2).toFixed(3)),
    right: Number(((1 - maxX) / 2).toFixed(3)),
    top: Number(((1 - maxY) / 2).toFixed(3)),
    bottom: Number(((1 + minY) / 2).toFixed(3)),
  };
}

/**
 * Kotak dari tulang **mentah** (yang benar-benar menggerakkan mesh), bukan tulang
 * ternormalisasi. Kalau dua kotak ini berbeda jauh, mesh dan pengukuran tidak satu rig.
 */
function rawBoneBounds(vrm) {
  const box = new THREE.Box3();
  const point = new THREE.Vector3();
  const names = ['head', 'hips', 'leftFoot', 'rightFoot', 'leftHand', 'rightHand'];
  for (const name of names) {
    const bone = vrm.humanoid?.getRawBoneNode?.(name);
    if (!bone) continue;
    bone.getWorldPosition(point);
    box.expandByPoint(point.clone());
  }
  return box.isEmpty() ? null : box;
}

/** Kotak mesh sesungguhnya (tanpa proyeksi tulang): inilah yang benar-benar dilukis GPU. */
function meshBounds(vrm) {
  if (!vrm?.scene) return null;
  const box = new THREE.Box3().setFromObject(vrm.scene);
  return box.isEmpty() ? null : box;
}

/**
 * Kotak piksel yang benar-benar terlukis (fraksi kanvas), dibaca langsung dari framebuffer.
 * Pemindaian dilakukan tiap 4 piksel supaya ringan; ini alat diagnosa, bukan jalur render.
 */
function paintedBox() {
  const gl = state.renderer?.getContext?.();
  if (!gl) return null;
  const w = gl.drawingBufferWidth;
  const h = gl.drawingBufferHeight;
  if (!w || !h) return null;
  const pixels = new Uint8Array(w * h * 4);
  gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
  let minX = w; let maxX = -1; let minY = h; let maxY = -1; let count = 0;
  for (let y = 0; y < h; y += 4) {
    const row = y * w * 4;
    for (let x = 0; x < w; x += 4) {
      if (pixels[row + x * 4 + 3] > 8) {
        count += 1;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < 0) return { empty: true, width: w, height: h };
  return {
    // readPixels memakai titik asal kiri-bawah; fraksi dibuat dari atas untuk dibandingkan
    // dengan `frameGaps` yang juga diukur dari atas.
    left: Number((minX / w).toFixed(3)),
    right: Number((1 - (maxX + 1) / w).toFixed(3)),
    top: Number((1 - (maxY + 1) / h).toFixed(3)),
    bottom: Number((minY / h).toFixed(3)),
    coverage: Number(((count * 16) / (w * h)).toFixed(3)),
    drawW: w,
    drawH: h,
  };
}

/**
 * @param {object} vrm avatar aktif
 * @param {boolean} [force] hitung ulang walau ukurannya hampir sama
 */
function frameModel(vrm, force = false) {
  const skeleton = skeletonBounds(vrm);
  const mesh = meshBounds(vrm);
  // Kotak **gabungan** tulang + mesh. Tulang menentukan pose, tetapi yang dilihat pengguna
  // adalah mesh; kalau keduanya meleset (retargeting VRM 0/1, model dengan rig ganda), kamera
  // yang hanya memakai tulang akan membingkai bagian yang tidak terlukis — di emulator ini
  // membuat hanya sepatu yang tampak.
  const box = new THREE.Box3();
  if (skeleton && !skeleton.isEmpty()) box.union(skeleton);
  if (mesh && !mesh.isEmpty()) box.union(mesh);
  if (box.isEmpty()) return;
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);

  const rawHeight = Math.max(size.y, 0.1);
  // Tinggi acuan = pose berdiri saat model dimuat. Pose jongkok/berguling tidak boleh membuat
  // kamera zoom mendekat terus; paling banyak memperbesar 10% dari acuan.
  if (!state.baseHeight && !state.seated) state.baseHeight = rawHeight;
  const height = Math.max(rawHeight, (state.baseHeight || rawHeight) * 0.9);
  // Jarak kamera dihitung dari FOV dan aspek: tinggi yang terlihat pada jarak d adalah
  // 2·d·tan(fov/2). Tanpa ini, avatar terpotong saat jendela tinggi (skala 100%).
  state.frameHeight = height;
  const fovRad = (state.camera.fov * Math.PI) / 180;
  const distanceForHeight = (targetHeight) => targetHeight / (2 * Math.tan(fovRad / 2));
  const distanceForWidth = (targetWidth) =>
    targetWidth / (2 * Math.tan(fovRad / 2) * Math.max(0.1, state.camera.aspect));
  // Tinggi selalu menang: batas lebar hanya boleh memperkecil sampai 1,25x, sehingga pada
  // skala 100% avatar benar-benar mengisi tinggi layar (lengan boleh mendekati tepi).
  // Ruang gerak: seluruh tubuh (termasuk kaki saat duduk) harus muat dengan sisa ±8%, supaya
  // model tidak "menabrak" tepi jendela saat mengayun atau melambai.
  const padding = 1.18;
  // Deadband: perubahan kecil (napas, ayunan) tidak perlu menggeser kamera; tanpa ini avatar
  // terlihat "berdenyut" karena bingkai dihitung ulang tiap kali.
  if (!force && state.frameHeight && Math.abs(height - state.frameHeight) / state.frameHeight < 0.06) {
    state.cameraLookAt = center.clone();
    return;
  }
  const distanceHeight = distanceForHeight(height * padding);
  const distanceWidth = distanceForWidth(Math.max(size.x, 0.1) * padding);
  const distance = Math.max(distanceHeight, Math.min(distanceWidth, distanceHeight * 1.25));
  // Bidikan ke tengah tubuh hasil pembacaan tulang. Tidak ada lagi geseran tetap saat duduk:
  // geseran itulah yang memotong kaki di luar kanvas.
  state.cameraTarget = state.cameraTarget || new THREE.Vector3();
  state.cameraTarget.set(center.x, center.y, center.z + distance);
  state.cameraLookAt = center.clone();
  state.camera.position.copy(state.cameraTarget);
  state.camera.lookAt(center.x, center.y, center.z);
  state.camera.updateProjectionMatrix();
  // Skala model TIDAK lagi diterapkan di sini: ukuran avatar ditentukan oleh ukuran window
  // overlay di sisi Android, dan kamera selalu membingkai model agar mengisi window itu.
  state.vrm.scene.scale.setScalar(1);
}

/** Ringkasan tiap mesh: dipakai `debug-mesh` untuk membedakan masalah material vs kamera. */
function describeMeshes(vrm) {
  const parts = [];
  vrm.scene.traverse((object) => {
    if (!object.isMesh) return;
    const material = Array.isArray(object.material) ? object.material[0] : object.material;
    parts.push({
      name: (object.name || 'mesh').slice(0, 24),
      skinned: Boolean(object.isSkinnedMesh),
      visible: object.visible !== false,
      alphaMode: material?.alphaMode || null,
      transparent: Boolean(material?.transparent),
      opacity: material?.opacity ?? null,
      alphaTest: material?.alphaTest ?? null,
      depthWrite: material?.depthWrite ?? null,
      colorWrite: material?.colorWrite ?? null,
      hasMap: Boolean(material?.map),
      mapLoaded: material?.map ? Boolean(material.map.image) : null,
      count: object.geometry?.attributes?.position?.count ?? 0,
    });
  });
  return { total: parts.length, parts: parts.slice(0, 8) };
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
    const gltf = await (state.clipCache.has(url) ? state.clipCache.get(url) : loadVrmAnimation(url));
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
    // Diagnostik sekali saat muat: kalau sebagian badan tidak terlukis, penyebabnya ada di
    // mesh/material (alphaMode, opacity, urutan gambar), bukan di jendela overlay.
    post('debug-mesh', describeMeshes(vrm));
    captureSceneBaseYaw();
    state.avatarInfo = describeVrm(vrm);
    state.governor.reset();
    state.renderScale = 1;
    applyPixelRatio();
    state.mixer = new THREE.AnimationMixer(vrm.scene);
    state.mixer.addEventListener('finished', onActionFinished);
    frameModel(vrm);
    state.ready = true;
    state.idleTime = 0;
    state.baseHeight = null;
    state.restPose = captureRestPose(vrm);
    // Posisi istirahat pinggul: dipakai mengunci gerak maju klip (lihat clampRootMotion).
    const hips = vrm.humanoid?.getNormalizedBoneNode('hips');
    state.hipsRest = hips ? { x: hips.position.x, z: hips.position.z } : null;
    state.motion.clearBase();
    state.behavior.reset(performance.now());
    state.interactedEver = false;
    state.poseBlend = 1;
    applyRelaxedPose(vrm, 1, state.restPose);
    post('avatar-ready', { info: state.avatarInfo });
    // Mesin keadaan akan memutar klip idle sendiri pada frame berikutnya.
    state.clipName = null;
    state.clipOverride = null;
  } catch (error) {
    fail('load-failed', `Gagal memuat avatar: ${error?.message || error}`, true);
  }
}

async function loadAnimation(url, name, options = {}) {
  markInteraction();
  if (!state.vrm || !state.mixer) {
    fail('no-avatar', 'Pilih avatar sebelum memutar animasi.', false);
    return;
  }
  try {
    const gltf = await (state.clipCache.has(url) ? state.clipCache.get(url) : loadVrmAnimation(url));
    const vrmAnimation = gltf.userData.vrmAnimations?.[0];
    if (!vrmAnimation) {
      fail('not-vrma', 'Berkas bukan animasi VRM (.vrma).', false);
      return;
    }
    const clip = createVRMAnimationClip(vrmAnimation, state.vrm);
    const action = state.mixer.clipAction(clip);
    action.setLoop(options.loop === false ? THREE.LoopOnce : THREE.LoopRepeat, Infinity);
    // Rantai klip: mis. sitting_enter → sitting_idle, sitting_exit → idle.
    state.pendingChain = options.chain ? BUILTIN_CLIPS[options.chain] || options.chain : null;
    action.clampWhenFinished = true;
    action.timeScale = state.speed;

    if (state.currentAction && state.currentAction !== action) {
      state.currentAction.fadeOut(0.25);
    }
    action.reset().fadeIn(0.25).play();
    state.currentAction = action;
    state.motion.clearBase();
    state.animationName = name || null;
    post('animation-playing', { name: name || null, duration: clip.duration });
  } catch (error) {
    fail('animation-failed', `Gagal memuat animasi: ${error?.message || error}`, false);
  }
}

/**
 * Menghentikan animasi dan **membuang pose terakhirnya**.
 *
 * Tanpa ini, quaternion frame terakhir klip tersimpan sebagai acuan gerak prosedural dan avatar
 * berhenti dengan tangan terangkat (mis. setelah klip melambai). Lihat docs/rencana-gerak-v2.md §2.
 */
/**
 * Klip bawaan dari paket CC0 Quaternius (lihat docs/aset-gerak.md), dikonversi ke .vrma oleh
 * scripts/glb-ke-vrma.mjs dan dibundel di assets/animations.
 */
const CROSSFADE_MS = 250;

const BUILTIN_CLIPS = {
  idle: 'idle_loop',
  talk: 'idle_talk',
  walk: 'walk_loop',
  dance: 'dance_loop',
  // Klip tambahan untuk direktur perilaku (semua dari paket CC0 yang sama).
  interact: 'interact',
  idle_torch: 'idle_torch',
  spell_idle: 'spell_idle',
  sitting_enter: 'sitting_enter',
  sitting_idle: 'sitting_idle',
  sitting_exit: 'sitting_exit',
  sitting_talk: 'sitting_talk',
  crouch_idle: 'crouch_idle',
  jump_start: 'jump_start',
  jump_land: 'jump_land',
  // Tambahan 10 klip CC0 (paket yang sama, dikonversi dengan --in-place agar tidak meluncur
  // keluar jendela overlay). Lihat docs/aset-gerak.md.
  jump_loop: 'jump_loop',
  push_loop: 'push_loop',
  walk_formal: 'walk_formal',
  jog_loop: 'jog_loop',
  kneel_fix: 'kneel_fix',
  crouch_walk: 'crouch_walk',
  drive_idle: 'drive_idle',
  // Gelombang v0.1.8 (paket CC0 yang sama, dikonversi --in-place).
  sprint_loop: 'sprint_loop',
  swim_idle: 'swim_idle',
  swim_fwd: 'swim_fwd',
  pickup: 'pickup',
  spell_enter: 'spell_enter',
  spell_exit: 'spell_exit',
  spell_shoot: 'spell_shoot',
  roll: 'roll',
};

/**
 * Klip gestur: diputar **sekali** lalu kembali ke idle.
 *
 * Kalau klip 0,4–0,9 detik ini diulang terus, hasilnya terlihat seperti gerakan tersendat
 * (mis. memungut berulang). Karena itu mesin keadaan memutarnya dengan `loop:false` dan
 * merantai ke `idle` setelah selesai.
 */
const GESTURE_CLIPS = new Set(['pickup', 'spell_enter', 'spell_exit', 'spell_shoot', 'roll', 'jump_start', 'jump_land']);

function builtinUrl(name) {
  // index.html berada di /assets/renderer/, animasi di /assets/animations/.
  return new URL(`../animations/${name}.vrma`, window.location.href).href;
}

/** Cache berkas .vrma yang sudah diparse supaya berpindah klip tidak memicu unduhan ulang. */
function loadVrmAnimation(url) {
  if (!state.clipCache.has(url)) {
    const promise = loader()
      .loadAsync(url)
      .catch((error) => {
        state.clipCache.delete(url);
        throw error;
      });
    state.clipCache.set(url, promise);
  }
  return state.clipCache.get(url);
}

/** Konteks yang dipakai direktur perilaku, diturunkan dari keadaan renderer. */
/**
 * Duduk di tepi layar.
 *
 * `true`  → putar klip duduk sekali, lalu diam di `sitting_idle` (atau `sitting_talk` saat bicara).
 * `false` → putar klip berdiri sekali, lalu kembali ke idle.
 */
function setSeated(seated) {
  const target = Boolean(seated);
  if (target === state.seated) return state.seated;
  state.seated = target;
  state.clipOverride = null;
  state.behavior.reset(performance.now());
  markInteraction();
  if (!state.vrm || !state.mixer) return state.seated;
  if (target) {
    if (state.motion) state.motion.setLocomotion('idle');
    playBuiltin('sitting_enter', { manual: false, reason: 'duduk', loop: false, chain: 'sitting_idle' });
  } else {
    playBuiltin('sitting_exit', { manual: false, reason: 'berdiri', loop: false, chain: 'idle' });
  }
  frameModel(state.vrm);
  post('seated', { seated: state.seated });
  return state.seated;
}

function behaviorContext() {
  const motion = state.motion?.state;
  return {
    talking: state.talking > 0 || Boolean(state.speech),
    locomotion: motion?.locomotion ?? 'idle',
    idleMs: Math.round((motion?.idleSeconds ?? 0) * 1000),
    interacted: state.interacted,
    // Duduk di tepi layar hanya ditawarkan bila pengguna mengizinkannya.
    edgeSeatAvailable: state.sittingEnabled && !state.seated && state.ready,
    armed: state.interactedEver,
  };
}

/**
 * Mesin keadaan klip bawaan.
 * Prioritas: bicara > pilihan manual pengguna > perilaku otomatis > lokomosi.
 */
function desiredClip() {
  const context = behaviorContext();
  if (state.seated) {
    // Saat duduk, jalan/tari tidak masuk akal: hanya bicara atau duduk tenang.
    return context.talking ? 'sitting_talk' : 'sitting_idle';
  }
  if (context.talking) return 'talk';
  if (state.clipOverride) return state.clipOverride;
  if (context.locomotion === 'walk') return 'walk';
  if (context.locomotion === 'dance') return 'dance';
  return state.behavior.currentClip() || 'idle';
}

function recordClip(name, reason) {
  state.clipName = name;
  post('clip-changed', { clip: name, reason });
  state.clipAppliedAt = performance.now();
  state.clipLog.push({ clip: name, reason, at: Math.round(performance.now()) });
  if (state.clipLog.length > 40) state.clipLog.shift();
}

async function playBuiltin(name, options = {}) {
  if (!state.vrm || !state.mixer) {
    fail('no-avatar', 'Pilih avatar sebelum memutar animasi.', false);
    return false;
  }
  const file = BUILTIN_CLIPS[name] || (name in BUILTIN_CLIPS ? BUILTIN_CLIPS[name] : null);
  const clipName = typeof name === 'string' && !(name in BUILTIN_CLIPS) ? file : null;
  const resolved = clipName || file;
  if (!resolved) return false;
  if (state.builtinClip === resolved && state.currentAction) return true;
  state.builtinClip = resolved;
  recordClip(resolved, options.reason || 'manual');
  if (options.manual !== false) state.clipOverride = resolved;
  await loadAnimation(builtinUrl(resolved), resolved, { loop: options.loop !== false });
  return true;
}

/**
 * Menahan avatar di tempatnya.
 *
 * Klip seperti jog/roll memindahkan pinggul ke depan (root motion). Jendela overlay berbentuk
 * kotak tetap, jadi model yang melangkah akan menabrak tepinya lalu terpotong — terasa seperti
 * "terhalang kotak". Sumbu X/Z pinggul dipaku ke posisi istirahat; langkah kaki tetap terlihat,
 * lompatan (sumbu Y) tidak diubah.
 */
function clampRootMotion() {
  const hips = state.vrm?.humanoid?.getNormalizedBoneNode('hips');
  if (!hips || !state.hipsRest) return;
  hips.position.x = state.hipsRest.x;
  hips.position.z = state.hipsRest.z;
}

/** Kamera mengikuti bingkai baru dengan halus supaya perpindahan pose tidak membuat gambar melompat. */
function easeCamera(delta) {
  const target = state.cameraTarget;
  if (!target || !state.camera) return;
  const t = Math.min(1, delta * 6);
  state.camera.position.lerp(target, t);
  if (state.cameraLookAt) state.camera.lookAt(state.cameraLookAt);
}

/** Dipanggil tiap frame; hanya berpindah klip bila keadaan berubah dan crossfade sudah lewat. */
function syncClipState() {
  if (!state.ready || !state.vrm || !state.mixer) return;
  // Direktur memilih perilaku (membaca apakah bicara/berjalan untuk membatalkannya).
  // Bisa dimatikan lewat `setBehaviorEnabled(false)` — dipakai uji pose (supaya klip tidak
  // berganti di tengah pengukuran) dan pengguna yang ingin avatar benar-benar diam.
  const behavior = state.behaviorEnabled
    ? state.behavior.update(performance.now(), behaviorContext())
    : null;
  if (behavior?.id === 'sit_down' && !state.seated) {
    setSeated(true);
    return;
  }
  const desired = desiredClip();
  if (desired === state.clipName) return;
  if (performance.now() - state.clipAppliedAt < CROSSFADE_MS) return;
  const options = { manual: false, reason: 'state' };
  if (GESTURE_CLIPS.has(desired)) {
    // Sekali jalan lalu kembali ke idle, supaya gestur pendek tidak berulang seperti tersendat.
    options.loop = false;
    options.chain = 'idle';
  }
  playBuiltin(desired, options).catch(() => {});
  // Pose klip baru bisa lebih tinggi/rendah (duduk, berguling): bingkai kamera dihitung ulang
  // setelah animasi sempat berjalan, bukan hanya saat model dimuat.
  state.reframeAt = performance.now() + 320;
}

/** Dipanggil mixer saat klip sekali-jalan selesai: lanjutkan ke klip rantai bila ada. */
function onActionFinished(event) {
  if (!state.pendingChain) return;
  if (state.currentAction && event.action !== state.currentAction) return;
  const next = state.pendingChain;
  state.pendingChain = null;
  playBuiltin(next, { manual: false, reason: 'chain' }).catch(() => {});
}

/** Tandai ada interaksi pengguna (dipakai suasana perilaku & pematian rasa kantuk). */
function markInteraction() {
  state.interacted = true;
  state.interactedEver = true;
}

function stopAnimation() {
  if (state.currentAction) {
    state.currentAction.fadeOut(0.2);
    state.currentAction = null;
  }
  if (state.mixer) state.mixer.stopAllAction();
  state.animationName = null;
  state.builtinClip = null;
  state.clipName = null;
  state.clipOverride = null;
  state.motion.clearBase();
  state.behavior.reset(performance.now());
  if (state.vrm) {
    applyRelaxedPose(state.vrm, 1, state.restPose);
    state.vrm.update(0);
  }
  post('animation-stopped');
}

function updateBlink(delta) {
  const expression = state.vrm?.expressionManager;
  if (!expression) return;

  // Headpat menahan mata menutup lebih lama dari kedipan biasa; jangan ditimpa timer kedip.
  if (performance.now() < state.headpatUntil) {
    expression.setValue('blink', 1);
    return;
  }

  state.blinkTimer -= delta;

  // Fase menunggu: tulis 0 secara eksplisit. Tanpa ini, nilai `blink` yang ditinggalkan reaksi
  // bermata tertutup (`>_<`, sayang) akan tetap 1 sampai siklus kedip berikutnya selesai —
  // mata terlihat menutup terus.
  if (state.blinkPhase === 0) expression.setValue('blink', 0);

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
  updateAutoReactions();
}

/**
 * Gaya otomatis saat pengguna tidak menyentuh apa pun.
 *
 * Ambang waktunya sengaja berjenjang supaya avatar punya "kisah" sendiri: bengong dulu, lalu
 * malas, mengantuk, akhirnya tidur. Semua lewat `reactions.trigger` sehingga jeda, prioritas,
 * dan anti-ulang tetap dihormati — tidak ada jalur pintas.
 */
function updateAutoReactions() {
  if (!state.behaviorEnabled || !state.vrm || state.preview) return;
  // Uji otomatis memanggil reaksi secara eksplisit; gaya otomatis (termasuk tidur yang menahan
  // mata tertutup sampai 2 menit) akan mengacaukan pengukuran ekspresi di uji render.
  if (window.__MATE_TEST__ === true) return;
  if (state.reactions.active) return;
  const idle = state.motion.state.idleSeconds;
  const mood = state.behavior.state?.mood;
  if (idle >= 240) {
    runReaction('tidur', { source: 'auto', priority: 1 });
  } else if (idle >= 150) {
    runReaction('ngantuk', { source: 'auto', priority: 1 });
  } else if (idle >= 95) {
    runReaction('malas', { source: 'auto', priority: 1 });
  } else if (idle >= 55) {
    runReaction('boring', { source: 'auto', priority: 1 });
  } else if (idle >= 18 && idle <= 22 && mood === 'ceria') {
    runReaction('lompat', { source: 'auto', priority: 1 });
  }
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
  syncClipState();
  state.motion.resetToBase();
  if (state.mixer) state.mixer.update(delta);
  if (state.vrm) {
    // Reaksi dihitung sebelum mesin gerak: lapisannya digabung secara aditif di dalam
    // `motion.update` supaya quaternion acuan tidak tercemar offset.
    //
    // Waktu reaksi memakai jam dinding, bukan `delta` yang dibatasi 50 ms: di perangkat lambat
    // (atau SwiftShader di CI, 3–5 fps) reaksi 2,2 detik bisa menjadi 9 detik nyata, dan gaya
    // bermata tertutup jadi terasa "nyangkut". Pose tetap memakai `delta` terbatas agar stabil.
    const wallNow = performance.now();
    const wallDelta = state.lastReactionAt > 0
      ? Math.min(1.5, Math.max(0.001, (wallNow - state.lastReactionAt) / 1000))
      : delta;
    state.lastReactionAt = wallNow;
    const reactionFrame = updateReactionState(wallDelta);
    state.motion.update(state.vrm, delta, {
      talking: state.talking > 0,
      interacted: state.interacted,
      reaction: reactionFrame,
    });
    applyReactionFrame(reactionFrame);
    state.interacted = false;
    clampRootMotion();
    // Spring bone (rambut, rok, tali) tidak stabil bila diberi langkah waktu besar: pada
    // perangkat lambat (6–10 fps) delta bisa 50 ms dan rambut "melonjak" ke atas. Pecah jadi
    // beberapa langkah kecil tanpa mengubah total waktu.
    const springSteps = delta > 0.02 ? Math.min(4, Math.ceil(delta / 0.02)) : 1;
    for (let step = 0; step < springSteps; step += 1) state.vrm.update(delta / springSteps);
    if (state.reframeAt && performance.now() >= state.reframeAt) {
      state.reframeAt = 0;
      frameModel(state.vrm, true);
    } else if (now - (state.lastFrameCheck || 0) > 600) {
      // Klip lompat/mendorong mengangkat atau menurunkan tubuh; periksa berkala supaya tidak
      // ada bagian tubuh yang keluar kanvas di tengah klip.
      state.lastFrameCheck = now;
      frameModel(state.vrm);
    }
    easeCamera(delta);
  }

  state.renderer.render(state.scene, state.camera);
  // Bukti piksel: baca kembali frame yang baru saja dilukis dan cari kotak piksel yang tidak
  // transparan. Pengukuran tulang (`frameGaps`) hanya tahu di mana tulang *seharusnya*
  // berada; kalau mesh tidak terlukis atau kanvas terpotong, angkanya tetap terlihat sehat.
  // Pemeriksaan ini yang membedakannya (dipakai untuk mendiagnosis avatar hanya tampak kaki).
  if (now - (state.paintReportAt || 0) >= 3000) {
    state.paintReportAt = now;
    const painted = paintedBox();
    if (painted) post('debug-paint', painted);
  }
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
  // Jejak pertama dikirim cepat (1,5 detik) supaya tangkapan layar otomatis tetap punya bukti pose.
  const motionInterval = state.motionLogAt ? 5000 : 1500;
  if (now - (state.motionLogAt || 0) >= motionInterval) {
    state.motionLogAt = now;
    const debug = state.motion.debug();
    // Sertakan sudut lengan terukur supaya bukti "tangan tidak stuck di atas" terbaca di logcat.
    const pose = window.MateEngine?.poseMetrics?.();
    const trace = {
      ...debug,
      clip: state.builtinClip,
      behavior: state.behavior.currentId(),
      mood: state.behavior.state.mood,
      armLeftDeg: pose?.leftArmDeg ?? null,
      armRightDeg: pose?.rightArmDeg ?? null,
      seated: state.seated,
      bodyGap: frameGaps(state.vrm),
    };
    // Satu jalur saja: bridge. Menulis juga lewat console membuat tiap jejak tercatat dua kali.
    post('motion-state', trace);
  }

  // Kotak tubuh untuk jendela siluet Android: ~6× per detik, hanya saat berubah > 6 px.
  // Ini yang membuat area kosong yang menelan sentuhan mengecil tanpa avatar ikut mengecil.
  if (state.vrm && now - (state.bodyBoxAt || 0) >= 166) {
    state.bodyBoxAt = now;
    const gaps = frameGaps(state.vrm);
    if (gaps) {
      const last = state.bodyBoxLast;
      const changed = !last
        || Math.abs(last.left - gaps.left) > 6 || Math.abs(last.top - gaps.top) > 6
        || Math.abs(last.right - gaps.right) > 6 || Math.abs(last.bottom - gaps.bottom) > 6;
      if (changed) {
        state.bodyBoxLast = gaps;
        // Dikirim sebagai **fraksi** kanvas (0..1), bukan piksel: WebView bisa melaporkan
        // CSS px atau piksel fisik tergantung perangkat, dan Kotlin tidak perlu menebak
        // density-nya. Ini menghilangkan seluruh kelas bug skala.
        const { width, height } = canvasSize();
        post('body-box', {
          left: Number((gaps.left / width).toFixed(4)),
          top: Number((gaps.top / height).toFixed(4)),
          right: Number((gaps.right / width).toFixed(4)),
          bottom: Number((gaps.bottom / height).toFixed(4)),
          cssWidth: width,
          cssHeight: height,
        });
      }
    }
  }

  // Diagnostik tampilan: kalau `bodyGap` melaporkan badan mengisi kanvas tetapi tangkapan
  // layar hanya menampilkan kaki, penyebabnya ada di lapisan viewport (skala/geser WebView),
  // bukan di kamera. Angka ini yang membedakan keduanya.
  if (now - (state.viewReportAt || 0) >= 3000) {
    state.viewReportAt = now;
    const viewport = window.visualViewport;
    post('debug-view', {
      cssW: Math.round(window.innerWidth),
      cssH: Math.round(window.innerHeight),
      clientW: document.documentElement.clientWidth,
      clientH: document.documentElement.clientHeight,
      dpr: Number(window.devicePixelRatio.toFixed(2)),
      scrollY: Math.round(window.scrollY || 0),
      vvScale: viewport ? Number(viewport.scale.toFixed(2)) : null,
      vvOffsetTop: viewport ? Math.round(viewport.offsetTop) : null,
      vvHeight: viewport ? Math.round(viewport.height) : null,
      canvasH: canvasSize().height,
      modelScale: Number((state.vrm?.scene?.scale?.x ?? 0).toFixed(2)),
      camDistance: state.camera
        ? Number(state.camera.position.distanceTo(state.cameraLookAt || state.camera.position).toFixed(2))
        : null,
      frameHeight: state.frameHeight ? Number(state.frameHeight.toFixed(2)) : null,
      pose: state.vrm ? Object.keys(state.vrm.humanoid?.humanBones || {}).length : 0,
      boneBox: projectBox(skeletonBounds(state.vrm)),
      rawBoneBox: projectBox(rawBoneBounds(state.vrm)),
      meshBox: projectBox(meshBounds(state.vrm)),
    });
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

/**
 * Putar klip bawaan untuk sebuah reaksi tanpa menandainya sebagai "pilihan manual pengguna".
 *
 * Bedanya dengan `playBuiltin(name, { manual: true })`: pilihan manual menahan direktur
 * perilaku sampai pengguna memilih lagi, sedangkan klip reaksi hanya menang sementara — begitu
 * reaksinya selesai, direktur mengambil alih lagi. Lihat `updateReactionState()`.
 */
function applyClipTo(name, reason) {
  if (!state.vrm || !state.mixer) return Promise.resolve(false);
  const gesture = GESTURE_CLIPS.has(name);
  state.clipOverride = name;
  const options = { manual: false, reason, loop: !gesture };
  if (gesture) options.chain = 'idle';
  return playBuiltin(name, options).catch(() => false);
}

/** Ambil yaw dasar model sekali setelah dimuat (VRM 0.x diputar 180° oleh `rotateVRM0`). */
function captureSceneBaseYaw() {
  state.sceneBaseYaw = state.vrm ? state.vrm.scene.rotation.y : 0;
}

/**
 * Kelola siklus hidup reaksi: maju satu langkah, terapkan ekspresi, putar/miringkan model,
 * dan bersihkan keadaan saat reaksi selesai. Mengembalikan frame untuk mesin gerak.
 */
function updateReactionState(delta) {
  const frame = state.reactions.update(delta);
  state.reactionFrame = frame;
  if (frame.sfx && frame.sfx.length > 0) {
    // Suara diputar Android (SoundPool), bukan Web Audio: tetap berbunyi saat layar mati dan
    // menghormati tombol bisu/paket suara pengguna.
    for (const name of frame.sfx) post('reaction-sfx', { name, style: frame.styleId });
  }
  if (frame.styleId) {
    state.reactionStyle = frame.styleId;
  } else if (state.reactionStyle) {
    // Reaksi berakhir: kembalikan ekspresi, lepas klip sementara, lapor ke Android.
    post('reaction-end', { style: state.reactionStyle });
    if (state.clipOverride) state.clipOverride = null;
    state.reactionStyle = null;
  }
  // Memunggung (ngambek) diputar halus, di atas yaw dasar model.
  const targetYaw = (state.sceneBaseYaw || 0) + (frame.yaw || 0);
  state.sceneYaw += (targetYaw - state.sceneYaw) * Math.min(1, delta * 6);
  if (state.vrm) state.vrm.scene.rotation.y = state.sceneYaw;
  return frame;
}

/**
 * Mengubah titik sentuh layar (piksel CSS) menjadi zona tubuh.
 *
 * Jalur utama: lempar sinar ke mesh avatar, lalu `zoneForPoint()` memilih tulang terdekat dari
 * titik di permukaan tubuh. Jalur cadangan (`zoneForScreen`) dipakai bila sinar tidak mengenai
 * apa pun — misalnya model transparan, rambut tipis, atau sudut kamera ekstrem.
 */
function zoneAt(x, y) {
  if (!state.vrm || !state.camera) return null;
  const { width, height } = canvasSize();
  const ndc = new THREE.Vector2((x / width) * 2 - 1, -(y / height) * 2 + 1);
  try {
    if (!state.raycaster) state.raycaster = new THREE.Raycaster();
    state.raycaster.setFromCamera(ndc, state.camera);
    const hits = state.raycaster.intersectObject(state.vrm.scene, true)
      .filter((hit) => hit.object && (hit.object.isMesh || hit.object.isSkinnedMesh));
    if (hits.length > 0) {
      const point = hits[0].point.clone();
      const zone = zoneForPoint(state.vrm, point);
      if (zone && zone.inside) return zone;
    }
  } catch (error) {
    // Raycast pada mesh rusak tidak boleh mematikan overlay.
  }
  return zoneForScreen(state.vrm, state.camera, ndc, { width, height });
}

/** Apakah avatar masih "terkejut" oleh sentuhan? Dipakai untuk membangunkan tidur. */
function wakeFromSleep() {
  if (state.reactions.active === 'tidur') {
    state.reactions.interrupt('wake');
    post('reaction-end', { style: 'tidur', reason: 'wake' });
    // Duduk lalu bangun: klip keluar diputar sekali supaya tidak "meloncat" berdiri.
    applyClipTo('sitting_exit', 'wake').catch(() => {});
    return true;
  }
  return false;
}

/** Jalankan satu gaya reaksi, termasuk klip (bila ada) dan pemberitahuan ke Android. */
function runReaction(styleId, context = {}) {
  const accepted = state.reactions.trigger(styleId, context);
  if (!accepted) {
    post('reaction-rejected', { style: styleId, active: state.reactions.active });
    return false;
  }
  state.interacted = true;
  state.interactedEver = true;
  state.motion.state.idleSeconds = 0;
  state.motion.state.sleepiness = 0;
  const style = state.reactions.state.current.style;
  state.reactionStyle = styleId;
  // Geser jendela kecil (mundur saat malu, maju saat peluk): diproses Android dengan penjepitan
  // bingkai, jadi tidak mungkin mendorong avatar keluar layar.
  if (style.nudge && performance.now() - state.lastNudgeAt > 1200) {
    state.lastNudgeAt = performance.now();
    post('nudge', { dx: style.nudge[0], dy: style.nudge[1], style: styleId });
  }
  const clip = state.reactions.clipFor(styleId);
  if (clip && !state.clipOverride) {
    if (styleId === 'tidur') {
      applyClipTo('sitting_enter', 'tidur').catch(() => {});
    } else {
      applyClipTo(clip, `reaksi:${styleId}`).catch(() => {});
    }
  }
  post('reaction', { style: styleId, label: style.label, source: context.source || 'touch', zone: context.zone || null });
  return true;
}

/** Terapkan ekspresi + mata dari reaksi yang sedang berjalan. */
function applyReactionFrame(frame) {
  const expression = state.vrm?.expressionManager;
  if (!expression) return;
  const keys = new Set(Object.keys(frame.expression || {}));
  // Ekspresi gaya sebelumnya yang tidak dipakai lagi harus dikembalikan ke nol.
  for (const key of state.reactionExprKeys) {
    if (!keys.has(key)) expression.setValue(key, 0);
  }
  for (const [key, value] of Object.entries(frame.expression || {})) {
    expression.setValue(key, value);
  }
  state.reactionExprKeys = keys;
  if (!frame.styleId && state.reactionEyesActive) {
    // Reaksi bermata tertutup baru saja selesai: buka mata sekarang juga dan mulai ulang
    // siklus kedip, jangan menunggu timer lama.
    expression.setValue('blink', 0);
    state.blinkPhase = 0;
    state.blinkTimer = 1.2;
    state.reactionEyesActive = false;
  }
  if (frame.styleId) {
    const blink = { closed: 1, squint: 0.88, half: 0.35, slow: 0.5, wide: 0, angry: 0, normal: null }[frame.eyes];
    if (blink !== null && blink !== undefined) {
      expression.setValue('blink', blink);
      state.reactionEyesActive = true;
    }
  }
}

/**
 * Terima satu kejadian sentuh dari Android.
 *
 * `phase`: down | move | up. Koordinat dalam piksel CSS kanvas overlay.
 * Mengembalikan nama gaya yang dipicu (atau null) supaya uji bisa memeriksanya.
 */
function pipeTouch(phase, x, y) {
  if (!state.vrm || state.paused) return null;
  const now = performance.now();
  state.touch.tick(now);
  // Masukan Android berupa fraksi kanvas (0..1) — bebas dari perbedaan CSS px vs piksel fisik.
  // Nilai di luar 0..1 (sentuhan di margin jendela yang dipotong) dijepit.
  const { width, height } = canvasSize();
  const px = Math.min(1, Math.max(0, Number(x) || 0)) * width;
  const py = Math.min(1, Math.max(0, Number(y) || 0)) * height;
  if (phase === 'down') {
    wakeFromSleep();
    const zone = zoneAt(px, py);
    state.touch.down(zone?.zone || 'belly', px, py, now);
    state.touchZone = zone;
    // Android perlu tahu apakah sentuhan mendarat di badan: menyentuh badan = elus/ketuk,
    // bukan menyeret. Tanpa kabar ini, mengelus kepala akan menyeret avatar.
    post('touch-zone', { zone: zone?.zone || null, inside: Boolean(zone?.inside) });
    return null;
  }
  if (phase === 'move') {
    const event = state.touch.move(px, py, now);
    if (event?.type === 'stroke') {
      const style = styleForTouch({ zone: 'head', gesture: 'stroke' });
      runReaction(style, { source: 'touch', zone: 'head' });
      return style;
    }
    return null;
  }
  if (phase === 'up') {
    const event = state.touch.up(now);
    if (!event) return null;
    const zone = event.zone || state.touchZone?.zone || 'belly';
    if (event.type === 'hold') wakeFromSleep();
    const style = styleForTouch({ zone, gesture: event.type });
    if (!style) return null;
    runReaction(style, { source: 'touch', zone });
    return style;
  }
  return null;
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
    // Pilihan manual pengguna dilepas agar mesin keadaan kembali mengikuti lokomosi.
    state.clipOverride = null;
    post('locomotion', { mode: applied });
    return applied;
  },
  nextDance: () => {
    const variant = state.motion.nextDance();
    state.clipOverride = null;
    post('locomotion', { mode: 'dance', variant });
    return variant;
  },
  clipTimeline: () => state.clipLog.slice(),
  behaviorTimeline: () => state.behavior.timeline(),
  setSeated: (value) => setSeated(value),
  seated: () => state.seated,
  /** Nilai ekspresi (mis. 'blink') untuk uji otomatis. */
  expressionValue: (name) => state.vrm?.expressionManager?.getValue(name) ?? null,
  setSittingEnabled: (value) => {
    state.sittingEnabled = Boolean(value);
    if (!state.sittingEnabled && state.seated) setSeated(false);
    return state.sittingEnabled;
  },
  /** Kecepatan geser dari sisi Android (piksel/detik) → ayunan badan. */
  setDragVelocity: (vx, vy) => {
    state.motion.setDrag(vx, vy);
    markInteraction();
  },
  behaviorState: () => ({
    id: state.behavior.currentId(),
    mood: state.behavior.state.mood,
    clip: state.behavior.currentClip(),
  }),
  setReducedMotion: (value) => {
    state.motion.setReducedMotion(value);
  },
  /** Matikan/nyalakan direktur perilaku (gerak acak otomatis). */
  setBehaviorEnabled: (value) => {
    state.behaviorEnabled = Boolean(value);
    state.behavior.reset(performance.now());
    state.clipOverride = null;
    post('behavior-enabled', { enabled: state.behaviorEnabled });
    return state.behaviorEnabled;
  },
  behaviorEnabled: () => state.behaviorEnabled,
  /**
   * Ketuk dari Android (jalur lama, tanpa koordinat).
   *
   * Dipertahankan karena menu cepat dan uji lama masih memanggilnya. Pemetaan zona lama
   * (head/shoulder/body) diterjemahkan ke gaya baru; jalur utama kini `pointer()`.
   */
  react: (type) => {
    state.interacted = true;
    state.interactedEver = true;
    if (type === 'head') {
      // Headpat: mata menutup dan senyum muncul (perilaku lama dipertahankan).
      state.headpatUntil = performance.now() + 1600;
    }
    const style = styleForTouch({
      zone: type === 'head' ? 'head' : type === 'shoulder' ? 'shoulder' : 'belly',
      gesture: 'tap',
    });
    const ok = runReaction(style, { source: 'touch', zone: type });
    return ok ? style : null;
  },
  /** Sentuhan berkoordinat dari overlay: phase = down | move | up. */
  pointer: (phase, x, y) => pipeTouch(phase, x, y),
  /** Tombol "coba gaya" di Pengaturan memakai jalur eksplisit (menembus jeda). */
  tryReaction: (style) => runReaction(style, { source: 'explicit', force: true }),
  reactionDebug: () => ({
    ...state.reactions.debug(),
    style: state.reactionStyle,
    sceneYaw: Number(state.sceneYaw.toFixed(3)),
    expressions: [...state.reactionExprKeys],
  }),
  motionDebug: () => state.motion.debug(),
  /**
   * Sudut lengan terukur dari geometri, bukan dari tanda rotasi: dipakai uji regresi untuk
   * memastikan tangan tidak "stuck di atas".
   */
  poseMetrics: () => {
    const humanoid = state.vrm?.humanoid;
    if (!humanoid) return null;
    const hips = humanoid.getNormalizedBoneNode('hips');
    const measure = (upperArm, lowerArm) => {
      const upper = humanoid.getNormalizedBoneNode(upperArm);
      const lower = humanoid.getNormalizedBoneNode(lowerArm);
      if (!upper || !lower) return null;
      const from = new THREE.Vector3();
      const to = new THREE.Vector3();
      upper.getWorldPosition(from);
      lower.getWorldPosition(to);
      const direction = to.sub(from).normalize();
      // Sudut terhadap "bawah" (0° = lengan menggantung, 180° = lengan lurus ke atas).
      const down = new THREE.Vector3(0, -1, 0);
      if (hips) {
        const hipsWorld = new THREE.Quaternion();
        hips.getWorldQuaternion(hipsWorld);
        down.applyQuaternion(hipsWorld).normalize();
      }
      const dot = Math.max(-1, Math.min(1, direction.dot(down)));
      return Number(((Math.acos(dot) * 180) / Math.PI).toFixed(1));
    };
    return {
      leftArmDeg: measure('leftUpperArm', 'leftLowerArm'),
      rightArmDeg: measure('rightUpperArm', 'rightLowerArm'),
      locomotion: state.motion?.state?.locomotion ?? null,
      animationName: state.animationName,
      builtinClip: state.builtinClip,
      hasAction: Boolean(state.currentAction),
      baseBones: state.motion?.debug?.().bones ?? 0,
      seated: state.seated,
      sway: state.motion?.state?.drag
        ? Number((Math.abs(state.motion.state.drag.vx) + Math.abs(state.motion.state.drag.vy)).toFixed(1))
        : 0,
    };
  },
  resetPose: () => {
    stopAnimation();
    state.motion.clearBase();
    if (state.vrm) {
      applyRelaxedPose(state.vrm, 1, state.restPose);
      state.vrm.update(0);
    }
    const metrics = window.MateEngine.poseMetrics?.();
    post('pose-reset', metrics || {});
    return metrics;
  },
  playBuiltin: (name) => playBuiltin(name),
  builtinClips: () => Object.entries(BUILTIN_CLIPS).map(([key, file]) => ({ key, file })),
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
    preview: state.preview,
    quality: state.quality,
  }),
};

async function boot() {
  try {
    initThree();
    if (state.preview) {
      // Pratinjau: tanpa direktur perilaku, fps rendah, dan skala render lebih kecil supaya
      // tidak berebut GPU dengan overlay yang mungkin sedang berjalan.
      state.targetFps = 15;
      state.governor.setTargetFps(15);
      // Kartu pratinjau kecil: setengah resolusi sudah cukup dan jauh lebih ringan di GPU
      // (di emulator, dua konteks WebGL membuat satu frame butuh >3 detik pada 0,75).
      state.renderScale = 0.5;
      state.behaviorEnabled = false;
      applyPixelRatio();
      post('preview-mode', { fps: state.targetFps });
    }
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
