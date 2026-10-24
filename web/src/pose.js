/**
 * Pose rileks prosedural.
 *
 * Banyak model VRM disimpan dalam T-pose. Tanpa animasi, avatar akan tampak seperti
 * boneka dengan tangan mendatar, jadi lengan diturunkan perlahan ke pose berdiri netral.
 * Rotasi bekerja pada normalized humanoid bone three-vrm: lengan kiri mengarah +X,
 * sehingga rotasi Z negatif menurunkannya, dan sebaliknya untuk lengan kanan.
 */
export const RELAXED_POSE = {
  leftUpperArm: { z: -1.15 },
  rightUpperArm: { z: 1.15 },
  leftLowerArm: { y: -0.22 },
  rightLowerArm: { y: 0.22 },
  leftShoulder: { z: -0.06 },
  rightShoulder: { z: 0.06 },
};

/**
 * Menerapkan pose rileks dengan campuran bertahap agar tidak melompat saat model dimuat.
 * @param {import('@pixiv/three-vrm').VRM} vrm
 * @param {number} blend 0..1
 */
export function applyRelaxedPose(vrm, blend = 1) {
  const humanoid = vrm?.humanoid;
  if (!humanoid) return;
  const weight = Math.max(0, Math.min(1, blend));

  for (const [boneName, rotation] of Object.entries(RELAXED_POSE)) {
    const bone = humanoid.getNormalizedBoneNode(boneName);
    if (!bone) continue;
    if (rotation.x) bone.rotation.x += rotation.x * weight;
    if (rotation.y) bone.rotation.y += rotation.y * weight;
    if (rotation.z) bone.rotation.z += rotation.z * weight;
  }
}
