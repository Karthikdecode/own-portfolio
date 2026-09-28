"use client";

import Image from "next/image";
import { useState } from "react";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { cn } from "@/lib/utils";

interface ProjectImageProps {
  src?: string;
  alt: string;
  /** Two-digit label shown in fallbacks. */
  index: string;
  /** Visual type for the fallback design. */
  visualType?: "browser" | "api" | "dashboard";
  className?: string;
  sizes?: string;
}

/**
 * Project cover with designed fallback visuals.
 * Shows real image when available; falls back to ProjectVisual.
 * No broken images, no error states.
 */
export function ProjectImage({
  src,
  alt,
  index,
  visualType = "browser",
  className,
  sizes,
}: ProjectImageProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <div className={cn("relative overflow-hidden bg-surface-strong", className)}>
      {/* Show real image if available */}
      {showImage ? (
        <Image
          src={src as string}
          alt={alt}
          fill
          sizes={sizes ?? "(max-width: 768px) 100vw, 20rem"}
          className="object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        /* Fallback to designed visual */
        <ProjectVisual
          visualType={visualType}
          projectNumber={index}
          className="h-full w-full"
        />
      )}
    </div>
  );
}
