"use client";

import { HERO_PANELS } from "@/components/hero/HeroTimeline";
import { cn } from "@/lib/utils";

interface HeroInformationProps {
  className?: string;
}

/**
 * Progressive 01 → 04 information panels revealed as the card moves aside.
 * Deliberately terse — headings and short lists, never a wall of text.
 *
 * Rendered fully visible so the panels survive with JavaScript disabled. When
 * the scroll timeline is active, its `fromTo` tweens set the hidden start state
 * during useLayoutEffect — before the browser paints — so there is no flash.
 */
export function HeroInformation({ className }: HeroInformationProps) {
  return (
    <ul
      className={cn(
        "grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4 sm:gap-x-8",
        className,
      )}
    >
      {HERO_PANELS.map((panel) => (
        <li
          key={panel.index}
          data-hero="panel"
          className="border-t border-border pt-3"
        >
          <p className="font-mono text-[10px] tracking-[0.3em] text-accent">
            {panel.index}
          </p>
          <h3 className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            {panel.title}
          </h3>
          <ul className="mt-2.5 space-y-1">
            {panel.lines.map((line) => (
              <li key={line} className="text-sm leading-snug text-foreground">
                {line}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
