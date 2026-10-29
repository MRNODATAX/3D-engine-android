#!/usr/bin/env bash
# Berjalan di dalam emulator CI: memasang APK debug apa adanya, menjalankan aplikasi,
# lalu mengambil tangkapan layar asli (bukan mockup) lewat adb screencap.
set -euo pipefail
# Tanpa ini, `set -e` hanya menghasilkan "exit code 1" tanpa petunjuk perintah mana yang gagal.
trap 'echo "::error::perintah gagal (baris $LINENO): $BASH_COMMAND"' ERR

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

# Bila skrip gagal di tengah jalan (emulator mati, adb hilang), simpan log yang ada supaya
# penyebabnya terbaca dari anotasi CI, bukan hanya "Log perangkat tidak tersedia".
dump_log_on_error() {
  local code=$?
  if [ "$code" -ne 0 ]; then
    adb logcat -d > /tmp/mate-logcat-gagal.txt 2>/dev/null || echo "logcat tidak tersedia" > /tmp/mate-logcat-gagal.txt
    grep -E "mateengine|MateEngineRender|chromium|WebView|AndroidRuntime" /tmp/mate-logcat-gagal.txt \
      | tail -200 > /tmp/mate-log-tail.txt 2>/dev/null || true
    echo "== skrip gagal (kode $code); potongan log disimpan ke /tmp/mate-log-tail.txt"
  fi
  return $code
}
trap dump_log_on_error EXIT

adb shell settings put global window_animation_scale 0
adb shell settings put global transition_animation_scale 0
adb shell settings put global animator_duration_scale 0
adb shell svc power stayon true || true

echo "== status perangkat"
adb devices
echo "sdk=$(adb shell getprop ro.build.version.sdk 2>/dev/null || echo '?')"

echo "== memasang APK debug"
adb install -r "$APK"
adb shell appops set "$PKG" SYSTEM_ALERT_WINDOW allow
adb shell pm grant "$PKG" android.permission.POST_NOTIFICATIONS || true
adb shell cmd uimode night no || true
adb logcat -c || true

# Dialog ANR peluncur muncul di emulator perangkat lunak dan menutupi bukti.
# Tutup lewat tombol "Wait"/"Tunggu" bila ada; kegagalan di sini tidak menghentikan skrip.
dismiss_dialogs() {
  local label
  for label in "Wait" "Tunggu" "Close app"; do
    if adb shell dumpsys window 2>/dev/null | grep -qi "Application Not Responding\|isn't responding"; then
      tap_text "$label" >/dev/null 2>&1 && { echo "== dialog sistem ditutup lewat '$label'"; sleep 1; return 0; }
    fi
  done
  return 0
}

shoot() {
  local name="$1"
  local wait="${WAIT:-9}"
  shift
  adb shell am force-stop "$PKG" || true
  adb shell am start -W -n "$ACTIVITY" --ez seed_sample true "$@" >/dev/null
  sleep "$wait"
  dismiss_dialogs
  adb exec-out screencap -p > "$OUT/$name.png"
  echo "== tersimpan $OUT/$name.png"
}

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

shoot 01-beranda --es screen home
shoot 02-avatar --es screen avatar
shoot 03-animasi --es screen animation
shoot 04-diagnosa --es screen diagnostics
shoot 05-pengaturan --es screen settings
shoot 11-chat --es screen chat

# Katalog klip: ambil sebelum overlay dijalankan (tanpa panel menu menutupi layar) dan gulir
# sampai daftar kartu terlihat, supaya penanda "Diputar" ikut terbukti.
adb shell am start -n "$ACTIVITY" --es screen animation >/dev/null
sleep 4
adb shell input swipe 540 1750 540 700 300
sleep 1
adb shell input swipe 540 1750 540 950 300
sleep 2
adb exec-out screencap -p > "$OUT/21-animasi-katalog.png"
echo "== tersimpan $OUT/21-animasi-katalog.png (katalog klip)"

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
  echo "--- pratinjau Beranda (MateEnginePreview) ---"
  adb logcat -d -s MateEnginePreview:I | tail -30
  echo "--- jendela siluet & bingkai (v0.1.10) ---"
  adb logcat -d -s MateEngineRender:I | grep -E "siluet|kotak tubuh|layar berubah|dipetakan|digeser|reaksi|sentuhan" | tail -25
  echo "--- penghematan area yang menelan sentuhan ---"
  adb logcat -d -s MateEngineRender:I | grep -o "= [0-9]*% dari desain" | grep -o "[0-9]*" \
    | python3 -c '
import sys
values = sorted(int(line) for line in sys.stdin if line.strip().isdigit())
if not values:
    print("kosong")
else:
    mid = values[len(values) // 2]
    print(f"n={len(values)} terkecil={values[0]}% median={mid}% terbesar={values[-1]}% "
          f"-> pengurangan luas median {100 - mid}%")
' 2>/dev/null || echo "kosong"
  echo "--- jendela overlay menurut WindowManager ---"
  adb shell dumpsys window windows | grep -A 6 "MateEngine avatar" | head -20
} > "$DIAG" 2>&1 || true
head -40 "$DIAG"

if ! service_running; then
  echo "::error::Servis overlay tidak berjalan; tangkapan overlay tidak akan menampilkan apa pun"
fi
adb shell input keyevent KEYCODE_HOME

# ---- bukti gerak: dua tangkapan 1,8 detik terpisah + jejak angka dari renderer ----
adb logcat -c || true
adb exec-out screencap -p > "$OUT/12-gerak-a.png"
sleep 1.8
adb exec-out screencap -p > "$OUT/12-gerak-b.png"
sleep 5
{
  echo "--- jejak gerak renderer (5 detik terakhir) ---"
  adb logcat -d | grep -o 'motion {.*}' | tail -4
} >> "$DIAG" 2>&1 || true
if cmp -s "$OUT/12-gerak-a.png" "$OUT/12-gerak-b.png"; then
  echo "::error::Dua tangkapan identik: avatar tidak bergerak sama sekali"
else
  echo "== bukti gerak: dua tangkapan berbeda (avatar bergerak)"
fi

# ---- bukti tangan tidak terangkat: sudut lengan hanya diukur saat klip istirahat ----
arm_report="$(adb logcat -d | grep -o 'motion {.*}' | tail -40 || true)"
echo "--- jejak sudut lengan ---" >> "$DIAG"
echo "$arm_report" >> "$DIAG" 2>&1 || true
# `set -e` akan mematikan skrip kalau status diambil langsung dari assignment, jadi status
# ditangkap lewat `||`.
arm_check="$(printf '%s\n' "$arm_report" | python3 scripts/periksa-sudut-lengan.py 2>&1)" && arm_status=0 || arm_status=$?
echo "--- pemeriksaan sudut lengan ---" >> "$DIAG"
echo "$arm_check" >> "$DIAG" 2>&1 || true
if [ "$arm_status" -eq 2 ]; then
  echo "::warning::Tidak ada jejak klip istirahat; bukti pose tidak terbaca"
elif [ "$arm_status" -eq 0 ]; then
  echo "== bukti pose: ${arm_check} (tangan di bawah bahu)"
else
  echo "::error::Tangan terangkat saat diam (${arm_check})"
fi

# ---- bukti direktur perilaku: avatar harus bergerak sendiri tanpa disentuh ----
# Ambang waktu direktur 2,2-7 detik, jadi jendela 30 detik cukup untuk beberapa aksi.
behavior_line=""
for _ in 1 2 3 4 5 6; do
  behavior_line="$(adb logcat -d | grep -o 'motion {.*}' | python3 -c '
import sys, json, re
seen = []
for line in sys.stdin:
    match = re.search(r"motion (\{.*\})", line)
    if not match:
        continue
    try:
        data = json.loads(match.group(1))
    except json.JSONDecodeError:
        continue
    if data.get("behavior") and data["behavior"] not in seen:
        seen.append(data["behavior"])
if seen:
    print(", ".join(seen))
' 2>/dev/null || true)"
  [ -n "$behavior_line" ] && break
  sleep 5
done
{
  echo "--- jejak direktur perilaku ---"
  echo "${behavior_line:-kosong}"
} >> "$DIAG" 2>&1 || true
if [ -n "$behavior_line" ]; then
  echo "== bukti perilaku: avatar bergerak sendiri (${behavior_line})"
else
  echo "::warning::Tidak ada perilaku otomatis dalam 30 detik; direktur perilaku belum terbukti"
fi

# ---- bukti skala: 100% vs 40% tinggi layar ----
shoot_scale() {
  local percent="$1" name="$2"
  adb shell am force-stop "$PKG" || true
  adb shell am start -W -n "$ACTIVITY" --ez seed_sample true --ez start_overlay true \
    --ei scale "$percent" --es screen home >/dev/null
  sleep 9
  for i in $(seq 1 12); do
    sleep 5
    if adb logcat -d | grep -q "MateEngineRender.*avatar-ready"; then break; fi
  done
  sleep 2
  adb exec-out screencap -p > "$OUT/$name.png"
  echo "== tersimpan $OUT/$name.png (skala ${percent}%)"
}
shoot_scale 100 13-overlay-skala-100
shoot_scale 40 14-overlay-skala-40

# ---- bukti mode duduk: kaki harus tetap utuh di dalam kanvas ----
# Angka `bodyGap {top,bottom}` dikirim renderer tiap 5 detik (lihat frameGaps()).
adb shell am force-stop "$PKG" || true
adb logcat -c || true
adb shell am start -W -n "$ACTIVITY" --ez seed_sample true --ez start_overlay true \
  --ez seated true --ei scale 80 --es screen home >/dev/null
for i in $(seq 1 18); do
  sleep 5
  if adb logcat -d | grep -q "MateEngineRender.*avatar-ready"; then break; fi
done
sleep 8
{
  echo "--- jendela saat mode duduk ---"
  adb shell dumpsys window windows | grep -A 3 "MateEngine avatar" | head -6
  adb logcat -d -s MateEngineRender:I | grep -E "gestur |debug-skin|debug-gpu|debug-view|debug-mesh|potongan jendela|jendela siluet|kotak tubuh" | tail -22
} >> "$DIAG" 2>&1 || true
adb exec-out screencap -p > "$OUT/19-overlay-duduk.png"
echo "== tersimpan $OUT/19-overlay-duduk.png (mode duduk)"
seat_gap="$(adb logcat -d | grep -o 'motion {.*}' | python3 scripts/periksa-celah-tubuh.py --seated || true)"
{
  echo "--- celah tubuh saat duduk (piksel) ---"
  echo "${seat_gap:-kosong}"
} >> "$DIAG" 2>&1 || true
if [ -z "$seat_gap" ]; then
  echo "::warning::Tidak ada angka bodyGap saat duduk; bukti kaki utuh tidak terbaca"
elif adb logcat -d | grep -o 'motion {.*}' | python3 scripts/periksa-celah-tubuh.py --seated --tegas >/dev/null 2>&1; then
  echo "== bukti duduk: seluruh tubuh muat (${seat_gap})"
else
  echo "::error::Tubuh terpotong saat duduk (${seat_gap}); kaki hilang"
fi

# ---- bukti geser bebas: avatar dipindah ke pojok kiri-atas melewati batas lama ----
read -r DRAG_W DRAG_H <<<"$(screen_size)"
adb logcat -c || true
adb shell input swipe $((DRAG_W / 2)) $((DRAG_H / 2)) 20 20 700
sleep 3
# Geser kedua menuju tepi kanan-bawah: membuktikan avatar benar-benar sampai pinggir layar,
# bukan berhenti beberapa puluh piksel sebelumnya.
# Durasi 1,5 detik: meniru geseran tangan, bukan lemparan cepat. Lemparan cepat membuat
# gestur dibatalkan setelah beberapa frame sehingga jarak tempuh tidak bisa dinilai.
adb shell input swipe 120 600 $((DRAG_W - 8)) $((DRAG_H - 8)) 1500
sleep 3
adb exec-out screencap -p > "$OUT/20-overlay-geser-pojok.png"
echo "== tersimpan $OUT/20-overlay-geser-pojok.png (avatar digeser ke pojok)"
{
  echo "--- jendela tepat setelah digeser ke pojok ---"
  adb shell dumpsys window windows | grep -A 3 "MateEngine avatar" | head -6
  adb logcat -d -s MateEngineRender:I | grep -E "gestur |jendela siluet|kotak tubuh|digeser ke|geser selesai" | tail -14
} >> "$DIAG" 2>&1 || true
# Setelah pegas menetapkan posisi akhir, ambil ulang bukti: kalau isi kanvas sejajar dengan
# jendelanya, avatar harus tampil utuh pada tangkapan berikut.
sleep 4
adb exec-out screencap -p > "$OUT/20b-overlay-pojok-menepet.png"
{
  echo "--- jendela setelah pegas menetap (4 dtk) ---"
  adb shell dumpsys window windows | grep -A 3 "MateEngine avatar" | head -6
  adb logcat -d -s MateEngineRender:I | grep -E "gestur |jendela siluet|digeser ke|geser selesai" | tail -6
} >> "$DIAG" 2>&1 || true
echo "== tersimpan $OUT/20b-overlay-pojok-menepet.png"
drag_line="$(adb logcat -d | grep -o 'geser selesai: jendela [0-9]*x[0-9]* di ([0-9-]*, [0-9-]*) dari layar [0-9]*x[0-9]*' | tail -1)"
echo "--- hasil geser ---" >> "$DIAG"
echo "${drag_line:-kosong}" >> "$DIAG" 2>&1 || true
if [ -z "$drag_line" ]; then
  echo "::warning::Geseran tidak tercatat di logcat; bukti geser bebas tidak terbaca"
elif echo "$drag_line" | python3 scripts/periksa-tepi-geser.py; then
  echo "== bukti geser sampai tepi: ${drag_line}"
else
  echo "::error::Avatar tidak sampai tepi layar (${drag_line}); geser masih mentok"
fi
adb shell am force-stop "$PKG" || true


echo "== menunggu renderer memuat model (maks 180 detik)"
ready=0
for i in $(seq 1 36); do
  sleep 5
  # `avatar-ready` adalah bukti terbaik, tetapi pada emulator GL perangkat lunak model kadang
  # siap lebih lambat dari 90 detik. `body-box` hanya dikirim setelah badan benar-benar diukur,
  # jadi itu pun sah sebagai bukti avatar sudah hidup.
  if adb logcat -d | grep -qE "MateEngineRender.*(avatar-ready|kotak tubuh)"; then
    echo "== renderer siap setelah $((i * 5)) detik"
    ready=1
    break
  fi
done
if [ "$ready" -eq 0 ]; then
  # Dulu kegagalan ini hanya menghasilkan tangkapan kosong tanpa penjelasan.
  echo "::error::Renderer tidak pernah melaporkan avatar-ready; tangkapan 06 akan kosong"
  {
    echo "--- logcat saat avatar gagal siap ---"
    adb logcat -d | grep -E "MateEngineRender|chromium|AndroidRuntime" | tail -30
  } >> "$DIAG" 2>&1 || true
fi
sleep 4
{
  echo "--- jendela saat tangkapan 06 (tanpa aplikasi di depan) ---"
  adb shell dumpsys window windows | grep -A 3 "MateEngine avatar" | head -6
  adb logcat -d -s MateEngineRender:I | grep -E "avatar-ready|jendela siluet|renderer error" | tail -6
} >> "$DIAG" 2>&1 || true
adb exec-out screencap -p > "$OUT/06-overlay.png"
echo "== tersimpan $OUT/06-overlay.png"

# ---- bukti menu cepat: avatar diketuk 3× membuka menu pilihan ----
shoot_menu() {
  local name="$1" screen="$2"
  adb shell am force-stop "$PKG" || true
  adb shell am start -W -n "$ACTIVITY" --ez seed_sample true --ez start_overlay true \
    --es open_menu "$screen" --es screen home >/dev/null
  # Menu dibuat 5 detik setelah aplikasi jalan; tunggu avatar siap agar gambarnya lengkap.
  for i in $(seq 1 18); do
    sleep 5
    if adb logcat -d | grep -q "MateEngineRender.*avatar-ready"; then break; fi
  done
  sleep 3
  adb exec-out screencap -p > "$OUT/$name.png"
  echo "== tersimpan $OUT/$name.png (menu $screen)"
}
shoot_menu 15-menu-cepat root
shoot_menu 16-menu-gerak clips
shoot_menu 17-menu-chat chat

if adb logcat -d | grep -q "menu cepat dibuka"; then
  echo "== bukti menu cepat: panel muncul setelah avatar diketuk 3×"
else
  echo "::error::Menu cepat tidak pernah terbuka; bukti menu tidak ada"
fi

# Ketukan nyata (bukan hook debug) harus memicu menu yang sama.
adb shell am force-stop "$PKG" || true
adb shell am start -W -n "$ACTIVITY" --ez seed_sample true --ez start_overlay true --es screen home >/dev/null
sleep 12
read -r TAP_W TAP_H <<<"$(screen_size)"
AVATAR_LINE="$(adb logcat -d | grep -o 'overlay window ditambahkan [0-9]*x[0-9]* di ([0-9]*, [0-9]*)' | tail -1)"
awk_x=$(printf '%s' "$AVATAR_LINE" | sed -n 's/.*di (\([0-9]*\), \([0-9]*\)).*/\1/p')
awk_y=$(printf '%s' "$AVATAR_LINE" | sed -n 's/.*di (\([0-9]*\), \([0-9]*\)).*/\2/p')
awk_w=$(printf '%s' "$AVATAR_LINE" | sed -n 's/.*ditambahkan \([0-9]*\)x.*/\1/p')
awk_h=$(printf '%s' "$AVATAR_LINE" | sed -n 's/.*x\([0-9]*\) di.*/\1/p')
if [ -n "$awk_x" ] && [ -n "$awk_y" ]; then
  TAP_X=$((awk_x + awk_w / 2))
  TAP_Y=$((awk_y + awk_h / 2))
  echo "== mengetuk avatar 3× di ($TAP_X, $TAP_Y)"
  adb logcat -c || true
  for i in 1 2 3; do
    adb shell input tap "$TAP_X" "$TAP_Y"
    sleep 0.25
  done
  sleep 3
  if adb logcat -d | grep -q "menu cepat dibuka"; then
    echo "== bukti 3× ketuk: menu terbuka dari ketukan sungguhan"
    adb exec-out screencap -p > "$OUT/18-menu-3x-ketuk.png"
  else
    echo "::warning::Menu tidak terbuka dari 3 ketukan (koordinat ${TAP_X},${TAP_Y}); hook debug tetap terbukti"
  fi
else
  echo "::warning::Posisi jendela avatar tidak terbaca; uji ketukan dilewati"
fi

echo "== status aplikasi saat overlay berjalan"
adb shell am start -n "$ACTIVITY" --es screen home >/dev/null
sleep 5
adb exec-out screencap -p > "$OUT/07-beranda-saat-overlay.png"
echo "== tersimpan $OUT/07-beranda-saat-overlay.png"

# Katalog saat overlay berjalan: kartu klip yang sedang diputar harus bertanda "Diputar".
# Service dijalankan ulang tanpa `open_menu` supaya panel 3× ketuk dari uji sebelumnya tidak
# menutupi layar (panel itu tetap terbuka selama service hidup).
# Skala 25% dipakai supaya jendela overlay kecil dan tidak menutupi seluruh layar — perlu diingat
# bahwa jendela overlay memang *selalu* menahan sentuhan (permintaan produk), jadi pada skala besar
# geseran jari tidak sampai ke aplikasi di bawahnya.
adb shell am force-stop "$PKG" || true
adb shell am start -W -n "$ACTIVITY" --ez seed_sample true --ez start_overlay true \
  --ei scale 25 --es screen animation >/dev/null
for i in $(seq 1 12); do
  sleep 5
  if adb logcat -d | grep -q "MateEngineRender.*avatar-ready"; then break; fi
done
sleep 3
adb shell input swipe 540 1750 540 700 300
sleep 1
adb shell input swipe 540 1750 540 950 300
sleep 2
adb exec-out screencap -p > "$OUT/22-animasi-diputar.png"
echo "== tersimpan $OUT/22-animasi-diputar.png (klip aktif ditandai)"

# Ukuran teks besar (aksesibilitas): tata letak harus tetap utuh. Overlay dimatikan agar yang
# dinilai benar-benar tata letak aplikasi, bukan avatar yang menutupinya.
adb shell am force-stop "$PKG" || true
adb shell settings put system font_scale 1.3
sleep 2
adb shell am start -W -n "$ACTIVITY" --es screen home >/dev/null
sleep 5
adb exec-out screencap -p > "$OUT/23-teks-besar.png"
adb shell am start -n "$ACTIVITY" --es screen animation >/dev/null
sleep 3
adb exec-out screencap -p > "$OUT/24-teks-besar-animasi.png"
echo "== tersimpan 23-teks-besar.png & 24-teks-besar-animasi.png (font_scale 1,3)"
adb shell settings put system font_scale 1.0
sleep 1

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
adb shell cmd uimode night no || true
sleep 3
adb shell settings put system accelerometer_rotation 0
adb shell settings put system user_rotation 1
sleep 4
shoot 10-beranda-lebar --es screen home

adb shell settings put system user_rotation 0
adb shell cmd uimode night no || true

echo "== ringkasan file"
ls -l "$OUT"
