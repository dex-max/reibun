package net.reibun.models

import kotlinx.serialization.Serializable

@Serializable
data class ApiError (
    val errorCode: Int,
    val message: String,
)

@Serializable
data class SearchSentencesResponse (
    val count: Int,
    val data: List<Sentence>,
)

@Serializable
data class DictionaryResponse (
    val data: List<DictionaryEntry>
)
