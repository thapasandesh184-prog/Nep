"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PricingTier {
  name: string;
  price: string;
  bestFor: string;
  features: string[];
  replaces: string;
  featured: boolean;
}

const tiers: PricingTier[] = [
  {
    name: "Starter",
    price: "$500 – $1,500",
    bestFor: "Brands just launching",
    features: [
      "10 AI product/UGC images",
      "2 short-form content videos",
      "Not included",
      "1 round of revisions",
      "5–7 business days",
      "Email support",
    ],
    replaces: "A basic photo shoot costs $1,000–$3,000.",
    featured: false,
  },
  {
    name: "Growth",
    price: "$2,000 – $5,000",
    bestFor: "Scaling brands 6–7 figures",
    features: [
      "30 AI images (mixed types)",
      "5 ad + content videos",
      "Landing page / microsite",
      "2 rounds of revisions",
      "10–14 business days",
      "Email + 1 call",
    ],
    replaces: "A full creative agency retainer costs $5,000+/mo.",
    featured: true,
  },
  {
    name: "Elite",
    price: "$5,000 – $15,000+",
    bestFor: "Premium / enterprise brands",
    features: [
      "Unlimited images within scope",
      "10+ videos, all formats",
      "Full custom website build",
      "Unlimited until approved",
      "Agreed at brief",
      "Dedicated Slack + calls",
    ],
    replaces: "A full creative team costs $15,000–$50,000.",
    featured: false,
  },
];

export default function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !cardsRef.current) return;

    const cards = cardsRef.current.querySelectorAll(".pricing-card");

    gsap.fromTo(
      cards,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative py-32 px-6 lg:px-12 bg-gradient-to-b from-obsidian via-mahogany/20 to-obsidian"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="text-royal-gold text-[10px] font-sans font-medium tracking-luxury uppercase mb-4">
            Investment
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-ivory">
            Pricing
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-royal-gold" />
            <div className="w-1.5 h-1.5 rotate-45 border border-royal-gold" />
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-royal-gold" />
          </div>
        </div>

        {/* Pricing Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch"
        >
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`pricing-card relative bg-mahogany transition-all duration-700 ease-luxury group ${
                tier.featured
                  ? "border-x border-t border-royal-gold/50 lg:-my-4 lg:py-4"
                  : ""
              }`}
            >
              {/* Gold top rule (all cards) */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-royal-gold transition-all duration-500 group-hover:bg-champagne group-hover:shadow-[0_0_15px_rgba(232,213,163,0.2)]" />

              {/* Gold side borders for featured */}
              {tier.featured && (
                <>
                  <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-royal-gold/50 via-royal-gold/20 to-transparent" />
                  <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-gradient-to-b from-royal-gold/50 via-royal-gold/20 to-transparent" />
                </>
              )}

              {/* Most Popular badge */}
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-royal-gold text-obsidian text-[10px] font-sans font-medium tracking-luxury uppercase z-10">
                  Most Popular
                </div>
              )}

              {/* Inner glow on hover */}
              <div className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
                tier.featured
                  ? "opacity-0 group-hover:opacity-100 inner-glow-hover"
                  : "opacity-0 group-hover:opacity-100 inner-glow"
              }`} />

              <div className="relative z-10 p-8 flex flex-col h-full">
                {/* Tier info */}
                <p className="font-sans text-xs text-ivory/40 mb-2">
                  {tier.bestFor}
                </p>
                <h3 className="font-serif text-2xl text-ivory mb-1">
                  {tier.name}
                </h3>
                <p className="font-serif text-3xl text-royal-gold mb-8">
                  {tier.price}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-grow">
                  {tier.features.map((feature, i) => (
                    <li
                      key={i}
                      className="font-sans text-sm text-ivory/60 flex items-start gap-3"
                    >
                      <span className="text-royal-gold mt-0.5 flex-shrink-0">◆</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Value anchor */}
                <div className="mb-8 pt-6 border-t border-royal-gold/10">
                  <p className="font-sans text-xs text-ivory/30 italic leading-relaxed">
                    {tier.replaces}
                  </p>
                </div>

                {/* CTA */}
                <a
                  href="#contact"
                  className={`block text-center py-3.5 text-xs font-sans font-medium tracking-luxury uppercase rounded-sharp transition-all duration-500 ${
                    tier.featured
                      ? "bg-royal-gold text-obsidian hover:bg-champagne hover:shadow-[0_0_25px_rgba(201,169,110,0.3)]"
                      : "border border-royal-gold/50 text-royal-gold hover:bg-royal-gold/10 hover:border-champagne hover:text-champagne"
                  }`}
                >
                  Start with {tier.name}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center mt-12 font-sans text-xs text-ivory/30">
          All plans include commercial usage rights. Custom scopes available on request.
        </p>
      </div>
    </section>
  );
}
