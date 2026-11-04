import React from 'react';

/**
 * GreenSMLogo
 *
 * Official Green SM Electric Taxi branding.
 * Primary: Turquoise/Cyan (#00B5B8)
 * Accent: Electric Yellow (#FFC800) & Deep Teal (#044345)
 */
export const GreenSMLogo: React.FC<{ className?: string; size?: 'sm' | 'md' | 'lg' }> = ({
  className = '',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'scale-90',
    md: 'scale-100',
    lg: 'scale-110',
  }[size];

  return (
    <div className={`flex flex-col items-center justify-center select-none ${sizeClasses} ${className}`}>
      {/* Brand Icon & Typography combo */}
      <div className="flex items-center gap-2.5">
        {/* Modern Green SM Wing & Lightning EV Emblem */}
        <div className="relative w-9 h-9 flex items-center justify-center drop-shadow-sm">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
              <linearGradient id="gsmWingGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#00C4C8" />
                <stop offset="100%" stopColor="#008F92" />
              </linearGradient>
              <linearGradient id="gsmYellowGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFE033" />
                <stop offset="100%" stopColor="#FFB300" />
              </linearGradient>
            </defs>

            {/* Circular energy aura */}
            <circle cx="24" cy="24" r="22" fill="#E6FAF8" stroke="#00B5B8" strokeWidth="2" strokeOpacity="0.3" />

            {/* Aerodynamic Speed Wing - Turquoise */}
            <path
              d="M 8 28 C 12 18, 22 10, 36 10 C 28 14, 20 20, 16 32 C 13 32, 10 31, 8 28 Z"
              fill="url(#gsmWingGrad)"
            />

            {/* Secondary Swoop */}
            <path
              d="M 14 34 C 18 26, 26 20, 38 18 C 30 22, 24 28, 21 38 C 18 38, 15 37, 14 34 Z"
              fill="#00B5B8"
              fillOpacity="0.8"
            />

            {/* Electric Lightning Bolt - Yellow Accent */}
            <path
              d="M 27 12 L 20 24 L 26 24 L 21 36 L 33 22 L 27 22 L 31 12 Z"
              fill="url(#gsmYellowGrad)"
              filter="drop-shadow(0px 1px 2px rgba(0,0,0,0.15))"
            />
          </svg>
        </div>

        {/* Brand Text */}
        <div className="flex flex-col items-start leading-none">
          <div className="flex items-baseline tracking-tight">
            <span className="font-black text-[22px] text-[#008E91] tracking-wider uppercase font-sans">
              GREEN
            </span>
            <span className="font-black text-[22px] text-[#FFB300] ml-1 tracking-wider uppercase font-sans drop-shadow-xs">
              SM
            </span>
          </div>
        </div>
      </div>

      {/* Subtitle: Electric Taxi */}
      <div className="mt-1 flex items-center gap-1.5">
        <span className="h-[1px] w-4 bg-gradient-to-r from-transparent to-[#00B5B8]"></span>
        <span className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-[#008E91] font-sans">
          Electric Taxi
        </span>
        <span className="h-[1px] w-4 bg-gradient-to-l from-transparent to-[#00B5B8]"></span>
      </div>
    </div>
  );
};
