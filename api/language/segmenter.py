from sudachipy import dictionary, SplitMode
from .typing import Segment, Morpheme


class Segmenter:
    def __init__(self):
        self.tokenizer = dictionary.Dictionary().create()

    def segmentize(self, text: str, search_term: str) -> list[Segment]:
        search_tokens = self.tokenizer.tokenize(search_term, SplitMode.C)
        tokens = self.tokenizer.tokenize(text, SplitMode.C)

        morphemes: list[Morpheme] = [
            {
                "surface": token.surface(),
                "normalized_form": token.dictionary_form(),
                "part_of_speech": token.part_of_speech()[0],
                "matches_search": any(
                    token.dictionary_form() == search_token.dictionary_form()
                    for search_token in search_tokens
                ),
            }
            for token in tokens
        ]

        # for now each segment will be a single morpheme
        segments: list[Segment] = [
            {
                "surface": morpheme["surface"],
                "dictionary_form": morpheme["normalized_form"],
                "morphemes": [morpheme],
                "highlight": morpheme["matches_search"],
            }
            for morpheme in morphemes
        ]

        return segments
