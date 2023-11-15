import { useState } from 'react'
import BookList from './components/BookList'
import BookSearchBox from './components/BookSearchBox'

function App() {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setPage(1)
  }

  return (
    <div className="App">
      <BookSearchBox query={query} onChange={handleInputChange} />
      <BookList query={query} page={page} setPage={setPage} />
    </div>
  )
}

export default App
