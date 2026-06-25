import { useState } from "react"
import { NavLink } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { BookOpen, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { StepNav } from "@/components/StepNav"
import { ProgressMeter } from "@/components/ProgressMeter"

/** Hamburger → slide-out step navigation, for narrow screens. */
export function MobileNav() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label={t("ui.menu")}>
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle>{t("ui.gettingStarted")}</SheetTitle>
        </SheetHeader>
        <div className="space-y-6 overflow-y-auto px-4 pb-6">
          <ProgressMeter />
          <StepNav onNavigate={() => setOpen(false)} />
          <NavLink
            to="/glossary"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2.5 rounded-md border-t px-2 pt-4 text-sm transition-colors ${
                isActive ? "font-medium text-brand" : "text-foreground/80 hover:text-foreground"
              }`
            }
          >
            <BookOpen className="size-4" />
            {t("ui.glossary")}
          </NavLink>
        </div>
      </SheetContent>
    </Sheet>
  )
}
