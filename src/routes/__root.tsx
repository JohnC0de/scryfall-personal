import { Button } from '@/components/ui/button'
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
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
    <div className="p-2 flex gap-2 text-lg">
      <NavLinkButton to="/">Home</NavLinkButton>
      <NavLinkButton to="/about">About</NavLinkButton>
    </div>
  )
}

function NavLinkButton({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to} activeProps={{ className: 'font-bold' }}>
      <Button variant="outline">{children}</Button>
    </Link>
  )
}
