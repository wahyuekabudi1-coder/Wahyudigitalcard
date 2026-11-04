/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Globe,
  UserPlus,
  CheckCircle2,
  ExternalLink,
  QrCode,
  Image as ImageIcon,
  Sliders,
} from 'lucide-react';
import { GreenSMLogo } from './components/GreenSMLogo';
import { CurvedOrnaments } from './components/CurvedOrnaments';
import { DriverAvatar } from './components/DriverAvatar';
import { ElectricTaxiCar } from './components/ElectricTaxiCar';
import { ServicePills } from './components/ServicePills';
import { QrModal } from './components/QrModal';
import {
  BackgroundSettingsModal,
  BackgroundSettings,
  DEFAULT_BG_SETTINGS,
} from './components/BackgroundSettingsModal';
import { UserBackgroundLayer } from './components/UserBackgroundLayer';
import { downloadDriverVCard } from './utils/vcard';

const STORAGE_KEY = 'green_sm_bg_settings_v2';

export default function App() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [isBgSettingsOpen, setIsBgSettingsOpen] = useState(false);

  // Background Settings State (Layer 2)
  const [bgSettings, setBgSettings] = useState<BackgroundSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_BG_SETTINGS, ...JSON.parse(saved) };
      }
    } catch {
      // Fallback if localStorage is inaccessible or corrupted
    }
    return DEFAULT_BG_SETTINGS;
  });

  const handleUpdateBgSettings = (newSettings: BackgroundSettings) => {
    setBgSettings(newSettings);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
    } catch {
      // Ignore if localStorage quota exceeded
    }
  };

  const handleResetBgSettings = () => {
    setBgSettings(DEFAULT_BG_SETTINGS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      //
    }
    setToastMessage('Background berhasil direset ke polos.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveContact = () => {
    try {
      downloadDriverVCard();
      setToastMessage('Kontak Wahyu Eka B.T. (.vcf) berhasil diunduh!');
      setTimeout(() => {
        setToastMessage(null);
      }, 3500);
    } catch {
      setToastMessage('Gagal mengunduh kontak. Silakan hubungi langsung.');
      setTimeout(() => {
        setToastMessage(null);
      }, 3000);
    }
  };

  return (
    <main className="min-h-screen w-full bg-slate-200/80 flex flex-col items-center justify-start sm:py-6 sm:px-4">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 z-50 flex items-center gap-2 px-4 py-2.5 bg-[#005D60] text-white text-xs sm:text-sm font-semibold rounded-full shadow-xl border border-teal-400/30 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-4 h-4 text-[#FFD000]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating Toolbar: Atur Background & QR Code / NFC */}
      <aside aria-label="Pengaturan dan Aksi Cepat" className="fixed top-3 right-3 sm:top-5 sm:right-5 z-40 flex items-center gap-2">
        {/* Tombol Pengaturan Background Section */}
        <button
          onClick={() => setIsBgSettingsOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#007F82] border border-teal-200/90 shadow-md hover:bg-teal-50 hover:border-teal-400 transition-all text-xs font-bold active:scale-95 cursor-pointer"
          title="Atur & Upload Gambar Background Section (Watermark)"
          aria-label="Buka Pengaturan Background"
        >
          <Sliders className="w-3.5 h-3.5 text-[#00A3A6]" />
          <span className="hidden xs:inline">Atur Background</span>
          {bgSettings.imageUrl && (
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Background kustom aktif"></span>
          )}
        </button>

        {/* Tombol QR Code / NFC */}
        <button
          onClick={() => setIsQrOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#007F82] border border-teal-200/90 shadow-md hover:bg-teal-50 hover:border-teal-400 transition-all text-xs font-bold active:scale-95 cursor-pointer"
          title="Tampilkan QR Code Profil untuk NFC & Scan"
          aria-label="Buka QR Code"
        >
          <QrCode className="w-3.5 h-3.5 text-[#00A3A6]" />
          <span className="hidden xs:inline">QR Code</span>
        </button>
      </aside>

      {/* ============================================================== */}
      {/* MASTER DIGITAL BUSINESS CARD (PORTRAIT FORMAT) */}
      {/* ============================================================== */}
      <section
        aria-label="Kartu Profil Driver"
        className="relative w-full max-w-[430px] min-h-screen sm:min-h-0 bg-gradient-to-b from-white via-[#F7FDFC] to-[#E9FAF7] sm:rounded-[36px] shadow-2xl sm:border sm:border-teal-100/90 overflow-hidden flex flex-col justify-between"
      >
        {/* ============================================================ */}
        {/* LAYER 1: Background Warna Dasar Putih-Turquoise & Ornamen    */}
        {/* ============================================================ */}
        <CurvedOrnaments />

        {/* ============================================================ */}
        {/* LAYER 2: Background Image Hasil Upload Pengguna (Watermark)  */}
        {/*          Opacity, posisi, dan ukuran diatur independen       */}
        {/* ============================================================ */}
        <UserBackgroundLayer settings={bgSettings} />

        {/* ============================================================ */}
        {/* LAYER 3: Seluruh Konten Landing Page (DIKUNCI & TERBACA)    */}
        {/* ============================================================ */}
        <div className="relative z-10 flex flex-col items-center px-5 pt-7 pb-2 w-full">
          
          {/* TOP SECTION: Logo GREEN SM & Electric Taxi */}
          <header className="w-full flex justify-center mb-4">
            <GreenSMLogo size="md" />
          </header>

          {/* DRIVER PHOTO: Circular with Yellow Border & Green SM Watermark */}
          <div className="mt-1 mb-3.5 flex justify-center">
            <DriverAvatar />
          </div>

          {/* DRIVER NAME: Wahyu Eka B.T. */}
          <div className="text-center w-full px-2">
            <h1 className="text-[26px] sm:text-[28px] font-black tracking-tight text-[#073B3D] leading-tight">
              Wahyu Eka B.T.
            </h1>

            {/* IDENTITY BADGE: Driver Green SM */}
            <div className="mt-1.5 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-teal-500/10 border border-[#00B5B8]/30 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#00B5B8] animate-pulse"></span>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#007F82]">
                Driver Green SM
              </span>
            </div>

            {/* LOCATION: Surabaya, Jawa Timur */}
            <div className="mt-2 flex items-center justify-center gap-1 text-xs font-semibold text-slate-500">
              <MapPin className="w-3.5 h-3.5 text-[#00A3A6] shrink-0" />
              <span>Surabaya, Jawa Timur</span>
            </div>
          </div>

          {/* WHATSAPP SECTION: NOMOR WHATSAPP 0822 3369 7979 DAPAT DIKLIK LANGSUNG */}
          {/* Note: "Nomor WhatsApp yang ditampilkan harus dapat diklik. Ketika diklik, langsung buka percakapan WhatsApp melalui https://wa.me/6282233697979. Jangan membuat tombol WhatsApp tambahan. Nomor WhatsApp yang sudah tampil adalah elemen yang dapat diklik." */}
          <div className="w-full mt-4 mb-3.5">
            <a
              href="https://wa.me/6282233697979"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hubungi nomor WhatsApp 0822 3369 7979"
              className="group relative flex items-center justify-between px-4 py-3 bg-white/90 backdrop-blur-xs rounded-2xl border-2 border-emerald-400/70 hover:border-emerald-500 shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98]"
            >
              {/* WhatsApp Icon */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#25D366] to-[#128C7E] flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-white fill-current"
                  >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </div>

                <div className="text-left">
                  <span className="block text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                    WhatsApp Resmi
                  </span>
                  {/* Large clickable number */}
                  <span className="text-[17px] sm:text-[19px] font-extrabold text-[#063334] tracking-normal font-mono group-hover:text-emerald-700 transition-colors">
                    0822 3369 7979
                  </span>
                </div>
              </div>

              {/* Action indicator */}
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200/80 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                <span>Chat</span>
                <ExternalLink className="w-3 h-3" />
              </div>
            </a>
          </div>

          {/* TWO MAIN ACTION BUTTONS: SAVE CONTACT & VISIT MY WEBSITE */}
          <div className="w-full flex flex-col gap-2.5 my-1">
            
            {/* BUTTON A: SAVE CONTACT */}
            <button
              onClick={handleSaveContact}
              className="w-full relative group overflow-hidden flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#00A3A6] via-[#00B5B8] to-[#009699] text-white font-extrabold text-sm sm:text-[15px] shadow-lg shadow-teal-600/25 hover:shadow-teal-600/35 active:scale-[0.98] transition-all cursor-pointer"
            >
              {/* Shimmer sweep effect */}
              <span className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none"></span>

              <UserPlus className="w-4 h-4 text-[#FFD000] drop-shadow-xs" />
              <span className="tracking-wide uppercase font-sans">
                SAVE CONTACT
              </span>
            </button>

            {/* BUTTON B: VISIT MY WEBSITE */}
            <a
              href="https://smartjourney.id"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-white/95 hover:bg-teal-50/70 border-2 border-[#00B5B8] text-[#007F82] hover:text-[#006A6D] font-extrabold text-sm sm:text-[15px] shadow-sm hover:shadow-md active:scale-[0.98] transition-all"
            >
              <Globe className="w-4 h-4 text-[#00A3A6]" />
              <span className="tracking-wide uppercase font-sans">
                VISIT MY WEBSITE
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#00A3A6]" />
            </a>
          </div>

          {/* TIGA IDENTITAS LAYANAN: Zero Emission, Eco Friendly, Safe & Comfort */}
          <div className="w-full mt-3 mb-1">
            <ServicePills />
          </div>

        </div>

        {/* BOTTOM SECTION: GREEN SM ELECTRIC TAXI & SURABAYA SKYLINE */}
        <div className="relative z-10 w-full mt-auto pt-1">
          <ElectricTaxiCar />

          {/* Bottom Card Footer Branding & Copyright */}
          <footer className="w-full py-2.5 px-4 bg-gradient-to-t from-[#E6F8F6] to-transparent text-center">
            <p className="text-[10px] font-semibold text-[#007275]/80 tracking-wide uppercase">
              Green SM Electric Taxi • Wahyu Eka B.T. • Surabaya
            </p>
          </footer>
        </div>

      </section>

      {/* Modal Pengaturan Background Image */}
      <BackgroundSettingsModal
        isOpen={isBgSettingsOpen}
        onClose={() => setIsBgSettingsOpen(false)}
        settings={bgSettings}
        onUpdateSettings={handleUpdateBgSettings}
        onReset={handleResetBgSettings}
      />

      {/* QR Code Modal for NFC & In-Car Passenger Sharing */}
      <QrModal isOpen={isQrOpen} onClose={() => setIsQrOpen(false)} />
    </main>
  );
}
