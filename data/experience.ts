import type { Experience } from "@/types/experience";

// Placeholder — replace bracketed values with real roles. Do not invent
// employers, dates, or achievements.
export const EXPERIENCES: Experience[] = [
  {
    id: "exp-1",
    role: "[Role]",
    company: "[Company Name]",
    location: "[Location]",
    period: { start: "[Start]", end: null }, // null = present
    summary:
      "Building and maintaining modern web applications across the stack.",
    highlights: [
      "Developed responsive interfaces with React and Next.js.",
      "Built and integrated REST APIs with Node.js and Express.",
      "Worked with relational and document databases.",
    ],
    stack: ["Next.js", "React", "Node.js", "TypeScript", "PostgreSQL"],
  },
  {
    id: "exp-2",
    role: "[Earlier Role]",
    company: "[Company Name]",
    location: "[Location]",
    period: { start: "[Start]", end: "[End]" },
    summary: "Contributed to frontend and backend features on web products.",
    highlights: [
      "Implemented UI components and page layouts.",
      "Assisted with API development and data modelling.",
    ],
    stack: ["React", "JavaScript", "Node.js", "MongoDB"],
  },
];
