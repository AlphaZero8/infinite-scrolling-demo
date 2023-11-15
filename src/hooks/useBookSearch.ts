import { useEffect, useMemo, useRef, useState } from 'react'

interface Doc {
  title: string
  [docProp: string]: any
}

interface BookSearchResult {
  docs: Doc[]
  numFound: number
  start: number
  [searchResultProp: string]: any
}

export function useBookSearch(query: string, page: number) {
  const [bookTitles, setBookTitles] = useState<string[]>([])
  const [apiStatus, setApiStatus] = useState<'idle' | 'loading' | 'error'>(
    'idle'
  )
  const [hasMore, setHasMore] = useState(false)
  const abortControllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    setBookTitles([])
  }, [query])

  useEffect(() => {
    async function searchBooks() {
      if (!query) {
        setApiStatus('idle')
        return
      }
      // Abort the previous network request if any
      abortControllerRef.current?.abort()

      abortControllerRef.current = new AbortController()
      setApiStatus('loading')

      try {
        const res = await fetch(
          `https://openlibrary.org/search.json?q=${query}&page=${page}`,
          {
            signal: abortControllerRef.current.signal
          }
        )
        const { docs, numFound, start }: BookSearchResult = await res.json()

        setHasMore(numFound - start >= 100)
        setApiStatus('idle')
        const mergeBookTitles = (prevTitles: string[]) => [
          ...prevTitles,
          ...docs.map((doc) => doc.title)
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
  }, [query, page])

  return useMemo(
    () => ({
      bookTitles,
      isLoading: apiStatus === 'loading',
      isError: apiStatus === 'error',
      isIdle: apiStatus === 'idle',
      hasMore
    }),
    [bookTitles, apiStatus, hasMore]
  )
}
