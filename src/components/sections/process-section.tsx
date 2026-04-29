"use client";

import React from "react";

const steps = [
  {
    number: "01",
    title: "Discovery Call",
    description:
      "Client books a 30-minute call via Calendly. We audit their brand, understand the brief, and agree on scope.",
  },
  {
    number: "02",
    title: "Strategy & Quote",
    description:
      "Within 48 hours, we deliver a written proposal: project scope, timeline, pricing, and a preview mood board.",
  },
  {
    number: "03",
    title: "Creation",
    description:
      "Our AI creative pipeline activates. We generate, curate, and refine until every deliverable meets our standard.",
  },
  {
    number: "04",
    title: "Delivery",
    description:
      "Final files delivered in all required formats via a private client portal. Ongoing support available as a retainer.",
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="relative py-32 px-6 lg:px-12">
      <div className="max-w-[1440px] mx-auto">
        <div className="text-center mb-20">
          <p className="text-royal-gold text-[10px] font-sans font-medium tracking-luxury uppercase mb-4">
            How We Work
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-ivory">
            Our Process
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-royal-gold" />
            <div className="w-1.5 h-1.5 rotate-45 border border-royal-gold" />
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-royal-gold" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              <span className="font-serif text-6xl text-ivory/10 absolute -top-8 left-1/2 -translate-x-1/2">
                {step.number}
              </span>
              <div className="relative z-10 pt-8">
                <h3 className="font-serif text-xl text-ivory mb-4">
                  {step.title}
                </h3>
                <p className="font-sans text-sm text-ivory/50 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
