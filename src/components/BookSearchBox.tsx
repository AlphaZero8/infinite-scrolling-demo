export default function BookSearchBox({
  query,
  onChange
}: {
  query: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return <input type="text" value={query} onChange={onChange} />
}
