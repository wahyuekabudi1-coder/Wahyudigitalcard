# Green SM Digital Driver Profile — Wahyu Eka B.T.

> Digital Business Card Landing Page resmi untuk Driver **Green SM Electric Taxi** (Wahyu Eka B.T.) di Surabaya, Jawa Timur.

[![Vercel Deployment](https://img.shields.io/badge/Deploy-Vercel-black?style=flat&logo=vercel)](https://vercel.com)
[![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat&logo=vite)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?style=flat&logo=tailwindcss)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org)

---

## 📋 Ringkasan Proyek

Landing page profil digital *mobile-first* portrait premium yang dirancang khusus untuk driver taksi listrik Green SM, dapat diakses langsung oleh penumpang melalui **NFC Smart Card** dan **Scan QR Code Kamera HP**.

### 🌟 Fitur Utama & Konfigurasi Default Permanen

1. **Identitas Visual Resmi Green SM**:
   - Logo asli **GREEN SM Electric Taxi** (format PNG transparan tanpa background box putih).
   - **Foto Profil Driver Default Permanen**: Tersimpan di `public/assets/driver-wahyu-default.jpg` berbingkai lingkaran emas (#FFC800) dan watermark diagonal Green SM (tanpa ilustrasi kartun).
   - Nama resmi: **Wahyu Eka B.T.**
   - Badge identitas: **Driver Green SM**.
2. **WhatsApp Resmi dengan Pesan Otomatis**:
   - Nomor WhatsApp `0822 3369 7979` diposisikan simetris di tengah.
   - Mengarahkan langsung ke WhatsApp dengan template pesan otomatis:
     > *"Halo Wahyu, saya ingin pesan mobil listrik taksi Green SM."*
3. **Tombol SIMPAN KONTAK (.VCF)**:
   - Membagikan dan mengunduh file kontak vCard 3.0 resmi (`Wahyu_Eka_BT.vcf`) langsung ke buku telepon iPhone (Apple Contacts) dan Android (Google Contacts).
4. **Tombol VISIT MY WEBSITE**:
   - Tautan langsung ke `https://smartjourney.id` dengan atribut keamanan `target="_blank" rel="noopener noreferrer"`.
5. **Banner Taksi Listrik Green SM**:
   - Banner mobil listrik taksi Green SM seamless di bagian bawah card dengan blending transparan.
6. **Open Graph Image Preview (WhatsApp / Media Sosial)**:
   - File permanen di `public/og-driver-wahyu.jpg` (1200 × 630 piksel) berisi logo Green SM, foto driver, mobil listrik, WhatsApp, dan identitas Surabaya.
7. **QR Code Standar Industri (Camera-Scannable)**:
   - Dihasilkan langsung dari domain deployment produksi (`https://smartjourney.id`) menggunakan modul `qrcode` dengan level koreksi kesalahan tinggi (*High Error Correction*).
8. **Sistem Pengaturan Rahasia (Secret Easter Egg)**:
   - Tampilan publik 100% bersih tanpa tombol edit yang mengganggu.
   - Mengetuk footer (*Green SM Taxi • Wahyu Eka BT • Surabaya*) sebanyak **10 – 13 kali** membuka modal pengaturan background dan foto profil.
   - Keluar dari menu atau mengetuk ke-14 kali otomatis mengunci dan menyembunyikan semua kontrol kembali ke semula.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 8
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **QR Engine**: qrcode
- **Image Engine**: sharp
- **Deploy Target**: Vercel / GitHub

---

## 🚀 Panduan Deployment ke GitHub & Vercel

### 1. Push ke GitHub
```bash
git init
git add .
git commit -m "feat: finalize Green SM digital profile default configuration"
git branch -M main
git remote add origin https://github.com/USERNAME/green-sm-digital-profile.git
git push -u origin main
```

### 2. Deploy ke Vercel
1. Buka [Vercel Dashboard](https://vercel.com/new).
2. Import repository GitHub `green-sm-digital-profile`.
3. Framework Preset: **Vite**.
4. Build Command: `npm run build`.
5. Output Directory: `dist`.
6. Klik **Deploy**.
