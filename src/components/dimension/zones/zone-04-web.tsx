"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function LayeredWebsite({ position, layers }: { position: [number, number, number]; layers: { color: string; zOffset: number }[] }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    groupRef.current.position.y = position[1] + Math.sin(time * 0.2) * 0.5;
  });

  return (
    <group ref={groupRef} position={position}>
      {layers.map((layer, i) => (
        <mesh key={i} position={[0, 0, layer.zOffset]}>
          <planeGeometry args={[10, 7]} />
          <meshStandardMaterial
            color={layer.color}
            transparent
            opacity={0.2}
            side={THREE.DoubleSide}
            emissive={layer.color}
            emissiveIntensity={0.2}
          />
          <lineSegments>
            <edgesGeometry args={[new THREE.PlaneGeometry(10, 7)]} />
            <lineBasicMaterial color="#34D399" transparent opacity={0.15} />
          </lineSegments>
        </mesh>
      ))}
    </group>
  );
}

export default function Zone04Web({ progress }: { progress: number }) {
  const sites = useMemo(() => [
    { pos: [-8, 3, -500] as [number, number, number], layers: [
      { color: "#1a1a2e", zOffset: -2 },
      { color: "#16213e", zOffset: 0 },
      { color: "#0f3460", zOffset: 2 },
    ]},
    { pos: [10, -2, -530] as [number, number, number], layers: [
      { color: "#2d1b4e", zOffset: -1.5 },
      { color: "#1a1a2e", zOffset: 0.5 },
      { color: "#7B5EA7", zOffset: 2.5 },
    ]},
    { pos: [-5, -5, -560] as [number, number, number], layers: [
      { color: "#0f1419", zOffset: -2.5 },
      { color: "#1a2332", zOffset: -0.5 },
      { color: "#34D399", zOffset: 1.5 },
    ]},
  ], []);

  return (
    <group visible={progress > 0.5}>
      {sites.map((site, i) => (
        <LayeredWebsite key={i} position={site.pos} layers={site.layers} />
      ))}
    </group>
  );
}
