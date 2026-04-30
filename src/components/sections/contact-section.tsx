"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = ["UGC Images", "Product Images", "UGC Videos", "Ad Videos", "Content Videos", "Web Development", "Full Package"];
const budgets = ["$500 – $1,500", "$2,000 – $5,000", "$5,000 – $15,000", "$15,000+", "Not sure yet"];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({ name: "", brand: "", service: "", budget: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current!.querySelectorAll(".animate-in"),
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 60%" }
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

  const inputClasses = "w-full bg-transparent border-b border-ivory/10 px-0 py-4 text-sm text-ivory font-sans placeholder:text-ivory/15 focus:border-royal-gold/40 focus:outline-none transition-colors duration-500";
  const labelClasses = "block text-[9px] font-sans text-royal-gold tracking-[0.25em] uppercase mb-1";

  return (
    <section ref={sectionRef} id="contact" className="relative py-40 lg:py-56 px-6 lg:px-16 overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        {/* Massive CTA headline */}
        <div className="mb-24 lg:mb-40">
          <h2 className="animate-in font-serif text-[clamp(3rem,10vw,9rem)] leading-[0.95] tracking-[-0.02em] text-ivory">
            Ready to look{" "}
            <span className="italic text-royal-gold">inevitable?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Form */}
          <div className="lg:col-span-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="animate-in">
                <label className={labelClasses}>Name</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputClasses} placeholder="Your name" />
              </div>
              <div className="animate-in">
                <label className={labelClasses}>Brand</label>
                <input type="text" required value={formData.brand} onChange={(e) => setFormData({ ...formData, brand: e.target.value })} className={inputClasses} placeholder="Your brand or company" />
              </div>
              <div className="animate-in grid grid-cols-2 gap-8">
                <div>
                  <label className={labelClasses}>Service</label>
                  <select required value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })} className={`${inputClasses} appearance-none cursor-pointer`}>
                    <option value="" disabled>Select...</option>
                    {services.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClasses}>Budget</label>
                  <select required value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} className={`${inputClasses} appearance-none cursor-pointer`}>
                    <option value="" disabled>Select...</option>
                    {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </div>
              <div className="animate-in">
                <label className={labelClasses}>Message</label>
                <textarea required rows={3} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className={`${inputClasses} resize-none`} placeholder="Tell us about your project..." />
              </div>
              <button type="submit" disabled={isSubmitting} className="animate-in w-full py-5 bg-royal-gold text-obsidian text-xs font-sans tracking-[0.2em] uppercase hover:bg-champagne transition-all duration-500 disabled:opacity-50">
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
              {submitStatus === "success" && <p className="text-royal-gold text-sm font-sans">Message sent. We will be in touch within 24 hours.</p>}
              {submitStatus === "error" && <p className="text-red-400 text-sm font-sans">Something went wrong. Please try again.</p>}
            </form>
          </div>

          {/* Right column — direct contact */}
          <div className="lg:col-span-4 lg:col-start-9 space-y-16">
            <div className="animate-in">
              <p className="text-[9px] font-sans text-royal-gold tracking-[0.25em] uppercase mb-4">Email</p>
              <a href="mailto:hello@nepovoxel.com" className="font-serif text-2xl text-ivory hover:text-royal-gold transition-colors duration-500">hello@nepovoxel.com</a>
            </div>
            <div className="animate-in">
              <p className="text-[9px] font-sans text-royal-gold tracking-[0.25em] uppercase mb-4">WhatsApp</p>
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="font-serif text-2xl text-ivory hover:text-royal-gold transition-colors duration-500">Message us</a>
            </div>
            <div className="animate-in pt-8 border-t border-ivory/5">
              <p className="font-sans text-xs text-ivory/20 leading-relaxed">
                We typically respond within 24 hours. For urgent inquiries, WhatsApp is the fastest channel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
