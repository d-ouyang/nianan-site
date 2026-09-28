import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    // 必须显式绑 127.0.0.1：Vite 默认 host 是 `localhost`，在 macOS 上会被解析成 ::1，
    // 结果只监听 IPv6 —— curl / 截图脚本走 127.0.0.1 直接 ERR_CONNECTION_REFUSED，
    // 而 `npm run dev` 的日志看起来一切正常，很容易误判成「服务没起来」。
    host: '127.0.0.1',
    // 固定端口 + strictPort：rag-qa-system 的前端 dev 占着 5173，这里错开；
    // 端口被占时直接报错，不要静默漂移到 5174（漂移会让 curl 打错端口）。
    port: 5180,
    strictPort: true,
  },
  build: {
    target: 'es2022',
    // 构建产物带 hash，可长缓存；index.html 由 nginx 单独禁缓存
    assetsDir: 'assets',
  },
});
