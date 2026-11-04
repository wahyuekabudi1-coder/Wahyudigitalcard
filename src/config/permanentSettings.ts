/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * PERMANENT APPLICATION DEFAULT CONFIGURATION
 *
 * File konfigurasi utama dari source code yang menjadi patokan default permanen
 * untuk foto profil Wahyu Eka B.T. dan background resmi Green SM Electric Taxi.
 *
 * Semua file yang direferensikan tersimpan secara fisik di direktori /public/assets/:
 * - Foto profil: /public/assets/driver-profile.jpg
 * - Background:   /public/assets/driver-background.jpg
 *
 * Konfigurasi ini diekspor ke Git, di-bundle oleh Vite, dan di-deploy ke Vercel
 * sehingga pengunjung baru atau perangkat tanpa LocalStorage akan selalu mendapatkan
 * tampilan default resmi yang konsisten.
 */

export interface PermanentAvatarConfig {
  photoUrl: string;
  zoom: number; // 60 - 200 (default: 100%)
  positionX: number; // 0 - 100% (default: 50%)
  positionY: number; // 0 - 100% (default: 50%)
}

export interface PermanentBackgroundConfig {
  imageUrl: string;
  opacity: number; // 0 - 100 (default: 22%)
  position: string; // 'center' | 'top center' | 'bottom center'
  size: 'contain' | 'cover' | 'custom';
  scale: number; // 30 - 200%
  repeat: boolean;
  overlayColor: string; // 'none' | '#FFFFFF' | '#00B5B8' | '#044345' | '#FFC800'
  overlayOpacity: number; // 0 - 100
}

export interface PermanentAppConfig {
  version: string;
  avatar: PermanentAvatarConfig;
  background: PermanentBackgroundConfig;
  lastUpdated: string;
}

export const PERMANENT_DEFAULT_CONFIG: PermanentAppConfig = {
  version: '2.3.0',
  avatar: {
    photoUrl: '/assets/driver-profile.jpg?v=3',
    zoom: 100,
    positionX: 50,
    positionY: 38,
  },
  background: {
    imageUrl: '/assets/driver-background.png?v=1',
    opacity: 20,
    position: 'center 48%',
    size: 'custom',
    scale: 62,
    repeat: false,
    overlayColor: 'none',
    overlayOpacity: 0,
  },
  lastUpdated: new Date().toISOString(),
};
