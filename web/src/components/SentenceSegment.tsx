import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'

import DictionaryPopup from '@/components/DictionaryPopup'
import type { Segment } from '@/types/language'

const SentenceSegment = ({ segment }: { segment: Segment }) => {
  if (segment.morphemes[0].partOfSpeech === '記号') {
    return <span>{segment.surface}</span>
  }

  return (
    <HoverCard openDelay={50} closeDelay={20}>
      <HoverCardTrigger tabIndex={0}>
        <span className={`relative text-lg border-b-2 border-dotted pb-0.5 mr-1 ${segment.highlight ? 'border-[#B28DDF]' : 'border-zinc-400'}`}>
          {segment.highlight ? (
            <strong className="text-[#8338EC] text-nowrap">{segment.surface}</strong>
          ) : (
            <span className="text-nowrap">{segment.surface}</span>
          )}
        </span>
      </HoverCardTrigger>
      <HoverCardContent side="top">
        <DictionaryPopup segment={segment} />
      </HoverCardContent>
    </HoverCard>
  )
}

export default SentenceSegment
