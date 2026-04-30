"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "Discovery",
    desc: "A 30-minute call to audit your brand, understand the brief, and align on scope. Free. Zero pressure.",
    duration: "Day 1",
  },
  {
    num: "02",
    title: "Strategy",
    desc: "Within 48 hours: written proposal, timeline, pricing, and a mood board aligned to your aesthetic.",
    duration: "Days 2–3",
  },
  {
    num: "03",
    title: "Creation",
    desc: "Our AI pipeline activates. Generate, curate, refine. One round of revisions is typically all it takes.",
    duration: "Days 4–10",
  },
  {
    num: "04",
    title: "Delivery",
    desc: "Final files in all formats via private portal. Web projects include deployment, testing, and full handover.",
    duration: "Day 11+",
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 2,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 40%",
            scrub: 1,
          },
        }
      );

      itemsRef.current.forEach((item) => {
        if (!item) return;
        gsap.fromTo(
          item,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 82%" },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative py-28 lg:py-40 px-6 lg:px-12 overflow-hidden bg-white"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <p className="text-violet text-[10px] font-sans tracking-[0.3em] uppercase mb-4">
            How We Work
          </p>
          <h2 className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-[-0.02em] text-gray-900">
            From brief to delivery in 2 weeks
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[1.25rem] lg:left-1/2 top-0 bottom-0 w-px bg-gray-200 lg:-translate-x-1/2">
            <div
              ref={lineRef}
              className="absolute inset-0 bg-gradient-to-b from-violet via-teal/50 to-violet origin-top"
              style={{ transform: "scaleY(0)" }}
            />
          </div>

          <div className="space-y-16 lg:space-y-24">
            {steps.map((step, i) => (
              <div
                key={i}
                ref={(el) => { itemsRef.current[i] = el; }}
                className={`relative flex flex-col lg:flex-row gap-8 lg:gap-16 ${
                  i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div
                  className={`flex-1 lg:pt-2 ${
                    i % 2 === 0 ? "lg:pr-20 lg:text-right" : "lg:pl-20"
                  }`}
                >
                  <span className="font-serif text-7xl lg:text-8xl text-gray-100 absolute -top-4 lg:-top-6 select-none">
                    {step.num}
                  </span>
                  <div className="relative pl-12 lg:pl-0">
                    <div className="flex items-center gap-3 mb-3 lg:justify-start">
                      <p className="text-teal text-[10px] font-sans tracking-[0.25em] uppercase">
                        {step.duration}
                      </p>
                    </div>
                    <h3 className="font-serif text-3xl lg:text-4xl text-gray-900 mb-4 leading-[1.1]">
                      {step.title}
                    </h3>
                    <p className="font-sans text-sm text-gray-500 max-w-md leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>

                {/* Spacer for center line on desktop */}
                <div className="hidden lg:block w-px" />

                {/* Node */}
                <div className="absolute left-[1.25rem] lg:left-1/2 top-2 w-2.5 h-2.5 border border-violet/50 rotate-45 bg-white lg:-translate-x-1/2">
                  <div className="absolute inset-0.5 bg-violet/30" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
