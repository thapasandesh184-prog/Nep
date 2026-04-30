"use client";

import React, { useMemo } from "react";

interface CardDef {
  type: "image" | "video";
  src: string;
  x: string;
  y: string;
  w: number;
  h: number;
  rot: number;
  duration: number;
  delay: number;
  opacity: number;
  blur: number;
  z: number;
}

const images = [
  "/images/portfolio/kling_20260321_作品_Generate_a_5910_0.png",
  "/images/portfolio/kling_20260321_作品_Generate_a_5910_1.png",
  "/images/portfolio/kling_20260321_作品_Generate_a_5910_5.png",
  "/images/portfolio/kling_20260321_作品_Generate_a_5962_1.png",
  "/images/portfolio/kling_20260421_IMAGE_South_Asia_3545_1.png",
  "/images/portfolio/Whisk_149f9df37052850b3bc40c5eb341bb84eg.png",
  "/images/portfolio/Whisk_616d2dfce8e323184904e38a31aac0e4eg.png",
];

const videos = [
  "/videos/portfolio/kling_20260321_VIDEO_Create_a_1_5988_0.mp4",
  "/videos/portfolio/kling_20260321_VIDEO_Create_a_c_5937_0.mp4",
  "/videos/portfolio/kling_20260321_作品_Create_a_1_6119_0.mp4",
  "/videos/portfolio/kling_20260421_VIDEO_shot_1_2s__3554_0.mp4",
];

function makeCards(): CardDef[] {
  const defs: CardDef[] = [];
  const positions: Omit<CardDef, "type" | "src">[] = [
    { x: "3%", y: "8%", w: 200, h: 260, rot: -6, duration: 22, delay: 0, opacity: 0.12, blur: 1, z: 1 },
    { x: "78%", y: "5%", w: 180, h: 230, rot: 5, duration: 26, delay: 1, opacity: 0.10, blur: 2, z: 0 },
    { x: "85%", y: "45%", w: 160, h: 200, rot: -4, duration: 24, delay: 2.5, opacity: 0.08, blur: 3, z: 0 },
    { x: "2%", y: "55%", w: 150, h: 190, rot: 7, duration: 20, delay: 1.5, opacity: 0.09, blur: 2, z: 0 },
    { x: "65%", y: "75%", w: 190, h: 250, rot: -3, duration: 28, delay: 0.5, opacity: 0.11, blur: 1, z: 1 },
    { x: "20%", y: "78%", w: 140, h: 180, rot: 4, duration: 25, delay: 3, opacity: 0.07, blur: 3, z: 0 },
    { x: "55%", y: "15%", w: 130, h: 170, rot: -8, duration: 23, delay: 2, opacity: 0.08, blur: 2, z: 0 },
    { x: "10%", y: "30%", w: 120, h: 160, rot: 6, duration: 27, delay: 1, opacity: 0.06, blur: 4, z: 0 },
    { x: "88%", y: "25%", w: 110, h: 150, rot: -5, duration: 21, delay: 3.5, opacity: 0.07, blur: 3, z: 0 },
    { x: "40%", y: "5%", w: 100, h: 130, rot: 3, duration: 29, delay: 0.8, opacity: 0.05, blur: 4, z: 0 },
    { x: "35%", y: "70%", w: 170, h: 220, rot: -7, duration: 24, delay: 2.2, opacity: 0.10, blur: 2, z: 1 },
  ];

  const allAssets = [
    ...images.map((src) => ({ type: "image" as const, src })),
    ...videos.map((src) => ({ type: "video" as const, src })),
  ];

  positions.forEach((pos, i) => {
    const asset = allAssets[i % allAssets.length];
    defs.push({ ...pos, ...asset });
  });

  return defs;
}

export default function FloatingCards() {
  const cards = useMemo(() => makeCards(), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {cards.map((c, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: c.x,
            top: c.y,
            width: c.w,
            height: c.h,
            transform: `rotate(${c.rot}deg)`,
            opacity: c.opacity,
            filter: `blur(${c.blur}px)`,
            zIndex: c.z,
            animation: `cardFloat ${c.duration}s ease-in-out ${c.delay}s infinite alternate`,
          }}
        >
          <div className="relative w-full h-full border border-royal-gold/[0.08] overflow-hidden bg-mahogany/20">
            {c.type === "image" ? (
              <img src={c.src} alt="" className="w-full h-full object-cover" loading="eager" />
            ) : (
              <video src={c.src} autoPlay muted loop playsInline className="w-full h-full object-cover" />
            )}
          </div>
        </div>
      ))}

      <style jsx>{`
        @keyframes cardFloat {
          0% { transform: translateY(0) translateX(0) rotate(var(--r, 0deg)); }
          33% { transform: translateY(-18px) translateX(6px) rotate(var(--r, 0deg)); }
          66% { transform: translateY(-8px) translateX(-4px) rotate(var(--r, 0deg)); }
          100% { transform: translateY(-22px) translateX(10px) rotate(var(--r, 0deg)); }
        }
      `}</style>
    </div>
  );
}
