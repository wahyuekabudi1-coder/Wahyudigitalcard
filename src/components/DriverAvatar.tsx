import React from 'react';
import { Camera } from 'lucide-react';
import { PERMANENT_DEFAULT_CONFIG } from '../config/permanentSettings';

export interface AvatarSettings {
  photoUrl: string | null;
  zoom: number; // 50 - 200 (default 100%)
  positionY: number; // 0 - 100% (default 50% / center)
  positionX: number; // 0 - 100% (default 50% / center)
}

export const PERMANENT_DEFAULT_AVATAR_PHOTO = PERMANENT_DEFAULT_CONFIG.avatar.photoUrl;

export const DEFAULT_AVATAR_SETTINGS: AvatarSettings = {
  photoUrl: PERMANENT_DEFAULT_CONFIG.avatar.photoUrl,
  zoom: PERMANENT_DEFAULT_CONFIG.avatar.zoom,
  positionY: PERMANENT_DEFAULT_CONFIG.avatar.positionY,
  positionX: PERMANENT_DEFAULT_CONFIG.avatar.positionX,
};

interface DriverAvatarProps {
  className?: string;
  avatarSettings?: AvatarSettings;
  onEditClick?: () => void;
}

/**
 * DriverAvatar
 *
 * Foto profil driver asli berbentuk lingkaran dengan border kuning (#FFC800).
 * Default menggunakan foto aset permanen di /assets/driver-wahyu-default.jpg.
 * Menghilangkan sepenuhnya ilustrasi kartun sesuai spesifikasi.
 */
export const DriverAvatar: React.FC<DriverAvatarProps> = ({
  className = '',
  avatarSettings = DEFAULT_AVATAR_SETTINGS,
  onEditClick,
}) => {
  // Validate photo URL to prevent blank display or broken blob loops
  const safePhotoSrc = React.useMemo(() => {
    const url = avatarSettings?.photoUrl;
    if (!url || typeof url !== 'string' || url === 'null' || url === 'undefined' || url.trim() === '') {
      return PERMANENT_DEFAULT_AVATAR_PHOTO;
    }
    if (url.startsWith('blob:')) {
      return PERMANENT_DEFAULT_AVATAR_PHOTO;
    }
    return url;
  }, [avatarSettings?.photoUrl]);

  const safeZoom = typeof avatarSettings?.zoom === 'number' && !isNaN(avatarSettings.zoom)
    ? avatarSettings.zoom
    : PERMANENT_DEFAULT_CONFIG.avatar.zoom;
  const safePositionX = typeof avatarSettings?.positionX === 'number' && !isNaN(avatarSettings.positionX)
    ? avatarSettings.positionX
    : PERMANENT_DEFAULT_CONFIG.avatar.positionX;
  const safePositionY = typeof avatarSettings?.positionY === 'number' && !isNaN(avatarSettings.positionY)
    ? avatarSettings.positionY
    : PERMANENT_DEFAULT_CONFIG.avatar.positionY;

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Outer yellow border ring with soft glow and shadow */}
      <div className="relative p-[6px] rounded-full bg-gradient-to-tr from-[#FFB300] via-[#FFD000] to-[#FFE55C] shadow-2xl shadow-teal-900/15 ring-4 ring-[#00B5B8]/25 group">
        
        {/* Inner Avatar Container (Enlarged) */}
        <div className="relative w-48 h-48 sm:w-52 sm:h-52 rounded-full overflow-hidden bg-gradient-to-b from-[#E6FAF8] via-[#D0F5F2] to-[#B6ECE7] flex items-center justify-center">
          
          {/* Diagonal Green SM Watermark Pattern in Avatar Background */}
          <div className="absolute inset-0 pointer-events-none opacity-20 select-none overflow-hidden z-0">
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
              <rect width="100%" height="100%" fill="url(#avatarGsmPattern)" />
            </svg>
          </div>

          {/* Real Driver Photo (Always displays photo image, no cartoon fallback) */}
          <img
            src={safePhotoSrc}
            alt="Foto Profil Driver Wahyu Eka B.T."
            className="w-full h-full object-cover relative z-10 transition-transform duration-200"
            style={{
              transform: `scale(${safeZoom / 100})`,
              objectPosition: `${safePositionX}% ${safePositionY}%`,
            }}
            onError={(e) => {
              // Fallback to permanent default if custom path fails, with onerror = null to avoid infinite loop
              const target = e.currentTarget as HTMLImageElement;
              target.onerror = null;
              target.src = PERMANENT_DEFAULT_AVATAR_PHOTO;
            }}
          />

        </div>

        {/* Camera Upload Badge Button (Only rendered when onEditClick is provided) */}
        {onEditClick && (
          <button
            type="button"
            onClick={onEditClick}
            className="absolute -bottom-1 -right-1 p-2 rounded-full bg-[#008E91] hover:bg-[#007073] text-white shadow-lg border-2 border-white transition-all transform hover:scale-110 active:scale-95 cursor-pointer z-20 group"
            title="Ganti atau upload foto profil"
            aria-label="Upload atau ganti foto profil"
          >
            <Camera className="w-4 h-4 text-[#FFD000] group-hover:rotate-12 transition-transform" />
          </button>
        )}

      </div>
    </div>
  );
};
