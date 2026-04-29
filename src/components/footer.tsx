"use client";

import React from "react";

const footerLinks = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#080604] border-t border-royal-gold/5">
      {/* Gold diamond motif at top */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
        <div className="w-6 h-6 border border-royal-gold/40 rotate-45 bg-[#080604] flex items-center justify-center">
          <div className="w-2 h-2 bg-royal-gold/60" />
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-16 pb-8">
        <div className="flex flex-col items-center mb-12">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 mb-8">
            <div className="w-6 h-6 border border-royal-gold rotate-45 flex items-center justify-center">
              <div className="w-2 h-2 bg-royal-gold" />
            </div>
            <span className="font-serif text-lg tracking-[0.12em] text-ivory uppercase">
              Nepovoxel
            </span>
          </a>

          {/* Nav Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-sans text-xs text-ivory/40 hover:text-royal-gold transition-colors duration-500 tracking-wide uppercase"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-royal-gold/5">
          <p className="font-sans text-xs text-ivory/30">
            © {new Date().getFullYear()} Nepovoxel. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-sans text-xs text-ivory/30 hover:text-royal-gold transition-colors duration-500"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
