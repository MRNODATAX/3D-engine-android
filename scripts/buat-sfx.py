#!/usr/bin/env python3
"""Membuat efek suara reaksi untuk overlay.

Kenapa sintesis sendiri: paket suara Mate Engine tidak boleh didistribusikan (LICENSE.md mereka
melarang), dan tidak ada paket CC0 berisi vokal pendek yang benar-benar layak. Jadi semua bunyi
di sini dibuat dari rumus di bawah — nol byte aset pihak ketiga.

Semua keluaran: mono, 16 000 Hz, PCM 16-bit, puncak −9 dBFS, fade 8 ms di kedua ujung.
Resepnya sengaja ditulis apa adanya supaya hasilnya bisa dibangun ulang dan diperiksa
(SHA-256 dicatat di docs/aset-suara.md).

Pemakaian:
    python3 scripts/buat-sfx.py            # tulis ke app/src/main/res/raw
    python3 scripts/buat-sfx.py --check    # hanya periksa hash, tidak menulis
"""
from __future__ import annotations

import argparse
import hashlib
import math
import random
import struct
import sys
import wave
from pathlib import Path

RATE = 16000
# −9 dBFS: sengaja lebih pelan dari batas teknis. Efek reaksi terdengar di samping klik UI yang
# puncaknya 0,14–0,22 (lihat me_ui_click.wav), tanpa membuat kaget di telinga.
PEAK = 10 ** (-9 / 20)
OUT_DIR = Path(__file__).resolve().parent.parent / "app/src/main/res/raw"
PREFIX = "me_"


# --- blok bangunan ----------------------------------------------------------


def seconds(duration: float) -> int:
    return int(round(duration * RATE))


def noise(count: int, seed: int) -> list[float]:
    rng = random.Random(seed)
    return [rng.uniform(-1.0, 1.0) for _ in range(count)]


def lowpass(signal: list[float], cutoff: float) -> list[float]:
    """Filter satu kutub; cukup untuk membentuk warna derau, bukan untuk kualitas studio."""
    a = 1 - math.exp(-2 * math.pi * cutoff / RATE)
    out, y = [], 0.0
    for x in signal:
        y += a * (x - y)
        out.append(y)
    return out


def highpass(signal: list[float], cutoff: float) -> list[float]:
    low = lowpass(signal, cutoff)
    return [x - l for x, l in zip(signal, low)]


def tone(count: int, freq_at, amp_at, phase_offset: float = 0.0, harmonics=((1, 1.0),)) -> list[float]:
    """Nada dengan frekuensi & amplitudo sebagai fungsi waktu (detik)."""
    out = []
    phase = phase_offset
    for i in range(count):
        t = i / RATE
        phase += 2 * math.pi * freq_at(t) / RATE
        value = 0.0
        for multiple, weight in harmonics:
            value += weight * math.sin(phase * multiple)
        out.append(value * amp_at(t))
    return out


def mix(*tracks: list[float]) -> list[float]:
    length = max(len(track) for track in tracks)
    out = [0.0] * length
    for track in tracks:
        for i, value in enumerate(track):
            out[i] += value
    return out


def envelope(count: int, attack: float, decay: float, sustain: float = 0.0) -> list[float]:
    """Amplop linear: naik `attack` detik, turun eksponensial sepanjang sisa durasi."""
    attack_samples = max(1, seconds(attack))
    out = []
    for i in range(count):
        if i < attack_samples:
            out.append(i / attack_samples)
            continue
        remaining = max(0.0, (count - i) / RATE)
        out.append(max(sustain, math.exp(-remaining / max(0.02, decay))))
    return out


def shaped(signal: list[float], env: list[float]) -> list[float]:
    return [x * e for x, e in zip(signal, env)]


def bursts(count: int, pieces: list[tuple[float, float, callable]]) -> list[float]:
    """Gabungkan potongan berurutan: (mulai detik, durasi detik, pembuat sinyal)."""
    out = [0.0] * count
    for start, duration, factory in pieces:
        start_at = seconds(start)
        chunk = factory(seconds(duration))
        for i, value in enumerate(chunk):
            if start_at + i < count:
                out[start_at + i] += value
    return out


# --- resep ------------------------------------------------------------------


def sigh(duration: float = 0.85) -> list[float]:
    count = seconds(duration)
    air = lowpass(noise(count, seed=11), 900)
    return shaped(air, envelope(count, 0.12, duration * 0.45))


def sigh_low(duration: float = 0.95) -> list[float]:
    count = seconds(duration)
    air = lowpass(noise(count, seed=12), 520)
    return shaped(air, envelope(count, 0.18, duration * 0.5))


def yawn(duration: float = 1.2) -> list[float]:
    count = seconds(duration)
    voice = tone(
        count,
        freq_at=lambda t: 205 - 70 * min(1.0, t / duration),
        amp_at=lambda t: 0.9,
        harmonics=((1, 1.0), (2, 0.22)),
    )
    air = lowpass(noise(count, seed=13), 1100)
    return shaped(mix(voice, [x * 0.5 for x in air]), envelope(count, 0.26, duration * 0.42))


def tongue_click(duration: float = 0.18) -> list[float]:
    count = seconds(duration)
    click = shaped(
        highpass(noise(seconds(0.012), seed=14), 2000),
        envelope(seconds(0.012), 0.001, 0.006),
    )
    tock = shaped(
        tone(seconds(0.03), freq_at=lambda t: 780, amp_at=lambda t: 1.0),
        envelope(seconds(0.03), 0.001, 0.010),
    )
    return bursts(count, [
        (0.0, 0.012, lambda n: click[:n]),
        (0.0, 0.03, lambda n: tock[:n]),
        (0.11, 0.012, lambda n: click[:n]),
        (0.11, 0.03, lambda n: tock[:n]),
    ])


def huff_hard(duration: float = 0.34) -> list[float]:
    count = seconds(duration)
    air = lowpass(highpass(noise(count, seed=15), 700), 2400)
    return shaped(air, envelope(count, 0.012, duration * 0.3))


def hmph(duration: float = 0.3) -> list[float]:
    count = seconds(duration)
    voice = tone(
        count,
        freq_at=lambda t: 215 - 65 * min(1.0, t / duration),
        amp_at=lambda t: 0.95,
        harmonics=((1, 1.0), (2, 0.25), (3, 0.1)),
    )
    air = lowpass(noise(count, seed=16), 950)
    return shaped(mix(voice, [x * 0.35 for x in air]), envelope(count, 0.02, duration * 0.35))


def hum_soft(duration: float = 0.7) -> list[float]:
    count = seconds(duration)
    voice = tone(
        count,
        freq_at=lambda t: 196 + 4 * math.sin(2 * math.pi * 5 * t),
        amp_at=lambda t: 0.9,
        harmonics=((1, 1.0), (1.5, 0.25)),
    )
    return shaped(voice, envelope(count, 0.12, duration * 0.4))


def mmm(duration: float = 0.65) -> list[float]:
    count = seconds(duration)
    voice = tone(
        count,
        freq_at=lambda t: 160 + 2 * math.sin(2 * math.pi * 4 * t),
        amp_at=lambda t: 1.0,
        harmonics=((1, 1.0), (2, 0.4), (3, 0.15)),
    )
    return shaped(voice, envelope(count, 0.1, duration * 0.45))


def eep(duration: float = 0.12) -> list[float]:
    count = seconds(duration)
    voice = tone(count, freq_at=lambda t: 520 + 240 * (t / duration), amp_at=lambda t: 1.0,
                 harmonics=((1, 1.0), (2, 0.2)))
    return shaped(voice, envelope(count, 0.008, duration * 0.5))


def gasp(duration: float = 0.26) -> list[float]:
    count = seconds(duration)
    air = lowpass(highpass(noise(count, seed=17), 1200), 3200)
    return shaped(air, envelope(count, 0.015, duration * 0.35))


def _giggle_burst(n: int, freq: float, seed: int) -> list[float]:
    voice = tone(n, freq_at=lambda t: freq + 20 * math.sin(2 * math.pi * 12 * t), amp_at=lambda t: 1.0,
                 harmonics=((1, 1.0), (2, 0.3)))
    air = lowpass(noise(n, seed=seed), 2000)
    return shaped(mix(voice, [x * 0.2 for x in air]), envelope(n, 0.01, (n / RATE) * 0.5))


def giggle_3(duration: float = 0.45) -> list[float]:
    count = seconds(duration)
    return bursts(count, [
        (0.0, 0.10, lambda n: _giggle_burst(n, 620, 21)),
        (0.15, 0.10, lambda n: _giggle_burst(n, 700, 22)),
        (0.30, 0.12, lambda n: _giggle_burst(n, 660, 23)),
    ])


def giggle_short(duration: float = 0.26) -> list[float]:
    count = seconds(duration)
    return bursts(count, [
        (0.0, 0.09, lambda n: _giggle_burst(n, 640, 24)),
        (0.13, 0.10, lambda n: _giggle_burst(n, 690, 25)),
    ])


def chime_up(duration: float = 0.55) -> list[float]:
    count = seconds(duration)
    return bursts(count, [
        (0.0, 0.35, lambda n: shaped(
            tone(n, freq_at=lambda t: 523.25, amp_at=lambda t: 1.0, harmonics=((1, 1.0), (2, 0.3))),
            envelope(n, 0.005, 0.12))),
        (0.11, 0.35, lambda n: shaped(
            tone(n, freq_at=lambda t: 659.25, amp_at=lambda t: 0.9, harmonics=((1, 1.0), (2, 0.25))),
            envelope(n, 0.005, 0.12))),
        (0.22, 0.33, lambda n: shaped(
            tone(n, freq_at=lambda t: 783.99, amp_at=lambda t: 0.8, harmonics=((1, 1.0), (2, 0.2))),
            envelope(n, 0.005, 0.14))),
    ])


def boing(duration: float = 0.34) -> list[float]:
    count = seconds(duration)

    def freq(t: float) -> float:
        # Naik cepat lalu turun: "boing" bukan sekadar glissando turun.
        if t < 0.06:
            return 300 + (520 - 300) * (t / 0.06)
        return 520 - (520 - 250) * ((t - 0.06) / max(0.01, duration - 0.06))

    def amp(t: float) -> float:
        return 1.0 + 0.25 * math.sin(2 * math.pi * 12 * t)

    voice = tone(count, freq_at=freq, amp_at=amp, harmonics=((1, 1.0), (2, 0.25)))
    return shaped(voice, envelope(count, 0.008, duration * 0.4))


def blip_soft(duration: float = 0.2) -> list[float]:
    count = seconds(duration)
    return bursts(count, [
        (0.0, 0.06, lambda n: shaped(
            tone(n, freq_at=lambda t: 880, amp_at=lambda t: 1.0),
            envelope(n, 0.004, 0.03))),
        (0.075, 0.09, lambda n: shaped(
            tone(n, freq_at=lambda t: 1174.7, amp_at=lambda t: 0.8),
            envelope(n, 0.004, 0.045))),
    ])


RECIPES = {
    "sigh": ("desah pelan", sigh),
    "sigh_low": ("desah rendah", sigh_low),
    "yawn": ("menguap", yawn),
    "tongue_click": ("klik lidah (boring)", tongue_click),
    "huff_hard": ("embusan keras (marah)", huff_hard),
    "hmph": ("mendengus (ngambek)", hmph),
    "hum_soft": ("bergumam lembut", hum_soft),
    "mmm": ("mmm (peluk)", mmm),
    "eep": ("eep pendek (malu)", eep),
    "gasp": ("kaget menahan napas", gasp),
    "giggle_3": ("kikik tiga denyut", giggle_3),
    "giggle_short": ("kikik dua denyut (geli)", giggle_short),
    "chime_up": ("lonceng naik (bangga)", chime_up),
    "boing": ("lompat", boing),
    "blip_soft": ("bunyi lembut (melambai)", blip_soft),
}


# --- penulisan --------------------------------------------------------------


def normalize(signal: list[float], fade_ms: float = 8.0) -> list[int]:
    peak = max((abs(x) for x in signal), default=0.0)
    scale = (PEAK / peak) if peak > 0 else 0.0
    values = [x * scale for x in signal]
    fade = max(1, int(RATE * fade_ms / 1000))
    for i in range(min(fade, len(values))):
        values[i] *= i / fade
        values[-1 - i] *= i / fade
    return [max(-32767, min(32767, int(round(x * 32767)))) for x in values]


def write_wav(path: Path, samples: list[int]) -> None:
    with wave.open(str(path), "wb") as handle:
        handle.setnchannels(1)
        handle.setsampwidth(2)
        handle.setframerate(RATE)
        handle.writeframes(b"".join(struct.pack("<h", s) for s in samples))


def build(check_only: bool) -> int:
    total_bytes = 0
    rows = []
    for key, (label, factory) in RECIPES.items():
        samples = normalize(factory())
        payload = b"".join(struct.pack("<h", s) for s in samples)
        digest = hashlib.sha256(payload).hexdigest()
        path = OUT_DIR / f"{PREFIX}{key}.wav"
        size = len(payload) + 44
        total_bytes += size
        rows.append((key, label, len(samples) / RATE, size, digest))
        if not check_only:
            OUT_DIR.mkdir(parents=True, exist_ok=True)
            write_wav(path, samples)
        elif not path.exists():
            print(f"GAGAL: {path} hilang", file=sys.stderr)
            return 1
        else:
            with wave.open(str(path), "rb") as handle:
                stored = handle.readframes(handle.getnframes())
            if hashlib.sha256(stored).hexdigest() != digest:
                print(f"GAGAL: {path} tidak cocok dengan resep", file=sys.stderr)
                return 1
    print(f"{'berkas':16} {'isi':26} {'durasi':>7} {'ukuran':>8}  sha256")
    for key, label, duration, size, digest in rows:
        print(f"me_{key:<13} {label:<26} {duration:6.2f}s {size:7d}B  {digest}")
    print(f"total {len(rows)} berkas, {total_bytes} byte ({total_bytes / 1024:.1f} KB)")
    if total_bytes > 250 * 1024:
        print("GAGAL: total melebihi anggaran 250 KB", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="periksa hash, jangan menulis")
    args = parser.parse_args()
    raise SystemExit(build(args.check))
