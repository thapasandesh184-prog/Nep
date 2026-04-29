"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CrownGeometryProps {
  mousePosition: React.MutableRefObject<{ x: number; y: number }>;
}

// Generate crown-like voxel positions
function generateCrownVoxels(count: number): THREE.Vector3[] {
  const positions: THREE.Vector3[] = [];
  const rng = (seed: number) => {
    const x = Math.sin(seed * 12.9898) * 43758.5453;
    return x - Math.floor(x);
  };

  for (let i = 0; i < count; i++) {
    const t = i / count;
    const angle = t * Math.PI * 2 + rng(i * 7.3) * 0.5;
    const radius = 1.8 + Math.sin(angle * 3) * 0.4 + rng(i * 3.1) * 0.3;
    const height =
      Math.abs(Math.sin(angle * 2)) * 1.5 +
      Math.abs(Math.cos(angle * 5)) * 0.5 +
      rng(i * 11.7) * 0.4;

    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = height - 0.5;

    positions.push(new THREE.Vector3(x, y, z));
  }

  // Add some center pieces
  for (let i = 0; i < count * 0.3; i++) {
    const angle = rng(i * 23.1) * Math.PI * 2;
    const r = rng(i * 17.3) * 0.8;
    positions.push(
      new THREE.Vector3(
        Math.cos(angle) * r,
        rng(i * 31.7) * 0.6 - 0.3,
        Math.sin(angle) * r
      )
    );
  }

  return positions;
}

export default function CrownGeometry({ mousePosition }: CrownGeometryProps) {
  const groupRef = useRef<THREE.Group>(null);

  const voxels = useMemo(() => {
    const positions = generateCrownVoxels(100);
    return positions.map((pos, i) => ({
      position: pos,
      id: i,
      scale: 0.15 + Math.random() * 0.1,
    }));
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;

    // Auto-rotation: 0.08 deg/frame ≈ 0.0014 rad/frame
    groupRef.current.rotation.y += 0.0014;

    // Mouse tilt: +/- 8° on X responding to cursor Y
    const targetTiltX = (mousePosition.current.y - 0.5) * 0.28; // ~16° total range
    groupRef.current.rotation.x +=
      (targetTiltX - groupRef.current.rotation.x) * 0.05;

    // Subtle Y tilt from cursor X
    const targetTiltZ = (mousePosition.current.x - 0.5) * 0.14;
    groupRef.current.rotation.z +=
      (targetTiltZ - groupRef.current.rotation.z) * 0.05;
  });

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#C9A96E"),
        metalness: 0.85,
        roughness: 0.15,
        emissive: new THREE.Color("#8A6A30"),
        emissiveIntensity: 0.2,
      }),
    []
  );

  const geometry = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);

  return (
    <group ref={groupRef} position={[2, 0, 0]}>
      {voxels.map((voxel) => (
        <mesh
          key={voxel.id}
          position={voxel.position}
          scale={[voxel.scale, voxel.scale, voxel.scale]}
          geometry={geometry}
          material={material}
        />
      ))}
    </group>
  );
}
