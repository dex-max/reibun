package net.reibun

import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import net.reibun.database.DictionaryDatabase
import java.sql.Connection
import net.reibun.database.SentenceDatabase

fun Application.configureRouting(connection: Connection) {
    val sentenceDB = SentenceDatabase(connection)
    val dictionaryDB = DictionaryDatabase()

    routing {
        get("/") {
            call.respondText("Hello world")
        }

        get("/api/sentences") {
            val search = call.request.queryParameters["search-term"]
            if (search.isNullOrBlank()) {
                call.respond(mapOf(
                    "error" to mapOf("code" to 400, "message" to "No search term")
                ))
                return@get
            }

            val results = sentenceDB.searchSentences(search)
            call.respond(mapOf("data" to results))
        }

        get("/api/dictionary/{term}") {
            val term = call.parameters["term"]

            if (term.isNullOrBlank()) {
                call.respond(mapOf(
                    "error" to mapOf("code" to 400, "message" to "No dictionary term")
                ))
                return@get
            }

            val results = dictionaryDB.searchDictionary(term)
            call.respond(mapOf("data" to results))
        }
    }
}
