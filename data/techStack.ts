import type { TechGroup } from "@/types/experience";

// `icon` values are lucide-react icon names, resolved in the tech-stack UI.
export const TECH_STACK: TechGroup[] = [
  {
    category: "frontend",
    label: "Frontend & Mobile",
    skills: [
      { name: "React", icon: "Atom", description: "Component-driven UIs." },
      { name: "Next.js", icon: "Triangle", description: "App Router, SSR & RSC." },
      {
        name: "React Native",
        icon: "Smartphone",
        description: "Cross-platform mobile apps.",
      },
      { name: "TypeScript", icon: "FileCode2", description: "Typed, safer code." },
      { name: "JavaScript", icon: "Braces", description: "The language of the web." },
      { name: "Tailwind CSS", icon: "Wind", description: "Utility-first styling." },
      { name: "Material UI", icon: "Component", description: "Component library." },
      { name: "HTML5", icon: "Code2", description: "Semantic markup." },
      { name: "CSS3", icon: "Palette", description: "Layout & motion." },
    ],
  },
  {
    category: "backend",
    label: "Backend",
    skills: [
      { name: "Node.js", icon: "Hexagon", description: "Server-side JavaScript." },
      { name: "Express.js", icon: "Route", description: "HTTP APIs & middleware." },
      { name: "REST APIs", icon: "Webhook", description: "Clean, versioned endpoints." },
      {
        name: "Socket.IO",
        icon: "RadioTower",
        description: "Real-time WebSocket streams.",
      },
      {
        name: "Microservices",
        icon: "Network",
        description: "Service-oriented backends.",
      },
      {
        name: "Razorpay",
        icon: "CreditCard",
        description: "Payment gateway integration.",
      },
    ],
  },
  {
    category: "database",
    label: "Data & ORM",
    skills: [
      { name: "PostgreSQL", icon: "Database", description: "Relational, robust." },
      { name: "MongoDB", icon: "Leaf", description: "Document store." },
      { name: "Supabase", icon: "Boxes", description: "Postgres platform & auth." },
      { name: "Prisma", icon: "Layers", description: "Type-safe data access." },
      { name: "TypeORM", icon: "Table2", description: "Entity mapping for SQL." },
      {
        name: "Query Optimisation",
        icon: "Zap",
        description: "Indexing for fast reads.",
      },
    ],
  },
  {
    category: "security",
    label: "Auth & Security",
    skills: [
      { name: "JWT", icon: "KeyRound", description: "Stateless session tokens." },
      { name: "OAuth 2.0", icon: "ShieldCheck", description: "Delegated access." },
      { name: "RBAC", icon: "UserCheck", description: "Role-based permissions." },
      { name: "bcrypt", icon: "Lock", description: "Password hashing." },
    ],
  },
  {
    category: "devops",
    label: "Cloud & DevOps",
    skills: [
      { name: "AWS", icon: "Cloud", description: "EC2 & S3 deployments." },
      { name: "Vercel", icon: "Triangle", description: "Frontend hosting." },
      { name: "Git", icon: "GitBranch", description: "Version control." },
      { name: "GitHub", icon: "GitFork", description: "Code hosting & review." },
      { name: "CI/CD", icon: "Workflow", description: "Automated delivery." },
    ],
  },
  {
    category: "tooling",
    label: "Tooling",
    skills: [
      { name: "Postman", icon: "Send", description: "API testing." },
      { name: "VS Code", icon: "Code2", description: "Daily driver." },
      { name: "Agile / Scrum", icon: "SquareKanban", description: "Iterative delivery." },
    ],
  },
];
