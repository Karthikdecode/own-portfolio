import type { ReactNode } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

type ContainerSize = "narrow" | "default" | "wide" | "full";

interface SectionProps {
  id: string;
  /** Editorial overline, e.g. "02 — STACK". */
  label?: string;
  /** Section heading. */
  title?: ReactNode;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  size?: ContainerSize;
  /** When false, renders no PageContainer (for full-bleed sections). */
  contained?: boolean;
  /** Which edge the editorial header sits against. Lets sections alternate. */
  align?: "left" | "right";
}

/** Consistent section shell: anchor id, vertical rhythm, editorial header. */
export function Section({
  id,
  label,
  title,
  children,
  className,
  containerClassName,
  size = "default",
  contained = true,
  align = "left",
}: SectionProps) {
  const alignRight = align === "right";
  const header = (label || title) && (
    <Reveal className={cn("mb-10 md:mb-16", alignRight && "md:text-right")}>
      {label && (
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          {label}
        </p>
      )}
      {title && (
        <h2
          className={cn(
            "mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl",
            alignRight && "md:ml-auto",
          )}
        >
          {title}
        </h2>
      )}
    </Reveal>
  );

  return (
    <section
      id={id}
      className={cn("scroll-mt-24 py-24 md:py-32", className)}
    >
      {contained ? (
        <PageContainer size={size} className={containerClassName}>
          {header}
          {children}
        </PageContainer>
      ) : (
        <>
          {header && (
            <PageContainer size={size} className={containerClassName}>
              {header}
            </PageContainer>
          )}
          {children}
        </>
      )}
    </section>
  );
}
