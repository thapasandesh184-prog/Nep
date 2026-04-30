"use client";

import React, { useMemo } from "react";
import Image from "next/image";

interface CardDef {
  src: string;
  x: string;
  y: string;
  w: number;
  h: number;
  rot: number;
  duration: number;
  delay: number;
  opacity: number;
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
  "/images/portfolio/kling_20260313_作品_GlowPure_S_3800_0 (2).png",
  "/images/portfolio/ChatGPT Image Apr 22, 2026, 05_39_56 PM.png",
  "/images/portfolio/ChatGPT Image Apr 22, 2026, 05_40_03 PM.png",
  "/images/portfolio/ChatGPT Image Apr 22, 2026, 05_41_31 PM.png",
];

function makeCards(): CardDef[] {
  const positions: Omit<CardDef, "src">[] = [
    { x: "2%", y: "5%", w: 280, h: 360, rot: -4, duration: 18, delay: 0, opacity: 0.55, z: 2 },
    { x: "72%", y: "2%", w: 240, h: 320, rot: 3, duration: 22, delay: 1, opacity: 0.45, z: 1 },
    { x: "82%", y: "38%", w: 220, h: 280, rot: -2, duration: 20, delay: 2.5, opacity: 0.4, z: 1 },
    { x: "1%", y: "42%", w: 200, h: 260, rot: 5, duration: 16, delay: 1.5, opacity: 0.5, z: 1 },
    { x: "60%", y: "65%", w: 260, h: 340, rot: -3, duration: 24, delay: 0.5, opacity: 0.5, z: 2 },
    { x: "18%", y: "68%", w: 190, h: 250, rot: 2, duration: 19, delay: 3, opacity: 0.4, z: 1 },
    { x: "50%", y: "8%", w: 170, h: 230, rot: -5, duration: 21, delay: 2, opacity: 0.35, z: 0 },
    { x: "8%", y: "22%", w: 160, h: 210, rot: 4, duration: 25, delay: 1, opacity: 0.4, z: 0 },
    { x: "86%", y: "18%", w: 150, h: 200, rot: -3, duration: 17, delay: 3.5, opacity: 0.45, z: 1 },
    { x: "38%", y: "2%", w: 140, h: 190, rot: 2, duration: 23, delay: 0.8, opacity: 0.35, z: 0 },
    { x: "32%", y: "58%", w: 230, h: 300, rot: -4, duration: 20, delay: 2.2, opacity: 0.5, z: 2 },
  ];

  return positions.map((pos, i) => ({
    ...pos,
    src: images[i % images.length],
  }));
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
            zIndex: c.z,
            animation: `cardFloat ${c.duration}s ease-in-out ${c.delay}s infinite alternate`,
          }}
        >
          <div className="relative w-full h-full overflow-hidden rounded-sm shadow-lg shadow-black/5">
            <Image
              src={c.src}
              alt=""
              fill
              className="object-cover"
              sizes="300px"
              priority={i < 4}
            />
          </div>
        </div>
      ))}

      <style jsx>{`
        @keyframes cardFloat {
          0% { transform: translateY(0) translateX(0) rotate(var(--r, 0deg)); }
          33% { transform: translateY(-16px) translateX(5px) rotate(var(--r, 0deg)); }
          66% { transform: translateY(-6px) translateX(-3px) rotate(var(--r, 0deg)); }
          100% { transform: translateY(-20px) translateX(8px) rotate(var(--r, 0deg)); }
        }
      `}</style>
    </div>
  );
}
