import { Outlet } from "react-router-dom"
import { Layout, Home } from "@/designs/guided-journey"

/** Root layout: wraps the routed page in the app chrome. */
export function RootLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

/** Index route: renders the bespoke landing experience. */
export function DesignHome() {
  return <Home />
}
