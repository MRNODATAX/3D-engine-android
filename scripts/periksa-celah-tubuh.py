#!/usr/bin/env python3
"""Baca jejak `motion {...}` dari logcat, laporkan celah tubuh ke tepi kanvas.

Renderer mengirim `bodyGap {top, bottom, left, right}` (piksel CSS) tiap 5 detik.
Angka ini dipakai uji emulator untuk membuktikan tubuh tidak terpotong — mis. kaki
tidak hilang saat avatar duduk.

Pemakaian:
    adb logcat -d | grep -o 'motion {.*}' | python3 scripts/periksa-celah-tubuh.py --seated
    ... --seated --tegas      # keluar dengan kode 1 bila ada tepi <= 1 px

Tanpa `--seated`, dipakai jejak terakhir apa pun posisinya.
"""
import json
import re
import sys

MIN_GAP_PX = 1


def main() -> int:
    only_seated = "--seated" in sys.argv
    strict = "--tegas" in sys.argv
    best = None
    for line in sys.stdin:
        match = re.search(r"motion (\{.*\})", line)
        if not match:
            continue
        try:
            data = json.loads(match.group(1))
        except json.JSONDecodeError:
            continue
        if only_seated and not data.get("seated"):
            continue
        gap = data.get("bodyGap") or {}
        if "top" in gap and "bottom" in gap:
            best = gap
    if best is None:
        return 2
    print(json.dumps(best, separators=(",", ":")))
    if strict and (best["top"] <= MIN_GAP_PX or best["bottom"] <= MIN_GAP_PX):
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
