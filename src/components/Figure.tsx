import { useState } from "react"
import { useTranslation } from "react-i18next"
import { ImageIcon, Expand } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface FigureProps {
  /** Path relative to the app base; when absent a placeholder box is shown. */
  src?: string | null
  /** Always provided for accessibility, even while the image is a placeholder. */
  alt: string
  /** Figure title shown in the caption. */
  caption: string
  /** 1-based position on the page, used to label the figure ("Figure 1 — …"). */
  index: number
}

/**
 * A semantic <figure> with a captioned title. Until a real screenshot exists
 * (`src` is null/absent), it renders a dashed placeholder box; the `alt` text is
 * authored up front so swapping in a real `src` later needs no other change.
 * Full-page screenshots are small inline, so the image is click-to-enlarge.
 */
export function Figure({ src, alt, caption, index }: FigureProps) {
  const { t } = useTranslation()
  // Fall back to the placeholder box if the image hasn't been added yet.
  const [failed, setFailed] = useState(false)
  const resolved = src ? import.meta.env.BASE_URL + src : null

  return (
    <figure>
      {resolved && !failed ? (
        <Dialog>
          <DialogTrigger asChild>
            <button
              type="button"
              className="group relative block w-full cursor-zoom-in overflow-hidden rounded-lg border bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={t("ui.enlargeImage", { caption })}
            >
              <img src={resolved} alt={alt} onError={() => setFailed(true)} className="w-full" />
              <span className="pointer-events-none absolute right-2 top-2 flex items-center gap-1 rounded-md bg-background/85 px-2 py-1 text-xs text-foreground opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
                <Expand className="size-3.5" aria-hidden />
                {t("ui.enlarge")}
              </span>
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-[min(96vw,1400px)] gap-3 p-4 sm:max-w-[min(96vw,1400px)]">
            <DialogTitle className="pr-8 text-sm font-medium">
              <span className="text-foreground">
                {t("ui.figureLabel")} {index}
              </span>{" "}
              <span className="font-normal text-muted-foreground">— {caption}</span>
            </DialogTitle>
            <DialogDescription className="sr-only">{alt}</DialogDescription>
            <img
              src={resolved}
              alt={alt}
              className="h-auto max-h-[80vh] w-full rounded border object-contain"
            />
          </DialogContent>
        </Dialog>
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed bg-muted/40 text-muted-foreground"
        >
          <ImageIcon className="size-7" aria-hidden />
          <span className="text-xs">{t("ui.imagePlaceholder")}</span>
        </div>
      )}
      <figcaption className="mt-2 text-sm text-muted-foreground">
        <span className="font-medium text-foreground">
          {t("ui.figureLabel")} {index}
        </span>{" "}
        — {caption}
      </figcaption>
    </figure>
  )
}
