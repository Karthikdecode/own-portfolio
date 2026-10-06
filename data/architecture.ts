import type { ArchitectureLayer } from "@/types/portfolio";

/** How the stack below gets designed and delivered. */
export const ARCHITECTURE_APPROACH = {
  intro:
    "Before any of this gets written, it gets designed — and it ships in small, reviewable increments.",
  practices: [
    {
      id: "system-design",
      label: "System design",
      description:
        "I start from the data model and the access patterns: what entities exist, who is allowed to touch them, and which queries have to stay fast. Service boundaries, API contracts and indexing decisions come out of that, not after it.",
    },
    {
      id: "agile",
      label: "Agile delivery",
      description:
        "Work runs in Scrum sprints — planning, stand-ups and reviews — so features land in small increments that clients can see and correct early. On live products that means hotfixes ship without waiting for a release window.",
    },
  ],
} as const;

// The full-stack flow shown in "How I build". Hovering a layer reveals its note.
export const ARCHITECTURE: ArchitectureLayer[] = [
  {
    id: "user",
    label: "User",
    description: "A person on any device, from a 320px phone to an ultra-wide display.",
  },
  {
    id: "nextjs",
    label: "Next.js",
    description: "App Router, server components and routing — the application shell.",
  },
  {
    id: "react",
    label: "React",
    description: "Composable, accessible UI with intentional, reduced-motion-aware animation.",
  },
  {
    id: "api",
    label: "API Layer",
    description: "Typed, validated REST endpoints — the contract between client and server.",
  },
  {
    id: "node",
    label: "Node.js / Express",
    description: "Business logic, authentication and integrations on the server.",
  },
  {
    id: "auth",
    label: "Auth & Access",
    description: "JWT sessions and role-based access control, enforced at the API boundary.",
  },
  {
    id: "orm",
    label: "Prisma / TypeORM",
    description: "Typed data access and schema modelling over the database.",
  },
  {
    id: "database",
    label: "Database",
    description: "Relational (PostgreSQL) or document (MongoDB) persistence, indexed for fast reads.",
  },
  {
    id: "deployment",
    label: "Deployment",
    description: "Backend on AWS EC2 and S3, frontends on Vercel, shipped through Git.",
  },
];
