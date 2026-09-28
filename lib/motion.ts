import type { Variants } from "framer-motion";

/** Shared easing curves — one motion language across the site. */
export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const EASE_IN_OUT: [number, number, number, number] = [0.65, 0, 0.35, 1];

/** Default in-view trigger config. */
export const VIEWPORT = { once: true, amount: 0.3 } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: EASE_OUT } },
};

/** Parent that staggers its direct motion children. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

/** A single staggered child (pairs with staggerContainer). */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};
