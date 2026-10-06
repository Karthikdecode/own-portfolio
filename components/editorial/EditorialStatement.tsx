"use client";

import { motion } from "framer-motion";
import { PageContainer } from "@/components/layout/PageContainer";
import { Reveal, RevealLines } from "@/components/motion/Reveal";
import { EASE_OUT } from "@/lib/motion";
import { EDITORIAL } from "@/data/portfolio";

/** Large editorial typography moment between Projects and Architecture. */
export function EditorialStatement() {
  return (
    <section
      id="statement"
      aria-label="Statement"
      className="relative overflow-hidden py-24 md:py-32"
    >
      {/* Subtle background accent */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 100%, color-mix(in srgb, var(--accent) 8%, transparent), transparent 70%)",
        }}
      />

      <PageContainer size="wide">
        <Reveal className="mb-8 md:mb-10">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            The approach
          </p>
        </Reveal>

        <RevealLines
          lines={EDITORIAL.words}
          className="text-display text-[clamp(3.5rem,15vw,12rem)] leading-[0.85]"
          lineClassName="text-foreground"
          stagger={0.15}
        />

        <Reveal delay={0.3} className="mt-8 md:mt-10 max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.4 }}
            className="text-base leading-relaxed text-muted-foreground"
          >
            A simple loop I keep returning to — understand the problem, build the
            simplest thing that works, then make it faster, clearer and kinder to
            use. This philosophy guides every decision I make as a Full-Stack Developer.
          </motion.p>
        </Reveal>
      </PageContainer>
    </section>
  );
}
