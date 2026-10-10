import type { ReactNode } from 'react';

/**
 * 简历区块的统一骨架：眉题、标题、正文。区块之间靠留白分开，不加通栏分界线。
 * 外层和首页同一条居中栏。靠左从栏的左边起，靠右收到栏的右边，
 * 离屏幕的距离和首页卡片左边距一致。正文仍从左往右读。
 */
export default function SectionFrame({
  id,
  eyebrow,
  title,
  align = 'start',
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  align?: 'start' | 'end';
  children: ReactNode;
}) {
  const place = align === 'end' ? 'ml-auto' : 'mr-auto';

  return (
    <section id={id} className="flex min-h-[75vh] flex-col justify-center px-6 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-5xl">
        <div className={`w-full max-w-3xl ${place}`}>
          <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">{eyebrow}</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight">{title}</h2>
          <div className="mt-10">{children}</div>
        </div>
      </div>
    </section>
  );
}
