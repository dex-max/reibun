package net.reibun.models

import kotlinx.serialization.Serializable

@Serializable
data class Morpheme (
    val surface: String,
    val normalizedForm: String,
    val partOfSpeech: String,
    val matchesSearch: Boolean
)

@Serializable
data class Segment (
    val surface: String,
    val dictionaryForm: String,
    val morphemes: List<Morpheme>,
    val highlight: Boolean
)

@Serializable
data class Sentence (
    val id: Int,
    val content: String,
    val segments: List<Segment>
)