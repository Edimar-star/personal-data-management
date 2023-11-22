import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
dotenv.config()
const { VITE_APP_DOCKER_PORT } = process.env;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: VITE_APP_DOCKER_PORT, // This is the port which we will use in docker
  }
})
