import { Copy } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { Sentence } from './Body'

const SearchResult = ({ entries }: {entries: Sentence[]}) => {
  if (entries.length === 0) {
    return <div>No results found</div>
  }

  const cardList = entries.map(entry => {
    return (
      <Card key={entry.id} className="my-4 h-48">
        <CardContent className="my-5">
          <div className="flex justify-between">
            <p className="text-lg mr-5">{entry.content}</p>
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