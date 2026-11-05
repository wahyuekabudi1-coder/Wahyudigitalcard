import React from 'react';
import {
  PERMANENT_DEFAULT_CONFIG,
  PermanentBackgroundConfig,
} from '../config/permanentSettings';
import type { BackgroundSettings } from './BackgroundSettingsModal';

interface UserBackgroundLayerProps {
  settings?: PermanentBackgroundConfig | BackgroundSettings;
}

/**
 * UserBackgroundLayer (Layer 2)
 *
 * Background image paten resmi Green SM Surabaya yang dibaca langsung
 * dari aset statis /public/assets/driver-background.jpg melalui permanentSettings.ts.
 * Terletak di antara Layer 1 (Base White-Turquoise Gradient & Ornaments)
 * dan Layer 3 (Seluruh konten landing page).
 *
 * Menjamin parent section TIDAK diberi opacity sehingga konten tetap 100% jelas & terbaca.
 */
export const UserBackgroundLayer: React.FC<UserBackgroundLayerProps> = ({
  settings,
}) => {
  const activeSettings = settings || PERMANENT_DEFAULT_CONFIG.background;
  const rawUrl = activeSettings?.imageUrl;

  // Resolve to official permanent background and guard against legacy promo URLs
  const safeImageUrl =
    typeof rawUrl === 'string' &&
    rawUrl.trim() !== '' &&
    rawUrl !== 'null' &&
    rawUrl !== 'undefined' &&
    !rawUrl.startsWith('blob:') &&
    !rawUrl.includes('permanent-default-bg') &&
    !rawUrl.includes('IMG_20261104')
      ? rawUrl
      : PERMANENT_DEFAULT_CONFIG.background.imageUrl;

  // Ensure safe opacity so the watermark is never completely invisible (0) or NaN
  const safeOpacity =
    Math.max(
      10,
      Math.min(
        100,
        typeof activeSettings?.opacity === 'number' && !isNaN(activeSettings.opacity)
          ? activeSettings.opacity
          : PERMANENT_DEFAULT_CONFIG.background.opacity
      )
    ) / 100;

  const safePosition =
    typeof activeSettings?.position === 'string' && activeSettings.position.trim() !== ''
      ? activeSettings.position
      : PERMANENT_DEFAULT_CONFIG.background.position;

  // Calculate background-size style
  const backgroundSizeStyle =
    activeSettings?.size === 'custom'
      ? `${activeSettings.scale || PERMANENT_DEFAULT_CONFIG.background.scale}%`
      : activeSettings?.size || PERMANENT_DEFAULT_CONFIG.background.size;

  return (
    <div
      className="absolute inset-0 pointer-events-none select-none overflow-hidden z-[2]"
      aria-hidden="true"
    >
      {/* Layer 2A: The Permanent Watermark Image */}
      <div
        className="w-full h-full transition-opacity duration-150 ease-out"
        style={{
          backgroundImage: `url("${safeImageUrl}")`,
          backgroundPosition: safePosition,
          backgroundSize: backgroundSizeStyle,
          backgroundRepeat: activeSettings?.repeat ? 'repeat' : 'no-repeat',
          opacity: safeOpacity,
        }}
      />

      {/* Layer 2B: Optional Color Overlay */}
      {activeSettings?.overlayColor && activeSettings.overlayColor !== 'none' && (activeSettings.overlayOpacity || 0) > 0 && (
        <div
          className="absolute inset-0 transition-opacity duration-150 ease-out"
          style={{
            backgroundColor: activeSettings.overlayColor,
            opacity: (activeSettings.overlayOpacity || 0) / 100,
          }}
        />
      )}
    </div>
  );
};
