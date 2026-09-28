/**
 * Scroll choreography for the hero scene.
 *
 * All values are normalised timeline positions (0 = scene start, 1 = scene end)
 * so the animation adapts to any viewport height. Keep every timing decision in
 * this file — visual components read from it instead of hardcoding numbers.
 */

export interface HeroStep {
  /** Normalised start position on the timeline. */
  at: number;
  /** Normalised duration. */
  duration: number;
}

export const HERO_SCROLL_STEPS = {
  /** The single card beat — descends from above into its resting position. */
  cardEntry: { at: 0, duration: 0.45 },
  /** Progressive 01→04 information panels. */
  panelsReveal: { at: 0.35, duration: 0.6 },
} as const satisfies Record<string, HeroStep>;

/** Total timeline length in arbitrary GSAP units (keeps label maths readable). */
export const HERO_TIMELINE_LENGTH = 1;

/** Scene scroll distance as a multiple of viewport height, per breakpoint. */
/** Roughly one screen of scroll — the hero should not overstay its welcome. */
export const HERO_SCROLL_DISTANCE = {
  mobile: 1,
  tablet: 1.1,
  desktop: 1.2,
} as const;

/**
 * Card motion — a single vertical beat, no rotation, scale or sideways travel.
 *
 * `entryY` how far above its resting position the card starts.
 * `floatY` idle drift amplitude, applied via the .hero-card-float class.
 */
export const HERO_CARD_MOTION = {
  desktop: { entryY: -150, floatY: "7px" },
  tablet: { entryY: -120, floatY: "6px" },
  mobile: { entryY: -90, floatY: "5px" },
} as const;

export type HeroBreakpoint = keyof typeof HERO_CARD_MOTION;

/** Progressive information panels revealed as the card moves aside. */
export interface HeroPanel {
  index: string;
  title: string;
  lines: string[];
}

export const HERO_PANELS: HeroPanel[] = [
  {
    index: "01",
    title: "Identity",
    lines: ["Karthik", "Full-Stack Developer", "1+ year experience"],
  },
  {
    index: "02",
    title: "Frontend",
    lines: ["Next.js", "React", "TypeScript"],
  },
  {
    index: "03",
    title: "Backend",
    lines: ["Node.js", "Express.js", "REST APIs"],
  },
  {
    index: "04",
    title: "Data",
    lines: ["PostgreSQL", "MongoDB", "Redis"],
  },
];

/** Resolve the active breakpoint key from two media-query booleans. */
export function resolveHeroBreakpoint(
  isDesktop: boolean,
  isTablet: boolean,
): HeroBreakpoint {
  if (isDesktop) return "desktop";
  if (isTablet) return "tablet";
  return "mobile";
}
