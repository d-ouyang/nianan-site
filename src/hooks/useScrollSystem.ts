/**
 * 滚动系统：Lenis（惯性平滑滚动）+ GSAP ScrollTrigger（区块判定）的对接层。
 *
 * 两个设计决定：
 *
 * 1) **Lenis 与 GSAP 必须显式对接**。两边各有自己的 rAF 循环，不接会各跑各的 ——
 *    现象是滚动位置与动画进度错位半拍，快速滚动时尤其明显，而且不报错，只是「感觉不对」。
 *    对接就三件事：Lenis 滚动 → 通知 ScrollTrigger 更新；GSAP ticker 驱动 Lenis 的 raf；
 *    关掉 GSAP 的 lagSmoothing（它会吞帧，让 Lenis 的插值失真）。
 *
 * 2) **GSAP 走动态 import**。它 gzip 45KB，是全部依赖里最重的一块，而首屏根本用不到
 *    （没人一进页面就滚动）。按需加载后首屏 JS 从 183KB 降到 137KB。
 *    代价是「加载完成前点 Dock 锚点」会回落到原生跳转（不丝滑但仍可用），
 *    这个降级是安全的，因为 Lenis 未就绪时本来就不该假装自己能平滑滚动。
 */

import { useEffect, useState } from 'react';
import { SECTIONS, type SectionId } from '@/lib/sections';

interface LenisLike {
  scrollTo: (target: string | HTMLElement, options?: { duration?: number; immediate?: boolean }) => void;
  on: (event: 'scroll', cb: () => void) => void;
  raf: (time: number) => void;
  destroy: () => void;
}

/** 模块级单例：Dock 等组件不必层层透传实例 */
let lenis: LenisLike | null = null;

/** 锚点跳转。Lenis 未就绪（或 reduced-motion）时回落到原生滚动 */
export function scrollToId(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;

  if (lenis) {
    lenis.scrollTo(el, { duration: 1.15 });
  } else {
    el.scrollIntoView();
  }
}

/** 是否处于「减弱动效」模式 —— 滚动、shader、动画一致遵守同一个判断 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function useScrollSystem(): SectionId | null {
  const [active, setActive] = useState<SectionId | null>(null);

  // 1) Lenis 接管滚动，并与 GSAP 的 ticker 合流。
  //    reduced-motion 时整段跳过 —— 这类用户要的是「别给我做平滑」，直接用原生滚动。
  useEffect(() => {
    if (prefersReducedMotion()) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    void (async () => {
      const [lenisMod, gsapMod, stMod] = await Promise.all([
        import('lenis'),
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (disposed) return;

      const Lenis = lenisMod.default;
      const gsap = gsapMod.default;
      const { ScrollTrigger } = stMod;
      gsap.registerPlugin(ScrollTrigger);

      const instance = new Lenis({
        duration: 1.05,
        // 指数衰减缓动：起步快、收尾长，是「顺滑」体感的关键
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      }) as unknown as LenisLike;
      lenis = instance;

      instance.on('scroll', ScrollTrigger.update);

      const tick = (time: number) => instance.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      // 带 hash 直接进入时定位。Lenis 接管后浏览器原生锚点跳转会被打断，
      // 不补这一步，从外部链接跳到 #projects 会停在页面顶部。
      const hash = window.location.hash.slice(1);
      if (hash) {
        instance.scrollTo(`#${hash}`, { immediate: true });
      }

      // Lenis 会给 html 加 class 并放开高度，文档高度可能变化，重新量一次
      ScrollTrigger.refresh();

      cleanup = () => {
        gsap.ticker.remove(tick);
        instance.destroy();
        if (lenis === instance) lenis = null;
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  // 2) 当前区块判定。
  //    ⚠️ 与上面的 Lenis 分开：区块高亮和 URL hash 跟「要不要平滑滚动」无关，
  //    之前把它俩写在一个 effect 里，导致 reduced-motion 用户整个导航都是死的（高亮不动、hash 不更新）。
  //    用 ScrollTrigger 而不是 IntersectionObserver，是因为 P0-4 的滚动叙事与
  //    P1-6 的路径绘制都要靠它，一套滚动观测比两套好维护。
  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;

    void (async () => {
      const [gsapMod, stMod] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (disposed) return;

      const gsap = gsapMod.default;
      const { ScrollTrigger } = stMod;
      gsap.registerPlugin(ScrollTrigger);

      const triggers = SECTIONS.map((section) =>
        ScrollTrigger.create({
          trigger: `#${section.id}`,
          // 区块中心越过视口中心时才切换 —— 用 top/bottom 边界会在大区块上过早或过晚跳变
          start: 'top center',
          end: 'bottom center',
          onToggle: (self: { isActive: boolean }) => {
            if (self.isActive) setActive(section.id);
          },
        }),
      );

      // 首次进入先算一次，避免要等用户滚动才亮起第一个区块
      ScrollTrigger.refresh();

      cleanup = () => triggers.forEach((t) => t.kill());
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  // 3) URL hash 与当前区块同步。用 replaceState 而不是 location.hash：
  //    后者会触发浏览器锚点跳转，与 Lenis 打架，还会往历史里塞一堆记录。
  useEffect(() => {
    if (!active) return;
    if (window.location.hash.slice(1) === active) return;
    history.replaceState(null, '', `#${active}`);
  }, [active]);

  return active;
}
