import type { SectionMeta } from '@/lib/sections';

/**
 * P0-3 的区块占位。
 *
 * 滚动系统需要「有多个区块」才能验证锚点与高亮，所以先把锚点立起来；
 * P0-4 会逐个替换成真实内容，Dock / 进度条 / hash 同步都不必改（它们只认 SECTIONS）。
 */
export default function Stub({ id, label }: SectionMeta) {
  return (
    <section
      id={id}
      className="flex min-h-dvh items-center justify-center border-t border-line/60"
    >
      <div className="text-center">
        <h2 className="text-3xl font-medium">{label}</h2>
        <p className="mt-3 font-mono text-xs text-faint">{id} · P0-4 填充内容</p>
      </div>
    </section>
  );
}
