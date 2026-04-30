"use client";

import Navbar from "@/components/navbar";
import HeroSection from "@/components/sections/hero-section";
import ServicesSection from "@/components/sections/services-section";
import ShowcaseSection from "@/components/sections/showcase-section";
import ProcessSection from "@/components/sections/process-section";
import PricingSection from "@/components/sections/pricing-section";
import SocialProofSection from "@/components/sections/social-proof-section";
import AboutSection from "@/components/sections/about-section";
import ContactSection from "@/components/sections/contact-section";

export default function Home() {
  return (
    <main className="relative bg-white">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <ShowcaseSection />
      <ProcessSection />
      <PricingSection />
      <SocialProofSection />
      <AboutSection />
      <ContactSection />

      {/* Footer */}
      <footer className="py-10 lg:py-14 px-6 lg:px-12 border-t border-gray-200 bg-[#FAFAFA]">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-4 h-4 border border-violet/30 rotate-45 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-violet/50" />
            </div>
            <span className="font-serif text-xs tracking-[0.15em] text-gray-500 uppercase">
              Nepovoxel
            </span>
          </div>

          <p className="font-sans text-[10px] text-gray-300 tracking-wider">
            © 2025 Nepovoxel. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            {["Instagram", "LinkedIn", "Behance"].map((link) => (
              <a
                key={link}
                href="#"
                className="font-sans text-[10px] text-gray-300 tracking-[0.15em] uppercase hover:text-violet transition-colors duration-500"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
