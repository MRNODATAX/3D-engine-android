#!/usr/bin/env python3
"""Ukur sudut lengan saat avatar benar-benar diam.

Dulu skrip ini mengambil sudut **terjauh** dari beberapa jejak terakhir, termasuk jejak saat
avatar sedang melambai atau memungut barang. Akibatnya pemeriksaan bisa gagal padahal pose
istirahatnya benar (contoh nyata: 45,3° dan 61,4° saat klip gestur ikut terukur).

Sekarang hanya jejak dengan klip istirahat (`idle*`, `sitting_idle`, `crouch_idle`) yang
dipakai, dan yang dilaporkan adalah **median** — bukan nilai terburuk satu frame.

Sudut diukur dari arah "bawah": 0° = lengan menggantung, 180° = lengan lurus ke atas
(`measure()` di renderer.js). Jadi "tangan tidak terangkat" berarti sudut **di bawah 100°**,
bukan di bawah 45° seperti ambang lama — ambang itu membuat pemeriksaan gagal palsu pada
pose istirahat normal (70°).

Masukan: baris logcat yang mengandung `motion { ... }`.
Keluar 0 bila median < 100°, 1 bila tidak (tangan terangkat saat diam), 2 bila tidak ada data.
"""
import json
import re
import statistics
import sys

POLA = re.compile(r"motion (\{.*\})")
KLIP_ISTIRAHAT = ("idle", "sitting_idle", "crouch_idle", "drive_idle", "swim_idle")
BATAS = 100.0


def main() -> int:
    nilai = []
    dipakai = 0
    for baris in sys.stdin:
        cocok = POLA.search(baris)
        if not cocok:
            continue
        try:
            data = json.loads(cocok.group(1))
        except json.JSONDecodeError:
            continue
        klip = str(data.get("clip") or "")
        if not any(klip.startswith(nama) for nama in KLIP_ISTIRAHAT):
            continue
        sudut = [float(data[k]) for k in ("armLeftDeg", "armRightDeg") if isinstance(data.get(k), (int, float))]
        if not sudut:
            continue
        dipakai += 1
        nilai.extend(sudut)
    if not nilai:
        print("tidak ada jejak klip istirahat")
        return 2
    median = statistics.median(nilai)
    print(f"median {median:.1f} derajat dari {dipakai} jejak istirahat (batas {BATAS:.0f})")
    return 0 if median < BATAS else 1


if __name__ == "__main__":
    sys.exit(main())
