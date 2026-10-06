// Core domain types for the portfolio.
// These describe the *shape* of content; concrete values live in `data/`.

/** Stable identifiers for the main page sections (drive nav anchors + scroll). */
export type SectionId =
  | "hero"
  | "about"
  | "tech-stack"
  | "experience"
  | "education"
  | "projects"
  | "architecture"
  | "resume"
  | "contact";

/** A single navigation entry rendered in the navbar / mobile menu. */
export interface NavLink {
  label: string;
  href: `#${string}` | `/${string}`;
  sectionId?: SectionId;
}

/** Supported social / contact platforms. */
export type SocialPlatform =
  | "github"
  | "linkedin"
  | "twitter"
  | "email"
  | "resume";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
  /** Icon key (a lucide-react icon name) resolved by the UI layer. */
  icon: string;
  /** Optional display handle, e.g. "@karthik". */
  handle?: string;
}

/** Top-level personal identity. Keep factual — no invented credentials. */
export interface PersonalInfo {
  name: string;
  /** Short handle used in branding, e.g. "KARTHIK.DEV". */
  brand: string;
  role: string;
  /** Free-form experience descriptor, e.g. "1+ year". */
  experience: string;
  location?: string;
  email: string;
  /** Contact number in international format, e.g. "+91 7708919726". */
  phone?: string;
  /** Public path to the editorial portrait, e.g. "/images/profile/profile.webp". */
  avatar: string;
  /** One or two sentence positioning statement. */
  tagline: string;
  /** Longer about-me copy. */
  bio: string;
  /** Whether currently open to work (shown as a status pill). */
  available?: boolean;
}

/** A single voice→visual sync cue, timed as a fraction (0..1) of the audio. */
export interface VoiceCue {
  /** Fraction of total duration, 0..1, when this cue activates. */
  at: number;
  /** Identifier consumed by the hero to reveal a matching element. */
  id: string;
}

/** Voice-over configuration for the hero narration. */
export interface VoiceNarration {
  /** Public path to the narration audio, e.g. "/audio/hero-intro.mp3". */
  src: string;
  /** Human transcript for accessibility + captions. */
  transcript: string;
  /** Label for the trigger control, e.g. "Hear my story". */
  ctaLabel: string;
  /** Single editable timeline of reveal cues. */
  cues: VoiceCue[];
}

/** Content shown in the immersive hero / identity-card experience. */
export interface HeroContent {
  /** Small overline, e.g. "HELLO, I'M KARTHIK". */
  label: string;
  /** Large editorial words, e.g. ["FULL-STACK", "DEVELOPER"]. */
  headline: [string, string];
  /** Supporting paragraph under the headline. */
  paragraph: string;
  /** Compact tech labels surfaced on the ID card + revealed with the voice. */
  cardTech: string[];
  /** Small technical detail, e.g. "01 / DEVELOPER". */
  cardIndex: string;
  /** Intro narration configuration. */
  voice: VoiceNarration;
}

export interface Stat {
  value: string;
  label: string;
}

export interface AboutContent {
  /** Section overline, e.g. "01 — ABOUT". */
  label: string;
  /** Large multi-line statement, e.g. ["BUILDING", "DIGITAL", "EXPERIENCES."]. */
  statement: string[];
  /** Personal paragraphs. */
  paragraphs: string[];
  /** Real stats only. */
  stats: Stat[];
}

/** The large editorial typography moment after projects. */
export interface EditorialContent {
  words: string[];
}

/** One layer in the full-stack architecture diagram. */
export interface ArchitectureLayer {
  id: string;
  label: string;
  description: string;
}
