"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Category = "all" | "images" | "videos" | "websites";

interface PortfolioItem {
  id: number;
  title: string;
  brand: string;
  category: Category;
  type: string;
  height: "normal" | "tall";
  gradient: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Lumière Glow Serum",
    brand: "Lumière Beauty",
    category: "images",
    type: "Product Photography",
    height: "normal",
    gradient: "from-mahogany to-midnight-indigo",
  },
  {
    id: 2,
    title: "Velocity Campaign",
    brand: "Velocity Athletics",
    category: "videos",
    type: "Ad Creative",
    height: "tall",
    gradient: "from-forest-seal to-obsidian",
  },
  {
    id: 3,
    title: "Aurora Skincare Launch",
    brand: "Aurora Labs",
    category: "images",
    type: "UGC Lifestyle",
    height: "normal",
    gradient: "from-midnight-indigo to-mahogany",
  },
  {
    id: 4,
    title: "Nova Tech Platform",
    brand: "Nova Systems",
    category: "websites",
    type: "Web Design",
    height: "normal",
    gradient: "from-obsidian to-forest-seal",
  },
  {
    id: 5,
    title: "Ember Candle Collection",
    brand: "Ember & Co",
    category: "images",
    type: "Product Photography",
    height: "tall",
    gradient: "from-mahogany to-obsidian",
  },
  {
    id: 6,
    title: "Summit Fitness Rebrand",
    brand: "Summit Fitness",
    category: "videos",
    type: "Content Video",
    height: "normal",
    gradient: "from-forest-seal to-midnight-indigo",
  },
  {
    id: 7,
    title: "Prism Eyewear",
    brand: "Prism Optical",
    category: "images",
    type: "UGC Lifestyle",
    height: "normal",
    gradient: "from-midnight-indigo to-forest-seal",
  },
  {
    id: 8,
    title: "Cipher Security",
    brand: "Cipher Inc",
    category: "websites",
    type: "SaaS Platform",
    height: "tall",
    gradient: "from-obsidian to-mahogany",
  },
  {
    id: 9,
    title: "Bloom Botanicals",
    brand: "Bloom Co",
    category: "images",
    type: "Product Photography",
    height: "normal",
    gradient: "from-mahogany to-midnight-indigo",
  },
];

const filters: { label: string; value: Category }[] = [
  { label: "All", value: "all" },
  { label: "Images", value: "images" },
  { label: "Videos", value: "videos" },
  { label: "Websites", value: "websites" },
];

function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <div className="max-w-4xl mx-auto mb-20">
      <div className="text-center mb-10">
        <p className="text-royal-gold text-[10px] font-sans font-medium tracking-luxury uppercase mb-4">
          The Transformation
        </p>
        <h3 className="font-serif text-2xl lg:text-3xl text-ivory mb-2">
          Before & After
        </h3>
        <p className="font-sans text-sm text-ivory/40">
          Drag to reveal the AI-enhanced result
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative h-80 lg:h-96 rounded-sharp overflow-hidden cursor-ew-resize select-none"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        onTouchMove={handleTouchMove}
      >
        {/* Before (original) */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 border-2 border-dashed border-gray-500 mx-auto mb-4 flex items-center justify-center">
              <span className="text-gray-500 text-xs">Original</span>
            </div>
            <p className="text-gray-500 text-sm font-sans">Basic product photo</p>
            <p className="text-gray-600 text-xs mt-1">Flat lighting, plain background</p>
          </div>
        </div>

        {/* After (AI-enhanced) */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-mahogany to-midnight-indigo flex items-center justify-center overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <div className="text-center">
            <div className="w-20 h-20 border border-royal-gold/50 mx-auto mb-4 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-royal-gold/10" />
              <span className="text-royal-gold text-xs relative z-10">AI Enhanced</span>
            </div>
            <p className="text-ivory text-sm font-sans">Studio-quality output</p>
            <p className="text-royal-gold text-xs mt-1">Dramatic lighting, styled surface</p>
          </div>
        </div>

        {/* Slider handle */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-royal-gold z-10"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-obsidian border border-royal-gold rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(201,169,110,0.3)]">
            <div className="flex gap-1">
              <div className="w-[1px] h-3 bg-royal-gold" />
              <div className="w-[1px] h-3 bg-royal-gold" />
            </div>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute bottom-4 left-4 px-3 py-1 bg-obsidian/80 text-gray-400 text-[10px] font-sans tracking-luxury uppercase rounded-sharp">
          Before
        </div>
        <div className="absolute bottom-4 right-4 px-3 py-1 bg-obsidian/80 text-royal-gold text-[10px] font-sans tracking-luxury uppercase rounded-sharp">
          After
        </div>
      </div>
    </div>
  );
}

function PortfolioTile({ item }: { item: PortfolioItem }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-sharp cursor-pointer ${
        item.height === "tall" ? "row-span-2" : ""
      }`}
    >
      {/* Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${item.gradient} transition-transform duration-700 ease-luxury group-hover:scale-105`}
      />

      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,#C9A96E_1px,transparent_1px)] bg-[length:20px_20px]" />

      {/* Content */}
      <div className="relative h-full min-h-[240px] flex flex-col justify-end p-6">
        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity duration-500">
          <div className="w-16 h-16 border border-royal-gold rotate-45" />
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Info */}
        <div className="relative z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-luxury">
          <p className="text-royal-gold text-[10px] font-sans tracking-luxury uppercase mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            {item.type}
          </p>
          <h4 className="font-serif text-lg text-ivory mb-1">{item.title}</h4>
          <p className="font-sans text-xs text-ivory/50">{item.brand}</p>
        </div>
      </div>
    </div>
  );
}

export default function ShowcaseSection() {
  const [activeFilter, setActiveFilter] = useState<Category>("all");
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredItems =
    activeFilter === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter);

  useEffect(() => {
    if (!gridRef.current) return;

    const tiles = gridRef.current.querySelectorAll(".group");
    gsap.fromTo(
      tiles,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [activeFilter]);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative py-32 px-6 lg:px-12 bg-gradient-to-b from-obsidian via-midnight-indigo/10 to-obsidian"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="text-center mb-12">
          <p className="text-royal-gold text-[10px] font-sans font-medium tracking-luxury uppercase mb-4">
            Selected Work
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-ivory">
            Work Showcase
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-royal-gold" />
            <div className="w-1.5 h-1.5 rotate-45 border border-royal-gold" />
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-royal-gold" />
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center justify-center gap-2 mb-16">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-6 py-2 text-xs font-sans tracking-luxury uppercase transition-all duration-500 rounded-sharp ${
                activeFilter === filter.value
                  ? "text-obsidian bg-royal-gold"
                  : "text-ivory/50 hover:text-royal-gold border border-transparent hover:border-royal-gold/30"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Before/After Module */}
        <BeforeAfterSlider />

        {/* Masonry Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[240px]"
        >
          {filteredItems.map((item) => (
            <PortfolioTile key={item.id} item={item} />
          ))}
        </div>

        {/* View more */}
        <div className="text-center mt-12">
          <a
            href="#contact"
            className="inline-flex items-center text-royal-gold text-xs font-sans tracking-luxury uppercase hover:text-champagne transition-colors duration-500"
          >
            View full portfolio
            <span className="ml-2">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
