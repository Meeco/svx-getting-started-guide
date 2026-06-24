import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"

/** Simple Meeco SVX wordmark with a brand-coloured dot. */
export function Brand({ className }: { className?: string }) {
  const { t } = useTranslation()
  return (
    <span className={cn("flex items-center gap-2 font-semibold tracking-tight", className)}>
      <span className="inline-block size-2.5 rounded-full bg-primary" aria-hidden />
      <span className="text-foreground">{t("app.title")}</span>
    </span>
  )
}
