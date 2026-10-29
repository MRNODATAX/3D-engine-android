#!/usr/bin/env bash
# Matriks perangkat CI (F3): memasang APK debug di emulator API 26 / 34 / 36, menyalakan
# overlay, lalu memeriksa hal-hal yang paling mudah rusak antar versi Android:
#   1. layanan overlay benar-benar jalan (FGS: `specialUse` baru ada di API 34)
#   2. renderer siap (pesan `avatar-ready` dari WebView)
#   3. hanya ada SATU jendela "MateEngine avatar"
#   4. jendela berada di dalam layar
#   5. proses tidak crash/ANR selama 10 detik pertama
# Keluar dengan kode 1 bila salah satu syarat gagal, dengan alasan yang terbaca di CI.
set -euo pipefail
trap 'echo "::error::perintah gagal (baris $LINENO): $BASH_COMMAND"' ERR

API="${1:?pakai: periksa-perangkat.sh <api-level>}"
PKG="io.github.mrnodatax.mateengine.debug"
ACTIVITY="$PKG/io.github.mrnodatax.mateengine.MainActivity"
APK="app/build/outputs/apk/debug/app-debug.apk"
DIAG="/tmp/matriks-api${API}.txt"
LOG="/tmp/matriks-api${API}-logcat.txt"
BATAS_SIAP="${BATAS_SIAP:-150}"
: > "$DIAG"

catat() { echo "$*" | tee -a "$DIAG"; }
gagal() { catat "GAGAL: $*"; echo "::error::API $API: $*"; exit 1; }
lewat() { catat "LULUS: $*"; }

adb wait-for-device
adb shell settings put global window_animation_scale 0
adb shell settings put global transition_animation_scale 0
adb shell settings put global animator_duration_scale 0
adb shell svc power stayon true || true

SDK=$(adb shell getprop ro.build.version.sdk | tr -d '\r')
catat "sdk dilaporkan perangkat: $SDK (diminta: $API)"
[ "$SDK" = "$API" ] || gagal "emulator bukan API $API (melaporkan $SDK)"

t0=$(date +%s)
adb install -r "$APK" >/dev/null || gagal "APK tidak bisa dipasang di API $API"
lewat "APK terpasang ($(( $(date +%s) - t0 )) dtk)"

adb shell appops set "$PKG" SYSTEM_ALERT_WINDOW allow || gagal "appops overlay ditolak"
adb shell pm grant "$PKG" android.permission.POST_NOTIFICATIONS >/dev/null 2>&1 || true
adb shell cmd uimode night no >/dev/null 2>&1 || true
adb logcat -c || true

t0=$(date +%s)
adb shell am start -W -n "$ACTIVITY" --ez start_overlay true --ez seed_sample true >/dev/null \
  || gagal "aktivitas tidak bisa dibuka"

# 1. renderer siap: tunggu salah satu dari dua sinyal (siap / galat) supaya kegagalan
#    dilaporkan dengan sebabnya, bukan sebagai timeout tanpa keterangan.
siap=0
galat=""
for _ in $(seq 1 "$BATAS_SIAP"); do
  sleep 1
  adb logcat -d > "$LOG" 2>/dev/null || true
  if grep -q "avatar-ready" "$LOG"; then siap=1; break; fi
  galat=$(grep -m1 -E "renderer belum siap|renderer gagal|Galat renderer|Uncaught|SyntaxError" "$LOG" || true)
  [ -z "$galat" ] || break
done
if [ "$siap" -ne 1 ]; then
  grep -E "MateEngineRender|chromium|WebView|AndroidRuntime" "$LOG" | tail -40 | tee -a "$DIAG" || true
  gagal "avatar tidak siap dalam ${BATAS_SIAP} dtk ${galat:+($galat)}"
fi
lewat "avatar-ready setelah $(( $(date +%s) - t0 )) dtk"

# 2. layanan overlay jalan. API < 34 memakai jalur cadangan (tanpa type specialUse).
if adb shell dumpsys activity services "$PKG" | grep -q "OverlayService"; then
  ragam=$(adb shell dumpsys activity services "$PKG" | grep -m1 -o "types=[0-9A-Za-z|]*" || true)
  lewat "OverlayService berjalan ${ragam:+($ragam)}"
else
  gagal "OverlayService tidak berjalan"
fi
adb shell dumpsys activity services "$PKG" | grep -m1 "isForeground=" | sed 's/^ */  /' | tee -a "$DIAG" || true

# 3-4. tepat satu jendela avatar, di dalam layar.
grep -A 3 "MateEngine avatar" <<< "$(adb shell dumpsys window windows)" | head -4 > /tmp/matriks-jendela.txt
adb shell dumpsys window displays | grep -o "cur=[0-9]*x[0-9]*" | head -1 >> /tmp/matriks-jendela.txt
jumlah=$(adb shell dumpsys window windows | grep -c "MateEngine avatar" || true)
catat "jumlah jendela avatar: $jumlah"
[ "$jumlah" -eq 1 ] || gagal "jendela avatar berjumlah $jumlah (seharusnya 1)"

hasil_jendela=$(python3 scripts/periksa-jendela-layar.py --dumpsys < /tmp/matriks-jendela.txt 2>&1) || {
  catat "$hasil_jendela"
  gagal "jendela overlay keluar layar"
}
lewat "$hasil_jendela"

# 5. tidak ada crash/ANR. Beri waktu 10 detik: crash pada WebView/FGS biasanya muncul cepat.
sleep 10
adb logcat -d > "$LOG" 2>/dev/null || true
if grep -qE "FATAL EXCEPTION|ANR in $PKG" "$LOG"; then
  grep -E -A 12 "FATAL EXCEPTION|ANR in $PKG" "$LOG" | head -40 | tee -a "$DIAG"
  gagal "crash/ANR terdeteksi"
fi
if ! adb shell pidof "$PKG" >/dev/null 2>&1; then gagal "proses aplikasi hilang"; fi
lewat "tidak ada crash/ANR, proses masih hidup"

# 6. tangkapan layar sebagai bukti visual (diunggah sebagai artefak, tidak di-commit).
adb exec-out screencap -p > "/tmp/matriks-api${API}.png" || true
catat "tangkapan layar: /tmp/matriks-api${API}.png ($(stat -c%s "/tmp/matriks-api${API}.png" 2>/dev/null || echo 0) bita)"
catat "SEMUA PEMERIKSAAN API $API LULUS"
