import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SITE_URL } from "@/lib/constants";

/** Merge Tailwind classes with conditional logic, resolving conflicts. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Clamp a number to the [min, max] range. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Linearly map a value from one range to another. */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number {
  if (inMax === inMin) return outMin;
  return outMin + ((value - inMin) * (outMax - outMin)) / (inMax - inMin);
}

/** Format seconds as m:ss (e.g. 8 -> "0:08"), used by the voice control. */
export function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

/** Build an absolute URL from a path, using the configured site URL. */
export function absoluteUrl(path = ""): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
