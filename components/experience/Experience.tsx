import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { TimelineLine } from "@/components/experience/TimelineLine";
import { EXPERIENCES } from "@/data/experience";
import type { Period } from "@/types/experience";

function formatPeriod(period: Period): string {
  const end = period.end ?? "Present";
  return `${period.start} — ${end}`;
}

/** 03 — Experience: a vertical editorial timeline (readable on all sizes). */
export function Experience() {
  return (
    <Section id="experience" label="03 — EXPERIENCE" title="Experience">
      <div className="relative pl-8">
        <TimelineLine className="absolute left-[3px] top-1 h-[calc(100%-0.5rem)] w-px bg-border" />

        <div className="space-y-14">
          {EXPERIENCES.map((experience) => (
            <Reveal key={experience.id}>
              <article className="relative">
                <span
                  aria-hidden
                  className="absolute -left-[calc(2rem-0px)] top-2 flex h-[9px] w-[9px] -translate-x-1/2 items-center justify-center rounded-full border border-accent bg-background"
                >
                  <span className="h-[3px] w-[3px] rounded-full bg-accent" />
                </span>

                <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
                  {formatPeriod(experience.period)}
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                  {experience.role}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {experience.company}
                  {experience.location ? ` · ${experience.location}` : ""}
                </p>

                <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                  {experience.summary}
                </p>

                {experience.highlights.length > 0 && (
                  <ul className="mt-4 max-w-2xl space-y-2">
                    {experience.highlights.map((highlight, index) => (
                      <li
                        key={index}
                        className="flex gap-3 text-sm text-muted-foreground"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}

                <ul className="mt-5 flex flex-wrap gap-2">
                  {experience.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
