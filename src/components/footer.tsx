"use client";

import React from "react";

const links = ["Services", "Work", "Process", "Pricing", "About", "Contact"];
const legal = ["Privacy", "Terms"];

export default function Footer() {
  return (
    <footer className="relative bg-[#080604] border-t border-ivory/[0.03]">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-16 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Logo + tagline */}
          <div className="lg:col-span-5">
            <a href="#" className="flex items-center gap-3 mb-6">
              <div className="w-6 h-6 border border-royal-gold/40 rotate-45 flex items-center justify-center">
                <div className="w-2 h-2 bg-royal-gold/60" />
              </div>
              <span className="font-serif text-lg tracking-[0.15em] text-ivory uppercase">Nepovoxel</span>
            </a>
            <p className="font-sans text-sm text-ivory/20 max-w-sm leading-relaxed">
              AI-generated visuals, ad creatives, and world-class development — crafted with the precision of a royal atelier.
            </p>
          </div>

          {/* Nav */}
          <div className="lg:col-span-3 lg:col-start-7">
            <p className="text-[9px] font-sans text-royal-gold tracking-[0.25em] uppercase mb-6">Navigation</p>
            <div className="space-y-3">
              {links.map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`} className="block font-sans text-sm text-ivory/30 hover:text-royal-gold transition-colors duration-500">
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Legal + social */}
          <div className="lg:col-span-2">
            <p className="text-[9px] font-sans text-royal-gold tracking-[0.25em] uppercase mb-6">Legal</p>
            <div className="space-y-3">
              {legal.map((link) => (
                <a key={link} href="#" className="block font-sans text-sm text-ivory/30 hover:text-royal-gold transition-colors duration-500">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-20 pt-8 border-t border-ivory/[0.03] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <p className="font-sans text-xs text-ivory/15">
            © {new Date().getFullYear()} Nepovoxel. All rights reserved.
          </p>
          <p className="font-sans text-xs text-ivory/15">
            Built with obsession in Nepal.
          </p>
        </div>
      </div>
    </footer>
  );
}
