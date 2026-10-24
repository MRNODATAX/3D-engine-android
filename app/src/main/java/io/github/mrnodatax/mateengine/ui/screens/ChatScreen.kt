package io.github.mrnodatax.mateengine.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.widthIn
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.Edit
import androidx.compose.material.icons.filled.Send
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.FilterChip
import androidx.compose.material3.FilterChipDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.unit.dp
import io.github.mrnodatax.mateengine.chat.ChatMessage
import io.github.mrnodatax.mateengine.chat.ChatUiState
import io.github.mrnodatax.mateengine.chat.ChatSettings
import io.github.mrnodatax.mateengine.chat.Persona
import io.github.mrnodatax.mateengine.ui.ChipTone
import io.github.mrnodatax.mateengine.ui.InfoNote
import io.github.mrnodatax.mateengine.ui.RowDivider
import io.github.mrnodatax.mateengine.ui.SectionCard
import io.github.mrnodatax.mateengine.ui.SectionLabel
import io.github.mrnodatax.mateengine.ui.StatusChip
import io.github.mrnodatax.mateengine.ui.ToggleRow
import io.github.mrnodatax.mateengine.ui.TwoPane

@Composable
fun ChatScreen(
    ui: ChatUiState,
    onSaveApiKey: (String) -> Unit,
    onClearApiKey: () -> Unit,
    onSavePersona: (Persona) -> Unit,
    onSettingsChange: (ChatSettings) -> Unit,
    onSend: (String) -> Unit,
    onClearHistory: () -> Unit,
) {
    var draft by remember { mutableStateOf("") }
    var editingKey by remember { mutableStateOf(false) }
    var editingPersona by remember { mutableStateOf(false) }
    val listState = rememberLazyListState()

    LaunchedEffect(ui.messages.size) {
        if (ui.messages.isNotEmpty()) listState.animateScrollToItem(ui.messages.lastIndex)
    }

    BoxWithConstraints(Modifier.fillMaxSize()) {
        val wide = maxWidth >= 720.dp
        Column(Modifier.fillMaxSize()) {
            TwoPane(
                wide = wide,
                primary = {
                    Column(Modifier.fillMaxSize()) {
                        SectionCard {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                verticalAlignment = Alignment.CenterVertically,
                                horizontalArrangement = Arrangement.spacedBy(10.dp),
                            ) {
                                Column(Modifier.weight(1f)) {
                                    Text(
                                        "Chat dengan ${ui.persona.name}",
                                        style = MaterialTheme.typography.titleMedium,
                                        fontWeight = FontWeight.SemiBold,
                                    )
                                    Text(
                                        "Balasan dibuat Gemini memakai API key milikmu.",
                                        style = MaterialTheme.typography.bodySmall,
                                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                                    )
                                }
                                StatusChip(
                                    text = if (ui.hasApiKey) "Kunci tersimpan" else "Kunci belum ada",
                                    tone = if (ui.hasApiKey) ChipTone.Positive else ChipTone.Warning,
                                )
                            }
                            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                                OutlinedButton(onClick = { editingKey = true }) {
                                    Text(if (ui.hasApiKey) "Ganti kunci" else "Isi kunci Gemini")
                                }
                                OutlinedButton(onClick = { editingPersona = true }) {
                                    Icon(Icons.Filled.Edit, contentDescription = null, modifier = Modifier.size(16.dp))
                                    Text("  Persona")
                                }
                                IconButton(onClick = onClearHistory) {
                                    Icon(Icons.Filled.Delete, contentDescription = "Hapus riwayat")
                                }
                            }
                        }

                        if (ui.error != null) {
                            InfoNote(ui.error, tone = ChipTone.Warning)
                        }

                        if (ui.messages.isEmpty()) {
                            InfoNote(
                                "Belum ada percakapan. Contoh: \"Hai, temani aku kerja sebentar.\" " +
                                    "Riwayat disimpan lokal di perangkat ini.",
                            )
                        }

                        LazyColumn(
                            state = listState,
                            modifier = Modifier
                                .fillMaxWidth()
                                .weight(1f)
                                .padding(top = 8.dp),
                            verticalArrangement = Arrangement.spacedBy(8.dp),
                        ) {
                            items(ui.messages, key = { it.id }) { message -> MessageBubble(message) }
                        }

                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(top = 8.dp),
                            verticalAlignment = Alignment.Bottom,
                            horizontalArrangement = Arrangement.spacedBy(8.dp),
                        ) {
                            OutlinedTextField(
                                value = draft,
                                onValueChange = { draft = it.take(2000) },
                                modifier = Modifier.weight(1f),
                                placeholder = { Text("Tulis pesan…") },
                                maxLines = 4,
                                keyboardOptions = KeyboardOptions(imeAction = ImeAction.Done),
                                enabled = !ui.sending,
                            )
                            Button(
                                onClick = {
                                    val text = draft.trim()
                                    if (text.isNotEmpty() && !ui.sending) {
                                        onSend(text)
                                        draft = ""
                                    }
                                },
                                enabled = draft.isNotBlank() && !ui.sending && ui.hasApiKey,
                            ) {
                                if (ui.sending) {
                                    CircularProgressIndicator(
                                        modifier = Modifier.size(18.dp),
                                        strokeWidth = 2.dp,
                                        color = MaterialTheme.colorScheme.onPrimary,
                                    )
                                } else {
                                    Icon(Icons.Filled.Send, contentDescription = "Kirim")
                                }
                            }
                        }
                    }
                },
                secondary = {
                    SectionLabel("Suara & gerak")
                    SectionCard {
                        ToggleRow(
                            title = "Suara balasan (TTS)",
                            subtitle = "Memakai mesin TTS perangkat. Bahasa Indonesia bila tersedia.",
                            checked = ui.settings.ttsEnabled,
                            onCheckedChange = { onSettingsChange(ui.settings.copy(ttsEnabled = it)) },
                        )
                        RowDivider()
                        ToggleRow(
                            title = "VoicePack event",
                            subtitle = "Bunyi klik, geser, bubble, dan \"sedang mengetik\" dari pack di files/voicepack.",
                            checked = ui.settings.voicePackEnabled,
                            onCheckedChange = { onSettingsChange(ui.settings.copy(voicePackEnabled = it)) },
                        )
                        InfoNote(
                            "Avatar mulut bergerak saat balasan tiba. Animasi tubuh tetap memakai berkas .vrma milikmu.",
                        )
                    }

                    SectionLabel("Model Gemini")
                    SectionCard {
                        Text(
                            "Model ${ui.settings.model}",
                            style = MaterialTheme.typography.bodyMedium,
                            fontWeight = FontWeight.Medium,
                        )
                        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                            ChatSettings.SUGGESTED_MODELS.forEach { model ->
                                FilterChip(
                                    selected = ui.settings.model == model,
                                    onClick = { onSettingsChange(ui.settings.copy(model = model)) },
                                    label = { Text(model.removePrefix("gemini-").replace('-', ' ')) },
                                    colors = FilterChipDefaults.filterChipColors(
                                        selectedContainerColor = MaterialTheme.colorScheme.primaryContainer,
                                        selectedLabelColor = MaterialTheme.colorScheme.onPrimaryContainer,
                                    ),
                                )
                            }
                        }
                        InfoNote(
                            "Bila nama model ditolak, server mengembalikan galat dan pesan aslinya ditampilkan.",
                        )
                    }

                    if (ui.hasApiKey) {
                        OutlinedButton(onClick = onClearApiKey) { Text("Hapus kunci dari perangkat") }
                    }
                },
            )
        }
    }

    if (editingKey) {
        ApiKeyDialog(
            initial = "",
            hasExisting = ui.hasApiKey,
            onDismiss = { editingKey = false },
            onSave = { value ->
                onSaveApiKey(value)
                editingKey = false
            },
        )
    }

    if (editingPersona) {
        PersonaDialog(
            persona = ui.persona,
            onDismiss = { editingPersona = false },
            onSave = {
                onSavePersona(it)
                editingPersona = false
            },
        )
    }
}

@Composable
private fun MessageBubble(message: ChatMessage) {
    val isUser = message.role == ChatMessage.Role.USER
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = if (isUser) Arrangement.End else Arrangement.Start,
    ) {
        Box(
            modifier = Modifier
                .widthIn(max = 520.dp)
                .background(
                    color = when {
                        message.failed -> MaterialTheme.colorScheme.errorContainer
                        isUser -> MaterialTheme.colorScheme.primaryContainer
                        else -> MaterialTheme.colorScheme.surfaceVariant
                    },
                    shape = RoundedCornerShape(
                        topStart = 16.dp,
                        topEnd = 16.dp,
                        bottomStart = if (isUser) 16.dp else 4.dp,
                        bottomEnd = if (isUser) 4.dp else 16.dp,
                    ),
                )
                .padding(horizontal = 14.dp, vertical = 10.dp),
        ) {
            Text(
                text = message.text,
                style = MaterialTheme.typography.bodyMedium,
                color = when {
                    message.failed -> MaterialTheme.colorScheme.onErrorContainer
                    isUser -> MaterialTheme.colorScheme.onPrimaryContainer
                    else -> MaterialTheme.colorScheme.onSurfaceVariant
                },
            )
        }
    }
}

@Composable
private fun ApiKeyDialog(
    initial: String,
    hasExisting: Boolean,
    onDismiss: () -> Unit,
    onSave: (String) -> Unit,
) {
    var value by remember { mutableStateOf(initial) }
    var reveal by remember { mutableStateOf(false) }
    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("API key Gemini") },
        text = {
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                Text(
                    "Kunci disimpan terenkripsi di Android Keystore dan hanya dikirim ke " +
                        "generativelanguage.googleapis.com saat kamu mengirim pesan.",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                )
                OutlinedTextField(
                    value = value,
                    onValueChange = { value = it.trim() },
                    label = { Text("AIza…") },
                    singleLine = true,
                    visualTransformation = if (reveal) androidx.compose.ui.text.input.VisualTransformation.None
                    else PasswordVisualTransformation(),
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password),
                )
                if (hasExisting) {
                    Text(
                        "Menyimpan kunci baru akan menggantikan kunci lama.",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                    )
                }
                TextButton(onClick = { reveal = !reveal }) {
                    Text(if (reveal) "Sembunyikan" else "Tampilkan")
                }
            }
        },
        confirmButton = {
            TextButton(onClick = { onSave(value) }, enabled = value.isNotBlank()) { Text("Simpan") }
        },
        dismissButton = { TextButton(onClick = onDismiss) { Text("Batal") } },
    )
}

@Composable
private fun PersonaDialog(persona: Persona, onDismiss: () -> Unit, onSave: (Persona) -> Unit) {
    var name by remember { mutableStateOf(persona.name) }
    var userName by remember { mutableStateOf(persona.userName) }
    var personality by remember { mutableStateOf(persona.personality) }
    var style by remember { mutableStateOf(persona.speakingStyle) }
    var language by remember { mutableStateOf(persona.language) }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Persona waifu") },
        text = {
            Column(
                modifier = Modifier.heightIn(max = 420.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp),
            ) {
                Text(
                    "Nilai ini sudah terisi agar waifu langsung punya karakter. Semua bisa diubah.",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                )
                OutlinedTextField(value = name, onValueChange = { name = it }, label = { Text("Nama waifu") }, singleLine = true)
                OutlinedTextField(value = userName, onValueChange = { userName = it }, label = { Text("Panggilan untukmu") }, singleLine = true)
                OutlinedTextField(value = personality, onValueChange = { personality = it }, label = { Text("Kepribadian") }, maxLines = 3)
                OutlinedTextField(value = style, onValueChange = { style = it }, label = { Text("Gaya bicara") }, maxLines = 3)
                OutlinedTextField(value = language, onValueChange = { language = it }, label = { Text("Bahasa") }, singleLine = true)
            }
        },
        confirmButton = {
            TextButton(
                onClick = {
                    onSave(
                        persona.copy(
                            name = name.ifBlank { "Waifu" },
                            userName = userName.ifBlank { "Kamu" },
                            personality = personality.ifBlank { persona.personality },
                            speakingStyle = style.ifBlank { persona.speakingStyle },
                            language = language.ifBlank { "Indonesia" },
                        ),
                    )
                },
            ) { Text("Simpan") }
        },
        dismissButton = { TextButton(onClick = onDismiss) { Text("Batal") } },
    )
}
