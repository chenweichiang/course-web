import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

const dirname = import.meta.dirname

// 課程總站 course-web 內的物件導向程式設計課程頁原始碼。
// build 直接輸出到上線路徑 course-web/oop/，
// 網址 = https://course.interaction.tw/oop/
// gallery/ 是第二個入口（作業牆），輸出到 /oop/gallery/；
// 作業牆資料 = public/gallery/students.json（改名單後重 build 即上線）。
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/oop/',
  build: {
    outDir: '../../oop',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(dirname, 'index.html'),
        gallery: resolve(dirname, 'gallery/index.html'),
      },
    },
  },
})
