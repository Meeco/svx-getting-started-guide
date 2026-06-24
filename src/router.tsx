import { createBrowserRouter, Navigate } from "react-router-dom"
import { RootLayout, DesignHome } from "@/design/DesignChrome"
import { StepPage } from "@/components/StepPage"
import { GlossaryPage } from "@/pages/GlossaryPage"
import { STEPS } from "@/content/steps"

// Vite sets BASE_URL to "/" in dev and "/svx-getting-started-guide/" in build.
const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/"

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <DesignHome /> },
        ...STEPS.map((step) => ({ path: step.route.slice(1), element: <StepPage /> })),
        { path: "glossary", element: <GlossaryPage /> },
        { path: "*", element: <Navigate to="/" replace /> },
      ],
    },
  ],
  { basename },
)
