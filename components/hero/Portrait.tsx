"use client";

import Image from "next/image";
import { useState } from "react";
import { ProfileFallback } from "@/components/hero/ProfileFallback";
import { PERSONAL } from "@/data/portfolio";
import { cn } from "@/lib/utils";

interface PortraitProps {
  /**
   * Whether the portrait file exists in /public, resolved on the server.
   * When false the <Image> is never mounted, so the browser makes no failing
   * request and the console stays clean.
   */
  available: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

/** Editorial portrait with a designed fallback. Never renders a broken image. */
export function Portrait({
  available,
  className,
  priority,
  sizes,
}: PortraitProps) {
  // Guards the case where the file exists but decoding fails.
  const [failed, setFailed] = useState(false);
  const showImage = available && !failed;

  return (
    <div className={cn("relative overflow-hidden bg-surface-strong", className)}>
      {showImage ? (
        <Image
          src={PERSONAL.avatar}
          alt={`Portrait of ${PERSONAL.name}, ${PERSONAL.role}`}
          fill
          priority={priority}
          sizes={sizes ?? "(max-width: 768px) 70vw, 24rem"}
          className="portrait-image object-cover object-center"
          onError={() => setFailed(true)}
        />
      ) : (
        <ProfileFallback />
      )}
    </div>
  );
}
