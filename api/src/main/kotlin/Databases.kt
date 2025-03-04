package net.reibun

import io.ktor.server.application.*
import java.sql.Connection
import java.sql.DriverManager

fun Application.getPostgresConnection(): Connection {
    val url = environment.config.property("postgres.url").getString()
    val username = environment.config.property("postgres.username").getString()
    val password = environment.config.property("postgres.password").getString()

    return DriverManager.getConnection(url, username, password)
}