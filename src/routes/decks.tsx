import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/decks')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">My Decks</h1>
      <p className="text-muted-foreground">
        This page has not been implemented yet. It will allow you to create, edit and delete decks.
      </p>
    </div>
  )
}
