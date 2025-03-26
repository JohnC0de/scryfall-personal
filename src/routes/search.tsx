import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/search')({
  component: SearchComponent,
})

function SearchComponent() {
  return <div>Search</div>
}
