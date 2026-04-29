"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Hide on touch devices
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      setIsVisible(true);

      // Check if hovering interactive element
      const element = document.elementFromPoint(e.clientX, e.clientY);
      const isInteractive =
        element?.closest("a, button, [role='button'], input, textarea, select") !== null;
      setIsPointer(isInteractive);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    // Animation loop with lerp (120-180ms feel)
    let raf: number;
    const lerp = 0.12; // ~150ms response time

    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * lerp;
      pos.current.y += (target.current.y - pos.current.y) * lerp;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${target.current.x}px, ${target.current.y}px) translate(-50%, -50%)`;
      }

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Orb */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:block transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className={`rounded-full border transition-all duration-500 ease-luxury ${
            isPointer
              ? "w-12 h-12 border-royal-gold/60 bg-royal-gold/10"
              : "w-8 h-8 border-royal-gold/30 bg-transparent"
          }`}
        />
      </div>

      {/* Center dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:block transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className={`rounded-full bg-royal-gold transition-all duration-300 ${
            isPointer ? "w-1 h-1 opacity-0" : "w-1 h-1 opacity-60"
          }`}
        />
      </div>

      {/* Hide default cursor on desktop */}
      <style jsx global>{`
        @media (hover: hover) and (pointer: fine) {
          body {
            cursor: none;
          }
          a, button, [role="button"], input, textarea, select {
            cursor: none;
          }
        }
      `}</style>
    </>
  );
}
