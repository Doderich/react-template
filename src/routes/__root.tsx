import { ThemeProvider } from '@/components/provider/theme-provider'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
    <ThemeProvider>
      <Outlet />
      <TanStackRouterDevtools />
    </ThemeProvider>
    </>
  ),
})