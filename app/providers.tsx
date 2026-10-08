"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { ThemeProvider } from "next-themes";
import { ReactLenis } from "lenis/react";

function SmoothScroll({ children }: { children: ReactNode }) {
  /**
   * react-three-fiber instantiates a THREE.Clock in its own store, which Three
   * r183+ warns about on construction. Our scene code never touches Clock, so
   * this filters exactly that one upstream message and nothing else — a broader
   * match would hide real deprecation warnings from React or Next.
   */
  useEffect(() => {
    const originalWarn = console.warn;
    console.warn = (...args) => {
      if (String(args[0] ?? "").startsWith("THREE.Clock")) return;
      originalWarn(...args);
    };
    return () => {
      console.warn = originalWarn;
    };
  }, []);

  return (
    <ReactLenis
      root
      options={{ lerp: 0.1, duration: 1.1 }}
    >
      {children}
    </ReactLenis>
  );
}

/**
 * App-wide client providers:
 * - next-themes: class-based light/dark, system default, persisted, no FOUC.
 * - Lenis: smooth inertia scrolling.
 *
 * Animation is deliberately NOT gated on prefers-reduced-motion: phones turn
 * that on with battery saver, which silently stripped the site's motion. The
 * same full experience now runs on every device.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SmoothScroll>{children}</SmoothScroll>
    </ThemeProvider>
  );
}
