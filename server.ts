import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  // JSON parser with high limit to handle high-resolution image uploads
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  const publicAssetsDir = path.resolve(__dirname, 'public', 'assets');
  if (!fs.existsSync(publicAssetsDir)) {
    fs.mkdirSync(publicAssetsDir, { recursive: true });
  }

  // API 1: Save Permanent Assets to physical files & source code
  app.post('/api/save-permanent-asset', async (req: Request, res: Response) => {
    try {
      const {
        avatarDataUrl,
        avatarConfig,
        bgDataUrl,
        bgConfig,
      } = req.body;

      let savedAvatar = false;
      let savedBg = false;

      // 1. Process Avatar Photo
      if (avatarDataUrl && typeof avatarDataUrl === 'string' && avatarDataUrl.startsWith('data:image/')) {
        const matches = avatarDataUrl.match(/^data:image\/([a-zA-Z0-9+.-]+);base64,(.+)$/);
        if (matches && matches[2]) {
          const buffer = Buffer.from(matches[2], 'base64');
          const targetPath = path.resolve(publicAssetsDir, 'driver-profile.jpg');
          fs.writeFileSync(targetPath, buffer);
          savedAvatar = true;

          // Also mirror to dist if dist exists
          const distAssets = path.resolve(__dirname, 'dist', 'assets');
          if (fs.existsSync(distAssets)) {
            fs.writeFileSync(path.resolve(distAssets, 'driver-profile.jpg'), buffer);
          }
        }
      }

      // 2. Process Background Image
      if (bgDataUrl && typeof bgDataUrl === 'string' && bgDataUrl.startsWith('data:image/')) {
        const matches = bgDataUrl.match(/^data:image\/([a-zA-Z0-9+.-]+);base64,(.+)$/);
        if (matches && matches[2]) {
          const buffer = Buffer.from(matches[2], 'base64');
          const targetPath = path.resolve(publicAssetsDir, 'driver-background.jpg');
          fs.writeFileSync(targetPath, buffer);
          savedBg = true;

          // Also mirror to dist if dist exists
          const distAssets = path.resolve(__dirname, 'dist', 'assets');
          if (fs.existsSync(distAssets)) {
            fs.writeFileSync(path.resolve(distAssets, 'driver-background.jpg'), buffer);
          }
        }
      }

      // 3. Update src/config/permanentSettings.ts with latest visual settings
      const configFilePath = path.resolve(__dirname, 'src', 'config', 'permanentSettings.ts');
      
      const newAvatarConfig = {
        photoUrl: '/assets/driver-profile.jpg',
        zoom: avatarConfig?.zoom ?? 100,
        positionX: avatarConfig?.positionX ?? 50,
        positionY: avatarConfig?.positionY ?? 50,
      };

      const newBgConfig = {
        imageUrl: '/assets/driver-background.jpg',
        opacity: bgConfig?.opacity ?? 22,
        position: bgConfig?.position ?? 'center',
        size: bgConfig?.size ?? 'cover',
        scale: bgConfig?.scale ?? 100,
        repeat: Boolean(bgConfig?.repeat),
        overlayColor: bgConfig?.overlayColor ?? 'none',
        overlayOpacity: bgConfig?.overlayOpacity ?? 0,
      };

      const updatedConfigCode = `/**
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
  zoom: number;
  positionX: number;
  positionY: number;
}

export interface PermanentBackgroundConfig {
  imageUrl: string;
  opacity: number;
  position: string;
  size: 'contain' | 'cover' | 'custom';
  scale: number;
  repeat: boolean;
  overlayColor: string;
  overlayOpacity: number;
}

export interface PermanentAppConfig {
  version: string;
  avatar: PermanentAvatarConfig;
  background: PermanentBackgroundConfig;
  lastUpdated: string;
}

export const PERMANENT_DEFAULT_CONFIG: PermanentAppConfig = {
  version: '2.0.0',
  avatar: ${JSON.stringify(newAvatarConfig, null, 4).replace(/"([^"]+)":/g, '$1:')},
  background: ${JSON.stringify(newBgConfig, null, 4).replace(/"([^"]+)":/g, '$1:')},
  lastUpdated: ${JSON.stringify(new Date().toISOString())},
};
`;

      fs.writeFileSync(configFilePath, updatedConfigCode, 'utf-8');

      return res.status(200).json({
        success: true,
        savedAvatar,
        savedBg,
        message: 'Aset gambar dan konfigurasi visual berhasil disimpan secara permanen ke source code!',
      });
    } catch (error: unknown) {
      console.error('Error saving permanent asset:', error);
      const errMsg = error instanceof Error ? error.message : 'Unknown error';
      return res.status(500).json({
        success: false,
        error: errMsg,
      });
    }
  });

  // API 2: Query Current Permanent Status
  app.get('/api/permanent-status', (_req: Request, res: Response) => {
    const avatarPath = path.resolve(publicAssetsDir, 'driver-profile.jpg');
    const bgPath = path.resolve(publicAssetsDir, 'driver-background.jpg');

    res.json({
      avatarFileExists: fs.existsSync(avatarPath),
      avatarFileSize: fs.existsSync(avatarPath) ? fs.statSync(avatarPath).size : 0,
      bgFileExists: fs.existsSync(bgPath),
      bgFileSize: fs.existsSync(bgPath) ? fs.statSync(bgPath).size : 0,
      environment: process.env.NODE_ENV || 'development',
    });
  });

  // Development: Mount Vite Middlewares
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        allowedHosts: true,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production fallback: Static dist files
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
