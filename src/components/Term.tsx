import { useTranslation } from "react-i18next"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import type { TermId } from "@/content/glossary"
import { cn } from "@/lib/utils"

interface TermProps {
  term: TermId
  children?: React.ReactNode
  className?: string
}

/**
 * Inline, ELI5 term definition. Wraps a word in a dotted underline; hovering
 * (or focusing) reveals its plain-language meaning in the active language.
 */
export function Term({ term, children, className }: TermProps) {
  const { t } = useTranslation()
  const label = t(`terms.${term}.label`)
  const def = t(`terms.${term}.def`)

  return (
    <HoverCard openDelay={120} closeDelay={80}>
      <HoverCardTrigger asChild>
        <button
          type="button"
          className={cn(
            "cursor-help font-medium text-foreground underline decoration-primary/50 decoration-dotted underline-offset-4 transition-colors hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm",
            className,
          )}
        >
          {children ?? label}
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-72 text-left">
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <p className="mt-1 text-sm text-muted-foreground">{def}</p>
      </HoverCardContent>
    </HoverCard>
  )
}
