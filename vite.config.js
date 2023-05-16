import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base:'/',
  resolve:{
    // 配置 @别名   需要安装yarn add @types/node -D
    alias:{
      '@': path.resolve(__dirname,'src')
    }
  },
  server: {
    host: true
  }
})
