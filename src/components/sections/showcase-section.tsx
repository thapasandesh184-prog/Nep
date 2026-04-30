"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const portfolioItems = [
  { id: 1, title: "Lumière Glow", brand: "Lumière Beauty", type: "Product", image: "/images/portfolio/kling_20260321_作品_Generate_a_5910_0.png" },
  { id: 2, title: "Velocity Campaign", brand: "Velocity Athletics", type: "Video", image: "/images/portfolio/kling_20260421_IMAGE_South_Asia_3545_1.png" },
  { id: 3, title: "Aurora Launch", brand: "Aurora Labs", type: "UGC", image: "/images/portfolio/kling_20260321_作品_Generate_a_5910_1.png" },
  { id: 4, title: "Nova Platform", brand: "Nova Systems", type: "Website", image: "/images/portfolio/Whisk_149f9df37052850b3bc40c5eb341bb84eg.png" },
  { id: 5, title: "Ember Collection", brand: "Ember & Co", type: "Product", image: "/images/portfolio/kling_20260321_作品_Generate_a_5910_5.png" },
  { id: 6, title: "Summit Rebrand", brand: "Summit Fitness", type: "Content", image: "/images/portfolio/Whisk_616d2dfce8e323184904e38a31aac0e4eg.png" },
];

export default function ShowcaseSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 60%" }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const activeItem = portfolioItems[activeIndex];

  return (
    <section ref={sectionRef} id="work" className="relative min-h-screen py-40 lg:py-56 px-6 lg:px-16 overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div ref={titleRef} className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-20 lg:mb-32 gap-8">
          <div>
            <p className="text-royal-gold text-[9px] font-sans tracking-[0.25em] uppercase mb-6">Selected Work</p>
            <h2 className="font-serif text-[clamp(3rem,8vw,7rem)] leading-[0.95] tracking-[-0.02em] text-ivory">
              Showcase
            </h2>
          </div>
          <p className="font-sans text-sm text-ivory/30 max-w-xs leading-relaxed">
            A curated selection of AI-generated visuals and digital experiences crafted for ambitious brands.
          </p>
        </div>

        {/* Cinematic gallery — large image + thumbnail list */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main image — full bleed feel */}
          <div className="lg:col-span-8 relative">
            <div
              ref={imageRef}
              className="relative aspect-[4/3] lg:aspect-[16/10] overflow-hidden"
            >
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="w-full h-full object-cover transition-all duration-1000 ease-luxury"
                style={{ filter: "brightness(0.85)" }}
              />
              {/* Overlay info */}
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 lg:p-12">
                <p className="text-royal-gold text-[9px] font-sans tracking-[0.25em] uppercase mb-2">{activeItem.type}</p>
                <h3 className="font-serif text-3xl lg:text-5xl text-ivory">{activeItem.title}</h3>
                <p className="font-sans text-sm text-ivory/50 mt-1">{activeItem.brand}</p>
              </div>
            </div>
          </div>

          {/* Thumbnail stack — vertical list */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0">
            {portfolioItems.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setActiveIndex(i)}
                className={`group flex-shrink-0 lg:flex-shrink relative w-32 h-24 lg:w-full lg:h-28 overflow-hidden border transition-all duration-500 ${
                  i === activeIndex
                    ? "border-royal-gold/50 opacity-100"
                    : "border-ivory/5 opacity-40 hover:opacity-70"
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-obsidian/40" />
                <span className="absolute bottom-2 left-3 font-sans text-[10px] text-ivory/60 tracking-wider">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
