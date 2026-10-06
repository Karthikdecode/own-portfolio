import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { ArchitectureFlow } from "@/components/architecture/ArchitectureFlow";
import { ARCHITECTURE_APPROACH } from "@/data/architecture";

/** 06 — How I build: design approach plus an interactive full-stack flow. */
export function Architecture() {
  return (
    <Section id="architecture" label="06 — HOW I BUILD" title="How I build">
      <Reveal>
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
          {ARCHITECTURE_APPROACH.intro}
        </p>
      </Reveal>

      <div className="mt-10 grid gap-8 border-t border-border pt-8 sm:grid-cols-2 sm:gap-12">
        {ARCHITECTURE_APPROACH.practices.map((practice, index) => (
          <Reveal key={practice.id} delay={index * 0.1}>
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
              {practice.label}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {practice.description}
            </p>
          </Reveal>
        ))}
      </div>

      <div className="mt-16">
        <ArchitectureFlow />
      </div>
    </Section>
  );
}
