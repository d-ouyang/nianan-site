import { useState } from 'react';
import './LogoMark.css';

interface LogoMarkProps {
  /** 播放「一笔画出」入场动画 */
  animated?: boolean;
  /** 点击标志重播动画（仅 animated 时有意义） */
  replayOnClick?: boolean;
  /** 尺寸与颜色交给外部 className（如 h-12 w-12 text-accent） */
  className?: string;
  /** 纯装饰场景（如页脚版权旁）置 true，读屏不播报 */
  ariaHidden?: boolean;
}

/** 品牌标志的唯一几何：一笔连写 o→y→d，与 final/logo-oyd-final.svg 保持同源 */
const PATH_D =
  'M88 84 A32 32 0 1 1 110.6 138.6 L133 165 L148 106 A34 34 0 1 1 182 140 L191 60';

/**
 * nianan.site 品牌标志。
 *
 * 颜色跟随 currentColor（外层给 text-accent 即品牌绿），
 * 尺寸由外部 className 控制；animated 时沿笔顺一笔画出。
 * key={runId} 让重播通过重挂载 <svg> 实现（CSS 动画重触发最省事的方式）。
 */
export default function LogoMark({
  animated = false,
  replayOnClick = false,
  className = '',
  ariaHidden = false,
}: LogoMarkProps) {
  const [runId, setRunId] = useState(0);

  return (
    <svg
      key={runId}
      viewBox="58 27 179 179"
      role="img"
      aria-label={ariaHidden ? undefined : 'nianan.site 标志'}
      aria-hidden={ariaHidden || undefined}
      className={className}
      onClick={replayOnClick ? () => setRunId((n) => n + 1) : undefined}
      style={replayOnClick ? { cursor: 'pointer' } : undefined}
    >
      <path
        d={PATH_D}
        fill="none"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={100}
        className={animated ? 'logo-mark-draw' : undefined}
      />
    </svg>
  );
}
