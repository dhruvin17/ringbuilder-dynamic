// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';


export default defineConfig({
  build: {
    outDir: '../extensions/dynamic-ring-builder/assets', // go up into assets folder
    emptyOutDir: false,  // don't delete the whole folder
    rollupOptions: {
      input: './src/main.jsx',
      output: {
        entryFileNames: 'index.js',
      },
    },
  },
  plugins: [react() ,  cssInjectedByJsPlugin()],
});
