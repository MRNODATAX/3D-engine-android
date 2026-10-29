#!/usr/bin/env python3
"""Pastikan setiap jendela overlay yang tercatat masih berada di dalam layar.

Masukan: baris logcat yang memuat
`jendela siluet WxH di (x, y) = N% dari desain ... layar LEBARxTINGGI`.

Ukuran layar diambil dari log itu sendiri (nilai yang dipakai layanan untuk menghitung posisi).
Argumen opsional `--layar LEBAR TINGGI` menimpanya bila log berasal dari versi lama.

Keluar 0 bila semua baris muat (toleransi 2 px, karena pembulatan inset), 1 bila ada yang
keluar layar, 2 bila tidak ada baris yang terbaca.
"""
import argparse
import re
import sys

POLA = re.compile(
    r"jendela siluet (\d+)x(\d+) di \((-?\d+), (-?\d+)\).*?(?:layar (\d+)x(\d+))?$",
)
# `dumpsys window windows` menulis: mAttrs={(x,y)(WxH) gr=...}
POLA_ATTRS = re.compile(r"mAttrs=\{\((-?\d+),(-?\d+)\)\((\d+)x(\d+)\)")
# `dumpsys window displays` menulis beberapa kali: ... cur=WxH app=WxH ...
POLA_LAYAR = re.compile(r"cur=(\d+)x(\d+)")
TOLERANSI = 2


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--layar", nargs=2, type=int, metavar=("LEBAR", "TINGGI"))
    parser.add_argument(
        "--dumpsys",
        action="store_true",
        help="baca keluaran dumpsys window (mAttrs/cur=) alih-alih logcat",
    )
    args = parser.parse_args()
    layar_paksa = args.layar

    if args.dumpsys:
        teks = sys.stdin.read()
        attrs = POLA_ATTRS.search(teks)
        layar = POLA_LAYAR.search(teks)
        if not attrs or not layar:
            print("dumpsys tidak memuat mAttrs/cur= window avatar")
            return 2
        kiri, atas, lebar, tinggi = (int(v) for v in attrs.groups())
        layar_w, layar_h = (int(v) for v in layar.groups())
        kanan = kiri + lebar
        bawah = atas + tinggi
        if (
            kiri < -TOLERANSI
            or atas < -TOLERANSI
            or kanan > layar_w + TOLERANSI
            or bawah > layar_h + TOLERANSI
        ):
            print(f"jendela ({kiri},{atas}) {lebar}x{tinggi} keluar layar {layar_w}x{layar_h}")
            return 1
        print(f"jendela ({kiri},{atas}) {lebar}x{tinggi} di dalam layar {layar_w}x{layar_h}")
        return 0

    diperiksa = 0
    pelanggaran = []
    for baris in sys.stdin:
        cocok = POLA.search(baris)
        if not cocok:
            continue
        lebar, tinggi, kiri, atas, layar_w_teks, layar_h_teks = cocok.groups()
        lebar, tinggi, kiri, atas = int(lebar), int(tinggi), int(kiri), int(atas)
        if layar_paksa:
            layar_w, layar_h = layar_paksa
        elif layar_w_teks and layar_h_teks:
            layar_w, layar_h = int(layar_w_teks), int(layar_h_teks)
        else:
            print("baris jendela tanpa ukuran layar; jalankan dengan --layar LEBAR TINGGI")
            return 2
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
