import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetCards } from '@/lib/scryfall'
import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router'
import { SearchIcon } from 'lucide-react'
import { useState } from 'react'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'

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
  const { data, isLoading } = useGetCards(q)

  const hasImage = data?.data.some(card => card.image_uris?.normal)

  return (
    <div className="space-y-2 px-2">
      <motion.form
        className="flex gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
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
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="outline" type="submit">
            <SearchIcon />
          </Button>
        </motion.div>
      </motion.form>
      <ScrollArea className="h-[calc(100vh-8rem)] rounded-md border">
        <div className="xs:grid-cols-2 relative grid grid-cols-1 gap-1 p-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <CardSkeletonGrid key="skeleton" />
            ) : (
              <>
                {data?.data.map((card, index) => (
                  <motion.div
                    key={card.id}
                    className="flex flex-col overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                  >
                    {!hasImage && <p className="truncate text-xs">{card.name}</p>}
                    <motion.img
                      src={card.image_uris?.normal ?? '/magic_card_back.png'}
                      alt={card.name}
                      className="rounded-md"
                      loading="lazy"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.div>
                ))}
              </>
            )}
          </AnimatePresence>

          {!q && data?.data.length === 0 && (
            <motion.div
              className="absolute inset-0 flex h-full items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.p
                className="text-muted-foreground"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  repeatDelay: 3,
                }}
              >
                Please, use the search bar above to find a card.
              </motion.p>
            </motion.div>
          )}

          {q && (!data || data.data.length === 0) && (
            <motion.div
              className="absolute inset-0 flex h-full items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-muted-foreground">No cards named {q} found.</p>
            </motion.div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

function CardSkeleton() {
  return (
    <motion.div
      className="flex flex-col space-y-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Skeleton className="h-40 w-full rounded-md" />
      <Skeleton className="h-3 w-3/4" />
    </motion.div>
  )
}

function CardSkeletonGrid() {
  return (
    <div className="xs:grid-cols-2 grid grid-cols-1 gap-1 p-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
      {Array.from({ length: 24 }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <CardSkeleton />
        </motion.div>
      ))}
    </div>
  )
}
