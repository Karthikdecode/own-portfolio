import type { ArchitectureLayer } from "@/types/portfolio";

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
    id: "redis",
    label: "Redis",
    description: "Caching and queues to keep hot paths fast under load.",
  },
  {
    id: "database",
    label: "Database",
    description: "Relational (PostgreSQL / MySQL) or document (MongoDB) persistence.",
  },
  {
    id: "deployment",
    label: "Deployment",
    description: "Containerised with Docker and shipped through a CI-friendly workflow.",
  },
];
