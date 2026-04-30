"use client";

import React, { useState, useEffect } from "react";

export default function Minimap({
  zones,
  currentZone,
}: {
  zones: { label: string; range: [number, number] }[];
  currentZone: number;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const jumpToZone = (index: number) => {
    const target = zones[index].range[0];
    const container = document.querySelector("[data-scroll-container]");
    if (container) {
      const scrollTop = target * (container.scrollHeight - window.innerHeight);
      window.scrollTo({ top: scrollTop, behavior: "smooth" });
    }
    setOpen(false);
  };

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-6 right-6 z-[90] w-10 h-10 border border-[#7B5EA7]/30 flex items-center justify-center hover:border-[#7B5EA7] transition-colors duration-500"
        aria-label="Toggle minimap"
      >
        <div className="w-4 h-4 border border-[#7B5EA7]/60 rotate-45" />
      </button>

      {/* Minimap overlay */}
      <div
        className={`fixed inset-0 z-[80] bg-[#08070A]/90 backdrop-blur-md flex items-center justify-center transition-all duration-700 ease-luxury ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="text-center">
          <p className="text-[#7B5EA7] text-[9px] font-sans tracking-[0.3em] uppercase mb-12">Holographic Minimap — Press Tab</p>
          
          <div className="flex items-center gap-8 lg:gap-16">
            {zones.map((zone, i) => (
              <button
                key={i}
                onClick={() => jumpToZone(i)}
                className={`group relative transition-all duration-500 ${
                  i === currentZone ? "scale-110" : "opacity-40 hover:opacity-70"
                }`}
              >
                {/* Node */}
                <div className={`w-4 h-4 rotate-45 border transition-colors duration-500 ${
                  i === currentZone ? "border-[#34D399] bg-[#34D399]/20" : "border-[#7B5EA7]/40"
                }`} />
                
                {/* Label */}
                <p className={`absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-sans tracking-[0.15em] uppercase transition-colors duration-500 ${
                  i === currentZone ? "text-[#34D399]" : "text-[#C4BADA]/50"
                }`}>
                  {zone.label}
                </p>

                {/* Connector line */}
                {i < zones.length - 1 && (
                  <div className="absolute top-1/2 left-full w-8 lg:w-16 h-[1px] bg-[#7B5EA7]/20 -translate-y-1/2" />
                )}
              </button>
            ))}
          </div>

          <p className="text-[#C4BADA]/20 text-xs mt-20">Click any zone to fly there</p>
        </div>
      </div>
    </>
  );
}
