package net.reibun.services

import com.atilika.kuromoji.ipadic.Token;
import com.atilika.kuromoji.ipadic.Tokenizer;
import net.reibun.models.Morpheme
import net.reibun.models.Segment

class Segmenter {
    private val kuromoji = Tokenizer()

    fun segmentize(text: String, search: String): List<Segment> {
        val segments = kuromoji.tokenize(text).map {
            Segment(
                surface = it.surface,
                dictionaryForm = it.baseForm,
                morphemes = listOf(Morpheme(it.surface, it.baseForm, it.partOfSpeechLevel1, it.baseForm == search)),
                highlight = it.baseForm == search
            )
        }

        return segments
    }
}