import { Section } from "@/components/ui/Section";
import { ProjectShowcase } from "@/components/projects/ProjectShowcase";

/** 04 — Selected work: large editorial project rows with detail modals. */
export function Projects() {
  return (
    <Section id="projects" label="04 — SELECTED WORK" title="Selected work" contained={false} className="py-12 md:py-16">
      <ProjectShowcase />
    </Section>
  );
}
