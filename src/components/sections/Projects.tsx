import { useState } from 'react';
import { projects, type ProjectItem } from '@/content/profile';
import SectionFrame from '@/components/sections/SectionFrame';

/** 把 **加粗** 片段渲染成 <strong>，其余原样输出。 */
function Bold({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={i} className="font-medium text-fg">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

function DetailBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-8">
      <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">{title}</p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function ProjectCard({ project }: { project: ProjectItem }) {
  const [open, setOpen] = useState(false);

  return (
    <li
      className={`rounded-2xl bg-canvas/35 backdrop-blur-sm transition-colors ${
        open ? 'px-6 py-6 lg:col-span-2' : 'px-6 py-6'
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full cursor-pointer text-left"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs text-accent">{project.meta}</p>
            <h3 className="mt-3 text-xl font-medium tracking-tight">{project.name}</h3>
          </div>
          <span className="mt-1 shrink-0 font-mono text-xs text-faint">{open ? '— 收起' : '+ 展开'}</span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted">{project.summary}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag} className="rounded-full bg-canvas/70 px-3 py-1 text-xs text-muted">
              {tag}
            </li>
          ))}
        </ul>
      </button>

      {open && (
        <div className="border-t border-line/60 pt-2">
          <DetailBlock title="技术栈">
            <ul className="grid gap-2 sm:grid-cols-2">
              {project.stack.map((line) => (
                <li key={line} className="text-sm leading-relaxed text-muted">
                  {line}
                </li>
              ))}
            </ul>
          </DetailBlock>

          <DetailBlock title="规模数字">
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {project.metrics.map((m) => (
                <li key={m.label} className="rounded-xl bg-canvas/50 px-4 py-3">
                  <p className="font-mono text-lg text-accent">{m.value}</p>
                  <p className="mt-1 text-xs text-faint">{m.label}</p>
                </li>
              ))}
            </ul>
          </DetailBlock>

          <DetailBlock title="亮点与难点">
            <ol className="grid gap-5">
              {project.highlights.map((h, i) => (
                <li key={h.title} className="flex gap-4">
                  <span className="mt-0.5 shrink-0 font-mono text-xs text-faint">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h4 className="text-sm font-medium text-fg">{h.title}</h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      <Bold text={h.body} />
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </DetailBlock>

          <DetailBlock title="关键迭代与量化收益">
            <ul className="grid gap-3">
              {project.iterations.map((it) => (
                <li key={it.version + it.title} className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                  <span className="shrink-0 font-mono text-xs text-accent sm:w-28">
                    {it.version}
                    <span className="ml-2 text-faint">{it.date}</span>
                  </span>
                  <span className="text-sm text-fg sm:w-44 sm:shrink-0">{it.title}</span>
                  <span className="text-sm leading-relaxed text-muted">
                    <Bold text={it.gain} />
                  </span>
                </li>
              ))}
            </ul>
          </DetailBlock>
        </div>
      )}
    </li>
  );
}

export default function Projects() {
  return (
    <SectionFrame id="projects" eyebrow="Projects" title="项目">
      <p className="mb-6 text-sm text-faint">两个主力项目。点开卡片看技术栈、规模数字、亮点难点与逐版量化收益。</p>
      <ul className="grid gap-4 lg:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </ul>
    </SectionFrame>
  );
}
