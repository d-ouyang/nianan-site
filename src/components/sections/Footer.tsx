/**
 * 页面底部页脚：版权 + ICP 备案信息。
 *
 * 两个容易被忽略的约束：
 *
 * 1) **底部要留出足够的 padding**。Dock 是 `fixed bottom-5` 悬浮导航，页脚是文档流的最后一个
 *    元素，不加 padding-bottom 时备案信息会被 Dock 直接压住（滚到底也看不全、点不到链接）。
 *    这里给 pb-24（96px），覆盖 Dock 的 bottom-5 + 自身高度，窄屏宽屏都够。
 *
 * 2) **备案号必须指向工信部官网首页 https://beian.miit.gov.cn/** 且带 target/rel。
 *    这是《互联网信息服务管理办法》要求的展示形式，链接可点可跳转，不能只放纯文本。
 *    `rel="noopener noreferrer"` 防止新窗口拿到 window.opener，是外链标配。
 */
export default function Footer() {
  // Vite 纯客户端渲染，没有 SSR 水合不一致的问题，直接取当前年份
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-canvas px-4 pt-10 pb-24 sm:pt-12 sm:pb-28">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <p className="text-xs text-muted">© {year} 欧阳鼎</p>

        {/* 备案行：flex-wrap 保证窄屏（≤768px）内部换行而不是撑出横向滚动条 */}
        <div className="flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1 text-center sm:justify-end sm:text-left">
          <span className="text-xs text-muted">主办单位：欧阳鼎</span>
          <span aria-hidden="true" className="text-xs text-muted">
            ·
          </span>
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted underline underline-offset-4 transition-colors hover:text-fg"
          >
            皖ICP备2026034021号
          </a>
        </div>
      </div>
    </footer>
  );
}
