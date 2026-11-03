/**
 * 页面底部页脚：版权 + 工信部 ICP 备案 + 公安联网备案 + 隐私政策。
 *
 * 几个容易被忽略的约束：
 *
 * 1) **底部要留出足够的 padding**。Dock 是 `fixed bottom-5` 悬浮导航，页脚是文档流的最后一个
 *    元素，不加 padding-bottom 时备案信息会被 Dock 直接压住（滚到底也看不全、点不到链接）。
 *    这里给 pb-24（96px），覆盖 Dock 的 bottom-5 + 自身高度，窄屏宽屏都够。
 *
 * 2) **备案号必须指向官网且带 target/rel**。
 *    - 工信部 ICP 号 → 工信部官网首页 https://beian.miit.gov.cn/
 *    - 公安联网备案号 → 公安部公共查询页 https://beian.mps.gov.cn/#/query/webSearch
 *    这是《互联网信息服务管理办法》要求的展示形式，链接可点可跳转，不能只放纯文本。
 *    `rel="noopener noreferrer"` 防止新窗口拿到 window.opener，是外链标配。
 *
 * 3) **公安备案盾牌图标**：平台要求展示备案图标，这里用内联 SVG 盾牌（带对勾）代替外链图片，
 *    避免依赖外部图床导致图标加载失败/破图。颜色跟随链接（muted → hover fg）。
 */
import LogoMark from '@/components/bits/LogoMark';

export default function Footer() {
  // Vite 纯客户端渲染，没有 SSR 水合不一致的问题，直接取当前年份
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-canvas px-4 pt-10 pb-24 sm:pt-12 sm:pb-28">
      {/* 对齐用 items-center 而不是 items-baseline：左块含 20px SVG 标志、右行含 13px 盾牌图标，
          两者的「基线」都是图形底边而非文字基线，baseline 对齐会分别造成左块上浮、盾牌链接下沉。
          整行均为同字号 text-xs，居中对齐即等价于基线对齐，且对图标免疫。 */}
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <p className="flex items-center gap-2 text-xs text-muted">
          <LogoMark className="h-5 w-5 shrink-0 text-accent" aria-hidden />
          <span>© {year} 欧阳鼎</span>
        </p>

        {/* 备案行：flex-wrap 保证窄屏（≤768px）内部换行而不是撑出横向滚动条 */}
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center sm:justify-end sm:text-left">
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
            皖ICP备2026034021号-1
          </a>

          <span aria-hidden="true" className="text-xs text-muted">
            ·
          </span>
          {/* 公安联网备案：盾牌图标 + 备案号，链接到公安部公共查询页 */}
          <a
            href="https://beian.mps.gov.cn/#/query/webSearch"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-muted underline underline-offset-4 transition-colors hover:text-fg"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 2 4 5v6c0 5 3.5 8 8 11 4.5-3 8-6 8-11V5l-8-3z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />
              <path
                d="M8.5 12l2.5 2.5L16 9"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            皖公网安备34082602221189号
          </a>

          <span aria-hidden="true" className="text-xs text-muted">
            ·
          </span>
          <a
            href="/privacy.html"
            className="text-xs text-muted underline underline-offset-4 transition-colors hover:text-fg"
          >
            隐私政策
          </a>
        </div>
      </div>
    </footer>
  );
}
