import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/test_02/', // 确保这里的名称与您的 GitHub 仓库名称一致
})
