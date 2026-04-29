"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCountUp } from "@/components/hooks/use-count-up";

gsap.registerPlugin(ScrollTrigger);

function StatCard({
  end,
  suffix,
  label,
}: {
  end: number;
  suffix: string;
  label: string;
}) {
  const { formattedCount, ref } = useCountUp({ end, duration: 1800, suffix });

  return (
    <div
      ref={ref}
      className="bg-mahogany gold-top-rule p-8 text-center group hover:inner-glow-hover transition-all duration-500"
    >
      <p className="font-serif text-4xl lg:text-5xl text-royal-gold mb-3 transition-transform duration-500 group-hover:scale-105">
        {formattedCount}
      </p>
      <p className="font-sans text-xs text-ivory/50 tracking-luxury uppercase">
        {label}
      </p>
    </div>
  );
}

const stats = [
  { end: 12, suffix: "+", label: "Brands Elevated" },
  { end: 500, suffix: "+", label: "Creatives Delivered" },
  { end: 5, suffix: "/5", label: "Client Satisfaction" },
  { end: 8, suffix: "", label: "Countries Reached" },
];

const testimonials = [
  {
    quote:
      "Nepovoxel transformed our entire visual identity. The AI-generated product shots look indistinguishable from a $10K studio shoot. Our conversion rate jumped 34% in the first month.",
    author: "Sarah Chen",
    brand: "Lumière Beauty",
    rating: 5,
  },
  {
    quote:
      "We went from zero content to a full month of ad creatives in under a week. Our ROAS improved 3x immediately. This is the best investment we've made in our brand.",
    author: "Marcus Webb",
    brand: "Velocity Athletics",
    rating: 5,
  },
  {
    quote:
      "The website they built for us won praise from every investor we pitched. The 3D hero alone gets compliments in every meeting. Truly world-class work.",
    author: "Elena Vasquez",
    brand: "Cipher Security",
    rating: 5,
  },
];

const clientLogos = [
  "Lumière Beauty",
  "Velocity Athletics",
  "Aurora Labs",
  "Nova Systems",
  "Ember & Co",
  "Summit Fitness",
  "Prism Optical",
  "Cipher Inc",
  "Bloom Co",
];

function LogoMarquee() {
  const doubledLogos = [...clientLogos, ...clientLogos];

  return (
    <div className="relative overflow-hidden py-8 mb-20">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-obsidian to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-obsidian to-transparent z-10 pointer-events-none" />

      <div className="flex animate-marquee hover:[animation-play-state:paused]">
        {doubledLogos.map((logo, i) => (
          <div
            key={i}
            className="flex-shrink-0 mx-8 px-6 py-3 border border-royal-gold/10 bg-mahogany/30"
          >
            <span className="font-serif text-sm text-ivory/40 whitespace-nowrap tracking-wide">
              {logo}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SocialProofSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!testimonialsRef.current) return;

    const cards = testimonialsRef.current.querySelectorAll(".testimonial-card");

    gsap.fromTo(
      cards,
      { opacity: 0, x: 40 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: testimonialsRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="social-proof" className="relative py-32 px-6 lg:px-12">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="text-royal-gold text-[10px] font-sans font-medium tracking-luxury uppercase mb-4">
            Trusted By Founders
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-ivory">
            Social Proof
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-royal-gold" />
            <div className="w-1.5 h-1.5 rotate-45 border border-royal-gold" />
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-royal-gold" />
          </div>
        </div>

        {/* Animated Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              end={stat.end}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>

        {/* Logo Marquee */}
        <LogoMarquee />

        {/* Testimonials */}
        <div
          ref={testimonialsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="testimonial-card bg-mahogany gold-top-rule p-8 relative group hover:inner-glow-hover transition-all duration-500"
            >
              {/* Star rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="text-royal-gold text-sm">
                    ★
                  </span>
                ))}
              </div>

              <p className="font-serif text-base text-ivory/80 italic leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 border border-royal-gold/30 rotate-45 flex items-center justify-center flex-shrink-0">
                  <span className="font-serif text-xs text-royal-gold -rotate-45">
                    {t.author.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <p className="font-sans text-sm text-ivory font-medium">
                    {t.author}
                  </p>
                  <p className="font-sans text-xs text-royal-gold tracking-wide">
                    {t.brand}
                  </p>
                </div>
              </div>

              {/* Decorative quote mark */}
              <div className="absolute top-6 right-6 text-royal-gold/10 text-5xl font-serif leading-none">
                &rdquo;
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee animation styles */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
}
