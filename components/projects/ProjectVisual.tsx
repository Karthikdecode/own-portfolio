"use client";

import { Code2, BarChart3 } from "lucide-react";

interface ProjectVisualProps {
  visualType: "browser" | "api" | "dashboard";
  projectNumber: string;
  className?: string;
}

/**
 * Generates a visual representation of a project based on its type.
 * Used when the real project image is not available.
 * These are intentional design elements, not error placeholders.
 */
export function ProjectVisual({
  visualType,
  projectNumber,
  className = "",
}: ProjectVisualProps) {
  if (visualType === "browser") {
    return <BrowserVisual projectNumber={projectNumber} className={className} />;
  }

  if (visualType === "api") {
    return <ApiVisual projectNumber={projectNumber} className={className} />;
  }

  if (visualType === "dashboard") {
    return (
      <DashboardVisual projectNumber={projectNumber} className={className} />
    );
  }

  return null;
}

/**
 * Browser window visual for full-stack/frontend projects.
 */
function BrowserVisual({
  projectNumber,
  className,
}: {
  projectNumber: string;
  className?: string;
}) {
  return (
    <div
      className={`relative flex flex-col overflow-hidden bg-gradient-to-b from-muted/60 to-surface-strong ${className}`}
      aria-label="Project visual: Browser window"
    >
      {/* Browser chrome */}
      <div className="space-y-3 p-4">
        {/* Address bar */}
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-muted-foreground/30" />
          <div className="h-2 flex-1 rounded bg-muted-foreground/20" />
        </div>

        {/* Content grid mockup */}
        <div className="space-y-3">
          <div className="h-3 w-32 rounded bg-accent/20" />
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1.5">
              <div className="h-2 w-full rounded bg-muted-foreground/15" />
              <div className="h-2 w-4/5 rounded bg-muted-foreground/10" />
            </div>
            <div className="space-y-1.5">
              <div className="h-2 w-full rounded bg-muted-foreground/15" />
              <div className="h-2 w-3/5 rounded bg-muted-foreground/10" />
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="h-2 w-full rounded bg-muted-foreground/15" />
            <div className="h-2 w-5/6 rounded bg-muted-foreground/10" />
          </div>
        </div>
      </div>

      {/* Project number badge */}
      <div className="absolute bottom-3 right-3 font-mono text-xs font-semibold text-muted-foreground/40">
        {projectNumber}
      </div>
    </div>
  );
}

/**
 * API/Backend visual for backend-focused projects.
 */
function ApiVisual({
  projectNumber,
  className,
}: {
  projectNumber: string;
  className?: string;
}) {
  return (
    <div
      className={`relative flex flex-col justify-center gap-4 overflow-hidden bg-gradient-to-b from-muted/60 to-surface-strong p-4 ${className}`}
      aria-label="Project visual: API endpoints"
    >
      {/* API endpoints mockup */}
      <div className="space-y-2 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="rounded bg-accent/20 px-1.5 py-0.5 text-accent/70">
            GET
          </span>
          <span className="text-muted-foreground/40">/api/users</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded bg-green-500/20 px-1.5 py-0.5 text-green-600/70">
            POST
          </span>
          <span className="text-muted-foreground/40">/api/auth/login</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded bg-blue-500/20 px-1.5 py-0.5 text-blue-600/70">
            PUT
          </span>
          <span className="text-muted-foreground/40">/api/profile/:id</span>
        </div>
      </div>

      {/* Response indicator */}
      <div className="border-t border-muted/30 pt-3">
        <div className="flex items-center gap-2 font-mono text-xs">
          <Code2 className="h-3 w-3 text-accent/50" aria-hidden />
          <span className="text-muted-foreground/40">200 OK</span>
        </div>
      </div>

      {/* Project number badge */}
      <div className="absolute bottom-3 right-3 font-mono text-xs font-semibold text-muted-foreground/40">
        {projectNumber}
      </div>
    </div>
  );
}

/**
 * Dashboard visual for data-driven projects.
 */
function DashboardVisual({
  projectNumber,
  className,
}: {
  projectNumber: string;
  className?: string;
}) {
  return (
    <div
      className={`relative flex flex-col gap-3 overflow-hidden bg-gradient-to-b from-muted/60 to-surface-strong p-4 ${className}`}
      aria-label="Project visual: Analytics dashboard"
    >
      {/* Dashboard header */}
      <div className="space-y-2">
        <div className="h-2 w-24 rounded bg-accent/20" />
        <div className="flex gap-2">
          <div className="h-1.5 w-8 rounded bg-muted-foreground/20" />
          <div className="h-1.5 flex-1 rounded bg-muted-foreground/15" />
        </div>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1.5 rounded border border-muted/30 bg-surface/40 p-2">
          <div className="h-1.5 w-12 rounded bg-accent/20" />
          <div className="h-1 w-8 rounded bg-muted-foreground/15" />
        </div>
        <div className="space-y-1.5 rounded border border-muted/30 bg-surface/40 p-2">
          <div className="h-1.5 w-12 rounded bg-accent/20" />
          <div className="h-1 w-8 rounded bg-muted-foreground/15" />
        </div>
      </div>

      {/* Chart representation */}
      <div className="flex items-end justify-center gap-1">
        <BarChart3 className="h-4 w-4 text-muted-foreground/30" aria-hidden />
        <div className="h-6 w-1 rounded bg-accent/30" />
        <div className="h-5 w-1 rounded bg-accent/25" />
        <div className="h-4 w-1 rounded bg-accent/20" />
        <div className="h-7 w-1 rounded bg-accent/35" />
      </div>

      {/* Project number badge */}
      <div className="absolute bottom-3 right-3 font-mono text-xs font-semibold text-muted-foreground/40">
        {projectNumber}
      </div>
    </div>
  );
}
