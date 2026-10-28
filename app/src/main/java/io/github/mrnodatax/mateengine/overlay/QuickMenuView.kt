package io.github.mrnodatax.mateengine.overlay

import android.content.Context
import android.content.res.Configuration
import android.graphics.Typeface
import android.graphics.drawable.GradientDrawable
import android.text.Editable
import android.text.InputType
import android.text.TextWatcher
import android.util.TypedValue
import android.view.Gravity
import android.view.View
import android.view.inputmethod.EditorInfo
import android.widget.EditText
import android.widget.LinearLayout
import android.widget.ScrollView
import android.widget.TextView
import androidx.core.content.res.ResourcesCompat
import io.github.mrnodatax.mateengine.R
import io.github.mrnodatax.mateengine.chat.ChatMessage
import io.github.mrnodatax.mateengine.ui.theme.MateTokens

/**
 * Isi menu cepat (avatar diketuk 3×) sebagai View biasa, bukan Compose.
 *
 * Kenapa bukan Compose: menu hidup di jendela overlay milik Service, dan `ComposeView` di sana
 * butuh `LifecycleOwner`/`SavedStateRegistryOwner` yang harus dipasang manual — percobaan pertama
 * gagal kompilasi dan berisiko gagal saat runtime tanpa emulator. View biasa tidak punya syarat itu
 * dan tetap memakai warna, bentuk, font, serta label yang sama dengan layar Compose.
 */
class QuickMenuController {
    var screen: QuickMenuScreen = QuickMenuScreen.ROOT
    var seated: Boolean = false
    var activeClip: String? = null
    var sending: Boolean = false
    var hasApiKey: Boolean = false
    var error: String? = null
    val messages = mutableListOf<ChatMessage>()

    fun showMessages(list: List<ChatMessage>) {
        messages.clear()
        messages.addAll(list.takeLast(8))
    }
}

/** Aksi yang dipilih pengguna; dijalankan oleh [OverlayService]. */
class QuickMenuCallbacks(
    val onAction: (QuickMenuAction) -> Unit = {},
    val onClip: (String) -> Unit = {},
    val onSend: (String) -> Unit = {},
    val onClose: () -> Unit = {},
    val onOpenChatApp: () -> Unit = {},
)

class QuickMenuView(
    context: Context,
    private val controller: QuickMenuController,
    private val callbacks: QuickMenuCallbacks,
) : LinearLayout(context) {

    private val dark = (context.resources.configuration.uiMode and Configuration.UI_MODE_NIGHT_MASK) ==
        Configuration.UI_MODE_NIGHT_YES

    private val surface = argb(if (dark) MateTokens.SurfaceDark else MateTokens.Surface)
    private val onSurface = argb(if (dark) MateTokens.OnSurfaceDark else MateTokens.OnSurface)
    private val onSurfaceVariant = argb(if (dark) MateTokens.OnSurfaceVariantDark else MateTokens.OnSurfaceVariant)
    private val outline = argb(if (dark) MateTokens.OutlineDark else MateTokens.Outline)
    private val accent = argb(if (dark) MateTokens.BrandPrimaryLight else MateTokens.BrandPrimary)
    private val onAccent = argb(if (dark) MateTokens.AccentInkDark else MateTokens.AccentInk)
    private val container = argb(if (dark) MateTokens.PrimaryContainerDark else MateTokens.PrimaryContainer)
    private val onContainer = argb(if (dark) MateTokens.OnPrimaryContainerDark else MateTokens.OnPrimaryContainer)
    private val bubbleOther = argb(if (dark) MateTokens.BubbleDark else MateTokens.Bubble)
    private val danger = argb(if (dark) MateTokens.ErrorDark else MateTokens.Error)

    private var input: EditText? = null

    init {
        orientation = VERTICAL
        setPadding(dp(16), dp(14), dp(16), dp(16))
        background = rounded(surface, dp(28), outline, dp(1))
        elevation = dp(12).toFloat()
        layoutParams = LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT)
        minimumWidth = dp(268)
    }

    fun render() {
        removeAllViews()
        input = null
        when (controller.screen) {
            QuickMenuScreen.ROOT -> renderRoot()
            QuickMenuScreen.CLIPS -> renderClips()
            QuickMenuScreen.CHAT -> renderChat()
        }
    }

    // ------------------------------------------------------------------ layar

    private fun renderRoot() {
        addView(header("Mau apa?", "Ketuk avatar 3× untuk menu ini", null))
        addView(spacer(12))
        addView(
            rowsOfTiles(
                Tile("Gerak", "Gerakan custom", QuickMenuAction.ANIMATIONS),
                Tile("Chat AI", "Balon obrolan", QuickMenuAction.CHAT),
            ),
        )
        addView(spacer(8))
        addView(
            rowsOfTiles(
                Tile(
                    if (controller.seated) "Berdiri" else "Duduk",
                    if (controller.seated) "Kembali tegak" else "Di tepi layar",
                    QuickMenuAction.SEAT,
                ),
                Tile("Setelan", "Buka aplikasi", QuickMenuAction.SETTINGS),
            ),
        )
    }

    private fun renderClips() {
        addView(header("Gerak", "Klip bawaan CC0, langsung diputar") { back() })
        addView(spacer(12))
        BuiltinClips.quick.chunked(2).forEachIndexed { index, pair ->
            if (index > 0) addView(spacer(8))
            val row = LinearLayout(context).apply {
                orientation = HORIZONTAL
                layoutParams = LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT)
            }
            pair.forEach { clip ->
                val selected = BuiltinClips.isActive(clip.key, controller.activeClip)
                row.addView(
                    pill(
                        text = clip.label,
                        filled = selected,
                        onClick = { callbacks.onClip(clip.key) },
                    ).also { it.layoutParams = LayoutParams(0, dp(48), 1f).apply { rightMargin = dp(8) } },
                )
            }
            if (pair.size == 1) {
                row.addView(View(context), LayoutParams(0, dp(48), 1f))
            }
            addView(row)
        }
        addView(spacer(10))
        addView(
            body("Animasi impor (.vrma) diputar dari tab Animasi di aplikasi."),
        )
    }

    private fun renderChat() {
        addView(header("Chat AI", if (controller.sending) "Mengetik…" else "Balasan muncul di sini") { back() })
        addView(spacer(10))

        if (!controller.hasApiKey) {
            addView(body("Kunci Gemini belum diisi. Buka tab Chat untuk menempel kuncinya sekali saja."))
            addView(spacer(10))
            addView(pill("Buka tab Chat", filled = true, onClick = { callbacks.onOpenChatApp() }))
            return
        }

        val messages = LinearLayout(context).apply {
            orientation = VERTICAL
            layoutParams = LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT)
        }
        if (controller.messages.isEmpty()) {
            messages.addView(body("Tanya apa saja. Balasan dibacakan sesuai pengaturan suara."))
        }
        controller.messages.forEach { messages.addView(bubble(it)) }
        controller.error?.let { messages.addView(label(it, 12, danger)) }

        val scroll = ScrollView(context).apply {
            isFillViewport = false
            addView(messages)
        }
        addView(scroll, LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT))
        // Batasi tinggi daftar pesan supaya panel tidak tumbuh melebihi layar.
        scroll.post {
            val max = dp(196)
            if (scroll.height > max) {
                scroll.layoutParams = scroll.layoutParams.apply { height = max }
                scroll.requestLayout()
            }
        }

        addView(spacer(10))
        addView(inputRow())
    }

    // ------------------------------------------------------------------ bagian UI

    private fun header(title: String, subtitle: String?, onBack: (() -> Unit)?): View {
        val row = LinearLayout(context).apply {
            orientation = HORIZONTAL
            gravity = Gravity.CENTER_VERTICAL
            layoutParams = LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT)
        }
        if (onBack != null) {
            row.addView(
                textButton("‹") { onBack() }.also {
                    it.layoutParams = LayoutParams(dp(40), dp(40)).apply { rightMargin = dp(4) }
                },
            )
        } else {
            // Tanda merek satu warna, 20dp (lihat docs/brand-guidelines.md).
            row.addView(
                View(context).apply {
                    background = androidx.core.content.ContextCompat.getDrawable(context, R.drawable.ic_brand_mark)
                    // Tanda merek aslinya hitam; warnai dengan aksen agar terbaca di tema gelap.
                    backgroundTintList = android.content.res.ColorStateList.valueOf(accent)
                    layoutParams = LayoutParams(dp(20), dp(20)).apply { rightMargin = dp(8) }
                },
            )
        }

        val titles = LinearLayout(context).apply {
            orientation = VERTICAL
            layoutParams = LayoutParams(0, LayoutParams.WRAP_CONTENT, 1f)
        }
        titles.addView(label(title, 14, onSurface, weight = 600).apply { maxLines = 1 })
        if (subtitle != null) titles.addView(label(subtitle, 11, onSurfaceVariant))
        row.addView(titles)

        row.addView(
            textButton("×") { callbacks.onClose() }.also {
                it.layoutParams = LayoutParams(dp(40), dp(40))
                it.contentDescription = "Tutup menu"
            },
        )
        return row
    }

    private data class Tile(val label: String, val hint: String, val action: QuickMenuAction)

    private fun rowsOfTiles(left: Tile, right: Tile): View {
        val row = LinearLayout(context).apply {
            orientation = HORIZONTAL
            layoutParams = LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT)
        }
        row.addView(tileView(left).also { it.layoutParams = LayoutParams(0, dp(84), 1f).apply { rightMargin = dp(8) } })
        row.addView(tileView(right).also { it.layoutParams = LayoutParams(0, dp(84), 1f) })
        return row
    }

    private fun tileView(tile: Tile): View {
        val tileLayout = LinearLayout(context).apply {
            orientation = VERTICAL
            gravity = Gravity.CENTER_VERTICAL
            setPadding(dp(12), dp(10), dp(12), dp(10))
            background = rounded(container, dp(20))
            isClickable = true
            isFocusable = true
            contentDescription = "${tile.label}: ${tile.hint}"
            setOnClickListener {
                callbacks.onAction(tile.action)
                render()
            }
        }
        tileLayout.addView(label(tile.label, 14, onContainer, weight = 600))
        tileLayout.addView(label(tile.hint, 11, onContainer).apply { alpha = 0.78f })
        return tileLayout
    }

    private fun inputRow(): View {
        val row = LinearLayout(context).apply {
            orientation = HORIZONTAL
            gravity = Gravity.CENTER_VERTICAL
            layoutParams = LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT)
        }
        val field = EditText(context).apply {
            hint = "Tulis pesan…"
            textSize = 14f
            setTextColor(onSurface)
            setHintTextColor(onSurfaceVariant)
            inputType = InputType.TYPE_CLASS_TEXT or InputType.TYPE_TEXT_FLAG_CAP_SENTENCES
            imeOptions = EditorInfo.IME_ACTION_SEND
            maxLines = 3
            minHeight = dp(48)
            setPadding(dp(10), dp(8), dp(10), dp(8))
            background = rounded(bubbleOther, dp(14), outline, dp(1))
            layoutParams = LayoutParams(0, LayoutParams.WRAP_CONTENT, 1f).apply { rightMargin = dp(8) }
            setOnEditorActionListener { _, actionId, _ ->
                val send = actionId == EditorInfo.IME_ACTION_SEND
                if (send) sendDraft()
                send
            }
        }
        input = field
        row.addView(field)

        val send = pill("Kirim", filled = true, onClick = { sendDraft() })
        send.isEnabled = false
        val sendLayout = LayoutParams(LayoutParams.WRAP_CONTENT, dp(48))
        send.layoutParams = sendLayout
        row.addView(send)

        field.addTextChangedListener(object : TextWatcher {
            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) = Unit
            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) = Unit
            override fun afterTextChanged(s: Editable?) {
                val usable = !s.isNullOrBlank() && !controller.sending
                send.isEnabled = usable
                send.alpha = if (usable) 1f else 0.45f
            }
        })

        field.requestFocus()
        field.post {
            val imm = context.getSystemService(Context.INPUT_METHOD_SERVICE) as? android.view.inputmethod.InputMethodManager
            imm?.showSoftInput(field, android.view.inputmethod.InputMethodManager.SHOW_IMPLICIT)
        }
        return row
    }

    private fun sendDraft() {
        val field = input ?: return
        val text = field.text?.toString()?.trim().orEmpty()
        if (text.isEmpty() || controller.sending) return
        field.setText("")
        callbacks.onSend(text)
        setBusy(true)
    }

    /** Tampilkan status "mengirim" tanpa menunggu putaran ChatController berikutnya. */
    fun setBusy(busy: Boolean) {
        controller.sending = busy
        render()
        if (!busy) input?.requestFocus()
    }

    private fun bubble(message: ChatMessage): View {
        val wrapper = LinearLayout(context).apply {
            orientation = VERTICAL
            layoutParams = LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT).apply {
                topMargin = dp(6)
            }
            gravity = if (message.role == ChatMessage.Role.USER) Gravity.END else Gravity.START
        }
        val fill = when {
            message.failed -> argb(MateTokens.ErrorContainer)
            message.role == ChatMessage.Role.USER -> container
            else -> bubbleOther
        }
        val ink = when {
            message.failed -> danger
            message.role == ChatMessage.Role.USER -> onContainer
            else -> onSurface
        }
        wrapper.addView(
            label(message.text, 12, ink).apply {
                setPadding(dp(10), dp(8), dp(10), dp(8))
                background = rounded(fill, dp(16))
                maxWidth = dp(228)
            },
        )
        return wrapper
    }

    private fun pill(text: String, filled: Boolean, onClick: () -> Unit): TextView =
        label(text, 13, if (filled) onAccent else onSurface, weight = 600).apply {
            gravity = Gravity.CENTER
            minHeight = dp(48)
            setPadding(dp(14), 0, dp(14), 0)
            maxLines = 1
            background = if (filled) {
                rounded(accent, dp(16))
            } else {
                rounded(surface, dp(16), outline, dp(1))
            }
            isClickable = true
            isFocusable = true
            setOnClickListener { onClick() }
        }

    private fun textButton(text: String, onClick: () -> Unit): TextView =
        label(text, 20, onSurfaceVariant).apply {
            gravity = Gravity.CENTER
            isClickable = true
            isFocusable = true
            setOnClickListener { onClick() }
        }

    private fun body(text: String): TextView =
        label(text, 12, onSurfaceVariant).apply {
            layoutParams = LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT)
        }

    private fun spacer(heightDp: Int): View =
        View(context).apply { layoutParams = LayoutParams(LayoutParams.MATCH_PARENT, dp(heightDp)) }

    private fun back() {
        controller.screen = QuickMenuScreen.ROOT
        render()
    }

    // ------------------------------------------------------------------ util

    private fun label(text: String, sizeSp: Int, color: Int, weight: Int = 400): TextView =
        TextView(context).apply {
            this.text = text
            setTextColor(color)
            setTextSize(TypedValue.COMPLEX_UNIT_SP, sizeSp.toFloat())
            typeface = outfit(weight)
        }

    /**
     * Outfit dimuat dari `res/font`.
     *
     * Catatan: sumbu `wght` font variabel hanya bisa dipatok lewat Compose (`FontVariation`) atau
     * `android.graphics.fonts.Font.Builder` (API 29+); `Typeface` tidak punya setter publik untuk
     * itu. Di panel overlay ini berat ditebalkan secara sintetis — cukup untuk label 11–14sp dan
     * tidak menambah ketergantungan API level.
     */
    private fun outfit(weight: Int): Typeface {
        val base = ResourcesCompat.getFont(context, R.font.outfit) ?: Typeface.DEFAULT
        return Typeface.create(base, if (weight >= 500) Typeface.BOLD else Typeface.NORMAL)
    }

    private fun rounded(fill: Int, radiusPx: Int, stroke: Int? = null, strokePx: Int = 0): GradientDrawable =
        GradientDrawable().apply {
            setColor(fill)
            cornerRadius = radiusPx.toFloat()
            if (stroke != null) setStroke(strokePx.coerceAtLeast(1), stroke)
        }

    private fun argb(value: Long): Int = value.toInt()

    private fun dp(value: Int): Int = (value * resources.displayMetrics.density).toInt()
}
