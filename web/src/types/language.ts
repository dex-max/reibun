interface Morpheme {
  surface: string;
  normalized_form: string;
  part_of_speech: string;
  matches_search: string;
}

interface Segment {
  surface: string;
  dictionary_form: string;
  morphemes: Morpheme[];
  highlight: boolean;
}

interface Sentence {
  id: number;
  content: string;
  segments: Segment[];
}

export type { Morpheme, Segment, Sentence }