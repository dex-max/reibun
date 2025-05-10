import type { DictionaryEntry } from "@/types/dictionary";

const DictionaryDefinition = ({dictionaryEntry: { term, definitions } }: { dictionaryEntry: DictionaryEntry }) => {
  return (
    <div>
      <strong>{term}</strong>
      <ol>
      {definitions.map((definition, j) => (
          <li key={j}>{definition}</li>
      ))}
      </ol>
    </div>
  )
}

export default DictionaryDefinition;