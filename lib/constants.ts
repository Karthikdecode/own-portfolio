import type { NavLink, SectionId } from "@/types/portfolio";

/**
 * Canonical production origin (no trailing slash). Override via
 * NEXT_PUBLIC_SITE_URL if a custom domain is added later.
 *
 * The fallback must be the real production URL: it feeds the canonical tag,
 * Open Graph URLs, robots.txt and the sitemap. A localhost fallback here meant
 * the live site told Google its canonical page was http://localhost:3000.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://karthikp-portfolio.netlify.app";

export const SITE_CONFIG = {
  name: "Karthik P",
  brand: "KARTHIK.DEV",
  title: "Karthik P | Full Stack Developer - Node.js, React & Next.js",
  description:
    "Full Stack Developer in Madurai, India, building production-ready web and mobile applications with Node.js, Express.js, React, Next.js, React Native, PostgreSQL, MongoDB and AWS.",
  jobTitle: "Full Stack Developer",
  url: SITE_URL,
  locale: "en_IN",
  author: "Karthik P",
  // A short, honest list. Search engines weigh visible content far more than
  // this tag; it is here for completeness, not as a ranking lever.
  keywords: [
    "Karthik P",
    "Full Stack Developer",
    "Software Developer",
    "Node.js Developer",
    "React Developer",
    "Next.js Developer",
    "React Native Developer",
    "Full Stack Developer Madurai",
    "Portfolio",
  ],
} as const;

/** Ordered section ids — drive nav + scroll spy. */
export const SECTION_IDS = [
  "hero",
  "about",
  "tech-stack",
  "experience",
  "education",
  "projects",
  "architecture",
  "resume",
  "contact",
] as const satisfies readonly SectionId[];

export const NAV_LINKS: NavLink[] = [
  { label: "About", href: "#about", sectionId: "about" },
  { label: "Stack", href: "#tech-stack", sectionId: "tech-stack" },
  { label: "Experience", href: "#experience", sectionId: "experience" },
  { label: "Projects", href: "#projects", sectionId: "projects" },
  { label: "Contact", href: "#contact", sectionId: "contact" },
];

/** Voice narration assets (one per narrated section). */
export const VOICE = {
  hero: "/audio/hero-intro.mp3",
  about: "/audio/about.mp3",
  stack: "/audio/stack.mp3",
  experience: "/audio/experience.mp3",
  projects: "/audio/projects.mp3",
  contact: "/audio/contact.mp3",
} as const;

/** Public asset paths. The résumé is hosted on Google Drive, not in /public. */
export const ASSETS = {
  // Square source; next/image serves optimised WebP/AVIF from the JPG.
  portrait: "/images/karthik-image.jpg",
  resume:
    "https://drive.google.com/file/d/17kBFMHbn2IdOKWBKD9AZnrVyJCUE2-e_/view?usp=drivesdk",
  resumeDownload:
    "https://drive.google.com/uc?export=download&id=17kBFMHbn2IdOKWBKD9AZnrVyJCUE2-e_",
} as const;

/** Breakpoints (px) mirrored from the design tokens for JS media queries. */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;
