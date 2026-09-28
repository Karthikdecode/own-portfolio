"use client";

import { ArrowUpRight, Eye } from "lucide-react";
import { ProjectImage } from "@/components/projects/ProjectImage";
import type { Project } from "@/types/project";

interface ProjectRowProps {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
}

/** Card project representation for horizontal showcase track with View button trigger. */
export function ProjectRow({ project, index, onSelect }: ProjectRowProps) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <div
      onClick={() => onSelect(project)}
      className="group relative flex flex-col justify-between w-[85vw] sm:w-[78vw] md:w-[68vw] lg:w-[60vw] max-w-4xl shrink-0 rounded-2xl border border-border/80 bg-surface/90 p-6 sm:p-8 backdrop-blur-md shadow-xl transition-all duration-500 hover:border-accent/60 hover:shadow-2xl hover:shadow-accent/5 cursor-pointer"
    >
      {/* Top Header of Card */}
      <div className="flex items-center justify-between border-b border-border/40 pb-5">
        <div className="flex items-center gap-3">
          <span className="font-mono text-lg font-bold text-accent">
            {number}
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {project.category ?? "Project"}
          </span>
        </div>

        {/* View Details Button with Eye Icon & Arrow */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(project);
          }}
          aria-label={`View full details for ${project.title}`}
          className="flex items-center gap-2 rounded-full border border-border/70 bg-surface-strong/60 px-3.5 py-1.5 text-xs font-medium text-foreground transition-all duration-300 group-hover:border-accent group-hover:bg-accent/10 group-hover:text-accent"
        >
          <Eye className="h-3.5 w-3.5 text-muted-foreground transition-colors group-hover:text-accent" />
          <span className="hidden sm:inline">View details</span>
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Main Content Body */}
      <div className="mt-6 grid gap-6 md:grid-cols-[18rem_1fr] lg:grid-cols-[20rem_1fr] md:items-start md:gap-8">
        {/* Visual / Image */}
        <ProjectImage
          src={project.image}
          alt={`${project.title} cover`}
          index={number}
          visualType={project.visualType}
          sizes="(max-width: 768px) 100vw, 20rem"
          className="aspect-[16/10] w-full rounded-xl overflow-hidden [&_img]:transition-transform [&_img]:duration-500 group-hover:[&_img]:scale-105"
        />

        {/* Info */}
        <div className="flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-2xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-accent sm:text-3xl">
              {project.title}
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
              {project.summary}
            </p>
          </div>

          {/* Tech stack */}
          <ul className="flex flex-wrap gap-2 pt-2">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-border/60 bg-surface-strong/40 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-all duration-300 group-hover:border-accent/40 group-hover:text-accent"
              >
                {tech}
              </li>
            ))}
          </ul>

          {project.role && (
            <div className="pt-1 text-xs text-muted-foreground/80">
              <span className="font-mono text-[10px] uppercase text-accent/80 mr-2">Role:</span>
              {project.role}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Footer of Card */}
      <div className="mt-6 flex items-center justify-between border-t border-border/30 pt-4 text-[11px] text-muted-foreground">
        <span className="font-mono uppercase tracking-wider">
          {project.year ?? 2025}
        </span>
        <span className="flex items-center gap-1 font-mono text-accent/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Click to expand <ArrowUpRight className="h-3 w-3" />
        </span>
      </div>
    </div>
  );
}

