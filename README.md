# Green SM Digital Driver Profile — Wahyu Eka B.T.

> Digital Business Card Landing Page resmi untuk Driver **Green SM Electric Taxi** (Wahyu Eka B.T.) di Surabaya, Jawa Timur.

[![Vercel Deployment](https://img.shields.io/badge/Deploy-Vercel-black?style=flat&logo=vercel)](https://vercel.com)
[![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat&logo=vite)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?style=flat&logo=tailwindcss)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org)

---

## 📋 Ringkasan Arsitektur: Pure Static Landing Page

Aplikasi ini beroperasi secara murni sebagai **Static Landing Page** (Frontend Single Page Application):
- **100% Client-Side**: Dibangun menggunakan React 19, TypeScript, dan Vite 8.
- **Tanpa Backend / Database**: Tidak menggunakan server Express, database, maupun API penyimpanan gambar runtime (`/api/save-permanent-asset`).
- **Aset Fisik Permanen**: Seluruh gambar bersumber langsung dari direktori `public/assets/` yang terikat pada source code project dan ikut tersimpan di repositori Git.
- **Tanpa Ketergantungan LocalStorage**: Konfigurasi tampilan default diatur terpusat di `src/config/permanentSettings.ts` dan tidak bergantung pada cache browser klien.

---

## 🌟 Fitur Utama Kartu Nama Digital

1. **Identitas Visual Resmi Green SM**:
   - Logo asli **GREEN SM Electric Taxi** (PNG transparan berkualitas tinggi).
   - **Foto Profil Driver Default Permanen**: Tersimpan secara fisik di `public/assets/driver-profile.jpg` berbingkai lingkaran emas (#FFC800) dan watermark Green SM.
   - **Background Resmi Green SM**: Tersimpan secara fisik di `public/assets/driver-background.jpg` dengan opacity paten 35%.
   - Nama Driver: **Wahyu Eka B.T.**
   - Badge Identitas: **Driver Green SM**.
2. **WhatsApp Resmi dengan Pesan Otomatis**:
   - Nomor WhatsApp `0822 3369 7979` diposisikan simetris di tengah.
   - Membuka WhatsApp secara langsung dengan template pesan pemesanan taksi:
     > *"Halo Wahyu, saya ingin pesan mobil listrik taksi Green SM."*
3. **Tombol SIMPAN KONTAK (vCard .VCF)**:
   - Mengunduh dan membagikan file kontak vCard 3.0 resmi (`Wahyu_Eka_BT.vcf`) langsung ke buku telepon iPhone (Apple Contacts) dan Android (Google Contacts).
4. **Tombol VISIT MY WEBSITE**:
   - Tautan langsung ke `https://sbyevrent.vercel.app/` dengan atribut keamanan `target="_blank" rel="noopener noreferrer"`.
5. **Tiga Pilar Layanan Green SM**:
   - *Zero Emission*, *Eco Friendly*, dan *Safe & Comfort*.
6. **Ilustrasi Taksi Listrik Green SM & Skyline Surabaya**:
   - Banner mobil listrik taksi Green SM seamless di bagian bawah kartu nama.
7. **QR Code Standar Industri (Camera-Scannable)**:
   - Dihasilkan secara client-side dari URL domain produksi (`https://sbyevrent.vercel.app/`) menggunakan modul `qrcode` dengan level koreksi kesalahan tinggi (*High Error Correction*).
   - Dapat diakses langsung oleh penumpang dengan mengetuk ikon QR Code di bagian header atas atau mengetuk teks footer kartu nama.
8. **Open Graph Image Preview (WhatsApp / Media Sosial)**:
   - File permanen di `public/og-driver-wahyu.jpg` (1200 × 630 piksel) untuk preview link saat dibagikan melalui WhatsApp, Facebook, dan media sosial lainnya.

---

## 🔄 Alur Penggantian Gambar

Pengelolaan gambar mengikuti alur statis yang sederhana dan dapat diandalkan:

$$\text{Ganti File di public/assets/} \longrightarrow \text{Commit \& Push ke GitHub} \longrightarrow \text{Vercel Auto-Deploy} \longrightarrow \text{Tampil di Semua Perangkat}$$

1. **Foto Profil**: Ganti file `public/assets/driver-profile.jpg`.
2. **Background**: Ganti file `public/assets/driver-background.jpg`.
3. **Konfigurasi Tambahan**: Sesuaikan zoom, posisi, atau opacity pada `src/config/permanentSettings.ts` bila diperlukan.
4. **Deploy**: Lakukan `git commit` dan `git push` ke repositori GitHub. Vercel akan otomatis melakukan build statis dan menyajikan gambar terbaru kepada seluruh pengunjung.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 8
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **QR Engine**: qrcode
- **Hosting / Deployment Target**: Vercel (Static Site Preset)

---

## 🚀 Panduan Build & Verifikasi Lokal

### 1. Instalasi Dependensi Bersih
```bash
npm ci
```

### 2. Typecheck (TypeScript)
```bash
npm run lint
```

### 3. Production Build
```bash
npm run build
```
Hasil kompilasi statis akan berada di folder `dist/` dengan seluruh aset gambar otomatis disalin ke `dist/assets/`.

### 4. Deploy ke Vercel
1. Hubungkan repository GitHub ke [Vercel Dashboard](https://vercel.com).
2. Framework Preset: **Vite**.
3. Build Command: `npm run build`.
4. Output Directory: `dist`.
5. Deploy.
