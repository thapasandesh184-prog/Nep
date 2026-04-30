"use client";

import React, { useState, useEffect } from "react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-luxury ${
        scrolled ? "bg-obsidian/80 backdrop-blur-md" : "bg-transparent"
      }`}>
        <div className="max-w-[1600px] mx-auto px-6 lg:px-16">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-6 h-6 border border-royal-gold/40 rotate-45 flex items-center justify-center transition-all duration-500 group-hover:border-royal-gold">
                <div className="w-2 h-2 bg-royal-gold/60" />
              </div>
              <span className="font-serif text-base tracking-[0.15em] text-ivory uppercase hidden sm:block">Nepovoxel</span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="font-sans text-[10px] tracking-[0.2em] uppercase text-ivory/40 hover:text-royal-gold transition-colors duration-500">
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden lg:block">
              <a href="#contact" className="px-6 py-2.5 border border-royal-gold/30 text-royal-gold text-[10px] font-sans tracking-[0.2em] uppercase hover:bg-royal-gold hover:text-obsidian transition-all duration-500">
                Begin Project
              </a>
            </div>

            {/* Mobile hamburger */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden flex flex-col gap-1.5 p-2" aria-label="Toggle menu">
              <span className={`w-5 h-[1px] bg-royal-gold transition-all duration-500 ${mobileOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
              <span className={`w-5 h-[1px] bg-royal-gold transition-all duration-500 ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`w-5 h-[1px] bg-royal-gold transition-all duration-500 ${mobileOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div className={`fixed inset-0 z-40 bg-obsidian/98 backdrop-blur-xl transition-all duration-700 ease-luxury lg:hidden ${
        mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}>
        <div className="flex flex-col items-start justify-center h-full gap-8 px-12">
          {navLinks.map((link, i) => (
            <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
              className="font-serif text-3xl tracking-wide text-ivory/80 hover:text-royal-gold transition-colors duration-500"
              style={{ transitionDelay: mobileOpen ? `${i * 50}ms` : "0ms", opacity: mobileOpen ? 1 : 0, transform: mobileOpen ? "translateY(0)" : "translateY(20px)" }}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
