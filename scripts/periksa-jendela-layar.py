#!/usr/bin/env python3
"""Pastikan setiap jendela overlay yang tercatat masih berada di dalam layar.

Masukan: baris logcat yang memuat `jendela siluet WxH di (x, y)`.
Argumen: `--layar LEBAR TINGGI` sesuai orientasi yang sedang diuji.

Keluar 0 bila semua baris muat (toleransi 2 px, karena pembulatan inset), 1 bila ada yang
keluar layar, 2 bila tidak ada baris yang terbaca.
"""
import argparse
import re
import sys

POLA = re.compile(r"jendela siluet (\d+)x(\d+) di \((-?\d+), (-?\d+)\)")
TOLERANSI = 2


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--layar", nargs=2, type=int, metavar=("LEBAR", "TINGGI"), required=True)
    args = parser.parse_args()
    layar_w, layar_h = args.layar

    diperiksa = 0
    pelanggaran = []
    for baris in sys.stdin:
        cocok = POLA.search(baris)
        if not cocok:
            continue
        lebar, tinggi, kiri, atas = (int(v) for v in cocok.groups())
        diperiksa += 1
        kanan = kiri + lebar
        bawah = atas + tinggi
        if (
            kiri < -TOLERANSI
            or atas < -TOLERANSI
            or kanan > layar_w + TOLERANSI
            or bawah > layar_h + TOLERANSI
        ):
            pelanggaran.append(f"({kiri},{atas}) {lebar}x{tinggi} pada layar {layar_w}x{layar_h}")

    if diperiksa == 0:
        print("tidak ada baris jendela siluet")
        return 2
    if pelanggaran:
        print(f"{len(pelanggaran)} dari {diperiksa} jendela keluar layar: {pelanggaran[:3]}")
        return 1
    print(f"{diperiksa} jendela semuanya di dalam layar {layar_w}x{layar_h}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
