/**
 * Pose rileks prosedural.
 *
 * Banyak model VRM disimpan dalam T-pose. Tanpa animasi, avatar akan tampak seperti
 * boneka dengan tangan mendatar, jadi lengan diturunkan ke pose berdiri netral.
 *
 * Rotasi bekerja pada normalized humanoid bone three-vrm: lengan kiri mengarah +X,
 * sehingga rotasi Z negatif menurunkannya, dan sebaliknya untuk lengan kanan.
 *
 * Penting: nilai di sini adalah **offset terhadap pose istirahat**, bukan penambahan
 * berulang. Menambahkan setiap frame akan membuat lengan berputar terus (bug yang
 * pernah terjadi dan kini dijaga oleh uji render).
 */
export const RELAXED_POSE = {
  leftUpperArm: { z: -1.15 },
  rightUpperArm: { z: 1.15 },
  // Sedikit tekukan siku; bila terlalu besar, tangan bergeser ke depan perut.
  leftLowerArm: { y: -0.07 },
  rightLowerArm: { y: 0.07 },
  leftShoulder: { z: -0.06 },
  rightShoulder: { z: 0.06 },
};

/** Menyimpan rotasi istirahat bone sebelum pose atau animasi menyentuhnya. */
export function captureRestPose(vrm) {
  const humanoid = vrm?.humanoid;
  const rest = {};
  if (!humanoid) return rest;
  for (const boneName of Object.keys(RELAXED_POSE)) {
    const bone = humanoid.getNormalizedBoneNode(boneName);
    if (!bone) continue;
    rest[boneName] = { x: bone.rotation.x, y: bone.rotation.y, z: bone.rotation.z };
  }
  return rest;
}

/**
 * Menerapkan pose rileks secara absolut: rotasi = rotasi istirahat + offset × blend.
 * Dipanggil sebelum mixer.update, sehingga bone yang dianimasikan tetap mengikuti klip.
 * @param {import('@pixiv/three-vrm').VRM} vrm
 * @param {number} blend 0..1
 * @param {Record<string, {x:number,y:number,z:number}>} rest hasil captureRestPose
 */
export function applyRelaxedPose(vrm, blend = 1, rest = {}) {
  const humanoid = vrm?.humanoid;
  if (!humanoid) return;
  const weight = Math.max(0, Math.min(1, blend));

  for (const [boneName, rotation] of Object.entries(RELAXED_POSE)) {
    const bone = humanoid.getNormalizedBoneNode(boneName);
    if (!bone) continue;
    const base = rest[boneName] ?? { x: 0, y: 0, z: 0 };
    bone.rotation.x = base.x + (rotation.x ?? 0) * weight;
    bone.rotation.y = base.y + (rotation.y ?? 0) * weight;
    bone.rotation.z = base.z + (rotation.z ?? 0) * weight;
  }
}
