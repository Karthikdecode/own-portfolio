import type { Period } from "@/types/experience";

export interface Education {
  id: string;
  /** Degree or qualification, e.g. "M.Sc. in Computer Science". */
  qualification: string;
  institution: string;
  location?: string;
  period: Period;
  /** Result as awarded, e.g. "81.07%". Omit rather than estimate. */
  score?: string;
  /** Key subjects or areas covered. */
  focus?: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
}
