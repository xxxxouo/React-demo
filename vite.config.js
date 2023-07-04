import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import AutoImport from 'unplugin-auto-import/vite'
import eslintPlugin from 'vite-plugin-eslint'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),  
    AutoImport({
      imports: ['react', 'react-router-dom'],
      eslintrc: {enabled: true}
    }),
    // eslintPlugin({
    //   include: ['./src/**/*.jsx', './src/**/*.js'],
    //   fix: false, // 是否自动修复
    // })
  ],
  base: '/',
  resolve: {
    // 配置 @别名   需要安装yarn add @types/node -D
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    host: true
  }
})
