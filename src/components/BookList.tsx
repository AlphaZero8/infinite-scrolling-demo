import { useEffect, useState } from 'react'
import { useBookSearch } from '../hooks/useBookSearch'
import { useOnScreen } from '../hooks/useOnScreen'

export default function BookList({
  query,
  page,
  setPage
}: {
  query: string
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}) {
  const [lastTitle, setLastTitle] = useState<HTMLLIElement | null>(null)
  const isOnScreen = useOnScreen(lastTitle)
  const { bookTitles, isLoading, isError, isIdle, hasMore } = useBookSearch(
    query,
    page
  )

  useEffect(() => {
    if (hasMore && isOnScreen) {
      setPage((prevPage) => prevPage + 1)
    }
  }, [hasMore, isOnScreen, setPage])

  return (
    <>
      {bookTitles.length ? (
        <ul>
          {bookTitles.map((title, index) => {
            if (index === bookTitles.length - 1) {
              return (
                <li key={title} ref={setLastTitle}>
                  {title}
                </li>
              )
            }

            return <li key={title}>{title}</li>
          })}
        </ul>
      ) : (
        isIdle && <div>No book titles to display!</div>
      )}
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error!</div>}
    </>
  )
}
