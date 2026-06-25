import { useTranslation } from "react-i18next"
import { ExternalLink, Info } from "lucide-react"
import type { StepBlock, StepItem } from "@/content/blocks"
import { Figure } from "@/components/Figure"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/**
 * Ordered list of sub-steps for a lesson (the "how to do it" checklist).
 * Steps are numbered; links, figures and notes can be interlaced between them
 * and align under the step text. Plain strings are shorthand for a step.
 */
export function Stepper({ stepKeys }: { stepKeys: StepItem[] }) {
  const { t } = useTranslation()
  let stepNumber = 0
  let figureIndex = 0

  return (
    <div>
      {stepKeys.map((raw, i) => {
        const block: StepBlock = typeof raw === "string" ? { type: "step", text: raw } : raw
        // A new step opens a group with a generous gap above it; the blocks that
        // belong to a step (link, figure, note, paragraph) hug it with a tighter gap.
        const gap = i === 0 ? "" : block.type === "step" ? "mt-7" : "mt-3"
        switch (block.type) {
          case "step":
            stepNumber += 1
            return (
              <div key={i} className={cn("flex items-start gap-3", gap)}>
                <span
                  className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand/10 text-xs font-semibold text-brand"
                  aria-hidden
                >
                  {stepNumber}
                </span>
                <span className="text-sm leading-relaxed text-foreground">{block.text}</span>
              </div>
            )
          case "p":
            return (
              <p key={i} className={cn("pl-9 text-sm leading-relaxed text-muted-foreground", gap)}>
                {block.text}
              </p>
            )
          case "link":
            return (
              <div key={i} className={cn("pl-9", gap)}>
                <Button asChild variant="outline" size="sm" className="gap-2">
                  <a href={block.url} target="_blank" rel="noreferrer">
                    {block.label}
                    <ExternalLink className="size-4" aria-hidden />
                  </a>
                </Button>
              </div>
            )
          case "note":
            return (
              <div
                key={i}
                className={cn(
                  "flex w-full items-start gap-2.5 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-200",
                  gap,
                )}
              >
                <Info
                  className="mt-0.5 size-4 shrink-0 text-blue-500 dark:text-blue-400"
                  aria-hidden
                />
                <span className="leading-relaxed">{block.text}</span>
              </div>
            )
          case "figure":
            figureIndex += 1
            return (
              // Figures use the full content width (no step indent) so the
              // screenshot is as readable as possible; click to enlarge further.
              <div key={i} className={gap}>
                <Figure
                  src={block.src}
                  alt={block.alt}
                  caption={block.caption}
                  index={figureIndex}
                />
              </div>
            )
        }
      })}
      <span className="sr-only">{t("ui.stepsHeading")}</span>
    </div>
  )
}
