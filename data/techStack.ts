import type { TechGroup } from "@/types/experience";

// `icon` values are lucide-react icon names, resolved in the tech-stack UI.
export const TECH_STACK: TechGroup[] = [
  {
    category: "frontend",
    label: "Frontend",
    skills: [
      { name: "React", icon: "Atom", description: "Component-driven UIs." },
      { name: "Next.js", icon: "Triangle", description: "App Router, SSR & RSC." },
      { name: "TypeScript", icon: "FileCode2", description: "Typed, safer code." },
      { name: "JavaScript", icon: "Braces", description: "The language of the web." },
      { name: "Tailwind CSS", icon: "Wind", description: "Utility-first styling." },
      { name: "HTML", icon: "Code2", description: "Semantic markup." },
      { name: "CSS", icon: "Palette", description: "Layout & motion." },
    ],
  },
  {
    category: "backend",
    label: "Backend",
    skills: [
      { name: "Node.js", icon: "Hexagon", description: "Server-side JavaScript." },
      { name: "Express.js", icon: "Route", description: "HTTP APIs & middleware." },
      { name: "REST APIs", icon: "Webhook", description: "Clean, versioned endpoints." },
    ],
  },
  {
    category: "database",
    label: "Data",
    skills: [
      { name: "PostgreSQL", icon: "Database", description: "Relational, robust." },
      { name: "MySQL", icon: "Database", description: "Relational storage." },
      { name: "MongoDB", icon: "Leaf", description: "Document store." },
      { name: "Redis", icon: "Zap", description: "Caching & queues." },
    ],
  },
  {
    category: "tooling",
    label: "Tooling",
    skills: [
      { name: "Git", icon: "GitBranch", description: "Version control." },
      { name: "Docker", icon: "Container", description: "Containerised deploys." },
    ],
  },
];
