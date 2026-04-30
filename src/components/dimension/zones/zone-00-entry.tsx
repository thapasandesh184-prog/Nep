"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Diamond-shaped voxel logo that assembles from particles
function DiamondLogo({ assembled, exploded }: { assembled: boolean; exploded: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const [phase, setPhase] = useState<"scattered" | "assembling" | "assembled" | "exploding" | "exploded">("scattered");

  const particleCount = 800;

  const { scatteredPositions, assembledPositions, colors } = useMemo(() => {
    const scattered = new Float32Array(particleCount * 3);
    const assembled = new Float32Array(particleCount * 3);
    const cols = new Float32Array(particleCount * 3);

    // Create diamond shape in assembled positions
    let idx = 0;
    const createDiamondVoxel = (x: number, y: number, z: number, size: number) => {
      const count = Math.floor(size * 50);
      for (let i = 0; i < count && idx < particleCount; i++) {
        // Small cluster around the voxel position
        assembled[idx * 3] = x + (Math.random() - 0.5) * size * 0.3;
        assembled[idx * 3 + 1] = y + (Math.random() - 0.5) * size * 0.3;
        assembled[idx * 3 + 2] = z + (Math.random() - 0.5) * size * 0.3;

        // Scattered — far away in all directions
        const angle = Math.random() * Math.PI * 2;
        const radius = 20 + Math.random() * 60;
        scattered[idx * 3] = Math.cos(angle) * radius;
        scattered[idx * 3 + 1] = (Math.random() - 0.5) * 40;
        scattered[idx * 3 + 2] = Math.sin(angle) * radius;

        // Color: violet with some teal accents
        const isTeal = Math.random() > 0.85;
        cols[idx * 3] = isTeal ? 0.2 : 0.48;
        cols[idx * 3 + 1] = isTeal ? 0.83 : 0.37;
        cols[idx * 3 + 2] = isTeal ? 0.6 : 0.65;

        idx++;
      }
    };

    // Build diamond shape from voxels
    // Center diamond
    createDiamondVoxel(0, 0, 0, 2);
    // Top pyramid
    createDiamondVoxel(0, 1.5, 0, 1.5);
    createDiamondVoxel(0, 2.5, 0, 0.8);
    createDiamondVoxel(0, 3.2, 0, 0.4);
    // Bottom pyramid
    createDiamondVoxel(0, -1.5, 0, 1.5);
    createDiamondVoxel(0, -2.5, 0, 0.8);
    createDiamondVoxel(0, -3.2, 0, 0.4);
    // Sides
    createDiamondVoxel(1, 0.5, 0, 0.8);
    createDiamondVoxel(-1, 0.5, 0, 0.8);
    createDiamondVoxel(1, -0.5, 0, 0.8);
    createDiamondVoxel(-1, -0.5, 0, 0.8);
    createDiamondVoxel(0, 0.5, 1, 0.8);
    createDiamondVoxel(0, 0.5, -1, 0.8);

    // Fill remaining with random
    while (idx < particleCount) {
      assembled[idx * 3] = (Math.random() - 0.5) * 4;
      assembled[idx * 3 + 1] = (Math.random() - 0.5) * 6;
      assembled[idx * 3 + 2] = (Math.random() - 0.5) * 4;

      const angle = Math.random() * Math.PI * 2;
      const radius = 20 + Math.random() * 60;
      scattered[idx * 3] = Math.cos(angle) * radius;
      scattered[idx * 3 + 1] = (Math.random() - 0.5) * 40;
      scattered[idx * 3 + 2] = Math.sin(angle) * radius;

      const isTeal = Math.random() > 0.85;
      cols[idx * 3] = isTeal ? 0.2 : 0.48;
      cols[idx * 3 + 1] = isTeal ? 0.83 : 0.37;
      cols[idx * 3 + 2] = isTeal ? 0.6 : 0.65;
      idx++;
    }

    return { scatteredPositions: scattered, assembledPositions: assembled, colors: cols };
  }, []);

  const currentPositions = useRef(new Float32Array(scatteredPositions));
  const startTime = useRef(0);

  useEffect(() => {
    if (assembled && phase === "scattered") {
      setPhase("assembling");
      startTime.current = performance.now();
      setTimeout(() => setPhase("assembled"), 2500);
    }
    if (exploded && phase === "assembled") {
      setPhase("exploding");
      startTime.current = performance.now();
      setTimeout(() => setPhase("exploded"), 1500);
    }
  }, [assembled, exploded, phase]);

  useFrame(() => {
    if (!pointsRef.current) return;

    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const now = performance.now();

    if (phase === "assembling") {
      const progress = Math.min((now - startTime.current) / 2500, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      for (let i = 0; i < particleCount * 3; i++) {
        pos[i] = scatteredPositions[i] + (assembledPositions[i] - scatteredPositions[i]) * eased;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    } else if (phase === "exploding") {
      const progress = Math.min((now - startTime.current) / 1500, 1);
      const eased = progress * progress; // ease-in
      for (let i = 0; i < particleCount * 3; i++) {
        pos[i] = assembledPositions[i] + (scatteredPositions[i] - assembledPositions[i]) * eased;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Subtle rotation
    pointsRef.current.rotation.y += 0.003;
  });

  return (
    <points ref={pointsRef} position={[0, 0, -15]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={currentPositions.current} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={particleCount} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function Zone00Entry({ progress }: { progress: number }) {
  // Progress 0-0.08 (first zone)
  const [assembled, setAssembled] = useState(false);
  const [exploded, setExploded] = useState(false);

  useEffect(() => {
    if (progress > 0.01 && !assembled) setAssembled(true);
    if (progress > 0.05 && !exploded) setExploded(true);
  }, [progress, assembled, exploded]);

  return (
    <group>
      <DiamondLogo assembled={assembled} exploded={exploded} />
    </group>
  );
}
