#!/usr/bin/env bash
# Menjalankan Gradle di CI sambil meneruskan error penting sebagai anotasi.
# Anotasi dipakai karena log mentah Actions tidak dapat diunduh dari lingkungan agen.
set -uo pipefail
LOG="${GRADLE_LOG:-build.log}"
gradle "$@" --no-daemon --stacktrace 2>&1 | tee "$LOG"
status=${PIPESTATUS[0]}

if [ "$status" -eq 0 ] || grep -qE "BUILD SUCCESSFUL" "$LOG"; then
  exit 0
fi

grep -E "^e: |error:|^FAILURE:|What went wrong|Caused by:|> Could not|Execution failed" "$LOG" \
  | head -30 \
  | tr -d '\r' \
  | while IFS= read -r line; do
      echo "::error::${line:0:900}"
    done
exit "$status"
