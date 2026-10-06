import type { NavLink, SectionId } from "@/types/portfolio";

/** Canonical site URL (no trailing slash). Override via NEXT_PUBLIC_SITE_URL. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "http://localhost:3000";

export const SITE_CONFIG = {
  name: "Karthik P",
  brand: "KARTHIK.DEV",
  title: "Karthik P — Full-Stack Developer",
  description:
    "Full-Stack Developer building scalable web and mobile applications with Node.js, Express.js, React, Next.js, React Native and PostgreSQL.",
  url: SITE_URL,
  ogImage: `${SITE_URL}/images/og.png`,
  locale: "en_US",
  author: "Karthik P",
  keywords: [
    "Full-Stack Developer",
    "Node.js Developer",
    "React Developer",
    "Next.js",
    "React Native",
    "Express.js",
    "PostgreSQL",
    "TypeScript",
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
