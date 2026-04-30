"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const tiers = [
  { name: "Starter", price: "$500", range: "— $1,500", desc: "For brands just launching", features: ["10 AI images", "2 videos", "1 revision round", "5–7 days", "Email support"], note: "Replaces a $1,000–$3,000 photo shoot" },
  { name: "Growth", price: "$2,000", range: "— $5,000", desc: "For scaling brands", features: ["30 AI images", "5 videos", "Landing page", "2 revision rounds", "10–14 days", "Email + call"], note: "Replaces a $5,000+/mo agency retainer", featured: true },
  { name: "Elite", price: "$5,000", range: "— $15,000+", desc: "For premium brands", features: ["Unlimited images", "10+ videos", "Full custom site", "Unlimited revisions", "Slack + calls"], note: "Replaces a $15,000–$50,000 creative team" },
];

export default function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, delay: i * 0.15, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 85%" }
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="pricing" className="relative py-40 lg:py-56 px-6 lg:px-16 overflow-hidden bg-gradient-to-b from-obsidian via-mahogany/10 to-obsidian">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-24 lg:mb-40">
          <p className="text-royal-gold text-[9px] font-sans tracking-[0.25em] uppercase mb-6">Investment</p>
          <h2 className="font-serif text-[clamp(3rem,8vw,7rem)] leading-[0.95] tracking-[-0.02em] text-ivory">
            Pricing
          </h2>
          <p className="font-sans text-sm text-ivory/30 max-w-md mt-6 leading-relaxed">
            Transparent pricing, exceptional value. Every tier is designed to replace traditional agency costs at a fraction of the price.
          </p>
        </div>

        {/* Pricing cards — editorial layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-ivory/5">
          {tiers.map((tier, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className={`relative bg-obsidian p-10 lg:p-14 group transition-all duration-700 hover:bg-mahogany/30 ${
                tier.featured ? "lg:-my-8 lg:py-22" : ""
              }`}
            >
              {/* Featured indicator */}
              {tier.featured && (
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-royal-gold" />
              )}

              <div className="mb-10">
                <p className="text-ivory/30 text-xs font-sans mb-2">{tier.desc}</p>
                <h3 className="font-serif text-3xl text-ivory mb-1">{tier.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-5xl text-royal-gold">{tier.price}</span>
                  <span className="font-sans text-sm text-ivory/30">{tier.range}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-10">
                {tier.features.map((f, j) => (
                  <li key={j} className="font-sans text-sm text-ivory/40 flex items-start gap-3">
                    <span className="text-royal-gold/50 mt-1">—</span>
                    {f}
                  </li>
                ))}
              </ul>

              <p className="font-sans text-xs text-ivory/20 italic mb-10">{tier.note}</p>

              <a
                href="#contact"
                className={`block text-center py-4 text-xs font-sans tracking-[0.2em] uppercase transition-all duration-500 ${
                  tier.featured
                    ? "bg-royal-gold text-obsidian hover:bg-champagne"
                    : "border border-ivory/10 text-ivory/50 hover:border-royal-gold/50 hover:text-royal-gold"
                }`}
              >
                Start with {tier.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
