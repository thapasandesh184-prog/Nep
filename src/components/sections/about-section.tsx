"use client";

import React from "react";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-32 px-6 lg:px-12 bg-gradient-to-b from-obsidian via-midnight-indigo/10 to-obsidian"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Text — 60% */}
          <div className="lg:col-span-3">
            <p className="text-royal-gold text-[10px] font-sans font-medium tracking-luxury uppercase mb-4">
              The Founder
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl text-ivory mb-8">
              About
            </h2>

            <p className="font-serif text-xl text-ivory/90 leading-relaxed mb-6">
              I built Nepovoxel because I believe every brand deserves to look
              like it has a $10 million creative team behind it.
            </p>

            <p className="font-sans text-base text-ivory/60 leading-relaxed mb-6">
              With a background in design and a deep obsession with emerging AI
              tools, I saw an opportunity to bridge the gap between what
              e-commerce brands need and what traditional agencies charge. The
              result is a precision studio that delivers studio-quality visuals
              at a fraction of the cost — without sacrificing an ounce of craft.
            </p>

            <p className="font-sans text-base text-ivory/60 leading-relaxed mb-8">
              Working with Nepovoxel means direct collaboration, transparent
              timelines, and a relentless commitment to making your brand look
              inevitable. Every deliverable is reviewed at the pixel level.
              Every decision is made with your growth in mind.
            </p>

            <p className="font-serif text-lg text-ivory/80 italic mb-8">
              If that sounds like the kind of creative partner you have been
              looking for, I would love to hear about your brand.
            </p>

            {/* Credibility stats */}
            <div className="flex flex-wrap gap-8">
              <div>
                <p className="font-serif text-2xl text-royal-gold">5+</p>
                <p className="font-sans text-[10px] text-ivory/40 tracking-luxury uppercase">
                  Years Experience
                </p>
              </div>
              <div>
                <p className="font-serif text-2xl text-royal-gold">50+</p>
                <p className="font-sans text-[10px] text-ivory/40 tracking-luxury uppercase">
                  Tools Mastered
                </p>
              </div>
              <div>
                <p className="font-serif text-2xl text-royal-gold">12+</p>
                <p className="font-sans text-[10px] text-ivory/40 tracking-luxury uppercase">
                  Brands Helped
                </p>
              </div>
            </div>
          </div>

          {/* Portrait — 40% */}
          <div className="lg:col-span-2 flex justify-center">
            <div className="relative">
              <div className="w-72 h-96 border border-royal-gold/30 rotate-3 flex items-center justify-center bg-mahogany/50">
                <div className="text-center">
                  <div className="w-24 h-24 border border-royal-gold/40 rotate-45 mx-auto mb-6 flex items-center justify-center">
                    <div className="w-10 h-10 bg-royal-gold/20 -rotate-45" />
                  </div>
                  <p className="text-ivory/30 text-xs font-sans tracking-luxury uppercase">
                    Founder Portrait
                  </p>
                </div>
              </div>
              {/* Gold rim light effect */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-royal-gold/5 via-transparent to-royal-gold/10 -z-10 blur-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
