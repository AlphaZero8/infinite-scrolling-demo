import { useEffect, useMemo, useState } from 'react'

interface Doc {
  title: string
  [docProp: string]: any
}

interface BookSearchResult {
  docs: Doc[]
  [searchResultProp: string]: any
}

export function useBookSearch(query: string) {
  const [bookTitles, setBookTitles] = useState<string[]>([])
  const [apiStatus, setApiStatus] = useState<'idle' | 'loading' | 'error'>(
    'idle'
  )

  useEffect(() => {
    async function searchBooks() {
      setBookTitles([])
      setApiStatus('loading')

      try {
        const res = await fetch(
          `https://openlibrary.org/search.json?q=${query}`
        )
        const json: BookSearchResult = await res.json()

        setApiStatus('idle')
        const mergeBookTitles = (prevTitles: string[]) => [
          ...prevTitles,
          ...json.docs.map((doc) => doc.title)
        ]

        // Set only the unique titles
        setBookTitles((prevTitles) => [...new Set(mergeBookTitles(prevTitles))])
      } catch (e) {
        setApiStatus('error')
        console.error('Something went wrong in fetching the books!', e)
      }
    }

    searchBooks()
  }, [query])

  return useMemo(
    () => ({
      bookTitles,
      isLoading: apiStatus === 'loading',
      isError: apiStatus === 'error'
    }),
    [bookTitles, apiStatus]
  )
}
