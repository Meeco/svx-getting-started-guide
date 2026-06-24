import { useTranslation } from "react-i18next"

/** Ordered list of sub-steps for a lesson (the "how to do it" checklist). */
export function Stepper({ stepKeys }: { stepKeys: string[] }) {
  const { t } = useTranslation()
  return (
    <ol className="space-y-3">
      {stepKeys.map((label, i) => (
        <li key={i} className="flex items-start gap-3">
          <span
            className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary"
            aria-hidden
          >
            {i + 1}
          </span>
          <span className="text-sm leading-relaxed text-foreground">{label}</span>
        </li>
      ))}
      <span className="sr-only">{t("ui.stepsHeading")}</span>
    </ol>
  )
}
