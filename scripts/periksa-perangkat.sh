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
# Blok crash pertama dari logcat: bagian ATAS tumpukan (jenis galat + frame aplikasi)
# yang menentukan penyebab, bukan bagian bawahnya yang hanya ViewRootImpl/Choreographer.
crash() {
  awk '/FATAL EXCEPTION/{t=1} t{print} t&&/^$/&&NR>1{exit}' "$1" 2>/dev/null | head -25
}
# Hanya crash MILIK aplikasi ini. Log perangkat memuat crash aplikasi lain (WebView,
# Google Play services) dan itu bukan kegagalan kita.
crash_kita() {
  adb logcat -d -b crash 2>/dev/null \
    | awk 'BEGIN{RS="\n\n"} /FATAL EXCEPTION/ && /io\.github\.mrnodatax\.mateengine/ {print; exit}'
}
# Setiap panggilan adb dibatasi waktunya. Tanpa ini, satu perintah yang menggantung membuat
# seluruh job dibatalkan pada batas waktu dan tidak ada diagnostik yang tersisa.
ADB_BIN="$(command -v adb || true)"
[ -n "$ADB_BIN" ] || ADB_BIN="${ANDROID_SDK_ROOT:-$ANDROID_HOME}/platform-tools/adb"
adb() { timeout -k 10 "${ADB_TIMEOUT:-90}" "$ADB_BIN" "$@"; }
gagal() { catat "GAGAL: $*"; echo "::error::API $API: $*"; exit 1; }
lewat() { catat "LULUS: $*"; }

catat "mulai pemeriksaan API $API pada $(date -u +%H:%M:%SZ)"
adb start-server >/dev/null 2>&1 || true
adb wait-for-device
catat "perangkat terdeteksi: $(adb devices | sed -n '2p')"
adb shell settings put global window_animation_scale 0
adb shell settings put global transition_animation_scale 0
adb shell settings put global animator_duration_scale 0
adb shell svc power stayon true || true

SDK=$(adb shell getprop ro.build.version.sdk | tr -d '\r')
catat "sdk dilaporkan perangkat: $SDK (diminta: $API)"
[ "$SDK" = "$API" ] || gagal "emulator bukan API $API (melaporkan $SDK)"

catat "memasang APK..."
t0=$(date +%s)
adb install -r "$APK" >/dev/null || gagal "APK tidak bisa dipasang di API $API"
lewat "APK terpasang ($(( $(date +%s) - t0 )) dtk)"

adb shell appops set "$PKG" SYSTEM_ALERT_WINDOW allow || gagal "appops overlay ditolak"
adb shell pm grant "$PKG" android.permission.POST_NOTIFICATIONS >/dev/null 2>&1 || true
adb shell cmd uimode night no >/dev/null 2>&1 || true
adb logcat -c || true

catat "membuka aktivitas..."
t0=$(date +%s)
# `am start -W` di API 26 keluar dengan kode 1 walau aktivitas benar-benar dibuka
# (tidak ada baris "Status:" pada keluaran `am` versi lama), jadi yang dipakai sebagai bukti
# adalah jendela yang sedang fokus, bukan kode keluar.
keluaran_buka=$(adb shell am start -W -n "$ACTIVITY" --ez start_overlay true --ez seed_sample true 2>&1) || true
fokus=""
for percobaan in 1 2 3; do
  sleep 2
  fokus=$(adb shell dumpsys window 2>/dev/null | grep -m1 -E "mCurrentFocus|mFocusedApp" || true)
  case "$fokus" in
    *mateengine*) break ;;
  esac
  if [ "$percobaan" -eq 2 ]; then
    adb shell am start -n "$ACTIVITY" --ez start_overlay true --ez seed_sample true >/dev/null 2>&1 || true
  fi
done
case "$fokus" in
  *mateengine*) lewat "aktivitas di depan setelah $(( $(date +%s) - t0 )) dtk" ;;
  *)
    catat "keluaran am start: $(echo "$keluaran_buka" | tr '\n' '|' | cut -c1-400)"
    catat "fokus jendela: $(echo "$fokus" | tr -s ' ' | cut -c1-200)"
    adb logcat -d > "$LOG" 2>/dev/null || true
    crash_kita | head -18 | sed 's/^/  /' | tee -a "$DIAG" || true
    gagal "aktivitas tidak bisa dibuka"
    ;;
esac

catat "menunggu avatar-ready (maks ${BATAS_SIAP} dtk)..."
siap=0
galat=""
for detik in $(seq 1 "$BATAS_SIAP"); do
  sleep 1
  adb logcat -d > "$LOG" 2>/dev/null || true
  if grep -q "avatar-ready" "$LOG"; then siap=1; break; fi
  galat=$(grep -m1 -E "renderer belum siap|renderer gagal|Galat renderer|Uncaught|SyntaxError" "$LOG" || true)
  # Buffer crash hanya diperiksa tiap 5 detik: dua panggilan adb per detik memperlambat
  # emulator lama (API 26) tanpa menambah informasi.
  if [ $((detik % 5)) -eq 0 ] && [ -n "$(crash_kita)" ]; then
    crash_kita | head -18 | sed 's/^/  /' | tee -a "$DIAG"
    gagal "aplikasi crash sebelum avatar siap"
  fi
  [ -z "$galat" ] || break
done
if [ "$siap" -ne 1 ]; then
  grep -E "MateEngineRender|chromium|WebView" "$LOG" | tail -20 | sed 's/^/  /' | tee -a "$DIAG" || true
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

catat "memeriksa jumlah jendela..."
# 3-4. tepat satu jendela avatar, di dalam layar.
# Judul jendela muncul di beberapa bagian `dumpsys window` (fokus, target input, dsb.),
# jadi yang dihitung hanya baris deklarasi jendela: `Window{<hash> u<id> MateEngine avatar}`.
DUMP=/tmp/matriks-dump-window.txt
adb shell dumpsys window windows > "$DUMP"
# Baris deklarasi jendela berformat `Window #0 Window{<hash> u0 MateEngine avatar}`, jadi
# judul yang sama juga muncul di bagian fokus/target input dan tidak boleh ikut dihitung.
python3 - "$DUMP" <<'PYHITUNG' > /tmp/matriks-hitung.txt
import re, sys
teks = open(sys.argv[1], encoding="utf-8", errors="ignore").read()
pola = re.compile(r"Window #\d+ Window\{[^}]*MateEngine avatar")
cocok = pola.findall(teks)
semua = [l.strip() for l in teks.splitlines() if "MateEngine avatar" in l]
print(len(cocok))
print("|".join(l[:120] for l in semua[:4]))
PYHITUNG
jumlah=$(head -1 /tmp/matriks-hitung.txt)
catat "jumlah jendela avatar: ${jumlah:-?} (baris berjudul: $(sed -n '2p' /tmp/matriks-hitung.txt | cut -c1-300))"
[ "${jumlah:-0}" -eq 1 ] || gagal "jendela avatar berjumlah ${jumlah:-?} (seharusnya 1)"
# Bagian jendela avatar saja: `mAttrs`/`mFrame` hanya ada di blok ini.
grep -A 3 -m1 "MateEngine avatar" "$DUMP" | head -4 > /tmp/matriks-jendela.txt
# Ukuran layar: `cur=` di versi baru, `init=` di API 26 (versi lama tidak menulis `cur=`).
layar_baris=$(adb shell dumpsys window displays | grep -o -E "(cur|init)=[0-9]+x[0-9]+" | head -1)
catat "ukuran layar dari dumpsys: ${layar_baris:-tidak terbaca}"
echo "$layar_baris" >> /tmp/matriks-jendela.txt

hasil_jendela=$(python3 scripts/periksa-jendela-layar.py --dumpsys < /tmp/matriks-jendela.txt 2>&1) || {
  catat "$hasil_jendela"
  gagal "jendela overlay keluar layar"
}
lewat "$hasil_jendela"

catat "memantau crash/ANR 10 dtk..."
# 5. tidak ada crash/ANR. Beri waktu 10 detik: crash pada WebView/FGS biasanya muncul cepat.
sleep 10
adb logcat -d > "$LOG" 2>/dev/null || true
if [ -n "$(crash_kita)" ]; then
  crash_kita | head -18 | sed 's/^/  /' | tee -a "$DIAG"
  gagal "aplikasi crash"
fi
if grep -q "ANR in $PKG" "$LOG"; then
  grep -A 6 "ANR in $PKG" "$LOG" | head -20 | sed 's/^/  /' | tee -a "$DIAG"
  gagal "ANR terdeteksi"
fi
if ! adb shell pidof "$PKG" >/dev/null 2>&1; then gagal "proses aplikasi hilang"; fi
lewat "tidak ada crash/ANR, proses masih hidup"

# 6. tangkapan layar sebagai bukti visual (diunggah sebagai artefak, tidak di-commit).
adb exec-out screencap -p > "/tmp/matriks-api${API}.png" || true
catat "tangkapan layar: /tmp/matriks-api${API}.png ($(stat -c%s "/tmp/matriks-api${API}.png" 2>/dev/null || echo 0) bita)"
catat "SEMUA PEMERIKSAAN API $API LULUS"
