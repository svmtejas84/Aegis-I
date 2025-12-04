import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ESM config so @vitejs/plugin-react (ESM) can be imported safely.
export default defineConfig({
  plugins: [react()]
})
