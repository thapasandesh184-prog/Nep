"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current!.querySelectorAll(".animate-in"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-28 lg:py-40 px-6 lg:px-12 overflow-hidden bg-[#FAFAFA]"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet/[0.02] via-transparent to-teal/[0.01] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left column */}
          <div className="lg:col-span-5">
            <p className="animate-in text-violet text-[10px] font-sans tracking-[0.3em] uppercase mb-6">
              About
            </p>
            <h2 className="animate-in font-serif text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.02em] text-gray-900 mb-8">
              Built on the belief that every brand deserves to look premium
            </h2>

            <div className="animate-in aspect-[4/5] max-w-sm bg-gray-100 border border-gray-200 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-violet/5 border border-violet/10 flex items-center justify-center">
                  <span className="font-serif text-2xl text-violet/40">N</span>
                </div>
                <p className="font-sans text-xs text-gray-300 tracking-wider uppercase">
                  Founder Portrait
                </p>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="lg:col-span-5 lg:col-start-8 lg:pt-16">
            <p className="animate-in font-sans text-base text-gray-600 leading-relaxed mb-6">
              Nepovoxel was born from a simple observation: the gap between what
              e-commerce brands need and what traditional agencies charge has
              become untenable.
            </p>
            <p className="animate-in font-sans text-base text-gray-600 leading-relaxed mb-6">
              With a background in design and a deep obsession with emerging AI
              tools, I saw an opportunity to deliver studio-quality visuals at a
              fraction of the cost — without sacrificing an ounce of craft.
            </p>
            <p className="animate-in font-sans text-base text-gray-600 leading-relaxed mb-10">
              The result is a precision studio that combines AI generation with
              human curation, delivering work that is indistinguishable from
              traditional production — faster and more affordably.
            </p>

            {/* Stats */}
            <div className="animate-in grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div>
                <p className="font-serif text-2xl lg:text-3xl text-violet">
                  5+
                </p>
                <p className="font-sans text-[10px] text-gray-400 tracking-[0.15em] uppercase mt-1">
                  Years
                </p>
              </div>
              <div>
                <p className="font-serif text-2xl lg:text-3xl text-violet">
                  50+
                </p>
                <p className="font-sans text-[10px] text-gray-400 tracking-[0.15em] uppercase mt-1">
                  AI Tools
                </p>
              </div>
              <div>
                <p className="font-serif text-2xl lg:text-3xl text-violet">
                  12+
                </p>
                <p className="font-sans text-[10px] text-gray-400 tracking-[0.15em] uppercase mt-1">
                  Brands
                </p>
              </div>
            </div>

            <div className="animate-in flex gap-6 mt-10">
              {["LinkedIn", "Instagram"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="font-sans text-xs text-gray-400 tracking-[0.12em] uppercase hover:text-violet transition-colors duration-500"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
