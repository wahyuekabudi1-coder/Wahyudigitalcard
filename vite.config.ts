import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { defineConfig, Plugin } from 'vite';
import fs from 'fs';
import path from 'path';

function persistDefaultsPlugin(): Plugin {
  return {
    name: 'persist-defaults-plugin',
    configureServer(server) {
      server.middlewares.use('/api/persist-defaults', (req, res) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              const publicAssetsDir = path.resolve(process.cwd(), 'public/assets');
              if (!fs.existsSync(publicAssetsDir)) {
                fs.mkdirSync(publicAssetsDir, { recursive: true });
              }

              // Handle background image upload
              if (data.bgImageUrl && typeof data.bgImageUrl === 'string' && data.bgImageUrl.startsWith('data:image/')) {
                const matches = data.bgImageUrl.match(/^data:image\/([a-zA-Z+]+);base64,(.+)$/);
                if (matches) {
                  const buffer = Buffer.from(matches[2], 'base64');
                  fs.writeFileSync(path.join(publicAssetsDir, 'driver-background.jpg'), buffer);
                }
              }

              // Handle avatar photo upload
              if (data.avatarPhotoUrl && typeof data.avatarPhotoUrl === 'string' && data.avatarPhotoUrl.startsWith('data:image/')) {
                const matches = data.avatarPhotoUrl.match(/^data:image\/([a-zA-Z+]+);base64,(.+)$/);
                if (matches) {
                  const buffer = Buffer.from(matches[2], 'base64');
                  fs.writeFileSync(path.join(publicAssetsDir, 'driver-profile.jpg'), buffer);
                  fs.writeFileSync(path.join(publicAssetsDir, 'driver-wahyu-default.jpg'), buffer);
                }
              }

              // Update public/default-card-config.json
              const configPath = path.resolve(process.cwd(), 'public/default-card-config.json');
              const currentConfig = fs.existsSync(configPath) ? JSON.parse(fs.readFileSync(configPath, 'utf8')) : {};
              if (data.bgSettings) {
                currentConfig.bgSettings = {
                  ...data.bgSettings,
                  imageUrl: '/assets/driver-background.jpg?v=2',
                };
              }
              if (data.avatarSettings) {
                currentConfig.avatarSettings = {
                  ...data.avatarSettings,
                  photoUrl: '/assets/driver-wahyu-default.jpg',
                };
              }
              fs.writeFileSync(configPath, JSON.stringify(currentConfig, null, 2));

              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, message: 'Defaults permanently saved to disk' }));
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err?.message || 'Error saving defaults' }));
            }
          });
        } else {
          res.statusCode = 405;
          res.end('Method Not Allowed');
        }
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), persistDefaultsPlugin()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('.', import.meta.url)),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      allowedHosts: true as const,
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

