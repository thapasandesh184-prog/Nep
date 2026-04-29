"use client";

import React from "react";

const tiers = [
  {
    name: "Starter",
    price: "$500 – $1,500",
    bestFor: "Brands just launching",
    features: [
      "10 AI product/UGC images",
      "2 short-form content videos",
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
      "Unlimited revisions until approved",
      "Dedicated Slack channel + calls",
    ],
    replaces: "A full creative team costs $15,000–$50,000.",
    featured: false,
  },
];

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative py-32 px-6 lg:px-12 bg-gradient-to-b from-obsidian via-mahogany/30 to-obsidian"
    >
      <div className="max-w-[1440px] mx-auto">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`relative bg-mahogany p-8 transition-all duration-500 ease-luxury hover:inner-glow-hover ${
                tier.featured
                  ? "border-x border-t border-royal-gold/50 lg:-my-4 lg:py-12"
                  : "gold-top-rule"
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-royal-gold text-obsidian text-[10px] font-sans font-medium tracking-luxury uppercase">
                  Most Popular
                </div>
              )}

              <p className="text-ivory/40 text-xs font-sans mb-2">
                {tier.bestFor}
              </p>
              <h3 className="font-serif text-2xl text-ivory mb-2">
                {tier.name}
              </h3>
              <p className="font-serif text-3xl text-royal-gold mb-6">
                {tier.price}
              </p>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, i) => (
                  <li
                    key={i}
                    className="font-sans text-sm text-ivory/60 flex items-start gap-3"
                  >
                    <span className="text-royal-gold mt-1">◆</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <p className="font-sans text-xs text-ivory/30 italic mb-6 leading-relaxed">
                {tier.replaces}
              </p>

              <a
                href="#contact"
                className={`block text-center py-3 text-xs font-sans font-medium tracking-luxury uppercase rounded-sharp transition-all duration-500 ${
                  tier.featured
                    ? "bg-royal-gold text-obsidian hover:bg-champagne"
                    : "border border-royal-gold text-royal-gold hover:bg-royal-gold/10 hover:border-champagne hover:text-champagne"
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
