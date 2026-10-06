"use client";

import { ArrowUpRight } from "lucide-react";
import { ProjectImage } from "@/components/projects/ProjectImage";
import type { Project } from "@/types/project";

interface ProjectRowProps {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
}

/**
 * Large editorial project row. Hover animates image, title and arrow.
 *
 * The detail trigger is an overlay button covering the row, so the live-site
 * link can sit inside the row as a real anchor — a nested <a> inside a <button>
 * would be invalid markup.
 */
export function ProjectRow({ project, index, onSelect }: ProjectRowProps) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <div className="group relative border-t border-border py-8 md:py-10">
      {/* Full-row trigger for the detail modal */}
      <button
        type="button"
        onClick={() => onSelect(project)}
        className="absolute inset-0 z-0 h-full w-full cursor-pointer text-left"
      >
        <span className="sr-only">View project details: {project.title}</span>
      </button>

      <div className="pointer-events-none relative grid gap-5 lg:grid-cols-[auto_20rem_1fr_auto] lg:items-start lg:gap-8">
        {/* Project number */}
        <span className="font-mono text-sm font-semibold text-accent md:text-base">
          {number}
        </span>

        {/* Project image with enhanced hover */}
        <ProjectImage
          src={project.image}
          alt={`${project.title} cover`}
          index={number}
          visualType={project.visualType}
          sizes="(max-width: 768px) 100vw, 20rem"
          className="aspect-[16/10] w-full rounded-xl overflow-hidden [&_img]:transition-transform [&_img]:duration-500 group-hover:[&_img]:scale-110 lg:w-80"
        />

        {/* Project information */}
        <div className="space-y-4">
          <div>
            <h3 className="text-2xl font-semibold tracking-tight transition-all duration-300 group-hover:text-accent sm:text-3xl">
              {project.title}
            </h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
              {project.summary}
            </p>
          </div>

          {/* Enhanced tech stack display */}
          <ul className="flex flex-wrap gap-2 pt-2">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-border/60 bg-surface/50 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-all duration-300 group-hover:border-accent/50 group-hover:bg-accent/10 group-hover:text-accent/80"
              >
                {tech}
              </li>
            ))}
          </ul>

          {/* Live site link, or an availability note when there is no URL */}
          {project.links.live ? (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => event.stopPropagation()}
              className="pointer-events-auto relative z-10 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-accent underline-offset-4 hover:underline"
            >
              Visit live site
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </a>
          ) : project.badge ? (
            <p className="inline-flex items-center rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-accent">
              {project.badge}
            </p>
          ) : null}

          {/*
            Shown by default so touch devices always see these details; only
            pointer devices get the hover reveal.
          */}
          {(project.role || project.features) && (
            <div className="mt-3 max-h-32 space-y-2 overflow-hidden text-xs text-muted-foreground transition-all duration-300 [@media(hover:hover)]:max-h-0 [@media(hover:hover)]:group-hover:max-h-32">
              {project.role && (
                <p className="transition-opacity delay-100 duration-300 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100">
                  {project.role}
                </p>
              )}
              {project.features && project.features.length > 0 && (
                <p className="transition-opacity delay-150 duration-300 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100">
                  {project.features.slice(0, 2).join(" • ")}
                </p>
              )}
            </div>
          )}
        </div>

        {/* CTA arrow with enhanced animation */}
        <ArrowUpRight
          className="hidden h-6 w-6 text-muted-foreground transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent lg:block"
          aria-hidden
        />
      </div>
    </div>
  );
}
