#!/usr/bin/env bash
# Menjalankan di dalam emulator CI: memasang APK debug apa adanya, lalu mengambil
# tangkapan layar asli dari aplikasi yang berjalan (bukan mockup).
set -euo pipefail

PKG="io.github.mrnodatax.mateengine.debug"
ACTIVITY="$PKG/io.github.mrnodatax.mateengine.MainActivity"
OUT="docs/screenshots"
APK="app/build/outputs/apk/debug/app-debug.apk"

mkdir -p "$OUT"
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

shoot() {
  local name="$1"
  shift
  adb shell am force-stop "$PKG" || true
  adb shell am start -W -n "$ACTIVITY" --ez seed_sample true "$@" >/dev/null
  sleep 9
  adb exec-out screencap -p > "$OUT/$name.png"
  echo "== tersimpan $OUT/$name.png"
}

shoot 01-beranda --es screen home
shoot 02-avatar --es screen avatar
shoot 03-animasi --es screen animation
shoot 04-diagnosa --es screen diagnostics
shoot 05-pengaturan --es screen settings

echo "== menjalankan overlay lalu kembali ke launcher"
adb shell am force-stop "$PKG" || true
adb shell am start -W -n "$ACTIVITY" --ez seed_sample true --es screen home >/dev/null
sleep 6
adb shell am start-foreground-service \
  -n "$PKG/io.github.mrnodatax.mateengine.overlay.OverlayService" \
  -a io.github.mrnodatax.mateengine.action.START_OVERLAY || true
adb shell input keyevent KEYCODE_HOME
sleep 35
adb exec-out screencap -p > "$OUT/06-overlay.png"
echo "== tersimpan $OUT/06-overlay.png"

echo "== tema gelap"
adb shell am force-stop "$PKG" || true
adb shell cmd uimode night yes
sleep 4
shoot 07-beranda-gelap --es screen home

echo "== tata letak lebar (lanskap)"
adb shell settings put system accelerometer_rotation 0
adb shell settings put system user_rotation 1
sleep 4
shoot 08-beranda-lebar --es screen home

adb shell settings put system user_rotation 0
adb shell cmd uimode night no || true

echo "== ringkasan file"
ls -l "$OUT"
