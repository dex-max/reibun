package net.reibun

import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import net.reibun.database.DictionaryDatabase
import java.sql.Connection
import net.reibun.database.SentenceDatabase
import net.reibun.models.ApiError
import net.reibun.models.DictionaryResponse
import net.reibun.models.SearchSentencesResponse

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
                call.respond(ApiError(400, "No search term"))
                return@get
            }

            val results = sentenceDB.searchSentences(search)
            call.respond(SearchSentencesResponse(results))
        }

        get("/api/dictionary/{term}") {
            val term = call.parameters["term"]

            if (term.isNullOrBlank()) {
                call.respond(ApiError(400, "No dictionary term"))
                return@get
            }

            val results = dictionaryDB.searchDictionary(term)
            call.respond(DictionaryResponse(results))
        }
    }
}
