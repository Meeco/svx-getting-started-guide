import { useLocation } from "react-router-dom"
import { stepByRoute, type Step } from "@/content/steps"

/** Resolves the Step for the current route (paths are app-relative under basename). */
export function useCurrentStep(): Step | undefined {
  const { pathname } = useLocation()
  return stepByRoute(pathname)
}
