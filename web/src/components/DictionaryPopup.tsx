import { useState, useEffect } from 'react';

import type { Segment } from '@/types/language';
import type { DictionaryEntry } from '@/types/dictionary';

import DictionaryDefinition from '@/components/DictionaryDefinition';

const DictionaryPopup = ({ segment }: { segment: Segment }) => {
  const [dictionaryEntries, setDictionaryEntries] = useState<DictionaryEntry[]>([]);

  useEffect(() => {
    const fetchDictionary = async (searchTerm: string) => {
      try {
        const url = `/api/dictionary/${searchTerm}`;
        const response = await fetch(url);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData?.error?.message ?? 'No error message');
        }

        const apiData = await response.json();
        setDictionaryEntries(apiData['data']);
      } catch (error) {
        console.error('Error fetching sentences: ', error);
      }
    }

    fetchDictionary(segment.dictionaryForm ?? '');
  }, []);

  return (
    <>
      <ol>
        {dictionaryEntries.map((dictionaryEntry, i) => (
          <DictionaryDefinition dictionaryEntry={dictionaryEntry} key={i} />
        ))}
      </ol>
    </>
  )
}

export default DictionaryPopup;
