import Hero from '@/components/sections/Hero';
import Stub from '@/components/sections/Stub';
import Dock from '@/components/ui/Dock';
import ScrollProgress from '@/components/ui/ScrollProgress';
import { useScrollSystem } from '@/hooks/useScrollSystem';
import { CONTENT_SECTIONS } from '@/lib/sections';

export default function App() {
  const active = useScrollSystem();

  return (
    <main className="bg-canvas">
      <ScrollProgress />

      <Hero active={active} />
      {CONTENT_SECTIONS.map((section) => (
        <Stub key={section.id} id={section.id} label={section.label} fluid={section.id === 'about'} active={active} />
      ))}

      <Dock active={active} />
    </main>
  );
}
