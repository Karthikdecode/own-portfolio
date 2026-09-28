import { Section } from "@/components/ui/Section";
import { ArchitectureFlow } from "@/components/architecture/ArchitectureFlow";

/** 05 — How I build: an interactive full-stack architecture flow. */
export function Architecture() {
  return (
    <Section id="architecture" label="05 — HOW I BUILD" title="How I build">
      <ArchitectureFlow />
    </Section>
  );
}
