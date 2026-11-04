import React from 'react';

/**
 * CurvedOrnaments
 *
 * Fluid curved waves and ornaments in signature Turquoise (#00B5B8)
 * and Vibrant Golden Yellow (#FFC800) framing the card edges and corners.
 */
export const CurvedOrnaments: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Top Header Fluid Wave Ornaments */}
      <svg
        viewBox="0 0 450 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute -top-1 -left-1 -right-1 w-[calc(100%+8px)] h-auto"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="curveTurquoise" x1="0" y1="0" x2="450" y2="180" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00A3A6" />
            <stop offset="65%" stopColor="#00B8BA" />
            <stop offset="100%" stopColor="#028386" />
          </linearGradient>
          <linearGradient id="curveYellow" x1="0" y1="0" x2="350" y2="140" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFE033" />
            <stop offset="100%" stopColor="#FFB300" />
          </linearGradient>
          <linearGradient id="softCyanGlow" x1="225" y1="0" x2="225" y2="160" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00B5B8" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Ambient Top Glow */}
        <rect width="450" height="160" fill="url(#softCyanGlow)" />

        {/* Top-Right Yellow Accent Arc Ribbon */}
        <path
          d="M 280 0 
             C 330 35, 380 50, 450 35 
             L 450 0 Z"
          fill="url(#curveYellow)"
          opacity="0.9"
        />

        {/* Top-Left Turquoise Flowing Arc */}
        <path
          d="M 0 0 
             L 180 0 
             C 140 45, 90 65, 0 60 Z"
          fill="url(#curveTurquoise)"
          opacity="0.95"
        />

        {/* Top-Left Yellow Accent Ribbon Slicing under */}
        <path
          d="M 0 52 
             C 80 58, 125 40, 165 0 
             L 185 0 
             C 145 48, 95 72, 0 65 Z"
          fill="url(#curveYellow)"
          opacity="0.95"
        />

        {/* Dynamic Curved Ribbon crossing Top-Right */}
        <path
          d="M 260 0 
             C 300 45, 370 70, 450 65 
             L 450 48 
             C 385 52, 325 32, 290 0 Z"
          fill="url(#curveTurquoise)"
          opacity="0.85"
        />
      </svg>

      {/* Left Margin Accent Flourish */}
      <svg
        viewBox="0 0 60 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-1/4 -left-2 w-10 h-36 opacity-30"
      >
        <path
          d="M 0 0 C 35 40, 35 120, 0 180 L 0 0 Z"
          fill="#00B5B8"
        />
        <path
          d="M 0 20 C 25 60, 25 100, 0 140"
          stroke="#FFC800"
          strokeWidth="3"
        />
      </svg>

      {/* Right Margin Accent Flourish */}
      <svg
        viewBox="0 0 60 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-1/3 -right-2 w-10 h-36 opacity-30"
      >
        <path
          d="M 60 0 C 25 40, 25 120, 60 180 L 60 0 Z"
          fill="#00B5B8"
        />
        <path
          d="M 60 40 C 35 80, 35 120, 60 160"
          stroke="#FFC800"
          strokeWidth="3"
        />
      </svg>

      {/* Bottom Side Energy Arc */}
      <svg
        viewBox="0 0 450 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute -bottom-1 -left-1 -right-1 w-[calc(100%+8px)] h-auto"
        preserveAspectRatio="none"
      >
        <path
          d="M 0 120 C 120 70, 330 70, 450 120 Z"
          fill="#00B5B8"
          opacity="0.08"
        />
      </svg>
    </div>
  );
};
