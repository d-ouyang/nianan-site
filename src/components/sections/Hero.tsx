import { useMemo } from 'react';
import { motion } from 'motion/react';
import Aurora from '@/components/bits/Aurora';
import { canRunWebGL } from '@/lib/capabilities';

const NAME = '欧阳鼎';
const TAGLINE = '前端 · AI Agent 工程 · 科幻写作';

/** WebGL 不可用时的静态降级：同色相的一次性辉光，不跑 shader */
function StaticGlow() {
  return (
    <div
      className="h-full w-full"
      style={{
        background:
          'radial-gradient(100% 70% at 50% 6%, rgb(var(--na-accent-rgb) / 0.22) 0%, rgb(var(--na-accent-rgb) / 0.06) 45%, transparent 72%)',
      }}
    />
  );
}

export default function Hero() {
  // 只在挂载时判断一次：页面加载时的视口与系统设置决定走 shader 还是静态渐变，
  // 中途拉伸窗口不重新初始化（重新创建 WebGL 上下文的代价远大于收益）。
  const useShader = useMemo(() => canRunWebGL(), []);

  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-canvas">
      {/* 背景层 */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {useShader ? <Aurora amplitude={1.0} blend={0.5} speed={1.0} /> : <StaticGlow />}
        {/* 压暗 + 底部渐隐：既保证文字可读，也让极光与下一屏之间不出现硬边 */}
        <div className="absolute inset-0 bg-canvas/35" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-canvas" />
      </div>

      {/* 内容层 */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.p
          className="font-mono text-xs uppercase tracking-[0.22em] text-accent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          nianan.site
        </motion.p>

        <h1 className="mt-5 text-hero font-medium tracking-tight">
          {NAME.split('').map((char, i) => (
            <motion.span
              key={`${char}-${i}`}
              className="inline-block"
              initial={{ opacity: 0, y: '0.35em', filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                delay: 0.18 + i * 0.09,
                duration: 0.85,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {char}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="mt-5 text-base text-muted"
          initial={{ opacity: 0, y: '0.6em' }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {TAGLINE}
        </motion.p>
      </div>

      {/* 滚动提示：纯 CSS 动画，不占 JS 主线程 */}
      <div
        className="relative z-10 mt-24 h-12 w-px bg-line-strong"
        aria-hidden="true"
      >
        <span className="na-scroll-hint absolute inset-x-0 top-0 h-3 bg-accent" />
      </div>
    </section>
  );
}
