"use client";

import React from "react";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative py-32 px-6 lg:px-12"
    >
      {/* Subtle particle-like background dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-royal-gold/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl lg:text-6xl text-ivory mb-6">
            Ready to look{" "}
            <span className="italic text-royal-gold">inevitable?</span>
          </h2>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-royal-gold" />
            <div className="w-1.5 h-1.5 rotate-45 border border-royal-gold" />
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-royal-gold" />
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Contact Form Placeholder */}
          <div className="bg-mahogany/50 border border-royal-gold/10 p-8 mb-12">
            <p className="text-center text-ivory/40 text-sm font-sans mb-6">
              Contact Form — Phase 4 (Resend API integration)
            </p>
            <div className="space-y-4">
              <div className="h-12 bg-obsidian/50 border border-royal-gold/10 rounded-sharp" />
              <div className="h-12 bg-obsidian/50 border border-royal-gold/10 rounded-sharp" />
              <div className="h-32 bg-obsidian/50 border border-royal-gold/10 rounded-sharp" />
              <div className="h-12 bg-royal-gold/20 border border-royal-gold/30 rounded-sharp flex items-center justify-center">
                <span className="text-royal-gold text-xs font-sans tracking-luxury uppercase">
                  Send Message
                </span>
              </div>
            </div>
          </div>

          {/* Direct Channels */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <a
              href="mailto:hello@nepovoxel.com"
              className="font-sans text-sm text-ivory/60 hover:text-royal-gold transition-colors duration-500 tracking-wide"
            >
              hello@nepovoxel.com
            </a>
            <span className="hidden sm:block w-1 h-1 rotate-45 bg-royal-gold/40" />
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm text-ivory/60 hover:text-royal-gold transition-colors duration-500 tracking-wide"
            >
              WhatsApp
            </a>
            <span className="hidden sm:block w-1 h-1 rotate-45 bg-royal-gold/40" />
            <a
              href="#"
              className="font-sans text-sm text-ivory/60 hover:text-royal-gold transition-colors duration-500 tracking-wide"
            >
              Book a Call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
