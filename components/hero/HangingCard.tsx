"use client";

import { Portrait } from "@/components/hero/Portrait";
import { HERO_CARD_MOTION, type HeroBreakpoint } from "@/components/hero/HeroTimeline";
import { HERO, PERSONAL } from "@/data/portfolio";
import { cn } from "@/lib/utils";

interface HangingCardProps {
  breakpoint: HeroBreakpoint;
  /** Whether the portrait file exists — resolved on the server. */
  hasPortrait: boolean;
  /** Lights the tech chips in the accent colour during voice playback. */
  techActive?: boolean;
  className?: string;
}

/**
 * The hero's focal object: an identity card suspended from a strap.
 *
 * Motion is vertical only, split across two layers so they never collide:
 *   float wrap → gentle idle drift (CSS animation)
 *   card-drop  → scroll-driven descent (GSAP ScrollTrigger)
 */
export function HangingCard({
  breakpoint,
  hasPortrait,
  techActive = false,
  className,
}: HangingCardProps) {
  const { floatY } = HERO_CARD_MOTION[breakpoint];

  return (
    <div className={cn("flex flex-col items-center", className)}>
      {/* Idle float layer (CSS animation) */}
      <div
        className="hero-card-float"
        style={{ "--hero-float": floatY } as React.CSSProperties}
      >
        {/*
          Scroll-driven descent (GSAP owns this transform). The anchor, strap and
          card all live inside so the whole assembly travels as one rigid object —
          otherwise the card would slide up through its own strap on the way in.
        */}
        <div
          data-hero="card-drop"
          className="relative flex flex-col items-center will-change-transform"
        >
          {/* Anchor the strap hangs from */}
          <div
            aria-hidden
            className="hero-card-clasp h-3 w-10 rounded-b-md border border-t-0 border-border bg-surface-strong shadow-sm"
          />

          {/* Strap */}
          <div
            aria-hidden
            className="w-px bg-gradient-to-b from-border via-border to-foreground/25"
            style={{ height: "clamp(2rem, 7vh, 4.5rem)" }}
          />

          {/* Strap clasp */}
          <div
            aria-hidden
            className="hero-card-clasp h-3 w-5 rounded-sm border border-border bg-surface-strong"
          />

          <div className="relative mt-1 w-[clamp(15rem,74vw,19rem)]">
            {/* Warm ambient halo cast behind the card (dark mode only) */}
            <div
              aria-hidden
              className="hero-card-halo pointer-events-none absolute -inset-10 rounded-[2.5rem] blur-2xl"
            />

            {/* Card face */}
            <div className="hero-card-face relative overflow-hidden rounded-2xl border border-border bg-surface/95 p-4 backdrop-blur">
              {/* Specular fall across the face (dark mode only) */}
              <div
                aria-hidden
                className="hero-card-sheen pointer-events-none absolute inset-0"
              />

              {/* Top edge catching the light (dark mode only) */}
              <div
                aria-hidden
                className="hero-card-edge pointer-events-none absolute inset-x-0 top-0 h-px"
              />

              <div className="relative flex items-center justify-between">
                <span className="font-mono text-[10px] font-semibold tracking-[0.3em] text-muted-foreground">
                  {PERSONAL.brand}
                </span>
                <span
                  className={cn(
                    "h-2 w-2 rounded-full transition-colors duration-500",
                    techActive ? "bg-accent" : "bg-accent/70",
                  )}
                  aria-hidden
                />
              </div>

              <div className="relative mt-3 aspect-[4/5] w-full">
                <Portrait
                  available={hasPortrait}
                  className="h-full w-full rounded-lg"
                  sizes="19rem"
                  priority
                />
              </div>

              <div className="relative mt-4">
                <p className="text-lg font-semibold leading-tight text-foreground">
                  {PERSONAL.name}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {PERSONAL.role}
                </p>
              </div>

              <div className="relative mt-3 flex flex-wrap gap-1.5">
                {HERO.cardTech.map((tech) => (
                  <span
                    key={tech}
                    className={cn(
                      "rounded border px-1.5 py-0.5 font-mono text-[9px] tracking-widest transition-colors duration-500",
                      techActive
                        ? "border-accent bg-accent/15 text-accent"
                        : "border-border text-muted-foreground",
                    )}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <p className="relative mt-4 font-mono text-[10px] tracking-[0.3em] text-accent">
                {HERO.cardIndex}
              </p>
            </div>
          </div>

          {/* Contact shadow beneath the card */}
          <div
            aria-hidden
            className="absolute left-1/2 top-full h-8 w-[70%] -translate-x-1/2 rounded-[50%] blur-xl"
            style={{
              background:
                "radial-gradient(ellipse at center, rgb(0 0 0 / 0.28), transparent 70%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
