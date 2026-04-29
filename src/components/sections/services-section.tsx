"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Service {
  title: string;
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
}

const services: Service[] = [
  {
    title: "UGC Images",
    shortDesc:
      "Lifestyle, model, and product-in-use images generated at photographic quality.",
    fullDesc:
      "Indistinguishable from real shoots at a fraction of the cost. We generate lifestyle scenes, model photography, and product-in-context images that convert. Every image is crafted to match your brand aesthetic and delivered as print-ready files.",
    deliverables: [
      "10–50 AI-generated lifestyle images",
      "Multiple model variations",
      "Brand-matched color grading",
      "Print-ready PNG/JPEG exports",
      "Commercial usage rights",
    ],
  },
  {
    title: "Product Images",
    shortDesc:
      "Editorial-grade AI product photography. Clean backgrounds, styled surfaces, hero shots.",
    fullDesc:
      "Everything a Shopify PDP needs to convert at the highest rate. Clean white-background shots, styled editorial surfaces, hero angles, and detail close-ups. Your products look like they were shot in a $5,000/day studio.",
    deliverables: [
      "Hero, lifestyle & detail shots",
      "Clean & styled backgrounds",
      "Consistent lighting & angles",
      "Optimized for Shopify PDP",
      "360° spin-ready sequences",
    ],
  },
  {
    title: "UGC Videos",
    shortDesc:
      "Authentic-feeling creator-style videos for TikTok, Reels, and Stories.",
    fullDesc:
      "AI-generated scripts, visuals, and voiceover that feel genuinely organic. These are the videos that stop the scroll — authentic creator-style content engineered for TikTok, Instagram Reels, and YouTube Shorts.",
    deliverables: [
      "9:16 and 1:1 format videos",
      "AI-generated scripts & VO",
      "Authentic creator aesthetic",
      "Trend-aligned hooks & pacing",
      "Captions & sound design",
    ],
  },
  {
    title: "Ad Videos",
    shortDesc:
      "Performance creatives engineered for Meta and TikTok advertising.",
    fullDesc:
      "Hook in the first 2 seconds. Benefit-led narrative. Strong call-to-action. Every video is built on conversion psychology and delivered with A/B variant pairs so you can test and scale faster.",
    deliverables: [
      "Hook-first 15–30s creatives",
      "A/B variant pairs included",
      "Platform-optimized formats",
      "Conversion-focused scripting",
      "Fast turnaround for testing",
    ],
  },
  {
    title: "Content Videos",
    shortDesc:
      "Brand videos, reels, explainers, and launch content that builds brand equity.",
    fullDesc:
      "Longer-form narrative pieces that build brand equity and work across all channels. From brand stories to product explainers to launch announcements — content that earns attention and keeps it.",
    deliverables: [
      "Brand story & explainer videos",
      "Launch announcement content",
      "Multi-channel format exports",
      "Professional voiceover & music",
      "Thumbnail & preview images",
    ],
  },
  {
    title: "Web Development",
    shortDesc:
      "Full-stack websites built with Next.js, React, and modern headless CMS.",
    fullDesc:
      "3D interactive experiences, Shopify custom storefronts, SaaS platforms, and portfolio sites. We build the same award-winning web experiences we deliver for our own brand — fast, beautiful, and built to convert.",
    deliverables: [
      "Next.js 14 + TypeScript builds",
      "3D interactive experiences",
      "Shopify headless storefronts",
      "Custom CMS integrations",
      "Performance & SEO optimized",
    ],
  },
];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltRef.current || expanded) return;
    const rect = tiltRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    tiltRef.current.style.transform = `perspective(1000px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!tiltRef.current) return;
    tiltRef.current.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  };

  return (
    <div
      ref={cardRef}
      className="group relative"
      style={{ perspective: "1000px" }}
    >
      <div
        ref={tiltRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setExpanded(!expanded)}
        className={`relative bg-mahogany cursor-pointer transition-all duration-500 ease-luxury overflow-hidden ${
          expanded ? "p-8" : "p-8"
        }`}
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Gold top rule */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-royal-gold transition-all duration-500 group-hover:bg-champagne group-hover:shadow-[0_0_10px_rgba(232,213,163,0.3)]" />

        {/* Inner glow on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none inner-glow-hover" />

        {/* Service number */}
        <span className="absolute top-4 right-4 font-serif text-4xl text-ivory/5">
          {String(index + 1).padStart(2, "0")}
        </span>

        <h3 className="font-serif text-xl text-ivory mb-3 relative z-10">
          {service.title}
        </h3>
        <p className="font-sans text-sm text-ivory/50 leading-relaxed mb-4 relative z-10">
          {service.shortDesc}
        </p>

        {/* Expanded content */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-luxury ${
            expanded ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <p className="font-sans text-sm text-ivory/60 leading-relaxed mb-4">
            {service.fullDesc}
          </p>
          <ul className="space-y-2 mb-6">
            {service.deliverables.map((item, i) => (
              <li
                key={i}
                className="font-sans text-xs text-ivory/40 flex items-start gap-2"
              >
                <span className="text-royal-gold mt-0.5">◆</span>
                {item}
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="inline-flex items-center text-royal-gold text-xs font-sans tracking-luxury uppercase hover:text-champagne transition-colors duration-500"
            onClick={(e) => e.stopPropagation()}
          >
            Enquire about this service
            <span className="ml-2">→</span>
          </a>
        </div>

        {/* Expand indicator */}
        <div className="flex items-center justify-center mt-2 relative z-10">
          <div
            className={`w-4 h-[1px] bg-royal-gold/40 transition-transform duration-500 ${
              expanded ? "rotate-0" : ""
            }`}
          />
          <div
            className={`w-[1px] h-4 bg-royal-gold/40 absolute transition-transform duration-500 ${
              expanded ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
            }`}
          />
        </div>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !cardsRef.current) return;

    const cards = cardsRef.current.querySelectorAll(".group");

    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="services" className="relative py-32 px-6 lg:px-12">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="text-royal-gold text-[10px] font-sans font-medium tracking-luxury uppercase mb-4">
            What We Offer
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-ivory">
            Services
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-royal-gold" />
            <div className="w-1.5 h-1.5 rotate-45 border border-royal-gold" />
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-royal-gold" />
          </div>
        </div>

        {/* Service Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
