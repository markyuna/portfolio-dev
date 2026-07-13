# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project overview

Personal portfolio site for Marcos Suarez (web developer, Paris), built with Next.js App Router, Tailwind CSS v4, and Framer Motion. Deployed on Vercel. See `README.md` for the marketing-facing description of the project and its featured case studies.

**Important:** `package.json` pins `next@16.2.4` and `react@19.2.4` — versions newer than this model's training data, per `AGENTS.md`. Check `node_modules/next/dist/docs/` for current App Router APIs (routing, caching, `next.config.ts` options, etc.) before assuming behavior from familiar older Next.js versions.

## Commands

```bash
npm run dev      # start dev server (Next.js, Turbopack)
npm run build    # production build
npm run start    # run production build
npm run lint     # eslint (flat config, eslint-config-next core-web-vitals + typescript)
```

There is no test setup (no test runner in `package.json`, no test files in the repo). Type-checking is done implicitly via `next build`/editor tooling — there is no standalone `tsc` script.

## Architecture

### Routing

App Router under `src/app`, with a route group `(site)` holding all public marketing pages:

- `src/app/layout.tsx` — root layout; only sets `<html>`/`<body>` and global metadata. No shared chrome (nav/footer) here.
- `src/app/(site)/layout.tsx` — wraps every page in the group with `<Navbar />`.
- `src/app/(site)/page.tsx`, `about/page.tsx`, `projects/page.tsx`, `contact/page.tsx` — the actual pages.
- `src/app/api/contact/route.ts` — `POST /api/contact`. Validates `name`/`email`/`message`, returns 400 with an `error` field on invalid input, otherwise logs the submission server-side (`console.info`) and returns `{ ok: true }`. No email/CRM provider is wired up — if you need real delivery, add one here.

`<Navbar />` is rendered once, by `src/app/(site)/layout.tsx`. Individual pages in the group should not render it themselves.

### Components

- `src/components/layout/` — `Navbar` (client component; scroll-aware hide/show, mobile menu, active-link pill via Framer Motion `layoutId`) is the only layout component.
- `src/components/sections/` — page-sized sections; currently only `HeroSection` and `ProjectsSection` exist. The About and Contact pages compose their content directly in `src/app/(site)/about/page.tsx` and `contact/page.tsx` rather than delegating to a `sections/` component — check which pattern a given page uses before editing.
- `src/components/forms/ContactForm.tsx` — client component owning the contact form's state/validation UX; `POST`s JSON to `/api/contact` and renders success/error state. Imported by `src/app/(site)/contact/page.tsx` (which stays a server component so it can export `metadata`).

There is no shared `ui/` (Button/Badge/Card) kit, `lib/` helpers, or centralized project-data module — an earlier scaffold of empty stub files for these was removed since nothing used them. `ProjectsSection.tsx` defines its own inline `projects` array; if you need reusable UI primitives or centralized project data, they need to be created from scratch, not resurrected from history.

### Styling

Tailwind CSS v4 via `@tailwindcss/postcss`, configured through `src/app/globals.css` using the `@theme inline` directive (no `tailwind.config.js`). Design language across pages: light lavender/indigo gradient backgrounds (`#f4f7ff`), glassmorphism cards (`backdrop-blur`, translucent borders), and large tracked-in headings — match this look when adding new sections. Path alias `@/*` maps to `src/*` (see `tsconfig.json`).

### Assets

Project screenshots live in `public/images/projects/`; referenced by filename from `ProjectsSection.tsx`. `public/logo-morado.png` is the only logo in use (Navbar); unused leftovers (old logo variants, default create-next-app SVGs) have been removed — don't reintroduce assets that aren't referenced from `src/`.
