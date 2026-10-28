package io.github.mrnodatax.mateengine.ui.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Clear
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.material3.Button
import androidx.compose.material3.FilterChip
import androidx.compose.material3.FilterChipDefaults
import androidx.compose.material3.FilledTonalButton
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import io.github.mrnodatax.mateengine.data.AnimationAsset
import io.github.mrnodatax.mateengine.data.AppState
import io.github.mrnodatax.mateengine.overlay.OverlaySnapshot
import io.github.mrnodatax.mateengine.ui.ChipTone
import io.github.mrnodatax.mateengine.ui.IconTile
import io.github.mrnodatax.mateengine.ui.InfoNote
import io.github.mrnodatax.mateengine.ui.ListRow
import io.github.mrnodatax.mateengine.ui.RowDivider
import io.github.mrnodatax.mateengine.ui.SectionCard
import io.github.mrnodatax.mateengine.ui.SectionLabel
import io.github.mrnodatax.mateengine.ui.SliderField
import io.github.mrnodatax.mateengine.ui.StatusChip
import io.github.mrnodatax.mateengine.ui.T
import io.github.mrnodatax.mateengine.ui.ToggleRow
import io.github.mrnodatax.mateengine.ui.TwoPane

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun AnimationScreen(
    state: AppState,
    runtime: OverlaySnapshot,
    importing: Boolean,
    onImport: () -> Unit,
    onPlay: (AnimationAsset) -> Unit,
    onStop: () -> Unit,
    onDelete: (AnimationAsset) -> Unit,
    onLoopChange: (Boolean) -> Unit,
    onShuffleChange: (Boolean) -> Unit,
    onSpeedChange: (Int) -> Unit,
    onLocomotionChange: (String) -> Unit,
    onNextDance: () -> Unit,
    onPlayBuiltin: (String) -> Unit,
    onResetPose: () -> Unit,
    seated: Boolean,
    onSeatedChange: (Boolean) -> Unit,
    onStartAvatar: () -> Unit,
) {
    val activeClip = runtime.clipName?.let { clipLabelOf(it) }
    BoxWithConstraints(Modifier.fillMaxWidth()) {
        val wide = maxWidth >= 600.dp
        Column(
            Modifier
                .fillMaxWidth()
                .verticalScroll(rememberScrollState())
                .padding(horizontal = 20.dp, vertical = 4.dp),
        ) {
            TwoPane(
                wide = wide,
                primary = {
                    SectionCard {
                        Text(T.animationTitle, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
                        Text(
                            T.animationBody,
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant,
                        )
                        FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                            StatusChip(
                                if (runtime.running) (runtime.modelName ?: "Avatar aktif") else T.needAvatarFirst,
                                if (runtime.running) ChipTone.Success else ChipTone.Warning,
                            )
                            runtime.animationName?.let { StatusChip(it, ChipTone.Accent) }
                            if (seated) StatusChip("Duduk", ChipTone.Accent)
                        }
                        // Aksi utama satu baris penuh: label tidak pernah terpotong atau membungkus.
                        Button(
                            onClick = onStartAvatar,
                            enabled = !runtime.running,
                            modifier = Modifier.fillMaxWidth(),
                        ) {
                            Icon(Icons.Filled.PlayArrow, contentDescription = null)
                            Text(
                                if (runtime.running) "Avatar sudah berjalan" else T.startAvatar,
                                modifier = Modifier.padding(start = 8.dp),
                                maxLines = 1,
                                softWrap = false,
                            )
                        }
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.spacedBy(8.dp),
                            verticalAlignment = Alignment.CenterVertically,
                        ) {
                            FilledTonalButton(
                                onClick = { state.selectedAnimation?.let(onPlay) },
                                enabled = runtime.running && state.selectedAnimation != null,
                                modifier = Modifier.weight(1f),
                            ) {
                                Icon(Icons.Filled.PlayArrow, contentDescription = null)
                                Text(
                                    T.play,
                                    modifier = Modifier.padding(start = 8.dp),
                                    maxLines = 1,
                                    softWrap = false,
                                )
                            }
                            IconButton(
                                onClick = onStop,
                                enabled = runtime.running,
                                modifier = Modifier.size(48.dp),
                            ) {
                                Icon(Icons.Filled.Clear, contentDescription = T.stopAnimation)
                            }
                            IconButton(
                                onClick = onImport,
                                enabled = !importing,
                                modifier = Modifier.size(48.dp),
                            ) {
                                Icon(Icons.Filled.Add, contentDescription = if (importing) "Mengimpor…" else T.importVrma)
                            }
                        }
                        InfoNote(T.animationNote)
                    }

                    SectionCard {
                        Text(
                            "Gerak bawaan (CC0)",
                            style = MaterialTheme.typography.titleSmall,
                            fontWeight = FontWeight.SemiBold,
                        )
                        Text(
                            "Empat belas klip animasi asli dari Universal Animation Library (lisensi CC0), " +
                                "dikonversi ke .vrma oleh skrip di repo. Tidak perlu impor.",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant,
                        )
                        val clips = listOf(
                            "idle" to "Diam",
                            "talk" to "Bicara",
                            "walk" to "Jalan",
                            "dance" to "Menari",
                            "interact" to "Melambai",
                            "sitting_idle" to "Duduk",
                        )
                        clips.chunked(2).forEach { pair ->
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.spacedBy(8.dp),
                            ) {
                                pair.forEach { (value, label) ->
                                    FilterChip(
                                        selected = activeClip == clipLabelOf(value),
                                        onClick = { onPlayBuiltin(value) },
                                        enabled = runtime.running,
                                        label = {
                                            Text(
                                                label,
                                                maxLines = 1,
                                                softWrap = false,
                                                overflow = TextOverflow.Ellipsis,
                                            )
                                        },
                                        modifier = Modifier.weight(1f),
                                        colors = FilterChipDefaults.filterChipColors(
                                            selectedContainerColor = MaterialTheme.colorScheme.primaryContainer,
                                            selectedLabelColor = MaterialTheme.colorScheme.onPrimaryContainer,
                                        ),
                                        border = FilterChipDefaults.filterChipBorder(
                                            enabled = runtime.running,
                                            selected = activeClip == clipLabelOf(value),
                                            borderColor = MaterialTheme.colorScheme.outline,
                                            selectedBorderColor = MaterialTheme.colorScheme.primaryContainer,
                                        ),
                                    )
                                }
                                if (pair.size == 1) Box(Modifier.weight(1f))
                            }
                        }
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.spacedBy(8.dp),
                        ) {
                            OutlinedButton(
                                onClick = onResetPose,
                                enabled = runtime.running,
                                modifier = Modifier.weight(1f),
                            ) {
                                Text("Perbaiki pose", maxLines = 1, softWrap = false, overflow = TextOverflow.Ellipsis)
                            }
                            OutlinedButton(
                                onClick = onStop,
                                enabled = runtime.running,
                                modifier = Modifier.weight(1f),
                            ) {
                                Text("Berhenti", maxLines = 1, softWrap = false, overflow = TextOverflow.Ellipsis)
                            }
                        }
                        RowDivider()
                        ToggleRow(
                            title = "Duduk di tepi layar",
                            subtitle = "Avatar duduk di tepi bawah dengan kaki melewati tepi. Ketuk avatar untuk berdiri.",
                            checked = seated,
                            onCheckedChange = { onSeatedChange(it) },
                        )
                    }

                    SectionCard {
                        Text(
                            "Gerak otomatis",
                            style = MaterialTheme.typography.titleSmall,
                            fontWeight = FontWeight.SemiBold,
                        )
                        Text(
                            "Napas, goyangan badan, pandangan mata, dan kedip berjalan sendiri tanpa berkas animasi. " +
                                "Pilih suasana di bawah, atau tambahkan .vrma milikmu.",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant,
                        )
                        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                            listOf("idle" to "Diam", "walk" to "Jalan", "dance" to "Menari").forEach { (value, label) ->
                                FilterChip(
                                    selected = state.overlay.motion == value,
                                    onClick = { onLocomotionChange(value) },
                                    label = { Text(label) },
                                    colors = FilterChipDefaults.filterChipColors(
                                        selectedContainerColor = MaterialTheme.colorScheme.primaryContainer,
                                        selectedLabelColor = MaterialTheme.colorScheme.onPrimaryContainer,
                                    ),
                                )
                            }
                            OutlinedButton(
                                onClick = onNextDance,
                                enabled = state.overlay.motion == "dance",
                            ) { Text("Gaya lain") }
                        }
                    }

                    SectionCard {
                        if (state.animations.isEmpty()) {
                            Text(
                                T.noAnimations,
                                style = MaterialTheme.typography.bodyMedium,
                                color = MaterialTheme.colorScheme.onSurfaceVariant,
                            )
                        } else {
                            state.animations.forEachIndexed { index, animation ->
                                val selected = animation.id == state.selectedAnimationId
                                ListRow(
                                    title = animation.displayName,
                                    subtitle = formatBytes(animation.sizeBytes) +
                                        if (runtime.animationName == animation.displayName) " · sedang diputar" else "",
                                    selected = selected,
                                    leading = { IconTile(Icons.Filled.PlayArrow, accent = selected) },
                                    trailing = {
                                        Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                                            FilledTonalButton(
                                                onClick = { onPlay(animation) },
                                                enabled = runtime.running,
                                            ) { Text(T.play) }
                                            OutlinedButton(onClick = { onDelete(animation) }) {
                                                Icon(Icons.Filled.Delete, contentDescription = "Hapus animasi")
                                            }
                                        }
                                    },
                                )
                                if (index != state.animations.lastIndex) RowDivider()
                            }
                        }
                    }
                },
                secondary = {
                    SectionLabel(T.playOptions)
                    SectionCard {
                        ToggleRow(
                            title = T.loopLabel,
                            subtitle = T.loopDesc,
                            checked = state.loopAnimation,
                            onCheckedChange = onLoopChange,
                        )
                        ToggleRow(
                            title = T.shuffleLabel,
                            subtitle = T.shuffleDesc,
                            checked = state.shuffleAnimation,
                            onCheckedChange = onShuffleChange,
                        )
                        SliderField(
                            label = T.speedLabel,
                            valueLabel = String.format(java.util.Locale.FRANCE, "%.1f×", state.animationSpeedPercent / 100f),
                            value = state.animationSpeedPercent.toFloat(),
                            range = 50f..200f,
                            steps = 14,
                            onValueChange = { onSpeedChange(it.toInt()) },
                        )
                        if (state.shuffleAnimation) {
                            InfoNote(
                                "Shuffle memilih animasi acak saat berpindah; pemilihan manual tetap dihormati.",
                                ChipTone.Warning,
                            )
                        }
                    }
                    InfoNote(T.animationNote)
                },
            )
        }
    }
}

/** Nama klip teknis → label yang dipakai tombol, supaya status bisa disorot tanpa menebak. */
private fun clipLabelOf(clip: String): String = when (clip) {
    "idle", "idle_loop" -> "Diam"
    "talk", "idle_talk" -> "Bicara"
    "walk", "walk_loop" -> "Jalan"
    "dance", "dance_loop" -> "Menari"
    "interact" -> "Melambai"
    "sitting_idle", "sitting_enter" -> "Duduk"
    else -> ""
}
