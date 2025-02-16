from typing import TypedDict


class Morpheme(TypedDict):
    surface: str
    normalized_form: str
    part_of_speech: str
    matches_search: bool


class Segment(TypedDict):
    surface: str
    dictionary_form: str
    morphemes: list[Morpheme]
    highlight: bool


class Sentence(TypedDict):
    id: int
    content: str
    segments: list[Segment]
