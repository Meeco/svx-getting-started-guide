import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"

type Theme = "light" | "dark"
const STORAGE_KEY = "svx-theme"

interface ThemeValue {
  theme: Theme
  toggle: () => void
}

const ThemeContext = createContext<ThemeValue | null>(null)

function initial(): Theme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null
    if (saved === "light" || saved === "dark") return saved
  } catch {
    // ignore
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(initial)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // ignore
    }
  }, [theme])

  const value = useMemo<ThemeValue>(
    () => ({ theme, toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")) }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider")
  return ctx
}
