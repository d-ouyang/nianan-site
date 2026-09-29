# CHANGELOG

> 版本号规则：`MAJOR.MINOR.PATCH`
> - **MINOR**：完成计划里的一个任务（P0-1 → 0.1.0，P0-2 → 0.2.0 ……），进入 P1 后继续顺延
> - **PATCH**：已发布功能的修补
> - 每个版本对应一份 `docs/iterations/v<版本>-<slug>.md` 迭代文档
> - 进度总览见 `docs/PLAN.md`

## 版本流水

| 版本 | 日期 | 内容 | commit |
|---|---|---|---|
| 0.5.1 | 2026-09-29 | P0-4b 补：SplashCursor 流体特效扩展到「关于」屏（Stub 加 `fluid` 开关）、splat 可见度 0.15→0.42 | （见 git log） |
| 0.5.0 | 2026-09-29 | P0-4b Hero 交互收口：SplashCursor 鼠标流体特效（限定 Hero 内）、Dock 高亮修复（补 #hero id + 中线判定）、移除滚动提示 | （见 git log） |
| 0.4.0 | 2026-09-29 | P0-4 reactbits 动效层：MicroSlats 交互式 Hero 背景，替换 Aurora，单一强调色 | （见 git log） |
| 0.3.0 | 2026-09-29 | P0-3 滚动与导航：Lenis + ScrollTrigger 对接、Dock、进度条、hash 同步 | `9967794` |
| 0.2.0 | 2026-09-28 | P0-2 Hero：Aurora shader 背景 + 名字逐字揭示 + 双路降级 | `96f4c7c` |
| 0.1.0 | 2026-09-28 | P0-1 项目骨架：Vite/React19/TS/Tailwind v4 + 设计令牌 | `23840e3` |
