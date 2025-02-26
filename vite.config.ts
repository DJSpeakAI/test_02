import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // 删除 base 配置，因为 Vercel 不需要
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
