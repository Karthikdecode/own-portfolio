import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * Returns false during SSR / first render and true after client mount — without
 * calling setState inside an effect. Use to gate client-only UI (e.g. theme).
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
