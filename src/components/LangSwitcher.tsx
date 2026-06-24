import { useTranslation } from "react-i18next"
import { Languages, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SUPPORTED_LANGUAGES } from "@/i18n"

export function LangSwitcher() {
  const { i18n, t } = useTranslation()
  const current = i18n.resolvedLanguage ?? i18n.language

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2" aria-label={t("ui.language")}>
          <Languages className="size-4" />
          <span className="hidden sm:inline">
            {SUPPORTED_LANGUAGES.find((l) => l.code === current)?.label ?? current}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{t("ui.language")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {SUPPORTED_LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => i18n.changeLanguage(lang.code)}
            className="justify-between gap-6"
          >
            {lang.label}
            {current === lang.code && <Check className="size-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
