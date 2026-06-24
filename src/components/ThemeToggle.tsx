import { useTranslation } from "react-i18next"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/lib/theme"

export function ThemeToggle() {
  const { toggle } = useTheme()
  const { t } = useTranslation()
  return (
    <Button variant="ghost" size="icon" onClick={toggle} aria-label={t("ui.toggleTheme")}>
      <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  )
}
