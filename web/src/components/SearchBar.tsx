import { useForm } from 'react-hook-form'

import { Search } from 'lucide-react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormField, FormItem, FormControl } from '@/components/ui/form'

import { Sentence } from './Body'

const formSchema = z.object({
  searchTerm: z.string()
})

const SearchBar = ({
  setEntries,
  className
}: {
  setEntries: React.Dispatch<React.SetStateAction<Sentence[]>>,
  className?: string
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchTerm: ''
    }
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const hostname = import.meta.env.VITE_API_HOSTNAME;
      const port = import.meta.env.VITE_API_PORT;
      const url = `http://${hostname}:${port}/sentences?search-term=${data.searchTerm}`;

      const response = await fetch(url);

      if (response.status !== 200) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const apiData = await response.json();

      setEntries(apiData['data']);
    } catch (e) {
      console.error(e);
    }

  }

  return (
    <div className={className}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex justify-center w-full"
        >
          <FormField
            control={form.control}
            name="searchTerm"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Search for a word" className="h-full bg-white" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="ml-2 h-full"><Search />Search</Button>
        </form>
      </Form>
    </div>
  )
}

export default SearchBar;