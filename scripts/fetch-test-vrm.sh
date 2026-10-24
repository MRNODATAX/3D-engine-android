#!/usr/bin/env bash
# Mengambil model uji berlisensi redistribusi (lihat docs/research/mate-engine-reference.md).
# Tidak disimpan di Git agar repo tetap ringan; dipakai build debug + uji renderer.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SHA="12c2b97e95e700783a6a550dc0eee2d7880aeedccef9ae67bc4c5a2f0f2631a2"
URL="https://api.github.com/repos/pixiv/three-vrm/contents/packages/three-vrm/examples/models/VRM1_Constraint_Twist_Sample.vrm"
OUT_DIR="${1:-$ROOT/app/src/main/assets/testmodels}"
OUT="$OUT_DIR/vrm1-twist-sample.vrm"

if [ -f "$OUT" ] && [ "$(sha256sum "$OUT" | cut -d' ' -f1)" = "$SHA" ]; then
  echo "model uji sudah ada: $OUT"
  exit 0
fi

mkdir -p "$OUT_DIR"
TMP="$(mktemp)"
curl -fsSL -H "Accept: application/vnd.github.raw" ${GITHUB_TOKEN:+-H "Authorization: token $GITHUB_TOKEN"} "$URL" -o "$TMP"
echo "$SHA  $TMP" | sha256sum -c -
mv "$TMP" "$OUT"
echo "model uji tersimpan: $OUT ($(du -h "$OUT" | cut -f1))"

VRMA_SHA="38d0fd12d61e896f1a970b5e358ebb41a96c8d5ee8e284496ea18f0ba1f04e7b"
VRMA_URL="https://api.github.com/repos/pixiv/three-vrm/contents/packages/three-vrm-animation/examples/models/test.vrma"
VRMA_OUT="$ROOT/web/test-fixtures/test.vrma"
if [ ! -f "$VRMA_OUT" ]; then
  mkdir -p "$(dirname "$VRMA_OUT")"
  curl -fsSL -H "Accept: application/vnd.github.raw" ${GITHUB_TOKEN:+-H "Authorization: token $GITHUB_TOKEN"} "$VRMA_URL" -o "$VRMA_OUT"
  echo "$VRMA_SHA  $VRMA_OUT" | sha256sum -c -
  echo "animasi uji tersimpan: $VRMA_OUT ($(du -h "$VRMA_OUT" | cut -f1))"
fi

# Untuk build Android, animasi juga disertakan sebagai aset aplikasi (dipakai tangkapan layar CI).
if [[ "$OUT_DIR" == *"app/src/main/assets"* ]]; then
  cp "$VRMA_OUT" "$OUT_DIR/test.vrma"
  echo "animasi uji disalin ke aset: $OUT_DIR/test.vrma"
fi
