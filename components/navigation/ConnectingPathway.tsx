"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useScrollTo } from "@/hooks/useScrollTo";
import { cn } from "@/lib/utils";
import {
  User,
  Code2,
  Briefcase,
  FolderGit2,
  Cpu,
  FileText,
  Mail,
  Zap,
} from "lucide-react";

interface PathwayNode {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const NODES: PathwayNode[] = [
  { id: "hero", label: "Profile", icon: <Zap className="h-3.5 w-3.5" /> },
  { id: "about", label: "About", icon: <User className="h-3.5 w-3.5" /> },
  { id: "stack", label: "Stack", icon: <Code2 className="h-3.5 w-3.5" /> },
  { id: "experience", label: "Experience", icon: <Briefcase className="h-3.5 w-3.5" /> },
  { id: "projects", label: "Projects", icon: <FolderGit2 className="h-3.5 w-3.5" /> },
  { id: "architecture", label: "Architecture", icon: <Cpu className="h-3.5 w-3.5" /> },
  { id: "resume", label: "Resume", icon: <FileText className="h-3.5 w-3.5" /> },
  { id: "contact", label: "Contact", icon: <Mail className="h-3.5 w-3.5" /> },
];

/**
 * Global 3D Glowing Pathway & Section Connection Stream.
 * Renders on the left side rail, connecting sections with a glowing laser stream as user scrolls.
 */
export function ConnectingPathway() {
  const scrollTo = useScrollTo();
  const [activeSection, setActiveSection] = useState<string>("hero");
  const { scrollYProgress } = useScroll();

  // Smooth spring physics for laser line stream
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Track active section using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -40% 0px" }
    );

    NODES.forEach((node) => {
      const el = document.getElementById(node.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-label="Section connection pathway"
      className="hidden xl:flex fixed left-5 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-4 pointer-events-none"
    >
      {/* Laser Pathway Line */}
      <div className="relative flex flex-col items-center h-[65vh]">
        {/* Background circuit track */}
        <div className="absolute inset-y-0 w-[2px] bg-border/40 rounded-full" />

        {/* Glowing Animated Laser Stream */}
        <motion.div
          style={{ scaleY, transformOrigin: "top" }}
          className="absolute inset-y-0 w-[2.5px] bg-gradient-to-b from-accent via-amber-400 to-cyan-400 rounded-full shadow-[0_0_12px_rgba(216,162,74,0.8)]"
        />

        {/* Section Nodes */}
        <div className="relative flex h-full flex-col justify-between items-center py-2">
          {NODES.map((node) => {
            const isActive = activeSection === node.id;
            return (
              <div
                key={node.id}
                className="group relative flex items-center pointer-events-auto cursor-pointer"
                onClick={() => scrollTo(node.id)}
              >
                {/* Node Orb Button */}
                <button
                  type="button"
                  aria-label={`Scroll to ${node.label}`}
                  className={cn(
                    "relative flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-300",
                    isActive
                      ? "border-accent bg-accent text-background shadow-[0_0_16px_rgba(216,162,74,0.9)] scale-110"
                      : "border-border/80 bg-surface/90 text-muted-foreground hover:border-accent/60 hover:text-foreground hover:scale-105"
                  )}
                >
                  {node.icon}
                  {isActive && (
                    <span className="absolute inset-0 rounded-full bg-accent/40 animate-ping pointer-events-none" />
                  )}
                </button>

                {/* Floating Tooltip Label */}
                <span
                  className={cn(
                    "absolute left-10 rounded-md border border-border/80 bg-surface/95 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-foreground shadow-lg backdrop-blur-md transition-all duration-300 pointer-events-none whitespace-nowrap",
                    isActive
                      ? "opacity-100 translate-x-0 border-accent/50 text-accent font-semibold"
                      : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                  )}
                >
                  {node.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
