import { NavLink } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Check } from "lucide-react"
import { GROUPS, stepsInGroup } from "@/content/steps"
import { useProgress } from "@/lib/progress"
import { cn } from "@/lib/utils"

interface StepNavProps {
  /** called after a link is clicked (e.g. to close a mobile drawer) */
  onNavigate?: () => void
  className?: string
}

/** Grouped navigation over the 12 steps with completion ticks + next cue. */
export function StepNav({ onNavigate, className }: StepNavProps) {
  const { t } = useTranslation()
  const { isComplete, recommendedNextId } = useProgress()

  return (
    <nav className={cn("space-y-6", className)}>
      {GROUPS.map((group) => {
        const GroupIcon = group.icon
        return (
          <div key={group.id}>
            <p className="mb-2 flex items-center gap-2 px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <GroupIcon className="size-3.5" />
              {t(`groups.${group.id}.title`)}
            </p>
            <ul className="space-y-0.5">
              {stepsInGroup(group.id).map((step) => {
                const done = isComplete(step.id)
                const isNext = recommendedNextId === step.id
                return (
                  <li key={step.id}>
                    <NavLink
                      to={step.route}
                      onClick={onNavigate}
                      className={({ isActive }) =>
                        cn(
                          "group flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm transition-colors",
                          isActive
                            ? "bg-brand/10 font-medium text-brand"
                            : "text-foreground/80 hover:bg-accent hover:text-foreground",
                        )
                      }
                    >
                      <span
                        className={cn(
                          "flex size-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-semibold transition-colors",
                          done
                            ? "border-brand bg-brand text-brand-foreground"
                            : isNext
                              ? "border-brand text-brand"
                              : "border-border text-muted-foreground",
                        )}
                      >
                        {done ? <Check className="size-3" /> : step.order}
                      </span>
                      <span className="truncate">{t(`steps.${step.id}.title`)}</span>
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </nav>
  )
}
