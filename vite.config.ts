import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Repo is deployed to GitHub Pages under /svx-getting-started-guide/.
// Use "/" in dev so local URLs stay clean.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/svx-getting-started-guide/' : '/',
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    // Allow the dev server to be reached through an ngrok tunnel.
    allowedHosts: [".ngrok-free.dev", ".ngrok-free.app", ".ngrok.app", ".ngrok.io"],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}))
