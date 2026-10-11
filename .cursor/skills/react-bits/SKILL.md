---
name: react-bits
description: >-
  Integrates a React Bits component into nianan-site from the user's four
  inputs (提示词, 示例代码, 源码, CLI) plus the effect's purpose. Use when the
  user pastes a React Bits prompt, usage example, component source, or
  `npx shadcn add @react-bits`, or asks to add a reactbits.dev motion effect.
---

# React Bits 动效接入

用户一次给出四样东西，再加上这段动效用来做什么：

1. 提示词（组件名、变体、依赖、Props）
2. 示例代码
3. 源码（TSX，以及同条消息里的 CSS）
4. CLI（`npx shadcn@latest add @react-bits/...`）

动效目的优先于示例里的原始场景。示例写 Send，目的写回到顶部，就做成回到顶部。

## 接入

1. 依赖按提示词安装。`motion` 已在项目里，不要重复加。用 pnpm。装不上时看 `pnpm-workspace.yaml` 的 `allowBuilds`，不要改 git config。
2. 组件放到 `src/components/bits/`，CSS 同目录，`import './Name.css'`。这是 Vite，删掉 `'use client'`。
3. 源码按给出的实现抄进来。只改目的必需的部分：无障碍名称、文案、以及调用方传入的 props。不要重写交互。
4. 颜色只用站点已有色，不新增色相：
   - 强调 `#00E0A4`，亮一档 `#5CFFD0`，深一档 `#00997A`
   - 底 `#09090B`，卡片 `#121215`，字 `#ECECEE`，弱字 `#9A9AA3` / `#63636C`
5. 出现/消失（例如滚过一屏后 bounce 进入）包在组件外面，用 `motion`。组件自己的拖拽、悬停、点击保持原样。
6. `fixed` 控件避开底部 Dock（`fixed inset-x-0 bottom-5 z-50`）。放在它上方，不要盖住导航。
7. 滚动回某区块用 `scrollToId`（`src/hooks/useScrollSystem.ts`）。
8. 浏览器里验证：出现时机、进入动画、组件自己的交互、目的里的结果（例如回到首页）。减弱动效时不做弹跳。
9. 用中文说明做了什么。用户没要求就不要提交。
