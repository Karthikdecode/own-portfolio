import { useCallback } from "react";
import { useLenis } from "lenis/react";

/**
 * Returns a function that smooth-scrolls to an anchor. Uses Lenis when active,
 * otherwise falls back to native scrollIntoView.
 */
export function useScrollTo() {
  const lenis = useLenis();

  return useCallback(
    (hash: string) => {
      const selector = hash.startsWith("#") ? hash : `#${hash}`;
      if (lenis) {
        lenis.scrollTo(selector, { offset: 0 });
        return;
      }
      document
        .querySelector(selector)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [lenis],
  );
}
