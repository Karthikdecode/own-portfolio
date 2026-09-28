import { existsSync } from "node:fs";
import path from "node:path";
import { Download, FileText } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { ASSETS } from "@/lib/constants";

// Detected at build/render time — no broken link if the PDF is absent.
const resumeAvailable = existsSync(
  path.join(process.cwd(), "public", "resume", "resume.pdf"),
);

/** 06 — Resume: download / view with a graceful state when the PDF is missing. */
export function Resume() {
  return (
    <Section id="resume" label="06 — RESUME" size="narrow">
      <Reveal>
        <h2 className="text-display text-[clamp(2rem,6vw,3.75rem)]">
          Want the complete picture?
        </h2>
        <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
          A one-page summary of my experience, skills and selected work.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {resumeAvailable ? (
            <>
              <Button
                href={ASSETS.resume}
                download
                variant="primary"
                icon={<Download className="h-4 w-4" aria-hidden />}
              >
                Download CV
              </Button>
              <Button
                href={ASSETS.resume}
                external
                variant="outline"
                icon={<FileText className="h-4 w-4" aria-hidden />}
              >
                View résumé
              </Button>
            </>
          ) : (
            <>
              <Button
                disabled
                variant="primary"
                icon={<Download className="h-4 w-4" aria-hidden />}
              >
                Download CV
              </Button>
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                Résumé available on request
              </p>
            </>
          )}
        </div>
      </Reveal>
    </Section>
  );
}
