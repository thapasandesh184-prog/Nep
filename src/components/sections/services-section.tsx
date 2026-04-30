"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { num: "01", title: "UGC Images", desc: "Lifestyle, model, and product-in-use images generated at photographic quality. Indistinguishable from real shoots." },
  { num: "02", title: "Product Images", desc: "Editorial-grade AI product photography. Clean backgrounds, styled surfaces, hero shots, detail close-ups." },
  { num: "03", title: "UGC Videos", desc: "Authentic-feeling creator-style videos for TikTok, Reels, and Stories. AI-generated scripts, visuals, and voiceover." },
  { num: "04", title: "Ad Videos", desc: "Performance creatives engineered for Meta and TikTok advertising. Hook in first 2 seconds, A/B variants included." },
  { num: "05", title: "Content Videos", desc: "Brand videos, reels, explainers, and launch content. Longer-form narrative pieces that build brand equity." },
  { num: "06", title: "Web Development", desc: "Full-stack websites built with Next.js, React, and modern headless CMS. 3D interactive experiences, Shopify storefronts." },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" }
        }
      );

      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        const direction = i % 2 === 0 ? -40 : 40;
        gsap.fromTo(item,
          { x: direction, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 80%" }
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="relative py-40 lg:py-56 px-6 lg:px-16 overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        {/* Section header — massive, left-aligned */}
        <div ref={titleRef} className="mb-24 lg:mb-40">
          <p className="text-royal-gold text-[9px] font-sans tracking-[0.25em] uppercase mb-6">What We Do</p>
          <h2 className="font-serif text-[clamp(3rem,8vw,7rem)] leading-[0.95] tracking-[-0.02em] text-ivory">
            Services
          </h2>
          <div className="w-24 h-[1px] bg-royal-gold/30 mt-8" />
        </div>

        {/* Services list — editorial, asymmetric */}
        <div className="space-y-0">
          {services.map((service, i) => (
            <div
              key={i}
              ref={(el) => { itemsRef.current[i] = el; }}
              className="group border-t border-ivory/8 py-10 lg:py-14 cursor-pointer transition-all duration-700 hover:border-royal-gold/30"
            >
              <div className={`flex flex-col lg:flex-row lg:items-baseline gap-4 lg:gap-16 ${i % 2 === 1 ? "lg:flex-row-reverse lg:text-right" : ""}`}>
                {/* Number */}
                <span className="font-serif text-5xl lg:text-7xl text-ivory/5 group-hover:text-royal-gold/10 transition-colors duration-700">
                  {service.num}
                </span>

                {/* Content */}
                <div className={`flex-1 ${i % 2 === 1 ? "lg:pr-16" : ""}`}>
                  <h3 className="font-serif text-2xl lg:text-4xl text-ivory group-hover:text-royal-gold transition-colors duration-500 mb-3">
                    {service.title}
                  </h3>
                  <p className="font-sans text-sm text-ivory/30 max-w-lg leading-relaxed group-hover:text-ivory/50 transition-colors duration-500">
                    {service.desc}
                  </p>
                </div>

                {/* Arrow */}
                <span className="text-ivory/10 group-hover:text-royal-gold group-hover:translate-x-2 group-hover:-translate-y-1 transition-all duration-500 text-2xl">
                  ↗
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
