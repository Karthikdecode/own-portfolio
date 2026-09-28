import { useCallback, useSyncExternalStore } from "react";

/**
 * SSR-safe media query hook. Returns `false` on the server and during the first
 * client render, then updates to the real value after hydration (no mismatch).
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      if (typeof window === "undefined") return () => {};
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  const getSnapshot = () =>
    typeof window !== "undefined" && window.matchMedia(query).matches;

  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
