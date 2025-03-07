import { Card, CardContent } from '@/components/ui/card'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'

import type { Sentence } from '@/types/language'

const SearchResult = ({ sentences }: { sentences: Sentence[] }) => {
  if (sentences.length === 0) {
    return <div>No results found</div>
  }

  const cardList = sentences.map(sentence => {
    return (
      <Card key={sentence.id}>
        <CardContent className="p-5">
          {sentence.segments.map((segment, i) => {
            return (
              <HoverCard key={i} openDelay={50} closeDelay={20}>
                <HoverCardTrigger>
                  <span className={`relative text-lg border-b-2 border-dotted pb-0.5 mr-1 ${segment.highlight ? 'border-[#B28DDF]' : 'border-zinc-400'}`}>
                    {segment.highlight ? (
                      <strong className="text-[#8338EC] text-nowrap">{segment.surface}</strong>
                    ) : (
                      <span className="text-nowrap">{segment.surface}</span>
                    )}
                  </span>
                </HoverCardTrigger>
                <HoverCardContent side="top">
                  {segment.dictionaryForm}
                </HoverCardContent>
              </HoverCard>
            )
          })}
        </CardContent>
      </Card>
    )
  });

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
