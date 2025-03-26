import { useQuery } from '@tanstack/react-query'

export function App() {
  const query = useQuery({
    queryKey: ['todos'],
    queryFn: () => fetch('https://jsonplaceholder.typicode.com/todos').then(res => res.json()),
  })

  return <div>{JSON.stringify(query.data)}</div>
}
