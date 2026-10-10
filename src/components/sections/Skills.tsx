import { skillGroups } from '@/content/profile';
import SectionFrame from '@/components/sections/SectionFrame';

export default function Skills() {
  return (
    <SectionFrame id="skills" eyebrow="Skills" title="技能" align="end">
      <ul className="grid gap-4 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <li key={group.name} className="rounded-2xl bg-canvas/35 px-5 py-6 backdrop-blur-sm">
            <h3 className="text-base font-medium">{group.name}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item} className="rounded-full bg-canvas/70 px-3 py-1 text-xs text-muted">
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </SectionFrame>
  );
}
