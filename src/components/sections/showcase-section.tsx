"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const portfolioItems = [
  {
    id: 1,
    title: "Lumière Glow",
    brand: "Lumière Beauty",
    type: "Product Photography",
    image: "/images/portfolio/kling_20260321_作品_Generate_a_5910_0.png",
  },
  {
    id: 2,
    title: "Velocity Campaign",
    brand: "Velocity Athletics",
    type: "UGC Video",
    image: "/images/portfolio/kling_20260421_IMAGE_South_Asia_3545_1.png",
  },
  {
    id: 3,
    title: "Aurora Launch",
    brand: "Aurora Labs",
    type: "Brand Content",
    image: "/images/portfolio/kling_20260321_作品_Generate_a_5910_1.png",
  },
  {
    id: 4,
    title: "Nova Platform",
    brand: "Nova Systems",
    type: "Web Design",
    image: "/images/portfolio/Whisk_149f9df37052850b3bc40c5eb341bb84eg.png",
  },
  {
    id: 5,
    title: "Ember Collection",
    brand: "Ember & Co",
    type: "Product Photography",
    image: "/images/portfolio/kling_20260321_作品_Generate_a_5910_5.png",
  },
  {
    id: 6,
    title: "Summit Rebrand",
    brand: "Summit Fitness",
    type: "Content Suite",
    image: "/images/portfolio/Whisk_616d2dfce8e323184904e38a31aac0e4eg.png",
  },
];

export default function ShowcaseSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (imageContainerRef.current) {
      gsap.fromTo(
        imageContainerRef.current,
        { opacity: 0.7, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [activeIndex]);

  const activeItem = portfolioItems[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative py-28 lg:py-40 px-6 lg:px-12 overflow-hidden bg-[#FAFAFA]"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div
          ref={titleRef}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 lg:mb-24 gap-6"
        >
          <div>
            <p className="text-violet text-[10px] font-sans tracking-[0.3em] uppercase mb-4">
              Selected Work
            </p>
            <h2 className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-[-0.02em] text-gray-900">
              Showcase
            </h2>
          </div>
          <p className="font-sans text-sm text-gray-500 max-w-sm leading-relaxed">
            A curated selection of AI-generated visuals and digital experiences
            crafted for ambitious brands.
          </p>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          {/* Main image */}
          <div className="lg:col-span-8">
            <div
              ref={imageContainerRef}
              className="relative aspect-[4/3] lg:aspect-[16/10] overflow-hidden bg-gray-100 rounded-sm"
            >
              <Image
                src={activeItem.image}
                alt={activeItem.title}
                fill
                className="object-cover transition-all duration-700"
                sizes="(max-width: 1024px) 100vw, 66vw"
                priority={activeIndex === 0}
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              {/* Info */}
              <div className="absolute bottom-0 left-0 p-6 lg:p-10">
                <p className="text-teal text-[10px] font-sans tracking-[0.25em] uppercase mb-2">
                  {activeItem.type}
                </p>
                <h3 className="font-serif text-2xl lg:text-4xl text-white mb-1">
                  {activeItem.title}
                </h3>
                <p className="font-sans text-sm text-white/70">
                  {activeItem.brand}
                </p>
              </div>

              {/* Index counter */}
              <div className="absolute top-6 right-6 lg:top-10 lg:right-10">
                <span className="font-serif text-5xl lg:text-6xl text-white/15">
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {portfolioItems.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setActiveIndex(i)}
                className={`group flex-shrink-0 lg:flex-shrink relative w-28 h-20 lg:w-full lg:h-24 overflow-hidden border-2 transition-all duration-500 rounded-sm ${
                  i === activeIndex
                    ? "border-violet opacity-100"
                    : "border-transparent opacity-50 hover:opacity-80"
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 112px, 33vw"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                <div className="absolute bottom-2 left-3 flex items-center gap-2">
                  <span className="font-sans text-[10px] text-white/70 tracking-wider">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {i === activeIndex && (
                    <span className="w-1.5 h-1.5 rounded-full bg-violet" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
