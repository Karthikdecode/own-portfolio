# Portfolio — KARTHIK.DEV

A premium, interactive full-stack developer portfolio built with **Next.js 16
(App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

This repository is currently at the **architecture / scaffolding** stage. The
foundation (folder structure, types, data, hooks, utilities, API + asset
architecture, global styles) is in place; features are built on top of it.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (also type-checks)
npm run lint     # eslint
```

Copy `.env.example` → `.env.local` and fill in values as features come online.

## Project structure

```
app/                 App Router entry, global styles, API routes
  api/contact/       Contact form endpoint (validated, delivery TODO)
components/
  layout/            Navbar, Footer, PageContainer
  hero/              Hero, HeroScene, IdentityCard (opening experience)
  voice/             VoiceControl (narration UI)
  three/             React Three Fiber scene (feature phase)
  about|tech-stack|experience|projects|architecture|skills|resume|contact/
data/                Typed content (portfolio, tech stack, experience, projects, socials)
hooks/               useVoice, useMediaQuery, useReducedMotion, useParallax
lib/                 utils (cn, helpers), constants (site config), validations (zod)
types/               portfolio, project, experience, api
public/
  images/            profile, projects, experience, icons
  audio/             voice narration (mp3)
  models/            3D assets
  resume/            resume.pdf
```

## Conventions

- Import via the `@/*` alias (maps to the project root).
- Content lives in `data/`, typed by `types/` — components stay presentational.
- Design tokens are CSS variables in `app/globals.css`, exposed as Tailwind
  utilities (`bg-background`, `text-foreground`, `text-accent`, …). Swap the
  `:root` values to rebrand.
- Animation is gated on `useReducedMotion`; audio never autoplays.

## Planned dependencies (feature phase)

Installed only when the corresponding feature is built:

`framer-motion`, `gsap`, `three`, `@react-three/fiber`, `@react-three/drei`,
`lenis`, `lucide-react`.

## Content rules

Use real identity only. Do not invent companies, titles, certifications, client
names, project metrics, awards, or years of experience. `TODO:` placeholders
mark values awaiting real data.
