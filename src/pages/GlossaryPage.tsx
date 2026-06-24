import { useTranslation } from "react-i18next"
import { BookOpen } from "lucide-react"
import { TERM_IDS } from "@/content/glossary"

export function GlossaryPage() {
  const { t } = useTranslation()
  const terms = [...TERM_IDS].sort((a, b) =>
    t(`terms.${a}.label`).localeCompare(t(`terms.${b}.label`)),
  )

  return (
    <div className="mx-auto w-full max-w-3xl animate-in fade-in duration-300">
      <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight text-foreground">
        <BookOpen className="size-7 text-primary" />
        {t("ui.glossary")}
      </h1>
      <p className="mt-3 max-w-prose text-muted-foreground">{t("ui.glossaryIntro")}</p>

      <dl className="mt-8 divide-y divide-border border-y border-border">
        {terms.map((id) => (
          <div
            key={id}
            id={id}
            className="grid scroll-mt-24 gap-2 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6"
          >
            <dt>
              <span className="inline-block rounded bg-primary/10 px-2 py-0.5 font-medium text-primary">
                {t(`terms.${id}.label`)}
              </span>
            </dt>
            <dd className="text-sm leading-relaxed text-muted-foreground sm:border-l sm:border-border sm:pl-6">
              {t(`terms.${id}.def`)}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
