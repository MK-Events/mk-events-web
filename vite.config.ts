import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

const resolvedApiTarget = process.env.VITE_API_URL ?? 'http://localhost:3000';

export default defineConfig({
  base: '/',
  envPrefix: ['VITE_', 'NODE_'],
  server: {
    proxy: {
      '/api': {
        target: resolvedApiTarget,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  resolve: { tsconfigPaths: true },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      devOptions: {
        enabled: false,
      },
      includeAssets: [
        'favicon-16x16.png',
        'favicon-32x32.png',
        'favicon-64x64.png',
        'apple-touch-icon.png',
      ],
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        globIgnores: ['**/EventTicketDownload-*.js', '**/*pdf*.js', '**/stats.html'],
      },
      manifest: false,
    }),
    visualizer({
      filename: './dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [fileURLToPath(new URL('./src', import.meta.url))],
      },
    },
  },
});
