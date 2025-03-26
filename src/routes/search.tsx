import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetCards } from '@/lib/scryfall'
import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router'
import { SearchIcon } from 'lucide-react'
import { useState } from 'react'
import { z } from 'zod'

const searchParamsSchema = z.object({
  q: z.string().optional(),
})

export const Route = createFileRoute('/search')({
  component: SearchComponent,
  validateSearch: search => searchParamsSchema.parse(search),
  loaderDeps: ({ search: { q } }) => ({ q }),
  loader: ({ context: { queryClient, scryfallService }, deps: { q } }) => {
    if (!q) return null
    return queryClient.ensureQueryData(scryfallService.getCards(q))
  },
  pendingMs: 0,
  pendingMinMs: 0,
  pendingComponent: () => (
    <div className="space-y-2 px-2">
      <div className="flex gap-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-24" />
      </div>
      <ScrollArea className="h-[calc(100vh-8rem)] rounded-md border">
        <CardSkeletonGrid />
      </ScrollArea>
    </div>
  ),
})

function SearchComponent() {
  const { q } = useSearch({ from: Route.id })
  const [search, setSearch] = useState(q)

  const navigate = useNavigate()
  const { data } = useGetCards(q)

  const hasImage = data?.data.some(card => card.image_uris?.normal)

  return (
    <div className="space-y-2 px-2">
      <form
        className="flex gap-2"
        onSubmit={e => {
          e.preventDefault()
          navigate({ to: '/search', search: { q: search } })
        }}
      >
        <Input
          type="text"
          placeholder="Search card by name"
          value={search ?? ''}
          onChange={e => setSearch(e.target.value)}
        />
        <Button variant="outline" type="submit">
          <SearchIcon />
        </Button>
      </form>
      <ScrollArea className="h-[calc(100vh-8rem)] rounded-md border">
        <div className="grid grid-cols-6 gap-2 p-4">
          {data?.data.map(card => (
            <div key={card.id} className="flex flex-col">
              {!hasImage && <p className="truncate">{card.name}</p>}
              <img
                src={card.image_uris?.normal ?? '/magic_card_back.png'}
                alt={card.name}
                className="rounded-lg transition-opacity duration-200 hover:opacity-90"
                loading="lazy"
              />
            </div>
          ))}
          {!q && (
            <div className="col-span-6 flex h-full items-center justify-center">
              <p className="text-muted-foreground">Please, use the search bar above to find a card.</p>
            </div>
          )}
          {!data && q && (
            <div className="col-span-6 flex h-full items-center justify-center">
              <p className="text-muted-foreground">No cards named {q} found.</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

function CardSkeleton() {
  return (
    <div className="flex flex-col space-y-2">
      <Skeleton className="h-60 w-full rounded-lg" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  )
}

function CardSkeletonGrid() {
  return (
    <div className="grid grid-cols-6 gap-2 p-4">
      {Array.from({ length: 24 }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  )
}
