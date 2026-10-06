export type ProjectCategory =
  | "web"
  | "full-stack"
  | "frontend"
  | "backend"
  | "experiment";

export interface ProjectLink {
  live?: string;
  repo?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  /** One-line summary shown in the project row. */
  summary: string;
  /** Longer description for the detail view ("What I built"). */
  description?: string;
  category: ProjectCategory;
  /** Technologies used, e.g. ["Next.js", "Node.js"]. */
  stack: string[];
  links: ProjectLink;
  /** Public path to a cover image, e.g. "/images/projects/foo.webp". */
  image?: string;
  /** Visual type for fallback when no image is present. */
  visualType?: "browser" | "api" | "dashboard";
  /** Short availability note, e.g. "Available on Play Store". */
  badge?: string;
  /** Release / build year. */
  year?: number;
  featured?: boolean;

  // --- Detail view fields (optional; render only when present) ---
  role?: string;
  challenge?: string;
  solution?: string;
  features?: string[];
  architecture?: string;
}
