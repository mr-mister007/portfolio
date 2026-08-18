import React, { useState, useCallback, lazy, Suspense, useEffect } from 'react';
import Lenis from 'lenis';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import ServicesSection from './components/ServicesSection';
import InfraBuilderSection from './components/InfraBuilderSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import CursorFollower from './components/CursorFollower';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import BootSequence from './components/BootSequence';
import CrumpleSection from './components/CrumpleSection';
import { ScrollProvider } from './contexts/ScrollContext';
import { ThemeProvider } from './contexts/ThemeContext';

const InteractiveBg = lazy(() => import('./components/InteractiveBg'));

const App: React.FC = () => {
  const [bootComplete, setBootComplete] = useState(false);
  const [showBg, setShowBg] = useState(false);

  const handleBootComplete = useCallback(() => {
    setBootComplete(true);
    window.scrollTo(0, 0);
    setTimeout(() => setShowBg(true), 300);
  }, []);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <ThemeProvider>
      {!bootComplete && <BootSequence onComplete={handleBootComplete} />}

      {showBg && (
        <Suspense fallback={null}>
          <InteractiveBg />
        </Suspense>
      )}
      <CursorFollower />
      <ScrollProgress />

      <ScrollProvider>
        <Navbar />

        <main className="relative z-10">
          <HeroSection />
          <CrumpleSection />
          <AboutSection />
          <ProjectsSection />
          <ServicesSection />
          <InfraBuilderSection />
          <ContactSection />
          <Footer />
        </main>
      </ScrollProvider>
    </ThemeProvider>
  );
};

export default App;
