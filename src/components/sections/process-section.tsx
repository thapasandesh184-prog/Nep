"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Step {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Discovery Call",
    description:
      "Client books a 30-minute call via Calendly. We audit their brand, understand the brief, and agree on scope. This call is free, zero-pressure, and focused entirely on understanding what the client needs.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="12" y="8" width="24" height="32" rx="3" stroke="#C9A96E" strokeWidth="1" fill="none" />
        <circle cx="24" cy="22" r="4" stroke="#C9A96E" strokeWidth="1" fill="none" />
        <path d="M18 32h12" stroke="#C9A96E" strokeWidth="1" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Strategy & Quote",
    description:
      "Within 48 hours, we deliver a written proposal: project scope, timeline, pricing, and a preview mood board aligned to their brand. No surprises, no hidden fees.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="10" y="6" width="28" height="36" rx="2" stroke="#C9A96E" strokeWidth="1" fill="none" />
        <path d="M16 16h16M16 22h12M16 28h8" stroke="#C9A96E" strokeWidth="1" />
        <path d="M30 34l3 3 6-6" stroke="#C9A96E" strokeWidth="1" fill="none" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Creation",
    description:
      "Our AI creative pipeline activates. We generate, curate, and refine until every deliverable meets our standard. Clients receive a review round — typically one round of revisions is all that is needed.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M24 8l16 8-16 8-16-8z" stroke="#C9A96E" strokeWidth="1" fill="none" />
        <path d="M8 24l16 8 16-8" stroke="#C9A96E" strokeWidth="1" fill="none" />
        <path d="M8 32l16 8 16-8" stroke="#C9A96E" strokeWidth="1" fill="none" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Delivery",
    description:
      "Final files delivered in all required formats via a private client portal. For web projects, we handle deployment, testing, and a full handover session. Ongoing support is available as a retainer.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M24 6v28" stroke="#C9A96E" strokeWidth="1" />
        <path d="M14 24l10 10 10-10" stroke="#C9A96E" strokeWidth="1" fill="none" />
        <path d="M10 42h28" stroke="#C9A96E" strokeWidth="1" />
      </svg>
    ),
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const iconsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Pin the container and scrub through steps
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1,
          snap: {
            snapTo: (progress) => {
              const stepSize = 1 / (steps.length - 1);
              return Math.round(progress / stepSize) * stepSize;
            },
            duration: { min: 0.2, max: 0.5 },
            ease: "power2.inOut",
          },
        },
      });

      // Progress line grows from 0% to 100%
      tl.fromTo(
        progressLineRef.current,
        { scaleY: 0 },
        { scaleY: 1, ease: "none" },
        0
      );

      // Animate each step
      steps.forEach((_, i) => {
        const stepEl = stepsRef.current[i];
        const iconEl = iconsRef.current[i];
        const startProgress = i / steps.length;

        if (stepEl) {
          // Text reveal
          tl.fromTo(
            stepEl.querySelector(".step-content"),
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" },
            startProgress + 0.05
          );

          // Icon convergence (scale in from scattered)
          if (iconEl) {
            tl.fromTo(
              iconEl,
              { scale: 0, opacity: 0, rotate: -45 },
              { scale: 1, opacity: 1, rotate: 0, duration: 0.15, ease: "back.out(1.7)" },
              startProgress
            );
          }

          // Fade out previous steps (except the last one)
          if (i > 0) {
            const prevStep = stepsRef.current[i - 1];
            if (prevStep) {
              tl.to(
                prevStep.querySelector(".step-content"),
                { opacity: 0.15, duration: 0.1, ease: "power2.in" },
                startProgress
              );
            }
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative min-h-screen bg-obsidian overflow-hidden"
    >
      <div ref={containerRef} className="relative max-w-[1440px] mx-auto px-6 lg:px-12 py-32">
        {/* Section Header */}
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

        {/* Process Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Progress Line */}
          <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-[1px] bg-royal-gold/10 lg:-translate-x-1/2">
            <div
              ref={progressLineRef}
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-royal-gold via-champagne to-royal-gold origin-top"
              style={{ height: "100%", transform: "scaleY(0)" }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-24 lg:space-y-32">
            {steps.map((step, index) => (
              <div
                key={index}
                ref={(el) => { stepsRef.current[index] = el; }}
                className={`relative flex items-start gap-8 ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Icon */}
                <div
                  ref={(el) => { iconsRef.current[index] = el; }}
                  className="relative z-10 flex-shrink-0 w-16 h-16 bg-mahogany border border-royal-gold/30 flex items-center justify-center"
                  style={{ transform: "scale(0)" }}
                >
                  {step.icon}
                  {/* Glow */}
                  <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 inner-glow" />
                </div>

                {/* Content */}
                <div
                  className={`step-content flex-1 pt-2 ${
                    index % 2 === 0 ? "lg:text-left" : "lg:text-right"
                  }`}
                  style={{ opacity: index === 0 ? 1 : 0 }}
                >
                  {/* Decorative number */}
                  <span className="font-serif text-7xl lg:text-8xl text-ivory/5 absolute -top-4 lg:-top-8 select-none pointer-events-none"
                    style={{
                      [index % 2 === 0 ? "left" : "right"]: "0",
                    }}
                  >
                    {step.number}
                  </span>

                  <p className="text-royal-gold text-[10px] font-sans font-medium tracking-luxury uppercase mb-2 relative z-10">
                    Step {step.number}
                  </p>
                  <h3 className="font-serif text-2xl lg:text-3xl text-ivory mb-4 relative z-10">
                    {step.title}
                  </h3>
                  <p className="font-sans text-sm lg:text-base text-ivory/50 leading-relaxed max-w-md relative z-10">
                    {step.description}
                  </p>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden lg:block flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
