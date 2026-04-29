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
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-luxury ${
          scrolled
            ? "bg-obsidian/90 backdrop-blur-md border-b border-royal-gold/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              {/* Diamond Mark */}
              <div className="w-8 h-8 border border-royal-gold rotate-45 flex items-center justify-center transition-all duration-500 group-hover:border-champagne group-hover:shadow-[0_0_15px_rgba(201,169,110,0.3)]">
                <div className="w-3 h-3 bg-royal-gold rotate-0 transition-colors duration-500 group-hover:bg-champagne" />
              </div>
              <span className="font-serif text-xl tracking-[0.12em] text-ivory uppercase">
                Nepovoxel
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-serif text-xs tracking-luxury uppercase text-ivory/70 hover:text-royal-gold transition-colors duration-500"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden lg:block">
              <a
                href="#contact"
                className="inline-flex items-center px-6 py-2.5 bg-royal-gold text-obsidian text-xs font-sans font-medium tracking-luxury uppercase rounded-sharp hover:bg-champagne transition-all duration-500 hover:shadow-[0_0_20px_rgba(201,169,110,0.25)]"
              >
                Begin Project
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
            >
              <span
                className={`w-6 h-[1px] bg-royal-gold transition-all duration-400 ${
                  mobileOpen ? "rotate-45 translate-y-[3.5px]" : ""
                }`}
              />
              <span
                className={`w-6 h-[1px] bg-royal-gold transition-all duration-400 ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`w-6 h-[1px] bg-royal-gold transition-all duration-400 ${
                  mobileOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-obsidian/98 backdrop-blur-xl transition-all duration-500 ease-luxury lg:hidden ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-serif text-2xl tracking-luxury uppercase text-ivory/80 hover:text-royal-gold transition-colors duration-500"
              style={{
                transitionDelay: mobileOpen ? `${i * 50}ms` : "0ms",
                transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
                opacity: mobileOpen ? 1 : 0,
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="mt-4 inline-flex items-center px-8 py-3 bg-royal-gold text-obsidian text-sm font-sans font-medium tracking-luxury uppercase rounded-sharp"
            style={{
              transitionDelay: mobileOpen ? `${navLinks.length * 50}ms` : "0ms",
              transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
              opacity: mobileOpen ? 1 : 0,
            }}
          >
            Begin Project
          </a>
        </div>
      </div>
    </>
  );
}
