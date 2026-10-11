import FolderFloat from '@/components/bits/FolderFloat';
import { skillGroups } from '@/content/profile';
import SectionFrame from '@/components/sections/SectionFrame';

export default function Skills() {
  return (
    <SectionFrame id="skills" eyebrow="Skills" title="技能" align="end">
      <div className="rounded-3xl bg-canvas/35 px-8 py-12 backdrop-blur-sm sm:px-14 sm:py-16">
        <ul className="grid justify-items-center gap-x-16 gap-y-24 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <li key={group.name}>
              <FolderFloat
                items={group.items}
                label={group.name}
                sublabel={`${group.items.length} 项`}
                trigger="hover"
                closeOnSelect={false}
                physics
                drift={0.45}
                folderColor="#14352D"
                frontColor="#1E5244"
                paperColor="#00E0A4"
                itemColor="#00E0A4"
                itemTextColor="#09090B"
                labelColor="#ECECEE"
                width={210}
                height={136}
                radius={16}
                spread={150}
                lift={22}
                tilt={6}
                bounce={0.3}
              />
            </li>
          ))}
        </ul>
      </div>
    </SectionFrame>
  );
}
