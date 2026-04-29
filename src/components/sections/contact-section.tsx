"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  "UGC Images",
  "Product Images",
  "UGC Videos",
  "Ad Videos",
  "Content Videos",
  "Web Development",
  "Full Package",
];

const budgets = [
  "$500 – $1,500",
  "$2,000 – $5,000",
  "$5,000 – $15,000",
  "$15,000+",
  "Not sure yet",
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    service: "",
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current!.querySelectorAll(".animate-in"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", brand: "", service: "", budget: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses =
    "w-full bg-obsidian/80 border border-royal-gold/20 px-4 py-3.5 text-sm text-ivory font-sans placeholder:text-ivory/20 focus:border-royal-gold/50 focus:outline-none transition-colors duration-500 rounded-sharp";

  const labelClasses =
    "block text-[10px] font-sans font-medium text-royal-gold tracking-luxury uppercase mb-2";

  return (
    <section ref={sectionRef} id="contact" className="relative py-32 px-6 lg:px-12">
      {/* Subtle particle background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-[2px] h-[2px] bg-royal-gold/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animation: `float ${6 + Math.random() * 4}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="animate-in font-serif text-4xl lg:text-6xl text-ivory mb-6">
            Ready to look{" "}
            <span className="italic text-royal-gold">inevitable?</span>
          </h2>
          <div className="animate-in flex items-center justify-center gap-4 mb-8">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-royal-gold" />
            <div className="w-1.5 h-1.5 rotate-45 border border-royal-gold" />
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-royal-gold" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="animate-in">
            <h3 className="font-serif text-xl text-ivory mb-6">
              Send a message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className={labelClasses}>Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={inputClasses}
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className={labelClasses}>Brand</label>
                <input
                  type="text"
                  required
                  value={formData.brand}
                  onChange={(e) =>
                    setFormData({ ...formData, brand: e.target.value })
                  }
                  className={inputClasses}
                  placeholder="Your brand or company"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClasses}>Service</label>
                  <select
                    required
                    value={formData.service}
                    onChange={(e) =>
                      setFormData({ ...formData, service: e.target.value })
                    }
                    className={`${inputClasses} appearance-none cursor-pointer`}
                  >
                    <option value="" disabled>
                      Select...
                    </option>
                    {services.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClasses}>Budget</label>
                  <select
                    required
                    value={formData.budget}
                    onChange={(e) =>
                      setFormData({ ...formData, budget: e.target.value })
                    }
                    className={`${inputClasses} appearance-none cursor-pointer`}
                  >
                    <option value="" disabled>
                      Select...
                    </option>
                    {budgets.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClasses}>Message</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className={`${inputClasses} resize-none`}
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-royal-gold text-obsidian text-xs font-sans font-medium tracking-luxury uppercase rounded-sharp hover:bg-champagne transition-all duration-500 hover:shadow-[0_0_25px_rgba(201,169,110,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

              {submitStatus === "success" && (
                <p className="text-royal-gold text-sm font-sans text-center">
                  Message sent successfully. We will be in touch within 24 hours.
                </p>
              )}
              {submitStatus === "error" && (
                <p className="text-red-400 text-sm font-sans text-center">
                  Something went wrong. Please try again or reach out directly.
                </p>
              )}
            </form>
          </div>

          {/* Right column — Calendly + Direct channels */}
          <div className="animate-in space-y-10">
            {/* Calendly Embed Placeholder */}
            <div>
              <h3 className="font-serif text-xl text-ivory mb-4">
                Book a discovery call
              </h3>
              <p className="font-sans text-sm text-ivory/50 mb-6">
                Prefer to talk? Schedule a free 30-minute call to discuss your
                project.
              </p>

              {/* Calendly Inline Embed */}
              <div className="bg-mahogany/50 border border-royal-gold/10 p-6">
                <div className="text-center py-12">
                  <div className="w-12 h-12 border border-royal-gold/30 rotate-45 mx-auto mb-4 flex items-center justify-center">
                    <div className="w-4 h-4 bg-royal-gold/20" />
                  </div>
                  <p className="text-ivory/40 text-sm font-sans mb-2">
                    Calendly Embed
                  </p>
                  <p className="text-ivory/20 text-xs font-sans">
                    Add your Calendly URL in the component
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Channels */}
            <div className="pt-8 border-t border-royal-gold/10">
              <h3 className="font-serif text-lg text-ivory mb-6">
                Or reach out directly
              </h3>

              <div className="space-y-4">
                <a
                  href="mailto:hello@nepovoxel.com"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 border border-royal-gold/20 flex items-center justify-center group-hover:border-royal-gold/50 transition-colors duration-500">
                    <span className="text-royal-gold text-xs">@</span>
                  </div>
                  <div>
                    <p className="font-sans text-xs text-ivory/40 tracking-luxury uppercase">
                      Email
                    </p>
                    <p className="font-sans text-sm text-ivory group-hover:text-royal-gold transition-colors duration-500">
                      hello@nepovoxel.com
                    </p>
                  </div>
                </a>

                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 border border-royal-gold/20 flex items-center justify-center group-hover:border-royal-gold/50 transition-colors duration-500">
                    <span className="text-royal-gold text-xs">WA</span>
                  </div>
                  <div>
                    <p className="font-sans text-xs text-ivory/40 tracking-luxury uppercase">
                      WhatsApp
                    </p>
                    <p className="font-sans text-sm text-ivory group-hover:text-royal-gold transition-colors duration-500">
                      Message us
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
