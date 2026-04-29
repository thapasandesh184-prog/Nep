"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import GoldButton from "@/components/ui/gold-button";
import MobileFallback from "./hero/mobile-fallback";

// Lazy load Three.js scene — no SSR
const HeroScene = dynamic(() => import("./hero/hero-scene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-8 h-8 border border-royal-gold/30 rotate-45 animate-pulse" />
    </div>
  ),
});

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ornamentRef = useRef<HTMLDivElement>(null);
  const subcopyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [, setSceneLoaded] = useState(false);

  // Detect mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Loading sequence with GSAP
  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({ delay: 0.3 });

    // 0-400ms: Background/grid already visible via CSS
    // 400-800ms: Canvas fades in
    tl.fromTo(
      canvasContainerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: "power2.out" },
      0.4
    );

    // 1200-1600ms: Eyebrow fades in
    tl.fromTo(
      eyebrowRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      1.2
    );

    // 1600-2000ms: Headline word-by-word reveal
    if (headlineRef.current) {
      const words = headlineRef.current.querySelectorAll(".word");
      tl.fromTo(
        words,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
        },
        1.6
      );
    }

    // 1800-2200ms: Ornament divider
    tl.fromTo(
      ornamentRef.current,
      { opacity: 0, scaleX: 0.5 },
      { opacity: 1, scaleX: 1, duration: 0.6, ease: "power2.out" },
      1.8
    );

    // 2000-2400ms: Sub-copy, CTA buttons
    tl.fromTo(
      [subcopyRef.current, ctaRef.current],
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" },
      2.0
    );

    // Mark scene as loaded after animation starts
    const timer = setTimeout(() => setSceneLoaded(true), 400);

    return () => {
      tl.kill();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background gradient depth layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-obsidian via-obsidian to-midnight-indigo/30 pointer-events-none" />

      {/* 3D Scene or Mobile Fallback */}
      <div
        ref={canvasContainerRef}
        className="absolute inset-0 opacity-0"
        style={{ willChange: "transform" }}
      >
        {isMobile ? <MobileFallback /> : <HeroScene />}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 w-full pt-20">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <p
            ref={eyebrowRef}
            className="text-royal-gold text-[10px] font-sans font-medium tracking-luxury uppercase mb-6 opacity-0"
          >
            Premium AI Creative Studio
          </p>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="font-serif text-5xl sm:text-6xl lg:text-7xl text-ivory leading-[1.1] mb-8"
          >
            <span className="word inline-block opacity-0">We</span>{" "}
            <span className="word inline-block opacity-0">make</span>{" "}
            <span className="word inline-block opacity-0">brands</span>
            <br />
            <span className="word inline-block opacity-0">look</span>{" "}
            <span className="word inline-block opacity-0 italic text-royal-gold">
              inevitable.
            </span>
          </h1>

          {/* Ornamental Divider */}
          <div
            ref={ornamentRef}
            className="flex items-center gap-4 mb-8 max-w-xs opacity-0"
          >
            <div className="h-[1px] flex-1 bg-gradient-to-r from-royal-gold to-transparent" />
            <div className="w-1.5 h-1.5 rotate-45 border border-royal-gold" />
            <div className="h-[1px] flex-1 bg-gradient-to-l from-royal-gold to-transparent" />
          </div>

          {/* Sub-copy */}
          <p
            ref={subcopyRef}
            className="font-sans text-base text-ivory/50 max-w-xl mb-10 leading-relaxed opacity-0"
          >
            AI-generated visuals, ad creatives, and world-class development —
            crafted with the precision of a royal atelier for the modern digital
            era.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap gap-4 opacity-0">
            <GoldButton variant="primary" href="#contact">
              Begin your project
            </GoldButton>
            <GoldButton variant="ghost" href="#work">
              View our work
            </GoldButton>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-obsidian to-transparent pointer-events-none" />
    </section>
  );
}
