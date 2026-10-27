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
node scripts/glb-ke-vrma.mjs \
  --input "$TMP/ual.gltf" --bin "$TMP/ual.bin" \
  --out "$OUT_DIR" --fps 24 \
  --clip Idle_Loop:idle_loop \
  --clip Idle_Talking_Loop:idle_talk \
  --clip Walk_Loop:walk_loop \
  --clip Dance_Loop:dance_loop

echo "== selesai. Berkas di $OUT_DIR:"
ls -l "$OUT_DIR"
