import { motion, useScroll, useSpring } from 'motion/react';

/**
 * 右侧滚动进度条。
 *
 * 用 useSpring 包一层 scrollYProgress：直接绑原始进度时，滚轮一格它会跳一格，
 * 加弹簧后是一段短促的追赶，观感上「跟手」得多。
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden="true"
      className="fixed right-6 top-1/2 z-40 hidden h-40 w-px -translate-y-1/2 bg-line md:block"
    >
      <motion.div
        data-scroll-progress
        className="h-full w-full origin-top bg-accent"
        style={{ scaleY }}
      />
    </div>
  );
}
