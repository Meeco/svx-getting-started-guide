# Meeco SVX — Getting Started Guide

A friendly, ELI5, step-by-step guide to **Meeco Verifiable Credentials**, the **Portal**, the
**SVX Wallet** and **SVX Verify**. Built as a freely-navigable SPA that doubles as a sequential
getting-started path.

## Stack

- **Bun** (package manager + runner) · **Vite** · **React 19** · **TypeScript**
- **react-router-dom** (SPA routing)
- **Tailwind CSS v4** + **tw-animate-css** · **shadcn/ui** (new-york) · **lucide-react**
- **i18next** (English default + Japanese, browser auto-detect, `?lng=` / switcher)

## Develop

```bash
bun install
bun run dev      # http://localhost:5173
bun run build    # type-check + production build to dist/
bun run preview  # preview the production build
```

## How it's organised

```
src/
  content/steps.ts      # the 12-step getting-started backbone (order, routes, icons, terms)
  content/glossary.ts   # glossary term ids
  locales/{en,ja}/      # ALL copy lives here (titles, ELI5 body, sub-steps, term defs)
  designs/guided-journey/ # the layout + landing experience (exports { Layout, Home })
  design/               # DesignChrome: wires the design into the router (RootLayout, DesignHome)
  components/           # shared building blocks (StepPage, StepNav, Term, PrevNext, …)
  lib/                  # progress (localStorage) + theme providers
  router.tsx            # routes, derived from content/steps.ts
```

### Editing content

All user-facing text is in `src/locales/en/translation.json` and `…/ja/translation.json`,
keyed by step/term id. Lesson bodies currently contain **draft placeholder copy** (flagged with a
"Draft content" banner) — replace the strings in those two files with the final copy. No component
changes are needed.

### The getting-started order

`Portal (Tenant → Organisation → Applications) → Wallet setup (API Keys → Admin Accounts →
Settings) → Issue (Schemas → Credential Templates → Issued) → Verify (Verification Templates →
Submissions) → SVX Verify`. This single order drives the sidebar, Prev/Next, progress, and the map.

## Deploy (GitHub Pages)

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds with Bun and publishes to
Pages. Enable **Settings → Pages → Source: GitHub Actions** once. The Vite `base` is set to
`/svx-getting-started-guide/`; `public/404.html` provides SPA deep-link fallback.
