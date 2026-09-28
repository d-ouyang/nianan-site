# nianan-site

个人主页，部署于 `nianan.site` 根域名（静态托管，零常驻进程）。

选型论证与分期计划见 `../个人主页-技术选型与实施计划.md`；部署拓扑（与 `qa.nianan.site` 共存）见 `../rag-qa-system/docs/部署方案-子域名.md`。

## 技术栈

- Vite 7 + React 19 + TypeScript（strict）
- Tailwind CSS v4（`@tailwindcss/vite`，CSS-first 配置）
- 动效（按期引入，不提前装）：motion / GSAP + ScrollTrigger / Lenis / ogl

## 命令

```bash
pnpm install        # 依赖管理以 pnpm 为准
pnpm dev            # http://127.0.0.1:5180（端口固定，被占直接报错不漂移）
pnpm build          # tsc -b && vite build → dist/
pnpm preview        # 本地预览构建产物
```

## 目录约定

```
src/
  styles/tokens.css   设计令牌：全站唯一的颜色/字体/字号来源，业务代码禁止写死色值
  styles/base.css     基础层：滚动条、selection、focus、reduced-motion 兜底
  components/bits/    reactbits 组件源码（复制进仓库，标注来源，便于升级）
  components/sections/ 页面区块（Hero / About / Skills ...）
  lib/                工具函数
```

## 硬规则

1. **单一强调色**：全站只有 `--color-accent` 一个色相，靠明度与透明度分级，不引入第二个色相。
2. **中文不上 Web Font**：中文走系统栈（PingFang SC / Noto Sans SC），只有英文/数字用子集化的可变字体。一个中文包 3–5MB，会直接打死 LCP。
3. **性能预算**：首屏 JS gzip < 200KB；LCP < 2.5s；同时运行的 WebGL canvas ≤ 1；离屏暂停 rAF。
4. **动效必须有语义**（强调/引导/反馈），纯装饰动效限制在 Hero 一屏内。
5. **Tailwind v4 坑**：`@theme` 里字号变量的 line-height 必须写成独立的 `--text-{name}--line-height`，不能用 `size / height` 简写 —— 遇到 `clamp()` 里的逗号会解析错乱。

## 部署（备案通过后）

```bash
pnpm build
rsync -avz --delete dist/ user@host:/var/www/personal/   # 原子发布：先传 .new 再 mv
```

nginx server 块（静态 + 长缓存 assets / 禁缓存 index.html）见选型文档 §5.2；证书为 certbot 通配符 `*.nianan.site`（DNS-01）。
