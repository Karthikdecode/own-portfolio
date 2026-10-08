"use client";

import type { Variants } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { TimelineLine } from "@/components/experience/TimelineLine";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { EASE_OUT } from "@/lib/motion";
import { CERTIFICATIONS, EDUCATION } from "@/data/education";
import type { Period } from "@/types/experience";

function formatPeriod(period: Period): string {
  const end = period.end ?? "Present";
  return `${period.start} — ${end}`;
}

/** Entries travel in from the right edge as they scroll into view. */
const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 64 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

/**
 * 04 — Education: the Experience timeline language, offset into the right
 * column. The sideways entrance only runs from tablet up — on a phone the
 * column is full-bleed, so there is no room for the travel to read as motion.
 */
export function Education() {
  const isTabletUp = useMediaQuery("(min-width: 768px)");
  const variants = isTabletUp ? slideFromRight : undefined;

  return (
    <Section
      id="education"
      label="04 — EDUCATION"
      title="Education"
      align="right"
    >
      {/*
        Mirrored timeline: Experience runs down the left, Education down the
        right, so the two sections zig-zag. Mobile keeps the normal left-hand
        timeline — right-aligned body text is harder to read on a narrow column.
      */}
      <div className="md:ml-auto md:w-[72%] lg:w-[66%]">
        <div className="relative pl-8 md:pl-0 md:pr-8">
          <TimelineLine className="absolute left-[3px] top-1 h-[calc(100%-0.5rem)] w-px bg-border md:left-auto md:right-[3px]" />

          <div className="space-y-12">
            {EDUCATION.map((entry) => (
              <Reveal key={entry.id} variants={variants}>
                <article className="relative md:text-right">
                  <span
                    aria-hidden
                    className="absolute -left-8 top-2 flex h-[9px] w-[9px] -translate-x-1/2 items-center justify-center rounded-full border border-accent bg-background md:left-auto md:-right-8 md:translate-x-1/2"
                  >
                    <span className="h-[3px] w-[3px] rounded-full bg-accent" />
                  </span>

                  <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
                    {formatPeriod(entry.period)}
                    {entry.score ? ` · ${entry.score}` : ""}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                    {entry.qualification}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {entry.institution}
                    {entry.location ? ` · ${entry.location}` : ""}
                  </p>

                  {entry.focus && entry.focus.length > 0 && (
                    <ul className="mt-5 flex flex-wrap gap-2 md:justify-end">
                      {entry.focus.map((subject) => (
                        <li
                          key={subject}
                          className="rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
                        >
                          {subject}
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        {CERTIFICATIONS.length > 0 && (
          <Reveal variants={variants}>
            <div className="mt-16 border-t border-border pt-8 md:text-right">
              <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Certifications
              </h3>
              <ul className="mt-5 space-y-3">
                {CERTIFICATIONS.map((certification) => (
                  <li
                    key={certification.id}
                    className="flex gap-3 text-sm md:flex-row-reverse"
                  >
                    <span
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                      aria-hidden
                    />
                    <span>
                      <span className="text-foreground">
                        {certification.name}
                      </span>
                      <span className="text-muted-foreground">
                        {" "}
                        — {certification.issuer}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}
      </div>
    </Section>
  );
}
