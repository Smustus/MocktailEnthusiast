/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], //Array of plugins to use.
  base: "/", //Base public path when served in development or production.
  preview: { //An object for the Build preview options
    port: 8080, //
    strictPort: true,
  },
  server: { //An object for the Server options
    port: 8080, //Specify server port. Note if the port is already being used, Vite will automatically try the next available port so this may not be the actual port the server ends up listening on.
    strictPort: true, //Set to true to exit if the port is already in use, instead of automatically trying the next available port.
    host: true, //Specify which IP addresses the server should listen on. Set this to 0.0.0.0 or true to listen to all addresses, including LAN and public addresses
    origin: "http://0.0.0.0:8080", //Defines the origin of the generated asset URLs during development.
 },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js'
  },
})