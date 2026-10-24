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
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.Warning
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalClipboardManager
import androidx.compose.ui.text.AnnotatedString
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import io.github.mrnodatax.mateengine.ui.ChipTone
import io.github.mrnodatax.mateengine.ui.DiagnosticRow
import io.github.mrnodatax.mateengine.ui.IconTile
import io.github.mrnodatax.mateengine.ui.InfoNote
import io.github.mrnodatax.mateengine.ui.RowDivider
import io.github.mrnodatax.mateengine.ui.SectionCard
import io.github.mrnodatax.mateengine.ui.SectionLabel
import io.github.mrnodatax.mateengine.ui.StatusChip
import io.github.mrnodatax.mateengine.ui.T
import io.github.mrnodatax.mateengine.ui.TwoPane
import io.github.mrnodatax.mateengine.overlay.OverlaySnapshot
import io.github.mrnodatax.mateengine.ui.LabeledValue
import io.github.mrnodatax.mateengine.util.DiagnosticAction
import io.github.mrnodatax.mateengine.util.DiagnosticStatus
import io.github.mrnodatax.mateengine.util.DiagnosticsSnapshot

@Composable
fun DiagnosticsScreen(
    snapshot: DiagnosticsSnapshot,
    runtime: OverlaySnapshot,
    onAction: (DiagnosticAction) -> Unit,
    onCopied: () -> Unit,
) {
    val clipboard = LocalClipboardManager.current
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
                        Text(T.diagnosticsTitle, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
                        Text(T.diagnosticsBody, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                            StatusChip(snapshot.deviceLabel, ChipTone.Accent)
                            StatusChip(snapshot.androidLabel, ChipTone.Neutral)
                        }
                        Text(
                            snapshot.romLabel,
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant,
                        )
                    }

                    SectionCard {
                        snapshot.items.forEachIndexed { index, item ->
                            val action = item.action
                            DiagnosticRow(
                                title = item.title,
                                detail = item.detail,
                                leading = {
                                    IconTile(
                                        icon = when (item.status) {
                                            DiagnosticStatus.OK -> Icons.Filled.CheckCircle
                                            DiagnosticStatus.WARN -> Icons.Filled.Warning
                                            DiagnosticStatus.BLOCKED -> Icons.Filled.Warning
                                            DiagnosticStatus.UNKNOWN -> Icons.Filled.Info
                                        },
                                        accent = item.status == DiagnosticStatus.OK,
                                    )
                                },
                                actionLabel = if (action == null) null else item.actionLabel,
                                onAction = if (action == null) null else ({ onAction(action) }),
                            )
                            if (index != snapshot.items.lastIndex) RowDivider()
                        }
                    }
                },
                secondary = {
                    SectionLabel("Performa renderer")
                    SectionCard {
                        if (!runtime.running) {
                            Text(
                                "Overlay belum berjalan, jadi angka performa belum tersedia.",
                                style = MaterialTheme.typography.bodySmall,
                                color = MaterialTheme.colorScheme.onSurfaceVariant,
                            )
                        } else {
                            LabeledValue("FPS terukur", runtime.fps.toString())
                            LabeledValue("Kerja frame", "${runtime.workMs} ms")
                            LabeledValue("Resolusi render", "${(runtime.renderScale * 100).toInt()}% · ${runtime.qualityLevel}")
                            LabeledValue("Triangles", runtime.triangles.toString())
                            LabeledValue("Draw call", runtime.drawCalls.toString())
                            LabeledValue("Tekstur", "${runtime.textures} (diperkecil ${runtime.texturesResized})")
                            LabeledValue("Tulang", runtime.bones.toString())
                            LabeledValue("Spring joint", runtime.springJoints.toString())
                            Text(
                                "Angka berasal dari WebGLRenderer.info dan pengukuran waktu frame di perangkat ini.",
                                style = MaterialTheme.typography.bodySmall,
                                color = MaterialTheme.colorScheme.onSurfaceVariant,
                            )
                        }
                    }

                    SectionLabel(T.diagnosticsReport)
                    SectionCard {
                        Text(T.diagnosticsReportBody, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                        Text(
                            snapshot.report,
                            style = MaterialTheme.typography.bodySmall,
                            fontFamily = FontFamily.Monospace,
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(top = 8.dp),
                        )
                        OutlinedButton(
                            onClick = {
                                clipboard.setText(AnnotatedString(snapshot.report))
                                onCopied()
                            },
                        ) { Text(T.copyReport) }
                    }
                    InfoNote(T.diagnosticsWarning, ChipTone.Warning)
                },
            )
        }
    }
}
