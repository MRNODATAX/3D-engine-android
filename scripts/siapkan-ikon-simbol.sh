#!/usr/bin/env bash
# Ambil ikon Material Symbols (outlined, 24px) lalu ubah menjadi Vector Drawable Android.
#
# Asal: https://github.com/google/material-design-icons (Apache License 2.0).
# Atribusi ditulis di docs/lisensi/APACHE-2.0-material-symbols.md.
#
# Pemakaian:
#   scripts/siapkan-ikon-simbol.sh home person chat_bubble animation settings
#
# Butuh `gh` (sudah terautentikasi). Hasil:
#   app/src/main/res/drawable/ic_symbol_<nama>.xml
set -euo pipefail

REPO="google/material-design-icons"
OUT="app/src/main/res/drawable"
mkdir -p "$OUT"

if [ "$#" -eq 0 ]; then
  echo "sebutkan nama ikon, mis.: $0 home person" >&2
  exit 1
fi

for name in "$@"; do
  path="symbols/web/${name}/materialsymbolsoutlined/${name}_24px.svg"
  b64="$(gh api "repos/${REPO}/contents/${path}" --jq .content 2>/dev/null || true)"
  if [ -z "$b64" ]; then
    echo "✗ ${name}: tidak ditemukan di ${REPO}/${path}" >&2
    continue
  fi
  tmp="$(mktemp)"
  printf '%s' "$b64" | base64 -d > "$tmp"
  python3 - "$tmp" "$OUT/ic_symbol_${name}.xml" "$name" <<'PY'
import re
import sys

src, dst, name = sys.argv[1], sys.argv[2], sys.argv[3]
svg = open(src, encoding='utf-8').read()

# Material Symbols memakai viewBox "0 -960 960 960". Android Vector Drawable tidak punya
# offset viewport, jadi offset itu dipindahkan ke <group translateX/translateY>.
view = re.search(r'viewBox="([-\d.]+) ([-\d.]+) ([-\d.]+) ([-\d.]+)"', svg)
if not view:
    sys.exit(f'✗ {name}: viewBox tidak ditemukan')
min_x, min_y, vb_w, vb_h = (float(v) for v in view.groups())

paths = []
for match in re.finditer(r'<path\b([^>]*)/?>', svg):
    attrs = match.group(1)
    d = re.search(r'\sd="([^"]+)"', attrs)
    if d:
        paths.append((d.group(1).strip(), 'evenodd' in attrs))
if not paths:
    sys.exit(f'✗ {name}: tidak ada path di dalam SVG')

lines = [
    f'<!-- Ikon Material Symbols (outlined, 24px): {name}',
    '     Sumber: https://github.com/google/material-design-icons',
    '     Lisensi: Apache License 2.0 (lihat docs/lisensi/APACHE-2.0-material-symbols.md).',
    '     Dibuat oleh scripts/siapkan-ikon-simbol.sh — jangan disunting tangan. -->',
    '<vector xmlns:android="http://schemas.android.com/apk/res/android"',
    '    android:width="24dp"',
    '    android:height="24dp"',
    f'    android:viewportWidth="{vb_w:g}"',
    f'    android:viewportHeight="{vb_h:g}">',
]

grouped = bool(min_x or min_y)
if grouped:
    lines.append('    <group')
    if min_x:
        lines.append(f'        android:translateX="{-min_x:g}"')
    if min_y:
        lines.append(f'        android:translateY="{-min_y:g}">')
    else:
        lines[-1] = lines[-1].rstrip() + '>'

pad = '        ' if grouped else '    '
for d, evenodd in paths:
    lines.append(f'{pad}<path')
    lines.append(f'{pad}    android:fillColor="#FF000000"')
    if evenodd:
        lines.append(f'{pad}    android:fillType="evenOdd"')
    lines.append(f'{pad}    android:pathData="{d}" />')

if grouped:
    lines.append('    </group>')
lines.append('</vector>')

open(dst, 'w', encoding='utf-8').write('\n'.join(lines) + '\n')
print(f'✓ {name}: {len(paths)} path -> {dst}')
PY
  rm -f "$tmp"
done
