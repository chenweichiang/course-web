import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// 課程總站 course-web 內的設計思考課程頁原始碼。
// build 直接輸出到上線路徑 course-web/designthinking/，
// 網址 = https://course.interaction.tw/designthinking/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/designthinking/',
  build: {
    outDir: '../../designthinking',
    emptyOutDir: true,
  },
})
