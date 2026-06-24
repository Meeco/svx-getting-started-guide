/**
 * Reusable blocks that make up a lesson's "Steps to follow" list. A step's
 * `steps` array (under `steps.<id>.steps` in the locale files) may mix plain
 * strings (shorthand for a numbered step) with these blocks, so links, figures
 * and notes can be interlaced as part of the steps. Each block mixes structure
 * (`type`, `url`, `src`) with translatable copy (`text`, `label`, `alt`,
 * `caption`), so the whole array lives in i18n and translates per locale.
 */
export type StepBlock =
  /** A numbered checklist item. A bare string in the array means the same. */
  | { type: "step"; text: string }
  /** An explanatory paragraph aligned under the steps. */
  | { type: "p"; text: string }
  /** A call-to-action link button. */
  | { type: "link"; url: string; label: string }
  /** A captioned figure; `src` null/absent renders a placeholder box. */
  | { type: "figure"; src?: string | null; alt: string; caption: string }
  /** A dashed callout, e.g. a wait-time tip. */
  | { type: "note"; text: string }

/** An item in a `steps` array: a bare string is shorthand for a numbered step. */
export type StepItem = string | StepBlock
