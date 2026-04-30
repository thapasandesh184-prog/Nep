"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const tiers = [
  {
    name: "Starter",
    price: "$500",
    range: "— $1,500",
    desc: "For brands just launching",
    features: [
      "10 AI-generated images",
      "2 short-form videos",
      "1 revision round",
      "5–7 day turnaround",
      "Email support",
    ],
    note: "Replaces a $1,000–$3,000 photo shoot",
    featured: false,
  },
  {
    name: "Growth",
    price: "$2,000",
    range: "— $5,000",
    desc: "For scaling brands",
    features: [
      "30 AI-generated images",
      "5 short-form videos",
      "Landing page design",
      "2 revision rounds",
      "10–14 day turnaround",
      "Email + video calls",
    ],
    note: "Replaces a $5,000+/mo agency retainer",
    featured: true,
  },
  {
    name: "Elite",
    price: "$5,000",
    range: "— $15,000+",
    desc: "For premium brands",
    features: [
      "Unlimited images",
      "10+ videos + long-form",
      "Full custom website",
      "Unlimited revisions",
      "Priority turnaround",
      "Slack + dedicated calls",
    ],
    note: "Replaces a $15,000–$50,000 creative team",
    featured: false,
  },
];

export default function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            delay: i * 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 85%" },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative py-28 lg:py-40 px-6 lg:px-12 overflow-hidden bg-[#FAFAFA]"
    >
      {/* Subtle background tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative">
        {/* Header */}
        <div className="mb-16 lg:mb-24 text-center lg:text-left">
          <p className="text-violet text-[10px] font-sans tracking-[0.3em] uppercase mb-4">
            Investment
          </p>
          <h2 className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-[-0.02em] text-gray-900">
            Transparent pricing
          </h2>
          <p className="font-sans text-sm text-gray-500 max-w-md mt-4 leading-relaxed">
            Every tier is designed to replace traditional agency costs at a
            fraction of the price.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className={`relative bg-white border transition-all duration-700 hover:shadow-lg hover:shadow-gray-200/50 ${
                tier.featured
                  ? "border-violet/30 lg:-my-4 lg:py-4 shadow-md shadow-violet/5"
                  : "border-gray-200"
              }`}
            >
              {/* Featured badge */}
              {tier.featured && (
                <div className="absolute -top-px left-1/2 -translate-x-1/2">
                  <div className="px-4 py-1 bg-violet text-white text-[9px] font-sans tracking-[0.2em] uppercase">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="p-8 lg:p-10">
                {/* Tier header */}
                <div className="mb-8">
                  <p className="text-gray-400 text-xs font-sans mb-2">
                    {tier.desc}
                  </p>
                  <h3 className="font-serif text-2xl text-gray-900 mb-1">
                    {tier.name}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <span
                      className={`font-serif text-4xl lg:text-5xl ${
                        tier.featured ? "text-violet" : "text-gray-900"
                      }`}
                    >
                      {tier.price}
                    </span>
                    <span className="font-sans text-sm text-gray-400">
                      {tier.range}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3.5 mb-8">
                  {tier.features.map((f, j) => (
                    <li
                      key={j}
                      className="font-sans text-sm text-gray-500 flex items-start gap-3"
                    >
                      <span
                        className={`mt-1.5 w-1 h-1 rounded-full flex-shrink-0 ${
                          tier.featured ? "bg-violet" : "bg-gray-300"
                        }`}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Value note */}
                <p className="font-sans text-xs text-gray-300 italic mb-8">
                  {tier.note}
                </p>

                {/* CTA */}
                <a
                  href="#contact"
                  className={`block text-center py-3.5 text-[11px] font-sans tracking-[0.18em] uppercase transition-all duration-500 ${
                    tier.featured
                      ? "bg-violet text-white hover:bg-violet-light"
                      : "border border-gray-200 text-gray-500 hover:border-violet/40 hover:text-violet"
                  }`}
                >
                  Get Started
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
