package net.reibun.models

import kotlinx.serialization.Serializable

@Serializable
data class Sentence (
    val id: Int,
    val content: String
)