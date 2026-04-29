"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import GoldButton from "@/components/ui/gold-button";
import FloatingCards from "./hero/floating-cards";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ornamentRef = useRef<HTMLDivElement>(null);
  const subcopyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Loading sequence with GSAP
  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({ delay: 0.2 });

    // Cards fade in first
    tl.fromTo(
      cardsRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: "power2.out" },
      0
    );

    // Eyebrow fades in
    tl.fromTo(
      eyebrowRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      0.6
    );

    // Headline word-by-word reveal
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
        0.8
      );
    }

    // Ornament divider
    tl.fromTo(
      ornamentRef.current,
      { opacity: 0, scaleX: 0.5 },
      { opacity: 1, scaleX: 1, duration: 0.6, ease: "power2.out" },
      1.2
    );

    // Sub-copy, CTA buttons
    tl.fromTo(
      [subcopyRef.current, ctaRef.current],
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" },
      1.4
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-obsidian/95 to-obsidian pointer-events-none z-[1]" />

      {/* Floating cards background */}
      <div ref={cardsRef} className="absolute inset-0 opacity-0 z-0">
        <FloatingCards />
      </div>

      {/* Radial vignette for text readability */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(12,10,8,0.7) 0%, rgba(12,10,8,0.3) 50%, rgba(12,10,8,0.6) 100%)",
        }}
      />

      {/* Content — CENTERED */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center pt-20">
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
          className="font-serif text-5xl sm:text-6xl lg:text-8xl text-ivory leading-[1.05] mb-8"
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
          className="flex items-center justify-center gap-4 mb-8 opacity-0"
        >
          <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-royal-gold" />
          <div className="w-1.5 h-1.5 rotate-45 border border-royal-gold" />
          <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-royal-gold" />
        </div>

        {/* Sub-copy */}
        <p
          ref={subcopyRef}
          className="font-sans text-base lg:text-lg text-ivory/50 max-w-2xl mx-auto mb-10 leading-relaxed opacity-0"
        >
          AI-generated visuals, ad creatives, and world-class development —
          crafted with the precision of a royal atelier for the modern digital
          era.
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="flex flex-wrap items-center justify-center gap-4 opacity-0"
        >
          <GoldButton variant="primary" href="#contact">
            Begin your project
          </GoldButton>
          <GoldButton variant="ghost" href="#work">
            View our work
          </GoldButton>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-obsidian to-transparent pointer-events-none z-[3]" />
    </section>
  );
}
