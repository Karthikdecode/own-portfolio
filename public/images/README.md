# Images

Public image assets, organized by area:

```
profile/      editorial portrait — profile.webp (see profile/README.md)
projects/     project cover images — <slug>.webp (referenced in data/projects.ts)
experience/   experience / company logos
icons/        misc icons
og.png        social share / Open Graph card — 1200x630
```

## og.png (required for social previews)

`SITE_CONFIG.ogImage` in `lib/constants.ts` points at `/images/og.png`, used by
the Open Graph + Twitter card metadata in `app/layout.tsx`. Add a **1200×630**
`og.png` here before launch, otherwise link previews (Slack, X, LinkedIn, …)
will 404.

Alternatively, generate it dynamically with an `app/opengraph-image.tsx`
(`ImageResponse` from `next/og`) and drop the static reference.
