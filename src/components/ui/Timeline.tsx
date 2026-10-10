import type { TimelineItem } from '@/content/profile';

/** 竖线加节点。时间在上，职位和机构在下，从近到远往下排。 */
export default function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="relative space-y-8 border-l border-accent/45 pl-6">
      {items.map((item) => (
        <li key={`${item.org}-${item.period}`} className="relative">
          <span
            aria-hidden="true"
            className="absolute top-1 size-2.5 -translate-x-[1.95rem] rounded-full bg-accent"
          />
          <p className="font-mono text-xs text-faint">{item.period}</p>
          <h3 className="mt-2 text-lg font-medium">{item.title}</h3>
          <p className="mt-1 text-sm text-accent">{item.org}</p>
        </li>
      ))}
    </ol>
  );
}
