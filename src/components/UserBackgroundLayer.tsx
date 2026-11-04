import React from 'react';
import { BackgroundSettings, PERMANENT_DEFAULT_BG_IMAGE } from './BackgroundSettingsModal';

interface UserBackgroundLayerProps {
  settings: BackgroundSettings;
}

/**
 * UserBackgroundLayer (Layer 2)
 *
 * Background image paten resmi Green SM / hasil upload kustom, dengan opacity yang bisa diatur secara independen.
 * Terletak di antara Layer 1 (Base White-Turquoise Gradient & Ornaments)
 * dan Layer 3 (Seluruh konten landing page).
 *
 * Menjamin parent section TIDAK diberi opacity sehingga konten tetap 100% jelas & terbaca.
 */
export const UserBackgroundLayer: React.FC<UserBackgroundLayerProps> = ({ settings }) => {
  const rawUrl = settings.imageUrl;
  const safeImageUrl =
    typeof rawUrl === 'string' &&
    rawUrl.trim() !== '' &&
    rawUrl !== 'null' &&
    rawUrl !== 'undefined' &&
    !rawUrl.startsWith('blob:')
      ? rawUrl
      : PERMANENT_DEFAULT_BG_IMAGE;

  // Ensure safe opacity so the watermark is never completely invisible (0) or NaN
  const safeOpacity =
    Math.max(10, Math.min(100, typeof settings.opacity === 'number' && !isNaN(settings.opacity) ? settings.opacity : 35)) / 100;

  const safePosition =
    typeof settings.position === 'string' && settings.position.trim() !== ''
      ? settings.position
      : 'center';

  // Calculate background-size style
  const backgroundSizeStyle =
    settings.size === 'custom' ? `${settings.scale}%` : settings.size || 'cover';

  return (
    <div
      className="absolute inset-0 pointer-events-none select-none overflow-hidden z-[2]"
      aria-hidden="true"
    >
      {/* Layer 2A: The User-Uploaded / Permanent Watermark Image */}
      <div
        className="w-full h-full transition-opacity duration-150 ease-out"
        style={{
          backgroundImage: `url("${safeImageUrl}")`,
          backgroundPosition: safePosition,
          backgroundSize: backgroundSizeStyle,
          backgroundRepeat: settings.repeat ? 'repeat' : 'no-repeat',
          opacity: safeOpacity,
        }}
      />

      {/* Layer 2B: Optional Color Overlay */}
      {settings.overlayColor !== 'none' && settings.overlayOpacity > 0 && (
        <div
          className="absolute inset-0 transition-opacity duration-150 ease-out"
          style={{
            backgroundColor: settings.overlayColor,
            opacity: settings.overlayOpacity / 100,
          }}
        />
      )}
    </div>
  );
};
