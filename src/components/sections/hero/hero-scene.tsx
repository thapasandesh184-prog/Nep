"use client";

import React, { useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import CrownGeometry from "./crown-geometry";
import ParticleField from "./particle-field";
import WireframeGrid from "./wireframe-grid";

export default function HeroScene() {
  const mousePosition = useRef({ x: 0.5, y: 0.5 });

  const handlePointerMove = (e: React.PointerEvent) => {
    mousePosition.current.x = e.clientX / window.innerWidth;
    mousePosition.current.y = e.clientY / window.innerHeight;
  };

  return (
    <div
      className="absolute inset-0"
      onPointerMove={handlePointerMove}
      style={{ cursor: "default" }}
    >
      <Canvas
        camera={{
          position: [0, 0, 8],
          fov: 45,
          near: 0.1,
          far: 100,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.5]} // Cap DPR for performance
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <pointLight
            position={[5, 5, 5]}
            intensity={1.5}
            color="#C9A96E"
          />
          <pointLight
            position={[-5, -3, 3]}
            intensity={0.8}
            color="#E8D5A3"
          />
          <pointLight
            position={[0, -5, -5]}
            intensity={0.5}
            color="#7B5EA7"
          />

          {/* Scene layers */}
          <WireframeGrid />
          <ParticleField mousePosition={mousePosition} />
          <CrownGeometry mousePosition={mousePosition} />
        </Suspense>
      </Canvas>
    </div>
  );
}
