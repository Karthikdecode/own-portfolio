import type { Project } from "@/types/project";

// Real shipped work. Add `image: "/images/projects/<file>.webp"` to any entry to
// replace the generated visual with a real cover; `visualType` is the fallback.
export const PROJECTS: Project[] = [
  {
    id: "project-velaan",
    slug: "velaan-bay-cargo",
    title: "Velaan Bay & Velaan Cargo",
    summary:
      "An agri-commerce marketplace and a rural logistics app connecting farmers directly with buyers and drivers.",
    description:
      "Two linked products for rural agriculture. Velaan Bay is a direct farmer-to-buyer marketplace; Velaan Cargo handles the consignment booking and tracking that moves the produce.",
    category: "full-stack",
    stack: ["React Native", "Next.js", "Node.js", "PostgreSQL", "AWS"],
    links: {},
    visualType: "browser",
    badge: "Available on Play Store",
    year: 2025,
    featured: true,
    role: "Full-Stack Developer",
    challenge:
      "Farmers sold through middlemen without reliable price information, and moving produce to market meant ad-hoc transport arrangements.",
    solution:
      "A marketplace where farmers list produce with quantity, price and specifications and buyers purchase directly, paired with a cargo app that handles booking, quotations and tracking end to end.",
    features: [
      "Direct farmer-to-buyer listings with quantity, price and specifications",
      "Daily market price updates so farmers can price produce confidently",
      "Shared Hire and Fixed Hire cargo booking with driver quotations",
      "Auto-generated invoices and SMS/app notifications",
      "Farm-to-mandi consignment tracking",
      "Vehicle, driver and request management for fleet owners",
    ],
    architecture: "React Native + Next.js → Node.js API → PostgreSQL → AWS (EC2, S3)",
  },
  {
    id: "project-construct-solutions",
    slug: "construct-solutions",
    title: "Construct Solutions",
    summary:
      "A construction management ERP with multi-tenant access control and reporting APIs.",
    description:
      "An ERP platform that manages construction business workflows, built for multiple tenants sharing one deployment without sharing data.",
    category: "full-stack",
    stack: ["Node.js", "Express.js", "TypeScript", "PostgreSQL", "React"],
    links: { live: "https://construct-solutions-web.vercel.app/" },
    visualType: "dashboard",
    year: 2025,
    featured: true,
    role: "Full-Stack Developer",
    challenge:
      "Multiple construction businesses needed to run on one platform while keeping their data strictly isolated from each other.",
    solution:
      "Role-based access control layered over a multi-tenant architecture, enforcing data isolation at the access layer rather than per-feature.",
    features: [
      "Construction business workflow management",
      "Role-based access control across a multi-tenant architecture",
      "Secure per-tenant data isolation",
      "Reporting and analytics APIs for business insight",
    ],
    architecture: "React → Express API (TypeScript) → PostgreSQL",
  },
  {
    id: "project-crypto-dashboard",
    slug: "crypto-market-dashboard",
    title: "Crypto Market Dashboard",
    summary:
      "A real-time cryptocurrency tracker streaming live market data over WebSockets.",
    description:
      "A market dashboard backed by WebSocket streams for live pricing and REST endpoints for market data and user watchlists.",
    category: "backend",
    stack: ["Node.js", "Express.js", "Socket.IO", "PostgreSQL", "React"],
    links: { live: "https://crypto-market-dashboard-sage.vercel.app/" },
    visualType: "api",
    year: 2025,
    role: "Full-Stack Developer",
    challenge:
      "Live market data had to reach the client continuously while read-heavy market and watchlist endpoints stayed responsive.",
    solution:
      "WebSocket APIs for the live stream, separate high-performance REST endpoints for market data and watchlists, and query and index tuning to bring response times down.",
    features: [
      "Real-time WebSocket APIs streaming live cryptocurrency data",
      "High-performance REST APIs for market data",
      "User watchlists",
      "Query and index optimisation to reduce response time",
    ],
    architecture: "React → Socket.IO stream + Express REST API → PostgreSQL",
  },
];
