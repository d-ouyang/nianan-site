import { experience, experienceNote } from '@/content/profile';
import SectionFrame from '@/components/sections/SectionFrame';

export default function Experience() {
  return (
    <SectionFrame id="experience" eyebrow="Experience" title="工作经历" align="end">
      <ol className="space-y-4">
        {experience.map((item) => (
          <li
            key={`${item.org}-${item.title}`}
            className="rounded-2xl bg-canvas/35 px-5 py-6 backdrop-blur-sm sm:px-6"
          >
            <p className="text-sm text-fg">{experienceNote}</p>
            <div className="mt-5 grid gap-2 sm:grid-cols-[10.5rem_1fr] sm:gap-8">
            <p className="font-mono text-xs text-faint sm:pt-1">{item.period}</p>
            <div className="border-l border-line pl-5">
              <h3 className="text-lg font-medium">{item.title}</h3>
              <p className="mt-1 text-sm text-accent">{item.org}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.summary}</p>
              {item.points.length > 0 && (
                <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-muted">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}
            </div>
            </div>
          </li>
        ))}
      </ol>
    </SectionFrame>
  );
}
