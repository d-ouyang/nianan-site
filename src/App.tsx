import Hero, { HeroBackdrop } from '@/components/sections/Hero';
import Experience from '@/components/sections/Experience';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';
import BackToTop from '@/components/ui/BackToTop';
import Dock from '@/components/ui/Dock';
import ScrollProgress from '@/components/ui/ScrollProgress';
import { useScrollSystem } from '@/hooks/useScrollSystem';

export default function App() {
  const active = useScrollSystem();

  return (
    <main className="relative">
      <HeroBackdrop />
      <ScrollProgress />

      <div className="relative z-10">
        <Hero />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        {/* 只在页面最底部把动效收进底色，上面的模块都还露着这层背景 */}
        <div className="pointer-events-none h-64 bg-gradient-to-b from-transparent to-canvas" aria-hidden="true" />
        <Footer />
      </div>

      <BackToTop />
      <Dock active={active} />
    </main>
  );
}
