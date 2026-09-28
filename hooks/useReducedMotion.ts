import { useMediaQuery } from "@/hooks/useMediaQuery";

/** True when the user prefers reduced motion. Gate non-essential animation on this. */
export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
