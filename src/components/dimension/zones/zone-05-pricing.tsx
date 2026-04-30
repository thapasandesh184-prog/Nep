"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function PricingSphere({ position, color, scale }: { position: [number, number, number]; color: string; scale: number; label: string }) {
  const meshRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    meshRef.current.rotation.y = time * 0.1;
    meshRef.current.rotation.x = Math.sin(time * 0.05) * 0.1;
    
    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.2;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Sphere */}
      <mesh scale={scale}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.15}
          emissive={color}
          emissiveIntensity={0.4}
          wireframe
        />
      </mesh>
      {/* Inner glow */}
      <mesh scale={scale * 0.95}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.05}
          emissive={color}
          emissiveIntensity={0.8}
        />
      </mesh>
      {/* Ring */}
      <mesh ref={ringRef} scale={scale * 1.5} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1, 0.02, 8, 64]} />
        <meshStandardMaterial color={color} transparent opacity={0.3} emissive={color} emissiveIntensity={0.5} />
      </mesh>
      {/* Second ring */}
      <mesh scale={scale * 2} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[1, 0.015, 8, 64]} />
        <meshStandardMaterial color={color} transparent opacity={0.2} emissive={color} emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

export default function Zone05Pricing({ progress }: { progress: number }) {
  const spheres = useMemo(() => [
    { pos: [-10, 2, -700] as [number, number, number], color: "#C4BADA", scale: 2, label: "Starter" },
    { pos: [0, 0, -720] as [number, number, number], color: "#7B5EA7", scale: 3, label: "Growth" },
    { pos: [12, -1, -740] as [number, number, number], color: "#F0C040", scale: 4, label: "Elite" },
  ], []);

  return (
    <group visible={progress > 0.65}>
      {spheres.map((s, i) => (
        <PricingSphere key={i} position={s.pos} color={s.color} scale={s.scale} label={s.label} />
      ))}
    </group>
  );
}
