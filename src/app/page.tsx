"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import PhotonCursor from "@/components/dimension/photon-cursor";
import Minimap from "@/components/dimension/minimap";

gsap.registerPlugin(ScrollTrigger);

// Lazy load the heavy 3D canvas
const DimensionCanvas = dynamic(() => import("@/components/dimension/dimension-canvas"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-[#08070A] flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border border-[#7B5EA7]/30 rotate-45 animate-pulse mx-auto mb-4" />
        <p className="text-[#C4BADA] text-xs tracking-[0.2em] uppercase">Initializing Dimension</p>
      </div>
    </div>
  ),
});

// Zone components
const Zone00Entry = dynamic(() => import("@/components/dimension/zones/zone-00-entry"), { ssr: false });
const Zone01Hero = dynamic(() => import("@/components/dimension/zones/zone-01-hero"), { ssr: false });
const Zone02Images = dynamic(() => import("@/components/dimension/zones/zone-02-images"), { ssr: false });
const Zone03Videos = dynamic(() => import("@/components/dimension/zones/zone-03-videos"), { ssr: false });
const Zone04Web = dynamic(() => import("@/components/dimension/zones/zone-04-web"), { ssr: false });
const Zone05Pricing = dynamic(() => import("@/components/dimension/zones/zone-05-pricing"), { ssr: false });
const Zone06Contact = dynamic(() => import("@/components/dimension/zones/zone-06-contact"), { ssr: false });

export default function Home() {
  const scrollProgress = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);
  const [currentZone, setCurrentZone] = useState(0);

  useEffect(() => {
    if (!containerRef.current || !entered) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          scrollProgress.current = self.progress;
          
          // Determine current zone
          const p = self.progress;
          if (p < 0.08) setCurrentZone(0);
          else if (p < 0.22) setCurrentZone(1);
          else if (p < 0.38) setCurrentZone(2);
          else if (p < 0.52) setCurrentZone(3);
          else if (p < 0.65) setCurrentZone(4);
          else if (p < 0.8) setCurrentZone(5);
          else setCurrentZone(6);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [entered]);

  const zones: { label: string; range: [number, number] }[] = [
    { label: "Entry", range: [0, 0.08] },
    { label: "Origin", range: [0.08, 0.22] },
    { label: "Images", range: [0.22, 0.38] },
    { label: "Video", range: [0.38, 0.52] },
    { label: "Web", range: [0.52, 0.65] },
    { label: "Pricing", range: [0.65, 0.8] },
    { label: "Signal", range: [0.8, 1] },
  ];

  return (
    <main className="relative">
      {/* 3D Canvas — fixed behind everything */}
      {entered && (
        <DimensionCanvas scrollProgress={scrollProgress}>
          <Zone00Entry progress={scrollProgress.current} />
          <Zone01Hero progress={scrollProgress.current} />
          <Zone02Images progress={scrollProgress.current} />
          <Zone03Videos progress={scrollProgress.current} />
          <Zone04Web progress={scrollProgress.current} />
          <Zone05Pricing progress={scrollProgress.current} />
          <Zone06Contact progress={scrollProgress.current} />
        </DimensionCanvas>
      )}

      {/* Photon Cursor */}
      {entered && <PhotonCursor />}

      {/* Minimap */}
      {entered && <Minimap zones={zones} currentZone={currentZone} />}

      {/* Entry Screen — before entering dimension */}
      {!entered && (
        <div className="fixed inset-0 z-50 bg-[#08070A] flex flex-col items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border border-[#7B5EA7]/40 rotate-45 mx-auto mb-8 flex items-center justify-center">
              <div className="w-4 h-4 bg-[#7B5EA7]/40" />
            </div>
            <p className="text-[#7B5EA7] text-[9px] font-sans tracking-[0.3em] uppercase mb-4">Nepovoxel</p>
            <h1 className="font-display text-4xl lg:text-6xl text-[#F2EFF9] mb-6">
              Enter the Dimension
            </h1>
            <p className="text-[#C4BADA] text-sm max-w-md mx-auto mb-10 leading-relaxed">
              You do not scroll a website. You fly through a living AI universe that generates itself around you.
            </p>
            <button
              onClick={() => setEntered(true)}
              className="group relative px-10 py-4 border border-[#7B5EA7]/50 text-[#F2EFF9] text-xs font-sans tracking-[0.25em] uppercase overflow-hidden hover:border-[#7B5EA7] transition-colors duration-700"
            >
              <span className="relative z-10">Initialize Flight</span>
              <span className="absolute inset-0 bg-[#7B5EA7]/20 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-luxury" />
            </button>
          </div>
        </div>
      )}

      {/* Scroll container — drives the camera */}
      {entered && (
        <div ref={containerRef} className="relative" style={{ height: "800vh" }}>
          {/* Zone 00: Entry */}
          <ZoneOverlay>
            <div className="h-screen flex items-end pb-32">
              <div className="max-w-[1600px] mx-auto px-6 lg:px-16 w-full">
                <p className="text-[#7B5EA7] text-[9px] font-sans tracking-[0.3em] uppercase mb-4">Zone 00 — The Void</p>
              </div>
            </div>
          </ZoneOverlay>

          {/* Zone 01: Hero */}
          <ZoneOverlay>
            <div className="h-screen flex items-center">
              <div className="max-w-[1600px] mx-auto px-6 lg:px-16 w-full">
                <p className="text-[#34D399] text-[9px] font-sans tracking-[0.3em] uppercase mb-6">Zone 01 — Origin Field</p>
                <h2 className="font-display text-[clamp(3rem,10vw,9rem)] leading-[0.9] text-[#F2EFF9] mb-6">
                  We generate the<br />
                  <span className="text-[#A78BFA]">visuals</span> your brand<br />
                  needs to be <span className="italic text-[#34D399]">inevitable.</span>
                </h2>
                <p className="text-[#C4BADA] text-sm max-w-md leading-relaxed">
                  AI-generated product photography, UGC videos, ad creatives, and world-class web development — all from one precision studio.
                </p>
              </div>
            </div>
          </ZoneOverlay>

          {/* Zone 02: Images */}
          <ZoneOverlay>
            <div className="h-screen flex items-center justify-end">
              <div className="max-w-xl mr-16 lg:mr-32 text-right">
                <p className="text-[#7B5EA7] text-[9px] font-sans tracking-[0.3em] uppercase mb-6">Zone 02 — Image Factory</p>
                <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-[#F2EFF9] mb-6">
                  Product shots that<br />
                  <span className="text-[#A78BFA]">sell.</span>
                </h2>
                <p className="text-[#C4BADA] text-sm leading-relaxed">
                  AI-generated product photography and UGC lifestyle images. Indistinguishable from $10K studio shoots at a fraction of the cost.
                </p>
              </div>
            </div>
          </ZoneOverlay>

          {/* Zone 03: Videos */}
          <ZoneOverlay>
            <div className="h-screen flex items-center">
              <div className="max-w-xl ml-16 lg:ml-32">
                <p className="text-[#34D399] text-[9px] font-sans tracking-[0.3em] uppercase mb-6">Zone 03 — Video Dimension</p>
                <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-[#F2EFF9] mb-6">
                  Videos that<br />
                  <span className="text-[#34D399]">stop</span> the scroll.
                </h2>
                <p className="text-[#C4BADA] text-sm leading-relaxed">
                  AI ad creatives, UGC videos, and brand content engineered for TikTok, Meta, and YouTube. Hook in the first 2 seconds.
                </p>
              </div>
            </div>
          </ZoneOverlay>

          {/* Zone 04: Web */}
          <ZoneOverlay>
            <div className="h-screen flex items-center justify-center text-center">
              <div className="max-w-2xl">
                <p className="text-[#7B5EA7] text-[9px] font-sans tracking-[0.3em] uppercase mb-6">Zone 04 — Web Forge</p>
                <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-[#F2EFF9] mb-6">
                  Websites that<br />
                  <span className="text-[#A78BFA]">convert.</span>
                </h2>
                <p className="text-[#C4BADA] text-sm leading-relaxed">
                  Full-stack Next.js builds with 3D interactive experiences, Shopify headless storefronts, and SaaS platforms.
                </p>
              </div>
            </div>
          </ZoneOverlay>

          {/* Zone 05: Pricing */}
          <ZoneOverlay>
            <div className="h-screen flex items-end pb-32">
              <div className="max-w-[1600px] mx-auto px-6 lg:px-16 w-full">
                <p className="text-[#F0C040] text-[9px] font-sans tracking-[0.3em] uppercase mb-6">Zone 05 — Pricing Constellation</p>
                <h2 className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.9] text-[#F2EFF9] mb-8">
                  Three worlds.<br />
                  Three stars.
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-[#F2EFF9]/5 max-w-4xl">
                  {[
                    { name: "Starter", price: "$500", color: "#C4BADA", desc: "10 images, 2 videos, email support" },
                    { name: "Growth", price: "$2,000", color: "#7B5EA7", desc: "30 images, 5 videos, landing page" },
                    { name: "Elite", price: "$5,000+", color: "#F0C040", desc: "Unlimited scope, full custom site" },
                  ].map((tier, i) => (
                    <div key={i} className="bg-[#08070A] p-8 group hover:bg-[#08070A]/80 transition-colors duration-500">
                      <p className="text-[9px] font-sans tracking-[0.2em] uppercase mb-2" style={{ color: tier.color }}>{tier.name}</p>
                      <p className="font-display text-4xl text-[#F2EFF9] mb-3">{tier.price}</p>
                      <p className="text-[#C4BADA] text-xs leading-relaxed">{tier.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ZoneOverlay>

          {/* Zone 06: Contact */}
          <ZoneOverlay>
            <div className="h-screen flex items-center">
              <div className="max-w-[1600px] mx-auto px-6 lg:px-16 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                  <div>
                    <p className="text-[#34D399] text-[9px] font-sans tracking-[0.3em] uppercase mb-6">Zone 06 — The Signal</p>
                    <h2 className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.9] text-[#F2EFF9] mb-8">
                      Transmit<br />
                      your <span className="italic text-[#34D399]">signal.</span>
                    </h2>
                    <p className="text-[#C4BADA] text-sm leading-relaxed max-w-md">
                      You have reached the edge of the dimension. Your brand&apos;s signal is ready to be amplified.
                    </p>
                  </div>
                  <div className="space-y-8">
                    <div>
                      <p className="text-[9px] font-sans text-[#7B5EA7] tracking-[0.25em] uppercase mb-2">Email</p>
                      <a href="mailto:hello@nepovoxel.com" className="font-display text-2xl text-[#F2EFF9] hover:text-[#A78BFA] transition-colors duration-500">hello@nepovoxel.com</a>
                    </div>
                    <div>
                      <p className="text-[9px] font-sans text-[#7B5EA7] tracking-[0.25em] uppercase mb-2">WhatsApp</p>
                      <a href="https://wa.me/1234567890" className="font-display text-2xl text-[#F2EFF9] hover:text-[#A78BFA] transition-colors duration-500">Message us</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ZoneOverlay>
        </div>
      )}
    </main>
  );
}

// Zone overlay component — shows/hides based on scroll progress
function ZoneOverlay({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const p = self.progress;
          // Fade in during first 20%, hold, fade out during last 20%
          let op = 0;
          if (p < 0.2) op = p / 0.2;
          else if (p > 0.8) op = (1 - p) / 0.2;
          else op = 1;
          setOpacity(op);
          setVisible(op > 0.01);
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="sticky top-0 h-screen" style={{ opacity, pointerEvents: visible ? "auto" : "none" }}>
      {children}
    </div>
  );
}
