package net.reibun.database

import net.reibun.models.Sentence
import java.sql.Connection

class SentenceDatabase(private val connection: Connection) {
    fun searchSentences(query: String): List<Sentence> {
        val sql = """
            SELECT id, content
            FROM sentence
            WHERE to_tsvector('japanese', content) @@ phraseto_tsquery('japanese', ?)
            LIMIT 50
        """.trimIndent()

        return connection.prepareStatement(sql).use { statement ->
            statement.setString(1, query)
            val resultSet = statement.executeQuery()

            generateSequence {
                if (resultSet.next()) Sentence(
                    id = resultSet.getInt("id"),
                    content = resultSet.getString("content")
                ) else null
            }.toList()
        }
    }
}
