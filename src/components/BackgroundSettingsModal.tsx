import React, { useRef, useState, useEffect } from 'react';
import {
  X,
  Upload,
  Trash2,
  Sliders,
  Image as ImageIcon,
  RotateCcw,
  Check,
  Eye,
  Layers,
  User,
  ZoomIn,
  Move,
  Camera,
  QrCode,
} from 'lucide-react';
import { AvatarSettings, DEFAULT_AVATAR_SETTINGS } from './DriverAvatar';

export interface BackgroundSettings {
  imageUrl: string | null;
  opacity: number; // 0 - 100
  position: string; // 'center' | 'top' | 'bottom' | 'top center' | 'bottom center'
  size: 'contain' | 'cover' | 'custom';
  scale: number; // 30 - 200%
  repeat: boolean;
  overlayColor: string; // 'none' | '#FFFFFF' | '#00B5B8' | '#044345' | '#FFC800'
  overlayOpacity: number; // 0 - 100
}

export const DEFAULT_BG_SETTINGS: BackgroundSettings = {
  imageUrl: null,
  opacity: 22,
  position: 'center',
  size: 'cover',
  scale: 100,
  repeat: false,
  overlayColor: 'none',
  overlayOpacity: 0,
};

interface BackgroundSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: BackgroundSettings;
  onUpdateSettings: (newSettings: BackgroundSettings) => void;
  onReset: () => void;
  // Avatar Props
  avatarSettings?: AvatarSettings;
  onUpdateAvatarSettings?: (newSettings: AvatarSettings) => void;
  onResetAvatar?: () => void;
  initialTab?: 'background' | 'avatar';
  onOpenQr?: () => void;
}

export const BackgroundSettingsModal: React.FC<BackgroundSettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onReset,
  avatarSettings = DEFAULT_AVATAR_SETTINGS,
  onUpdateAvatarSettings,
  onResetAvatar,
  initialTab = 'background',
  onOpenQr,
}) => {
  const [activeTab, setActiveTab] = useState<'background' | 'avatar'>('background');
  
  // Background Upload Refs & States
  const bgFileInputRef = useRef<HTMLInputElement>(null);
  const [isBgDragging, setIsBgDragging] = useState(false);
  const [bgUploadError, setBgUploadError] = useState<string | null>(null);

  // Avatar Upload Refs & States
  const avatarFileInputRef = useRef<HTMLInputElement>(null);
  const [isAvatarDragging, setIsAvatarDragging] = useState(false);
  const [avatarUploadError, setAvatarUploadError] = useState<string | null>(null);

  // Sync initialTab when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  // Process Background File
  const handleBgFileProcess = (file: File) => {
    setBgUploadError(null);
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setBgUploadError('Format tidak didukung. Harap gunakan format PNG, JPG, JPEG, atau WebP.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (!dataUrl) return;

      const img = new Image();
      img.onload = () => {
        const maxDimension = 1800;
        let { width, height } = img;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const optimizedDataUrl = canvas.toDataURL(file.type === 'image/png' ? 'image/png' : 'image/jpeg', 0.9);
            onUpdateSettings({ ...settings, imageUrl: optimizedDataUrl });
            return;
          }
        }
        onUpdateSettings({ ...settings, imageUrl: dataUrl });
      };
      img.src = dataUrl;
    };
    reader.onerror = () => setBgUploadError('Gagal membaca file gambar.');
    reader.readAsDataURL(file);
  };

  // Process Avatar File
  const handleAvatarFileProcess = (file: File) => {
    setAvatarUploadError(null);
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setAvatarUploadError('Format tidak didukung. Harap gunakan format PNG, JPG, JPEG, atau WebP.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (!dataUrl) return;

      const img = new Image();
      img.onload = () => {
        // Optimize avatar to a crisp 800x800 square
        const maxDim = 800;
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const optimizedDataUrl = canvas.toDataURL(file.type === 'image/png' ? 'image/png' : 'image/jpeg', 0.92);
          onUpdateAvatarSettings?.({ ...avatarSettings, photoUrl: optimizedDataUrl });
          return;
        }
        onUpdateAvatarSettings?.({ ...avatarSettings, photoUrl: dataUrl });
      };
      img.src = dataUrl;
    };
    reader.onerror = () => setAvatarUploadError('Gagal membaca file gambar foto.');
    reader.readAsDataURL(file);
  };

  const overlayOptions = [
    { label: 'Tanpa Overlay', value: 'none', colorClass: 'bg-slate-100 border-slate-300' },
    { label: 'Putih', value: '#FFFFFF', colorClass: 'bg-white border-slate-300' },
    { label: 'Turquoise', value: '#00B5B8', colorClass: 'bg-[#00B5B8] border-teal-600' },
    { label: 'Hijau Gelap', value: '#044345', colorClass: 'bg-[#044345] border-teal-900' },
    { label: 'Kuning', value: '#FFC800', colorClass: 'bg-[#FFC800] border-amber-500' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-teal-100 max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-slate-100 bg-gradient-to-r from-teal-50/70 via-white to-amber-50/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-[#008E91]">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h2 id="modal-title" className="text-base font-extrabold text-[#063334]">
                Pengaturan Tampilan
              </h2>
              <p className="text-[11px] text-slate-500 font-medium">
                Atur & upload foto profil driver atau background section
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher: Background vs Foto Profil */}
        <div className="flex px-5 pt-3 border-b border-slate-100 bg-slate-50/60">
          <button
            type="button"
            onClick={() => setActiveTab('avatar')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'avatar'
                ? 'border-[#008E91] text-[#008E91] bg-white rounded-t-xl shadow-2xs'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <User className="w-4 h-4 text-[#00A3A6]" />
            <span>Foto Profil</span>
            {avatarSettings?.photoUrl && (
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('background')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'background'
                ? 'border-[#008E91] text-[#008E91] bg-white rounded-t-xl shadow-2xs'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-4 h-4 text-[#00A3A6]" />
            <span>Background</span>
            {settings?.imageUrl && (
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            )}
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto px-5 py-4 space-y-4 text-xs">
          
          {/* ============================================================ */}
          {/* TAB 1: FOTO PROFIL DRIVER                                    */}
          {/* ============================================================ */}
          {activeTab === 'avatar' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Photo Preview & Upload */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Foto Driver Wahyu Eka B.T.
                </label>

                <input
                  type="file"
                  ref={avatarFileInputRef}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleAvatarFileProcess(f);
                  }}
                  accept=".png,.jpg,.jpeg,.webp,image/png,image/jpeg,image/webp"
                  className="hidden"
                  id="avatar-file-input"
                />

                {avatarSettings?.photoUrl ? (
                  <div className="rounded-2xl border-2 border-teal-400/80 bg-teal-50/40 p-3.5 flex items-center justify-between gap-3 shadow-xs">
                    <div className="flex items-center gap-3">
                      {/* Circular live preview of custom photo */}
                      <div className="w-16 h-16 rounded-full border-2 border-[#FFC800] ring-2 ring-[#00B5B8]/30 overflow-hidden bg-white shrink-0 shadow-md">
                        <img
                          src={avatarSettings.photoUrl}
                          alt="Preview Foto Driver"
                          className="w-full h-full object-cover"
                          style={{
                            transform: `scale(${avatarSettings.zoom / 100})`,
                            objectPosition: `${avatarSettings.positionX}% ${avatarSettings.positionY}%`,
                          }}
                        />
                      </div>
                      <div>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          <Check className="w-3 h-3" /> Foto Kustom Aktif
                        </span>
                        <p className="text-[11px] text-slate-600 mt-1">
                          Ditampilkan pada bingkai lingkaran kartu profil
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => avatarFileInputRef.current?.click()}
                        className="px-2.5 py-1.5 rounded-xl bg-white border border-teal-300 text-[#007F82] hover:bg-teal-50 font-bold text-[11px] transition-colors cursor-pointer"
                      >
                        Ganti
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          onResetAvatar?.();
                          if (avatarFileInputRef.current) avatarFileInputRef.current.value = '';
                        }}
                        className="p-1.5 rounded-xl bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
                        title="Kembali ke ilustrasi default"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsAvatarDragging(false);
                      const f = e.dataTransfer.files?.[0];
                      if (f) handleAvatarFileProcess(f);
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsAvatarDragging(true);
                    }}
                    onDragLeave={() => setIsAvatarDragging(false)}
                    onClick={() => avatarFileInputRef.current?.click()}
                    className={`cursor-pointer rounded-2xl border-2 border-dashed p-5 text-center transition-all ${
                      isAvatarDragging
                        ? 'border-teal-500 bg-teal-50 scale-[1.01]'
                        : 'border-slate-300 hover:border-teal-400 bg-slate-50/70 hover:bg-teal-50/30'
                    }`}
                  >
                    <div className="w-11 h-11 rounded-full bg-teal-100 text-[#008E91] mx-auto flex items-center justify-center mb-2 shadow-xs">
                      <Camera className="w-5 h-5 text-[#008E91]" />
                    </div>
                    <p className="font-bold text-slate-700 text-xs">
                      Klik atau seret foto profil driver ke sini
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Format: PNG, JPG, JPEG, WebP. Menyesuaikan bingkai lingkaran kuning.
                    </p>
                  </div>
                )}

                {avatarUploadError && (
                  <p className="text-red-600 text-[11px] mt-1.5 font-medium">
                    {avatarUploadError}
                  </p>
                )}
              </div>

              {/* Controls when photo is uploaded */}
              {avatarSettings?.photoUrl && (
                <>
                  {/* Zoom Slider */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-700 flex items-center gap-1.5">
                        <ZoomIn className="w-3.5 h-3.5 text-[#00A3A6]" />
                        Zoom / Skala Foto
                      </span>
                      <span className="font-mono font-bold text-xs text-[#007F82] bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                        {avatarSettings.zoom}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="60"
                      max="200"
                      value={avatarSettings.zoom}
                      onChange={(e) =>
                        onUpdateAvatarSettings?.({
                          ...avatarSettings,
                          zoom: Number(e.target.value),
                        })
                      }
                      className="w-full accent-[#00B5B8] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>Jauh (60%)</span>
                      <span>Normal (100%)</span>
                      <span>Dekat (200%)</span>
                    </div>
                  </div>

                  {/* Vertical Position Adjustment */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-700 flex items-center gap-1.5">
                        <Move className="w-3.5 h-3.5 text-[#00A3A6]" />
                        Posisi Wajah (Vertikal)
                      </span>
                      <span className="font-mono font-bold text-xs text-[#007F82] bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                        {avatarSettings.positionY}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={avatarSettings.positionY}
                      onChange={(e) =>
                        onUpdateAvatarSettings?.({
                          ...avatarSettings,
                          positionY: Number(e.target.value),
                        })
                      }
                      className="w-full accent-[#00B5B8] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>Fokus Atas</span>
                      <span>Tengah (50%)</span>
                      <span>Fokus Bawah</span>
                    </div>
                  </div>
                </>
              )}

              {/* Status Note */}
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 text-[11px] text-amber-800">
                💡 <strong>Tips:</strong> Foto profil akan otomatis tampil dalam bingkai lingkaran bergaris kuning dengan background watermark Green SM sesuai master design.
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 2: BACKGROUND SECTION                                    */}
          {/* ============================================================ */}
          {activeTab === 'background' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Background Upload */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Gambar Background (Layer 2)
                </label>

                <input
                  type="file"
                  ref={bgFileInputRef}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleBgFileProcess(f);
                  }}
                  accept=".png,.jpg,.jpeg,.webp,image/png,image/jpeg,image/webp"
                  className="hidden"
                  id="bg-file-input"
                />

                {settings.imageUrl ? (
                  <div className="relative rounded-2xl border-2 border-teal-400/80 bg-teal-50/40 p-3 flex items-center justify-between gap-3 shadow-xs">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-14 h-14 rounded-xl border border-teal-200 bg-white overflow-hidden shrink-0 flex items-center justify-center shadow-2xs">
                        <img
                          src={settings.imageUrl}
                          alt="Thumbnail Background"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="overflow-hidden">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          <Check className="w-3 h-3" /> Gambar Aktif
                        </span>
                        <p className="text-[11px] text-slate-600 truncate mt-1">
                          Ditampilkan di belakang konten
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => bgFileInputRef.current?.click()}
                        className="px-2.5 py-1.5 rounded-xl bg-white border border-teal-300 text-[#007F82] hover:bg-teal-50 font-bold text-[11px] transition-colors cursor-pointer"
                      >
                        Ganti
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          onUpdateSettings({ ...settings, imageUrl: null });
                          if (bgFileInputRef.current) bgFileInputRef.current.value = '';
                        }}
                        className="p-1.5 rounded-xl bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
                        title="Hapus gambar background"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsBgDragging(false);
                      const f = e.dataTransfer.files?.[0];
                      if (f) handleBgFileProcess(f);
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsBgDragging(true);
                    }}
                    onDragLeave={() => setIsBgDragging(false)}
                    onClick={() => bgFileInputRef.current?.click()}
                    className={`cursor-pointer rounded-2xl border-2 border-dashed p-5 text-center transition-all ${
                      isBgDragging
                        ? 'border-teal-500 bg-teal-50 scale-[1.01]'
                        : 'border-slate-300 hover:border-teal-400 bg-slate-50/70 hover:bg-teal-50/30'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-teal-100 text-[#008E91] mx-auto flex items-center justify-center mb-2">
                      <Upload className="w-5 h-5" />
                    </div>
                    <p className="font-bold text-slate-700 text-xs">
                      Klik atau seret file gambar ke sini
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Format: PNG, JPG, JPEG, WebP
                    </p>
                  </div>
                )}

                {bgUploadError && (
                  <p className="text-red-600 text-[11px] mt-1.5 font-medium">
                    {bgUploadError}
                  </p>
                )}
              </div>

              {/* Opacity Slider */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-700 flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-[#00A3A6]" />
                    Opacity Gambar (Transparansi)
                  </span>
                  <span className="font-mono font-bold text-xs text-[#007F82] bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                    {settings.opacity}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={settings.opacity}
                  onChange={(e) =>
                    onUpdateSettings({ ...settings, opacity: Number(e.target.value) })
                  }
                  className="w-full accent-[#00B5B8] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>0% (Polos)</span>
                  <span>Rekomendasi Watermark: 15% - 25%</span>
                  <span>100% (Penuh)</span>
                </div>
              </div>

              {/* Posisi Gambar */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <label className="font-bold text-slate-700 block">
                  Posisi Gambar
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { label: 'Tengah (Center)', value: 'center' },
                    { label: 'Atas (Top)', value: 'top center' },
                    { label: 'Bawah (Bottom)', value: 'bottom center' },
                  ].map((pos) => (
                    <button
                      key={pos.value}
                      type="button"
                      onClick={() => onUpdateSettings({ ...settings, position: pos.value })}
                      className={`py-2 px-2 rounded-xl text-[11px] font-bold border transition-all cursor-pointer ${
                        settings.position === pos.value
                          ? 'bg-[#008E91] text-white border-[#008E91] shadow-2xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {pos.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ukuran Gambar */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-700 block">
                    Ukuran Gambar
                  </label>
                  <div className="flex gap-1">
                    {[
                      { label: 'Cover', value: 'cover' },
                      { label: 'Contain', value: 'contain' },
                      { label: 'Skala Bebas', value: 'custom' },
                    ].map((s) => (
                      <button
                        key={s.value}
                        type="button"
                        onClick={() =>
                          onUpdateSettings({
                            ...settings,
                            size: s.value as 'contain' | 'cover' | 'custom',
                          })
                        }
                        className={`py-1 px-2 rounded-lg text-[10.5px] font-bold border transition-all cursor-pointer ${
                          settings.size === s.value
                            ? 'bg-[#008E91] text-white border-[#008E91]'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {settings.size === 'custom' && (
                  <div className="pt-1 space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-500">Skala Zoom</span>
                      <span className="font-mono font-bold text-[#007F82]">{settings.scale}%</span>
                    </div>
                    <input
                      type="range"
                      min="30"
                      max="200"
                      value={settings.scale}
                      onChange={(e) =>
                        onUpdateSettings({ ...settings, scale: Number(e.target.value) })
                      }
                      className="w-full accent-[#00B5B8] cursor-pointer"
                    />
                  </div>
                )}
              </div>

              {/* Overlay Warna */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
                <label className="font-bold text-slate-700 block">
                  Overlay Warna (Filter Tone)
                </label>
                <div className="flex flex-wrap gap-2">
                  {overlayOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => onUpdateSettings({ ...settings, overlayColor: opt.value })}
                      className={`flex items-center gap-1.5 py-1.5 px-2.5 rounded-xl text-[11px] font-bold border transition-all cursor-pointer ${
                        settings.overlayColor === opt.value
                          ? 'border-[#008E91] bg-teal-50 text-[#007F82] ring-1 ring-[#008E91]'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className={`w-3.5 h-3.5 rounded-full border shadow-2xs ${opt.colorClass}`}></span>
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>

                {settings.overlayColor !== 'none' && (
                  <div className="pt-2 space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-500">Intensitas Overlay</span>
                      <span className="font-mono font-bold text-[#007F82]">
                        {settings.overlayOpacity}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={settings.overlayOpacity}
                      onChange={(e) =>
                        onUpdateSettings({ ...settings, overlayOpacity: Number(e.target.value) })
                      }
                      className="w-full accent-[#00B5B8] cursor-pointer"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-2">
          {activeTab === 'avatar' ? (
            <button
              type="button"
              onClick={onResetAvatar}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-semibold transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Default</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onReset}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-semibold transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Default</span>
            </button>
          )}

          <div className="flex items-center gap-2">
            {onOpenQr && (
              <button
                type="button"
                onClick={onOpenQr}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-[#007F82] border border-teal-200/80 font-bold text-xs transition-colors cursor-pointer"
                title="Buka QR Code untuk Dashboard Mobil / Penumpang"
              >
                <QrCode className="w-3.5 h-3.5 text-[#00A3A6]" />
                <span>QR Code</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00A3A6] to-[#00C2A8] text-white font-bold text-xs shadow-md hover:from-[#008F92] hover:to-[#00B098] transition-all cursor-pointer"
            >
              Selesai
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
