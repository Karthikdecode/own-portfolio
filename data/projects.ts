import type { Project } from "@/types/project";

// Sample projects representing the kind of work a full-stack developer builds.
// Replace titles, copy and links with real projects — do not add fake metrics,
// clients or results. Images live in /public/images/projects/ (a designed
// placeholder is shown until the real cover image is added).
export const PROJECTS: Project[] = [
  {
    id: "project-1",
    slug: "full-stack-platform",
    title: "Full-Stack Web Platform",
    summary:
      "An end-to-end web application with authentication, a REST API and a relational database.",
    description:
      "A complete web platform built from the interface down to the data layer — server-rendered pages, a typed API, and a PostgreSQL database.",
    category: "full-stack",
    stack: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL"],
    links: {},
    visualType: "browser",
    year: 2025,
    featured: true,
    role: "Full-Stack Developer",
    challenge:
      "Deliver a cohesive product across frontend and backend without the two drifting apart.",
    solution:
      "A single typed codebase with shared models, server components for data, and a clear API boundary.",
    features: [
      "Authentication & protected routes",
      "Typed REST API",
      "Relational data model",
      "Responsive, accessible UI",
    ],
    architecture: "Next.js → API routes → Node service → PostgreSQL",
  },
  {
    id: "project-2",
    slug: "rest-api-service",
    title: "REST API Service",
    summary:
      "A well-structured backend service with caching and clean, versioned endpoints.",
    description:
      "A backend-focused service exposing a documented REST API, with Redis caching for hot paths and a document database for flexible data.",
    category: "backend",
    stack: ["Node.js", "Express.js", "MongoDB", "Redis"],
    links: {},
    visualType: "api",
    year: 2025,
    featured: true,
    role: "Backend Developer",
    challenge: "Keep response times low under repeated, read-heavy requests.",
    solution:
      "A caching layer with Redis in front of the database and consistent error handling across endpoints.",
    features: [
      "Versioned REST endpoints",
      "Redis caching",
      "Validation & error handling",
      "Document data model",
    ],
    architecture: "Client → Express API → Redis cache → MongoDB",
  },
  {
    id: "project-3",
    slug: "interactive-dashboard",
    title: "Interactive Dashboard",
    summary:
      "A responsive dashboard turning data into clear, interactive visualisations.",
    description:
      "A data-driven dashboard with a fast, responsive frontend and an API that aggregates and serves the underlying data.",
    category: "web",
    stack: ["Next.js", "React", "TypeScript", "Node.js"],
    links: {},
    visualType: "dashboard",
    year: 2024,
    role: "Full-Stack Developer",
    challenge: "Present dense data without overwhelming the interface.",
    solution:
      "A calm, editorial layout with progressive disclosure and responsive charts.",
    features: [
      "Responsive data views",
      "Aggregation API",
      "Light & dark themes",
      "Keyboard-accessible controls",
    ],
    architecture: "Next.js UI → aggregation API → data source",
  },
];
