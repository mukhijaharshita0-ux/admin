// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      variables: path.resolve(__dirname, 'src/variables'),
      assets: path.resolve(__dirname, 'src/assets'),
      dash: path.resolve(__dirname, 'src/dash'),
    },
  },
  build: {
    outDir: 'dist',
  },
  // ✅ ensure _redirects file is copied from public to dist after build
  publicDir: 'public',
})

