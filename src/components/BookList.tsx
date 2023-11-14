import { useBookSearch } from '../hooks/useBookSearch'

export default function BookList({ query }: { query: string }) {
  const { bookTitles, isLoading, isError, isIdle } = useBookSearch(query)
  console.log('🚀 ~ file: BookList.tsx:9 ~ bookTitles:', bookTitles)
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
