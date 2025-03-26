import { createFileRoute } from '@tanstack/react-router'
import { Button } from '../components/ui/button'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Scryfall Personal</h1>
        <div className="flex gap-4">
          <Button variant="ghost">Search</Button>
          <Button variant="ghost">My Decks</Button>
          <Button>Get Started</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-5xl font-bold mb-4">Build MTG Decks Offline</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">
          A simple offline deck builder for Magic: The Gathering that uses the Scryfall API to search for cards.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg">Start Building</Button>
          <Button size="lg" variant="outline">Browse Cards</Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
      <footer className="container mx-auto px-4 py-8 mt-12 border-t border-gray-700 text-center text-gray-400">
        <p>Powered by Scryfall API | Built with React, TypeScript & Tailwind</p>
        <p className="mt-2">Based on <a href="https://github.com/Koakovski/Scryfall_Personal/" className="underline">Koakovski's Scryfall Personal</a></p>
      </footer>
    </div>
  )
}

function FeatureCard({ title, description, icon }: { title: string, description: string, icon: string }) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-gray-500 transition">
      <div className="text-4xl mb-4">{icon}</div>
      <h4 className="text-xl font-bold mb-2">{title}</h4>
      <p className="text-gray-300">{description}</p>
    </div>
  )
}
  