import { useEffect, useMemo, useRef, useState } from 'react'

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
  const abortControllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    async function searchBooks() {
      if (!query) {
        setBookTitles([])
        setApiStatus('idle')
        return
      }
      // Abort the previous network request if any
      abortControllerRef.current?.abort()

      abortControllerRef.current = new AbortController()
      setBookTitles([])
      setApiStatus('loading')

      try {
        const res = await fetch(
          `https://openlibrary.org/search.json?q=${query}`,
          {
            signal: abortControllerRef.current.signal
          }
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
        // Ignore the errors due to the request cancellation
        if (e instanceof DOMException && e.name === 'AbortError') {
          return
        }

        setApiStatus('error')
        console.error('Something went wrong in fetching the books!', e)
      }
    }

    searchBooks()
    return () => abortControllerRef.current?.abort()
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
