"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    num: "01",
    title: "UGC Images",
    desc: "Lifestyle, model, and product-in-use images generated at photographic quality. Indistinguishable from real shoots.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Product Images",
    desc: "Editorial-grade AI product photography. Clean backgrounds, styled surfaces, hero shots, detail close-ups.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "UGC Videos",
    desc: "Authentic-feeling creator-style videos for TikTok, Reels, and Stories. AI-generated scripts, visuals, and voiceover.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Ad Videos",
    desc: "Performance creatives engineered for Meta and TikTok advertising. Hook in first 2 seconds, A/B variants included.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    num: "05",
    title: "Content Videos",
    desc: "Brand videos, reels, explainers, and launch content. Longer-form narrative pieces that build brand equity.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="2.18" /><line x1="7" y1="2" x2="7" y2="22" /><line x1="17" y1="2" x2="17" y2="22" /><line x1="2" y1="12" x2="22" y2="12" /><line x1="2" y1="7" x2="7" y2="7" /><line x1="2" y1="17" x2="7" y2="17" /><line x1="17" y1="17" x2="22" y2="17" /><line x1="17" y1="7" x2="22" y2="7" />
      </svg>
    ),
  },
  {
    num: "06",
    title: "Web Development",
    desc: "Full-stack websites built with Next.js, React, and modern headless CMS. 3D interactive experiences, Shopify storefronts.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );

      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        gsap.fromTo(
          item,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 85%" },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-28 lg:py-40 px-6 lg:px-12 overflow-hidden bg-white"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div ref={titleRef} className="mb-16 lg:mb-24">
          <p className="text-violet text-[10px] font-sans tracking-[0.3em] uppercase mb-4">
            What We Do
          </p>
          <h2 className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-[-0.02em] text-gray-900 max-w-2xl">
            Everything your brand needs to look premium
          </h2>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200">
          {services.map((service, i) => (
            <div
              key={i}
              ref={(el) => { itemsRef.current[i] = el; }}
              className="group bg-white p-8 lg:p-10 transition-all duration-700 hover:bg-gray-50"
            >
              <div className="flex items-start justify-between mb-8">
                <div className="w-10 h-10 flex items-center justify-center text-violet/60 group-hover:text-violet transition-colors duration-500">
                  {service.icon}
                </div>
                <span className="font-serif text-4xl text-gray-100 group-hover:text-gray-200 transition-colors duration-700">
                  {service.num}
                </span>
              </div>

              <h3 className="font-serif text-xl lg:text-2xl text-gray-900 mb-3 group-hover:text-violet transition-colors duration-500">
                {service.title}
              </h3>
              <p className="font-sans text-sm text-gray-500 leading-relaxed group-hover:text-gray-600 transition-colors duration-500">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
