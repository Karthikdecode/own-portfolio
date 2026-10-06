/** A period of work. `end` omitted / null means "present". */
export interface Period {
  /** Year or ISO-ish start, e.g. "2024". */
  start: string;
  end?: string | null;
}

export interface Experience {
  id: string;
  role: string;
  company?: string;
  location?: string;
  period: Period;
  summary: string;
  highlights: string[];
  stack: string[];
}

/** Grouping key for the tech-stack section. */
export type TechCategory =
  | "frontend"
  | "backend"
  | "database"
  | "security"
  | "devops"
  | "tooling";

export interface TechSkill {
  name: string;
  /** Icon key (a lucide-react icon name) resolved by the UI layer. */
  icon?: string;
  /** Short hover description. */
  description?: string;
  /** Optional proficiency 0-100 for meters (kept optional to avoid inventing data). */
  level?: number;
}

export interface TechGroup {
  category: TechCategory;
  label: string;
  skills: TechSkill[];
}
