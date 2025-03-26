import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ArrowRightIcon, SearchIcon } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

function LandingPage() {
  const navigate = useNavigate()
  return (
    <div className="from-background to-muted min-h-screen bg-gradient-to-b">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-foreground mb-4 text-5xl font-bold tracking-tight">Build MTG Decks Offline</h2>
        <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-xl">
          A simple offline deck builder for Magic: The Gathering that uses the Scryfall API to search for cards.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" className="gap-2">
            Build Decks
            <ArrowRightIcon className="h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" className="gap-2">
            Find Cards
            <SearchIcon className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Search Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-card mx-auto max-w-md rounded-lg border p-6 shadow-sm">
          <h3 className="text-card-foreground mb-4 text-xl font-medium">Quick Search</h3>
          <form
            className="flex gap-2"
            onSubmit={e => {
              e.preventDefault()
              const formData = new FormData(e.target as HTMLFormElement)
              const query = formData.get('query')
              if (!query) return

              navigate({ to: '/search', search: { q: query as string } })
            }}
          >
            <Input placeholder="Search for a card..." id="query" name="query" />
            <Button type="submit" variant="secondary">
              <SearchIcon />
              Search card by name
            </Button>
          </form>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-foreground mb-12 text-center text-3xl font-bold">Features</h3>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <FeatureCard
            title="Card Search"
            description="Search cards from Scryfall's extensive database with powerful filtering options."
            icon="🔍"
          />
          <FeatureCard
            title="Deck Building"
            description="Build and save decks locally with an intuitive drag-and-drop interface."
            icon="📚"
          />
          <FeatureCard
            title="Offline Mode"
            description="Access your decks and previously searched cards even without an internet connection."
            icon="💾"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="text-muted-foreground container mx-auto mt-12 border-t px-4 py-8 text-center">
        <p>Powered by Scryfall API</p>
        <p className="mt-2">
          Based on{' '}
          <a
            href="https://github.com/Koakovski/Scryfall_Personal/"
            className="text-primary hover:text-primary/80 underline"
          >
            Koakovski's Scryfall Personal
          </a>
        </p>
      </footer>
    </div>
  )
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <div className="bg-card hover:border-primary/50 hover:bg-accent rounded-lg border p-6 shadow-sm transition">
      <div className="mb-4 text-4xl">{icon}</div>
      <h4 className="text-card-foreground mb-2 text-xl font-semibold">{title}</h4>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}
