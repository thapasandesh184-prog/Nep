"use client";

import React from "react";

interface GoldButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function GoldButton({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
}: GoldButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center px-8 py-3 text-sm font-sans font-medium tracking-luxury uppercase transition-all duration-500 ease-luxury cursor-pointer rounded-sharp";

  const variantClasses =
    variant === "primary"
      ? "bg-royal-gold text-obsidian hover:bg-champagne hover:shadow-[0_0_30px_rgba(201,169,110,0.3)]"
      : "bg-transparent text-royal-gold border border-royal-gold hover:bg-royal-gold/10 hover:border-champagne hover:text-champagne";

  const combinedClasses = `${baseClasses} ${variantClasses} ${className}`;

  if (href) {
    return (
      <a href={href} className={combinedClasses}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={combinedClasses}>
      {children}
    </button>
  );
}
