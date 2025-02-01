import SearchBar from '@/components/SearchBar';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <div className="m-auto w-[700px]">
        <h1 className="text-center text-3xl font-bold text-zinc-900 mt-20 mb-20">Sentence Search</h1>
        <SearchBar />
      </div>
    </div>
  )
}

export default HomePage;