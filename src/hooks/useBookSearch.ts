import { useEffect, useState } from 'react'

interface Doc {
  title: string
  [docProp: string]: any
}

interface BookSearchResult {
  docs: Doc[]
  [searchResultProp: string]: any
}

export function useBookSearch(query: string) {
  const [books, setBooks] = useState<string[]>([])
  useEffect(() => {
    async function searchBooks() {
      try {
        const res = await fetch(
          `https://openlibrary.org/search.json?q=${query}`
        )
        const json: BookSearchResult = await res.json()

        setBooks(json.docs.map((doc) => doc.title))
      } catch (e) {
        console.error('Something went wrong in fetching the books!', e)
      }
    }

    searchBooks()
  }, [query])

  return books
}
