"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCountUp } from "@/components/hooks/use-count-up";

gsap.registerPlugin(ScrollTrigger);

function StatCard({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const { formattedCount, ref } = useCountUp({ end, duration: 2000, suffix });
  return (
    <div ref={ref} className="border-t border-gray-200 pt-6">
      <p className="font-serif text-4xl lg:text-5xl text-violet mb-1">
        {formattedCount}
      </p>
      <p className="font-sans text-[10px] text-gray-400 tracking-[0.15em] uppercase">
        {label}
      </p>
    </div>
  );
}

const testimonials = [
  {
    quote:
      "The AI-generated product shots look indistinguishable from a $10K studio shoot. Our conversion rate jumped 34% in the first month.",
    author: "Sarah Chen",
    role: "CMO",
    brand: "Lumière Beauty",
  },
  {
    quote:
      "We went from zero content to a full month of ad creatives in under a week. Our ROAS improved 3x immediately.",
    author: "Marcus Webb",
    role: "Founder",
    brand: "Velocity Athletics",
  },
  {
    quote:
      "The website they built won praise from every investor we pitched. The attention to detail is remarkable.",
    author: "Elena Vasquez",
    role: "CEO",
    brand: "Cipher Security",
  },
];

export default function SocialProofSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
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
      id="social-proof"
      className="relative py-28 lg:py-40 px-6 lg:px-12 overflow-hidden bg-white"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-24 lg:mb-32">
          <StatCard end={12} suffix="+" label="Brands Elevated" />
          <StatCard end={500} suffix="+" label="Deliverables" />
          <StatCard end={34} suffix="%" label="Avg. Conversion Lift" />
          <StatCard end={8} suffix="" label="Countries" />
        </div>

        {/* Testimonials */}
        <div className="mb-12">
          <p className="text-violet text-[10px] font-sans tracking-[0.3em] uppercase mb-4">
            Client Words
          </p>
          <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-[-0.02em] text-gray-900">
            Results that speak for themselves
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-gray-200">
          {testimonials.map((t, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="bg-white p-8 lg:p-10 group hover:bg-gray-50 transition-colors duration-700"
            >
              {/* Quote mark */}
              <div className="mb-6">
                <svg
                  width="32"
                  height="24"
                  viewBox="0 0 32 24"
                  fill="none"
                  className="text-violet/20 group-hover:text-violet/30 transition-colors duration-500"
                >
                  <path
                    d="M0 24V14.4C0 9.6 1.6 5.6 4.8 2.4L9.6 0V7.2C7.2 7.2 5.2 8 3.6 9.6C2 11.2 1.2 13.2 1.2 15.6H9.6V24H0ZM19.2 24V14.4C19.2 9.6 20.8 5.6 24 2.4L28.8 0V7.2C26.4 7.2 24.4 8 22.8 9.6C21.2 11.2 20.4 13.2 20.4 15.6H28.8V24H19.2Z"
                    fill="currentColor"
                  />
                </svg>
              </div>

              <p className="font-serif text-lg lg:text-xl text-gray-700 leading-[1.5] mb-8">
                {t.quote}
              </p>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-violet/10 flex items-center justify-center">
                  <span className="font-serif text-xs text-violet">
                    {t.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-sans text-sm text-gray-800">{t.author}</p>
                  <p className="font-sans text-[10px] text-gray-400 tracking-wider">
                    {t.role}, {t.brand}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
