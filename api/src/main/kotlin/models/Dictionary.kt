package net.reibun.models

import kotlinx.serialization.Serializable

@Serializable
data class DictionaryEntry (
    val term: String,
    val definitions: List<String>
)
