"use client";

import React from "react";

interface GoldButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

export default function GoldButton({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
  type = "button",
  disabled = false,
}: GoldButtonProps) {
  const baseClasses =
    "relative inline-flex items-center justify-center px-8 py-3 text-sm font-sans font-medium tracking-luxury uppercase transition-all duration-500 ease-luxury overflow-hidden rounded-sharp";

  const variantClasses =
    variant === "primary"
      ? "bg-royal-gold text-obsidian hover:shadow-[0_0_30px_rgba(201,169,110,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
      : "bg-transparent text-royal-gold border border-royal-gold hover:bg-royal-gold/10 hover:border-champagne hover:text-champagne disabled:opacity-50 disabled:cursor-not-allowed";

  const combinedClasses = `${baseClasses} ${variantClasses} ${className}`;

  const content = (
    <>
      {/* Hover sweep effect */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-champagne/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700 ease-luxury" />
      <span className="relative z-10">{children}</span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={combinedClasses}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
    >
      {content}
    </button>
  );
}
