"use client";

import React from "react";

const stats = [
  { label: "Brands Elevated", value: "12+" },
  { label: "Creatives Delivered", value: "500+" },
  { label: "Client Satisfaction", value: "5/5" },
  { label: "Countries Reached", value: "8" },
];

const testimonials = [
  {
    quote:
      "Nepovoxel transformed our entire visual identity. The AI-generated product shots look indistinguishable from a $10K studio shoot.",
    author: "Sarah Chen",
    brand: "Lumière Beauty",
  },
  {
    quote:
      "We went from zero content to a full month of ad creatives in under a week. Our ROAS improved 3x immediately.",
    author: "Marcus Webb",
    brand: "Velocity Athletics",
  },
];

export default function SocialProofSection() {
  return (
    <section id="social-proof" className="relative py-32 px-6 lg:px-12">
      <div className="max-w-[1440px] mx-auto">
        <div className="text-center mb-20">
          <p className="text-royal-gold text-[10px] font-sans font-medium tracking-luxury uppercase mb-4">
            Trusted By Founders
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-ivory">
            Social Proof
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-royal-gold" />
            <div className="w-1.5 h-1.5 rotate-45 border border-royal-gold" />
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-royal-gold" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-mahogany gold-top-rule p-6 text-center"
            >
              <p className="font-serif text-3xl text-royal-gold mb-2">
                {stat.value}
              </p>
              <p className="font-sans text-xs text-ivory/50 tracking-luxury uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-mahogany gold-top-rule p-8 relative"
            >
              <p className="font-serif text-lg text-ivory/80 italic leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="font-sans text-sm text-ivory font-medium">
                  {t.author}
                </p>
                <p className="font-sans text-xs text-royal-gold tracking-wide">
                  {t.brand}
                </p>
              </div>
              <div className="absolute top-6 right-6 text-royal-gold/20 text-4xl font-serif">
                &ldquo;
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
