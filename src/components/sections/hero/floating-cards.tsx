"use client";

import React, { useMemo } from "react";

interface FloatingCard {
  id: number;
  type: "image" | "video";
  src: string;
  x: string;
  y: string;
  size: number;
  rotation: number;
  duration: number;
  delay: number;
  opacity: number;
  blur: number;
  zIndex: number;
}

const imageFiles = [
  "/images/portfolio/kling_20260321_作品_Generate_a_5910_0.png",
  "/images/portfolio/kling_20260321_作品_Generate_a_5910_1.png",
  "/images/portfolio/kling_20260321_作品_Generate_a_5910_5.png",
  "/images/portfolio/kling_20260321_作品_Generate_a_5962_1.png",
  "/images/portfolio/kling_20260421_IMAGE_South_Asia_3545_1.png",
  "/images/portfolio/Whisk_149f9df37052850b3bc40c5eb341bb84eg.png",
];

const videoFiles = [
  "/videos/portfolio/kling_20260321_VIDEO_Create_a_1_5988_0.mp4",
  "/videos/portfolio/kling_20260321_VIDEO_Create_a_c_5937_0.mp4",
  "/videos/portfolio/kling_20260321_作品_Create_a_1_6119_0.mp4",
  "/videos/portfolio/kling_20260421_VIDEO_shot_1_2s__3554_0.mp4",
];

function generateCards(): FloatingCard[] {
  const cards: FloatingCard[] = [];
  let id = 0;

  const positions = [
    // Left side
    { x: "5%", y: "15%", size: 180, rotation: -8, duration: 20, delay: 0, opacity: 0.15, blur: 2, zIndex: 1 },
    { x: "2%", y: "55%", size: 140, rotation: 5, duration: 25, delay: 2, opacity: 0.12, blur: 3, zIndex: 0 },
    { x: "8%", y: "75%", size: 160, rotation: -3, duration: 22, delay: 4, opacity: 0.1, blur: 4, zIndex: 0 },
    // Right side
    { x: "78%", y: "10%", size: 200, rotation: 6, duration: 24, delay: 1, opacity: 0.14, blur: 2, zIndex: 1 },
    { x: "85%", y: "45%", size: 150, rotation: -5, duration: 21, delay: 3, opacity: 0.13, blur: 3, zIndex: 0 },
    { x: "75%", y: "70%", size: 170, rotation: 4, duration: 26, delay: 5, opacity: 0.11, blur: 4, zIndex: 0 },
    // Top area
    { x: "30%", y: "5%", size: 130, rotation: -6, duration: 23, delay: 1.5, opacity: 0.1, blur: 3, zIndex: 0 },
    { x: "60%", y: "8%", size: 140, rotation: 7, duration: 19, delay: 3.5, opacity: 0.12, blur: 2, zIndex: 1 },
    // Bottom area
    { x: "25%", y: "80%", size: 150, rotation: 3, duration: 27, delay: 0.5, opacity: 0.1, blur: 4, zIndex: 0 },
    { x: "65%", y: "82%", size: 160, rotation: -4, duration: 20, delay: 4.5, opacity: 0.11, blur: 3, zIndex: 0 },
    // Near center but behind
    { x: "20%", y: "35%", size: 120, rotation: 8, duration: 28, delay: 2.5, opacity: 0.08, blur: 5, zIndex: 0 },
    { x: "70%", y: "30%", size: 130, rotation: -7, duration: 22, delay: 1, opacity: 0.09, blur: 5, zIndex: 0 },
  ];

  // Assign images and videos to positions
  const allAssets = [
    ...imageFiles.map((src) => ({ type: "image" as const, src })),
    ...videoFiles.map((src) => ({ type: "video" as const, src })),
  ];

  positions.forEach((pos, i) => {
    const asset = allAssets[i % allAssets.length];
    cards.push({
      id: id++,
      type: asset.type,
      src: asset.src,
      ...pos,
    });
  });

  return cards;
}

export default function FloatingCards() {
  const cards = useMemo(() => generateCards(), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {cards.map((card) => (
        <div
          key={card.id}
          className="absolute"
          style={{
            left: card.x,
            top: card.y,
            width: card.size,
            height: card.size * 1.2,
            transform: `rotate(${card.rotation}deg)`,
            opacity: card.opacity,
            filter: `blur(${card.blur}px)`,
            zIndex: card.zIndex,
            animation: `floatCard ${card.duration}s ease-in-out ${card.delay}s infinite`,
          }}
        >
          <div className="relative w-full h-full border border-royal-gold/20 bg-mahogany/40 overflow-hidden shadow-[0_0_30px_rgba(201,169,110,0.05)]">
            {card.type === "image" ? (
              <img
                src={card.src}
                alt=""
                className="w-full h-full object-cover"
                loading="eager"
              />
            ) : (
              <video
                src={card.src}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            )}
            {/* Subtle gold edge glow */}
            <div className="absolute inset-0 border border-royal-gold/10 pointer-events-none" />
          </div>
        </div>
      ))}

      {/* CSS for floating animation */}
      <style jsx>{`
        @keyframes floatCard {
          0%, 100% {
            transform: translateY(0) rotate(var(--rotation, 0deg));
          }
          25% {
            transform: translateY(-15px) translateX(5px) rotate(var(--rotation, 0deg));
          }
          50% {
            transform: translateY(-8px) translateX(-3px) rotate(var(--rotation, 0deg));
          }
          75% {
            transform: translateY(-20px) translateX(8px) rotate(var(--rotation, 0deg));
          }
        }
      `}</style>
    </div>
  );
}
