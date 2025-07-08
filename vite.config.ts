import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/', // 👈 Muy importante para GitHub Pages en la raíz
  plugins: [react()],
})