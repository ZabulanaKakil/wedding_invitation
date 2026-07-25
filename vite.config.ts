import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Relative base works for GitHub Pages project sites and local preview.
// Change to '/your-repo-name/' if asset paths break after you publish.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // listen on LAN so phones on the same Wi‑Fi can open the app
    port: 5173,
  },
})
