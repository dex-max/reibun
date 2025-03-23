import { useState, useEffect } from 'react'
import { useParams } from 'react-router'

import type { Sentence } from '@/types/language'
import SearchBar from '@/components/SearchBar'
import SearchResult from '@/components/SearchResult'

const SearchPage = () => {
  const { searchTerm } = useParams();
  const [sentences, setSentences] = useState<Sentence[]>([]);

  useEffect(() => {
    const fetchSentences = async (searchTerm: string) => {
      try {
        const url = `/api/sentences?search-term=${searchTerm}`;
        const response = await fetch(url);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData?.error?.message ?? 'No error message');
        }

        const apiData = await response.json();
        setSentences(apiData['data']);
      } catch (error) {
        console.error('Error fetching sentences: ', error);
      }
    }

    fetchSentences(searchTerm ?? '');
  }, [searchTerm]);

  return (
    <div className="min-h-screen">
      <div className="m-auto w-[700px]">
        <h1 className="text-center text-3xl font-bold text-zinc-900 mt-20 mb-20">Sentence Search</h1>
        <SearchBar className="h-12" searchTerm={searchTerm}/>
        <SearchResult sentences={sentences} />
      </div>
    </div>
  )
}

export default SearchPage;