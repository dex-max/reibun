import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react'

const SearchResult = () => {
    return (
        <Card className="my-4 h-48">
            <CardContent className="my-5">
                <div className="flex justify-between">
                    <p className="text-lg mr-5">This is a test sentence from the search result. Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                    <Button><Copy />Copy</Button>
                </div>
                <small className="block mt-4 text-base text-zinc-700">Source: My brain</small>
            </CardContent>
            <CardFooter>
            </CardFooter>
        </Card>
    )
}

export default SearchResult;