"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function VoxelField() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 400;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const voxels = useMemo(() => {
    const data: { x: number; y: number; z: number; scale: number; speed: number; offset: number }[] = [];
    for (let i = 0; i < count; i++) {
      data.push({
        x: (Math.random() - 0.5) * 60,
        y: (Math.random() - 0.5) * 40,
        z: -50 - Math.random() * 150,
        scale: Math.random() * 0.5 + 0.2,
        speed: Math.random() * 0.3 + 0.1,
        offset: Math.random() * Math.PI * 2,
      });
    }
    return data;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;

    voxels.forEach((v, i) => {
      dummy.position.set(
        v.x + Math.sin(time * v.speed + v.offset) * 2,
        v.y + Math.cos(time * v.speed * 0.7 + v.offset) * 1.5,
        v.z + Math.sin(time * 0.05 + v.offset) * 5
      );
      dummy.rotation.set(
        time * 0.1 + v.offset,
        time * 0.15 + v.offset,
        0
      );
      dummy.scale.setScalar(v.scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#7B5EA7"
        transparent
        opacity={0.15}
        emissive="#7B5EA7"
        emissiveIntensity={0.3}
      />
    </instancedMesh>
  );
}

function FloatingTypography() {
  return (
    <group position={[0, 2, -80]}>
      {/* Giant text made of voxels — represented as glowing planes */}
      <mesh position={[-8, 0, 0]}>
        <planeGeometry args={[12, 3]} />
        <meshStandardMaterial
          color="#F2EFF9"
          transparent
          opacity={0.03}
          side={THREE.DoubleSide}
          emissive="#F2EFF9"
          emissiveIntensity={0.1}
        />
      </mesh>
      <mesh position={[6, -3, 5]}>
        <planeGeometry args={[10, 2.5]} />
        <meshStandardMaterial
          color="#A78BFA"
          transparent
          opacity={0.04}
          side={THREE.DoubleSide}
          emissive="#A78BFA"
          emissiveIntensity={0.15}
        />
      </mesh>
    </group>
  );
}

export default function Zone01Hero({ progress }: { progress: number }) {
  const opacity = Math.max(0, Math.min(1, (progress - 0.02) * 15));
  
  return (
    <group visible={opacity > 0.01}>
      <VoxelField />
      <FloatingTypography />
    </group>
  );
}
