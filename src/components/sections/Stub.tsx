import { useMemo } from 'react';
import type { SectionMeta, SectionId } from '@/lib/sections';
import SplashCursor from '@/components/bits/SplashCursor';
import { canRunWebGL } from '@/lib/capabilities';

/**
 * P0-3 的区块占位。
 *
 * 滚动系统需要「有多个区块」才能验证锚点与高亮，所以先把锚点立起来；
 * P0-4 会逐个替换成真实内容，Dock / 进度条 / hash 同步都不必改（它们只认 SECTIONS）。
 *
 * `fluid`：是否在该屏叠加 SplashCursor 鼠标流体（限定在本屏内，与首页同款）。
 * 默认 false——只有明确要的屏（如「关于」）才开，避免每个占位屏都多一个 WebGL 上下文。
 *
 * ⚠️ v0.5.2：流体只在「本屏是当前屏（active===id）」时才挂载。独占挂载保证任一时刻
 * 最多一个重负载 WebGL2 特效存活，避免与首屏 MicroSlats/SplashCursor 争夺 GPU 上下文
 * 资源导致本屏流体静默失效。
 */
export default function Stub({
  id,
  label,
  fluid = false,
  active,
}: SectionMeta & { fluid?: boolean; active?: SectionId | null }) {
  const useFluid = useMemo(() => fluid && canRunWebGL() && active === id, [fluid, active, id]);

  return (
    <section
      id={id}
      className="relative flex min-h-dvh items-center justify-center overflow-hidden border-t border-line/60"
    >
      {/* 流体背景层：限定本屏且独占挂载，离屏自动卸载释放上下文，与首页同源同色 */}
      {useFluid && (
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <SplashCursor RAINBOW_MODE={false} COLOR="#00E0A4" DYE_RESOLUTION={1024} />
          {/* 中心暗角：保证文字在亮色墨点上仍可读 */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgb(9_9_11/0.45),transparent_62%)]" />
        </div>
      )}
      <div className="relative z-10 text-center">
        <h2 className="text-3xl font-medium">{label}</h2>
        <p className="mt-3 font-mono text-xs text-faint">{id} · P0-4 填充内容</p>
      </div>
    </section>
  );
}
