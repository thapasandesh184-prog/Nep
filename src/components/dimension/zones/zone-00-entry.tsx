"use client";

import React, { useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

// ─── Gallery Image Screen ───
function GalleryImage({
  position,
  imageSrc,
  width = 6,
  height = 7.5,
  progress,
  index,
}: {
  position: [number, number, number];
  imageSrc: string;
  width?: number;
  height?: number;
  progress: number;
  index: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const texture = useLoader(THREE.TextureLoader, imageSrc);

  // Reveal threshold based on index
  const revealThreshold = index * 0.006;

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;

    const time = state.clock.elapsedTime;

    // Gentle floating
    meshRef.current.position.y =
      position[1] + Math.sin(time * 0.25 + index * 1.3) * 0.4;
    meshRef.current.rotation.y =
      Math.sin(time * 0.08 + index * 0.7) * 0.04;
    meshRef.current.rotation.z =
      Math.sin(time * 0.05 + index * 0.5) * 0.015;

    // Reveal based on scroll progress
    const revealed = progress > revealThreshold;
    const targetOpacity = revealed ? 0.95 : 0.02;
    materialRef.current.opacity = THREE.MathUtils.lerp(
      materialRef.current.opacity,
      targetOpacity,
      0.03
    );

    // Scale-in effect
    const targetScale = revealed ? 1 : 0.85;
    const s = THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.03);
    meshRef.current.scale.set(s, s, s);
  });

  return (
    <group position={position}>
      {/* Image plane */}
      <mesh ref={meshRef} scale={0.85}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial
          ref={materialRef}
          map={texture}
          transparent
          opacity={0.02}
          side={THREE.DoubleSide}
          emissive="#7B5EA7"
          emissiveIntensity={0.08}
        />
      </mesh>

      {/* Glow frame */}
      <lineSegments>
        <edgesGeometry args={[new THREE.PlaneGeometry(width, height)]} />
        <lineBasicMaterial
          color="#7B5EA7"
          transparent
          opacity={0.25}
        />
      </lineSegments>

      {/* Corner accent dots */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={4}
            array={
              new Float32Array([
                -width / 2,
                height / 2,
                0.01,
                width / 2,
                height / 2,
                0.01,
                -width / 2,
                -height / 2,
                0.01,
                width / 2,
                -height / 2,
                0.01,
              ])
            }
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          color="#34D399"
          transparent
          opacity={0.5}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

// ─── Gallery Video Screen ───
function GalleryVideo({
  position,
  videoSrc,
  width = 6,
  height = 7.5,
  progress,
  index,
}: {
  position: [number, number, number];
  videoSrc: string;
  width?: number;
  height?: number;
  progress: number;
  index: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const textureRef = useRef<THREE.VideoTexture | null>(null);

  const revealThreshold = index * 0.006;

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

    // Gentle floating — slightly different rhythm than images
    meshRef.current.position.y =
      position[1] + Math.sin(time * 0.3 + index * 1.1) * 0.35;
    meshRef.current.rotation.y =
      Math.sin(time * 0.07 + index * 0.9) * 0.035;
    meshRef.current.rotation.z =
      Math.sin(time * 0.04 + index * 0.6) * 0.012;

    // Reveal based on scroll progress
    const revealed = progress > revealThreshold;
    const targetOpacity = revealed ? 0.95 : 0.02;
    materialRef.current.opacity = THREE.MathUtils.lerp(
      materialRef.current.opacity,
      targetOpacity,
      0.03
    );

    // Scale-in effect
    const targetScale = revealed ? 1 : 0.85;
    const s = THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.03);
    meshRef.current.scale.set(s, s, s);

    // Play/pause video based on visibility
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
      <mesh ref={meshRef} scale={0.85}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial
          ref={materialRef}
          map={textureRef.current}
          transparent
          opacity={0.02}
          side={THREE.DoubleSide}
          emissive="#34D399"
          emissiveIntensity={0.06}
        />
      </mesh>

      {/* Glow frame — teal for videos */}
      <lineSegments>
        <edgesGeometry args={[new THREE.PlaneGeometry(width, height)]} />
        <lineBasicMaterial
          color="#34D399"
          transparent
          opacity={0.25}
        />
      </lineSegments>

      {/* Corner accent dots — violet for videos */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={4}
            array={
              new Float32Array([
                -width / 2,
                height / 2,
                0.01,
                width / 2,
                height / 2,
                0.01,
                -width / 2,
                -height / 2,
                0.01,
                width / 2,
                -height / 2,
                0.01,
              ])
            }
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          color="#7B5EA7"
          transparent
          opacity={0.5}
          sizeAttenuation
        />
      </points>

      {/* Play indicator — small triangle */}
      <mesh position={[width / 2 + 0.4, -height / 2 + 0.4, 0.02]}>
        <circleGeometry args={[0.18, 3]} />
        <meshBasicMaterial color="#34D399" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

// ─── Main Zone 00 Component ───
export default function Zone00Entry({ progress }: { progress: number }) {
  const galleryItems = useMemo(
    () => [
      // Images
      {
        type: "image" as const,
        src: "/images/portfolio/kling_20260321_作品_Generate_a_5910_0.png",
        pos: [-5, 9, -18] as [number, number, number],
        w: 5.5,
        h: 7,
      },
      {
        type: "video" as const,
        src: "/videos/portfolio/kling_20260321_VIDEO_Create_a_1_5988_0.mp4",
        pos: [6, 6, -25] as [number, number, number],
        w: 6,
        h: 4,
      },
      {
        type: "image" as const,
        src: "/images/portfolio/kling_20260321_作品_Generate_a_5910_1.png",
        pos: [-4, 2.5, -32] as [number, number, number],
        w: 5,
        h: 6.5,
      },
      {
        type: "video" as const,
        src: "/videos/portfolio/kling_20260321_VIDEO_Create_a_c_5937_0.mp4",
        pos: [5.5, -0.5, -40] as [number, number, number],
        w: 5.5,
        h: 3.5,
      },
      {
        type: "image" as const,
        src: "/images/portfolio/kling_20260321_作品_Generate_a_5910_5.png",
        pos: [-6, -4, -48] as [number, number, number],
        w: 6,
        h: 7.5,
      },
      {
        type: "video" as const,
        src: "/videos/portfolio/kling_20260321_作品_Create_a_1_6119_0.mp4",
        pos: [4.5, -7.5, -55] as [number, number, number],
        w: 5,
        h: 3,
      },
      {
        type: "image" as const,
        src: "/images/portfolio/kling_20260421_IMAGE_South_Asia_3545_1.png",
        pos: [-3.5, -10.5, -62] as [number, number, number],
        w: 5.5,
        h: 7,
      },
      {
        type: "video" as const,
        src: "/videos/portfolio/kling_20260421_VIDEO_shot_1_2s__3554_0.mp4",
        pos: [5, -13.5, -69] as [number, number, number],
        w: 5,
        h: 3,
      },
      {
        type: "image" as const,
        src: "/images/portfolio/Whisk_149f9df37052850b3bc40c5eb341bb84eg.png",
        pos: [-5.5, -16.5, -75] as [number, number, number],
        w: 5,
        h: 6.5,
      },
      {
        type: "image" as const,
        src: "/images/portfolio/Whisk_616d2dfce8e323184904e38a31aac0e4eg.png",
        pos: [4, -19.5, -82] as [number, number, number],
        w: 4.5,
        h: 6,
      },
    ],
    []
  );

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
          />
        )
      )}

      {/* Ambient vertical light strips for atmosphere */}
      <VerticalLightStrips progress={progress} />
    </group>
  );
}

// ─── Ambient vertical light strips ───
function VerticalLightStrips({ progress }: { progress: number }) {
  const linesRef = useRef<THREE.Points>(null);

  const points = useMemo(() => {
    const positions = new Float32Array(60 * 3);
    const colors = new Float32Array(60 * 3);
    const violet = new THREE.Color("#7B5EA7");
    const teal = new THREE.Color("#34D399");

    for (let i = 0; i < 60; i++) {
      // Vertical lines scattered around the gallery
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = -15 - Math.random() * 70;

      const c = i % 3 === 0 ? teal : violet;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    return { positions, colors };
  }, []);

  useFrame(() => {
    if (!linesRef.current) return;
    // Fade in based on progress
    const targetOpacity = Math.min(progress * 15, 0.4);
    (linesRef.current.material as THREE.PointsMaterial).opacity = targetOpacity;
  });

  return (
    <points ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={60}
          array={points.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={60}
          array={points.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
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
