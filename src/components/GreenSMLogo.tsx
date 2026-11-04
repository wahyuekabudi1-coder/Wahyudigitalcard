import React from 'react';

/**
 * GreenSMLogo
 *
 * Official Green SM Electric Taxi branding using the 100% transparent PNG asset
 * (/assets/aistudio/green_sm_logo_transparent.png).
 * Zero white box, zero borders, purely the iconic logo mark and GREEN SM typography.
 */
export const GreenSMLogo: React.FC<{ className?: string; size?: 'sm' | 'md' | 'lg' }> = ({
  className = '',
  size = 'md',
}) => {
  const heightClasses = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-11',
    lg: 'h-12 sm:h-14',
  }[size];

  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      {/* Official 100% Transparent PNG Logo (Bird Wing & GREEN SM Name) */}
      <img
        src="/assets/aistudio/green_sm_logo_transparent.png"
        alt="GREEN SM"
        className={`${heightClasses} w-auto object-contain block`}
      />

      {/* Subtitle: Electric Taxi */}
      <span className="mt-1 text-[11px] font-extrabold uppercase tracking-[0.24em] text-[#008E91] font-sans">
        Electric Taxi
      </span>
    </div>
  );
};
