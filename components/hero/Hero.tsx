"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useTheme } from "next-themes";
import { PageContainer } from "@/components/layout/PageContainer";
import { HangingCard } from "@/components/hero/HangingCard";
import { HeroInformation } from "@/components/hero/HeroInformation";
import { resolveHeroBreakpoint } from "@/components/hero/HeroTimeline";
import { VoiceBar } from "@/components/voice/VoiceBar";
import { Button } from "@/components/ui/Button";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { useVoice } from "@/hooks/useVoice";
import { useScrollTo } from "@/hooks/useScrollTo";
import { useMounted } from "@/hooks/useMounted";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useHeroTimeline } from "@/hooks/useHeroTimeline";
import { EASE_OUT } from "@/lib/motion";
import { HERO, PERSONAL } from "@/data/portfolio";
import { SOCIALS } from "@/data/socials";
import { cn } from "@/lib/utils";

const HeroCanvas = dynamic(() => import("@/components/hero/HeroCanvas"), {
  ssr: false,
  loading: () => null,
});

/**
 * Scroll-driven hero scene.
 *
 * The identity card hangs into the first viewport and is pulled down, rotated
 * and moved aside by a pinned GSAP timeline. Critical identity information
 * (name, role, stack, CTAs) renders immediately and is never gated behind the
 * animation — the choreography is a presentation layer over static content.
 */
interface HeroProps {
  /** Whether the portrait exists in /public — resolved on the server. */
  hasPortrait: boolean;
}

export function Hero({ hasPortrait }: HeroProps) {
  const { controls, ...voice } = useVoice(HERO.voice.src);
  const scrollTo = useScrollTo();
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 768px)");

  const breakpoint = resolveHeroBreakpoint(isDesktop, isTablet);

  const { sceneRef, pinRef } = useHeroTimeline({
    breakpoint,
    disabled: !mounted,
  });

  const hasStarted = voice.isPlaying || voice.currentTime > 0;
  const techCue = HERO.voice.cues.find((cue) => cue.id === "tech");
  const techActive = voice.progress >= (techCue?.at ?? 1);

  // The WebGL backdrop stays tablet-up purely for phone GPU/battery headroom.
  const show3D = mounted && isTablet;
  const dark = resolvedTheme !== "light";

  return (
    <section ref={sceneRef} id="hero" aria-label="Introduction">
      <div
        ref={pinRef}
        className="relative flex min-h-svh flex-col justify-center overflow-hidden pb-20 pt-28 md:pt-32"
      >
        {/* Atmospheric backdrop */}
        {show3D ? (
          <div className="absolute inset-0" aria-hidden>
            <HeroCanvas dark={dark} lightweight={!isDesktop} />
          </div>
        ) : (
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(55% 45% at 60% 40%, color-mix(in srgb, var(--accent) 9%, transparent), transparent 65%)",
            }}
          />
        )}

        <div className="relative">
          <PageContainer>
            <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
              {/* ---- Text column ---- */}
              <div
                data-hero="text-column"
                className="order-2 flex flex-col lg:order-1"
              >
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: EASE_OUT }}
                  className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground"
                >
                  <span className="h-px w-6 bg-accent" aria-hidden />
                  {HERO.label}
                </motion.p>

                <h1 className="mt-6 text-display text-[clamp(2.5rem,9vw,6rem)]">
                  <span className="sr-only">
                    {PERSONAL.name} — {PERSONAL.role}
                  </span>
                  {HERO.headline.map((word, index) => (
                    <span key={word} aria-hidden className="block overflow-hidden">
                      <motion.span
                        className={cn(
                          "block",
                          index === 1 && "text-muted-foreground",
                        )}
                        initial={{ y: "110%" }}
                        animate={{ y: "0%" }}
                        transition={{
                          duration: 0.7,
                          ease: EASE_OUT,
                          delay: 0.1 + index * 0.09,
                        }}
                      >
                        {word}
                      </motion.span>
                    </span>
                  ))}
                </h1>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.3 }}
                  className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg"
                >
                  {HERO.paragraph}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.4 }}
                  className="mt-8 flex flex-wrap items-center gap-3"
                >
                  <Button href="#projects" variant="primary" aria-label="View my work">
                    View my work
                  </Button>
                  <Button href="#resume" variant="outline">
                    Download CV
                  </Button>
                </motion.div>

                {/* Voice — never autoplays, never takes over scrolling */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.5 }}
                  className="mt-8"
                >
                  {hasStarted ? (
                    <VoiceBar
                      state={voice}
                      controls={controls}
                      label={HERO.voice.ctaLabel}
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={controls.play}
                      className="group inline-flex h-11 items-center gap-3 rounded-full border border-border bg-surface/60 pl-2 pr-5 font-mono text-xs uppercase tracking-widest text-foreground transition-colors hover:border-foreground/50"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground">
                        <Play className="h-3.5 w-3.5 translate-x-px" aria-hidden />
                      </span>
                      {HERO.voice.ctaLabel}
                    </button>
                  )}
                  <p className="sr-only">{HERO.voice.transcript}</p>
                </motion.div>

                {/* Socials */}
                <motion.ul
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.6 }}
                  className="mt-10 flex items-center gap-3"
                >
                  {SOCIALS.map((social) => {
                    const external = social.platform !== "email";
                    return (
                      <li key={social.platform}>
                        <Link
                          href={social.href}
                          aria-label={social.label}
                          {...(external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground/50 hover:text-foreground"
                        >
                          <SocialIcon platform={social.platform} />
                        </Link>
                      </li>
                    );
                  })}
                </motion.ul>
              </div>

              {/* ---- The hanging identity card ---- */}
              {/* Leads on mobile, sits right of the copy from lg up. */}
              <div className="relative order-1 mx-auto flex w-full max-w-sm justify-center lg:order-2 lg:max-w-none">
                <HangingCard
                  breakpoint={breakpoint}
                  hasPortrait={hasPortrait}
                  techActive={techActive}
                />
              </div>
            </div>

            {/* ---- Progressive information panels ---- */}
            <HeroInformation className="mt-14 md:mt-20" />
          </PageContainer>
        </div>

        {/* Scroll hint */}
        <motion.button
          data-hero="scroll-hint"
          type="button"
          onClick={() => scrollTo("#about")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          aria-label="Scroll to about section"
          className="bottom-safe absolute left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground md:flex"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
            Scroll
          </span>
          <span className="h-8 w-px animate-pulse bg-border" aria-hidden />
        </motion.button>
      </div>
    </section>
  );
}
