"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCountUp } from "@/components/hooks/use-count-up";

gsap.registerPlugin(ScrollTrigger);

function StatCard({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const { formattedCount, ref } = useCountUp({ end, duration: 2000, suffix });
  return (
    <div ref={ref} className="border-t border-ivory/5 pt-8 group">
      <p className="font-serif text-5xl lg:text-7xl text-royal-gold mb-2">{formattedCount}</p>
      <p className="font-sans text-[10px] text-ivory/30 tracking-[0.2em] uppercase">{label}</p>
    </div>
  );
}

const testimonials = [
  { quote: "The AI-generated product shots look indistinguishable from a $10K studio shoot. Our conversion rate jumped 34% in the first month.", author: "Sarah Chen", brand: "Lumière Beauty" },
  { quote: "We went from zero content to a full month of ad creatives in under a week. Our ROAS improved 3x immediately.", author: "Marcus Webb", brand: "Velocity Athletics" },
  { quote: "The website they built won praise from every investor we pitched. The hero alone gets compliments in every meeting.", author: "Elena Vasquez", brand: "Cipher Security" },
];

export default function SocialProofSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current!.querySelectorAll(".animate-in"),
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%" }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="social-proof" className="relative py-40 lg:py-56 px-6 lg:px-16 overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16 mb-32 lg:mb-48">
          <StatCard end={12} suffix="+" label="Brands Elevated" />
          <StatCard end={500} suffix="+" label="Creatives Delivered" />
          <StatCard end={5} suffix="/5" label="Client Satisfaction" />
          <StatCard end={8} suffix="" label="Countries Reached" />
        </div>

        {/* Testimonials — large editorial quotes */}
        <div className="space-y-24 lg:space-y-32">
          {testimonials.map((t, i) => (
            <div key={i} className={`animate-in flex flex-col lg:flex-row gap-8 lg:gap-20 items-start ${i % 2 === 1 ? "lg:flex-row-reverse lg:text-right" : ""}`}>
              <div className={`flex-1 ${i % 2 === 1 ? "lg:pl-20" : "lg:pr-20"}`}>
                <p className="font-serif text-2xl lg:text-4xl text-ivory/80 italic leading-[1.3]">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
              <div className="lg:w-48 flex-shrink-0">
                <p className="font-sans text-sm text-ivory font-medium">{t.author}</p>
                <p className="font-sans text-xs text-royal-gold tracking-wider mt-1">{t.brand}</p>
                <div className="w-12 h-[1px] bg-royal-gold/20 mt-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
