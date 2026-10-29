#!/usr/bin/env bash
# Mengunduh paket animasi CC0 (Quaternius Universal Animation Library, mirror GitHub) lalu
# mengonversi klip pilihan menjadi .vrma untuk aplikasi.
#
# Kenapa lewat API GitHub, bukan raw.githubusercontent.com: sandbox/CI hanya mengizinkan
# api.github.com. Skrip ini memakai Contents API + Blobs API.
set -euo pipefail

REPO="J-Ponzo/gltf-universal-animation-library"
OUT_DIR="${1:-app/src/main/assets/animations}"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

fetch_blob() {
  local path="$1" dest="$2"
  local sha
  sha=$(curl -s -m 60 "https://api.github.com/repos/$REPO/contents/$path" \
    | python3 -c "import json,sys;print(json.load(sys.stdin)['sha'])")
  curl -s -m 180 "https://api.github.com/repos/$REPO/git/blobs/$sha" \
    | python3 -c "
import json,sys,base64
d=json.load(sys.stdin)
sys.stdout.buffer.write(base64.b64decode(d['content']))
" > "$dest"
  echo "  $path -> $(basename "$dest") ($(stat -c%s "$dest") byte)"
}

echo "== mengunduh paket CC0"
fetch_blob "glTF/AnimationLibrary_Godot_Standard.gltf" "$TMP/ual.gltf"
fetch_blob "glTF/AnimationLibrary_Godot_Standard.bin" "$TMP/ual.bin"

echo "== mengonversi klip ke .vrma"
# `--in-place` memaku sumbu X/Z pinggul: klip berjalan tidak lagi meluncur keluar jendela overlay.
node scripts/glb-ke-vrma.mjs \
  --input "$TMP/ual.gltf" --bin "$TMP/ual.bin" \
  --out "$OUT_DIR" --fps 24 --in-place \
  --clip Idle_Loop:idle_loop \
  --clip Idle_Talking_Loop:idle_talk \
  --clip Walk_Loop:walk_loop \
  --clip Dance_Loop:dance_loop \
  --clip Interact:interact \
  --clip Idle_Torch_Loop:idle_torch \
  --clip Spell_Simple_Idle_Loop:spell_idle \
  --clip Sitting_Enter:sitting_enter \
  --clip Sitting_Idle_Loop:sitting_idle \
  --clip Sitting_Exit:sitting_exit \
  --clip Sitting_Talking_Loop:sitting_talk \
  --clip Crouch_Idle_Loop:crouch_idle \
  --clip Jump_Start:jump_start \
  --clip Jump_Land:jump_land \
  --clip Jump_Loop:jump_loop \
  --clip Push_Loop:push_loop \
  --clip Walk_Formal_Loop:walk_formal \
  --clip Jog_Fwd_Loop:jog_loop \
  --clip Fixing_Kneeling:kneel_fix \
  --clip Crouch_Fwd_Loop:crouch_walk \
  --clip Driving_Loop:drive_idle \
  --clip Sprint_Loop:sprint_loop \
  --clip Swim_Idle_Loop:swim_idle \
  --clip Swim_Fwd_Loop:swim_fwd \
  --clip PickUp_Table:pickup \
  --clip Spell_Simple_Enter:spell_enter \
  --clip Spell_Simple_Exit:spell_exit \
  --clip Spell_Simple_Shoot:spell_shoot \
  --clip Roll:roll

echo "== selesai. Berkas di $OUT_DIR:"
ls -l "$OUT_DIR"
