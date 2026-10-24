#!/usr/bin/env bash
# Berjalan di dalam emulator CI: memasang APK debug apa adanya, menjalankan aplikasi,
# lalu mengambil tangkapan layar asli (bukan mockup) lewat adb screencap.
set -euo pipefail

PKG="io.github.mrnodatax.mateengine.debug"
ACTIVITY="$PKG/io.github.mrnodatax.mateengine.MainActivity"
OUT="docs/screenshots"
LOG="/tmp/mate-logcat.txt"
DIAG="$OUT/diagnostik-emulator.txt"
APK="app/build/outputs/apk/debug/app-debug.apk"

mkdir -p "$OUT"
# Buang gambar lama agar nama berkas yang tidak lagi dipakai tidak tertinggal.
rm -f "$OUT"/*.png
adb wait-for-device

adb shell settings put global window_animation_scale 0
adb shell settings put global transition_animation_scale 0
adb shell settings put global animator_duration_scale 0
adb shell svc power stayon true || true

echo "== memasang APK debug"
adb install -r "$APK"
adb shell appops set "$PKG" SYSTEM_ALERT_WINDOW allow
adb shell pm grant "$PKG" android.permission.POST_NOTIFICATIONS || true
adb shell cmd uimode night no || true
adb logcat -c || true

shoot() {
  local name="$1"
  local wait="${WAIT:-9}"
  shift
  adb shell am force-stop "$PKG" || true
  adb shell am start -W -n "$ACTIVITY" --ez seed_sample true "$@" >/dev/null
  sleep "$wait"
  adb exec-out screencap -p > "$OUT/$name.png"
  echo "== tersimpan $OUT/$name.png"
}

shoot 01-beranda --es screen home
shoot 02-avatar --es screen avatar
shoot 03-animasi --es screen animation
shoot 04-diagnosa --es screen diagnostics
shoot 05-pengaturan --es screen settings

service_running() {
  adb shell dumpsys activity services "$PKG" 2>/dev/null | grep -q "OverlayService"
}

screen_size() {
  adb shell wm size | sed -n 's/.*: \([0-9]*\)x\([0-9]*\).*/\1 \2/p' | head -1
}

# Tap tombol berdasarkan teks (uiautomator) dengan beberapa percobaan; uiautomator
# kadang gagal "could not get idle state" pada aplikasi Compose.
tap_text() {
  local label="$1"
  local attempt
  for attempt in 1 2 3; do
    adb shell uiautomator dump /sdcard/ui.xml >/dev/null 2>&1 && break
    sleep 2
  done
  adb shell cat /sdcard/ui.xml > /tmp/ui.xml 2>/dev/null || return 1
  cp /tmp/ui.xml "$OUT/ui-dump.xml" 2>/dev/null || true
  local coords
  coords=$(python3 - "$label" <<'PYTAP'
import re, sys
label = sys.argv[1]
xml = open('/tmp/ui.xml', encoding='utf-8', errors='ignore').read()
pattern = re.compile(r'text="([^"]*)"[^>]*bounds="\[(\d+),(\d+)\]\[(\d+),(\d+)\]"')
for text, x1, y1, x2, y2 in pattern.findall(xml):
    if label.lower() in text.lower():
        print((int(x1) + int(x2)) // 2, (int(y1) + int(y2)) // 2, text)
        break
PYTAP
)
  [ -n "$coords" ] || return 1
  echo "== tap: $coords"
  set -- $coords
  adb shell input tap "$1" "$2"
}

echo "== menjalankan overlay lewat tombol aplikasi (bukti visual sebelum tap)"
adb shell am force-stop "$PKG" || true
adb shell am start -W -n "$ACTIVITY" --ez seed_sample true --es screen home >/dev/null
sleep 9

# Koordinat cadangan dihitung dari ukuran layar: tombol berada di ~32% lebar, ~34% tinggi.
read -r SCREEN_W SCREEN_H <<<"$(screen_size)"
TAP_X=$((SCREEN_W * 32 / 100))
TAP_Y=$((SCREEN_H * 34 / 100))
echo "== ukuran layar ${SCREEN_W}x${SCREEN_H}, cadangan tap di ($TAP_X, $TAP_Y)"

if ! tap_text "Jalankan avatar"; then
  echo "::warning::Tombol tidak ditemukan lewat uiautomator, memakai koordinat terhitung"
  adb shell input tap "$TAP_X" "$TAP_Y"
fi
sleep 8

if ! service_running; then
  echo "== servis belum terlihat, coba sekali lagi"
  tap_text "Jalankan avatar" || adb shell input tap "$TAP_X" "$TAP_Y"
  sleep 8
fi

if ! service_running; then
  echo "::warning::Tombol tidak memulai servis, memakai jalur intent debug sebagai cadangan"
  adb shell am start -n "$ACTIVITY" --ez seed_sample true --ez start_overlay true --es screen home >/dev/null
  sleep 8
fi

{
  echo "--- services ---"
  adb shell dumpsys activity services "$PKG" | head -40
  echo "--- appops ---"
  adb shell appops get "$PKG" SYSTEM_ALERT_WINDOW
  echo "--- package perms ---"
  adb shell dumpsys package "$PKG" | grep -iE "FOREGROUND_SERVICE|SYSTEM_ALERT_WINDOW" | head -20
  echo "--- crash log ---"
  adb logcat -d -s AndroidRuntime:E | tail -60
} > "$DIAG" 2>&1 || true
head -40 "$DIAG"

if ! service_running; then
  echo "::error::Servis overlay tidak berjalan; tangkapan overlay tidak akan menampilkan apa pun"
fi
adb shell input keyevent KEYCODE_HOME

echo "== menunggu renderer memuat model (maks 90 detik)"
for i in $(seq 1 18); do
  sleep 5
  if adb logcat -d | grep -q "MateEngineRender.*avatar-ready"; then
    echo "== renderer melaporkan avatar-ready setelah $((i * 5)) detik"
    break
  fi
done
sleep 4
adb exec-out screencap -p > "$OUT/06-overlay.png"
echo "== tersimpan $OUT/06-overlay.png"

echo "== status aplikasi saat overlay berjalan"
adb shell am start -n "$ACTIVITY" --es screen home >/dev/null
sleep 5
adb exec-out screencap -p > "$OUT/07-beranda-saat-overlay.png"
echo "== tersimpan $OUT/07-beranda-saat-overlay.png"

adb shell am start -n "$ACTIVITY" --es screen diagnostics >/dev/null
sleep 5
adb exec-out screencap -p > "$OUT/08-diagnosa-berjalan.png"
echo "== tersimpan $OUT/08-diagnosa-berjalan.png"

adb logcat -d > "$LOG" || true
grep -E "mateengine|MateEngineRender|chromium|WebView|AndroidRuntime" "$LOG" | tail -400 > /tmp/mate-log-tail.txt || true
echo "== potongan log"
tail -25 /tmp/mate-log-tail.txt || true

echo "== tema gelap"
adb shell am force-stop "$PKG" || true
adb shell cmd uimode night yes
sleep 4
shoot 09-beranda-gelap --es screen home

echo "== tata letak lebar (lanskap)"
adb shell settings put system accelerometer_rotation 0
adb shell settings put system user_rotation 1
sleep 4
shoot 10-beranda-lebar --es screen home

adb shell settings put system user_rotation 0
adb shell cmd uimode night no || true

echo "== ringkasan file"
ls -l "$OUT"
