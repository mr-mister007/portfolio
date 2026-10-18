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
      <div className="frame min-h-screen">
        {/* Preloader Plotting Screen */}
        {!bootComplete && <Preloader onComplete={handleBootComplete} />}

        {/* Viewport Architectural Framing Lines */}
        <div className="frame-lines" aria-hidden="true">
          <div className="frame-line-left" />
          <div className="frame-line-right" />
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

          {/* Main Content Flow */}
          <main id="main" className="relative z-10">
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
