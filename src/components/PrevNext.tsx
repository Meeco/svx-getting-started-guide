import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { prevStep, nextStep, type Step } from "@/content/steps"
import { cn } from "@/lib/utils"

/** Prev/Next pager that walks the 12-step getting-started order. */
export function PrevNext({ step }: { step: Step }) {
  const { t } = useTranslation()
  const prev = prevStep(step.id)
  const next = nextStep(step.id)

  return (
    <nav className="mt-10 grid gap-3 sm:grid-cols-2">
      <PagerLink step={prev} direction="prev" label={t("ui.previous")} />
      <PagerLink step={next} direction="next" label={t("ui.next")} />
    </nav>
  )
}

function PagerLink({
  step,
  direction,
  label,
}: {
  step: Step | undefined
  direction: "prev" | "next"
  label: string
}) {
  const { t } = useTranslation()
  if (!step) return <span className="hidden sm:block" />

  return (
    <Link
      to={step.route}
      className={cn(
        "group flex flex-col gap-1 rounded-lg border p-4 transition-all hover:border-brand/50 hover:bg-accent",
        direction === "next" && "sm:text-right sm:items-end",
      )}
    >
      <span
        className={cn(
          "flex items-center gap-1.5 text-xs font-medium text-muted-foreground",
          direction === "next" && "sm:flex-row-reverse",
        )}
      >
        {direction === "prev" ? (
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
        ) : (
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        )}
        {label}
      </span>
      <span className="text-sm font-semibold text-foreground">{t(`steps.${step.id}.title`)}</span>
    </Link>
  )
}
