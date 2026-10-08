"use client";

import { Code2, Package, TrendingUp, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectVisualProps {
  visualType: "browser" | "api" | "dashboard";
  projectNumber: string;
  className?: string;
}

/**
 * Generates a visual representation of a project based on its type.
 * Each includes an animated 3D element that rotates/moves to give depth.
 */
export function ProjectVisual({
  visualType,
  projectNumber,
  className = "",
}: ProjectVisualProps) {
  if (visualType === "browser") {
    return (
      <AgriculturCommerceVisual projectNumber={projectNumber} className={className} />
    );
  }

  if (visualType === "dashboard") {
    return (
      <ConstructionERPVisual projectNumber={projectNumber} className={className} />
    );
  }

  if (visualType === "api") {
    return (
      <CryptoMarketVisual projectNumber={projectNumber} className={className} />
    );
  }

  return null;
}

/**
 * Velaan Bay & Cargo: Agriculture commerce + logistics with 3D rotating elements
 */
function AgriculturCommerceVisual({
  projectNumber,
  className,
}: {
  projectNumber: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden bg-gradient-to-b from-muted/60 to-surface-strong p-6",
        className,
      )}
      aria-label="Project visual: Agriculture commerce and logistics"
    >
      {/* 3D rotating dual-perspective container */}
      <div className="flex flex-1 items-center justify-between gap-4 perspective">
        {/* Agriculture side */}
        <div className="flex-1 space-y-3">
          <div className="font-mono text-[10px] uppercase tracking-widest text-accent/60">
            Agriculture
          </div>
          <div
            className="space-y-2 rounded border border-accent/20 bg-accent/5 p-3 transition-transform duration-300 hover:scale-105"
            style={{
              transform: "rotateY(-15deg) rotateX(5deg)",
              transformStyle: "preserve-3d",
            }}
          >
            <div className="flex items-center gap-2">
              <Package className="h-3 w-3 text-accent/50" aria-hidden />
              <div className="h-2 flex-1 rounded bg-accent/30" />
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <div className="h-2 rounded bg-accent/20" />
              <div className="h-2 rounded bg-accent/15" />
            </div>
            <div className="h-2 rounded bg-accent/20" />
          </div>
        </div>

        {/* Center divider - animated arrow */}
        <div className="flex flex-col items-center gap-2">
          <div className="h-1 w-0.5 rounded bg-accent/40" />
          <div
            className="transition-transform duration-500"
            style={{
              animation: "slideArrow 2s ease-in-out infinite",
            }}
          >
            <div className="text-accent/40">→</div>
          </div>
          <div className="h-1 w-0.5 rounded bg-accent/40" />
        </div>

        {/* Logistics side */}
        <div className="flex-1 space-y-3">
          <div className="font-mono text-[10px] uppercase tracking-widest text-accent/60">
            Logistics
          </div>
          <div
            className="space-y-2 rounded border border-accent/20 bg-accent/5 p-3 transition-transform duration-300 hover:scale-105"
            style={{
              transform: "rotateY(15deg) rotateX(5deg)",
              transformStyle: "preserve-3d",
            }}
          >
            <div className="flex items-center gap-2">
              <Truck className="h-3 w-3 text-accent/50" aria-hidden />
              <div className="h-2 flex-1 rounded bg-accent/30" />
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <div className="h-2 rounded bg-accent/20" />
              <div className="h-2 rounded bg-accent/15" />
            </div>
            <div className="h-2 rounded bg-accent/20" />
          </div>
        </div>
      </div>

      {/* Project number badge */}
      <div className="absolute bottom-3 right-3 font-mono text-xs font-semibold text-muted-foreground/40">
        {projectNumber}
      </div>

      <style>{`
        @keyframes slideArrow {
          0%, 100% { transform: translateX(-2px); }
          50% { transform: translateX(2px); }
        }
      `}</style>
    </div>
  );
}

/**
 * Construct Solutions: Multi-story building under construction with warm colors
 * Shows stacked building floors with project management overlay
 */
function ConstructionERPVisual({
  projectNumber,
  className,
}: {
  projectNumber: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden bg-gradient-to-b from-muted/30 to-surface-strong p-5",
        className,
      )}
      aria-label="Project visual: Building construction management"
    >
      {/* 3D tilted building floors with person standing inside */}
      <div className="relative flex-1 flex items-center justify-center">
        <div
          className="w-full space-y-1 relative"
          style={{
            transform: "perspective(600px) rotateX(8deg) rotateY(-4deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Roof/Top floor */}
          <div className="rounded-t-lg border-2 border-accent/40 bg-accent/15 p-2.5 shadow-md">
            <div className="flex justify-between items-center">
              <div className="h-1.5 w-8 rounded bg-accent/50" />
              <div className="text-[7px] font-mono text-accent/60 tracking-wider">ROOF</div>
            </div>
          </div>

          {/* Middle floors with person figure overlay */}
          <div className="relative">
            {/* Person standing - centered */}
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              <div className="flex flex-col items-center gap-0.5">
                {/* Head */}
                <div className="h-2.5 w-2.5 rounded-full bg-accent/60" />
                {/* Body */}
                <div className="h-2.5 w-1.5 rounded-full bg-accent/50" />
                {/* Legs */}
                <div className="flex gap-0.5">
                  <div className="h-2 w-0.5 rounded-full bg-accent/40" />
                  <div className="h-2 w-0.5 rounded-full bg-accent/40" />
                </div>
              </div>
            </div>

            {/* Floors stacked with building blocks */}
            {[1, 2, 3].map((floor) => (
              <div
                key={floor}
                className="border-l-2 border-r-2 border-accent/30 bg-accent/5 px-2 py-2 relative"
                style={{
                  animation: `slideFloor 2s ease-in-out infinite`,
                  animationDelay: `${floor * 0.2}s`,
                }}
              >
                {/* Building blocks/materials - 3 columns of stacked blocks */}
                <div className="grid grid-cols-3 gap-1">
                  {/* Left column blocks */}
                  <div className="space-y-0.5">
                    <div className="h-1.5 rounded bg-accent/40" />
                    <div className="h-1.5 rounded bg-accent/35" />
                  </div>
                  {/* Center column blocks */}
                  <div className="space-y-0.5">
                    <div className="h-1.5 rounded bg-accent/45" />
                    <div className="h-1.5 rounded bg-accent/40" />
                  </div>
                  {/* Right column blocks */}
                  <div className="space-y-0.5">
                    <div className="h-1.5 rounded bg-accent/40" />
                    <div className="h-1.5 rounded bg-accent/35" />
                  </div>
                </div>
                <div className="text-[7px] font-mono text-accent/50 mt-1.5 tracking-wider">
                  L{4 - floor}
                </div>
              </div>
            ))}
          </div>

          {/* Foundation */}
          <div className="rounded-b-lg border-2 border-accent/40 bg-accent/12 p-2.5 shadow-md">
            <div className="flex justify-between items-center">
              <div className="h-1.5 w-8 rounded bg-accent/50" />
              <div className="text-[7px] font-mono text-accent/60 tracking-wider">FOUNDATION</div>
            </div>
          </div>
        </div>
      </div>

      {/* Control overlay */}
      <div className="relative z-10 flex items-center justify-center gap-3 mt-3 text-[8px] font-mono">
        <div className="px-2 py-1 rounded border border-accent/30 bg-accent/10 text-accent/60">
          ADMIN
        </div>
        <div className="px-2 py-1 rounded border border-accent/30 bg-accent/10 text-accent/60">
          CONTROL
        </div>
        <div className="px-2 py-1 rounded border border-accent/30 bg-accent/10 text-accent/60">
          PLAN
        </div>
      </div>

      {/* Project number badge */}
      <div className="absolute bottom-2 right-3 font-mono text-xs font-semibold text-muted-foreground/40">
        {projectNumber}
      </div>

      <style>{`
        @keyframes slideFloor {
          0%, 100% { transform: translateX(-1px); opacity: 1; }
          50% { transform: translateX(1px); opacity: 0.9; }
        }
      `}</style>
    </div>
  );
}

/**
 * Crypto Market Dashboard: Real-time data with animated 3D floating elements
 */
function CryptoMarketVisual({
  projectNumber,
  className,
}: {
  projectNumber: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col gap-4 overflow-hidden bg-gradient-to-b from-muted/60 to-surface-strong p-6",
        className,
      )}
      aria-label="Project visual: Crypto market dashboard"
    >
      {/* Animated floating price cards */}
      <div className="relative h-24 flex items-center justify-around">
        {/* Price card 1 - floating up-down */}
        <div
          className="rounded border border-accent/30 bg-accent/10 px-3 py-2 shadow-md"
          style={{
            animation: "float 3s ease-in-out infinite",
          }}
        >
          <div className="font-mono text-[9px] text-muted-foreground/60">BTC</div>
          <TrendingUp className="h-3 w-3 text-green-500/60 mt-1" aria-hidden />
        </div>

        {/* Price card 2 - floating with delay */}
        <div
          className="rounded border border-accent/30 bg-accent/10 px-3 py-2 shadow-md"
          style={{
            animation: "float 3s ease-in-out infinite 0.5s",
          }}
        >
          <div className="font-mono text-[9px] text-muted-foreground/60">ETH</div>
          <TrendingUp className="h-3 w-3 text-green-500/60 mt-1" aria-hidden />
        </div>

        {/* Price card 3 - floating with more delay */}
        <div
          className="rounded border border-accent/30 bg-accent/10 px-3 py-2 shadow-md"
          style={{
            animation: "float 3s ease-in-out infinite 1s",
          }}
        >
          <div className="font-mono text-[9px] text-muted-foreground/60">SOL</div>
          <TrendingUp className="h-3 w-3 text-green-500/60 mt-1" aria-hidden />
        </div>
      </div>

      {/* Real-time indicator */}
      <div className="flex items-center gap-2 justify-center font-mono text-[9px]">
        <Code2 className="h-3 w-3 text-accent/50" aria-hidden />
        <span className="text-muted-foreground/60">WebSocket API</span>
      </div>

      {/* Status dots - animated */}
      <div className="flex justify-center gap-2">
        <div
          className="h-2 w-2 rounded-full bg-green-500/60"
          style={{
            animation: "pulse 2s ease-in-out infinite",
          }}
        />
        <div
          className="h-2 w-2 rounded-full bg-green-500/60"
          style={{
            animation: "pulse 2s ease-in-out infinite 0.3s",
          }}
        />
        <div
          className="h-2 w-2 rounded-full bg-green-500/60"
          style={{
            animation: "pulse 2s ease-in-out infinite 0.6s",
          }}
        />
      </div>

      {/* Project number badge */}
      <div className="absolute bottom-3 right-3 font-mono text-xs font-semibold text-muted-foreground/40">
        {projectNumber}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
