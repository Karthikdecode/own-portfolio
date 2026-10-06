import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { PERSONAL } from "@/data/portfolio";
import { SOCIALS } from "@/data/socials";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="pb-safe border-t border-border py-12">
      <PageContainer className="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-sm font-semibold tracking-[0.2em]">
            {PERSONAL.brand}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            © {year} {PERSONAL.name}. All rights reserved.
          </p>
        </div>

        <ul className="flex items-center gap-3">
          {SOCIALS.map((social) => {
            const external = social.platform !== "email";
            return (
              <li key={social.platform}>
                <Link
                  href={social.href}
                  aria-label={social.label}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground/50 hover:text-foreground"
                >
                  <SocialIcon platform={social.platform} />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Built with Next.js
        </p> */}
      </PageContainer>
    </footer>
  );
}
