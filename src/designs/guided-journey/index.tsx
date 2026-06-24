import type { ReactNode } from "react"
import { Link, NavLink } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { ArrowRight, BookOpen, Sparkles } from "lucide-react"
import { STEPS } from "@/content/steps"
import { Brand } from "@/components/Brand"
import { HeaderControls } from "@/components/HeaderControls"
import { MobileNav } from "@/components/MobileNav"
import { CommandSearch } from "@/components/CommandSearch"
import { StepNav } from "@/components/StepNav"
import { ProgressMeter } from "@/components/ProgressMeter"
import { GroupCards } from "@/components/GroupCards"
import { Button } from "@/components/ui/button"

export function Layout({ children }: { children: ReactNode }) {
  const { t } = useTranslation()
  return (
    <div className="min-h-svh bg-background">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b bg-background/80 px-4 backdrop-blur">
        <MobileNav />
        <Link to="/" className="mr-auto">
          <Brand />
        </Link>
        <CommandSearch />
        <HeaderControls />
      </header>

      <div className="mx-auto flex max-w-6xl gap-8 px-4 py-8">
        <aside className="sticky top-20 hidden h-[calc(100svh-7rem)] w-64 shrink-0 overflow-y-auto lg:block">
          <ProgressMeter className="mb-6" />
          <StepNav />
          <NavLink
            to="/glossary"
            className={({ isActive }) =>
              `mt-6 flex items-center gap-2.5 rounded-md border-t px-2 pt-4 text-sm transition-colors ${
                isActive ? "font-medium text-primary" : "text-foreground/80 hover:text-foreground"
              }`
            }
          >
            <BookOpen className="size-4" />
            {t("ui.glossary")}
          </NavLink>
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  )
}

export function Home() {
  const { t } = useTranslation()
  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-2xl border bg-gradient-to-br from-primary/10 via-background to-background p-8 sm:p-12">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          <Sparkles className="size-3.5" />
          {t("ui.gettingStarted")}
        </span>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground">{t("app.tagline")}</h1>
        <p className="mt-4 max-w-prose text-lg text-muted-foreground">{t("app.intro")}</p>
        <Button asChild size="lg" className="mt-6 gap-2">
          <Link to={STEPS[0].route}>
            {t("ui.start")}
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
      <GroupCards className="mt-8" />
    </div>
  )
}
