import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/仓库名/', // 替换成您的 GitHub 仓库名
})
