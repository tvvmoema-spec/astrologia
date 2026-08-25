import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        membros: resolve(__dirname, 'membros.html'),
        slug: resolve(__dirname, 'COD-22U2A3K8F4R57T/index.html'),
      },
    },
  },
});
