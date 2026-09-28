"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ProjectRow } from "@/components/projects/ProjectRow";
import { ProjectModal } from "@/components/projects/ProjectModal";
import { PROJECTS } from "@/data/projects";
import type { Project } from "@/types/project";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Client shell: renders project showcase with sticky horizontal scroll on vertical page scroll. */
export function ProjectShowcase() {
  const [selected, setSelected] = useState<Project | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isReducedMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate transform from 0% to -66.6% (tailored for 3 project cards)
  const transformX = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${((PROJECTS.length - 1) / PROJECTS.length) * 100}%`]
  );

  scrollYProgress.on("change", (latest) => {
    const step = Math.min(
      PROJECTS.length - 1,
      Math.floor(latest * PROJECTS.length)
    );
    if (step !== activeStep) {
      setActiveStep(step);
    }
  });

  if (isReducedMotion) {
    return (
      <>
        <div className="flex flex-col gap-8 px-4 sm:px-6">
          {PROJECTS.map((project, index) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={index}
              onSelect={setSelected}
            />
          ))}
        </div>
        <AnimatePresence>
          {selected && (
            <ProjectModal project={selected} onClose={() => setSelected(null)} />
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <>
      <div ref={containerRef} className="relative h-[250vh] md:h-[300vh]">
        {/* Sticky viewport container */}
        <div className="sticky top-0 flex h-screen w-full flex-col justify-center overflow-hidden py-8">
          {/* Active project step indicator & guidance hint */}
          <div className="mx-auto mb-6 flex w-full max-w-6xl items-center justify-between px-4 sm:px-8">
            <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-accent">
              <span className="h-2 w-2 rounded-full bg-accent animate-ping" />
              <span>
                Project {String(activeStep + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
              </span>
            </div>
            
            <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-muted-foreground/80">
              <span>Scroll down to explore projects</span>
              <ArrowRight className="h-3.5 w-3.5 text-accent animate-pulse" />
            </div>
          </div>

          {/* Horizontal slider track */}
          <div className="w-full overflow-hidden">
            <motion.div
              style={{ x: transformX }}
              className="flex gap-6 sm:gap-8 md:gap-12 px-4 sm:px-8 md:px-16 w-max"
            >
              {PROJECTS.map((project, index) => (
                <ProjectRow
                  key={project.id}
                  project={project}
                  index={index}
                  onSelect={setSelected}
                />
              ))}
            </motion.div>
          </div>

          {/* Progress dots bar */}
          <div className="mt-8 flex justify-center items-center gap-2">
            {PROJECTS.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeStep
                    ? "w-8 bg-accent"
                    : "w-2 bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  );
}

