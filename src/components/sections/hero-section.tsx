"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import FloatingCards from "./hero/floating-cards";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const goldRef = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(cardsRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5, ease: "power2.out" }, 0);

    // Line 1: "WE MAKE" — massive, left, slides from left
    tl.fromTo(line1Ref.current, 
      { x: -120, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" }, 0.2
    );

    // Line 2: "brands" — massive, indented, slides from below
    tl.fromTo(line2Ref.current, 
      { y: 80, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }, 0.5
    );

    // Line 3: "look" — right side, from right
    tl.fromTo(line3Ref.current, 
      { x: 120, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" }, 0.8
    );

    // "inevitable." — gold, massive, scale in with rotation
    tl.fromTo(goldRef.current, 
      { scale: 0.8, opacity: 0, rotateX: 15 }, 
      { scale: 1, opacity: 1, rotateX: 0, duration: 1.4, ease: "power3.out" }, 1.0
    );

    // Subcopy and CTA
    tl.fromTo([subRef.current, ctaRef.current], 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" }, 1.6
    );

    return () => { tl.kill(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[110vh] flex items-end overflow-hidden pb-24 lg:pb-32"
    >
      {/* Floating cards depth layer */}
      <div ref={cardsRef} className="absolute inset-0 opacity-0 z-0">
        <FloatingCards />
      </div>

      {/* Atmospheric gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/90 via-transparent to-obsidian z-[1] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian/70 via-transparent to-obsidian/70 z-[1] pointer-events-none" />

      {/* Main asymmetric composition */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 lg:px-16">
        {/* Eyebrow — absolute positioned, top left */}
        <p className="absolute top-8 left-6 lg:left-16 text-royal-gold text-[9px] font-sans font-medium tracking-[0.25em] uppercase">
          Premium AI Creative Studio — Est. 2024
        </p>

        {/* Asymmetric headline block */}
        <div className="relative mt-32 lg:mt-20">
          {/* Line 1: WE MAKE — massive, left-aligned, uppercase */}
          <div ref={line1Ref} className="overflow-hidden">
            <h1 className="font-serif text-[clamp(3.5rem,12vw,10rem)] leading-[0.9] tracking-[-0.02em] text-ivory uppercase">
              We make
            </h1>
          </div>

          {/* Line 2: brands — even larger, indented right, lowercase for contrast */}
          <div ref={line2Ref} className="overflow-hidden ml-[5vw] lg:ml-[10vw] -mt-2 lg:-mt-4">
            <h1 className="font-serif text-[clamp(4rem,14vw,12rem)] leading-[0.85] tracking-[-0.03em] text-ivory/90">
              brands
            </h1>
          </div>

          {/* Line 3: look — positioned right side, creating tension */}
          <div ref={line3Ref} className="overflow-hidden text-right lg:text-left lg:ml-[35vw] -mt-2 lg:-mt-6">
            <h1 className="font-serif text-[clamp(3rem,10vw,8rem)] leading-[0.9] tracking-[-0.02em] text-ivory/70">
              look
            </h1>
          </div>

          {/* Gold word: inevitable. — massive, overlapping, right-aligned */}
          <div className="absolute right-0 lg:right-16 bottom-0 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/3">
            <span
              ref={goldRef}
              className="font-serif text-[clamp(3.5rem,12vw,10rem)] leading-[0.85] italic text-royal-gold block"
              style={{ textShadow: "0 0 60px rgba(201,169,110,0.15)" }}
            >
              inevitable.
            </span>
          </div>
        </div>

        {/* Bottom bar: subcopy left, CTA right — asymmetric */}
        <div className="mt-16 lg:mt-24 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <p
            ref={subRef}
            className="font-sans text-sm lg:text-base text-ivory/40 max-w-md leading-relaxed"
          >
            AI-generated visuals, ad creatives, and world-class development —
            crafted with the precision of a royal atelier for the modern digital
            era.
          </p>

          <div ref={ctaRef} className="flex items-center gap-6">
            <a
              href="#contact"
              className="group relative px-8 py-4 bg-royal-gold text-obsidian text-xs font-sans font-medium tracking-[0.2em] uppercase overflow-hidden"
            >
              <span className="relative z-10">Begin Project</span>
              <span className="absolute inset-0 bg-champagne translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-luxury" />
            </a>
            <a
              href="#work"
              className="font-sans text-xs text-ivory/50 tracking-[0.2em] uppercase hover:text-royal-gold transition-colors duration-500 group"
            >
              View Work
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-500">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom edge fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-obsidian to-transparent pointer-events-none z-[3]" />
    </section>
  );
}
