import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base обязателен: проект публикуется на GitHub Pages по адресу
// https://msilkov.github.io/snapbuild-landingpage/
export default defineConfig({
  base: '/snapbuild-landingpage/',
  plugins: [react(), tailwindcss()],
})
