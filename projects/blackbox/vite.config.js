import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// 課程總站 course-web 內的黑盒子頁原始碼。
// build 直接輸出到上線路徑 course-web/interactiondesign/blackbox/，
// 網址 = https://course.interaction.tw/interactiondesign/blackbox/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/interactiondesign/blackbox/',
  build: {
    outDir: '../../interactiondesign/blackbox',
    emptyOutDir: true,
  },
})
