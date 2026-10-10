import type { SectionMeta } from '@/lib/sections';

/**
 * 技能 / 联系的占位区块。
 *
 * 滚动系统需要这些锚点才能做 Dock 高亮与跳转；真实内容后续再替换。
 */
export default function Stub({ id, label }: SectionMeta) {
  return (
    <section id={id} className="relative flex min-h-dvh items-center justify-center overflow-hidden">
      <div className="relative z-10 text-center">
        <h2 className="text-3xl font-medium">{label}</h2>
        <p className="mt-3 font-mono text-xs text-faint">{id} · P0-4 填充内容</p>
      </div>
    </section>
  );
}
