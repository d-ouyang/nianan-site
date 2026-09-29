import { useMemo } from 'react';
import { motion } from 'motion/react';
import MicroSlats from '@/components/bits/MicroSlats';
import SplashCursor from '@/components/bits/SplashCursor';
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
    <section id="hero" className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-canvas">
      {/* 背景层：MicroSlats 交互式流体 slats 替换原极光；无 WebGL2 时降级为静态辉光 */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {useShader ? (
          <>
            <div className="absolute inset-0">
              <MicroSlats
                className="h-full w-full"
                preset="swell"
                color="#00E0A4"
                glintColor="#9dffe6"
                backgroundColor="#09090B"
                interactive
                intro
                cursorStrength={1.1}
                lean={0.4}
              />
            </div>
            {/* 鼠标流体特效：限制在首页范围内，单一强调色，离屏自动暂停 */}
            <SplashCursor RAINBOW_MODE={false} COLOR="#00E0A4" DYE_RESOLUTION={1024} />
          </>
        ) : (
          <StaticGlow />
        )}
        {/* 中心暗角：保证标题可读；底部渐隐：与下一屏自然过渡 */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgb(9_9_11/0.5),transparent_62%)]" />
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
    </section>
  );
}
