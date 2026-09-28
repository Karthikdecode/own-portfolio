"use client";

import { PERSONAL } from "@/data/portfolio";

/**
 * Premium monogram fallback for the profile portrait.
 * Shows when /images/profile/profile.webp is not available.
 * Intentionally designed as part of the visual system, not an error state.
 */
export function ProfileFallback() {
  const initial = PERSONAL.name.charAt(0).toUpperCase();

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
      aria-label="Profile placeholder"
    >
      {/* Subtle grainy texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg viewBox=%270 0 200 200%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%274%27 seed=%271%27/%3E%3C/filter%3E%3Crect width=%27200%27 height=%27200%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E')",
          backgroundRepeat: "repeat",
        }}
      />

      {/* Editorial background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 120% at 30% 20%, var(--muted) 0%, var(--surface-strong) 60%, var(--surface) 100%)",
        }}
      />

      {/* Geometric accent element (subtle) */}
      <div
        className="absolute right-0 top-0 h-32 w-32 opacity-[0.08]"
        style={{
          background: "var(--accent)",
          clipPath: "polygon(100% 0, 100% 100%, 0 0)",
        }}
        aria-hidden
      />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-2">
        {/* Large monogram initial */}
        <div className="text-7xl font-bold tracking-tighter text-muted-foreground/50">
          {initial}
        </div>

        {/* Name label */}
        <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground/40">
          {PERSONAL.name.toUpperCase()}
        </div>

        {/* Role label */}
        <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/30">
          {PERSONAL.role}
        </div>
      </div>
    </div>
  );
}
