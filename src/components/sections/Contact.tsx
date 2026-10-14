import { contactLinks, type ContactLink } from '@/content/profile';
import MoodNote from '@/components/sections/MoodNote';
import SectionFrame from '@/components/sections/SectionFrame';

function ContactIcon({ kind }: { kind: ContactLink['kind'] }) {
  const common = {
    viewBox: '0 0 24 24',
    'aria-hidden': true as const,
    className: 'size-4 shrink-0',
  };

  if (kind === 'phone') {
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.6">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7 3.5h2.2c.4 0 .8.3.9.7l.8 2.4a1 1 0 0 1-.3 1.1l-1.4 1a12.5 12.5 0 0 0 5.1 5.1l1-1.4a1 1 0 0 1 1.1-.3l2.4.8c.4.1.7.5.7.9V17a1.5 1.5 0 0 1-1.6 1.5A14.5 14.5 0 0 1 4.5 5.1 1.5 1.5 0 0 1 6 3.5H7Z"
        />
      </svg>
    );
  }

  if (kind === 'email') {
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 7.5 7.5 5.5 7.5-5.5" />
      </svg>
    );
  }

  return (
    <svg {...common} fill="currentColor">
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.37-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.04 10.04 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

export default function Contact() {
  return (
    <SectionFrame id="contact" eyebrow="Contact" title="联系">
      <div className="rounded-2xl bg-canvas/35 px-5 py-6 backdrop-blur-sm sm:px-6">
        <p className="text-base leading-relaxed text-muted">合作，或者只是打个招呼，从这里开始。</p>
        <ul className="mt-6 space-y-3">
          {contactLinks.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                {...(item.kind === 'github'
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className="inline-flex items-center gap-3 text-sm text-fg transition-colors hover:text-accent"
              >
                <ContactIcon kind={item.kind} />
                <span className="font-mono">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <MoodNote />
    </SectionFrame>
  );
}
