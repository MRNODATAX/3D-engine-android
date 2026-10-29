/**
 * Optimasi performa renderer VRM.
 *
 * Semua angka yang dilaporkan berasal dari pengukuran nyata (waktu kerja frame dan
 * `renderer.info`), bukan perkiraan. Tidak ada nilai yang dikarang.
 */

/**
 * Governor kualitas adaptif.
 *
 * Sinyal yang dipakai adalah **waktu kerja frame** (update + render), bukan FPS tampil,
 * karena FPS dibatasi sendiri oleh target FPS. Bila kerja frame melebihi anggaran,
 * resolusi render diturunkan bertahap; bila kembali longgar, dinaikkan lagi.
 */
export function createGovernor({ targetFps = 30, steps = [1, 0.85, 0.72, 0.6, 0.5] } = {}) {
  let index = 0;
  let windowMs = 0;
  let windowFrames = 0;
  let overloadMs = 0;
  let headroomMs = 0;
  let lastChange = 'none';

  const budget = () => 1000 / Math.max(5, targetFps);

  return {
    get scale() {
      return steps[index];
    },
    get level() {
      if (index === 0) return 'high';
      if (index <= 2) return 'medium';
      return 'low';
    },
    get index() {
      return index;
    },
    get lastChange() {
      return lastChange;
    },
    setTargetFps(fps) {
      if (Number(fps) > 0) targetFps = Number(fps);
    },
    reset() {
      index = 0;
      windowMs = 0;
      windowFrames = 0;
      overloadMs = 0;
      headroomMs = 0;
      lastChange = 'none';
    },
    /** @param {number} workMs waktu kerja frame dalam milidetik */
    sample(workMs) {
      if (!Number.isFinite(workMs) || workMs <= 0) return { scale: steps[index], changed: 0 };
      windowMs += workMs;
      windowFrames += 1;
      if (windowFrames < 30) return { scale: steps[index], changed: 0 };

      const avg = windowMs / windowFrames;
      windowMs = 0;
      windowFrames = 0;
      const limit = budget();
      let changed = 0;

      if (avg > limit * 0.92) {
        overloadMs += 1;
        headroomMs = 0;
        // Turun setelah ~1 detik berturut-turut melebihi anggaran.
        if (overloadMs >= 2 && index < steps.length - 1) {
          index += 1;
          changed = -1;
          overloadMs = 0;
          lastChange = 'turun';
        }
      } else if (avg < limit * 0.55) {
        headroomMs += 1;
        overloadMs = 0;
        // Naik hanya bila benar-benar lega, agar tidak berosilasi.
        if (headroomMs >= 4 && index > 0) {
          index -= 1;
          changed = 1;
          headroomMs = 0;
          lastChange = 'naik';
        }
      } else {
        overloadMs = 0;
        headroomMs = 0;
      }

      return { scale: steps[index], changed, avgWorkMs: avg, level: this.level };
    },
  };
}

const TEXTURE_KEYS = [
  'map',
  'normalMap',
  'emissiveMap',
  'aoMap',
  'alphaMap',
  'roughnessMap',
  'metalnessMap',
  'matcapTexture',
  'shadeMultiplyTexture',
  'outlineWidthTexture',
  'rimMultiplyTexture',
  'uvAnimationMaskTexture',
];

/**
 * Menurunkan resolusi tekstur model agar hemat memori GPU.
 * Mengembalikan { resized, skipped } berisi jumlah nyata untuk ditampilkan ke pengguna.
 */
export function downscaleTextures(root, maxSize) {
  const result = { resized: 0, skipped: 0, maxSize };
  if (!root || !maxSize) return result;
  const seen = new Set();

  root.traverse((object) => {
    const materials = object.material
      ? (Array.isArray(object.material) ? object.material : [object.material])
      : [];
    for (const material of materials) {
      for (const key of TEXTURE_KEYS) {
        const texture = material?.[key];
        if (!texture || !texture.isTexture || seen.has(texture.uuid)) continue;
        seen.add(texture.uuid);
        const image = texture.image;
        const width = image?.width || image?.videoWidth || 0;
        const height = image?.height || image?.videoHeight || 0;
        if (!width || !height) {
          result.skipped += 1;
          continue;
        }
        const longest = Math.max(width, height);
        if (longest <= maxSize) {
          result.skipped += 1;
          continue;
        }
        const ratio = maxSize / longest;
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(width * ratio));
        canvas.height = Math.max(1, Math.round(height * ratio));
        const context = canvas.getContext('2d');
        if (!context) {
          result.skipped += 1;
          continue;
        }
        try {
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
        } catch (error) {
          result.skipped += 1;
          continue;
        }
        texture.image = canvas;
        texture.needsUpdate = true;
        result.resized += 1;
      }
    }
  });

  return result;
}

/** Statistik nyata untuk halaman Diagnosa dan panel performa. */
export function collectStats(renderer, vrm) {
  const info = renderer?.info;
  const triangles = info?.render?.triangles ?? 0;
  const calls = info?.render?.calls ?? 0;
  const textures = info?.memory?.textures ?? 0;
  const geometries = info?.memory?.geometries ?? 0;

  let bones = 0;
  let meshes = 0;
  vrm?.scene?.traverse((object) => {
    if (object.isSkinnedMesh && object.skeleton) {
      meshes += 1;
      bones = Math.max(bones, object.skeleton.bones.length);
    }
  });

  let springJoints = 0;
  vrm?.springBoneManager?.joints?.forEach(() => {
    springJoints += 1;
  });

  return { triangles, calls, textures, geometries, bones, meshes, springJoints };
}
