#!/usr/bin/env python3
"""
Pembuat pratinjau 5 kandidat logo APK Mate Engine.

Kenapa digambar sendiri, bukan model gambar: berkas yang akhirnya dipakai di APK harus vektor
(adaptive icon), jadi kandidat digambar sebagai bentuk geometris murni. Skrip ini memakai
ImageMagick (tanpa dependency Python tambahan) dan menghasilkan PNG 512px per kandidat.

Angka di sini adalah sumber kebenaran untuk preview; setelah satu kandidat dipilih, geometrinya
diterjemahkan ke `app/src/main/res/drawable/ic_launcher_foreground.xml` + `ic_launcher_background.xml`.
"""

import subprocess
import sys
from pathlib import Path

OUT = Path(sys.argv[1] if len(sys.argv) > 1 else "docs/logo-pilihan")
OUT.mkdir(parents=True, exist_ok=True)

CYAN = "#006A66"
CYAN_DARK = "#00423F"
MINT = "#9FF2EA"
CREAM = "#EAFFFD"
WHITE = "#FFFFFF"

SIZE = 512
RADIUS = 118  # sudut kotak peluncur (skala 512 dari 22.5%)


def render(name, draws, background=CYAN, rounded=True):
    """Gambar satu kandidat: latar kotak membulat + daftar primitif ImageMagick."""
    args = ["convert", "-size", f"{SIZE}x{SIZE}", "xc:none"]
    if rounded:
        args += ["-fill", background, "-draw", f"roundrectangle 0,0 {SIZE-1},{SIZE-1} {RADIUS},{RADIUS}"]
    else:
        args += ["-fill", background, "-draw", f"rectangle 0,0 {SIZE},{SIZE}"]
    for fill, draw in draws:
        args += ["-fill", fill, "-stroke", "none", "-draw", draw]
    path = OUT / f"{name}.png"
    args.append(str(path))
    subprocess.run(args, check=True)
    return path


# ------------------------------------------------------------------ A. Lengkung rambut
# Siluet: lengkung rambut luar + wajah + bahu. Paling dekat dengan ikon sekarang, dirapikan.
A = [
    # Kepala + rambut sebagai satu siluet (dome membulat dengan sisi lurus), lalu wajah di atasnya.
    (CREAM, "path 'M 256,74 C 366,74 424,148 424,252 L 424,392 L 356,392 L 356,252 "
            "C 356,176 316,132 256,132 C 196,132 156,176 156,252 L 156,392 L 88,392 "
            "L 88,252 C 88,148 146,74 256,74 Z'"),
    (MINT, "path 'M 256,158 C 320,158 362,206 362,272 L 362,320 C 362,394 316,440 256,440 "
           "C 196,440 150,394 150,320 L 150,272 C 150,206 192,158 256,158 Z'"),
    (CYAN_DARK, "circle 214,272 214,250"),
    (CYAN_DARK, "circle 298,272 298,250"),
    (CYAN_DARK, "path 'M 220,336 C 240,355 272,355 292,336'"),
]

# ------------------------------------------------------------------ B. Balon bicara berwajah
# Balon obrolan (aplikasi = teman + chat AI) dengan mata dan senyum.
B = [
    (CREAM, "path 'M 128,120 L 384,120 C 420,120 444,146 444,182 L 444,306 "
            "C 444,342 420,368 384,368 L 268,368 L 196,432 L 200,368 L 128,368 "
            "C 92,368 68,342 68,306 L 68,182 C 68,146 92,120 128,120 Z'"),
    (CYAN, "circle 200,244 200,220"),
    (CYAN, "circle 312,244 312,220"),
    (CYAN, "path 'M 196,296 C 220,320 292,320 316,296'"),
]

# ------------------------------------------------------------------ C. Hati mata terpejam
# Tema headpat: hati + mata menutup + pipi hangat.
C = [
    (CREAM, "path 'M 256,432 C 120,344 76,268 76,204 C 76,140 124,96 184,96 "
            "C 220,96 244,114 256,136 C 268,114 292,96 328,96 C 388,96 436,140 436,204 "
            "C 436,268 392,344 256,432 Z'"),
    (CYAN, "path 'M 168,236 C 184,254 208,254 224,236'"),
    (CYAN, "path 'M 288,236 C 304,254 328,254 344,236'"),
    (CYAN, "path 'M 232,300 C 246,314 266,314 280,300'"),
    (MINT, "circle 148,286 148,268"),
    (MINT, "circle 364,286 364,268"),
]

# ------------------------------------------------------------------ D. Monogram M bersudut
# Huruf M geometris dari pita tebal + percikan cyan: terbaca sampai 24dp.
D = [
    (CREAM, "path 'M 112,404 L 112,150 L 170,150 L 256,272 L 342,150 L 400,150 "
            "L 400,404 L 344,404 L 344,254 L 268,362 L 244,362 L 168,254 L 168,404 Z'"),
    (MINT, "path 'M 380,96 L 396,132 L 432,148 L 396,164 L 380,200 L 364,164 "
           "L 328,148 L 364,132 Z'"),
]

# ------------------------------------------------------------------ E. Tiga ketuk
# Tiga titik (mengetuk 3×) membentuk lengkung + percikan di ujungnya.
E = [
    # Tiga titik ketukan, tidak bertumpuk, dengan percikan "baru saja dibuka" di atasnya.
    (CREAM, "circle 132,352 132,306"),
    (CREAM, "circle 256,352 256,306"),
    (CREAM, "circle 380,352 380,306"),
    (MINT, "path 'M 256,78 L 276,128 L 326,148 L 276,168 L 256,218 L 236,168 "
           "L 186,148 L 236,128 Z'"),
    (MINT, "path 'M 150,214 L 162,240 L 188,252 L 162,264 L 150,290 L 138,264 "
           "L 112,252 L 138,240 Z'"),
]

CANDIDATES = [
    ("A-lengkung-rambut", A),
    ("B-balon-bicara", B),
    ("C-hati-terpejam", C),
    ("D-monogram-m", D),
    ("E-tiga-ketuk", E),
]

paths = []
for name, draws in CANDIDATES:
    paths.append(render(name, draws))
    print(f"  {name}.png")

# Lembar perbandingan: 5 kandidat bersebelahan dengan label.
sheet = OUT / "00-perbandingan.png"
subprocess.run(
    [
        "montage",
        *[str(p) for p in paths],
        "-tile", "5x1",
        "-geometry", "300x300+16+16",
        "-background", "#F4FBFA",
        "-label", "%t",
        "-pointsize", "20",
        "-fill", "#0B1B1A",
        str(sheet),
    ],
    check=True,
)
print(f"  {sheet.name}")
