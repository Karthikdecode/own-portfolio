import { Download, FileText } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { ASSETS } from "@/lib/constants";

/** 07 — Resume: view or download the CV hosted on Google Drive. */
export function Resume() {
  return (
    <Section id="resume" label="07 — RESUME" size="narrow">
      <Reveal>
        <h2 className="text-display text-[clamp(2rem,6vw,3.75rem)]">
          Want the complete picture?
        </h2>
        <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
          A one-page summary of my experience, skills and selected work.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button
            href={ASSETS.resume}
            external
            variant="primary"
            icon={<FileText className="h-4 w-4" aria-hidden />}
          >
            View résumé
          </Button>
          <Button
            href={ASSETS.resumeDownload}
            external
            variant="outline"
            icon={<Download className="h-4 w-4" aria-hidden />}
          >
            Download CV
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
