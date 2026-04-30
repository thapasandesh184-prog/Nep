"use client";

import React, { useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

function ImageScreen({ position, imageSrc, revealed }: { position: [number, number, number]; imageSrc: string; revealed: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const texture = useLoader(THREE.TextureLoader, imageSrc);

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;
    
    // Gentle floating
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3 + position[0]) * 0.5;
    meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1 + position[2]) * 0.05;
    
    // Reveal effect
    if (revealed) {
      materialRef.current.opacity = THREE.MathUtils.lerp(materialRef.current.opacity, 0.9, 0.02);
    } else {
      materialRef.current.opacity = THREE.MathUtils.lerp(materialRef.current.opacity, 0.05, 0.02);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[8, 10]} />
      <meshStandardMaterial
        ref={materialRef}
        map={texture}
        transparent
        opacity={0.05}
        side={THREE.DoubleSide}
        emissive="#7B5EA7"
        emissiveIntensity={0.1}
      />
      {/* Glow frame */}
      <lineSegments>
        <edgesGeometry args={[new THREE.PlaneGeometry(8, 10)]} />
        <lineBasicMaterial color="#7B5EA7" transparent opacity={0.3} />
      </lineSegments>
    </mesh>
  );
}

export default function Zone02Images({ progress }: { progress: number }) {
  const screens = useMemo(() => [
    { pos: [-12, 3, -200] as [number, number, number], img: "/images/portfolio/kling_20260321_作品_Generate_a_5910_0.png" },
    { pos: [10, -2, -220] as [number, number, number], img: "/images/portfolio/kling_20260321_作品_Generate_a_5910_1.png" },
    { pos: [-8, -5, -240] as [number, number, number], img: "/images/portfolio/kling_20260321_作品_Generate_a_5910_5.png" },
    { pos: [14, 4, -260] as [number, number, number], img: "/images/portfolio/kling_20260321_作品_Generate_a_5962_1.png" },
    { pos: [-15, 0, -280] as [number, number, number], img: "/images/portfolio/kling_20260421_IMAGE_South_Asia_3545_1.png" },
    { pos: [8, 6, -300] as [number, number, number], img: "/images/portfolio/Whisk_149f9df37052850b3bc40c5eb341bb84eg.png" },
  ], []);

  return (
    <group>
      {screens.map((screen, i) => (
        <ImageScreen
          key={i}
          position={screen.pos}
          imageSrc={screen.img}
          revealed={progress > 0.22 + i * 0.02}
        />
      ))}
    </group>
  );
}
