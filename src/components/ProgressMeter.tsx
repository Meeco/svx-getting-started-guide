import { useTranslation } from "react-i18next"
import { Progress } from "@/components/ui/progress"
import { useProgress } from "@/lib/progress"
import { cn } from "@/lib/utils"

/** Compact overall-progress meter shown in design chrome. */
export function ProgressMeter({ className }: { className?: string }) {
  const { t } = useTranslation()
  const { count, total } = useProgress()
  const pct = Math.round((count / total) * 100)

  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{t("ui.progress")}</span>
        <span>
          {count}/{total}
        </span>
      </div>
      <Progress value={pct} className="h-1.5" />
    </div>
  )
}
