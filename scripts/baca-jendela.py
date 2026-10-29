#!/usr/bin/env python3
"""Baca posisi/ukuran jendela avatar dari keluaran `dumpsys window windows`.

Dipakai skrip uji gestur untuk mengetahui di mana tubuh avatar berada sebelum jari
disentuhkan. Keluaran satu baris: `x y lebar tinggi`. Keluar dengan kode 2 bila bingkai
jendela tidak terbaca, supaya uji berhenti dengan alasan jelas, bukan salah hitung.
"""
import re
import sys

POLA_JUDUL = re.compile(r"Window #\d+ Window\{[^}]*MateEngine avatar")
POLA_ATTRS = re.compile(r"mAttrs=\{\((-?\d+),(-?\d+)\)\((\d+)x(\d+)\)")
POLA_FRAME = re.compile(r"mFrame=\[(-?\d+),(-?\d+)\]\[(-?\d+),(-?\d+)\]")


def bingkai(teks: str):
    baris = teks.splitlines()
    awal = next((i for i, l in enumerate(baris) if POLA_JUDUL.search(l)), None)
    if awal is None:
        return None
    blok = []
    for baris_ini in baris[awal:]:
        if blok and re.search(r"Window #\d+ Window\{", baris_ini):
            break
        blok.append(baris_ini)
        if len(blok) > 300:
            break
    isi = "\n".join(blok)
    cocok = POLA_ATTRS.search(isi)
    if cocok:
        x, y, w, h = (int(v) for v in cocok.groups())
        return x, y, w, h
    cocok = POLA_FRAME.search(isi)
    if cocok:
        x1, y1, x2, y2 = (int(v) for v in cocok.groups())
        return x1, y1, x2 - x1, y2 - y1
    return None


def main() -> int:
    teks = sys.stdin.read()
    hasil = bingkai(teks)
    if hasil is None:
        print("bingkai jendela avatar tidak terbaca", file=sys.stderr)
        return 2
    print(" ".join(str(v) for v in hasil))
    return 0


if __name__ == "__main__":
    sys.exit(main())
