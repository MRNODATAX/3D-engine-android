#!/usr/bin/env bash
# Berjalan di dalam emulator CI: memasang APK debug apa adanya, lalu mengambil
# tangkapan layar asli dari aplikasi yang berjalan (bukan mockup).
set -euo pipefail

PKG="io.github.mrnodatax.mateengine.debug"
ACTIVITY="$PKG/io.github.mrnodatax.mateengine.MainActivity"
OUT="docs/screenshots"
LOG="/tmp/mate-logcat.txt"
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

echo "== status sebelum overlay"
adb shell dumpsys activity services "$PKG" | head -10 || true

echo "== menekan tombol Jalankan avatar seperti pengguna sungguhan"
adb shell am force-stop "$PKG" || true
adb shell am start -W -n "$ACTIVITY" --ez seed_sample true --es screen home >/dev/null
sleep 9
adb exec-out screencap -p > /tmp/before-tap.png
# Tombol "Jalankan avatar" pada kartu status (profil Pixel 6, 1080x2400).
adb shell input tap 340 975
sleep 8
adb shell dumpsys activity services "$PKG" | grep -E "ServiceRecord|isForeground" | head -5 || true
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
echo "== status service setelah tangkapan"
adb shell dumpsys activity services "$PKG" | grep -E "ServiceRecord|app=" | head -5 || true

echo "== status overlay di halaman Diagnosa"
adb shell am start -n "$ACTIVITY" --es screen home >/dev/null
sleep 4
adb exec-out screencap -p > "$OUT/07-beranda-saat-overlay.png"
echo "== tersimpan $OUT/07-beranda-saat-overlay.png"

adb shell am start -n "$ACTIVITY" --es screen diagnostics >/dev/null
sleep 5
adb exec-out screencap -p > "$OUT/08-diagnosa-berjalan.png"
echo "== tersimpan $OUT/08-diagnosa-berjalan.png"

adb logcat -d > "$LOG" || true
grep -E "mateengine|MateEngineRender|chromium|WebView|AndroidRuntime" "$LOG" | tail -400 > /tmp/mate-log-tail.txt || true
echo "== potongan log"
tail -40 /tmp/mate-log-tail.txt || true

echo "== potongan log penting untuk anotasi CI"
grep -iE "mateengine|fatal|exception" /tmp/mate-log-tail.txt | tail -20 || true

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
