# Architecture

Website for **Shadow Strike Martial Arts Academy**, with two branches in Kerala:
**Manjeri** and **Cholackkal**.

Status: planning. No app code yet. This document is the plan the code should follow.

## 1. Goals

1. Get new students to visit or contact a branch (call, WhatsApp, or form).
2. Show what is taught, who teaches it, and when classes run at each branch.
3. Look like a traditional dojo, feel modern: textured, calm, with purposeful motion.
4. Load fast on mid-range phones over mobile data. Most visitors will be on a phone.

## 2. Stack

Same stack as `~/Projects/macos-styled-portfolio`. Match its versions unless there is a reason to change.

| Concern            | Choice                                                                                         |
| ------------------ | ---------------------------------------------------------------------------------------------- |
| Framework          | Next.js 14 (App Router), React 18                                                              |
| Language           | TypeScript, `strict` plus `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch` |
| Output             | Static export (`output: "export"`, `images.unoptimized: true`)                                 |
| Styling            | Tailwind CSS 3, colours as CSS variables mapped in `tailwind.config.ts`                        |
| Class merging      | `cn()` = `clsx` + `tailwind-merge` (extended with our custom tokens)                           |
| Motion             | `framer-motion` 11                                                                             |
| Content validation | `zod` schema over `data/academy.json`                                                          |
| Tests              | Vitest + jsdom + Testing Library                                                               |
| Lint / format      | ESLint (`next/core-web-vitals`), Prettier (`trailingComma: "es5"`)                             |
| Path alias         | `@/*` → project root                                                                           |

npm scripts (copy from the portfolio):

```
dev, build, start, lint, typecheck, test, test:watch,
format, format:check, check, dev:mobile
```

`npm run check` = lint + typecheck + format check + tests. It must pass before every commit.

## 3. Directory layout

```
.
├── app/
│   ├── layout.tsx            # fonts, metadata, <html>/<body>, MotionConfig
│   ├── page.tsx              # one-page landing: composes the sections
│   ├── globals.css           # CSS variables (tokens), paper texture, base styles
│   ├── branches/[slug]/      # per-branch page (Manjeri, Cholackkal), generateStaticParams
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── components/
│   │   ├── sections/         # hero, about, programs, instructors, schedule, branches, gallery, testimonials, join, footer
│   │   ├── ui/               # button, ornament (star), brush-circle, section-heading, social-icons, container
│   │   ├── motion/           # reveal, stagger, parallax wrappers
│   │   └── site/             # header/nav, mobile menu, json-ld
│   ├── hooks/                # use-mobile, use-scroll-progress, etc.
│   └── lib/
│       ├── content/          # schema.ts (zod), load.ts, seo.ts
│       ├── motion.ts         # shared variants, springs, durations
│       ├── design-tokens.ts  # font sizes, z-index layers (feeds Tailwind + cn)
│       └── utils.ts          # cn()
├── data/
│   └── academy.json          # every word, number, schedule and branch detail
├── public/
│   ├── images/               # optimised photos (webp/avif), logo, og image
│   └── textures/             # paper grain, brush stroke SVG/PNG
├── test/
├── references/               # design references (not shipped)
└── docs/                     # this file, AGENTS.md
```

## 4. Content model

All copy lives in `data/academy.json` and is validated by a zod schema at build time.
Components never hard-code academy facts (names, phone numbers, timings, prices).

Sketch of the schema:

```ts
academy: {
  name: "Shadow Strike Martial Arts Academy",
  shortName: "Shadow Strike",
  tagline: string,
  about: string[],             // paragraphs
  founded?: string,            // YYYY
  social: { instagram?, facebook?, youtube?, whatsapp? }
}
branches: Array<{
  slug: "manjeri" | "cholackkal",
  name: string,
  locality?: string,           // neighbourhood in a big town, e.g. "Pullur" → "Pullur, Manjeri"
  address?: string,            // one line, as the owner gave it
  mapsUrl?: string,            // Google Maps share link
  geo?: { lat: number, lng: number },
  phone?: string,
  whatsapp?: string,
  schedule: Array<{ day: Day, start: "HH:MM", end: "HH:MM", programId: string }>
}>
programs: Array<{ id, name, ageGroup, description, image? }>
instructors: Array<{ name, rank, bio, image?, branches: slug[] }>
testimonials: Array<{ quote, name, detail? }>
gallery: Array<{ src, alt, width, height }>
site: { title, description, url }
```

Locations (from the owner):

| Branch     | Shown as        | Address                                      | Map                                       |
| ---------- | --------------- | -------------------------------------------- | ----------------------------------------- |
| Manjeri    | Pullur, Manjeri | Pullur, Manjeri, Kerala                      | https://maps.app.goo.gl/mJXyA252QEBqFi8p7 |
| Cholackkal | Cholackkal      | Pandikkad – Manjeri Road, Cholackkal, Kerala | https://maps.app.goo.gl/bpJ5swWGJcXAYhAE6 |

Manjeri is a big town, so always show the locality with it (`branchPlace()` in
`app/lib/content/index.ts`).

Phone: the owner gave two academy-wide numbers (+91 73569 98167, +91 70349 34327), stored in
`academy.contacts`. They are not tied to a branch. Each gets Call and WhatsApp buttons in the
contact section, and both are listed in the footer and the SEO data. Per-branch `phone` /
`whatsapp` stay optional for when a branch gets its own number.

## 5. Page structure

Single landing page with anchor navigation, plus a static page per branch.

| #   | Section        | Notes                                                                                                                                                                                                                                                                                                                                                                                                  |
| --- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | Header / nav   | Half-height frosted-glass bar (blur on its own layer, firmer once scrolled). Logo left. Links: Home, Programs, About, Branches, Contact. Mobile: full-screen menu.                                                                                                                                                                                                                                     |
| 2   | Hero           | A faithful build of the reference screen on its 1920×1080 artboard (`--u` unit, `hero.module.css`): transparent nav, two-line red serif headline, brush disc (`brush-disc.tsx`) behind the B/W students cut-out, hairlines, star rows, right-aligned intro and "Join now" pill, branch names bottom-left, social badges bottom-right. Stacks in one column below 1024px. Copy lives in `academy.hero`. |
| 3   | About          | Story and values, beside the salute photo on a crimson brush disc.                                                                                                                                                                                                                                                                                                                                     |
| 4   | Programs       | Cards per program/age group (kids, teens, adults, self-defence...).                                                                                                                                                                                                                                                                                                                                    |
| 5   | Instructors    | Portrait, rank (belt/dan), short bio.                                                                                                                                                                                                                                                                                                                                                                  |
| 6   | Schedule       | Tabs per branch, weekly timetable.                                                                                                                                                                                                                                                                                                                                                                     |
| 7   | Branches       | Two cards: Manjeri, Cholackkal. Address, map link, call and WhatsApp buttons.                                                                                                                                                                                                                                                                                                                          |
| 8   | Gallery        | Photo grid with lightbox.                                                                                                                                                                                                                                                                                                                                                                              |
| 9   | Testimonials   | Quotes from students/parents.                                                                                                                                                                                                                                                                                                                                                                          |
| 10  | Join / contact | CTA band with a card per branch (address, map, call, WhatsApp) and the fighting-stance photo on a black brush disc. No backend (static export).                                                                                                                                                                                                                                                        |
| 11  | Footer         | Logo, branches, socials, copyright.                                                                                                                                                                                                                                                                                                                                                                    |

`/branches/manjeri` and `/branches/cholackkal`: address, map, that branch's timetable and
instructors. Good for local search ("martial arts Manjeri").

## 6. Visual design

Two sources must be reconciled:

- **Reference template**: warm parchment, crimson, maroon, serif display, textured, traditional.
- **Academy logo**: black and red flat print: dragon, crossed katanas, red ring, banner, "SS" monogram.

Decision: use the reference's **layout, texture and type system**, retinted with the
**logo's red and black**, so the logo sits naturally on the page. Dark sections
(black with red accents) can alternate with parchment sections for rhythm.

### Colour tokens (starting values, tune against the real logo)

| Token           | Value     | Source                             |
| --------------- | --------- | ---------------------------------- |
| `--paper`       | `#E3D2B5` | template background                |
| `--paper-shade` | `#CCB6A2` | template stains / shadows          |
| `--ink`         | `#4A1A26` | body/nav text on paper (reference) |
| `--crimson`     | `#A3163A` | reference brush disc               |
| `--blood`       | `#D21E2D` | reference headline and stars       |
| `--maroon`      | `#6B1A2A` | template button                    |
| `--night`       | `#0E0A0B` | logo background / dark sections    |
| `--steel`       | `#3A3A3C` | logo dragon / swords               |
| `--rule`        | `#66645F` | reference hairlines                |

Define them in `globals.css` on `:root`, expose them through `tailwind.config.ts`
(`colors.paper`, `colors.crimson`, ...), the same way the portfolio exposes `site.*`.
Check text contrast (WCAG AA) for every pairing used.

### Type

- Display: **Marcellus**, a classical serif close to the template's.
- Body: **Montserrat** (the template's body face).
- All fonts are self-hosted woff2 files in `public/fonts` (OFL, latin subset), loaded with `next/font/local`. `next/font/google` fails to build on the pinned Next 14.2.6.
- Optional accent for numbers/labels: a bold condensed sans echoing the logo (e.g. **Oswald**).
- Put the type scale in `app/lib/design-tokens.ts` and feed it to Tailwind and `cn()`, as the portfolio does.

### Logo

- Use the parchment version (`public/images/logo.webp`, `logo-sm.webp`): the flat black-and-red logo lifted off its white paper onto parchment, centred on the red ring.
- Always show it fully round (`rounded-full`). Sources: `references/brand/shadow-strike-logo-paper.png` (parchment) and `shadow-strike-logo-transparent.png` (transparent, for future use on other backgrounds).

### Ornaments and texture

- Four-point star as an inline SVG component; rows of six as dividers.
- Brush-stroke circle as an SVG (lets us animate the stroke).
- Paper grain as a small tiling image or SVG noise filter in CSS, never a huge photo.
- Student photos: black-and-white cut-outs (transparent webp) over the brush circle.

## 7. Motion (framer-motion)

Principles: motion explains hierarchy and feels like a deliberate strike, never decoration for its own sake.

- One shared vocabulary in `app/lib/motion.ts`: durations, easings, springs, and variants (`fadeUp`, `stagger`, `strokeDraw`, `scaleIn`).
- Use `LazyMotion` + `m` components with `domAnimation` to keep the bundle small.
- Wrap the app in `<MotionConfig reducedMotion="user">`. With reduced motion, keep opacity fades and drop movement.
- Animate only `transform` and `opacity` (plus SVG `pathLength`). No layout-thrashing properties.
- Scroll reveals with `whileInView` and `viewport={{ once: true, margin: "-10% 0px" }}`.

Planned moments:

| Where                      | Motion                                                                                                         |
| -------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Hero load                  | Brush circle draws in (`pathLength`), photo rises and sharpens, headline lines stagger, stars pop in sequence. |
| Hero scroll                | Gentle parallax: circle and photo at different speeds (`useScroll` + `useTransform`).                          |
| Section headings           | Star divider sweeps in, heading fades up.                                                                      |
| Program / instructor cards | Staggered reveal; hover lifts with a spring.                                                                   |
| Schedule tabs              | Shared-layout underline (`layoutId`) and cross-fade between branches.                                          |
| Gallery                    | Lightbox opens from the thumbnail (`layoutId`).                                                                |
| Buttons                    | Press scales down slightly, like a block.                                                                      |
| Nav                        | Background and shadow fade in after scrolling past the hero.                                                   |

## 8. Performance and SEO

- Static export; host on any static host (Vercel, Netlify, Cloudflare Pages).
- Images: pre-sized webp/avif in `public/images`, explicit `width`/`height`, lazy below the fold, hero image preloaded.
- Fonts via `next/font` (self-hosted, `display: swap`), only the weights used.
- Metadata from `data/academy.json`: title template, description, Open Graph image, `sitemap.ts`, `robots.ts`.
- JSON-LD: `SportsActivityLocation` (or `LocalBusiness`) per branch with address, geo and opening hours once known.
- Budget: Lighthouse 90+ on mobile for performance, accessibility, best practices and SEO.

## 9. Accessibility

- Semantic landmarks, one `h1`, ordered headings.
- Visible focus states in the brand red.
- All photos get real `alt`; ornaments are `aria-hidden`.
- Mobile menu traps focus and closes on Escape.
- Respect `prefers-reduced-motion` (see section 7).

## 10. Known quirks

- `npm run dev` returns 500 for `/sitemap.xml` (Next 14 bug with `output: "export"`). The production build generates it correctly.
- Don't set `dynamicParams = false` on dynamic routes; Next 14.2's dev server then errors on them with `output: "export"`.

## 11. Testing

- Unit-test the content schema against `data/academy.json` (catches bad edits).
- Unit-test pure helpers (schedule grouping, WhatsApp link builder, time formatting).
- Component tests only for logic-bearing components (tabs, mobile menu, lightbox).
- Same Vitest config as the portfolio: `environment: "jsdom"`, `include: ["**/*.test.{ts,tsx}"]`.

## 12. Open questions

- Which phone number belongs to which branch, if either does (both are shown academy-wide for now).
- Name spelling: logo says "Shadow Strike", repo is `shadow-strikers.arts`. Which goes on the site?
- Branch spelling: "Cholackkal" vs the common "Cholakkal".
- Which disciplines are taught (Taekwondo, Karate, Kung Fu, kickboxing...)? Drives programs and copy.
- Real photos of students and instructors (the template's photos are stock and must not ship).
- Domain name.
- Contact form needed, or WhatsApp/call only? A form needs a third-party service because the site is static.
- Malayalam version of the site?
