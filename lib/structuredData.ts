import { ASSETS, SITE_CONFIG, SITE_URL } from "@/lib/constants";
import { PERSONAL } from "@/data/portfolio";
import { SOCIALS } from "@/data/socials";
import { EDUCATION } from "@/data/education";

/**
 * Schema.org JSON-LD for the homepage: a ProfilePage about a Person, inside a
 * WebSite. Every value is sourced from the résumé / portfolio data — nothing
 * here is added purely for rich results (no ratings, awards or credentials).
 */
export function buildStructuredData() {
  const personId = `${SITE_URL}/#person`;
  const websiteId = `${SITE_URL}/#website`;

  // Degree-level education only; schools are not useful entity links.
  const colleges = EDUCATION.filter((entry) => /\b(M|B)\.Sc\./.test(entry.qualification));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: PERSONAL.name,
        url: `${SITE_URL}/`,
        image: `${SITE_URL}${ASSETS.portrait}`,
        jobTitle: SITE_CONFIG.jobTitle,
        description: PERSONAL.bio,
        email: `mailto:${PERSONAL.email}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Madurai",
          addressRegion: "Tamil Nadu",
          addressCountry: "IN",
        },
        worksFor: {
          "@type": "Organization",
          name: "Skandavel Webtech Pvt",
        },
        alumniOf: colleges.map((entry) => ({
          "@type": "CollegeOrUniversity",
          name: entry.institution,
        })),
        sameAs: SOCIALS.filter((social) => social.platform !== "email").map(
          (social) => social.href,
        ),
        knowsAbout: [
          "Full Stack Development",
          "Node.js",
          "Express.js",
          "NestJS",
          "React.js",
          "Next.js",
          "React Native",
          "JavaScript",
          "TypeScript",
          "PostgreSQL",
          "MongoDB",
          "Supabase",
          "Prisma",
          "TypeORM",
          "REST APIs",
          "WebSockets",
          "Socket.IO",
          "JWT",
          "OAuth 2.0",
          "Role-Based Access Control",
          "Microservices",
          "AWS EC2",
          "AWS S3",
        ],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: `${SITE_URL}/`,
        name: `${PERSONAL.name} — Portfolio`,
        inLanguage: "en",
        author: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profilepage`,
        url: `${SITE_URL}/`,
        name: SITE_CONFIG.title,
        description: SITE_CONFIG.description,
        inLanguage: "en",
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
      },
    ],
  };
}
