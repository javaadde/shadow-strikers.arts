# AGENTS.md

Instructions for AI coding agents (Claude Code, Codex, Cursor, etc.) working on this repo.

## Project

Marketing website for **Shadow Strike Martial Arts Academy**, two branches: **Manjeri** and **Cholackkal** (Kerala, India).
Read `docs/architecture.md` before making structural changes. It is the source of truth for layout, content model, design tokens and motion.

## Stack

Mirror `~/Projects/macos-styled-portfolio` (same versions, same configs):
Next.js 14 App Router · React 18 · TypeScript (strict) · Tailwind CSS 3 · framer-motion 11 · zod · Vitest + jsdom · ESLint (`next/core-web-vitals`) · Prettier.
Static export (`output: "export"`). No server, no API routes that need a runtime.

When unsure how something is done, look at how the portfolio does it and do the same.

## Commands

```bash
npm run dev          # local dev server
npm run dev:mobile   # dev server reachable from a phone on the LAN
npm run build        # static export to /out
npm run check        # lint + typecheck + format:check + test (must pass before committing)
```

## Rules

### Content

- Every academy fact (names, addresses, phone numbers, timings, prices, bios) lives in `data/academy.json`, validated by the zod schema in `app/lib/content/schema.ts`. Never hard-code it in components.
- Branch addresses and map links are in `data/academy.json`; the two academy phone numbers are in `academy.contacts` (not tied to a branch; don't guess which branch they belong to). Never invent addresses, phone numbers, prices, ranks, testimonials or founding dates. Leave the field empty and render a "coming soon" state, or ask.
- Manjeri is a big town: always show the branch as "Pullur, Manjeri" (use `branchPlace()`), never just "Manjeri".
- Spell the branches exactly `Manjeri` and `Cholackkal` until the owner confirms otherwise.

### Design

- Visual language comes from `references/` (parchment, crimson brush circle, serif display, star ornaments) retinted with the logo's red and black. See architecture section 6.
- Use the colour tokens (`paper`, `ink`, `crimson`, `blood`, `maroon`, `night`, `steel`). No raw hex values in components.
- Use `cn()` from `app/lib/utils.ts` to combine classes.
- Mobile first. Check every change at 375px wide as well as desktop.
- Template photos used at the owner's request: `hero-students.webp` (hero), `student-salute.webp` (About), `student-stance.webp` (Join). Swap them for the academy's own photos when available. Don't add other template assets.
- The home hero is laid out on the reference's 1920×1080 artboard with the `--u` unit (`app/components/sections/hero.module.css`). Keep new hero elements on that grid and check them against `references/tawkwondo-landing-template/hero-board-1920.jpg`.

### Motion

- framer-motion only. Shared variants and timings live in `app/lib/motion.ts`; reuse them instead of inlining new numbers.
- Use `LazyMotion` + `m.*` components, not `motion.*`.
- Animate `transform`, `opacity` and SVG `pathLength` only.
- Everything must respect `prefers-reduced-motion` (app is wrapped in `MotionConfig reducedMotion="user"`).

### Code

- TypeScript strict; no `any`, no unused locals/params.
- Server components by default; add `"use client"` only to components that need state, effects or motion.
- Images: pre-optimised webp/avif in `public/images` with explicit width and height and meaningful `alt`.
- Accessibility: semantic landmarks, one `h1`, keyboard-reachable everything, visible focus.
- Add a test for any new pure helper and for schema changes.

### Files

- `references/` is design reference only. Never import from it in app code.
- `*.psd` files are git-ignored (too large for GitHub). Do not commit them.
- Keep `docs/architecture.md` up to date when the structure, content model or tokens change.

## Before you finish a task

1. `npm run check` passes.
2. `npm run build` succeeds (static export).
3. Look at the change in the browser at mobile and desktop widths.
