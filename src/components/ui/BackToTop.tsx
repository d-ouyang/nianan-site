import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import SlingButton from '@/components/bits/SlingButton';
import { scrollToId } from '@/hooks/useScrollSystem';

/** 离开首屏后再出现，避免和首页卡片抢位置。 */
const SHOW_AFTER = 0.75;

export default function BackToTop() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > window.innerHeight * SHOW_AFTER);
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed right-16 bottom-28 z-40 sm:right-24 sm:bottom-32"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 36, scale: 0.6 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.8 }}
          transition={reduce ? { duration: 0.15 } : { type: 'spring', bounce: 0.45, duration: 0.55 }}
        >
          <SlingButton
            ariaLabel="回到顶部"
            onSend={() => scrollToId('home')}
            padColor="#00E0A4"
            iconColor="#09090B"
            accentColor="#5CFFD0"
            wellColor="#121215"
            bandColor="#63636C"
            size={52}
            axis="vertical"
            tapSends
            recoil={0.35}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
