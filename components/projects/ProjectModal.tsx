"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { EASE_OUT } from "@/lib/motion";
import type { Project } from "@/types/project";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

function DetailBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
        {label}
      </h3>
      <div className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </div>
  );
}

/** Accessible project detail dialog (focus trap, Escape, scroll lock). */
export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    body.style.overflow = "hidden";
    const panel = panelRef.current;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      const focusables = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    panel?.querySelector<HTMLElement>("button, a[href]")?.focus();

    return () => {
      body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  const hasLinks = Boolean(project.links.live || project.links.repo);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6"
    >
      <motion.button
        type="button"
        tabIndex={-1}
        aria-hidden
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-background/70 backdrop-blur-sm"
      />

      <motion.div
        ref={panelRef}
        data-lenis-prevent
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4, ease: EASE_OUT }}
        className="pb-safe relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl border border-border bg-surface p-6 shadow-2xl sm:rounded-2xl sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>

        <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          {project.year ?? ""}
          {project.role ? ` · ${project.role}` : ""}
        </p>
        <h2
          id="project-modal-title"
          className="mt-2 max-w-[85%] text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          {project.title}
        </h2>
        {project.badge && (
          <p className="mt-2 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-accent">
            {project.badge}
          </p>
        )}

        <div className="mt-6 space-y-6">
          {project.description && (
            <DetailBlock label="What I built">{project.description}</DetailBlock>
          )}
          {project.challenge && (
            <DetailBlock label="Challenge">{project.challenge}</DetailBlock>
          )}
          {project.solution && (
            <DetailBlock label="Solution">{project.solution}</DetailBlock>
          )}
          {project.features && project.features.length > 0 && (
            <DetailBlock label="Features">
              <ul className="space-y-2">
                {project.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <span
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                      aria-hidden
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </DetailBlock>
          )}
          {project.architecture && (
            <DetailBlock label="Architecture">
              <code className="font-mono text-xs text-foreground">
                {project.architecture}
              </code>
            </DetailBlock>
          )}

          <DetailBlock label="Tech stack">
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </DetailBlock>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {project.links.live && (
            <Button
              href={project.links.live}
              external
              variant="primary"
              icon={<ExternalLink className="h-4 w-4" aria-hidden />}
            >
              Live demo
            </Button>
          )}
          {project.links.repo && (
            <Button
              href={project.links.repo}
              external
              variant="outline"
              icon={<SocialIcon platform="github" className="h-4 w-4" />}
            >
              Source
            </Button>
          )}
          {!hasLinks && (
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Links available on request
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
