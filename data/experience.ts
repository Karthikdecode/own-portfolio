import type { Experience } from "@/types/experience";

export const EXPERIENCES: Experience[] = [
  {
    id: "exp-skandavel",
    role: "Full-Stack Developer — Mobile App",
    company: "Skandavel Webtech Pvt",
    location: "Madurai, India",
    period: { start: "Sep 2025", end: null }, // null = present
    summary:
      "Building and maintaining the backend behind the Velaan-Bay platform, working directly with UK-based clients on live production systems.",
    highlights: [
      "Develop and maintain scalable backend services and REST APIs with Node.js and Express.js.",
      "Manage both PostgreSQL and MongoDB databases for data integrity, performance and scalability.",
      "Implement secure authentication with JWT and role-based access control.",
      "Deploy and manage backend applications on AWS EC2 and S3.",
      "Work directly with UK-based clients to gather requirements, ship hotfixes and support live production.",
    ],
    stack: ["Node.js", "Express.js", "PostgreSQL", "MongoDB", "AWS", "React Native"],
  },
  {
    id: "exp-infinitelyf",
    role: "Full-Stack Developer",
    company: "Infinitelyf",
    location: "Madurai, India",
    period: { start: "Jul 2025", end: "Sep 2025" },
    summary:
      "Delivered end-to-end product features alongside the UI/UX team, from design hand-off through to deployment.",
    highlights: [
      "Built end-to-end full-stack modules with React.js, Next.js, Node.js and Supabase.",
      "Collaborated with UI/UX teams to take complete features from design to deployment.",
    ],
    stack: ["React", "Next.js", "Node.js", "Supabase"],
  },
];
