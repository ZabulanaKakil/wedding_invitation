import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

// Relative base works for GitHub Pages project sites and local preview.
export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
    {
      // Local `/` should load the Vite app, not the GitHub Pages redirect.
      name: 'dev-root-to-app',
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (req.url === '/' || req.url?.startsWith('/?')) {
            req.url = '/index.dev.html'
          }
          next()
        })
      },
    },
    {
      // Emit production HTML as dist/index.html
      name: 'rename-dev-html',
      enforce: 'post',
      generateBundle(_options, bundle) {
        const html = bundle['index.dev.html']
        if (html && html.type === 'asset') {
          html.fileName = 'index.html'
        }
      },
    },
  ],
  server: {
    host: true,
    port: 5173,
  },
  build: {
    rollupOptions: {
      input: resolve(__dirname, 'index.dev.html'),
    },
  },
})
