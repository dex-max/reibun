import { Card, CardContent } from '@/components/ui/card'
import { Sentence } from '@/routes/SearchPage'

const SearchResult = ({ sentences }: { sentences: Sentence[] }) => {
  if (sentences.length === 0) {
    return <div>No results found</div>
  }

  const cardList = sentences.map(sentence => {
    return (
      <Card key={sentence.id}>
        <CardContent className="p-5">
          <p dangerouslySetInnerHTML={{ __html: sentence.content }} className="text-lg [&>b]:text-[#8338EC]"></p>
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
