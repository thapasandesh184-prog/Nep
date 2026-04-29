"use client";

import React from "react";

const services = [
  {
    title: "UGC Images",
    description:
      "Lifestyle, model, and product-in-use images generated at photographic quality.",
  },
  {
    title: "Product Images",
    description:
      "Editorial-grade AI product photography. Clean backgrounds, styled surfaces, hero shots.",
  },
  {
    title: "UGC Videos",
    description:
      "Authentic-feeling creator-style videos for TikTok, Reels, and Stories.",
  },
  {
    title: "Ad Videos",
    description:
      "Performance creatives engineered for Meta and TikTok advertising.",
  },
  {
    title: "Content Videos",
    description:
      "Brand videos, reels, explainers, and launch content that builds brand equity.",
  },
  {
    title: "Web Development",
    description:
      "Full-stack websites built with Next.js, React, and modern headless CMS.",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative py-32 px-6 lg:px-12"
    >
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-mahogany gold-top-rule p-8 transition-all duration-500 ease-luxury hover:inner-glow-hover cursor-pointer"
              style={{ perspective: "1000px" }}
            >
              <div className="transition-transform duration-500 ease-luxury group-hover:translate-y-[-2px]">
                <h3 className="font-serif text-xl text-ivory mb-3">
                  {service.title}
                </h3>
                <p className="font-sans text-sm text-ivory/50 leading-relaxed">
                  {service.description}
                </p>
              </div>
              {/* Hover gold rule brightens */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-royal-gold transition-all duration-500 group-hover:bg-champagne group-hover:shadow-[0_0_10px_rgba(232,213,163,0.3)]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
