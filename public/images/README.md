# Images

Public image assets, organized by area:

```
profile/      editorial portrait — profile.webp (see profile/README.md)
projects/     project cover images — <slug>.webp (referenced in data/projects.ts)
experience/   experience / company logos
icons/        misc icons
```

## Social preview image

The Open Graph / Twitter card (1200×630) is generated at build time by
`app/opengraph-image.tsx` — no static `og.png` is needed here.
