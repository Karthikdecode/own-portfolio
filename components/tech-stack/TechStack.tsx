"use client";

import {
  Atom,
  Braces,
  Code2,
  Container,
  Database,
  FileCode2,
  GitBranch,
  Hexagon,
  Leaf,
  Palette,
  Route,
  Triangle,
  Webhook,
  Wind,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { TECH_STACK } from "@/data/techStack";

const ICONS: Record<string, LucideIcon> = {
  Atom,
  Triangle,
  FileCode2,
  Braces,
  Wind,
  Code2,
  Palette,
  Hexagon,
  Route,
  Webhook,
  Database,
  Leaf,
  Zap,
  GitBranch,
  Container,
};

/** 02 — Stack: editorial, responsive grid grouped by discipline. */
export function TechStack() {
  return (
    <Section id="tech-stack" label="02 — STACK" title="Tools I build with">
      <div className="space-y-12">
        {TECH_STACK.map((group) => (
          <Reveal key={group.category}>
            <div className="grid gap-5 border-t border-border pt-8 sm:grid-cols-[9rem_1fr] sm:gap-8">
              <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                {group.label}
              </h3>
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {group.skills.map((skill) => {
                  const Icon = skill.icon ? ICONS[skill.icon] : undefined;
                  return (
                    <li
                      key={skill.name}
                      className="group relative rounded-xl border border-border bg-surface/50 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:bg-surface hover:shadow-lg"
                    >
                      <div className="flex items-center gap-2.5">
                        {Icon ? (
                          <Icon className="h-[18px] w-[18px] shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:text-accent" aria-hidden />
                        ) : null}
                        <span className="text-sm font-medium transition-colors duration-300 group-hover:text-accent">
                          {skill.name}
                        </span>
                      </div>
                      {/*
                        Visible by default so touch devices — which never fire
                        hover — always show the description. Only pointer devices
                        get the hover reveal.
                      */}
                      {skill.description ? (
                        <p className="mt-2 text-xs leading-relaxed text-muted-foreground transition-opacity duration-300 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100">
                          {skill.description}
                        </p>
                      ) : null}
                      {/* Subtle accent line on hover */}
                      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full rounded-b-xl" aria-hidden />
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
