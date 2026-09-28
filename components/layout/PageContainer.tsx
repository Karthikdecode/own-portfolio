import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerSize = "narrow" | "default" | "wide" | "full";

/** Max-width per size — capped so content never stretches on ultra-wide screens. */
const SIZE_MAX_WIDTH: Record<ContainerSize, string> = {
  narrow: "max-w-3xl", // ~768px — prose / forms
  default: "max-w-6xl", // ~1152px — most sections
  wide: "max-w-[90rem]", // 1440px — cinematic sections
  full: "max-w-none", // full-bleed
};

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  id?: string;
  size?: ContainerSize;
}

/**
 * Width-constraining wrapper with responsive, safe-area-aware horizontal padding
 * (`container-px`). Use across every section for a consistent responsive gutter.
 */
export function PageContainer({
  children,
  className,
  id,
  size = "default",
}: PageContainerProps) {
  return (
    <div
      id={id}
      className={cn(
        "container-px mx-auto w-full",
        SIZE_MAX_WIDTH[size],
        className,
      )}
    >
      {children}
    </div>
  );
}
