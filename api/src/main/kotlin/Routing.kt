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
            val query = call.request.queryParameters["search-term"]
            if (query.isNullOrBlank()) {
                call.respond(mapOf("error" to "No search"))
                return@get
            }

            val results = sentenceDB.searchSentences(query)
            call.respond(results)
        }
    }
}