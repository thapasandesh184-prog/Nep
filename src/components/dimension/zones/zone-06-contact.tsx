"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function WaveRings({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const ringCount = 12;

  const rings = useMemo(() => {
    return Array.from({ length: ringCount }, (_, i) => ({
      radius: 2 + i * 1.5,
      speed: 0.3 + i * 0.1,
      offset: i * 0.5,
      opacity: 1 - i / ringCount,
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;

    groupRef.current.children.forEach((child, i) => {
      const ring = rings[i];
      const scale = 1 + Math.sin(time * ring.speed + ring.offset) * 0.3;
      child.scale.set(scale, scale, scale);
      
      const material = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
      if (material) {
        material.opacity = ring.opacity * (0.5 + Math.sin(time * ring.speed + ring.offset) * 0.5);
      }
    });
  });

  return (
    <group ref={groupRef} position={position}>
      {rings.map((ring, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[ring.radius - 0.05, ring.radius + 0.05, 64]} />
          <meshBasicMaterial
            color={i % 3 === 0 ? "#34D399" : i % 3 === 1 ? "#7B5EA7" : "#A78BFA"}
            transparent
            opacity={ring.opacity}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

function WireframeGlobe({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.1;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry args={[4, 2]} />
      <meshBasicMaterial color="#7B5EA7" wireframe transparent opacity={0.15} />
    </mesh>
  );
}

export default function Zone06Contact({ progress }: { progress: number }) {
  return (
    <group visible={progress > 0.8}>
      <WaveRings position={[0, 0, -880]} />
      <WireframeGlobe position={[8, -3, -900]} />
    </group>
  );
}
