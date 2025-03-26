import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useGetCards } from '@/lib/scryfall'
import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router'
import { SearchIcon, ShuffleIcon } from 'lucide-react'
import { useState, useEffect } from 'react'
import { z } from 'zod'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Card } from '@/lib/scryfall/schemas/card-search'

const searchParamsSchema = z.object({
  q: z
    .string()
    .optional()
    .transform(q => q?.toLowerCase()),
})

export const Route = createFileRoute('/search')({
  component: SearchComponent,
  validateSearch: search => searchParamsSchema.parse(search),
  loaderDeps: ({ search: { q } }) => ({ q }),
  loader: ({ context: { queryClient, scryfallService }, deps: { q } }) => {
    if (!q) return null
    return queryClient.ensureQueryData(scryfallService.getCards(q))
  },
})

function SearchComponent() {
  const { q } = useSearch({ from: Route.id })
  const [search, setSearch] = useState(q)
  const [parent] = useAutoAnimate({ duration: 300 })
  const [formRef] = useAutoAnimate()
  const [shuffledData, setShuffledData] = useState<Card[]>([])

  const navigate = useNavigate()
  const { data } = useGetCards(q)

  const hasImage = data?.data.some(card => card.image_uris?.normal)

  useEffect(() => {
    if (data) {
      setShuffledData([...data.data])
    }
  }, [data])

  const handleShuffle = () => {
    if (!shuffledData) return

    const shuffled = [...shuffledData]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    setShuffledData(shuffled)
  }

  const displayCards = shuffledData || data?.data || []

  return (
    <div className="space-y-2 px-2">
      <form
        ref={formRef}
        className="flex gap-1"
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
        <Button variant="outline" type="submit" className="transition-transform hover:scale-105 active:scale-95">
          <SearchIcon />
        </Button>
        <Button
          variant="outline"
          type="button"
          className="transition-transform hover:scale-105 active:scale-95"
          onClick={handleShuffle}
          disabled={!data || data.data.length <= 1}
        >
          <ShuffleIcon />
          Shuffle
        </Button>
      </form>
      <ScrollArea className="h-[calc(100vh-8rem)] rounded-md border">
        <div
          ref={parent}
          className="xs:grid-cols-2 relative grid grid-cols-1 gap-1 p-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8"
        >
          {displayCards.map(card => (
            <div key={card.id} className="flex flex-col overflow-hidden transition-transform hover:scale-105">
              {!hasImage && <p className="truncate text-xs">{card.name}</p>}
              <img
                src={card.image_uris?.normal ?? '/magic_card_back.png'}
                alt={card.name}
                className="rounded-md"
                loading="lazy"
              />
            </div>
          ))}

          {!q && data?.data.length === 0 && (
            <div className="absolute inset-0 flex h-full items-center justify-center">
              <p className="text-muted-foreground animate-pulse">Please, use the search bar above to find a card.</p>
            </div>
          )}

          {q && (!data || data.data.length === 0) && (
            <div className="absolute inset-0 flex h-full items-center justify-center">
              <p className="text-muted-foreground">No cards named {q} found.</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
