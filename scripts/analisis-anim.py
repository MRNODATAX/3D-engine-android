#!/usr/bin/env python3
"""Analisis kurva otot humanoid pada berkas .anim Unity milik Mate Engine.

Tujuan: mengukur *karakter gerak* (amplitudo, frekuensi dominan, durasi) dari klip asli Mate
Engine, lalu memakainya untuk mengkalibrasi generator gerak prosedural kita
(`web/src/motion.js`).

Berkas .anim TIDAK disimpan di repo ini (lisensi Mate Engine melarang redistribusi aset).
Skrip ini hanya membaca berkas milik pengguna dan mencetak angka.

Pemakaian:
    python3 scripts/analisis-anim.py berkas1.anim berkas2.anim ...
    python3 scripts/analisis-anim.py --markdown docs/gerak-kalibrasi.md /path/ke/*.anim
"""

from __future__ import annotations

import argparse
import cmath
import math
import re
import sys
from dataclasses import dataclass, field

# --------------------------------------------------------------------------------------
# Pemetaan nama otot Unity -> parameter di motion.js
# Nilai "ours" adalah pengaturan saat ini di web/src/motion.js (radian, Hz).
# --------------------------------------------------------------------------------------
TARGETS = {
    "Chest Front-Back": ("breath / chest.x", 0.026, 0.22),
    "Spine Front-Back": ("breath / spine.x", 0.009, 0.22),
    "Spine Left-Right": ("sway / spine.z", 0.022, 0.10),
    "Hips Twist Left-Right": ("sway / hips.z", 0.038, 0.10),
    "Head Turn Left-Right": ("look / head.y", 0.275, 0.0),
    "Head Nod Down-Up": ("look / head.x", 0.20, 0.0),
    "Left Arm Down-Up": ("arm / leftUpperArm.z", 0.045, 0.14),
    "Right Arm Down-Up": ("arm / rightUpperArm.z", 0.045, 0.14),
    "Left Upper Leg Front-Back": ("walk / leftUpperLeg.x", 0.42, 1.60),
    "Right Upper Leg Front-Back": ("walk / rightUpperLeg.x", 0.42, 1.60),
}

CURVE_BLOCK = re.compile(r"attribute: (.+)")
KEYFRAME = re.compile(r"time: (-?[\d.eE+-]+)\s*\n\s*value: (-?[\d.eE+-]+)")
# Satu kurva = satu blok "- curve:" ... sampai blok berikutnya.
# Dua format penulisan Unity: "- curve:" (baru) dan "- serializedVersion:" (lama).
BLOCK_SPLIT = re.compile(r"\n  - (?:curve:|serializedVersion:)")


@dataclass
class Curve:
    attribute: str = ""
    path: str = ""
    times: list[float] = field(default_factory=list)
    values: list[float] = field(default_factory=list)

    @property
    def amplitude(self) -> float:
        return max(self.values) - min(self.values) if self.values else 0.0

    @property
    def duration(self) -> float:
        return (self.times[-1] - self.times[0]) if len(self.times) > 1 else 0.0

    def dominant_frequency(self) -> float:
        """Frekuensi (Hz) dengan energi DFT terbesar, dihitung manual tanpa numpy."""
        n = len(self.values)
        duration = self.duration
        if n < 8 or duration <= 0:
            return 0.0
        mean = sum(self.values) / n
        centered = [v - mean for v in self.values]
        dt = duration / (n - 1)
        best_freq, best_mag = 0.0, 0.0
        # Frekuensi 0,1–4 Hz cukup untuk gerak tubuh; resolusi 0,05 Hz.
        steps = int(4.0 / 0.05)
        for step in range(1, steps + 1):
            freq = step * 0.05
            acc = 0j
            for index, value in enumerate(centered):
                acc += value * cmath.exp(-2j * math.pi * freq * index * dt)
            magnitude = abs(acc) / n
            if magnitude > best_mag:
                best_mag, best_freq = magnitude, freq
        return best_freq


def parse_anim(path: str) -> tuple[str, list[Curve]]:
    with open(path, encoding="utf-8", errors="ignore") as handle:
        text = handle.read()
    name_match = re.search(r"m_Name: (.+)", text)
    name = name_match.group(1).strip() if name_match else path

    curves: list[Curve] = []
    seen: set[tuple[str, str]] = set()
    for block in BLOCK_SPLIT.split(text)[1:]:
        attr = CURVE_BLOCK.search(block)
        if not attr:
            continue
        attribute = attr.group(1).strip().strip('"')
        path_match = re.search(r"path: (.+)", block)
        path = path_match.group(1).strip() if path_match else ""
        # Berkas Unity menulis kurva yang sama di m_FloatCurves dan m_EditorCurves.
        if (attribute, path) in seen:
            continue
        seen.add((attribute, path))
        curve = Curve(attribute=attribute, path=path)
        for time_str, value_str in KEYFRAME.findall(block):
            curve.times.append(float(time_str))
            curve.values.append(float(value_str))
        if curve.values:
            curves.append(curve)
    return name, curves


def muscle_to_degrees(attribute: str, amplitude: float) -> float:
    """Perkiraan kasar; Unity tidak mempublikasikan pemetaan otot -> derajat.

    Nilai otot humanoid dinormalisasi ke -1..1 di mana 1 berarti batas sendi. Untuk sebagian
    besar sendi tubuh, batas itu setara 60-90 derajat. Kita pakai 75 derajat sebagai titik
    tengah dan menyebutnya perkiraan, bukan nilai pasti.
    """
    del attribute
    return math.degrees(amplitude * 0.5 * math.radians(75))


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("files", nargs="+")
    parser.add_argument("--markdown", help="tulis tabel ke berkas markdown")
    args = parser.parse_args()

    rows: list[str] = []
    for path in args.files:
        try:
            name, curves = parse_anim(path)
        except OSError as error:
            print(f"gagal membaca {path}: {error}", file=sys.stderr)
            continue
        print(f"\n=== {name} ({len(curves)} kurva)")
        rows.append(f"### {name}\n")
        rows.append("| Kurva otot | Amplitudo (unit otot) | ± Derajat | Frekuensi (Hz) | Durasi (s) |")
        rows.append("| --- | --- | --- | --- | --- |")
        interesting = []
        for curve in curves:
            if curve.attribute not in TARGETS:
                continue
            freq = curve.dominant_frequency()
            interesting.append((curve, freq))
        interesting.sort(key=lambda item: item[0].amplitude, reverse=True)
        for curve, freq in interesting[:12]:
            degrees = muscle_to_degrees(curve.attribute, curve.amplitude)
            print(
                f"{curve.attribute:32s} amp={curve.amplitude:.3f} "
                f"(~{degrees:5.1f}°) freq={freq:.2f}Hz dur={curve.duration:.2f}s"
            )
            rows.append(
                f"| {curve.attribute} | {curve.amplitude:.3f} | {degrees:.1f} | {freq:.2f} | {curve.duration:.2f} |"
            )
        rows.append("")

        print("  perbandingan dengan motion.js:")
        rows.append("| Parameter kita | Sekarang | Terukur | Saran |")
        rows.append("| --- | --- | --- | --- |")
        for curve, freq in interesting[:8]:
            target = TARGETS[curve.attribute]
            label, ours, ours_freq = target
            degrees = muscle_to_degrees(curve.attribute, curve.amplitude)
            ours_deg = math.degrees(ours)
            suggestion = "pertahankan"
            if degrees > 0 and ours_deg > 0.05:
                # Kedua angka adalah amplitudo (bukan puncak-ke-puncak), jadi bisa dibandingkan langsung.
                ratio = degrees / ours_deg
                if ratio > 1.5:
                    suggestion = f"naikkan ~{ratio:.1f}x"
                elif ratio < 0.7:
                    suggestion = f"turunkan ~{ratio:.1f}x"
            print(f"    {label:26s} {ours_deg:5.1f}°  vs  {degrees:5.1f}°  -> {suggestion}")
            rows.append(f"| {label} | {math.degrees(ours):.1f}° | {degrees:.1f}° | {suggestion} |")
        rows.append("")

    if args.markdown:
        with open(args.markdown, "w", encoding="utf-8") as handle:
            handle.write("\n".join(rows))
        print(f"\nTabel ditulis ke {args.markdown}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
