import { useBookSearch } from '../hooks/useBookSearch'

export default function BookList({ query }: { query: string }) {
  const bookTitles = useBookSearch(query)
  console.log('🚀 ~ file: BookList.tsx:9 ~ bookTitles:', bookTitles)
  return (
    <>
      <div>Title</div>
      <div>Title</div>
      <div>Title</div>
      <div>Loading...</div>
      <div>Error</div>
    </>
  )
}
