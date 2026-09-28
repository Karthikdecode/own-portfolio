import type {
  AboutContent,
  EditorialContent,
  HeroContent,
  PersonalInfo,
} from "@/types/portfolio";
import { ASSETS, VOICE } from "@/lib/constants";

// Replace placeholder values (marked TODO) with real details before launch.
// Do not add companies, clients, metrics or credentials that aren't real.

export const PERSONAL: PersonalInfo = {
  name: "Karthik",
  brand: "KARTHIK.DEV",
  role: "Full-Stack Developer",
  experience: "1+ year",
  location: "Remote",
  email: "hello@karthik.dev", // TODO: replace with the real contact email
  avatar: ASSETS.portrait,
  tagline: "Building digital experiences from frontend to backend.",
  bio: "Full-Stack Developer with over a year of experience building modern web applications across frontend, backend, APIs and databases.",
  available: true,
};

export const HERO: HeroContent = {
  label: "HELLO, I'M KARTHIK",
  headline: ["FULL-STACK", "DEVELOPER"],
  paragraph:
    "I build modern web applications across frontend, backend, APIs, databases and deployment.",
  cardTech: ["NEXT.JS", "REACT", "NODE.JS"],
  cardIndex: "01 / DEVELOPER",
  voice: {
    src: VOICE.hero,
    ctaLabel: "Hear my story",
    transcript:
      "Hi, I'm Karthik. I'm a Full-Stack Developer with over one year of experience building modern web applications. I work across frontend, backend, APIs and databases. Welcome to my portfolio.",
    // Single editable timeline. `at` is a fraction (0..1) of the audio duration,
    // so it adapts to the real file length. Tune these to taste.
    cues: [
      { at: 0.0, id: "name" },
      { at: 0.16, id: "role" },
      { at: 0.5, id: "tech" },
      { at: 0.84, id: "welcome" },
    ],
  },
};

export const ABOUT: AboutContent = {
  label: "01 — ABOUT",
  statement: ["BUILDING", "DIGITAL", "EXPERIENCES."],
  paragraphs: [
    "I'm a full-stack developer who enjoys turning ideas into fast, reliable products — from the interface a person touches to the APIs, data and infrastructure behind it.",
    "I care about clean architecture, thoughtful motion and details that make a product feel considered. I'm always learning, and I build with the whole stack in mind.",
  ],
  stats: [
    { value: "1+", label: "Year experience" },
    { value: "Full-Stack", label: "Discipline" },
    { value: "14+", label: "Technologies" },
  ],
};

export const EDITORIAL: EditorialContent = {
  // Short words so the giant type stays readable (no overflow) from 320px up.
  words: ["BUILD.", "SOLVE.", "IMPROVE."],
};
