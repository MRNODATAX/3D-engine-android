#!/usr/bin/env python3
"""Periksa bahwa jendela avatar benar-benar mencapai tepi layar setelah digeser.

Masukan (stdin): baris log `geser selesai: jendela 600x1400 di (0, 120) dari layar 1080x2400`.
Keluar dengan status 0 bila setidaknya satu sisi menyentuh tepi layar (toleransi 2 px).
"""
import re
import sys

POLA = re.compile(
    r"jendela (\d+)x(\d+) di \((-?\d+), (-?\d+)\) dari layar (\d+)x(\d+)",
)


def main() -> int:
    teks = sys.stdin.read()
    cocok = POLA.search(teks)
    if not cocok:
        print("baris geser tidak terbaca")
        return 1
    lebar, tinggi, kiri, atas, layar_w, layar_h = (int(v) for v in cocok.groups())
    kanan = kiri + lebar
    bawah = atas + tinggi
    toleransi = 2
    tepi = {
        "kiri": abs(kiri) <= toleransi,
        "kanan": abs(kanan - layar_w) <= toleransi,
        "atas": abs(atas) <= toleransi,
        "bawah": abs(bawah - layar_h) <= toleransi,
    }
    dicapai = [nama for nama, ya in tepi.items() if ya]
    print(
        f"jendela {lebar}x{tinggi} di ({kiri}, {atas}) pada layar {layar_w}x{layar_h}; "
        f"tepi tercapai: {', '.join(dicapai) if dicapai else 'tidak ada'}",
    )
    return 0 if dicapai else 1


if __name__ == "__main__":
    sys.exit(main())
