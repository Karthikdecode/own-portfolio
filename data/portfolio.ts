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
  name: "Karthik P",
  brand: "KARTHIK.DEV",
  role: "Full-Stack Developer",
  experience: "1.3 years",
  location: "Madurai, Tamil Nadu, India",
  email: "karthikpandi148@gmail.com",
  phone: "+91 7708919726",
  avatar: ASSETS.portrait,
  tagline: "Building digital experiences from frontend to backend.",
  bio: "Full-Stack Developer with 1.3 years of experience building scalable web applications and REST APIs with Node.js, Express.js, React.js, Next.js and PostgreSQL/MongoDB, plus React Native for cross-platform mobile.",
  available: true,
};

export const HERO: HeroContent = {
  label: "HELLO, I'M KARTHIK",
  headline: ["FULL-STACK", "DEVELOPER"],
  paragraph:
    "I build scalable web and mobile applications — REST and real-time APIs, secure auth, and the data layer behind them.",
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
    "I'm a full-stack developer based in Madurai, working across backend services, web frontends and cross-platform mobile. Most of my work lives on the server side — REST and WebSocket APIs, authentication, and the database design behind them.",
    "I've shipped an agri-commerce marketplace, a rural logistics app, a construction ERP and a real-time market dashboard. I care about clean architecture, secure access control and queries that stay fast as data grows.",
  ],
  stats: [
    { value: "1.3", label: "Years experience" },
    { value: "4", label: "Products shipped" },
    { value: "M.Sc.", label: "Computer Science" },
  ],
};

export const EDITORIAL: EditorialContent = {
  // Short words so the giant type stays readable (no overflow) from 320px up.
  words: ["BUILD.", "SOLVE.", "IMPROVE."],
};
