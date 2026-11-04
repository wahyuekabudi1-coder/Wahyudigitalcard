# Green SM Digital Driver Profile — Wahyu Eka B.T.

> Digital Business Card Landing Page resmi untuk Driver **Green SM Electric Taxi** (Wahyu Eka B.T.) di Surabaya, Jawa Timur.

[![Vercel Deployment](https://img.shields.io/badge/Deploy-Vercel-black?style=flat&logo=vercel)](https://vercel.com)
[![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat&logo=vite)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?style=flat&logo=tailwindcss)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org)

---

## 📋 Ringkasan Proyek

Landing page profil digital *mobile-first* portrait premium yang dirancang khusus untuk driver taksi listrik Green SM, dapat diakses langsung oleh penumpang melalui **NFC Smart Card** dan **Scan QR Code**.

### 🌟 Fitur Utama

- **Identitas Visual Resmi Green SM**:
  - Logo asli **GREEN SM Electric Taxi** (Turquoise `#00B5B8` & Kuning `#FFC800`).
  - Foto driver lingkaran dengan watermark Green SM dan ring kuning keemasan.
  - Nama resmi: **Wahyu Eka B.T.**
  - Badge identitas: **Driver Green SM**.
  - Label lokasi: **Surabaya, Jawa Timur**.
- **Bagian WhatsApp Interaktif**:
  - Nomor telepon resmi `0822 3369 7979` dapat langsung diklik menuju `https://wa.me/6282233697979`.
- **Tombol SAVE CONTACT**:
  - Menghasilkan dan mengunduh file kontak virtual standar RFC `.VCF` (vCard 3.0) berisi nama lengkap, nomor telepon, organisasi Green SM, dan alamat website.
- **Tombol VISIT MY WEBSITE**:
  - Tautan langsung ke `https://smartjourney.id` dengan atribut keamanan `target="_blank" rel="noopener noreferrer"`.
- **Sistem Background 3-Layer & Watermark Custom**:
  - **Layer 1**: Base gradasi putih-turquoise & ornamen lengkung Green SM.
  - **Layer 2**: Background watermark gambar hasil upload (didukung pengaturan opacity independen, posisi, ukuran *cover/contain/zoom*, dan overlay warna).
  - **Layer 3**: Seluruh konten kartu profil ber-kontras tinggi tanpa terpengaruh transparansi background.
- **Ilustrasi Mobil Listrik Green SM**:
  - Ilustrasi vektor mobil listrik crossover Green SM lengkap dengan livery, roof light sign, dan siluet cakrawala Kota Surabaya (Tugu Pahlawan & Suramadu).
- **Tiga Identitas Layanan**:
  - 🌿 *Zero Emission*
  - ⚡ *Eco Friendly*
  - 🛡️ *Safe & Comfort*
- **Modal QR Code & NFC Ready**:
  - Mendukung pembagian tautan instan melalui QR scanner atau NFC tap.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 8
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Deploy Target**: Vercel / Cloudflare Pages / Netlify

---

## 🚀 Panduan Memulai (Local Development)

### 1. Kloning Repository
```bash
git clone https://github.com/USERNAME/green-sm-digital-profile.git
cd green-sm-digital-profile
```

### 2. Install Dependensi
```bash
npm install
```

### 3. Jalankan Development Server
```bash
npm run dev
```
Akses di browser melalui `http://localhost:3000`.

### 4. Build untuk Production
```bash
npm run build
```
File output hasil build akan berada di direktori `dist/`.

---

## 🌐 Panduan Deployment ke Vercel

Proyek ini telah dikonfigurasi secara optimal untuk Vercel:
- **Framework Preset**: `Vite`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Routing**: Konfigurasi `vercel.json` sudah tersedia untuk menjamin SPA routing berjalan tanpa error 404 saat di-refresh.

---

## 📄 Lisensi

© 2026 Wahyu Eka B.T. — Green SM Electric Taxi Surabaya.
