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
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.Person
import androidx.compose.material3.Button
import androidx.compose.material3.FilledTonalButton
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import io.github.mrnodatax.mateengine.data.AppState
import io.github.mrnodatax.mateengine.data.AvatarAsset
import io.github.mrnodatax.mateengine.data.VrmMetadata
import io.github.mrnodatax.mateengine.ui.ChipTone
import io.github.mrnodatax.mateengine.ui.IconTile
import io.github.mrnodatax.mateengine.ui.InfoNote
import io.github.mrnodatax.mateengine.ui.LabeledValue
import io.github.mrnodatax.mateengine.ui.ListRow
import io.github.mrnodatax.mateengine.ui.RowDivider
import io.github.mrnodatax.mateengine.ui.SectionCard
import io.github.mrnodatax.mateengine.ui.SectionLabel
import io.github.mrnodatax.mateengine.ui.StatusChip
import io.github.mrnodatax.mateengine.ui.T
import io.github.mrnodatax.mateengine.ui.TwoPane

@Composable
fun AvatarScreen(
    state: AppState,
    importing: Boolean,
    onImport: () -> Unit,
    onUse: (AvatarAsset) -> Unit,
    onDelete: (AvatarAsset) -> Unit,
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
                        Text(T.avatarTitle, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
                        Text(
                            T.avatarBody,
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant,
                        )
                        Row(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                            Button(onClick = onImport, enabled = !importing) {
                                Icon(Icons.Filled.Add, contentDescription = null)
                                Text(
                                    if (importing) "Mengimpor…" else T.importVrm,
                                    modifier = Modifier.padding(start = 8.dp),
                                )
                            }
                            state.selectedAvatar?.let { avatar ->
                                OutlinedButton(onClick = { onDelete(avatar) }) {
                                    Icon(Icons.Filled.Delete, contentDescription = null)
                                    Text(T.removeModel, modifier = Modifier.padding(start = 8.dp))
                                }
                            }
                        }
                    }

                    SectionCard {
                        if (state.avatars.isEmpty()) {
                            Text(
                                T.noAvatars,
                                style = MaterialTheme.typography.bodyMedium,
                                color = MaterialTheme.colorScheme.onSurfaceVariant,
                            )
                        } else {
                            state.avatars.forEachIndexed { index, avatar ->
                                val selected = avatar.id == state.selectedAvatarId
                                ListRow(
                                    title = avatar.displayName,
                                    subtitle = buildString {
                                        append(avatar.metadata?.versionLabel ?: "VRM")
                                        append(" · ")
                                        append(formatBytes(avatar.sizeBytes))
                                        avatar.metadata?.let {
                                            if (it.humanoidBones > 0) append(" · ${it.humanoidBones} bone")
                                        }
                                    },
                                    selected = selected,
                                    leading = { IconTile(Icons.Filled.Person, accent = selected) },
                                    trailing = {
                                        if (selected) {
                                            StatusChip(T.active, ChipTone.Accent)
                                        } else {
                                            FilledTonalButton(onClick = { onUse(avatar) }) { Text(T.useModel) }
                                        }
                                    },
                                )
                                if (index != state.avatars.lastIndex) RowDivider()
                            }
                        }
                    }
                },
                secondary = {
                    SectionLabel(T.detailTitle)
                    SectionCard {
                        val avatar = state.selectedAvatar
                        if (avatar == null) {
                            Text(
                                T.noAvatars,
                                style = MaterialTheme.typography.bodySmall,
                                color = MaterialTheme.colorScheme.onSurfaceVariant,
                            )
                        } else {
                            Text(avatar.displayName, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold)
                            val meta = avatar.metadata
                            if (meta == null) {
                                InfoNote(T.noMetadata, ChipTone.Warning)
                            } else {
                                MetadataRows(meta, avatar.sizeBytes)
                            }
                        }
                    }
                    InfoNote(T.metadataNote)
                },
            )
        }
    }
}

@Composable
private fun MetadataRows(meta: VrmMetadata, sizeBytes: Long) {
    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        RowDivider()
        LabeledValue(T.format, meta.versionLabel)
        LabeledValue(T.sizeLabel, formatBytes(sizeBytes))
        LabeledValue(
            T.license,
            buildString {
                append(meta.licenseUrl ?: "Tidak dicantumkan di berkas")
                when (meta.redistribution) {
                    true -> append(" · redistribusi diizinkan")
                    false -> append(" · redistribusi tidak diizinkan")
                    null -> append(" · izin redistribusi tidak dicantumkan")
                }
            },
        )
        LabeledValue(
            T.authors,
            meta.authors.ifEmpty { listOf("Tidak dicantumkan") }.joinToString(", "),
        )
        LabeledValue(T.humanoidBones, meta.humanoidBones.toString())
        LabeledValue(T.expressionPresets, meta.expressionPresets.toString())
    }
}
