"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Points } from "three";

interface HeroSceneProps {
  dark: boolean;
  /** Fewer particles + slower drift on constrained devices. */
  lightweight?: boolean;
}

/**
 * Atmospheric hero backdrop — suspended dust in a lit volume.
 *
 * Deliberately minimal geometry: the card is the subject, this is only depth
 * and air behind it. Animation reads `delta` from the R3F frame callback, so
 * no THREE.Clock is touched and no second animation loop is created.
 */
export function HeroScene({ dark, lightweight = false }: HeroSceneProps) {
  const dust = useRef<Points>(null);
  const elapsed = useRef(0);

  const count = lightweight ? 90 : 220;

  const positions = useMemo(() => {
    // Seeded PRNG rather than Math.random: the dust field must be identical on
    // every render (and between server and client) to stay render-pure.
    let seed = 0x9e3779b9;
    const next = () => {
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };

    const array = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      array[i * 3] = (next() - 0.5) * 14;
      array[i * 3 + 1] = (next() - 0.5) * 10;
      array[i * 3 + 2] = (next() - 0.5) * 8 - 2;
    }
    return array;
  }, [count]);

  useFrame((_, delta) => {
    if (!dust.current) return;
    // Clamp delta so a backgrounded tab does not jolt the scene on return.
    elapsed.current += Math.min(delta, 0.05);
    dust.current.rotation.y = elapsed.current * 0.02;
    dust.current.position.y = Math.sin(elapsed.current * 0.18) * 0.12;
  });

  const dustColor = dark ? "#d8a24a" : "#6c675c";
  const keyColor = dark ? "#d8a24a" : "#ffffff";

  return (
    <>
      <ambientLight intensity={dark ? 0.35 : 0.6} />
      <directionalLight position={[5, 6, 4]} intensity={dark ? 0.7 : 1} />
      <pointLight
        position={[-4, 2, 3]}
        intensity={dark ? 0.5 : 0.25}
        color={keyColor}
        distance={18}
      />

      <points ref={dust}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={count}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          color={dustColor}
          transparent
          opacity={dark ? 0.55 : 0.4}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </>
  );
}
