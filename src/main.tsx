import { ThemeProvider } from '@/components/theme/provider'
import { scryfallService } from '@/lib/scryfall'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'sonner'
import './index.css'
import { routeTree } from './routeTree.gen'

const queryClient = new QueryClient()

const router = createRouter({
  routeTree,
  context: {
    queryClient,
    scryfallService,
  },
})

const rootElement = document.getElementById('root')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>,
  )
}

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
