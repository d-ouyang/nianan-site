# nianan-site

欧阳鼎的个人主页，一页简历，部署在 `nianan.site`（静态托管，零常驻进程）。

当前版本 0.8.0。选型与分期见 [docs/选型与实施计划.md](docs/选型与实施计划.md)，进度见 [docs/PLAN.md](docs/PLAN.md)，版本记录见 [docs/CHANGELOG.md](docs/CHANGELOG.md)。

## 页面

从上到下是首页、技能、项目、经历、联系。底部导航的文案只来自 `src/lib/sections.ts`，加区块只改这一处。

- 整页一层 MicroSlats 背景，内容卡片用毛玻璃透出格子
- 名字用 TechText 画在画布上，英文名和角色写在下面
- 首页跳转和底部导航悬停时出现瞄准框
- 滚过首屏后，右下角出现回到顶部
- 技能分成四组文件夹，悬停或点翻盖打开
- 经历按时间轴排列，教育经历接在下面

## 技术栈

- Vite 7 + React 19 + TypeScript（strict）
- Tailwind CSS v4（`@tailwindcss/vite`，CSS-first 配置）
- 动效：ogl（整页背景）+ motion（UI 动画）+ GSAP ScrollTrigger 与 Lenis（滚动，动态加载）
- 技能文件夹用 matter-js，回到顶部的图标用 Hugeicons

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
  content/profile.ts    简历内容：姓名、技能、项目、经历、联系
  lib/sections.ts       导航的唯一数据源
  styles/tokens.css     设计令牌：全站颜色、字体、字号
  styles/base.css       基础层：隐藏原生滚动条、selection、focus、reduced-motion
  components/bits/      动效组件（背景、名字、瞄准框、文件夹、回到顶部）
  components/sections/  页面区块
  components/ui/        导航、时间轴、滚动进度
```

## 硬规则

1. **单一强调色**：全站只有 `--color-accent` 一个色相，靠明度与透明度分级，不引入第二个色相。
2. **中文不上 Web Font**：中文走系统栈（PingFang SC / Noto Sans SC），只有英文和数字用子集化的可变字体。一个中文字体包 3–5MB，会直接拖慢首屏。
3. **性能预算**：首屏 JS gzip < 200KB；LCP < 2.5s；同时运行的 WebGL canvas ≤ 1；离屏暂停 rAF。背景画布保持挂载，不要在滚动时卸掉重建。
4. **动效要有用处**：用来强调、引导或给出反馈。整页只留一层背景动效。
5. **Tailwind v4 坑**：`@theme` 里字号变量的 line-height 必须写成独立的 `--text-{name}--line-height`，不能用 `size / height` 简写。遇到 `clamp()` 里的逗号会解析错乱。

## 部署

静态站点。构建后把 `dist/` 同步到托管目录：

```bash
pnpm build
rsync -avz --delete dist/ user@host:/var/www/personal/
```

带内容哈希的资源可以长缓存，`index.html` 不要缓存。
