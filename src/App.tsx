/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Globe,
  PhoneCall,
  UserPlus,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { GreenSMLogo } from './components/GreenSMLogo';
import { CurvedOrnaments } from './components/CurvedOrnaments';
import {
  DriverAvatar,
  AvatarSettings,
  DEFAULT_AVATAR_SETTINGS,
} from './components/DriverAvatar';
import { ElectricTaxiCar } from './components/ElectricTaxiCar';
import { ServicePills } from './components/ServicePills';
import {
  BackgroundSettingsModal,
  BackgroundSettings,
  DEFAULT_BG_SETTINGS,
} from './components/BackgroundSettingsModal';
import { UserBackgroundLayer } from './components/UserBackgroundLayer';
import { QrModal } from './components/QrModal';
import { saveDriverContact } from './utils/vcard';

const BG_STORAGE_KEY = 'green_sm_bg_settings_v2';
const AVATAR_STORAGE_KEY = 'green_sm_avatar_settings_v1';

// Nomor WhatsApp resmi driver Wahyu Eka B.T. & template pesan pemesanan taksi
const WA_PHONE = '6282233697979';
const WA_PREFILLED_TEXT = 'Halo Wahyu, saya ingin pesan mobil listrik taksi Green SM.';
const WA_URL = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(WA_PREFILLED_TEXT)}`;

export default function App() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [settingsActiveTab, setSettingsActiveTab] = useState<'background' | 'avatar'>('background');

  // Secret Click Easter Egg (sembunyi di footer, 10-13x buka pengaturan, 14x kembali ke semula)
  const [secretClickCount, setSecretClickCount] = useState(0);

  const handleFooterSecretClick = () => {
    setSecretClickCount((prev) => {
      const next = prev + 1;
      if (next >= 10 && next <= 13) {
        setIsSettingsOpen(true);
        setToastMessage(`Akses Pengaturan Tampilan Terbuka (${next}/13)`);
        setTimeout(() => setToastMessage(null), 2500);
        return next;
      }
      if (next >= 14) {
        handleCloseSettings();
        setToastMessage('Pengaturan dikunci kembali ke semula.');
        setTimeout(() => setToastMessage(null), 2500);
        return 0;
      }
      return next;
    });
  };

  const handleCloseSettings = () => {
    setIsSettingsOpen(false);
    setSecretClickCount(0); // Seluruh tombol langsung hilang & kembali ke semula saat keluar dari menu
  };

  const handleOpenQrFromModal = () => {
    setIsSettingsOpen(false);
    setIsQrOpen(true);
  };

  const handleSaveContact = async () => {
    try {
      const result = await saveDriverContact();
      setToastMessage(result.message);
      setTimeout(() => setToastMessage(null), 3500);
    } catch {
      setToastMessage('Mengunduh file kontak Wahyu Eka B.T. (.vcf)...');
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  // Background Settings State (Layer 2)
  const [bgSettings, setBgSettings] = useState<BackgroundSettings>(() => {
    try {
      const saved = localStorage.getItem(BG_STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_BG_SETTINGS, ...JSON.parse(saved) };
      }
    } catch {
      // Fallback
    }
    return DEFAULT_BG_SETTINGS;
  });

  // Avatar Photo Settings State (Layer 3)
  const [avatarSettings, setAvatarSettings] = useState<AvatarSettings>(() => {
    try {
      const saved = localStorage.getItem(AVATAR_STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_AVATAR_SETTINGS, ...JSON.parse(saved) };
      }
    } catch {
      // Fallback
    }
    return DEFAULT_AVATAR_SETTINGS;
  });

  // Auto-sync localStorage image uploads to disk files in dev mode
  useEffect(() => {
    try {
      const savedBg = localStorage.getItem(BG_STORAGE_KEY);
      const savedAvatar = localStorage.getItem(AVATAR_STORAGE_KEY);
      const bgParsed = savedBg ? JSON.parse(savedBg) : null;
      const avatarParsed = savedAvatar ? JSON.parse(savedAvatar) : null;

      if (
        (bgParsed?.imageUrl && bgParsed.imageUrl.startsWith('data:image/')) ||
        (avatarParsed?.photoUrl && avatarParsed.photoUrl.startsWith('data:image/'))
      ) {
        fetch('/api/persist-defaults', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            bgImageUrl: bgParsed?.imageUrl,
            bgSettings: bgParsed,
            avatarPhotoUrl: avatarParsed?.photoUrl,
            avatarSettings: avatarParsed,
          }),
        }).catch(() => {});
      }
    } catch {
      //
    }
  }, []);

  const handleUpdateBgSettings = (newSettings: BackgroundSettings) => {
    setBgSettings(newSettings);
    try {
      localStorage.setItem(BG_STORAGE_KEY, JSON.stringify(newSettings));
      fetch('/api/persist-defaults', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bgImageUrl: newSettings.imageUrl?.startsWith('data:image/') ? newSettings.imageUrl : undefined,
          bgSettings: newSettings,
        }),
      }).catch(() => {});
    } catch {
      // Ignore quota
    }
  };

  const handleResetBgSettings = () => {
    setBgSettings(DEFAULT_BG_SETTINGS);
    try {
      localStorage.removeItem(BG_STORAGE_KEY);
    } catch {
      //
    }
    setToastMessage('Background berhasil direset.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleUpdateAvatarSettings = (newSettings: AvatarSettings) => {
    setAvatarSettings(newSettings);
    try {
      localStorage.setItem(AVATAR_STORAGE_KEY, JSON.stringify(newSettings));
      fetch('/api/persist-defaults', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          avatarPhotoUrl: newSettings.photoUrl?.startsWith('data:image/') ? newSettings.photoUrl : undefined,
          avatarSettings: newSettings,
        }),
      }).catch(() => {});
    } catch {
      // Ignore quota
    }
  };

  const handleResetAvatarSettings = () => {
    setAvatarSettings(DEFAULT_AVATAR_SETTINGS);
    try {
      localStorage.removeItem(AVATAR_STORAGE_KEY);
    } catch {
      //
    }
    setToastMessage('Foto profil kembali ke ilustrasi default Wahyu Eka B.T.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const openAvatarSettings = () => {
    setSettingsActiveTab('avatar');
    setIsSettingsOpen(true);
  };

  const openBgSettings = () => {
    setSettingsActiveTab('background');
    setIsSettingsOpen(true);
  };

  return (
    <main className="min-h-screen w-full bg-slate-200/80 flex flex-col items-center justify-start sm:py-6 sm:px-4">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 z-50 max-w-[90vw] flex items-center gap-2.5 px-4 py-3 bg-[#005D60] text-white text-xs sm:text-sm font-semibold rounded-2xl shadow-2xl border border-teal-300/40 animate-in fade-in slide-in-from-top-4 duration-300 backdrop-blur-md">
          <CheckCircle2 className="w-4 h-4 text-[#FFD000] shrink-0" />
          <span className="leading-snug">{toastMessage}</span>
        </div>
      )}



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
        {/* ============================================================ */}
        <UserBackgroundLayer settings={bgSettings} />

        {/* ============================================================ */}
        {/* LAYER 3: Seluruh Konten Landing Page (DIKUNCI & TERBACA)    */}
        {/* ============================================================ */}
        <div className="relative z-10 flex flex-col items-center px-5 pt-6 pb-2 w-full">
          
          {/* TOP SECTION: Logo GREEN SM & Electric Taxi */}
          <header className="w-full flex justify-center mb-3">
            <GreenSMLogo size="md" />
          </header>

          {/* DRIVER PHOTO: PERBESAR FOTONYA (Enlarged with Yellow Border & Green SM Watermark) */}
          <div className="my-1 flex justify-center">
            <DriverAvatar
              avatarSettings={avatarSettings}
            />
          </div>

          {/* DRIVER IDENTITY & TITLE */}
          <div className="text-center w-full px-2 mt-2 flex flex-col items-center">
            {/* KARTU NAMA DIGITAL TITLE HEADER */}
            <div className="mb-1.5 inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-gradient-to-r from-teal-500/10 via-emerald-500/10 to-teal-500/10 border border-[#00B5B8]/35 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFC800] ring-2 ring-[#FFC800]/30 animate-pulse shrink-0"></span>
              <span className="text-[11px] sm:text-[12px] font-black tracking-[0.18em] uppercase text-[#008A8D] font-sans">
                KARTU NAMA DIGITAL
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFC800] ring-2 ring-[#FFC800]/30 animate-pulse shrink-0"></span>
            </div>

            {/* DRIVER NAME: Wahyu Eka B.T. */}
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
          </div>

          {/* WHATSAPP SECTION: BERSIH, PROPORISIONAL & PROFESIONAL */}
          <div className="w-full mt-3 mb-2.5">
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Kirim Pesan WhatsApp ke 0822 3369 7979"
              className="group relative flex items-center justify-between px-3.5 py-2.5 sm:py-3 rounded-2xl bg-white/95 hover:bg-emerald-50/50 border-2 border-emerald-500 shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
            >
              {/* Sisi Kiri: Ikon WhatsApp */}
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#25D366] flex items-center justify-center text-white shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 fill-current"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
              </div>

              {/* Bagian Tengah: Nomor WhatsApp Driver Presisi di Tengah */}
              <div className="flex-1 text-center px-2">
                <span className="text-[18px] sm:text-[19px] font-black text-[#043435] font-mono tracking-wide leading-none group-hover:text-emerald-700 transition-colors">
                  0822 3369 7979
                </span>
              </div>

              {/* Sisi Kanan: Ikon Kotak */}
              <div
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/80 group-hover:bg-[#25D366] group-hover:text-white group-hover:border-[#25D366] flex items-center justify-center shrink-0 transition-colors shadow-2xs"
                title="Buka WhatsApp"
              >
                <ExternalLink className="w-4 h-4" />
              </div>
            </a>
          </div>

          {/* TWO MAIN ACTION BUTTONS: SIMPAN KONTAK (PANGGILAN) & VISIT MY WEBSITE */}
          <div className="w-full flex flex-col gap-2.5 my-1">
            
            {/* BUTTON A: SIMPAN KONTAK (MENGUNDUH / MEMBAGIKAN FILE KONTAK .VCF KE HP) */}
            <button
              type="button"
              onClick={handleSaveContact}
              aria-label="Simpan kontak Wahyu Eka B.T. format VCF ke HP"
              className="w-full relative group overflow-hidden flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#00A3A6] via-[#00B5B8] to-[#009699] text-white font-extrabold text-sm sm:text-[15px] shadow-lg shadow-teal-600/25 hover:shadow-teal-600/35 active:scale-[0.98] transition-all cursor-pointer"
            >
              {/* Shimmer sweep effect */}
              <span className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none"></span>

              <UserPlus className="w-4 h-4 text-[#FFD000] drop-shadow-xs" />
              <span className="tracking-wide uppercase font-sans">
                SIMPAN KONTAK
              </span>
            </button>

            {/* BUTTON B: VISIT MY WEBSITE */}
            <a
              href="https://smartjourney.id"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-white/95 hover:bg-teal-50/70 border-2 border-[#00B5B8] text-[#007F82] hover:text-[#006A6D] font-extrabold text-sm sm:text-[14px] shadow-sm hover:shadow-md active:scale-[0.98] transition-all"
            >
              <Globe className="w-4 h-4 text-[#00A3A6]" />
              <span className="tracking-wide uppercase font-sans">
                VISIT MY WEBSITE
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#00A3A6]" />
            </a>
          </div>

          {/* TIGA IDENTITAS LAYANAN: Zero Emission, Eco Friendly, Safe & Comfort */}
          <div className="w-full mt-2 mb-1">
            <ServicePills />
          </div>

        </div>

        {/* BOTTOM SECTION: GREEN SM ELECTRIC TAXI & SURABAYA SKYLINE */}
        <div className="relative z-10 w-full mt-auto pt-1">
          <ElectricTaxiCar />

          {/* Bottom Card Footer Branding & Secret Trigger: 10-13x buka pengaturan, 14x kembali ke semula */}
          <footer
            onClick={handleFooterSecretClick}
            className="w-full py-2.5 px-4 bg-gradient-to-t from-[#E6F8F6] to-transparent text-center select-none cursor-pointer group"
            title="Green SM Taxi • Wahyu Eka BT • Surabaya"
          >
            <p className="text-[10px] font-semibold text-[#007275]/80 tracking-wide uppercase transition-colors group-hover:text-[#005D60]">
              Green SM Taxi • Wahyu Eka BT • Surabaya
            </p>
          </footer>
        </div>

      </section>

      {/* Modal Pengaturan Tampilan (Background & Foto Profil) */}
      <BackgroundSettingsModal
        isOpen={isSettingsOpen}
        onClose={handleCloseSettings}
        settings={bgSettings}
        onUpdateSettings={handleUpdateBgSettings}
        onReset={handleResetBgSettings}
        avatarSettings={avatarSettings}
        onUpdateAvatarSettings={handleUpdateAvatarSettings}
        onResetAvatar={handleResetAvatarSettings}
        initialTab={settingsActiveTab}
        onOpenQr={handleOpenQrFromModal}
      />

      {/* Real Camera-Scannable QR Code Modal */}
      <QrModal isOpen={isQrOpen} onClose={() => setIsQrOpen(false)} />
    </main>
  );
}
