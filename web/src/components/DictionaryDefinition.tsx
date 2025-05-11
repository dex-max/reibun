import type { DictionaryEntry } from "@/types/dictionary";

const DictionaryDefinition = ({dictionaryEntry: { term, reading, definitions } }: { dictionaryEntry: DictionaryEntry }) => {
  return (
    <div>
      <ruby>
        <strong>{term}</strong>
        <rt>{reading}</rt>
      </ruby>
      <ol>
      {definitions.map((definition, j) => (
          <li key={j}>{definition}</li>
      ))}
      </ol>
    </div>
  )
}

export default DictionaryDefinition;