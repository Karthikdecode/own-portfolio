"use client";

import { Canvas } from "@react-three/fiber";
import { HeroScene } from "@/components/three/HeroScene";

interface HeroCanvasProps {
  dark: boolean;
  lightweight?: boolean;
}

/**
 * R3F canvas wrapper for the atmospheric hero backdrop.
 * `frameloop="demand"` is deliberately NOT used — the dust drifts continuously,
 * but the particle count and DPR are clamped to keep the cost negligible.
 */
export default function HeroCanvas({ dark, lightweight }: HeroCanvasProps) {
  return (
    <Canvas
      dpr={[1, lightweight ? 1.25 : 1.75]}
      camera={{ position: [0, 0, 8], fov: 42 }}
      gl={{ antialias: !lightweight, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
      performance={{ min: 0.5, max: 1 }}
    >
      <HeroScene dark={dark} lightweight={lightweight} />
    </Canvas>
  );
}
