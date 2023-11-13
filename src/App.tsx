import { useState } from 'react'
import BookList from './components/BookList'
import BookSearchBox from './components/BookSearchBox'

function App() {
  const [query, setQuery] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  return (
    <div className="App">
      <BookSearchBox query={query} onChange={handleInputChange} />
      <BookList query={query} />
    </div>
  )
}

export default App
