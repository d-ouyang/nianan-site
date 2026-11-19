import { useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { projects, type ProjectItem } from '@/content/profile';
import { enterDemo } from '@/lib/sso';
import SectionFrame from '@/components/sections/SectionFrame';

const REVEAL = [0.16, 1, 0.3, 1] as const;

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

function ProjectCard({
  project,
  index,
  shown,
}: {
  project: ProjectItem;
  index: number;
  shown: boolean;
}) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const play = Boolean(reduce || shown);

  return (
    <motion.li
      className={`relative rounded-2xl bg-canvas/35 backdrop-blur-sm ${
        open ? 'px-6 py-6 lg:col-span-2' : 'px-6 py-6'
      }`}
      initial={reduce ? false : { opacity: 0, y: 32 }}
      animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={
        reduce
          ? { duration: 0 }
          : { duration: 0.72, delay: shown ? 0.06 + index * 0.12 : 0, ease: REVEAL }
      }
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-x-6 top-0 h-px origin-left bg-accent"
        initial={false}
        animate={{ scaleX: play ? 1 : 0 }}
        transition={
          reduce
            ? { duration: 0 }
            : { duration: 0.85, delay: shown ? 0.14 + index * 0.12 : 0, ease: REVEAL }
        }
      />
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full cursor-pointer text-left"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs text-accent">
              <span className="mr-2 text-faint">{String(index + 1).padStart(2, '0')}</span>
              {project.meta}
            </p>
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

          {project.demo && (
            <DetailBlock title="在线演示">
              <button
                type="button"
                onClick={() => enterDemo(project.demo!.target)}
                className="rounded-full bg-accent/10 px-4 py-2 text-sm text-accent transition-colors hover:bg-accent/20"
              >
                进入{project.demo.target === 'rag' ? '知衡引擎问答' : '序域协作办公'}演示（免登录） →
              </button>
              <p className="mt-2 text-xs text-faint">使用演示账号自动登录，配额受限，无需注册。</p>
            </DetailBlock>
          )}

          <DetailBlock title="关键迭代与量化收益">
            <ul className="grid gap-3">
              {project.iterations.map((it) => (
                <li key={it.version + it.title} className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                  <span className="shrink-0 font-mono text-xs text-accent sm:w-28">{it.version}</span>
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
    </motion.li>
  );
}

export default function Projects() {
  const listRef = useRef<HTMLUListElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(listRef, { once: true, amount: 0.12 });
  const shown = Boolean(reduce || inView);

  return (
    <SectionFrame id="projects" eyebrow="Projects" title="项目">
      <p className="mb-6 text-sm text-faint">四个项目。点开卡片看技术栈、规模数字、亮点难点与逐版量化收益。</p>
      <ul ref={listRef} className="grid gap-4 lg:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} shown={shown} />
        ))}
      </ul>
    </SectionFrame>
  );
}
