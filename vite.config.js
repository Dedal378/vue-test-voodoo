import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
// change base: to your repo name /repo/
export default defineConfig({
  plugins: [vue()],
  base: '/vue3-bootstrap-template/',
})
