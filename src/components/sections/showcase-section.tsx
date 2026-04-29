"use client";

import React from "react";

export default function ShowcaseSection() {
  return (
    <section
      id="work"
      className="relative py-32 px-6 lg:px-12 bg-gradient-to-b from-obsidian via-midnight-indigo/10 to-obsidian"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="text-center mb-20">
          <p className="text-royal-gold text-[10px] font-sans font-medium tracking-luxury uppercase mb-4">
            Selected Work
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-ivory">
            Work Showcase
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-royal-gold" />
            <div className="w-1.5 h-1.5 rotate-45 border border-royal-gold" />
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-royal-gold" />
          </div>
        </div>

        <div className="flex items-center justify-center h-64 border border-royal-gold/10 border-dashed rounded-sharp">
          <p className="text-ivory/30 text-sm font-sans tracking-luxury uppercase">
            Portfolio Grid — Phase 3
          </p>
        </div>
      </div>
    </section>
  );
}
