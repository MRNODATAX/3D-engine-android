package io.github.mrnodatax.mateengine.ui.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.FilterChip
import androidx.compose.material3.FilterChipDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import io.github.mrnodatax.mateengine.data.AppState
import io.github.mrnodatax.mateengine.ui.ChipTone
import io.github.mrnodatax.mateengine.ui.InfoNote
import io.github.mrnodatax.mateengine.ui.ListRow
import io.github.mrnodatax.mateengine.ui.RowDivider
import io.github.mrnodatax.mateengine.ui.SectionCard
import io.github.mrnodatax.mateengine.ui.SectionLabel
import io.github.mrnodatax.mateengine.ui.SliderField
import io.github.mrnodatax.mateengine.ui.StatusChip
import io.github.mrnodatax.mateengine.ui.T
import io.github.mrnodatax.mateengine.ui.TwoPane

@Composable
fun SettingsScreen(
    state: AppState,
    versionName: String,
    versionCode: Int,
    buildType: String,
    onFpsChange: (Int) -> Unit,
    onQualityChange: (String) -> Unit,
    onClearCache: () -> Unit,
    onDeleteAll: () -> Unit,
    onOpenDesktopRelease: () -> Unit,
) {
    var confirmDelete by remember { mutableStateOf(false) }

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
                    SectionLabel(T.overlaySection)
                    SectionCard {
                        SliderField(
                            label = T.fpsLabel,
                            valueLabel = state.overlay.targetFps.toString(),
                            value = state.overlay.targetFps.toFloat(),
                            range = 15f..60f,
                            steps = 2,
                            onValueChange = { onFpsChange(it.toInt()) },
                        )
                        Text(T.qualityLabel, style = MaterialTheme.typography.bodyMedium, fontWeight = FontWeight.Medium)
                        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                            listOf("low" to T.qualityLow, "medium" to T.qualityMedium, "high" to T.qualityHigh)
                                .forEach { (value, label) ->
                                    FilterChip(
                                        selected = state.overlay.quality == value,
                                        onClick = { onQualityChange(value) },
                                        label = { Text(label) },
                                        colors = FilterChipDefaults.filterChipColors(
                                            selectedContainerColor = MaterialTheme.colorScheme.primaryContainer,
                                            selectedLabelColor = MaterialTheme.colorScheme.onPrimaryContainer,
                                        ),
                                        border = FilterChipDefaults.filterChipBorder(
                                            enabled = true,
                                            selected = state.overlay.quality == value,
                                            borderColor = MaterialTheme.colorScheme.outline,
                                            selectedBorderColor = MaterialTheme.colorScheme.primaryContainer,
                                        ),
                                    )
                                }
                        }
                        InfoNote("FPS rendah menghemat baterai. Kualitas rendah memaksa pixel ratio 1.")
                    }

                    SectionCard {
                        ListRow(
                            title = T.themeLabel,
                            subtitle = T.themeSystem,
                            trailing = { StatusChip("Sistem", ChipTone.Neutral) },
                        )
                        RowDivider()
                        ListRow(
                            title = T.languageLabel,
                            subtitle = "Indonesia",
                            trailing = { StatusChip("id", ChipTone.Neutral) },
                        )
                        RowDivider()
                        ListRow(
                            title = T.aboutLabel,
                            subtitle = "${T.versionLabel} $versionName ($versionCode) · $buildType",
                            trailing = {
                                OutlinedButton(onClick = onOpenDesktopRelease) { Text("Rilis desktop") }
                            },
                        )
                    }
                },
                secondary = {
                    SectionLabel(T.storageTitle)
                    SectionCard {
                        Text(T.storageTitle, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold)
                        Text(
                            T.storageBody,
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant,
                        )
                        Row(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                            OutlinedButton(onClick = onClearCache) { Text(T.clearCache) }
                            Button(onClick = { confirmDelete = true }) { Text(T.deleteAll) }
                        }
                    }
                    InfoNote(T.storageNote)
                    InfoNote(T.aboutBody)
                },
            )
        }
    }

    if (confirmDelete) {
        AlertDialog(
            onDismissRequest = { confirmDelete = false },
            title = { Text(T.deleteAll) },
            text = { Text(T.deleteAllConfirm) },
            confirmButton = {
                TextButton(onClick = {
                    confirmDelete = false
                    onDeleteAll()
                }) { Text(T.delete) }
            },
            dismissButton = {
                TextButton(onClick = { confirmDelete = false }) { Text(T.cancel) }
            },
        )
    }
}
