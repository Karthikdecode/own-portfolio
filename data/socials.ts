import type { SocialLink } from "@/types/portfolio";

// Replace hrefs/handles with real profiles. `icon` maps to a lucide-react name.
export const SOCIALS: SocialLink[] = [
  {
    platform: "github",
    label: "GitHub",
    href: "https://github.com/", // TODO: real profile URL
    icon: "Github",
    handle: "@karthik",
  },
  {
    platform: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/karthik-p-73b241200/",
    icon: "Linkedin",
    handle: "in/karthik-p-73b241200",
  },
  {
    platform: "email",
    label: "Email",
    href: "mailto:hello@karthik.dev", // TODO: real contact email
    icon: "Mail",
    handle: "hello@karthik.dev",
  },
];
