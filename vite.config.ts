import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@layout': '/src/components/layout',
      '@sections': '/src/components/sections',
      '@ui': '/src/components/ui',
      '@assets': '/src/assets',
      '@hooks': '/src/hooks',
      '@types': '/src/types',
      '@utils': '/src/utils',
      '@pages': '/src/pages',
      '@styles': '/src/styles'
    }
  }
})