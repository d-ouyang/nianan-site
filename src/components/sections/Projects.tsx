import { projects } from '@/content/profile';
import SectionFrame from '@/components/sections/SectionFrame';

export default function Projects() {
  return (
    <SectionFrame id="projects" eyebrow="Projects" title="项目">
      <ul className="grid gap-4 sm:grid-cols-[repeat(auto-fit,minmax(16rem,1fr))]">
        {projects.map((project) => (
          <li key={project.name} className="rounded-2xl bg-canvas/35 px-6 py-6 backdrop-blur-sm">
            <p className="font-mono text-xs text-accent">{project.meta}</p>
            <h3 className="mt-3 text-xl font-medium tracking-tight">{project.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{project.summary}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li key={tag} className="rounded-full bg-canvas/70 px-3 py-1 text-xs text-muted">
                  {tag}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </SectionFrame>
  );
}
