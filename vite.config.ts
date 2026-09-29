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
    rollupOptions: {
      output: {
        // 按库拆分：这些依赖版本稳定、几乎不变，单独成 chunk 后
        // 改业务代码不会让用户重新下载它们（缓存命中率高一大截）。
        // 用函数式而不是对象式：对象式只匹配包入口，react-dom/client 这类子路径
        // 会漏掉，结果 react-dom 仍被打进业务 chunk（index 里看不到它但体积没少）。
        manualChunks(id: string) {
          if (!id.includes('node_modules')) return;
          if (id.includes('react-dom') || id.includes('/react/')) return 'react';
          if (id.includes('motion') || id.includes('framer')) return 'motion';
          if (id.includes('gsap')) return 'gsap';
          if (id.includes('ogl')) return 'ogl';
          if (id.includes('lenis')) return 'lenis';
          return 'vendor';
        },
      },
    },
  },
});
