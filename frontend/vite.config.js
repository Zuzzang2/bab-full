import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());

    return {
        plugins: [react()],
        server: {
            proxy: {
                '/api': {
                    target: env.VITE_API_URL,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ''), //"/api" → "" 으로 바꿈
                    configure: (proxy) => {
                        proxy.on('proxyReq', (proxyReq, req) => {
                            console.log('[proxyReq]', req.method, req.url);
                        });
                        proxy.on('proxyRes', (proxyRes, req) => {
                            console.log(
                                '[proxyRes]',
                                req.method,
                                req.url,
                                proxyRes.statusCode,
                            );
                        });
                        proxy.on('error', (err, req) => {
                            console.error(
                                '[proxyError]',
                                req.method,
                                req.url,
                                err.message,
                            );
                        });
                    },
                },
            },
        },
    };
});
