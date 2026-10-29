#!/usr/bin/env bash
# Uji regresi sentuh & gestur (F5) di emulator.
#
# Yang dibuktikan dengan angka, bukan klaim:
#   1. Elus kepala bolak-balik  → avatar TIDAK bergeser (menyeret=false)
#   2. Geser badan              → avatar bergeser (menyeret=true, `geser selesai` tercatat)
#   3. Geser sampai tepi        → jarak ke tepi terdekat ≤ 48 px
#   4. Ketuk area kosong di dalam jendela → aplikasi di belakang tidak berubah
#   5. Tiga ketuk               → menu cepat terbuka
set -euo pipefail
trap 'echo "::error::perintah gagal (baris $LINENO): $BASH_COMMAND"' ERR

PKG="io.github.mrnodatax.mateengine.debug"
ACTIVITY="$PKG/io.github.mrnodatax.mateengine.MainActivity"
APK="app/build/outputs/apk/debug/app-debug.apk"
OUT="docs/screenshots"
DIAG="/tmp/gestur.txt"
LOG="/tmp/gestur-logcat.txt"
BATAS_SIAP="${BATAS_SIAP:-150}"
: > "$DIAG"

ADB_BIN="$(command -v adb || true)"
[ -n "$ADB_BIN" ] || ADB_BIN="${ANDROID_SDK_ROOT:-$ANDROID_HOME}/platform-tools/adb"
adb() { timeout -k 10 "${ADB_TIMEOUT:-90}" "$ADB_BIN" "$@"; }
catat() { echo "$*" | tee -a "$DIAG"; }
lulus() { catat "LULUS: $*"; }
gagal() { catat "GAGAL: $*"; echo "::error::$*"; exit 1; }

# Posisi jendela avatar saat ini: `x y lebar tinggi`.
bingkai() {
  adb shell dumpsys window windows > /tmp/gestur-dump.txt
  python3 scripts/baca-jendela.py < /tmp/gestur-dump.txt
}

# Selisih absolut dua bilangan bulat.
selisih() { local d=$(($1 - $2)); [ "$d" -lt 0 ] && d=$((-d)); echo "$d"; }

# `x y w h` pertama dan kedua dianggap sama bila tiap nilai berselisih ≤ 2 px.
# Emulator CI memakai SwiftShader: satu frame bisa butuh beberapa detik (terukur workMs
# 5256 ms sekali), sehingga log gestur baru muncul jauh setelah jari lepas. Menunggu 2 detik
# tetap membuat uji menyimpulkan "tidak ada gestur" padahal gestur baru diproses.
# `tunggu_log <pola> <batas_detik> <sejak_baris>` memantau logcat sampai pola muncul.
tunggu_log() {
  local pola="$1" batas="$2" sejak="$3" i
  for i in $(seq 1 "$batas"); do
    adb logcat -d > "$LOG" 2>/dev/null || true
    if tail -n +$((sejak + 1)) "$LOG" | grep -q "$pola"; then return 0; fi
    sleep 1
  done
  return 1
}

sama_bingkai() {
  local ax ay aw ah bx by bw bh
  read -r ax ay aw ah <<< "$1"
  read -r bx by bw bh <<< "$2"
  [ "$(selisih "$ax" "$bx")" -le 2 ] || return 1
  [ "$(selisih "$ay" "$by")" -le 2 ] || return 1
  [ "$(selisih "$aw" "$bw")" -le 2 ] || return 1
  [ "$(selisih "$ah" "$bh")" -le 2 ] || return 1
  return 0
}

catat "mulai uji gestur pada $(date -u +%H:%M:%SZ)"
adb start-server >/dev/null 2>&1 || true
adb wait-for-device
adb shell settings put global window_animation_scale 0
adb shell settings put global transition_animation_scale 0
adb shell settings put global animator_duration_scale 0
adb shell svc power stayon true || true

catat "memasang APK..."
adb install -r "$APK" >/dev/null || gagal "APK tidak bisa dipasang"
adb shell appops set "$PKG" SYSTEM_ALERT_WINDOW allow || gagal "izin overlay ditolak"
adb logcat -c || true

BACA_LAYAR=$(adb shell wm size | sed -n 's/.*: \([0-9]*\)x\([0-9]*\).*/\1 \2/p' | head -1)
LAYAR_W=${BACA_LAYAR% *}
LAYAR_H=${BACA_LAYAR#* }
catat "layar: ${LAYAR_W}x${LAYAR_H}"

catat "membuka overlay..."
adb shell am start -n "$ACTIVITY" --ez start_overlay true --ez seed_sample true --ei scale 60 >/dev/null 2>&1 || true
siap=0
for _ in $(seq 1 "$BATAS_SIAP"); do
  sleep 1
  adb logcat -d > "$LOG" 2>/dev/null || true
  if grep -q "avatar-ready" "$LOG"; then siap=1; break; fi
done
[ "$siap" -eq 1 ] || { grep -E "MateEngineRender|chromium" "$LOG" | tail -12 | sed 's/^/  /' | tee -a "$DIAG"; gagal "avatar tidak siap"; }
lulus "avatar siap"
sleep 8

# Bingkai jendela masih menyempit beberapa detik setelah avatar siap (siluet dihaluskan tiap
# frame). Geser/ketuk di tengah penyempitan itu bisa tidak terkirim ke jendela mana pun —
# percobaan sebelumnya mencatat 0 gestur. Tunggu sampai dua pembacaan sama.
AWAL=""
for _ in $(seq 1 12); do
  BARU=$(bingkai) || gagal "bingkai jendela avatar tidak terbaca"
  if [ -n "$AWAL" ] && sama_bingkai "$AWAL" "$BARU"; then AWAL=$BARU; break; fi
  AWAL=$BARU
  sleep 3
done
[ -n "$AWAL" ] || gagal "bingkai jendela avatar tidak terbaca"
catat "bingkai stabil: $AWAL"
set -- $AWAL
JX=$1; JY=$2; JW=$3; JH=$4
catat "jendela awal: ${JW}x${JH} di (${JX},${JY})"
KEPALA_X=$((JX + JW / 2)); KEPALA_Y=$((JY + JH * 12 / 100))
BADAN_X=$((JX + JW / 2)); BADAN_Y=$((JY + JH * 45 / 100))

# ------------------------------------------------ 1. usapan halus di kepala
# Catatan jujur: elusan yang MEMICU headpat butuh lintasan ≥ 60 px dalam 900 ms (JS), sedangkan
# ambang geser Android 22 dp (≈58 px) — jadi "elus yang memicu reaksi tanpa menyeret" hanya
# mungkin lewat gerakan bolak-balik dalam satu gestur (bukan `input swipe` linear).
# Pemetaan elusan → headpat diuji di web/test/touch.test.mjs; di sini yang dibuktikan bahwa
# usapan halus (6 dp) TIDAK menggeser avatar.
DPI=$(adb shell wm density | sed -n 's/.*: \([0-9]*\).*/\1/p' | head -1)
[ -n "$DPI" ] || DPI=420
# Pergeseran TOTAL per usapan (bukan setengah amplitudo): harus di bawah ambang 8 dp
# (margin kosong) supaya tidak menyeret walau sentuhan tidak tepat di badan.
ELUS_AMP=$((DPI * 6 / 160))
[ "$ELUS_AMP" -ge 10 ] || ELUS_AMP=10
catat "amplitudo elus: ${ELUS_AMP} px"
LEWAT_E1=$(wc -l < "$LOG")
# Tiap usapan ditunggu sampai tercatat di logcat. Tanpa itu, sambungan `input swipe` berikutnya
# masuk selagi utas UI masih sibuk (SwiftShader ~1 fps) dan sebagian gestur hilang — percobaan
# sebelumnya hanya mencatat 2 dari 6 usapan.
for arah in kanan kiri kanan; do
  sejak=$(wc -l < "$LOG")
  for percobaan in 1 2; do
    if [ "$arah" = "kanan" ]; then
      adb shell input swipe "$KEPALA_X" "$KEPALA_Y" $((KEPALA_X + ELUS_AMP)) "$KEPALA_Y" 260
    else
      adb shell input swipe $((KEPALA_X + ELUS_AMP)) "$KEPALA_Y" "$KEPALA_X" "$KEPALA_Y" 260
    fi
    tunggu_log "gestur UP" 20 "$sejak" && break
    sleep 2
  done
done
adb logcat -d > "$LOG" 2>/dev/null || true
ELUS_SERET=$(tail -n +$((LEWAT_E1 + 1)) "$LOG" | grep -c "gestur UP.*menyeret=true" || true)
ELUS_TOTAL=$(tail -n +$((LEWAT_E1 + 1)) "$LOG" | grep -c "gestur UP" || true)
SETELAH_ELUS=$(bingkai) || gagal "bingkai jendela hilang setelah elus"
catat "elus kepala: ${ELUS_TOTAL} gestur, ${ELUS_SERET} menyeret; jendela ${SETELAH_ELUS}"
[ "$ELUS_TOTAL" -ge 3 ] || gagal "gestur elus tidak tercatat (logcat: $ELUS_TOTAL)"
[ "$ELUS_SERET" -eq 0 ] || gagal "elus kepala menyeret avatar ($ELUS_SERET kali)"
# Bukti "tidak bergeser" diambil dari jalur kode yang mengeksekusi pergeseran: avatar hanya
# berpindah lewat `menyeret=true` lalu `geser selesai`. Geometri jendela TIDAK dipakai karena
# siluet dihaluskan terus-menerus (757 -> 405 px dalam hitungan detik saat lengan bergerak),
# sehingga pusatnya bergeser beberapa piksel tanpa ada geseran pengguna sama sekali.
ELUS_GESER=$(tail -n +$((LEWAT_E1 + 1)) "$LOG" | grep -c "geser selesai" || true)
[ "$ELUS_GESER" -eq 0 ] || gagal "usapan mengeksekusi pergeseran ($ELUS_GESER kali 'geser selesai')"
catat "geometri jendela: sebelum ${AWAL}, sesudah ${SETELAH_ELUS} (lebar berubah karena siluet dihaluskan)"
lulus "usapan halus di kepala: ${ELUS_TOTAL} gestur, 0 menyeret, 0 pergeseran"

# ---------------------------------------------------------------- 2. geser badan
LEWAT_E2=$(wc -l < "$LOG")
adb shell input swipe "$BADAN_X" "$BADAN_Y" $((BADAN_X + 120)) $((BADAN_Y + 60)) 600
tunggu_log "geser selesai" 40 "$LEWAT_E2" || true
adb logcat -d > "$LOG" 2>/dev/null || true
GESER_SERET=$(tail -n +$((LEWAT_E2 + 1)) "$LOG" | grep -c "menyeret=true" || true)
tail -n +$((LEWAT_E2 + 1)) "$LOG" | grep -m1 "geser selesai" | sed 's/^/  /' | tee -a "$DIAG" || true
SETELAH_GESER=$(bingkai) || gagal "bingkai jendela hilang setelah geser"
set -- $SETELAH_GESER
catat "setelah geser: ${3}x${4} di (${1},${2})"
[ "$GESER_SERET" -ge 1 ] || gagal "geser badan tidak terdeteksi (menyeret tidak pernah true)"
[ "$SETELAH_GESER" != "$AWAL" ] || gagal "jendela tidak bergeser setelah digeser"
lulus "geser badan menggeser avatar (${AWAL} -> ${SETELAH_GESER})"

# ---------------------------------------------------------------- 3. geser sampai tepi
set -- $SETELAH_GESER
JX=$1; JY=$2; JW=$3; JH=$4
BADAN_X=$((JX + JW / 2)); BADAN_Y=$((JY + JH * 45 / 100))
LEWAT_E3=$(wc -l < "$LOG")
adb shell input swipe "$BADAN_X" "$BADAN_Y" $((LAYAR_W - 5)) "$BADAN_Y" 700
tunggu_log "geser selesai" 40 "$LEWAT_E3" || true
TEPI_INFO=$(bingkai) || gagal "bingkai jendela hilang setelah geser ke tepi"
set -- $TEPI_INFO
KIRI=$1; ATAS=$2; W=$3; H=$4
JARAK_KANAN=$((LAYAR_W - (KIRI + W)))
JARAK_BAWAH=$((LAYAR_H - (ATAS + H)))
TERDEKAT=$KIRI
[ "$ATAS" -lt "$TERDEKAT" ] && TERDEKAT=$ATAS
[ "$JARAK_KANAN" -lt "$TERDEKAT" ] && TERDEKAT=$JARAK_KANAN
[ "$JARAK_BAWAH" -lt "$TERDEKAT" ] && TERDEKAT=$JARAK_BAWAH
catat "setelah digeser ke tepi: (${KIRI},${ATAS}) ${W}x${H}; jarak tepi kiri=$KIRI atas=$ATAS kanan=$JARAK_KANAN bawah=$JARAK_BAWAH; terdekat=${TERDEKAT} px"
[ "$TERDEKAT" -le 48 ] || gagal "avatar tidak sampai tepi (jarak terdekat ${TERDEKAT} px > 48 px)"
lulus "geser sampai tepi: jarak terdekat ${TERDEKAT} px (≤ 48 px)"

# ---------------------------------------------------------------- 4. ketuk area kosong
adb shell am start -a android.settings.SETTINGS >/dev/null 2>&1 || true
sleep 3

hash_ui() {
  adb shell uiautomator dump /sdcard/ui.xml >/dev/null 2>&1 || true
  adb shell cat /sdcard/ui.xml 2>/dev/null | sha256sum | cut -d' ' -f1
}

# Dasar pembanding harus STABIL lebih dulu: di emulator ber-SwiftShader, Setelan masih
# memuat daftar beberapa detik setelah dibuka, sehingga dua hash berbeda bisa berarti
# "belum selesai memuat", bukan "ketukan menembus".
SEBELUM=$(hash_ui)
STABIL=0
for _ in $(seq 1 20); do
  sleep 1
  BARU=$(hash_ui)
  if [ -n "$BARU" ] && [ "$BARU" = "$SEBELUM" ]; then STABIL=1; break; fi
  SEBELUM=$BARU
done
FOKUS_SEBELUM=$(adb shell dumpsys window | grep -m1 "mCurrentFocus" || true)
catat "dasar UI stabil=${STABIL} (hash ${SEBELUM:0:12}), fokus: $(echo "$FOKUS_SEBELUM" | tr -s ' ' | cut -c1-90)"

KOSONG_X=$((KIRI + 3)); KOSONG_Y=$((ATAS + 3))
adb shell input tap "$KOSONG_X" "$KOSONG_Y"
sleep 3
SESUDAH=$(hash_ui)
FOKUS_SESUDAH=$(adb shell dumpsys window | grep -m1 "mCurrentFocus" || true)
adb exec-out screencap -p > "$OUT/27-blokir-area-kosong.png" || true
catat "ketuk area kosong (${KOSONG_X},${KOSONG_Y}): hash UI ${SEBELUM:0:12} -> ${SESUDAH:0:12}"
[ "$STABIL" -eq 1 ] || gagal "UI Setelan tidak pernah stabil; hasil ketukan tidak bisa dinilai"
[ -n "$SESUDAH" ] && [ "$SEBELUM" = "$SESUDAH" ] || gagal "ketukan menembus ke aplikasi di belakang (UI berubah)"
case "$FOKUS_SESUDAH" in
  *settings*) : ;;
  *) gagal "fokus jendela berpindah setelah ketukan area kosong: $(echo "$FOKUS_SESUDAH" | tr -s ' ' | cut -c1-120)" ;;
esac
lulus "ketuk area kosong ditahan overlay; Setelan di belakang tidak berubah"

# ---------------------------------------------------------------- 5. tiga ketuk
LEWAT_E5=$(wc -l < "$LOG")
for _ in 1 2 3; do adb shell input tap "$BADAN_X" "$BADAN_Y"; done
tunggu_log "menu cepat dibuka" 40 "$LEWAT_E5" || true
adb logcat -d > "$LOG" 2>/dev/null || true
if tail -n +$((LEWAT_E5 + 1)) "$LOG" | grep -q "menu cepat dibuka"; then
  tail -n +$((LEWAT_E5 + 1)) "$LOG" | grep -m1 "menu cepat dibuka" | sed 's/^/  /' | tee -a "$DIAG"
  lulus "tiga ketuk membuka menu cepat"
else
  tail -n +$((LEWAT_E5 + 1)) "$LOG" | grep "gestur UP" | tail -3 | sed 's/^/  /' | tee -a "$DIAG" || true
  gagal "tiga ketuk tidak membuka menu cepat"
fi

catat "SEMUA UJI GESTUR LULUS"
