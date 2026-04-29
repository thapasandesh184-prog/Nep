"use client";

import React from "react";

export default function MobileFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {/* Diamond grid pattern background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(45deg, #C9A96E 1px, transparent 1px),
            linear-gradient(-45deg, #C9A96E 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Animated SVG voxel icon */}
      <div className="relative">
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-[spin_20s_linear_infinite]"
        >
          {/* Central cube */}
          <rect
            x="85"
            y="85"
            width="30"
            height="30"
            fill="#C9A96E"
            fillOpacity="0.3"
            stroke="#C9A96E"
            strokeWidth="0.5"
          />
          {/* Surrounding cubes */}
          <rect
            x="60"
            y="60"
            width="20"
            height="20"
            fill="#C9A96E"
            fillOpacity="0.15"
            stroke="#C9A96E"
            strokeWidth="0.5"
          />
          <rect
            x="120"
            y="60"
            width="20"
            height="20"
            fill="#C9A96E"
            fillOpacity="0.15"
            stroke="#C9A96E"
            strokeWidth="0.5"
          />
          <rect
            x="60"
            y="120"
            width="20"
            height="20"
            fill="#C9A96E"
            fillOpacity="0.15"
            stroke="#C9A96E"
            strokeWidth="0.5"
          />
          <rect
            x="120"
            y="120"
            width="20"
            height="20"
            fill="#C9A96E"
            fillOpacity="0.15"
            stroke="#C9A96E"
            strokeWidth="0.5"
          />
          {/* Corner cubes */}
          <rect
            x="40"
            y="90"
            width="15"
            height="15"
            fill="#E8D5A3"
            fillOpacity="0.1"
            stroke="#E8D5A3"
            strokeWidth="0.5"
          />
          <rect
            x="145"
            y="90"
            width="15"
            height="15"
            fill="#E8D5A3"
            fillOpacity="0.1"
            stroke="#E8D5A3"
            strokeWidth="0.5"
          />
          <rect
            x="90"
            y="40"
            width="15"
            height="15"
            fill="#E8D5A3"
            fillOpacity="0.1"
            stroke="#E8D5A3"
            strokeWidth="0.5"
          />
          <rect
            x="90"
            y="145"
            width="15"
            height="15"
            fill="#E8D5A3"
            fillOpacity="0.1"
            stroke="#E8D5A3"
            strokeWidth="0.5"
          />
        </svg>

        {/* Glow effect */}
        <div className="absolute inset-0 bg-royal-gold/5 blur-3xl -z-10" />
      </div>
    </div>
  );
}
