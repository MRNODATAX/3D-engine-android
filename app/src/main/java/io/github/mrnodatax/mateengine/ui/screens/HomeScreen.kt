package io.github.mrnodatax.mateengine.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Clear
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.material.icons.filled.Warning
import androidx.compose.material3.Button
import androidx.compose.material3.FilledTonalButton
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import io.github.mrnodatax.mateengine.R
import io.github.mrnodatax.mateengine.data.AppState
import io.github.mrnodatax.mateengine.data.AvatarAsset
import io.github.mrnodatax.mateengine.overlay.OverlaySnapshot
import io.github.mrnodatax.mateengine.ui.AvatarPreview
import io.github.mrnodatax.mateengine.ui.ChipTone
import io.github.mrnodatax.mateengine.ui.IconTile
import io.github.mrnodatax.mateengine.ui.InfoNote
import io.github.mrnodatax.mateengine.ui.ListRow
import io.github.mrnodatax.mateengine.ui.SectionCard
import io.github.mrnodatax.mateengine.ui.SectionLabel
import io.github.mrnodatax.mateengine.ui.SliderField
import io.github.mrnodatax.mateengine.ui.StatusChip
import io.github.mrnodatax.mateengine.ui.T
import io.github.mrnodatax.mateengine.ui.ToggleRow
import io.github.mrnodatax.mateengine.ui.theme.MateRadius
import io.github.mrnodatax.mateengine.ui.TwoPane
import java.util.Locale

@Composable
fun HomeScreen(
    state: AppState,
    runtime: OverlaySnapshot,
    overlayGranted: Boolean,
    onStart: () -> Unit,
    onStop: () -> Unit,
    onRequestPermission: () -> Unit,
    onImportModel: () -> Unit,
    onScaleChange: (Int) -> Unit,
    onOpacityChange: (Int) -> Unit,
    onLockChange: (Boolean) -> Unit,
    onUseAvatar: (AvatarAsset) -> Unit,
    onPlayAnimation: () -> Unit,
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
                    StatusCard(
                        state = state,
                        runtime = runtime,
                        overlayGranted = overlayGranted,
                        onStart = onStart,
                        onStop = onStop,
                        onRequestPermission = onRequestPermission,
                        onImportModel = onImportModel,
                    )
                    // Maksimal satu catatan per layar: sisanya pindah ke Setelan/Diagnosa.
                    if (!overlayGranted) {
                        InfoNote(
                            text = "Beberapa produsen (mis. HyperOS/ColorOS) mencabut izin setelah pembaruan sistem. " +
                                "Periksa di Setelan → Izin & perawatan.",
                            tone = ChipTone.Warning,
                        )
                    }
                },
                secondary = {
                    SectionLabel(T.quickControls)
                    SectionCard {
                        SliderField(
                            label = "Tinggi avatar di layar",
                            valueLabel = "${state.overlay.scalePercent}%",
                            value = state.overlay.scalePercent.toFloat(),
                            range = 25f..100f,
                            onValueChange = { onScaleChange(it.toInt()) },
                        )
                        Text(
                            "Cubit dua jari pada avatar di overlay juga mengubah ukuran ini.",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant,
                        )
                        SliderField(
                            label = T.labelOpacity,
                            valueLabel = "${state.overlay.opacityPercent}%",
                            value = state.overlay.opacityPercent.toFloat(),
                            range = 30f..100f,
                            onValueChange = { onOpacityChange(it.toInt()) },
                        )
                        ToggleRow(
                            title = T.lockPosition,
                            subtitle = T.lockPositionDesc,
                            checked = state.overlay.locked,
                            onCheckedChange = onLockChange,
                        )
                    }
                    SectionLabel(T.recentTitle)
                    SectionCard {
                        state.selectedAvatar?.let { avatar ->
                            ListRow(
                                title = avatar.displayName,
                                subtitle = "${formatBytes(avatar.sizeBytes)} · ${avatar.metadata?.versionLabel ?: "VRM"}",
                                selected = true,
                                leading = { IconTile(Icons.Filled.Person, accent = true) },
                                trailing = { StatusChip("Aktif", ChipTone.Accent) },
                            )
                        } ?: Column(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalAlignment = Alignment.CenterHorizontally,
                        ) {
                            // Empty state: ikon merek + kalimat + aksi, bukan ruang kosong.
                            Icon(
                                painter = painterResource(R.drawable.ic_brand_mark),
                                contentDescription = null,
                                tint = MaterialTheme.colorScheme.primary,
                                modifier = Modifier.padding(top = 4.dp).height(56.dp).width(56.dp),
                            )
                            Text(
                                T.noAvatars,
                                style = MaterialTheme.typography.bodyMedium,
                                color = MaterialTheme.colorScheme.onSurfaceVariant,
                                modifier = Modifier.padding(top = 8.dp, bottom = 12.dp),
                            )
                            Button(onClick = onImportModel) {
                                Icon(Icons.Filled.Person, contentDescription = null)
                                Text(T.importModel, modifier = Modifier.padding(start = 8.dp))
                            }
                        }
                        state.selectedAnimation?.let { animation ->
                            ListRow(
                                title = animation.displayName,
                                subtitle = "${formatBytes(animation.sizeBytes)} · ${if (state.loopAnimation) "loop" else "sekali"}"
                                    + if (runtime.animationName == animation.displayName) " · diputar" else "",
                                leading = { IconTile(Icons.Filled.PlayArrow, accent = true) },
                                trailing = {
                                    FilledTonalButton(
                                        onClick = onPlayAnimation,
                                        enabled = runtime.running,
                                        colors = androidx.compose.material3.ButtonDefaults.filledTonalButtonColors(
                                            containerColor = MaterialTheme.colorScheme.primaryContainer,
                                            contentColor = MaterialTheme.colorScheme.onPrimaryContainer,
                                        ),
                                    ) {
                                        Text(T.play)
                                    }
                                },
                            )
                        }
                    }
                },
            )
        }
    }
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
private fun StatusCard(
    state: AppState,
    runtime: OverlaySnapshot,
    overlayGranted: Boolean,
    onStart: () -> Unit,
    onStop: () -> Unit,
    onRequestPermission: () -> Unit,
    onImportModel: () -> Unit,
) {
    val hasModel = state.selectedAvatar != null
    var previewFailed by remember(state.selectedAvatar?.id) { mutableStateOf(false) }
    SectionCard {
        // Kartu utama Beranda kini menampilkan avatar itu sendiri (pratinjau hidup), bukan hanya
        // paragraf status. Bila renderer gagal, kartu jatuh ke monogram — tidak pernah kosong.
        if (hasModel) {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(248.dp)
                    .background(
                        color = MaterialTheme.colorScheme.surfaceVariant,
                        shape = RoundedCornerShape(MateRadius.EXTRA_LARGE.dp),
                    )
                    .clip(RoundedCornerShape(MateRadius.EXTRA_LARGE.dp)),
                contentAlignment = Alignment.Center,
            ) {
                if (previewFailed) {
                    Icon(
                        painter = painterResource(R.drawable.ic_brand_mark),
                        contentDescription = null,
                        tint = MaterialTheme.colorScheme.primary,
                        modifier = Modifier.size(72.dp),
                    )
                } else {
                    AvatarPreview(
                        asset = state.selectedAvatar,
                        modifier = Modifier.fillMaxSize(),
                        onFallback = { previewFailed = true },
                    )
                    // Penanda halus bahwa ini pratinjau, bukan overlay.
                    StatusChip(
                        "Pratinjau",
                        ChipTone.Neutral,
                        modifier = Modifier
                            .align(Alignment.TopStart)
                            .padding(10.dp),
                    )
                }
            }
        }
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.Top,
        ) {
            Column(Modifier.weight(1f)) {
                Text(
                    when {
                        runtime.running -> T.runningNow
                        !overlayGranted -> T.statusNoPermission
                        !hasModel -> T.statusNoModel
                        else -> T.statusReady
                    },
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.SemiBold,
                )
                Text(
                    when {
                        runtime.running -> runtime.modelName?.let { "$it · ${runtime.fps} fps" }
                            ?: "Renderer ${if (runtime.rendererReady) "siap" else "dimuat"}"
                        !overlayGranted -> T.bodyNoPermission
                        !hasModel -> T.bodyNoModel
                        else -> T.bodyReady
                    },
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    modifier = Modifier.padding(top = 4.dp),
                )
            }
            IconTile(
                icon = when {
                    runtime.running -> Icons.Filled.PlayArrow
                    overlayGranted && hasModel -> Icons.Filled.CheckCircle
                    else -> Icons.Filled.Warning
                },
                accent = true,
            )
        }

        FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
            StatusChip(
                if (overlayGranted) T.chipOverlayGranted else T.chipOverlayDenied,
                if (overlayGranted) ChipTone.Success else ChipTone.Danger,
            )
            state.selectedAvatar?.metadata?.versionLabel?.let { StatusChip(it, ChipTone.Accent) }
            if (runtime.running) {
                StatusChip(
                    if (runtime.rendererReady) T.chipRendererReady else T.chipWaitingRenderer,
                    if (runtime.rendererReady) ChipTone.Success else ChipTone.Warning,
                )
            }
            if (!hasModel) StatusChip(T.chipModelMissing, ChipTone.Warning)
        }

        runtime.lastError?.let { message ->
            InfoNote(text = message, tone = ChipTone.Danger)
        }

        Row(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
            when {
                !overlayGranted -> Button(onClick = onRequestPermission) {
                    Text(T.openOverlayPermission)
                }
                !hasModel -> Button(onClick = onImportModel) {
                    Icon(Icons.Filled.Person, contentDescription = null)
                    Text(T.importModel, modifier = Modifier.padding(start = 8.dp))
                }
                runtime.running -> Button(onClick = onStop) {
                    Icon(Icons.Filled.Clear, contentDescription = null)
                    Text(T.stopAvatar, modifier = Modifier.padding(start = 8.dp))
                }
                else -> Button(onClick = onStart) {
                    Icon(Icons.Filled.PlayArrow, contentDescription = null)
                    Text(T.startAvatar, modifier = Modifier.padding(start = 8.dp))
                }
            }
            if (runtime.running && hasModel) {
                FilledTonalButton(
                    onClick = onStart,
                    colors = androidx.compose.material3.ButtonDefaults.filledTonalButtonColors(
                        containerColor = MaterialTheme.colorScheme.surfaceVariant,
                        contentColor = MaterialTheme.colorScheme.onSurface,
                    ),
                ) { Text("Muat ulang") }
            }
        }
    }
}

fun formatBytes(bytes: Long): String {
    if (bytes <= 0) return "0 B"
    val kb = bytes / 1024.0
    val mb = kb / 1024.0
    return if (mb >= 1.0) String.format(Locale.FRANCE, "%.1f MB", mb) else String.format(Locale.FRANCE, "%.0f KB", kb)
}
