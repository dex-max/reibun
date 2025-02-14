from sudachipy import dictionary, SplitMode
from .typing import Segment, Morpheme


class Segmenter:
    def __init__(self):
        self.tokenizer = dictionary.Dictionary().create()

    def segmentize(self, text: str) -> list[Segment]:
        tokens = self.tokenizer.tokenize(text, SplitMode.C)

        morphemes: list[Morpheme] = [
            {
                "surface": token.surface(),
                "normalized_form": token.dictionary_form(),
                "part_of_speech": token.part_of_speech()[0],
            }
            for token in tokens
        ]

        # for now each segment will be a single morpheme
        segments: list[Segment] = [
            {
                "surface": morpheme["surface"],
                "dictionary_form": morpheme["normalized_form"],
                "morphemes": [morpheme],
            }
            for morpheme in morphemes
        ]

        return segments
