
plugins {
    alias(libs.plugins.kotlin.jvm)
    alias(libs.plugins.ktor)
    alias(libs.plugins.kotlin.plugin.serialization)
}

group = "net.reibun"
version = "0.0.1"

application {
    mainClass = "io.ktor.server.netty.EngineMain"
    applicationDefaultJvmArgs = listOf("-Dio.ktor.development=true")
}

repositories {
    mavenCentral()
}

dependencies {
    implementation(libs.ktor.server.core)
    implementation(libs.ktor.serialization.kotlinx.json)
    implementation(libs.ktor.server.content.negotiation)
    implementation(libs.postgresql)
    implementation(libs.h2)
    implementation(libs.ktor.server.call.logging)
    implementation(libs.ktor.server.cors)
    implementation(libs.ktor.server.netty)
    implementation(libs.logback.classic)
    implementation(libs.ktor.server.config.yaml)
    implementation("com.atilika.kuromoji:kuromoji-ipadic:0.9.0")
    testImplementation(libs.ktor.server.test.host)
    testImplementation(libs.kotlin.test.junit)
}