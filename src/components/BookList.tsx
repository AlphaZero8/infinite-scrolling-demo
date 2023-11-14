import { useBookSearch } from '../hooks/useBookSearch'

export default function BookList({
  query,
  page
}: {
  query: string
  page: number
}) {
  const { bookTitles, isLoading, isError, isIdle } = useBookSearch(query, page)

  return (
    <>
      {bookTitles.length ? (
        <ul>
          {bookTitles.map((title) => (
            <li key={title}>{title}</li>
          ))}
        </ul>
      ) : (
        isIdle && <div>No book titles to display!</div>
      )}
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error!</div>}
    </>
  )
}
