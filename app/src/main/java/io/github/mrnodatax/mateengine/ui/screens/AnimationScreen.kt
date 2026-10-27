package io.github.mrnodatax.mateengine.ui.screens

import androidx.compose.foundation.layout.Arrangement
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
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
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
) {
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
                        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                            StatusChip(
                                if (runtime.running) (runtime.modelName ?: "Avatar aktif") else T.needAvatarFirst,
                                if (runtime.running) ChipTone.Success else ChipTone.Warning,
                            )
                            if (runtime.animationName != null) StatusChip(runtime.animationName, ChipTone.Accent)
                        }
                        Row(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                            FilledTonalButton(
                                onClick = { state.selectedAnimation?.let(onPlay) },
                                enabled = runtime.running && state.selectedAnimation != null,
                            ) {
                                Icon(Icons.Filled.PlayArrow, contentDescription = null)
                                Text(T.play, modifier = Modifier.padding(start = 8.dp))
                            }
                            OutlinedButton(onClick = onStop, enabled = runtime.running) {
                                Icon(Icons.Filled.Clear, contentDescription = null)
                                Text(T.stopAnimation, modifier = Modifier.padding(start = 8.dp))
                            }
                            Button(onClick = onImport, enabled = !importing) {
                                Icon(Icons.Filled.Add, contentDescription = null)
                                Text(if (importing) "Mengimpor…" else T.importVrma, modifier = Modifier.padding(start = 8.dp))
                            }
                        }
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
                        InfoNote("Setelah 2 menit tanpa sentuhan, avatar mengantuk lalu tertidur. Ketuk avatar untuk membangunkan.")
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
