import { Routes, Route } from 'react-router'
import HomePage from './routes/HomePage'
import SearchPage from './routes/SearchPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search/:searchTerm" element={<SearchPage />} />
    </Routes>
  )
}

export default App
