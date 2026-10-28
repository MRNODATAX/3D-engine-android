package io.github.mrnodatax.mateengine.overlay

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.Email
import androidx.compose.material.icons.filled.KeyboardArrowDown
import androidx.compose.material.icons.filled.KeyboardArrowUp
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.material.icons.filled.Send
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material3.Button
import androidx.compose.material3.FilterChip
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.focus.FocusRequester
import androidx.compose.ui.focus.focusRequester
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import io.github.mrnodatax.mateengine.R
import io.github.mrnodatax.mateengine.chat.ChatMessage

/**
 * Menu yang muncul setelah avatar diketuk tiga kali.
 *
 * Isinya sengaja sedikit (empat aksi, lihat aturan "maksimal beberapa aksi per layar" di
 * docs/brand-guidelines.md): Gerak, Chat AI, Duduk/Berdiri, Setelan.
 *
 * Catatan penerapan: panel ini jendela overlay tersendiri, jadi boleh punya latar solid — larangan
 * "tanpa panel di belakang avatar" hanya berlaku untuk jendela avatar itu sendiri.
 */
class QuickMenuController {
    var screen by mutableStateOf(QuickMenuScreen.ROOT)
    var seated by mutableStateOf(false)
    var activeClip by mutableStateOf<String?>(null)
    var sending by mutableStateOf(false)
    var hasApiKey by mutableStateOf(false)
    var error by mutableStateOf<String?>(null)
    val messages = mutableStateListOf<ChatMessage>()

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

@Composable
fun QuickMenuPanel(controller: QuickMenuController, callbacks: QuickMenuCallbacks) {
    Surface(
        modifier = Modifier.width(300.dp),
        shape = RoundedCornerShape(28.dp),
        color = MaterialTheme.colorScheme.surface,
        contentColor = MaterialTheme.colorScheme.onSurface,
        tonalElevation = 3.dp,
        shadowElevation = 10.dp,
        border = androidx.compose.foundation.BorderStroke(
            1.dp,
            MaterialTheme.colorScheme.outline.copy(alpha = 0.55f),
        ),
    ) {
        Column(Modifier.padding(16.dp)) {
            when (controller.screen) {
                QuickMenuScreen.ROOT -> RootScreen(controller, callbacks)
                QuickMenuScreen.CLIPS -> ClipScreen(controller, callbacks)
                QuickMenuScreen.CHAT -> ChatScreen(controller, callbacks)
            }
        }
    }
}

@Composable
private fun Header(
    title: String,
    subtitle: String? = null,
    onBack: (() -> Unit)?,
    onClose: () -> Unit,
) {
    Row(verticalAlignment = Alignment.CenterVertically) {
        if (onBack != null) {
            IconButton(onClick = onBack, modifier = Modifier.size(40.dp)) {
                Icon(Icons.Filled.ArrowBack, contentDescription = "Kembali")
            }
            Spacer(Modifier.width(4.dp))
        } else {
            Icon(
                painter = painterResource(R.drawable.ic_brand_mark),
                contentDescription = null,
                tint = MaterialTheme.colorScheme.primary,
                modifier = Modifier.size(20.dp),
            )
            Spacer(Modifier.width(8.dp))
        }
        Column(Modifier.weight(1f)) {
            Text(title, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold)
            if (subtitle != null) {
                Text(
                    subtitle,
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis,
                )
            }
        }
        IconButton(onClick = onClose, modifier = Modifier.size(40.dp)) {
            Icon(Icons.Filled.Close, contentDescription = "Tutup menu")
        }
    }
}

@Composable
private fun RootScreen(controller: QuickMenuController, callbacks: QuickMenuCallbacks) {
    Header(
        title = "Mau apa?",
        subtitle = "Ketuk avatar 3× untuk menu ini",
        onBack = null,
        onClose = callbacks.onClose,
    )
    Spacer(Modifier.height(12.dp))
    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
        ActionTile(
            icon = Icons.Filled.PlayArrow,
            label = QuickMenuAction.ANIMATIONS.label,
            hint = "Gerakan custom",
            onClick = { callbacks.onAction(QuickMenuAction.ANIMATIONS) },
            modifier = Modifier.weight(1f),
        )
        ActionTile(
            icon = Icons.Filled.Email,
            label = QuickMenuAction.CHAT.label,
            hint = "Balon obrolan",
            onClick = { callbacks.onAction(QuickMenuAction.CHAT) },
            modifier = Modifier.weight(1f),
        )
    }
    Spacer(Modifier.height(8.dp))
    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
        ActionTile(
            icon = if (controller.seated) Icons.Filled.KeyboardArrowUp else Icons.Filled.KeyboardArrowDown,
            label = if (controller.seated) "Berdiri" else "Duduk",
            hint = if (controller.seated) "Kembali tegak" else "Di tepi layar",
            onClick = { callbacks.onAction(QuickMenuAction.SEAT) },
            modifier = Modifier.weight(1f),
        )
        ActionTile(
            icon = Icons.Filled.Settings,
            label = QuickMenuAction.SETTINGS.label,
            hint = "Buka aplikasi",
            onClick = { callbacks.onAction(QuickMenuAction.SETTINGS) },
            modifier = Modifier.weight(1f),
        )
    }
}

@Composable
private fun ActionTile(
    icon: ImageVector,
    label: String,
    hint: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
) {
    // Klik lewat Modifier.clickable: overload Surface(onClick) masih eksperimental di Compose 1.6.
    Surface(
        modifier = modifier.height(84.dp).clickable(onClick = onClick),
        shape = RoundedCornerShape(20.dp),
        color = MaterialTheme.colorScheme.primaryContainer.copy(alpha = 0.55f),
        contentColor = MaterialTheme.colorScheme.onPrimaryContainer,
    ) {
        Column(Modifier.padding(horizontal = 12.dp, vertical = 10.dp)) {
            Icon(icon, contentDescription = null, modifier = Modifier.size(22.dp))
            Spacer(Modifier.height(6.dp))
            Text(
                label,
                style = MaterialTheme.typography.labelLarge,
                fontWeight = FontWeight.SemiBold,
                maxLines = 1,
                softWrap = false,
            )
            Text(
                hint,
                style = MaterialTheme.typography.labelSmall,
                maxLines = 1,
                softWrap = false,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
        }
    }
}

@Composable
private fun ClipScreen(controller: QuickMenuController, callbacks: QuickMenuCallbacks) {
    Header(
        title = "Gerak",
        subtitle = "Klip bawaan CC0, langsung diputar",
        onBack = { controller.screen = QuickMenuScreen.ROOT },
        onClose = callbacks.onClose,
    )
    Spacer(Modifier.height(12.dp))
    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
        BuiltinClips.quick.chunked(2).forEach { pair ->
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                pair.forEach { clip ->
                    FilterChip(
                        selected = BuiltinClips.isActive(clip.key, controller.activeClip),
                        onClick = { callbacks.onClip(clip.key) },
                        label = {
                            Text(
                                clip.label,
                                maxLines = 1,
                                softWrap = false,
                                overflow = TextOverflow.Ellipsis,
                            )
                        },
                        modifier = Modifier.weight(1f).heightIn(min = 48.dp),
                    )
                }
                if (pair.size == 1) Spacer(Modifier.weight(1f))
            }
        }
    }
    Spacer(Modifier.height(4.dp))
    Text(
        "Animasi impor (.vrma) diputar dari tab Animasi di aplikasi.",
        style = MaterialTheme.typography.bodySmall,
        color = MaterialTheme.colorScheme.onSurfaceVariant,
    )
}

@Composable
private fun ChatScreen(controller: QuickMenuController, callbacks: QuickMenuCallbacks) {
    var draft by remember { mutableStateOf("") }
    // Jendela menu baru menjadi fokus saat panel chat dibuka; fokuskan kolom isian agar papan
    // ketik langsung muncul tanpa ketukan tambahan.
    val focusRequester = remember { FocusRequester() }
    LaunchedEffect(Unit) { runCatching { focusRequester.requestFocus() } }
    Header(
        title = "Chat AI",
        subtitle = if (controller.sending) "Mengetik…" else "Balasan muncul di sini",
        onBack = { controller.screen = QuickMenuScreen.ROOT },
        onClose = callbacks.onClose,
    )
    Spacer(Modifier.height(10.dp))

    if (!controller.hasApiKey) {
        Text(
            "Kunci Gemini belum diisi. Buka tab Chat untuk menempel kuncinya sekali saja.",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
        )
        Spacer(Modifier.height(10.dp))
        Button(onClick = callbacks.onOpenChatApp, modifier = Modifier.fillMaxWidth()) {
            Text("Buka tab Chat")
        }
        return@Column
    }

    Column(
        modifier = Modifier
            .fillMaxWidth()
            .heightIn(min = 60.dp, max = 208.dp)
            .verticalScroll(rememberScrollState()),
        verticalArrangement = Arrangement.spacedBy(6.dp),
    ) {
        if (controller.messages.isEmpty()) {
            Text(
                "Tanya apa saja. Balasan dibacakan sesuai pengaturan suara.",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
        }
        controller.messages.forEach { message -> Bubble(message) }
        controller.error?.let { error ->
            Text(
                error,
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.error,
            )
        }
    }

    Spacer(Modifier.height(8.dp))
    Row(verticalAlignment = Alignment.CenterVertically) {
        OutlinedTextField(
            value = draft,
            onValueChange = { draft = it.take(500) },
            modifier = Modifier.weight(1f).focusRequester(focusRequester),
            placeholder = { Text("Tulis pesan…", maxLines = 1) },
            maxLines = 3,
            keyboardOptions = KeyboardOptions(imeAction = ImeAction.Send),
            keyboardActions = KeyboardActions(
                onSend = {
                    if (draft.isNotBlank() && !controller.sending) {
                        callbacks.onSend(draft)
                        draft = ""
                    }
                },
            ),
        )
        Spacer(Modifier.width(8.dp))
        IconButton(
            onClick = {
                if (draft.isNotBlank() && !controller.sending) {
                    callbacks.onSend(draft)
                    draft = ""
                }
            },
            enabled = draft.isNotBlank() && !controller.sending,
            modifier = Modifier.size(48.dp),
        ) {
            Icon(Icons.Filled.Send, contentDescription = "Kirim pesan")
        }
    }
}

@Composable
private fun Bubble(message: ChatMessage) {
    val fromUser = message.role == ChatMessage.Role.USER
    val background = when {
        message.failed -> MaterialTheme.colorScheme.errorContainer
        fromUser -> MaterialTheme.colorScheme.primaryContainer
        else -> MaterialTheme.colorScheme.surfaceVariant
    }
    val foreground = when {
        message.failed -> MaterialTheme.colorScheme.onErrorContainer
        fromUser -> MaterialTheme.colorScheme.onPrimaryContainer
        else -> MaterialTheme.colorScheme.onSurfaceVariant
    }
    Box(Modifier.fillMaxWidth()) {
        Box(
            Modifier
                .align(if (fromUser) Alignment.CenterEnd else Alignment.CenterStart)
                .background(background, RoundedCornerShape(16.dp))
                .padding(horizontal = 10.dp, vertical = 8.dp),
        ) {
            Text(
                message.text,
                style = MaterialTheme.typography.bodySmall,
                color = foreground,
            )
        }
    }
}
