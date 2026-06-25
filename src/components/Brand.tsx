import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"

/** Meeco SVX wordmark fronted by the favicon network mark. */
export function Brand({ className }: { className?: string }) {
  const { t } = useTranslation()
  return (
    <span className={cn("flex items-center gap-2 font-semibold tracking-tight", className)}>
      <img
        src={`${import.meta.env.BASE_URL}favicon.svg`}
        alt=""
        aria-hidden
        className="size-6 shrink-0"
      />
      <span className="text-foreground">{t("app.title")}</span>
    </span>
  )
}
