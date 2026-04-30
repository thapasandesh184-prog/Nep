"use client";

import React, { useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

// ─── Gallery Image Screen ───
function GalleryImage({
  position,
  imageSrc,
  width = 8,
  height = 10,
  progress,
  index,
  total,
}: {
  position: [number, number, number];
  imageSrc: string;
  width?: number;
  height?: number;
  progress: number;
  index: number;
  total: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const texture = useLoader(THREE.TextureLoader, imageSrc);

  // Reveal staggered by depth
  const revealThreshold = (index / total) * 0.06;

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;

    const time = state.clock.elapsedTime;

    // Gentle drift — each item has its own rhythm
    meshRef.current.position.x =
      position[0] + Math.sin(time * 0.2 + index * 1.7) * 0.6;
    meshRef.current.position.y =
      position[1] + Math.sin(time * 0.15 + index * 2.3) * 0.5;
    meshRef.current.rotation.y =
      Math.sin(time * 0.1 + index * 0.8) * 0.08;
    meshRef.current.rotation.x =
      Math.sin(time * 0.07 + index * 1.1) * 0.03;

    // Reveal based on scroll progress
    const revealed = progress > revealThreshold;
    const targetOpacity = revealed ? 0.92 : 0;
    materialRef.current.opacity = THREE.MathUtils.lerp(
      materialRef.current.opacity,
      targetOpacity,
      0.025
    );

    // Scale-in with slight overshoot
    const targetScale = revealed ? 1 : 0.7;
    const s = THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.025);
    meshRef.current.scale.set(s, s, s);
  });

  return (
    <group position={position}>
      {/* Image plane */}
      <mesh ref={meshRef} scale={0.7}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial
          ref={materialRef}
          map={texture}
          transparent
          opacity={0}
          side={THREE.DoubleSide}
          emissive="#7B5EA7"
          emissiveIntensity={0.06}
        />
      </mesh>

      {/* Glow frame */}
      <lineSegments>
        <edgesGeometry args={[new THREE.PlaneGeometry(width, height)]} />
        <lineBasicMaterial color="#7B5EA7" transparent opacity={0.3} />
      </lineSegments>
    </group>
  );
}

// ─── Gallery Video Screen ───
function GalleryVideo({
  position,
  videoSrc,
  width = 9,
  height = 5.5,
  progress,
  index,
  total,
}: {
  position: [number, number, number];
  videoSrc: string;
  width?: number;
  height?: number;
  progress: number;
  index: number;
  total: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const textureRef = useRef<THREE.VideoTexture | null>(null);

  const revealThreshold = (index / total) * 0.06;

  useMemo(() => {
    const video = document.createElement("video");
    video.src = videoSrc;
    video.crossOrigin = "anonymous";
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.play().catch(() => {});
    videoRef.current = video;

    const texture = new THREE.VideoTexture(video);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    textureRef.current = texture;
  }, [videoSrc]);

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;

    const time = state.clock.elapsedTime;

    // Gentle drift
    meshRef.current.position.x =
      position[0] + Math.sin(time * 0.25 + index * 1.5) * 0.5;
    meshRef.current.position.y =
      position[1] + Math.sin(time * 0.18 + index * 2.1) * 0.4;
    meshRef.current.rotation.y =
      Math.sin(time * 0.09 + index * 0.9) * 0.06;
    meshRef.current.rotation.x =
      Math.sin(time * 0.06 + index * 1.3) * 0.025;

    // Reveal
    const revealed = progress > revealThreshold;
    const targetOpacity = revealed ? 0.92 : 0;
    materialRef.current.opacity = THREE.MathUtils.lerp(
      materialRef.current.opacity,
      targetOpacity,
      0.025
    );

    const targetScale = revealed ? 1 : 0.7;
    const s = THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.025);
    meshRef.current.scale.set(s, s, s);

    if (videoRef.current) {
      if (revealed && videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
      } else if (!revealed && !videoRef.current.paused) {
        videoRef.current.pause();
      }
    }
  });

  return (
    <group position={position}>
      {/* Video plane */}
      <mesh ref={meshRef} scale={0.7}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial
          ref={materialRef}
          map={textureRef.current}
          transparent
          opacity={0}
          side={THREE.DoubleSide}
          emissive="#34D399"
          emissiveIntensity={0.04}
        />
      </mesh>

      {/* Glow frame — teal for videos */}
      <lineSegments>
        <edgesGeometry args={[new THREE.PlaneGeometry(width, height)]} />
        <lineBasicMaterial color="#34D399" transparent opacity={0.3} />
      </lineSegments>
    </group>
  );
}

// ─── Vortex layout generator ───
function generateVortexPositions(count: number): {
  x: number;
  y: number;
  z: number;
}[] {
  const positions: { x: number; y: number; z: number }[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // ~2.399 rad

  for (let i = 0; i < count; i++) {
    const t = i / (count - 1); // 0 to 1

    // Spiral angle
    const theta = i * goldenAngle;

    // Radius: starts wide, narrows, then widens again = tunnel feel
    const rBase = 8 + Math.sin(t * Math.PI * 2) * 4;
    const r = rBase + (Math.random() - 0.5) * 3;

    // Z depth: spread across entry zone
    const z = -12 - t * 75;

    // Y: spread vertically with wave
    const yBase = Math.sin(theta * 0.5) * 6;
    const y = yBase + (Math.random() - 0.5) * 4;

    positions.push({
      x: r * Math.cos(theta),
      y,
      z,
    });
  }

  return positions;
}

// ─── Main Zone 00 Component ───
export default function Zone00Entry({ progress }: { progress: number }) {
  const galleryItems = useMemo(() => {
    const rawItems = [
      { type: "image" as const, src: "/images/portfolio/kling_20260321_作品_Generate_a_5910_0.png", w: 7.5, h: 9.5 },
      { type: "video" as const, src: "/videos/portfolio/kling_20260321_VIDEO_Create_a_1_5988_0.mp4", w: 9, h: 5.5 },
      { type: "image" as const, src: "/images/portfolio/kling_20260321_作品_Generate_a_5910_1.png", w: 7, h: 9 },
      { type: "image" as const, src: "/images/portfolio/kling_20260321_作品_Generate_a_5910_5.png", w: 8, h: 10 },
      { type: "video" as const, src: "/videos/portfolio/kling_20260321_VIDEO_Create_a_c_5937_0.mp4", w: 9.5, h: 5.5 },
      { type: "image" as const, src: "/images/portfolio/kling_20260321_作品_Generate_a_5962_1.png", w: 7.5, h: 9.5 },
      { type: "video" as const, src: "/videos/portfolio/kling_20260321_作品_Create_a_1_6119_0.mp4", w: 8.5, h: 5 },
      { type: "image" as const, src: "/images/portfolio/kling_20260421_IMAGE_South_Asia_3545_1.png", w: 8, h: 10 },
      { type: "image" as const, src: "/images/portfolio/Whisk_149f9df37052850b3bc40c5eb341bb84eg.png", w: 7, h: 9 },
      { type: "video" as const, src: "/videos/portfolio/kling_20260421_VIDEO_shot_1_2s__3554_0.mp4", w: 9, h: 5.5 },
      { type: "image" as const, src: "/images/portfolio/Whisk_616d2dfce8e323184904e38a31aac0e4eg.png", w: 7.5, h: 9.5 },
      { type: "image" as const, src: "/images/portfolio/kling_20260313_作品_GlowPure_S_3800_0 (2).png", w: 7, h: 9 },
      { type: "video" as const, src: "/videos/portfolio/202604221818 (1).mp4", w: 8, h: 5 },
      { type: "image" as const, src: "/images/portfolio/ChatGPT Image Apr 22, 2026, 05_39_56 PM.png", w: 7.5, h: 9.5 },
      { type: "image" as const, src: "/images/portfolio/ChatGPT Image Apr 22, 2026, 05_40_03 PM.png", w: 8, h: 10 },
      { type: "image" as const, src: "/images/portfolio/ChatGPT Image Apr 22, 2026, 05_41_31 PM.png", w: 7, h: 9 },
    ];

    const positions = generateVortexPositions(rawItems.length);

    return rawItems.map((item, i) => ({
      ...item,
      pos: [positions[i].x, positions[i].y, positions[i].z] as [number, number, number],
    }));
  }, []);

  return (
    <group>
      {galleryItems.map((item, i) =>
        item.type === "image" ? (
          <GalleryImage
            key={i}
            position={item.pos}
            imageSrc={item.src}
            width={item.w}
            height={item.h}
            progress={progress}
            index={i}
            total={galleryItems.length}
          />
        ) : (
          <GalleryVideo
            key={i}
            position={item.pos}
            videoSrc={item.src}
            width={item.w}
            height={item.h}
            progress={progress}
            index={i}
            total={galleryItems.length}
          />
        )
      )}

      {/* Vortex particle stream */}
      <VortexParticles progress={progress} />
    </group>
  );
}

// ─── Vortex particle stream ───
function VortexParticles({ progress }: { progress: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 400;

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const violet = new THREE.Color("#7B5EA7");
    const teal = new THREE.Color("#34D399");
    const white = new THREE.Color("#C4BADA");

    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < count; i++) {
      const t = i / count;
      const theta = i * goldenAngle * 1.5;
      const r = 3 + t * 14 + Math.sin(t * Math.PI * 4) * 3;

      pos[i * 3] = r * Math.cos(theta);
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20 + Math.sin(theta) * 4;
      pos[i * 3 + 2] = -10 - t * 75;

      const colorChoice = Math.random();
      const c = colorChoice < 0.5 ? violet : colorChoice < 0.8 ? teal : white;
      cols[i * 3] = c.r;
      cols[i * 3 + 1] = c.g;
      cols[i * 3 + 2] = c.b;
    }

    return { positions: pos, colors: cols };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.elapsedTime;
    pointsRef.current.rotation.y = time * 0.03;

    const targetOpacity = Math.min(progress * 12, 0.5);
    (pointsRef.current.material as THREE.PointsMaterial).opacity = targetOpacity;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
