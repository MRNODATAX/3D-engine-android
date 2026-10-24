package io.github.mrnodatax.mateengine.ui

/**
 * Seluruh teks antarmuka dalam bahasa Indonesia, dikumpulkan di satu tempat agar mudah
 * dipindahkan ke `strings.xml` saat lokalisasi ditambahkan.
 */
object T {
    // Navigasi
    const val navHome = "Beranda"
    const val navAvatar = "Avatar"
    const val navChat = "Chat"
    const val navAnimation = "Animasi"
    const val navDiagnostics = "Diagnosa"
    const val navSettings = "Pengaturan"
    const val navSettingsShort = "Setelan"

    const val tagline = "Avatar VRM di atas aplikasi lain"

    // Beranda
    const val statusReady = "Siap dijalankan"
    const val statusNoModel = "Belum ada model"
    const val statusNoPermission = "Izin overlay belum aktif"
    const val bodyReady = "Avatarmu tampil di atas aplikasi lain. Geser untuk memindahkan; kunci posisi agar sentuhan diteruskan ke aplikasi di bawah."
    const val bodyNoModel = "Impor berkas .vrm milikmu. Aplikasi tidak menyertakan avatar bawaan."
    const val bodyNoPermission = "Android memblokir jendela di atas aplikasi lain sampai izin diberikan."
    const val startAvatar = "Jalankan avatar"
    const val stopAvatar = "Hentikan"
    const val openOverlayPermission = "Buka izin overlay"
    const val importModel = "Impor model VRM"
    const val runningNow = "Sedang tampil"
    const val chipOverlayGranted = "Izin overlay aktif"
    const val chipOverlayDenied = "Izin overlay ditolak"
    const val chipModelMissing = "Model belum dipilih"
    const val chipRendererReady = "Renderer siap"
    const val chipWaitingRenderer = "Menunggu renderer"
    const val quickControls = "Kontrol cepat"
    const val labelSize = "Ukuran overlay"
    const val labelOpacity = "Opasitas"
    const val lockPosition = "Kunci posisi"
    const val lockPositionDesc = "Sentuhan diteruskan ke aplikasi di bawah; avatar tidak bisa digeser"
    const val recentTitle = "Terakhir dipakai"

    // Avatar
    const val avatarTitle = "Model avatar"
    const val avatarBody = "Berkas dibaca lewat pemilih sistem, lalu disalin ke penyimpanan aplikasi agar tetap tersedia setelah izin sesi berakhir."
    const val importVrm = "Impor .vrm"
    const val removeModel = "Hapus model"
    const val useModel = "Pakai"
    const val active = "Aktif"
    const val noAvatars = "Belum ada model. Impor berkas .vrm untuk mulai."
    const val detailTitle = "Detail model terpilih"
    const val format = "Format"
    const val license = "Lisensi model"
    const val humanoidBones = "Humanoid bone"
    const val expressionPresets = "Ekspresi"
    const val authors = "Pembuat"
    const val sizeLabel = "Ukuran berkas"
    const val metadataNote = "Nilai di atas dibaca langsung dari metadata di dalam berkas VRM, bukan diisi manual."
    const val noMetadata = "Metadata VRM tidak terbaca"

    // Animasi
    const val animationTitle = "Pemutar animasi"
    const val animationBody = "Impor berkas .vrma (VRM Animation). Animasi diputar pada avatar yang sedang tampil."
    const val play = "Putar"
    const val stopAnimation = "Berhenti"
    const val importVrma = "Impor .vrma"
    const val noAnimations = "Belum ada animasi. Impor berkas .vrma."
    const val playOptions = "Opsi pemutaran"
    const val loopLabel = "Loop"
    const val loopDesc = "Ulangi animasi tanpa henti"
    const val shuffleLabel = "Shuffle"
    const val shuffleDesc = "Acak animasi saat berpindah"
    const val speedLabel = "Kecepatan"
    const val animationNote = "Tanpa animasi, avatar tetap bernapas dan berkedip lewat idle prosedural ringan."
    const val needAvatarFirst = "Jalankan avatar terlebih dahulu"

    // Diagnosa
    const val diagnosticsTitle = "Diagnosa perangkat"
    const val diagnosticsBody = "Status di bawah dibaca dari sistem saat halaman dibuka. Tidak ada tombol yang mengaku memperbaiki pembatasan produsen."
    const val diagnosticsReport = "Ringkasan diagnosa"
    const val diagnosticsReportBody = "Sertakan teks ini saat melaporkan masalah. Tidak memuat isi model atau data pribadi."
    const val copyReport = "Salin ringkasan"
    const val copied = "Ringkasan disalin"
    const val diagnosticsWarning = "Pemblokiran izin oleh produsen tidak bisa dilewati aplikasi. Diagnosa hanya menunjukkan lokasinya."

    // Pengaturan
    const val overlaySection = "Overlay"
    const val fpsLabel = "Batas FPS"
    const val qualityLabel = "Kualitas render"
    const val qualityLow = "Rendah"
    const val qualityMedium = "Sedang"
    const val qualityHigh = "Tinggi"
    const val themeLabel = "Tema"
    const val themeSystem = "Mengikuti sistem"
    const val languageLabel = "Bahasa"
    const val aboutLabel = "Tentang"
    const val storageTitle = "Data aplikasi"
    const val storageBody = "Model dan animasi hasil impor disalin ke penyimpanan aplikasi. Menghapus data menghapus salinan itu, bukan berkas aslimu."
    const val clearCache = "Bersihkan cache render"
    const val clearCacheDone = "Cache render dibersihkan"
    const val deleteAll = "Hapus semua data"
    const val deleteAllConfirm = "Hapus semua model, animasi, dan pengaturan?"
    const val delete = "Hapus"
    const val cancel = "Batal"
    const val storageNote = "Berkas asli di penyimpanan pengguna tidak pernah diubah atau dihapus."
    const val aboutBody = "Mate Engine Android adalah port yang sedang dibangun. Acuan perilaku: Mate Engine desktop (AGPL v3 & MateProv2). Aplikasi ini tidak membundel avatar bawaan Mate Engine maupun aset berhak cipta."
    const val openDesktopRelease = "Buka rilis desktop"
    const val versionLabel = "Versi"

    // Umum
    const val errorPrefix = "Gagal"
    const val retry = "Coba lagi"
    const val notice = "Catatan"
}
