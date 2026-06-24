import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Check, CircleDashed, Info } from "lucide-react"
import { useCurrentStep } from "@/hooks/useCurrentStep"
import { GROUPS } from "@/content/steps"
import { useProgress } from "@/lib/progress"
import { Term } from "@/components/Term"
import { Stepper } from "@/components/Stepper"
import { PrevNext } from "@/components/PrevNext"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import type { TermId } from "@/content/glossary"
import { cn } from "@/lib/utils"

/**
 * Design-agnostic lesson renderer used by every design for the 12 step routes.
 * Designs supply the surrounding chrome; this is the content itself.
 */
export function StepPage() {
  const step = useCurrentStep()
  const { t } = useTranslation()
  const { isComplete, toggle, count, total } = useProgress()

  // Scroll to top when navigating between lessons.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [step?.id])

  if (!step) return null

  const group = GROUPS.find((g) => g.id === step.group)!
  const GroupIcon = group.icon
  const StepIcon = step.icon
  const done = isComplete(step.id)
  const subSteps = t(`steps.${step.id}.steps`, { returnObjects: true }) as string[]

  return (
    <article className="mx-auto w-full max-w-2xl animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <GroupIcon className="size-4 text-primary" />
        <span>{t(`groups.${group.id}.title`)}</span>
        <span aria-hidden>·</span>
        <span>{t("ui.stepN", { n: step.order, total })}</span>
      </div>

      <h1 className="mt-3 flex items-center gap-3 text-3xl font-bold tracking-tight text-foreground">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <StepIcon className="size-6" />
        </span>
        {t(`steps.${step.id}.title`)}
      </h1>

      <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
        {t(`steps.${step.id}.body`)}
      </p>

      <p className="mt-4 flex items-center gap-2 rounded-md border border-dashed bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
        <Info className="size-3.5 shrink-0" />
        {t("ui.draftNotice")}
      </p>

      <section className="mt-8">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {t("ui.stepsHeading")}
        </h2>
        <Stepper stepKeys={subSteps} />
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {t("ui.keyTerms")}
        </h2>
        <div className="flex flex-wrap gap-2">
          {step.terms.map((term) => (
            <Badge key={term} variant="secondary" className="font-normal">
              <Term term={term as TermId} />
            </Badge>
          ))}
        </div>
      </section>

      <Separator className="my-8" />

      <Button
        onClick={() => toggle(step.id)}
        variant={done ? "secondary" : "default"}
        className={cn("gap-2 transition-all", done && "text-primary")}
      >
        {done ? <Check className="size-4" /> : <CircleDashed className="size-4" />}
        {done ? t("ui.markedComplete") : t("ui.markComplete")}
      </Button>
      <span className="ml-3 text-sm text-muted-foreground">
        {t("ui.lessonsComplete", { done: count, total })}
      </span>

      <PrevNext step={step} />
    </article>
  )
}
