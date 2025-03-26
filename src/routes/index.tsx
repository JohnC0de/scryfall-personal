import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import {
  ArrowRightIcon,
  BookOpenIcon,
  DownloadIcon,
  FlameIcon,
  LightbulbIcon,
  SaveIcon,
  SearchIcon,
  ZapIcon,
} from 'lucide-react'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

function LandingPage() {
  const navigate = useNavigate()
  return (
    <div className="from-background to-muted flex-1 bg-gradient-to-b">
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="container mx-auto px-3 py-8 text-center sm:px-4 sm:py-12">
          <h2 className="text-foreground mb-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Build MTG Decks Offline
          </h2>
          <p className="text-muted-foreground mx-auto mb-4 max-w-xl text-base sm:text-lg">
            A simple offline deck builder for Magic: The Gathering that uses the Scryfall API to search for cards.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="default" className="gap-1">
              <ArrowRightIcon />
              Build Decks
            </Button>
            <Button size="default" variant="outline" className="gap-1">
              <SearchIcon />
              Find Cards
            </Button>
          </div>
        </section>

        {/* Search Section */}
        <section className="container mx-auto px-3 py-4 sm:px-4">
          <div className="bg-card mx-auto max-w-md rounded border p-3 shadow-sm sm:p-4">
            <h3 className="text-card-foreground mb-2 text-lg font-medium">Quick Search</h3>
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
              <Input placeholder="Search for a card..." id="query" name="query" className="text-sm sm:text-base" />
              <Button type="submit" variant="secondary" size="icon">
                <SearchIcon />
              </Button>
            </form>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-3 py-8 sm:px-4 sm:py-10">
          <h3 className="text-foreground mb-4 text-center text-xl font-bold sm:mb-6 sm:text-2xl">Features</h3>
          <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3">
            <FeatureCard
              title="Card Search"
              description="Search cards from Scryfall's extensive database with powerful filtering options."
              icon={<SearchIcon size={20} />}
            />
            <FeatureCard
              title="Deck Building"
              description="Build and save decks locally with an intuitive drag-and-drop interface."
              icon={<BookOpenIcon size={20} />}
            />
            <FeatureCard
              title="Offline Mode"
              description="Access your decks and previously searched cards even without an internet connection."
              icon={<SaveIcon size={20} />}
            />
          </div>
        </section>

        {/* Benefits Section */}
        <section className="container mx-auto px-3 py-8 sm:px-4 sm:py-10">
          <h3 className="text-foreground mb-4 text-center text-xl font-bold sm:mb-6 sm:text-2xl">
            Why Use Scryfall Personal?
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="bg-card hover:bg-accent/50 rounded border p-3 shadow-sm sm:p-4">
              <div className="mb-2 flex items-center gap-2">
                <ZapIcon size={18} className="text-primary" />
                <h4 className="font-semibold">Fast & Responsive</h4>
              </div>
              <p className="text-muted-foreground text-sm">
                Built with modern technologies for a smooth, fast experience on any device.
              </p>
            </div>
            <div className="bg-card hover:bg-accent/50 rounded border p-3 shadow-sm sm:p-4">
              <div className="mb-2 flex items-center gap-2">
                <DownloadIcon size={18} className="text-primary" />
                <h4 className="font-semibold">Work Offline</h4>
              </div>
              <p className="text-muted-foreground text-sm">
                Once cards are loaded, you can continue building decks even without internet connection.
              </p>
            </div>
            <div className="bg-card hover:bg-accent/50 rounded border p-3 shadow-sm sm:p-4">
              <div className="mb-2 flex items-center gap-2">
                <FlameIcon size={18} className="text-primary" />
                <h4 className="font-semibold">Modern UI</h4>
              </div>
              <p className="text-muted-foreground text-sm">
                Clean, intuitive interface designed for both desktop and mobile users.
              </p>
            </div>
            <div className="bg-card hover:bg-accent/50 rounded border p-3 shadow-sm sm:p-4">
              <div className="mb-2 flex items-center gap-2">
                <LightbulbIcon size={18} className="text-primary" />
                <h4 className="font-semibold">Powerful Tools</h4>
              </div>
              <p className="text-muted-foreground text-sm">
                Advanced filtering, sorting and deck analytics to help build better decks.
              </p>
            </div>
          </div>
        </section>

        {/* Getting Started */}
        <section className="container mx-auto px-3 py-8 sm:px-4 sm:py-10">
          <div className="bg-card mx-auto max-w-xl rounded border p-4 shadow-sm">
            <h3 className="text-card-foreground mb-3 text-center text-xl font-medium">Ready to start building?</h3>
            <p className="text-muted-foreground mb-4 text-center text-sm">
              Jump right in and create your first deck or browse through thousands of cards.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button className="gap-1" onClick={() => navigate({ to: '/decks' })}>
                My Decks
                <BookOpenIcon />
              </Button>
              <Button variant="outline" className="gap-1" onClick={() => navigate({ to: '/search' })}>
                Search Cards
                <SearchIcon />
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-muted-foreground container mx-auto border-t px-3 py-3 text-center text-xs sm:px-4 sm:py-4 sm:text-sm">
          <p>Powered by Scryfall API</p>
          <p className="mt-1">
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
    </div>
  )
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
  return (
    <div className="bg-card hover:border-primary/50 hover:bg-accent rounded border p-3 shadow-sm transition sm:p-4">
      <h4 className="text-card-foreground mb-1 flex items-center gap-1.5 text-sm font-semibold sm:text-base">
        {icon} {title}
      </h4>
      <p className="text-muted-foreground text-xs sm:text-sm">{description}</p>
    </div>
  )
}
