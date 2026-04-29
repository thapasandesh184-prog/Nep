"use client";

import React from "react";
import GoldButton from "@/components/ui/gold-button";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background gradient depth layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-obsidian via-obsidian to-midnight-indigo/30 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 w-full pt-20">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <p className="text-royal-gold text-[10px] font-sans font-medium tracking-luxury uppercase mb-6">
            Premium AI Creative Studio
          </p>

          {/* Headline */}
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-ivory leading-[1.1] mb-8">
            We make brands
            <br />
            look{" "}
            <span className="italic text-royal-gold">inevitable.</span>
          </h1>

          {/* Ornamental Divider */}
          <div className="flex items-center gap-4 mb-8 max-w-xs">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-royal-gold to-transparent" />
            <div className="w-1.5 h-1.5 rotate-45 border border-royal-gold" />
            <div className="h-[1px] flex-1 bg-gradient-to-l from-royal-gold to-transparent" />
          </div>

          {/* Sub-copy */}
          <p className="font-sans text-base text-ivory/50 max-w-xl mb-10 leading-relaxed">
            AI-generated visuals, ad creatives, and world-class development —
            crafted with the precision of a royal atelier for the modern digital
            era.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <GoldButton variant="primary" href="#contact">
              Begin your project
            </GoldButton>
            <GoldButton variant="ghost" href="#work">
              View our work
            </GoldButton>
          </div>
        </div>
      </div>

      {/* 3D Canvas Placeholder — will be replaced with Three.js scene in Phase 2 */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] hidden lg:flex items-center justify-center pointer-events-none">
        <div className="relative">
          {/* Static crown placeholder — CSS diamond motif */}
          <div className="w-64 h-64 border border-royal-gold/20 rotate-45 flex items-center justify-center animate-float">
            <div className="w-48 h-48 border border-royal-gold/30 flex items-center justify-center">
              <div className="w-32 h-32 border border-royal-gold/40 flex items-center justify-center">
                <div className="w-16 h-16 bg-royal-gold/20 rotate-0" />
              </div>
            </div>
          </div>
          {/* Label */}
          <p className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-royal-gold/40 text-[10px] tracking-luxury uppercase whitespace-nowrap">
            3D Scene — Phase 2
          </p>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-obsidian to-transparent pointer-events-none" />
    </section>
  );
}
