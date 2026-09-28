"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useMounted } from "@/hooks/useMounted";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

/** Accessible light/dark toggle. Renders a neutral icon until mounted (no FOUC). */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={
        mounted
          ? isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
          : "Toggle theme"
      }
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-surface-strong",
        className,
      )}
    >
      {mounted ? (
        isDark ? (
          <Sun className="h-[18px] w-[18px]" aria-hidden />
        ) : (
          <Moon className="h-[18px] w-[18px]" aria-hidden />
        )
      ) : (
        <span className="h-[18px] w-[18px]" aria-hidden />
      )}
    </button>
  );
}
