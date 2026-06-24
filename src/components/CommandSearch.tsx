import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Search } from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { STEPS } from "@/content/steps"
import { TERM_IDS } from "@/content/glossary"

/** ⌘K / Ctrl-K command palette to jump to any step or term. */
export function CommandSearch() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  const go = (to: string) => {
    setOpen(false)
    navigate(to)
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="gap-2 text-muted-foreground"
        onClick={() => setOpen(true)}
      >
        <Search className="size-4" />
        <span className="hidden md:inline">{t("ui.search")}</span>
        <kbd className="ml-2 hidden rounded border bg-muted px-1.5 text-[10px] md:inline">⌘K</kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder={t("ui.searchPlaceholder")} />
        <CommandList>
          <CommandEmpty>—</CommandEmpty>
          <CommandGroup heading={t("ui.gettingStarted")}>
            {STEPS.map((step) => (
              <CommandItem
                key={step.id}
                value={`${step.order} ${t(`steps.${step.id}.title`)}`}
                onSelect={() => go(step.route)}
              >
                <step.icon className="size-4" />
                <span>{t(`steps.${step.id}.title`)}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading={t("ui.glossary")}>
            {TERM_IDS.map((id) => (
              <CommandItem
                key={id}
                value={t(`terms.${id}.label`)}
                onSelect={() => go(`/glossary#${id}`)}
              >
                <span>{t(`terms.${id}.label`)}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
