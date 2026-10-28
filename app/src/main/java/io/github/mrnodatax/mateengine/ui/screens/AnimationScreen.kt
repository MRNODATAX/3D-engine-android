package io.github.mrnodatax.mateengine.ui.screens

import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.tween
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
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
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import io.github.mrnodatax.mateengine.R
import io.github.mrnodatax.mateengine.data.AnimationAsset
import io.github.mrnodatax.mateengine.data.AppState
import io.github.mrnodatax.mateengine.overlay.BuiltinClip
import io.github.mrnodatax.mateengine.overlay.BuiltinClips
import io.github.mrnodatax.mateengine.overlay.ClipCategory
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
import io.github.mrnodatax.mateengine.ui.theme.MateMotion
import io.github.mrnodatax.mateengine.ui.theme.MateRadius

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
    // Pencarian & kategori katalog klip: state layar, bukan disimpan (pilihan sesaat).
    var clipQuery by rememberSaveable { mutableStateOf("") }
    var clipCategory by rememberSaveable { mutableStateOf<ClipCategory?>(null) }
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
                        // Button group (tiruan connected button group M3 Expressive tanpa naik versi
                        // library): tiga aksi berlabel, tiap target >= 48 dp. Sebelumnya dua di
                        // antaranya hanya ikon telanjang (× dan +) sehingga fungsinya harus ditebak.
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.spacedBy(8.dp),
                            verticalAlignment = Alignment.CenterVertically,
                        ) {
                            FilledTonalButton(
                                onClick = { state.selectedAnimation?.let(onPlay) },
                                enabled = runtime.running && state.selectedAnimation != null,
                                shape = RoundedCornerShape(topStart = 20.dp, bottomStart = 20.dp, topEnd = 8.dp, bottomEnd = 8.dp),
                                contentPadding = PaddingValues(horizontal = 10.dp),
                                modifier = Modifier.weight(1.1f),
                            ) {
                                Icon(
                                    painter = painterResource(R.drawable.ic_symbol_animation),
                                    contentDescription = null,
                                    modifier = Modifier.size(18.dp),
                                )
                                Text(
                                    T.play,
                                    modifier = Modifier.padding(start = 6.dp),
                                    maxLines = 1,
                                    softWrap = false,
                                )
                            }
                            FilledTonalButton(
                                onClick = onStop,
                                enabled = runtime.running,
                                shape = RoundedCornerShape(8.dp),
                                contentPadding = PaddingValues(horizontal = 10.dp),
                                modifier = Modifier.weight(1f),
                            ) {
                                Icon(
                                    painter = painterResource(R.drawable.ic_symbol_stop_circle),
                                    contentDescription = null,
                                    modifier = Modifier.size(18.dp),
                                )
                                Text(
                                    T.stopAnimation,
                                    modifier = Modifier.padding(start = 6.dp),
                                    maxLines = 1,
                                    softWrap = false,
                                    overflow = TextOverflow.Ellipsis,
                                )
                            }
                            FilledTonalButton(
                                onClick = onImport,
                                enabled = !importing,
                                shape = RoundedCornerShape(topStart = 8.dp, bottomStart = 8.dp, topEnd = 20.dp, bottomEnd = 20.dp),
                                contentPadding = PaddingValues(horizontal = 10.dp),
                                modifier = Modifier.weight(1f),
                            ) {
                                Icon(
                                    painter = painterResource(R.drawable.ic_symbol_upload),
                                    contentDescription = null,
                                    modifier = Modifier.size(18.dp),
                                )
                                Text(
                                    if (importing) "Mengimpor…" else T.importVrma,
                                    modifier = Modifier.padding(start = 6.dp),
                                    maxLines = 1,
                                    softWrap = false,
                                    overflow = TextOverflow.Ellipsis,
                                )
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
                        // Angka dihitung dari katalog, bukan ditulis tangan: sebelumnya layar
                        // menyebut "Dua puluh satu klip" padahal aplikasi membundel 29.
                        Text(
                            "${BuiltinClips.all.size} klip animasi dari Universal Animation Library " +
                                "(lisensi CC0), dikonversi ke .vrma oleh skrip di repo. Tidak perlu impor.",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant,
                        )
                        OutlinedTextField(
                            value = clipQuery,
                            onValueChange = { clipQuery = it },
                            singleLine = true,
                            placeholder = { Text("Cari klip: lari, duduk, sihir…") },
                            leadingIcon = {
                                Icon(
                                    painter = painterResource(R.drawable.ic_symbol_search),
                                    contentDescription = null,
                                    modifier = Modifier.size(18.dp),
                                )
                            },
                            trailingIcon = {
                                if (clipQuery.isNotEmpty()) {
                                    IconButton(onClick = { clipQuery = "" }) {
                                        Icon(
                                            Icons.Filled.Clear,
                                            contentDescription = "Bersihkan pencarian",
                                            modifier = Modifier.size(18.dp),
                                        )
                                    }
                                }
                            },
                            shape = RoundedCornerShape(MateRadius.MEDIUM.dp),
                            modifier = Modifier.fillMaxWidth(),
                        )
                        // Kategori: lima, bukan dua puluh sembilan tombol sekaligus.
                        FlowRow(
                            horizontalArrangement = Arrangement.spacedBy(8.dp),
                            verticalArrangement = Arrangement.spacedBy(4.dp),
                        ) {
                            val counts = remember { BuiltinClips.countByCategory() }
                            FilterChip(
                                selected = clipCategory == null,
                                onClick = { clipCategory = null },
                                label = { Text("Semua (${BuiltinClips.all.size})") },
                            )
                            ClipCategory.entries.forEach { category ->
                                FilterChip(
                                    selected = clipCategory == category,
                                    onClick = {
                                        clipCategory = if (clipCategory == category) null else category
                                    },
                                    label = { Text("${category.label} (${counts[category] ?: 0})") },
                                )
                            }
                        }
                        val clips = BuiltinClips.filter(clipQuery, clipCategory)
                        if (clips.isEmpty()) {
                            InfoNote(
                                "Tidak ada klip yang cocok dengan \"$clipQuery\". Coba kata lain atau pilih " +
                                    "kategori Semua.",
                            )
                        } else {
                            // Dua kolom kartu, sama seperti sebelumnya, tetapi tiap kartu menyebut
                            // kategori dan klip yang sedang berjalan diberi penanda jelas.
                            clips.chunked(2).forEach { pair ->
                                Row(
                                    modifier = Modifier.fillMaxWidth(),
                                    horizontalArrangement = Arrangement.spacedBy(8.dp),
                                ) {
                                    pair.forEach { clip ->
                                        ClipCard(
                                            clip = clip,
                                            active = activeClip == clipLabelOf(clip.key),
                                            enabled = runtime.running,
                                            onClick = { onPlayBuiltin(clip.key) },
                                            modifier = Modifier.weight(1f),
                                        )
                                    }
                                    if (pair.size == 1) Box(Modifier.weight(1f))
                                }
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

/**
 * Kartu satu klip bawaan: label, kategori, dan penanda bila klip itu sedang berjalan.
 *
 * Menggantikan FilterChip dua kolom yang dulu tidak menyebut kategori dan tidak punya penanda
 * "sedang diputar" yang jelas (hanya warna chip).
 */
@Composable
private fun ClipCard(
    clip: BuiltinClip,
    active: Boolean,
    enabled: Boolean,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
) {
    val container = when {
        active -> MaterialTheme.colorScheme.primaryContainer
        else -> MaterialTheme.colorScheme.surface
    }
    val content = when {
        active -> MaterialTheme.colorScheme.onPrimaryContainer
        enabled -> MaterialTheme.colorScheme.onSurface
        else -> MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = 0.6f)
    }
    Surface(
        onClick = onClick,
        enabled = enabled,
        shape = RoundedCornerShape(MateRadius.MEDIUM.dp),
        color = container,
        contentColor = content,
        border = BorderStroke(
            1.dp,
            if (active) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.outlineVariant,
        ),
        modifier = modifier,
    ) {
        Column(Modifier.padding(horizontal = 12.dp, vertical = 10.dp)) {
            Text(
                clip.label,
                style = MaterialTheme.typography.bodyMedium,
                fontWeight = if (active) FontWeight.SemiBold else FontWeight.Medium,
                maxLines = 1,
                overflow = TextOverflow.Ellipsis,
            )
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(4.dp),
                modifier = Modifier.padding(top = 2.dp),
            ) {
                if (active) {
                    // Titik berdenyut halus: satu-satunya animasi di layar ini.
                    val pulse by rememberInfiniteTransition(label = "clip-pulse").animateFloat(
                        initialValue = 0.45f,
                        targetValue = 1f,
                        animationSpec = infiniteRepeatable(
                            animation = tween(MateMotion.STANDARD_MILLIS * 3),
                            repeatMode = RepeatMode.Reverse,
                        ),
                        label = "clip-pulse-alpha",
                    )
                    Box(
                        Modifier
                            .size(6.dp)
                            .alpha(pulse)
                            .background(MaterialTheme.colorScheme.primary, CircleShape),
                    )
                }
                Text(
                    if (active) "Diputar" else clip.category.label,
                    style = MaterialTheme.typography.labelSmall,
                    color = if (active) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.onSurfaceVariant,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis,
                )
            }
        }
    }
}

/** Nama klip teknis → label yang dipakai tombol, memakai katalog yang sama dengan menu cepat. */
private fun clipLabelOf(clip: String): String = BuiltinClips.labelOf(clip).orEmpty()
