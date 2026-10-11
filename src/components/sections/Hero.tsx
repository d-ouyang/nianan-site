import { useMemo, useRef } from 'react';
import MicroSlats from '@/components/bits/MicroSlats';
import TargetCursor from '@/components/bits/TargetCursor';
import TechText from '@/components/bits/TechText';
import { profile } from '@/content/profile';
import { canRunWebGL } from '@/lib/capabilities';
import { scrollToId } from '@/hooks/useScrollSystem';

const JUMPS = [
  { id: 'skills', label: '技能' },
  { id: 'projects', label: '项目' },
  { id: 'experience', label: '经历' },
  { id: 'contact', label: '联系' },
] as const;

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

/**
 * 整页背景，固定在视口上。
 *
 * 下面的经历 / 技能 / 项目 / 联系都不铺自己的底色，滚到哪都还是这一层动效。
 * 画布保持挂载：卸掉再重建容易拿不到 WebGL 上下文，动效会消失且回不来。
 */
export function HeroBackdrop() {
  const useShader = useMemo(() => canRunWebGL(), []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      {useShader ? (
        <>
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
        </>
      ) : (
        <StaticGlow />
      )}
    </div>
  );
}

export default function Hero() {
  const jumpsRef = useRef<HTMLDivElement>(null);

  return (
    <section id="hero" className="relative h-dvh overflow-hidden">

      <div className="relative z-10 flex h-full w-full items-center overflow-y-auto px-6 py-28">
        <div className="mx-auto w-full max-w-5xl">
        <div className="w-full max-w-xl rounded-3xl bg-canvas/35 p-6 backdrop-blur-sm sm:p-8">
          <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">{profile.site}</p>
          <h1 className="mt-3 -ml-5 h-40 sm:h-48">
            <TechText
              text={profile.name}
              className="font-sans"
              color="#5CFFD0"
              accentColor="#ECECEE"
              fontWeight={500}
              fontSize={150}
              letterSpacing={-0.03}
              reveal="letter"
              dashLength={4}
              dashGap={2}
              specks={15}
              align="left"
              draggable={false}
            />
          </h1>
          <p className="mt-2 font-mono text-sm tracking-[0.16em] text-muted">{profile.nameEn}</p>
          <p className="mt-3 text-base text-fg sm:text-lg">{profile.role}</p>
          <div ref={jumpsRef} className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
            <TargetCursor
              container={jumpsRef}
              cursorColor="#00E0A4"
              cursorColorOnTarget="#5CFFD0"
              spinDuration={2}
              hoverDuration={0.2}
              parallaxOn
              hideDefaultCursor
              showLabel={false}
              blendMode="normal"
            />
            {JUMPS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToId(item.id)}
                className="cursor-target text-sm text-accent transition-colors hover:text-fg"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
