import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import "./i18n"
import "./index.css"
import { router } from "@/router"
import { ThemeProvider } from "@/lib/theme"
import { ProgressProvider } from "@/lib/progress"
import { TooltipProvider } from "@/components/ui/tooltip"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <ProgressProvider>
        <TooltipProvider delayDuration={150}>
          <RouterProvider router={router} />
        </TooltipProvider>
      </ProgressProvider>
    </ThemeProvider>
  </StrictMode>,
)
