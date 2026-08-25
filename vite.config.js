import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        membros: resolve(__dirname, 'membros.html'),
        membrosBasico: resolve(__dirname, 'membros-basico.html'),
        slugCompletoFile: resolve(__dirname, 'COD-22U2A3K8F4R57T.html'),
        slugBasicoFile: resolve(__dirname, 'COD-BASICO-99X7B2K3M1.html'),
        slugCompleto: resolve(__dirname, 'COD-22U2A3K8F4R57T/index.html'),
        slugBasico: resolve(__dirname, 'COD-BASICO-99X7B2K3M1/index.html'),
      },
    },
  },
});
