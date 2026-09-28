"use client";

import { useLayoutEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  HERO_CARD_MOTION,
  HERO_SCROLL_DISTANCE,
  HERO_SCROLL_STEPS,
  type HeroBreakpoint,
} from "@/components/hero/HeroTimeline";

interface UseHeroTimelineOptions {
  breakpoint: HeroBreakpoint;
  /** Skip all scroll choreography and render the resting state. */
  disabled: boolean;
}

/**
 * Builds the pinned, scrub-driven hero timeline with GSAP ScrollTrigger.
 *
 * Elements opt in via `data-hero="…"` attributes so the visual components stay
 * free of refs. Timing comes from HERO_SCROLL_STEPS; nothing is hardcoded here.
 */
export function useHeroTimeline({
  breakpoint,
  disabled,
}: UseHeroTimelineOptions) {
  const sceneRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  // Keep ScrollTrigger in sync with Lenis' virtual scroll position.
  useLayoutEffect(() => {
    if (!lenis) return;
    gsap.registerPlugin(ScrollTrigger);
    const update = () => ScrollTrigger.update();
    lenis.on("scroll", update);
    return () => {
      lenis.off("scroll", update);
    };
  }, [lenis]);

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    const pin = pinRef.current;
    if (!scene || !pin) return;

    gsap.registerPlugin(ScrollTrigger);

    // Reduced motion: no pinning, no timeline. Every element keeps its natural
    // resting state from the markup, so the scene stays fully readable.
    if (disabled) return;

    const motion = HERO_CARD_MOTION[breakpoint];
    const distance = HERO_SCROLL_DISTANCE[breakpoint];
    const steps = HERO_SCROLL_STEPS;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: scene,
          start: "top top",
          end: () => `+=${window.innerHeight * distance}`,
          pin,
          pinSpacing: true,
          anticipatePin: 1,
          // scrub adds the inertia/damping — motion lags the scroll slightly.
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // --- The card descends into place. One beat, vertical only. ---
      timeline.fromTo(
        '[data-hero="card-drop"]',
        { y: motion.entryY },
        {
          y: 0,
          // back.out gives the overshoot-and-settle of a real hanging object.
          ease: "back.out(1.2)",
          duration: steps.cardEntry.duration,
        },
        steps.cardEntry.at,
      );

      // --- Progressive 01 → 04 panels, evenly spread across the reveal window ---
      const panels = gsap.utils.toArray<HTMLElement>('[data-hero="panel"]');
      const perPanel = steps.panelsReveal.duration / Math.max(panels.length, 1);
      panels.forEach((panel, index) => {
        timeline.fromTo(
          panel,
          { opacity: 0, y: 28, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            ease: "power2.out",
            duration: perPanel * 0.85,
          },
          steps.panelsReveal.at + index * perPanel,
        );
      });

      // The hero never fades or scales out — every word stays fully legible
      // right up to the point the section unpins into About.

      timeline.to(
        '[data-hero="scroll-hint"]',
        { opacity: 0, duration: steps.cardEntry.duration },
        steps.cardEntry.at,
      );
    }, scene);

    return () => ctx.revert();
  }, [breakpoint, disabled]);

  return { sceneRef, pinRef };
}
