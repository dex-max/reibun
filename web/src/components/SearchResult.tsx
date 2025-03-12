import { Card, CardContent } from '@/components/ui/card'

import SentenceSegment from './SentenceSegment'
import type { Sentence } from '@/types/language'

const SearchResult = ({ sentences }: { sentences: Sentence[] }) => {
  if (sentences.length === 0) {
    return <div>No results found</div>
  }

  const cardList = sentences.map(sentence => (
    <Card key={sentence.id}>
      <CardContent className="p-5">
        {sentence.segments.map((segment, i) => (
          <SentenceSegment key={i} segment={segment} />
        ))}
      </CardContent>
    </Card>
  ));

  return (
    <div className="mt-10">
      <h2 className="text-xl mb-5">Search results</h2>
      <div className="flex flex-col gap-3">
        {cardList}
      </div>
    </div>
  )
}

export default SearchResult;
