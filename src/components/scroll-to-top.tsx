"use client";

import React, { useState, useEffect } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 w-12 h-12 border border-royal-gold/30 bg-obsidian/80 backdrop-blur-sm flex items-center justify-center transition-all duration-500 ease-luxury hover:border-royal-gold hover:bg-royal-gold/10 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      aria-label="Scroll to top"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="text-royal-gold"
      >
        <path
          d="M8 14V2M8 2L2 8M8 2L14 8"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
    </button>
  );
}
