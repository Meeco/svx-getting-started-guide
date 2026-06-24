import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { STEP_ORDER, TOTAL_STEPS } from "@/content/steps"

const STORAGE_KEY = "svx-progress"

interface ProgressValue {
  completed: Set<string>
  isComplete: (id: string) => boolean
  toggle: (id: string) => void
  markComplete: (id: string) => void
  reset: () => void
  count: number
  total: number
  /** id of the first not-yet-complete step in path order, or undefined when all done */
  recommendedNextId: string | undefined
}

const ProgressContext = createContext<ProgressValue | null>(null)

function load(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return new Set()
    const ids = JSON.parse(raw) as string[]
    return new Set(ids.filter((id) => STEP_ORDER.includes(id)))
  } catch {
    return new Set()
  }
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [completed, setCompleted] = useState<Set<string>>(load)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]))
    } catch {
      // ignore storage failures (private mode, etc.)
    }
  }, [completed])

  const toggle = useCallback((id: string) => {
    setCompleted((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const markComplete = useCallback((id: string) => {
    setCompleted((prev) => {
      if (prev.has(id)) return prev
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }, [])

  const reset = useCallback(() => setCompleted(new Set()), [])

  const value = useMemo<ProgressValue>(() => {
    const recommendedNextId = STEP_ORDER.find((id) => !completed.has(id))
    return {
      completed,
      isComplete: (id: string) => completed.has(id),
      toggle,
      markComplete,
      reset,
      count: completed.size,
      total: TOTAL_STEPS,
      recommendedNextId,
    }
  }, [completed, toggle, markComplete, reset])

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress(): ProgressValue {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error("useProgress must be used within a ProgressProvider")
  return ctx
}
