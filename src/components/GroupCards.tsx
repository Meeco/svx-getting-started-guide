import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { ArrowRight } from "lucide-react"
import { GROUPS, stepsInGroup } from "@/content/steps"
import { useProgress } from "@/lib/progress"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

/** Grid of the 5 getting-started groups; each links to its first step. */
export function GroupCards({ className }: { className?: string }) {
  const { t } = useTranslation()
  const { isComplete } = useProgress()

  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {GROUPS.map((group, idx) => {
        const GroupIcon = group.icon
        const steps = stepsInGroup(group.id)
        const done = steps.filter((s) => isComplete(s.id)).length
        return (
          <Link key={group.id} to={steps[0].route}>
            <Card className="group h-full p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
              <div className="flex items-center justify-between">
                <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <GroupIcon className="size-5" />
                </span>
                <span className="text-xs font-medium text-muted-foreground">
                  {idx + 1}/{GROUPS.length}
                </span>
              </div>
              <h3 className="mt-4 flex items-center gap-1.5 font-semibold text-foreground">
                {t(`groups.${group.id}.title`)}
                <ArrowRight className="size-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{t(`groups.${group.id}.blurb`)}</p>
              <p className="mt-3 text-xs text-muted-foreground">
                {done}/{steps.length} {t("ui.complete")}
              </p>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
