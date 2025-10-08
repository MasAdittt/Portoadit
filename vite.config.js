import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: [
      'firebase/app',
      'firebase/database', // Ganti dari firestore ke database
      'firebase/storage',
      'firebase/analytics',
      'lucide-react'
    ]
  },
  build: {
    commonjsOptions: {
      include: [/firebase/, /lucide-react/]
    }
  },
  resolve: {
    alias: {
      'lucide-react': 'lucide-react/dist/esm/lucide-react.js'
    }
  }
})