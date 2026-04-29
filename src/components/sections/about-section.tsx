"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (textRef.current) {
        gsap.fromTo(
          textRef.current.querySelectorAll(".animate-in"),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, x: 40, rotate: 5 },
          {
            opacity: 1,
            x: 0,
            rotate: 3,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 px-6 lg:px-12 bg-gradient-to-b from-obsidian via-midnight-indigo/10 to-obsidian"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
          {/* Text — 60% */}
          <div ref={textRef} className="lg:col-span-3">
            <p className="animate-in text-royal-gold text-[10px] font-sans font-medium tracking-luxury uppercase mb-4">
              The Founder
            </p>
            <h2 className="animate-in font-serif text-4xl lg:text-5xl text-ivory mb-10">
              About
            </h2>

            <p className="animate-in font-serif text-xl lg:text-2xl text-ivory/90 leading-relaxed mb-8">
              I built Nepovoxel because I believe every brand deserves to look
              like it has a $10 million creative team behind it.
            </p>

            <p className="animate-in font-sans text-base text-ivory/60 leading-relaxed mb-6">
              With a background in design and a deep obsession with emerging AI
              tools, I saw an opportunity to bridge the gap between what
              e-commerce brands need and what traditional agencies charge. The
              result is a precision studio that delivers studio-quality visuals
              at a fraction of the cost — without sacrificing an ounce of craft.
            </p>

            <p className="animate-in font-sans text-base text-ivory/60 leading-relaxed mb-8">
              Working with Nepovoxel means direct collaboration, transparent
              timelines, and a relentless commitment to making your brand look
              inevitable. Every deliverable is reviewed at the pixel level.
              Every decision is made with your growth in mind.
            </p>

            <p className="animate-in font-serif text-lg text-ivory/80 italic mb-10">
              If that sounds like the kind of creative partner you have been
              looking for, I would love to hear about your brand.
            </p>

            {/* Credibility stats */}
            <div className="animate-in flex flex-wrap gap-10">
              <div className="group">
                <p className="font-serif text-3xl text-royal-gold mb-1 transition-transform duration-500 group-hover:scale-110">
                  5+
                </p>
                <p className="font-sans text-[10px] text-ivory/40 tracking-luxury uppercase">
                  Years Experience
                </p>
              </div>
              <div className="group">
                <p className="font-serif text-3xl text-royal-gold mb-1 transition-transform duration-500 group-hover:scale-110">
                  50+
                </p>
                <p className="font-sans text-[10px] text-ivory/40 tracking-luxury uppercase">
                  Tools Mastered
                </p>
              </div>
              <div className="group">
                <p className="font-serif text-3xl text-royal-gold mb-1 transition-transform duration-500 group-hover:scale-110">
                  12+
                </p>
                <p className="font-sans text-[10px] text-ivory/40 tracking-luxury uppercase">
                  Brands Helped
                </p>
              </div>
            </div>

            {/* Social links */}
            <div className="animate-in flex gap-6 mt-10 pt-8 border-t border-royal-gold/10">
              {["LinkedIn", "Instagram", "Portfolio"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="font-sans text-xs text-ivory/40 tracking-luxury uppercase hover:text-royal-gold transition-colors duration-500"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Portrait — 40% */}
          <div ref={imageRef} className="lg:col-span-2 flex justify-center">
            <div className="relative">
              <div className="w-72 h-96 lg:w-80 lg:h-[28rem] border border-royal-gold/30 rotate-3 flex items-center justify-center bg-mahogany/50 overflow-hidden group">
                {/* Placeholder portrait */}
                <div className="text-center p-8">
                  <div className="w-24 h-24 border border-royal-gold/40 rotate-45 mx-auto mb-8 flex items-center justify-center">
                    <div className="w-10 h-10 bg-royal-gold/20 -rotate-45" />
                  </div>
                  <p className="text-ivory/30 text-xs font-sans tracking-luxury uppercase mb-2">
                    Founder Portrait
                  </p>
                  <p className="text-ivory/20 text-[10px] font-sans">
                    Replace with your photo
                  </p>
                </div>

                {/* Gold rim light effect */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-royal-gold/10 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-royal-gold/5 to-transparent pointer-events-none" />
              </div>

              {/* Outer glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-royal-gold/5 via-transparent to-royal-gold/10 -z-10 blur-2xl" />

              {/* Corner decoration */}
              <div className="absolute -top-3 -right-3 w-8 h-8 border-t border-r border-royal-gold/40" />
              <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b border-l border-royal-gold/40" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
