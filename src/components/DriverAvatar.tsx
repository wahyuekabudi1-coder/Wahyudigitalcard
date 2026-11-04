import React from 'react';

/**
 * DriverAvatar
 *
 * Foto driver berbentuk lingkaran dengan border kuning (#FFC800).
 * Background foto menggunakan watermark Green SM.
 * Menggambarkan Wahyu Eka B.T., driver profesional Green SM Electric Taxi.
 */
export const DriverAvatar: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Outer yellow border ring with soft glow and shadow */}
      <div className="relative p-[5px] rounded-full bg-gradient-to-tr from-[#FFB300] via-[#FFD000] to-[#FFE55C] shadow-xl shadow-teal-900/10 ring-4 ring-[#00B5B8]/20">
        {/* Inner Avatar Container */}
        <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden bg-gradient-to-b from-[#E6FAF8] via-[#D0F5F2] to-[#B6ECE7] flex items-center justify-center">
          
          {/* Diagonal Green SM Watermark Pattern in Avatar Background */}
          <div className="absolute inset-0 pointer-events-none opacity-20 select-none overflow-hidden">
            <svg viewBox="0 0 160 160" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="avatarGsmPattern"
                  width="50"
                  height="30"
                  patternUnits="userSpaceOnUse"
                  patternTransform="rotate(-30)"
                >
                  <text
                    x="2"
                    y="14"
                    fontSize="7"
                    fontWeight="800"
                    fill="#007F82"
                    letterSpacing="1"
                    fontFamily="sans-serif"
                  >
                    GREEN SM
                  </text>
                  <path
                    d="M 38 7 L 42 12 L 40 12 L 43 18 L 39 14 L 41 14 Z"
                    fill="#007F82"
                    opacity="0.7"
                  />
                </pattern>
              </defs>
              <rect width="160" height="160" fill="url(#avatarGsmPattern)" />
            </svg>
          </div>

          {/* Detailed Professional Driver Portrait Illustration (Wahyu Eka B.T.) */}
          <svg
            viewBox="0 0 160 160"
            className="w-full h-full relative z-10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Skin Tone Gradients */}
              <linearGradient id="skinBase" x1="80" y1="40" x2="80" y2="120" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#F5CBA7" />
                <stop offset="60%" stopColor="#E2A676" />
                <stop offset="100%" stopColor="#C98755" />
              </linearGradient>
              <linearGradient id="skinShadow" x1="80" y1="80" x2="80" y2="105" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#C98755" stopOpacity="0" />
                <stop offset="100%" stopColor="#A86638" stopOpacity="0.45" />
              </linearGradient>
              {/* Hair Gradient */}
              <linearGradient id="hairGrad" x1="80" y1="20" x2="80" y2="70" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#2D2424" />
                <stop offset="60%" stopColor="#1E1919" />
                <stop offset="100%" stopColor="#120E0E" />
              </linearGradient>
              {/* Uniform Shirt Gradient - Green SM Crisp Uniform */}
              <linearGradient id="shirtGrad" x1="80" y1="100" x2="80" y2="160" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#F0F9F9" />
              </linearGradient>
              <linearGradient id="collarTeal" x1="80" y1="95" x2="80" y2="125" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#00B5B8" />
                <stop offset="100%" stopColor="#007F82" />
              </linearGradient>
            </defs>

            {/* Shoulders & Uniform Shirt */}
            <g id="uniform">
              {/* Outer Shoulders */}
              <path
                d="M 16 160 
                   C 18 130, 42 112, 60 108 
                   L 100 108 
                   C 118 112, 142 130, 144 160 Z"
                fill="url(#shirtGrad)"
                stroke="#E2E8F0"
                strokeWidth="1.5"
              />

              {/* Turquoise Shoulder Epaulet / Accent Accents */}
              <path
                d="M 22 145 C 24 133, 40 120, 56 114 L 54 122 C 40 126, 28 137, 24 148 Z"
                fill="#00B5B8"
                opacity="0.85"
              />
              <path
                d="M 138 145 C 136 133, 120 120, 104 114 L 106 122 C 120 126, 132 137, 136 148 Z"
                fill="#00B5B8"
                opacity="0.85"
              />

              {/* Driver ID / Name Tag on Chest */}
              <rect x="95" y="132" width="28" height="11" rx="2" fill="#006A6D" />
              <rect x="97" y="134" width="24" height="2" fill="#FFC800" />
              <text x="109" y="141" fontSize="4.5" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">
                WAHYU
              </text>

              {/* Green SM Logo Pin on Left Chest */}
              <circle cx="50" cy="136" r="6" fill="#00B5B8" stroke="#FFC800" strokeWidth="1" />
              <path d="M 48 134 L 51 134 L 49 138 L 52 138" stroke="#FFFFFF" strokeWidth="0.8" fill="none" />

              {/* Inner Collar - Turquoise trim */}
              <path
                d="M 58 108 L 74 132 L 80 134 L 86 132 L 102 108 L 88 108 L 80 120 L 72 108 Z"
                fill="url(#collarTeal)"
              />

              {/* White Collar Lapels */}
              <path
                d="M 60 108 L 76 130 L 66 114 Z"
                fill="#FFFFFF"
              />
              <path
                d="M 100 108 L 84 130 L 94 114 Z"
                fill="#FFFFFF"
              />

              {/* Center Placket / Buttons */}
              <line x1="80" y1="134" x2="80" y2="160" stroke="#CBD5E1" strokeWidth="1" />
              <circle cx="80" cy="144" r="1.5" fill="#008F92" />
              <circle cx="80" cy="154" r="1.5" fill="#008F92" />
            </g>

            {/* Neck */}
            <path
              d="M 68 88 L 68 114 C 74 118, 86 118, 92 114 L 92 88 Z"
              fill="url(#skinBase)"
            />
            {/* Neck Shadow under Chin */}
            <path
              d="M 68 90 C 74 100, 86 100, 92 90 L 92 98 C 86 106, 74 106, 68 98 Z"
              fill="url(#skinShadow)"
            />

            {/* Head & Face */}
            <g id="face">
              {/* Ears */}
              <path
                d="M 52 64 C 50 56, 52 48, 56 46 L 57 74 C 53 73, 51 68, 52 64 Z"
                fill="url(#skinBase)"
              />
              <path
                d="M 108 64 C 110 56, 108 48, 104 46 L 103 74 C 107 73, 109 68, 108 64 Z"
                fill="url(#skinBase)"
              />

              {/* Face Contour - Oval, defined jawline */}
              <path
                d="M 56 50 
                   C 54 75, 60 96, 80 96 
                   C 100 96, 106 75, 104 50 
                   C 104 36, 56 36, 56 50 Z"
                fill="url(#skinBase)"
              />

              {/* Subtle Cheek blush / warmth */}
              <ellipse cx="66" cy="68" rx="6" ry="3" fill="#E07A5F" opacity="0.18" />
              <ellipse cx="94" cy="68" rx="6" ry="3" fill="#E07A5F" opacity="0.18" />

              {/* Eyebrows - Neat, masculine Indonesian look */}
              <path
                d="M 62 53 Q 71 50 76 54"
                stroke="#2B1D1D"
                strokeWidth="2.8"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 98 53 Q 89 50 84 54"
                stroke="#2B1D1D"
                strokeWidth="2.8"
                strokeLinecap="round"
                fill="none"
              />

              {/* Eyes - Warm, friendly, welcoming smile crinkle */}
              {/* Left Eye */}
              <ellipse cx="70" cy="59" rx="4.5" ry="3.2" fill="#FFFFFF" />
              <circle cx="70.5" cy="59" r="2.4" fill="#241B18" />
              <circle cx="71.5" cy="58" r="0.8" fill="#FFFFFF" />
              <path d="M 64 58 Q 70 55 76 58" stroke="#1F1616" strokeWidth="1.2" fill="none" />
              <path d="M 65 64 Q 70 66 75 64" stroke="#A86638" strokeWidth="0.8" fill="none" opacity="0.6" />

              {/* Right Eye */}
              <ellipse cx="90" cy="59" rx="4.5" ry="3.2" fill="#FFFFFF" />
              <circle cx="89.5" cy="59" r="2.4" fill="#241B18" />
              <circle cx="90.5" cy="58" r="0.8" fill="#FFFFFF" />
              <path d="M 84 58 Q 90 55 96 58" stroke="#1F1616" strokeWidth="1.2" fill="none" />
              <path d="M 85 64 Q 90 66 95 64" stroke="#A86638" strokeWidth="0.8" fill="none" opacity="0.6" />

              {/* Nose */}
              <path
                d="M 80 57 L 78 70 Q 80 73 82 70 Z"
                stroke="#B57445"
                strokeWidth="1.2"
                fill="none"
              />
              <path
                d="M 75 70 Q 80 74 85 70"
                stroke="#B57445"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />

              {/* Mouth & Warm Smile */}
              <path
                d="M 71 78 Q 80 88 89 78"
                stroke="#8A3D24"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
              {/* Smiling Teeth showing slightly */}
              <path
                d="M 74 79 Q 80 84 86 79 Z"
                fill="#FFFFFF"
                opacity="0.9"
              />
              <path
                d="M 74 82 Q 80 86 86 82"
                stroke="#B55938"
                strokeWidth="1.2"
                fill="none"
                opacity="0.5"
              />

              {/* Dimples / Smile lines */}
              <path d="M 68 76 Q 67 79 69 82" stroke="#B57445" strokeWidth="0.8" fill="none" opacity="0.5" />
              <path d="M 92 76 Q 93 79 91 82" stroke="#B57445" strokeWidth="0.8" fill="none" opacity="0.5" />
            </g>

            {/* Hair - Neat, professional side-part style */}
            <g id="hair">
              <path
                d="M 54 48 
                   C 52 32, 60 22, 80 20 
                   C 100 20, 108 30, 106 48 
                   C 104 38, 98 30, 84 30 
                   C 72 30, 60 36, 54 48 Z"
                fill="url(#hairGrad)"
              />
              {/* Hair volume and fringe styling */}
              <path
                d="M 54 46 
                   C 55 35, 68 28, 86 28 
                   C 102 28, 108 38, 104 46 
                   C 98 38, 86 36, 76 38 
                   C 66 40, 58 43, 54 46 Z"
                fill="#2E2323"
              />
              {/* Sideburns */}
              <path d="M 55 48 L 57 60 L 59 58 L 57 48 Z" fill="#1C1515" />
              <path d="M 105 48 L 103 60 L 101 58 L 103 48 Z" fill="#1C1515" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};
