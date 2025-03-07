package net.reibun

import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import java.sql.Connection
import net.reibun.database.SentenceDatabase

fun Application.configureRouting(connection: Connection) {
    val sentenceDB = SentenceDatabase(connection)

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
    }
}