import { Section } from "@/components/ui/Section";
import { ProjectShowcase } from "@/components/projects/ProjectShowcase";

/** 05 — Selected work: large editorial project rows with detail modals. */
export function Projects() {
  return (
    <Section
      id="projects"
      label="05 — SELECTED WORK"
      title="Selected work"
      contained={false}
      // The sticky showcase ends with its own centred whitespace, so the
      // section adds no bottom padding of its own.
      className="pt-12 pb-0 md:pt-16"
    >
      <ProjectShowcase />
    </Section>
  );
}
