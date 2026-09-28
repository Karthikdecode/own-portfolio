"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ARCHITECTURE } from "@/data/architecture";
import { cn } from "@/lib/utils";

/** Interactive vertical data-flow. Hover/focus a layer to emphasise it. */
export function ArchitectureFlow() {
  const [active, setActive] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative mx-auto max-w-2xl">
      <div
        aria-hidden
        className="absolute bottom-6 left-[23px] top-6 w-px bg-border"
      />
      {!reducedMotion && (
        <motion.span
          aria-hidden
          className="absolute left-[23px] h-16 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-accent to-transparent"
          initial={{ top: "0%" }}
          animate={{ top: ["0%", "92%"] }}
          transition={{ duration: 4, ease: "linear", repeat: Infinity }}
        />
      )}

      <ul className="space-y-3">
        {ARCHITECTURE.map((layer, index) => {
          const isActive = active === layer.id;
          return (
            <li key={layer.id}>
              <Reveal delay={index * 0.04}>
                <div
                  tabIndex={0}
                  onMouseEnter={() => setActive(layer.id)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(layer.id)}
                  onBlur={() => setActive(null)}
                  className={cn(
                    "relative flex gap-4 rounded-xl border p-4 outline-none transition-colors",
                    isActive
                      ? "border-accent bg-surface"
                      : "border-border bg-transparent",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "relative z-10 mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border bg-background transition-colors",
                      isActive ? "border-accent" : "border-border",
                    )}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full transition-colors",
                        isActive ? "bg-accent" : "bg-border",
                      )}
                    />
                  </span>
                  <div>
                    <p className="font-mono text-sm font-semibold uppercase tracking-widest text-foreground">
                      {layer.label}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {layer.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
