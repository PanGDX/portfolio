import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {  
    const env = loadEnv(mode, process.cwd(), ''); // Fixed: use process.cwd() is safer
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      // We tell Vite to treat .md files as assets to be safe, 
      // though the ?raw import in the component handles the heavy lifting.
      assetsInclude: ['**/*.md'], 
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'), // Fixed: usually points to ./src
        }
      }
    };
});