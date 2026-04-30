"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { num: "01", title: "Discovery", desc: "A 30-minute call to audit your brand, understand the brief, and align on scope. Free. Zero pressure." },
  { num: "02", title: "Strategy", desc: "Within 48 hours: written proposal, timeline, pricing, and a mood board aligned to your aesthetic." },
  { num: "03", title: "Creation", desc: "Our AI pipeline activates. Generate, curate, refine. One round of revisions is typically all it takes." },
  { num: "04", title: "Delivery", desc: "Final files in all formats via private portal. Web projects include deployment, testing, and full handover." },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Progress line
      gsap.fromTo(lineRef.current,
        { scaleY: 0 },
        { scaleY: 1, duration: 2, ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top 60%", end: "bottom 40%", scrub: 1 }
        }
      );

      // Items reveal
      itemsRef.current.forEach((item) => {
        if (!item) return;
        gsap.fromTo(item,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 80%" }
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="process" className="relative py-40 lg:py-56 px-6 lg:px-16 overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-24 lg:mb-40">
          <p className="text-royal-gold text-[9px] font-sans tracking-[0.25em] uppercase mb-6">The Journey</p>
          <h2 className="font-serif text-[clamp(3rem,8vw,7rem)] leading-[0.95] tracking-[-0.02em] text-ivory">
            Process
          </h2>
        </div>

        {/* Process steps — diagonal/stacked layout */}
        <div className="relative">
          {/* Vertical progress line */}
          <div className="absolute left-[2rem] lg:left-1/2 top-0 bottom-0 w-[1px] bg-ivory/5 lg:-translate-x-1/2">
            <div ref={lineRef} className="absolute inset-0 bg-gradient-to-b from-royal-gold via-champagne to-royal-gold origin-top" style={{ transform: "scaleY(0)" }} />
          </div>

          <div className="space-y-24 lg:space-y-32">
            {steps.map((step, i) => (
              <div
                key={i}
                ref={(el) => { itemsRef.current[i] = el; }}
                className={`relative flex flex-col lg:flex-row gap-8 lg:gap-24 ${
                  i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse lg:text-right"
                }`}
              >
                {/* Content */}
                <div className={`flex-1 lg:pt-4 ${i % 2 === 0 ? "lg:pr-24" : "lg:pl-24"}`}>
                  <span className="font-serif text-8xl lg:text-[10rem] text-ivory/[0.03] absolute -top-8 lg:-top-16 select-none">
                    {step.num}
                  </span>
                  <div className="relative">
                    <p className="text-royal-gold text-[9px] font-sans tracking-[0.25em] uppercase mb-4">Step {step.num}</p>
                    <h3 className="font-serif text-4xl lg:text-6xl text-ivory mb-6 leading-[1]">{step.title}</h3>
                    <p className="font-sans text-base text-ivory/30 max-w-md leading-relaxed">{step.desc}</p>
                  </div>
                </div>

                {/* Spacer for center line */}
                <div className="hidden lg:block w-px" />

                {/* Node on line */}
                <div className="absolute left-[2rem] lg:left-1/2 top-4 w-3 h-3 border border-royal-gold/40 rotate-45 bg-obsidian lg:-translate-x-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
