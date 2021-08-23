import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  server: {
    host: '0.0.0.0',
  },
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: '@import "./src/styles/common.scss";',
      },
    },
  },
});
