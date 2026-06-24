import { useTranslation } from "react-i18next"
import { BookOpen } from "lucide-react"
import { TERM_IDS } from "@/content/glossary"
import { Card, CardContent } from "@/components/ui/card"

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

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {terms.map((id) => (
          <Card key={id} id={id} className="scroll-mt-24">
            <CardContent className="p-4">
              <p className="font-semibold text-foreground">{t(`terms.${id}.label`)}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t(`terms.${id}.def`)}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
