/**
 * P0-1 骨架占位页。
 *
 * 这一屏唯一的目的：证明「暗色底 + 单一强调色 + 字号阶梯」这套令牌已经生效。
 * P0-2 会整屏替换成真正的 Hero（ogl shader 背景），这里不留任何结构。
 */

const TOKENS = [
  { label: 'canvas', dot: 'bg-canvas', ring: 'border-line-strong' },
  { label: 'surface', dot: 'bg-surface', ring: 'border-line' },
  { label: 'surface-2', dot: 'bg-surface-2', ring: 'border-line' },
  { label: 'accent', dot: 'bg-accent', ring: 'border-accent' },
  { label: 'muted', dot: 'bg-muted', ring: 'border-muted' },
];

export default function App() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-canvas px-6 text-fg">
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
        nianan.site
      </p>

      <h1 className="mt-5 text-hero font-medium tracking-tight">欧阳鼎</h1>

      <p className="mt-4 text-base text-muted">前端 · AI Agent 工程 · 科幻写作</p>

      <ul className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
        {TOKENS.map((token) => (
          <li key={token.label} className="flex items-center gap-2">
            <span
              className={`size-2.5 rounded-full border ${token.dot} ${token.ring}`}
            />
            <span className="font-mono text-xs text-faint">{token.label}</span>
          </li>
        ))}
      </ul>

      <p className="mt-14 font-mono text-xs text-faint">
        P0-1 骨架已就绪 · Hero 在 P0-2
      </p>
    </main>
  );
}
