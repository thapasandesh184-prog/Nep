"use client";

import React, { useEffect, useRef } from "react";

export default function PhotonCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const trail = useRef<{ x: number; y: number; life: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      // Add new particle
      trail.current.push({ x: e.clientX, y: e.clientY, life: 1 });
    };

    window.addEventListener("mousemove", handleMove);

    let raf: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw trail
      trail.current = trail.current.filter((p) => {
        p.life -= 0.03;
        return p.life > 0;
      });

      trail.current.forEach((p) => {
        const size = p.life * 3;
        const alpha = p.life * 0.6;
        
        // Gradient from violet to teal
        const hue = 260 + (1 - p.life) * 60; // violet to teal
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue}, 70%, 60%, ${alpha})`;
        ctx.fill();
      });

      // Draw cursor glow
      const gradient = ctx.createRadialGradient(
        pos.current.x, pos.current.y, 0,
        pos.current.x, pos.current.y, 20
      );
      gradient.addColorStop(0, "rgba(123, 94, 167, 0.3)");
      gradient.addColorStop(1, "rgba(123, 94, 167, 0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(pos.current.x, pos.current.y, 20, 0, Math.PI * 2);
      ctx.fill();

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[100] pointer-events-none hidden lg:block"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
