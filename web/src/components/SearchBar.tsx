import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

import { Search } from 'lucide-react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormField, FormItem, FormControl } from '@/components/ui/form'

const formSchema = z.object({
  searchTerm: z.string()
})

const SearchBar = ({
  className
}: {
  className?: string
}) => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchTerm: ''
    }
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    navigate(`/search/${data.searchTerm}`);
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
