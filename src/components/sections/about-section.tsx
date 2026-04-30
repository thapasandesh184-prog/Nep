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
      gsap.fromTo(sectionRef.current!.querySelectorAll(".animate-in"),
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 55%" }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-40 lg:py-56 px-6 lg:px-16 overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Left column — small label + large statement */}
          <div className="lg:col-span-5">
            <p className="animate-in text-royal-gold text-[9px] font-sans tracking-[0.25em] uppercase mb-8">The Founder</p>
            <h2 className="animate-in font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.02em] text-ivory mb-12">
              Built on the belief that every brand deserves to look like it has a $10M creative team.
            </h2>
          </div>

          {/* Right column — body text + stats */}
          <div className="lg:col-span-5 lg:col-start-8 lg:pt-24">
            <p className="animate-in font-sans text-base text-ivory/40 leading-relaxed mb-8">
              With a background in design and a deep obsession with emerging AI tools, I saw an opportunity to bridge the gap between what e-commerce brands need and what traditional agencies charge.
            </p>
            <p className="animate-in font-sans text-base text-ivory/40 leading-relaxed mb-12">
              The result is a precision studio that delivers studio-quality visuals at a fraction of the cost — without sacrificing an ounce of craft.
            </p>

            {/* Stats */}
            <div className="animate-in grid grid-cols-3 gap-8 pt-8 border-t border-ivory/5">
              <div>
                <p className="font-serif text-3xl text-royal-gold">5+</p>
                <p className="font-sans text-[10px] text-ivory/30 tracking-[0.2em] uppercase mt-1">Years</p>
              </div>
              <div>
                <p className="font-serif text-3xl text-royal-gold">50+</p>
                <p className="font-sans text-[10px] text-ivory/30 tracking-[0.2em] uppercase mt-1">Tools</p>
              </div>
              <div>
                <p className="font-serif text-3xl text-royal-gold">12+</p>
                <p className="font-sans text-[10px] text-ivory/30 tracking-[0.2em] uppercase mt-1">Brands</p>
              </div>
            </div>

            <div className="animate-in flex gap-8 mt-12">
              {["LinkedIn", "Instagram"].map((link) => (
                <a key={link} href="#" className="font-sans text-xs text-ivory/30 tracking-[0.15em] uppercase hover:text-royal-gold transition-colors duration-500">
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
