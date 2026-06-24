# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A friendly, ELI5 getting-started guide to Meeco Verifiable Credentials (Portal, SVX Wallet, SVX
Verify), built as a freely-navigable React SPA that also reads as a sequential 12-step path.
Deployed to GitHub Pages.

## Commands

Bun is the package manager and runner.

```bash
bun install
bun run dev      # vite dev server at http://localhost:5173 (base "/")
bun run build    # tsc -b (type-check) then vite build → dist/
bun run preview  # serve the production build
bun run lint     # oxlint (not eslint)
```

There is no test suite. Linting is via **oxlint** (`.oxlintrc.json`); the only enforced custom
rules are `react/rules-of-hooks` (error) and `react/only-export-components` (warn).

## Architecture

The whole app is **driven by one ordered list of steps**. Understand `src/content/steps.ts`
first — almost everything else is derived from it.

- **`src/content/steps.ts`** — the 12-step backbone (`STEPS`): id, route, group, 1-based order,
  lucide icon, and referenced glossary term ids. Also exports the 5 `GROUPS` and helpers
  (`stepById`, `stepByRoute`, `prevStep`, `nextStep`, `stepsInGroup`, `STEP_ORDER`, `TOTAL_STEPS`).
  Changing the path means editing this file: `router.tsx` maps over `STEPS` to create routes, and
  the sidebar, Prev/Next, progress meter, and map all read from it. The canonical order is
  Portal → Wallet setup → Issue → Verify → SVX Verify.
- **`src/content/glossary.ts`** — `TERM_IDS` (the `TermId` union). Both the `<Term>` hovercard and
  `/glossary` read from this list.
- **No copy lives in components.** All user-facing text is in `src/locales/{en,ja}/translation.json`,
  keyed by step/term/group id (`steps.<id>.{title,body,steps}`, `terms.<id>.{label,def}`,
  `groups.<id>.title`, `ui.*`). To change wording, edit those two JSON files only — no component
  changes. Lesson bodies are currently **draft placeholders** (shown with a "Draft content" banner
  via `ui.draftNotice`); replacing them is the main content task.
- **`src/components/StepPage.tsx`** — the design-agnostic lesson renderer used for all 12 step
  routes. It reads the current step (`useCurrentStep`), pulls all text from i18n, renders the
  sub-steps, key-term badges, and a mark-complete toggle.
- **i18n** (`src/i18n.ts`) — i18next with browser language detection. English is default and the
  fallback. Detection order: `?lng=` query → `localStorage` (`svx-lang`) → browser. `<html lang>`
  is kept in sync. Adding a language means adding a `locales/<code>/translation.json` and wiring it
  in `i18n.ts` + `SUPPORTED_LANGUAGES`.
- **Progress** (`src/lib/progress.tsx`) — `ProgressProvider` tracks completed step ids in
  `localStorage` (`svx-progress`), filtered against `STEP_ORDER` on load. Exposes
  `recommendedNextId` (first incomplete step in path order). Access via `useProgress()`.
- **Theme** (`src/lib/theme.tsx`) — light/dark provider.
- **Providers** are composed in `src/main.tsx`: `ThemeProvider` → `ProgressProvider` →
  `TooltipProvider` → `RouterProvider`.

### Routing & deployment base path

`vite.config.ts` sets `base` to `/` in dev but `/svx-getting-started-guide/` in build (GitHub Pages
project site). `router.tsx` derives `basename` from `import.meta.env.BASE_URL`, so **never hardcode
the base prefix** — use router `<Link>`/`to` and `import.meta.env.BASE_URL` for assets.
`public/404.html` provides the SPA deep-link fallback on Pages. Pushing to `main` triggers
`.github/workflows/deploy.yml`.

### The "design" layer

The app ships a single design, `src/designs/guided-journey/`, which exports `{ Layout, Home }`.
`src/design/DesignChrome.tsx` imports it and exposes `RootLayout` (chrome + `<Outlet/>`) and
`DesignHome` (index route), which `router.tsx` mounts. There is no design switcher or provider.

### UI conventions

- shadcn/ui, **new-york** style, in `src/components/ui/` (configured in `components.json`). Base
  color neutral, CSS variables. Add components with the shadcn CLI; do not hand-author primitives.
- Tailwind CSS v4 via `@tailwindcss/vite` (config lives in `src/index.css`, not a JS config file).
- Icons: `lucide-react`. Class merging: `cn()` from `@/lib/utils`.
- Path alias `@/` → `src/` (set in both `vite.config.ts` and `tsconfig`).
- React 19 + react-router-dom v7.
