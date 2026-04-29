"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleFieldProps {
  mousePosition: React.MutableRefObject<{ x: number; y: number }>;
}

const PARTICLE_COUNT = 1800;

// Simple pseudo-random noise function
function noise(x: number, y: number, z: number): number {
  const s =
    Math.sin(x * 12.9898 + y * 78.233 + z * 53.539) * 43758.5453;
  return s - Math.floor(s);
}

export default function ParticleField({ mousePosition }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors, sizes, velocities } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const velocities: THREE.Vector3[] = [];

    const goldColors = [
      new THREE.Color("#C9A96E"),
      new THREE.Color("#E8D5A3"),
      new THREE.Color("#8A6A30"),
    ];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Concentrated around crown area, sparse in headline area
      const angle = Math.random() * Math.PI * 2;
      const radius = 1 + Math.random() * 5;
      const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 3;
      const y = (Math.random() - 0.5) * 6;
      const z = Math.sin(angle) * radius + (Math.random() - 0.5) * 3;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const color = goldColors[Math.floor(Math.random() * goldColors.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = 0.008 + Math.random() * 0.014;

      velocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.003,
          (Math.random() - 0.5) * 0.003,
          (Math.random() - 0.5) * 0.003
        )
      );
    }

    return { positions, colors, sizes, velocities };
  }, []);

  const originalPositions = useMemo(
    () => new Float32Array(positions),
    [positions]
  );

  useFrame((state) => {
    if (!pointsRef.current) return;

    const posArray = pointsRef.current.geometry.attributes.position
      .array as Float32Array;
    const time = state.clock.elapsedTime;

    // Convert mouse screen position to world space roughly
    const mouseX = (mousePosition.current.x - 0.5) * 12;
    const mouseY = -(mousePosition.current.y - 0.5) * 8;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      // Perlin-like drift
      const driftX =
        noise(posArray[ix] * 0.5, posArray[iy] * 0.5, time * 0.1) *
        0.008;
      const driftY =
        noise(posArray[iy] * 0.5, posArray[iz] * 0.5, time * 0.1 + 100) *
        0.008;
      const driftZ =
        noise(posArray[iz] * 0.5, posArray[ix] * 0.5, time * 0.1 + 200) *
        0.008;

      posArray[ix] += velocities[i].x + driftX;
      posArray[iy] += velocities[i].y + driftY;
      posArray[iz] += velocities[i].z + driftZ;

      // Cursor repulsion (120px radius ≈ 3 world units)
      const dx = posArray[ix] - mouseX;
      const dy = posArray[iy] - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const repelRadius = 3;

      if (dist < repelRadius && dist > 0.01) {
        const force = (1 - dist / repelRadius) * 0.02;
        posArray[ix] += (dx / dist) * force;
        posArray[iy] += (dy / dist) * force;
      }

      // Gentle return to original position (spring-like)
      const returnForce = 0.002;
      posArray[ix] += (originalPositions[ix] - posArray[ix]) * returnForce;
      posArray[iy] += (originalPositions[iy] - posArray[iy]) * returnForce;
      posArray[iz] += (originalPositions[iz] - posArray[iz]) * returnForce;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={PARTICLE_COUNT}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={PARTICLE_COUNT}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
