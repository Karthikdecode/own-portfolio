import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { ContactForm } from "@/components/contact/ContactForm";
import { PERSONAL } from "@/data/portfolio";
import { SOCIALS } from "@/data/socials";
import { EASE_OUT } from "@/lib/motion";

// Blur-to-sharp reveal for the big "Let's talk." heading.
const blurReveal = {
  hidden: { opacity: 0, y: 24, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE_OUT },
  },
};

/** 07 — Contact: whitespace-driven ending with details + a working form. */
export function Contact() {
  return (
    <Section id="contact" label="07 — CONTACT">
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <Reveal variants={blurReveal}>
            <h2 className="text-display text-[clamp(3.5rem,14vw,8rem)] leading-[0.9]">
              Let&apos;s <span className="text-accent">talk.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-8 max-w-lg text-base leading-relaxed text-muted-foreground">
              Have an idea, project, or opportunity? I&apos;m always interested in discussing new challenges and collaborating on meaningful work.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 space-y-4">
              <Button href={`mailto:${PERSONAL.email}`} external variant="primary">
                Get in touch
              </Button>
              <p className="text-sm text-muted-foreground">
                or email me directly at{" "}
                <a
                  href={`mailto:${PERSONAL.email}`}
                  className="font-mono text-accent hover:underline"
                >
                  {PERSONAL.email}
                </a>
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <ul className="mt-12 space-y-3">
              {SOCIALS.map((social) => {
                const external = social.platform !== "email";
                return (
                  <li key={social.platform}>
                    <Link
                      href={social.href}
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="group inline-flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors group-hover:border-foreground/50">
                        <SocialIcon platform={social.platform} className="h-4 w-4" />
                      </span>
                      <span>{social.handle ?? social.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
