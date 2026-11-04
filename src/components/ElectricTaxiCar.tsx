import React from 'react';

/**
 * ElectricTaxiCar
 *
 * Ilustrasi mobil listrik Green SM di bagian bawah dipadu
 * dengan siluet skyline Surabaya (Tugu Pahlawan, Suramadu, gedung kota).
 */
export const ElectricTaxiCar: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full overflow-hidden select-none ${className}`}>
      <svg
        viewBox="0 0 450 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-sm"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="skylineGrad" x1="225" y1="0" x2="225" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00A3A6" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#006568" stopOpacity="0.05" />
          </linearGradient>

          <linearGradient id="carBodyTurquoise" x1="60" y1="70" x2="380" y2="140" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00D2D5" />
            <stop offset="40%" stopColor="#00B5B8" />
            <stop offset="85%" stopColor="#008E91" />
            <stop offset="100%" stopColor="#007073" />
          </linearGradient>

          <linearGradient id="carHighlight" x1="220" y1="75" x2="220" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="windowGlass" x1="200" y1="75" x2="200" y2="105" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1C2E33" />
            <stop offset="100%" stopColor="#0A1518" />
          </linearGradient>

          <linearGradient id="roadGrad" x1="0" y1="150" x2="450" y2="150" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00B5B8" stopOpacity="0" />
            <stop offset="25%" stopColor="#00B5B8" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#00B5B8" stopOpacity="0.8" />
            <stop offset="75%" stopColor="#00B5B8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00B5B8" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="yellowAccent" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFE033" />
            <stop offset="100%" stopColor="#FFB300" />
          </linearGradient>
        </defs>

        {/* ============================================================== */}
        {/* SURABAYA SKYLINE SILHOUETTE (BACKGROUND) */}
        {/* ============================================================== */}
        <g id="surabayaSkyline" fill="url(#skylineGrad)">
          {/* Suramadu Bridge Pylons & Cables on Left */}
          <path d="M 20 135 L 20 60 L 25 60 L 25 135 Z" fill="#008E91" opacity="0.35" />
          <path d="M 45 135 L 45 45 L 50 45 L 50 135 Z" fill="#008E91" opacity="0.4" />
          {/* Bridge Cables */}
          <line x1="47" y1="48" x2="5" y2="135" stroke="#00A3A6" strokeWidth="0.8" opacity="0.3" />
          <line x1="47" y1="60" x2="20" y2="135" stroke="#00A3A6" strokeWidth="0.8" opacity="0.3" />
          <line x1="47" y1="72" x2="35" y2="135" stroke="#00A3A6" strokeWidth="0.8" opacity="0.3" />
          <line x1="47" y1="50" x2="80" y2="135" stroke="#00A3A6" strokeWidth="0.8" opacity="0.3" />
          <line x1="47" y1="65" x2="70" y2="135" stroke="#00A3A6" strokeWidth="0.8" opacity="0.3" />

          {/* Surabaya City Skyscraper Blocks */}
          <rect x="75" y="80" width="18" height="55" rx="1" fill="#008E91" opacity="0.25" />
          <rect x="96" y="65" width="22" height="70" rx="1" fill="#008E91" opacity="0.3" />
          <rect x="122" y="75" width="16" height="60" rx="1" fill="#008E91" opacity="0.25" />
          <rect x="142" y="85" width="20" height="50" rx="1" fill="#008E91" opacity="0.2" />

          {/* TUGU PAHLAWAN in Center Skyline */}
          <g transform="translate(225, 135)">
            <path d="M -4 -85 L -2 -115 L 2 -115 L 4 -85 Z" fill="#007F82" opacity="0.6" />
            <line x1="0" y1="-122" x2="0" y2="-115" stroke="#007F82" strokeWidth="1.5" opacity="0.7" />
            <path d="M -10 0 L -5 -85 L 5 -85 L 10 0 Z" fill="#008E91" opacity="0.45" />
            <rect x="-18" y="-12" width="36" height="12" rx="1" fill="#007F82" opacity="0.5" />
          </g>

          {/* Right Skyline Buildings */}
          <rect x="290" y="70" width="24" height="65" rx="1" fill="#008E91" opacity="0.25" />
          <rect x="318" y="55" width="20" height="80" rx="1" fill="#008E91" opacity="0.32" />
          <line x1="328" y1="42" x2="328" y2="55" stroke="#007F82" strokeWidth="1.5" opacity="0.5" />
          <rect x="342" y="80" width="26" height="55" rx="1" fill="#008E91" opacity="0.22" />
          <rect x="372" y="68" width="18" height="67" rx="1" fill="#008E91" opacity="0.28" />
          <rect x="394" y="90" width="28" height="45" rx="1" fill="#008E91" opacity="0.2" />

          {/* Small glowing windows on buildings */}
          <g fill="#FFE55C" opacity="0.4">
            <rect x="100" y="72" width="2.5" height="2.5" />
            <rect x="106" y="72" width="2.5" height="2.5" />
            <rect x="100" y="82" width="2.5" height="2.5" />
            <rect x="106" y="82" width="2.5" height="2.5" />
            <rect x="323" y="65" width="2.5" height="2.5" />
            <rect x="330" y="65" width="2.5" height="2.5" />
            <rect x="323" y="75" width="2.5" height="2.5" />
            <rect x="330" y="75" width="2.5" height="2.5" />
          </g>
        </g>

        {/* Ambient Ground Glow */}
        <ellipse cx="225" cy="150" rx="180" ry="14" fill="#00B5B8" opacity="0.15" />

        {/* ============================================================== */}
        {/* GREEN SM ELECTRIC TAXI (CAR PROFILE) */}
        {/* ============================================================== */}
        <g id="electricCar" transform="translate(45, 0)">
          {/* Car Shadow */}
          <ellipse cx="180" cy="151" rx="145" ry="9" fill="#06282B" opacity="0.35" />

          {/* Taxi Roof Sign - GREEN SM ELECTRIC TAXI */}
          <g id="taxiRoofSign" transform="translate(162, 58)">
            {/* Base mount */}
            <rect x="6" y="14" width="24" height="4" rx="1" fill="#1A2D30" />
            {/* White glowing lightbox */}
            <path
              d="M 2 4 C 2 2, 5 0, 8 0 L 28 0 C 31 0, 34 2, 34 4 L 36 14 L 0 14 Z"
              fill="#FFFFFF"
              stroke="#FFC800"
              strokeWidth="1.2"
              filter="drop-shadow(0 2px 4px rgba(0,181,184,0.3))"
            />
            {/* Top light text */}
            <text x="18" y="7" fontSize="3.8" fontWeight="900" fill="#008E91" textAnchor="middle" letterSpacing="0.4">
              GREEN SM
            </text>
            <text x="18" y="12" fontSize="3.2" fontWeight="800" fill="#E69500" textAnchor="middle" letterSpacing="0.5">
              TAXI
            </text>
            {/* Small yellow illumination LED indicator */}
            <circle cx="5" cy="5" r="1" fill="#FFC800" />
            <circle cx="31" cy="5" r="1" fill="#FFC800" />
          </g>

          {/* Aerodynamic Car Body Structure */}
          <path
            d="M 52 135 
               L 62 135 
               C 66 122, 78 114, 94 114 
               C 110 114, 122 122, 126 135 
               L 234 135 
               C 238 122, 250 114, 266 114 
               C 282 114, 294 122, 298 135 
               L 315 135 
               C 322 135, 326 130, 326 122 
               L 324 108 
               C 322 102, 316 98, 305 96 
               L 278 94 
               L 242 74 
               C 236 71, 228 70, 218 70 
               L 138 70 
               C 126 70, 114 74, 102 82 
               L 72 96 
               C 58 100, 48 106, 46 116 
               C 45 124, 46 135, 52 135 Z"
            fill="url(#carBodyTurquoise)"
            stroke="#006C6F"
            strokeWidth="1.2"
          />

          {/* Glossy Upper Light Reflection on Roof & Hood */}
          <path
            d="M 140 72 L 220 72 C 228 72, 235 73, 240 76 L 274 95 L 298 97 L 272 94 L 238 74 C 232 72, 224 71, 216 71 L 138 71 C 128 71, 118 74, 108 81 L 82 95 L 70 96 L 98 81 C 110 74, 124 72, 140 72 Z"
            fill="url(#carHighlight)"
          />

          {/* Car Windows (Smoked Tinted Electric Glass) */}
          {/* Front Windshield */}
          <path
            d="M 106 82 L 136 73 L 136 94 L 78 96 Z"
            fill="url(#windowGlass)"
            stroke="#006568"
            strokeWidth="1"
          />
          {/* Front Door Window */}
          <path
            d="M 140 73 L 186 73 L 186 94 L 140 94 Z"
            fill="url(#windowGlass)"
            stroke="#006568"
            strokeWidth="1"
          />
          {/* Rear Door Window */}
          <path
            d="M 190 73 L 232 73 L 238 94 L 190 94 Z"
            fill="url(#windowGlass)"
            stroke="#006568"
            strokeWidth="1"
          />
          {/* Rear Quarter Glass */}
          <path
            d="M 236 74 L 268 93 L 242 94 Z"
            fill="url(#windowGlass)"
            stroke="#006568"
            strokeWidth="1"
          />

          {/* Window Chrome / Turquoise Pill Pillars */}
          <line x1="138" y1="72" x2="138" y2="94" stroke="#004D50" strokeWidth="2.5" />
          <line x1="188" y1="72" x2="188" y2="94" stroke="#004D50" strokeWidth="2.5" />
          <line x1="234" y1="72" x2="234" y2="94" stroke="#004D50" strokeWidth="2" />

          {/* Side Mirror */}
          <path
            d="M 130 92 C 125 92, 122 95, 124 98 C 126 100, 134 100, 136 97 L 136 93 Z"
            fill="#007F82"
            stroke="#005B5E"
            strokeWidth="0.8"
          />
          {/* Side Mirror Turn Signal - Yellow */}
          <path d="M 124 95 L 128 95" stroke="#FFC800" strokeWidth="1.2" strokeLinecap="round" />

          {/* Door Cutlines */}
          <path d="M 138 94 L 138 135" stroke="#005D60" strokeWidth="1" />
          <path d="M 188 94 L 188 135" stroke="#005D60" strokeWidth="1" />
          {/* Door Handles (Flush aerodynamic electric handles) */}
          <rect x="146" y="102" width="14" height="2.5" rx="1.2" fill="#005D60" />
          <rect x="196" y="102" width="14" height="2.5" rx="1.2" fill="#005D60" />

          {/* Sleek Golden Yellow Body Accent Stripe */}
          <path
            d="M 68 114 C 110 112, 220 110, 310 114"
            stroke="url(#yellowAccent)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* GREEN SM Livery Decal on Front/Middle Door */}
          <g transform="translate(142, 108)">
            <rect x="0" y="0" width="72" height="15" rx="2" fill="#008083" opacity="0.3" />
            <text x="4" y="9" fontSize="6.5" fontWeight="900" fill="#FFFFFF" letterSpacing="0.6">
              GREEN
            </text>
            <text x="35" y="9" fontSize="6.5" fontWeight="900" fill="#FFE033" letterSpacing="0.6">
              SM
            </text>
            <text x="4" y="13" fontSize="3.2" fontWeight="700" fill="#E6FAF8" letterSpacing="1">
              ELECTRIC TAXI
            </text>
            {/* Small EV Leaf Icon */}
            <path
              d="M 58 5 C 64 5, 68 8, 68 12 C 64 12, 60 9, 58 5 Z"
              fill="#FFE033"
            />
          </g>

          {/* Modern LED Headlight (Cyan Glow) */}
          <path
            d="M 46 112 C 54 110, 64 108, 70 108 L 68 114 L 48 117 Z"
            fill="#E6FFFF"
            stroke="#00B5B8"
            strokeWidth="1"
          />
          {/* Daytime Running Light Bar */}
          <path d="M 47 113 L 68 109" stroke="#5CFBFF" strokeWidth="1.5" strokeLinecap="round" />

          {/* Taillight (LED Red / Neon) */}
          <path
            d="M 322 102 C 325 106, 326 112, 322 116 L 316 116 L 316 102 Z"
            fill="#FF2E4D"
            stroke="#990018"
            strokeWidth="0.8"
          />
          <line x1="318" y1="104" x2="318" y2="114" stroke="#FFA3B0" strokeWidth="1.2" strokeLinecap="round" />

          {/* Front Bumper & Lower Grille / Air Dam */}
          <path
            d="M 46 122 L 56 135 L 64 135"
            stroke="#005B5E"
            strokeWidth="1.5"
          />
          {/* Rear Lower Diffuser */}
          <rect x="306" y="131" width="16" height="4" rx="1" fill="#004D50" />

          {/* ============================================================== */}
          {/* WHEELS & RIMS (MODERN EV ALLOY WITH TURQUOISE ACCENTS) */}
          {/* ============================================================== */}
          {/* Front Wheel */}
          <g id="frontWheel" transform="translate(94, 134)">
            {/* Tire outer rubber */}
            <circle cx="0" cy="0" r="18" fill="#1A2426" stroke="#0D1415" strokeWidth="1" />
            <circle cx="0" cy="0" r="14.5" fill="#243336" />
            {/* Brake Rotor & Caliper */}
            <circle cx="0" cy="0" r="10" fill="#64748B" opacity="0.6" />
            <path d="M -5 -8 A 10 10 0 0 1 5 -8 L 4 -4 A 6 6 0 0 0 -4 -4 Z" fill="#00B5B8" />
            {/* Alloy Rim - Two Tone Diamond Cut */}
            <circle cx="0" cy="0" r="12" fill="#0E1A1C" stroke="#00B5B8" strokeWidth="1.2" />
            {/* 5-Spoke Modern EV Blades */}
            <path d="M 0 -11 L 2 -3 L -2 -3 Z" fill="#E2E8F0" />
            <path d="M 10 -4 L 3 -1 L 2 -4 Z" fill="#E2E8F0" />
            <path d="M 7 9 L 2 2 L 4 0 Z" fill="#E2E8F0" />
            <path d="M -7 9 L -2 2 L -4 0 Z" fill="#E2E8F0" />
            <path d="M -10 -4 L -3 -1 L -2 -4 Z" fill="#E2E8F0" />
            {/* Turquoise spoke accents */}
            <circle cx="0" cy="0" r="4" fill="#00B5B8" />
            <circle cx="0" cy="0" r="2" fill="#FFC800" />
          </g>

          {/* Rear Wheel */}
          <g id="rearWheel" transform="translate(266, 134)">
            {/* Tire outer rubber */}
            <circle cx="0" cy="0" r="18" fill="#1A2426" stroke="#0D1415" strokeWidth="1" />
            <circle cx="0" cy="0" r="14.5" fill="#243336" />
            {/* Brake Rotor */}
            <circle cx="0" cy="0" r="10" fill="#64748B" opacity="0.6" />
            {/* Alloy Rim */}
            <circle cx="0" cy="0" r="12" fill="#0E1A1C" stroke="#00B5B8" strokeWidth="1.2" />
            {/* 5-Spoke Blades */}
            <path d="M 0 -11 L 2 -3 L -2 -3 Z" fill="#E2E8F0" />
            <path d="M 10 -4 L 3 -1 L 2 -4 Z" fill="#E2E8F0" />
            <path d="M 7 9 L 2 2 L 4 0 Z" fill="#E2E8F0" />
            <path d="M -7 9 L -2 2 L -4 0 Z" fill="#E2E8F0" />
            <path d="M -10 -4 L -3 -1 L -2 -4 Z" fill="#E2E8F0" />
            {/* Center Cap */}
            <circle cx="0" cy="0" r="4" fill="#00B5B8" />
            <circle cx="0" cy="0" r="2" fill="#FFC800" />
          </g>
        </g>

        {/* Road Surface & Electric Turquoise Glow Line */}
        <line x1="20" y1="152" x2="430" y2="152" stroke="url(#roadGrad)" strokeWidth="3" strokeLinecap="round" />
        <line x1="80" y1="156" x2="370" y2="156" stroke="#FFC800" strokeWidth="1" strokeDasharray="12 8" opacity="0.6" />
      </svg>
    </div>
  );
};
