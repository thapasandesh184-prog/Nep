"use client";

import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Fog that deepens with camera depth
function DimensionFog() {
  const { camera } = useThree();
  
  useFrame(() => {
    // Fog density increases as we fly deeper
    const depth = Math.abs(camera.position.z);
    const density = Math.min(0.015 + depth * 0.00002, 0.04);
    if (camera.userData.fog) {
      camera.userData.fog.density = density;
    }
  });

  return (
    <fog attach="fog" args={["#08070A", 20, 120]} near={10} far={150} />
  );
}

// Ambient particles that fill the dimension
function AmbientParticles({ count = 2000 }: { count?: number }) {
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    const violet = new THREE.Color("#7B5EA7");
    const teal = new THREE.Color("#34D399");
    const white = new THREE.Color("#C4BADA");
    
    for (let i = 0; i < count; i++) {
      // Spread particles across the entire dimension depth
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = -Math.random() * 900; // Deep into the dimension
      
      const colorChoice = Math.random();
      const c = colorChoice < 0.5 ? violet : colorChoice < 0.8 ? teal : white;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
      
      sizes[i] = Math.random() * 2 + 0.5;
    }
    
    return { positions, colors, sizes };
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.elapsedTime;
    pointsRef.current.rotation.y = time * 0.02;
    pointsRef.current.rotation.x = Math.sin(time * 0.01) * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={points.positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={points.colors} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={count} array={points.sizes} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Voxel trail left by camera movement
function VoxelContrail({ cameraZ }: { cameraZ: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 300;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const positions = useMemo(() => {
    const pos: { x: number; y: number; z: number; rot: number }[] = [];
    for (let i = 0; i < count; i++) {
      pos.push({
        x: (Math.random() - 0.5) * 4,
        y: (Math.random() - 0.5) * 4,
        z: -Math.random() * 30,
        rot: Math.random() * Math.PI,
      });
    }
    return pos;
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;
    
    positions.forEach((pos, i) => {
      // Trail follows camera
      const trailZ = cameraZ + pos.z - 5;
      const life = Math.max(0, 1 - Math.abs(pos.z) / 30);
      
      dummy.position.set(pos.x, pos.y, trailZ);
      dummy.rotation.set(pos.rot, pos.rot * 0.5, 0);
      dummy.scale.setScalar(0.08 * life);
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
        opacity={0.3}
        emissive="#7B5EA7"
        emissiveIntensity={0.5}
      />
    </instancedMesh>
  );
}

// Camera that follows scroll
function ScrollCamera({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const { camera } = useThree();
  const targetZ = useRef(0);
  const velocity = useRef(0);

  useFrame((_, delta) => {
    // Map scroll progress (0-1) to camera Z position (0 to -950)
    const target = -scrollProgress.current * 950;
    
    // Calculate velocity for motion blur / speed effects
    velocity.current = (target - targetZ.current) / delta;
    
    // Smooth lerp (0.08 factor as per spec)
    targetZ.current += (target - targetZ.current) * 0.08;
    
    camera.position.z = targetZ.current;
    
    // Subtle camera drift based on time
    camera.position.x = Math.sin(targetZ.current * 0.01) * 2;
    camera.position.y = Math.cos(targetZ.current * 0.008) * 1.5;
    
    // Camera always looks slightly ahead
    camera.lookAt(
      Math.sin(targetZ.current * 0.01) * 0.5,
      Math.cos(targetZ.current * 0.008) * 0.3,
      targetZ.current - 30
    );
  });

  return null;
}

interface DimensionCanvasProps {
  scrollProgress: React.MutableRefObject<number>;
  children: React.ReactNode;
}

export default function DimensionCanvas({ scrollProgress, children }: DimensionCanvasProps) {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 0], fov: 60, near: 0.1, far: 200 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.5]}
        style={{ background: "#08070A" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <pointLight position={[0, 10, -10]} intensity={0.8} color="#7B5EA7" />
          <pointLight position={[10, -5, -50]} intensity={0.5} color="#34D399" />
          <pointLight position={[-10, 5, -100]} intensity={0.4} color="#A78BFA" />
          
          <DimensionFog />
          <AmbientParticles count={1500} />
          <VoxelContrail cameraZ={scrollProgress.current} />
          <ScrollCamera scrollProgress={scrollProgress} />
          
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
}
