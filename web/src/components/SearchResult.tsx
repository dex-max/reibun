import { Copy } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { Sentence } from '@/routes/SearchPage';

const SearchResult = ({ sentences }: { sentences: Sentence[] }) => {
  if (sentences.length === 0) {
    return <div>No results found</div>
  }

  const cardList = sentences.map(sentence => {
    return (
      <Card key={sentence.id} className="my-4 h-48">
        <CardContent className="my-5">
          <div className="flex justify-between">
            <p className="text-lg mr-5">{sentence.content}</p>
            <Button><Copy />Copy</Button>
          </div>
        </CardContent>
      </Card>
    )
  });

  return (
    <div className="mt-10">
      <h2 className="text-xl">Search results</h2>
      {cardList}
    </div>
  )
}

export default SearchResult;