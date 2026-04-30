"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function VideoMonolith({ position, videoSrc, isCentral }: { position: [number, number, number]; videoSrc: string; isCentral?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const textureRef = useRef<THREE.VideoTexture | null>(null);

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
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    
    if (isCentral) {
      // Central monolith slowly rotates
      meshRef.current.rotation.y = Math.sin(time * 0.05) * 0.1;
    } else {
      // Orbiting monoliths
      meshRef.current.position.x = position[0] + Math.sin(time * 0.1 + position[2]) * 3;
      meshRef.current.position.z = position[2] + Math.cos(time * 0.1 + position[2]) * 3;
    }
    
    meshRef.current.position.y = position[1] + Math.sin(time * 0.2 + position[0]) * 0.3;
  });

  const scale = isCentral ? [12, 8, 0.2] : [6, 4, 0.2];

  return (
    <mesh ref={meshRef} position={position} scale={scale as [number, number, number]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        map={textureRef.current}
        emissive="#7B5EA7"
        emissiveIntensity={0.3}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function Zone03Videos({ progress }: { progress: number }) {
  const videos = useMemo(() => [
    { pos: [0, 0, -380] as [number, number, number], src: "/videos/portfolio/kling_20260321_VIDEO_Create_a_1_5988_0.mp4", central: true },
    { pos: [-15, 5, -390] as [number, number, number], src: "/videos/portfolio/kling_20260321_VIDEO_Create_a_c_5937_0.mp4" },
    { pos: [15, -3, -395] as [number, number, number], src: "/videos/portfolio/kling_20260321_作品_Create_a_1_6119_0.mp4" },
    { pos: [-10, -6, -385] as [number, number, number], src: "/videos/portfolio/kling_20260421_VIDEO_shot_1_2s__3554_0.mp4" },
  ], []);

  return (
    <group visible={progress > 0.35}>
      {videos.map((v, i) => (
        <VideoMonolith key={i} position={v.pos} videoSrc={v.src} isCentral={v.central} />
      ))}
    </group>
  );
}
