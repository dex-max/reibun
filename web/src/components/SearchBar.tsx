import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

import { Search } from 'lucide-react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { cn } from '@/lib/utils'
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex gap-2", className)}
      >
        <FormField
          control={form.control}
          name="searchTerm"
          render={({ field }) => (
            <FormItem className="grow">
              <FormControl>
                <Input placeholder="Search for a word" className="h-full md:text-xl" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="h-full"><Search />Search</Button>
      </form>
    </Form>
  )
}

export default SearchBar;
