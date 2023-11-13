import { useBookSearch } from '../hooks/useBookSearch'

export default function BookList({ query }: { query: string }) {
  const { bookTitles, isLoading, isError } = useBookSearch(query)
  console.log('🚀 ~ file: BookList.tsx:9 ~ bookTitles:', bookTitles)
  return (
    <>
      <ul>
        {bookTitles.map((title) => (
          <li key={title}>{title}</li>
        ))}
      </ul>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error</div>}
    </>
  )
}
