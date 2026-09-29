import { motion } from 'motion/react';
import { SECTIONS, type SectionId } from '@/lib/sections';
import { scrollToId } from '@/hooks/useScrollSystem';

interface DockProps {
  active: SectionId | null;
}

/**
 * 底部悬浮导航。
 *
 * 高亮用 motion 的 layoutId 做「滑动指示器」而不是给每个按钮单独加上底色：
 * 前者在两个区块之间切换时是一块底色滑过去，后者是原地闪现。差别不大但一眼能看出。
 */
export default function Dock({ active }: DockProps) {
  return (
    <nav
      aria-label="页面导航"
      // ⚠️ 用 inset-x-0 + flex justify-center 居中，不能用 left-1/2 -translate-x-1/2：
      // 后者会让 fixed 元素的可用宽度只剩视口一半，容器被压扁后中文标签会竖排断行
      // （窄屏上「首页」被拆成上下两个字），而横向溢出检查还显示「没溢出」，很能骗人。
      className="fixed inset-x-0 bottom-5 z-50 flex justify-center px-4 sm:bottom-7"
    >
      <ul className="flex items-center gap-0.5 whitespace-nowrap rounded-full border border-line bg-surface/70 p-1.5 backdrop-blur-xl">
        {SECTIONS.map((section) => {
          const isActive = active === section.id;
          return (
            <li key={section.id}>
              <button
                type="button"
                onClick={() => scrollToId(section.id)}
                aria-current={isActive ? 'true' : undefined}
                className={`relative rounded-full px-2.5 py-1.5 text-[11px] transition-colors sm:px-3.5 sm:text-xs ${
                  isActive ? 'text-canvas' : 'text-muted hover:text-fg'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="dock-active"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{section.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
