package net.reibun.database

import kotlinx.serialization.json.*
import net.reibun.models.DictionaryEntry
import net.reibun.models.DictionaryResponse
import java.util.zip.GZIPInputStream

class DictionaryDatabase() {
    private val wordMap = mutableMapOf<String, MutableList<DictionaryEntry>>()
    private val readingMap = mutableMapOf<String, MutableList<DictionaryEntry>>()

    init {
        val stream = javaClass.classLoader.getResourceAsStream("dictionary/jmdict-eng-3.6.1.json.gz")
        val text = GZIPInputStream(stream).bufferedReader().readText();

        val json = Json.parseToJsonElement(text)
        val entries = json.jsonObject["words"]!!.jsonArray

        for (entry in entries) {
            val definitions: List<String> = entry.jsonObject["sense"]!!.jsonArray.flatMap { sense ->
                sense.jsonObject["gloss"]!!.jsonArray.map { it.jsonObject["text"]!!.jsonPrimitive.content }
            }

            val words: List<String> = entry.jsonObject["kanji"]!!.jsonArray
                .filter { it.jsonObject["tags"]!!.jsonArray.isEmpty() }
                .map { it.jsonObject["text"]!!.jsonPrimitive.content }
            val readings: List<String> = entry.jsonObject["kana"]!!.jsonArray.map { it.jsonObject["text"]!!.jsonPrimitive.content }
            val entryData = DictionaryEntry(
                term = words.firstOrNull() ?: readings.firstOrNull() ?: "",
                reading = readings.first(),
                definitions = definitions);

            words.forEach { wordMap.getOrPut(it) { mutableListOf() }.add(entryData) }
            readings.forEach { readingMap.getOrPut(it) { mutableListOf() }.add(entryData) }
        }
    }

    fun searchDictionary(search: String): DictionaryResponse {
        val entriesFromWords = wordMap[search] ?: listOf()
        val entriesFromReadings = readingMap[search] ?: listOf()

        val matchingEntries = (entriesFromReadings + entriesFromWords).distinct()
        val sortedByExactMatch = matchingEntries.sortedByDescending { it.term == search }
        return DictionaryResponse(sortedByExactMatch)
    }
}
