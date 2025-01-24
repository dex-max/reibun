import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'


const SearchBar = ({ className }: { className: string }) => {
    return (
        <div className={cn("flex", className)}>
            <Input placeholder="Search for a word or phrase" className="h-full bg-white"/>
            <Button className="ml-2 h-full"><Search />Search</Button>
        </div>
    )
}

export default SearchBar;