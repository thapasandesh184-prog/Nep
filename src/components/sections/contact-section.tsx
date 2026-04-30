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
    email: "",
    brand: "",
    service: "",
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current!.querySelectorAll(".animate-in"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
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
        setFormData({
          name: "",
          email: "",
          brand: "",
          service: "",
          budget: "",
          message: "",
        });
        setTouched({});
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBase =
    "w-full bg-transparent border-b px-0 py-4 text-sm text-gray-900 font-sans placeholder:text-gray-300 focus:outline-none transition-all duration-500";
  const inputNormal = "border-gray-200 focus:border-violet/50";
  const inputError = "border-red-400/50 focus:border-red-400/70";

  const labelBase =
    "block text-[10px] font-sans tracking-[0.25em] uppercase mb-1 transition-colors duration-300";

  const getFieldError = (field: string) => {
    if (!touched[field]) return false;
    if (field === "email") {
      return formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    }
    return !formData[field as keyof typeof formData];
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-28 lg:py-40 px-6 lg:px-12 overflow-hidden bg-white"
    >
      {/* Background tint */}
      <div className="absolute inset-0 bg-gradient-to-t from-violet/[0.02] via-transparent to-transparent pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative">
        {/* Headline */}
        <div className="mb-16 lg:mb-24">
          <h2 className="animate-in font-serif text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-[-0.02em] text-gray-900">
            Ready to look{" "}
            <span className="italic text-violet">premium?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
          {/* Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="animate-in">
                  <label className={`${labelBase} ${getFieldError("name") ? "text-red-400/70" : "text-violet/70"}`}>
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    onBlur={() => setTouched({ ...touched, name: true })}
                    className={`${inputBase} ${getFieldError("name") ? inputError : inputNormal}`}
                    placeholder="Your full name"
                  />
                </div>
                <div className="animate-in">
                  <label className={`${labelBase} ${getFieldError("email") ? "text-red-400/70" : "text-violet/70"}`}>
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    onBlur={() => setTouched({ ...touched, email: true })}
                    className={`${inputBase} ${getFieldError("email") ? inputError : inputNormal}`}
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div className="animate-in">
                <label className={`${labelBase} ${getFieldError("brand") ? "text-red-400/70" : "text-violet/70"}`}>
                  Brand / Company *
                </label>
                <input
                  type="text"
                  required
                  value={formData.brand}
                  onChange={(e) =>
                    setFormData({ ...formData, brand: e.target.value })
                  }
                  onBlur={() => setTouched({ ...touched, brand: true })}
                  className={`${inputBase} ${getFieldError("brand") ? inputError : inputNormal}`}
                  placeholder="Your brand name"
                />
              </div>

              <div className="animate-in grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className={`${labelBase} ${getFieldError("service") ? "text-red-400/70" : "text-violet/70"}`}>
                    Service *
                  </label>
                  <select
                    required
                    value={formData.service}
                    onChange={(e) =>
                      setFormData({ ...formData, service: e.target.value })
                    }
                    onBlur={() => setTouched({ ...touched, service: true })}
                    className={`${inputBase} ${getFieldError("service") ? inputError : inputNormal} appearance-none cursor-pointer`}
                  >
                    <option value="" disabled>
                      Select a service...
                    </option>
                    {services.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={`${labelBase} ${getFieldError("budget") ? "text-red-400/70" : "text-violet/70"}`}>
                    Budget *
                  </label>
                  <select
                    required
                    value={formData.budget}
                    onChange={(e) =>
                      setFormData({ ...formData, budget: e.target.value })
                    }
                    onBlur={() => setTouched({ ...touched, budget: true })}
                    className={`${inputBase} ${getFieldError("budget") ? inputError : inputNormal} appearance-none cursor-pointer`}
                  >
                    <option value="" disabled>
                      Select budget...
                    </option>
                    {budgets.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="animate-in">
                <label className={`${labelBase} text-violet/70`}>
                  Project Details
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className={`${inputBase} ${inputNormal} resize-none`}
                  placeholder="Tell us about your project, timeline, and goals..."
                />
              </div>

              <div className="animate-in pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-10 py-4 bg-violet text-white text-[11px] font-sans tracking-[0.18em] uppercase hover:bg-violet-light transition-all duration-500 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </button>

                {submitStatus === "success" && (
                  <p className="mt-4 text-teal text-sm font-sans flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-teal">
                      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Message sent. We will be in touch within 24 hours.
                  </p>
                )}
                {submitStatus === "error" && (
                  <p className="mt-4 text-red-500 text-sm font-sans">
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}
              </div>
            </form>
          </div>

          {/* Right column — direct contact */}
          <div className="lg:col-span-4 lg:col-start-9 space-y-12">
            <div className="animate-in">
              <p className="text-[10px] font-sans text-violet/60 tracking-[0.25em] uppercase mb-3">
                Email
              </p>
              <a
                href="mailto:hello@nepovoxel.com"
                className="font-serif text-xl lg:text-2xl text-gray-900 hover:text-violet transition-colors duration-500"
              >
                hello@nepovoxel.com
              </a>
            </div>

            <div className="animate-in">
              <p className="text-[10px] font-sans text-violet/60 tracking-[0.25em] uppercase mb-3">
                WhatsApp
              </p>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="font-serif text-xl lg:text-2xl text-gray-900 hover:text-violet transition-colors duration-500"
              >
                Message us
              </a>
            </div>

            <div className="animate-in pt-8 border-t border-gray-200">
              <p className="font-sans text-xs text-gray-400 leading-relaxed">
                We typically respond within 24 hours. For urgent inquiries,
                WhatsApp is the fastest channel.
              </p>
            </div>

            {/* Response time badge */}
            <div className="animate-in inline-flex items-center gap-2 px-4 py-2 border border-teal/20 bg-teal/[0.04]">
              <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
              <span className="font-sans text-[10px] text-teal/70 tracking-[0.12em] uppercase">
                Usually replies in 2 hours
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
