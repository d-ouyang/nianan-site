import { education, experience, experienceNote, experienceSpan } from '@/content/profile';
import SectionFrame from '@/components/sections/SectionFrame';
import Timeline from '@/components/ui/Timeline';

export default function Experience() {
  return (
    <SectionFrame id="experience" eyebrow="Experience" title="工作经历" align="end">
      <div className="rounded-2xl bg-canvas/35 px-5 py-6 backdrop-blur-sm sm:px-6">
        <p className="text-sm text-fg">{experienceNote}</p>
        <p className="mt-2 font-mono text-xs text-faint">{experienceSpan}</p>
        <div className="mt-8">
          <Timeline items={experience} />
        </div>
      </div>

      <h3 className="mt-12 text-xl font-medium tracking-tight">教育经历</h3>
      <div className="mt-6 rounded-2xl bg-canvas/35 px-5 py-6 backdrop-blur-sm sm:px-6">
        <Timeline items={education} />
      </div>
    </SectionFrame>
  );
}
