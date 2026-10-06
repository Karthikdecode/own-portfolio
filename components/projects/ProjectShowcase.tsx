"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { ProjectRow } from "@/components/projects/ProjectRow";
import { ProjectModal } from "@/components/projects/ProjectModal";
import { PROJECTS } from "@/data/projects";
import type { Project } from "@/types/project";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Project showcase — pinned right-to-left scroll at every breakpoint.
 *
 * Each slide carries an explicit width (one viewport below lg, a fixed card
 * above) so the track measures exactly `slides × slideWidth`. That is what makes
 * the percentage transform land each project dead centre; a `gap` on the track
 * would add width the percentage does not account for, so the spacing lives as
 * padding inside each slide instead.
 */
export function ProjectShowcase() {
  const [selected, setSelected] = useState<Project | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isReducedMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Track travel for the horizontal slider (tailored to the project count).
  const transformX = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${((PROJECTS.length - 1) / PROJECTS.length) * 100}%`],
  );

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const step = Math.min(
      PROJECTS.length - 1,
      Math.floor(latest * PROJECTS.length),
    );
    setActiveStep((current) => (current === step ? current : step));
  });

  const rows = PROJECTS.map((project, index) => (
    <ProjectRow
      key={project.id}
      project={project}
      index={index}
      onSelect={setSelected}
    />
  ));

  const slides = PROJECTS.map((project, index) => (
    <div
      key={project.id}
      className="w-screen shrink-0 px-4 sm:px-6 lg:w-[58rem] lg:px-8"
    >
      <ProjectRow project={project} index={index} onSelect={setSelected} />
    </div>
  ));

  const modal = (
    <AnimatePresence>
      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </AnimatePresence>
  );

  // --- Reduced motion: no pinning or sliding, just a readable list ---
  if (isReducedMotion) {
    return (
      <>
        <PageContainer>
          <div className="flex flex-col">{rows}</div>
        </PageContainer>
        {modal}
      </>
    );
  }

  // --- Pinned right-to-left scroll ---
  return (
    <>
      <div ref={containerRef} className="relative h-[200vh] md:h-[240vh]">
        {/* Sticky viewport container */}
        <div className="sticky top-0 flex h-screen w-full flex-col justify-center overflow-hidden py-4 sm:py-8">
          {/* Active project step indicator & guidance hint */}
          <div className="mx-auto mb-4 flex w-full max-w-6xl items-center justify-between px-4 sm:mb-6 sm:px-8">
            <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-accent">
              <span className="h-2 w-2 rounded-full bg-accent animate-ping" />
              <span>
                Project {String(activeStep + 1).padStart(2, "0")} /{" "}
                {String(PROJECTS.length).padStart(2, "0")}
              </span>
            </div>

            <div className="hidden items-center gap-2 font-mono text-xs text-muted-foreground/80 sm:flex">
              <span>Scroll down to explore projects</span>
              <ArrowRight className="h-3.5 w-3.5 text-accent animate-pulse" />
            </div>
          </div>

          {/* Horizontal slider track — no gap, see the note above */}
          <div className="w-full overflow-hidden">
            <motion.div style={{ x: transformX }} className="flex w-max">
              {slides}
            </motion.div>
          </div>

          {/* Progress dots bar */}
          <div className="mt-6 flex items-center justify-center gap-2 sm:mt-8">
            {PROJECTS.map((project, index) => (
              <div
                key={project.id}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === activeStep
                    ? "w-8 bg-accent"
                    : "w-2 bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {modal}
    </>
  );
}
