package io.github.mrnodatax.mateengine.chat

import android.content.Context
import android.security.keystore.KeyGenParameterSpec
import android.security.keystore.KeyProperties
import android.util.Base64
import java.security.KeyStore
import javax.crypto.Cipher
import javax.crypto.KeyGenerator
import javax.crypto.SecretKey
import javax.crypto.spec.GCMParameterSpec

/**
 * Menyimpan API key dengan kunci AES di Android Keystore.
 *
 * Kunci tidak pernah ditulis sebagai teks biasa ke disk, tidak masuk log, dan tidak dikirim
 * ke mana pun selain endpoint Gemini saat pengguna mengirim pesan.
 */
class SecretStore(context: Context) {

    private val prefs = context.getSharedPreferences("mate_secure", Context.MODE_PRIVATE)

    fun saveApiKey(value: String) {
        if (value.isBlank()) {
            clearApiKey()
            return
        }
        runCatching {
            val cipher = Cipher.getInstance(TRANSFORMATION)
            cipher.init(Cipher.ENCRYPT_MODE, secretKey())
            val encrypted = cipher.doFinal(value.trim().toByteArray(Charsets.UTF_8))
            prefs.edit()
                .putString(KEY_CIPHER, Base64.encodeToString(encrypted, Base64.NO_WRAP))
                .putString(KEY_IV, Base64.encodeToString(cipher.iv, Base64.NO_WRAP))
                .apply()
        }
    }

    fun readApiKey(): String? {
        val encrypted = prefs.getString(KEY_CIPHER, null) ?: return null
        val iv = prefs.getString(KEY_IV, null) ?: return null
        return runCatching {
            val cipher = Cipher.getInstance(TRANSFORMATION)
            cipher.init(
                Cipher.DECRYPT_MODE,
                secretKey(),
                GCMParameterSpec(128, Base64.decode(iv, Base64.NO_WRAP)),
            )
            String(cipher.doFinal(Base64.decode(encrypted, Base64.NO_WRAP)), Charsets.UTF_8)
        }.getOrNull()
    }

    fun hasApiKey(): Boolean = readApiKey()?.isNotBlank() == true

    fun clearApiKey() {
        prefs.edit().remove(KEY_CIPHER).remove(KEY_IV).apply()
    }

    private fun secretKey(): SecretKey {
        val keyStore = KeyStore.getInstance(ANDROID_KEYSTORE).apply { load(null) }
        (keyStore.getEntry(KEY_ALIAS, null) as? KeyStore.SecretKeyEntry)?.let { return it.secretKey }
        val generator = KeyGenerator.getInstance(KeyProperties.KEY_ALGORITHM_AES, ANDROID_KEYSTORE)
        generator.init(
            KeyGenParameterSpec.Builder(KEY_ALIAS, KeyProperties.PURPOSE_ENCRYPT or KeyProperties.PURPOSE_DECRYPT)
                .setBlockModes(KeyProperties.BLOCK_MODE_GCM)
                .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_NONE)
                .build(),
        )
        return generator.generateKey()
    }

    companion object {
        private const val ANDROID_KEYSTORE = "AndroidKeyStore"
        private const val KEY_ALIAS = "mate_engine_gemini_key"
        private const val TRANSFORMATION = "AES/GCM/NoPadding"
        private const val KEY_CIPHER = "api_key_cipher"
        private const val KEY_IV = "api_key_iv"
    }
}
