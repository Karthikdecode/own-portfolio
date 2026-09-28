"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealLines } from "@/components/motion/Reveal";
import { EASE_OUT } from "@/lib/motion";
import { ABOUT } from "@/data/portfolio";

/** 01 — About: premium editorial composition with improved visual hierarchy. */
export function About() {
  return (
    <Section id="about" label={ABOUT.label}>
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Strong visual statement with enhanced typography */}
        <div>
          <RevealLines
            lines={ABOUT.statement}
            className="text-display text-[clamp(2.25rem,7vw,4.5rem)]"
            stagger={0.12}
          />
          <Reveal delay={0.4}>
            <p className="mt-8 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Specialized in building scalable, user-focused digital products with attention to detail and code quality.
            </p>
          </Reveal>
        </div>

        {/* Content with stats */}
        <div className="flex flex-col justify-between gap-10">
          <Reveal delay={0.1}>
            <div className="max-w-md space-y-4 text-base leading-relaxed text-muted-foreground">
              {ABOUT.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          {/* Stats with animated entrance */}
          <Reveal delay={0.2}>
            <dl className="grid grid-cols-3 gap-6 border-t border-border pt-8">
              {ABOUT.stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    ease: EASE_OUT,
                    delay: 0.3 + idx * 0.1,
                  }}
                >
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block text-3xl font-semibold tracking-tight text-accent sm:text-4xl">
                      {stat.value}
                    </span>
                    <span className="mt-1 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {stat.label}
                    </span>
                  </dd>
                </motion.div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
