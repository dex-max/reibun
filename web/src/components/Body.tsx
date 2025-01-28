import { useState } from 'react';

import SearchBar from './SearchBar';
import SearchResult from './SearchResult';

export interface Sentence {
  id: number;
  content: string;
}

const Body = () => {
  const [entries, setEntries] = useState<Sentence[]>([]);

  return (
    <div className="min-h-screen">
      <div className="m-auto w-[700px]">
        <h1 className="text-center text-3xl font-bold text-zinc-900 mt-20 mb-20">Sentence Search</h1>
        <SearchBar setEntries={setEntries} />
        <SearchResult entries={entries} />
      </div>
    </div>
  )
}

export default Body;