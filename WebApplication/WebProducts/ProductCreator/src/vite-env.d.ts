/// <reference types="vite/client" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/apm': {
                target: 'https://769b94d4ec4345f3be3a1881af2d19d3.apm.us-central1.gcp.cloud.es.io:443',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/apm/, ''),
            },
        },
    },
});