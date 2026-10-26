import React, { useState, useCallback, lazy, Suspense, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import ServicesSection from './components/ServicesSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import CommandPalette from './components/CommandPalette';
import ScrollProgress from './components/ScrollProgress';
import { ScrollProvider } from './contexts/ScrollContext';
import { ThemeProvider } from './contexts/ThemeContext';

const InteractiveBg = lazy(() => import('./components/InteractiveBg'));

export const App: React.FC = () => {
  const [bootComplete, setBootComplete] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  const handleBootComplete = useCallback(() => {
    setBootComplete(true);
  }, []);

  // Global Cmd + K / Ctrl + K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <ThemeProvider>
      <div className="frame min-h-screen bg-[#070708] text-[#E1E0CC] selection:bg-[#E1E0CC] selection:text-black">
        {/* Preloader Plotting Screen */}
        {!bootComplete && <Preloader onComplete={handleBootComplete} />}

        {/* Viewport Architectural Framing Lines */}
        <div className="frame-lines" aria-hidden="true">
          <div className="frame-line-left" />
          <div className="frame-line-right" />
        </div>

        {/* Global Cinematic Film Grain Texture */}
        <div className="noise-overlay pointer-events-none fixed inset-0 opacity-[0.3] mix-blend-overlay z-30" aria-hidden="true" />

        {/* Persistent Cinematic Atmospheric Background Video */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-45"
            src="/hero-video.mp4"
          />
          <div className="noise-overlay absolute inset-0 opacity-[0.4] mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-[#05080d]/80 to-[#05080d]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,#05080d_85%)]" />

          {/* Island Oceanic Lagoon Ambient Radial Glows */}
          <div className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-cyan-400/10 blur-[140px]" />
          <div className="pointer-events-none absolute top-1/2 -left-40 w-[500px] h-[500px] rounded-full bg-teal-400/10 blur-[130px]" />
          <div className="pointer-events-none absolute -bottom-40 right-1/4 w-[600px] h-[600px] rounded-full bg-sky-400/10 blur-[150px]" />
        </div>

        {/* Interactive 3D Topographic Terrain Mesh */}
        <Suspense fallback={null}>
          <InteractiveBg />
        </Suspense>

        <ScrollProgress />

        <ScrollProvider>
          {/* Architectural Header */}
          <Navbar onOpenPalette={() => setCommandPaletteOpen(true)} />

          {/* Global ⌘K Command Palette */}
          <CommandPalette
            isOpen={commandPaletteOpen}
            onClose={() => setCommandPaletteOpen(false)}
          />

          {/* Main Content Flow — Continuous Cinematic Viewport Panels */}
          <main id="main" className="relative z-10 max-w-[1520px] mx-auto px-2 sm:px-4 md:px-6 space-y-10 sm:space-y-16 md:space-y-20 pb-16 sm:pb-24">
            <HeroSection />
            <ProjectsSection />
            <ServicesSection />
            <AboutSection />
            <ContactSection />
            <Footer />
          </main>
        </ScrollProvider>
      </div>
    </ThemeProvider>
  );
};

export default App;
