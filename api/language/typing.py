from typing import TypedDict


class Morpheme(TypedDict):
    surface: str
    normalized_form: str
    part_of_speech: str


class Segment(TypedDict):
    surface: str
    dictionary_form: str
    morphemes: list[Morpheme]


class Sentence(TypedDict):
    id: int
    content: str
    segments: list[Segment]
