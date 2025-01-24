import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";

const Body = () => {
    return (
        <body className="min-h-screen">
            <div className="m-auto w-[700px]">
                <h1 className="text-center text-3xl font-bold text-zinc-900 mt-20 mb-20">Sentence Search</h1>
                <SearchBar className="w-2/3 h-12 my-12 mx-auto"/>
                <SearchResult />
            </div>
        </body>
    )
}

export default Body;