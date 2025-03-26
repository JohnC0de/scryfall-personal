import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ScryfallService } from '@/lib/scryfall'
import { QueryClient } from '@tanstack/react-query'
import { Link, Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { BookOpenIcon, HomeIcon, MenuIcon, SearchIcon } from 'lucide-react'

interface RootContext {
  queryClient: QueryClient
  scryfallService: ScryfallService
}

export const Route = createRootRouteWithContext<RootContext>()({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <Layout />
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}

export function Layout() {
  return (
    <header className="flex items-center justify-between p-2">
      <Button variant="ghost" className="gap-2">
        Scryfall Personal
      </Button>
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <MenuIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-fit">
            <DropdownMenuItem>
              <HomeIcon />
              <Link to="/">Home Page</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SearchIcon />
              <Link to="/search">Search</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <BookOpenIcon />
              <Link to="/decks">My Decks</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
