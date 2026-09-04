import React, { useState, useCallback, lazy, Suspense, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import LiveClusterSimulator from './components/LiveClusterSimulator';
import ProjectsSection from './components/ProjectsSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import CursorFollower from './components/CursorFollower';
import BootSequence from './components/BootSequence';
import CommandPalette from './components/CommandPalette';
import ScrollProgress from './components/ScrollProgress';
import { ScrollProvider } from './contexts/ScrollContext';
import { ThemeProvider } from './contexts/ThemeContext';

const InteractiveBg = lazy(() => import('./components/InteractiveBg'));

const App: React.FC = () => {
  const [bootComplete, setBootComplete] = useState(false);
  const [showBg, setShowBg] = useState(true);
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
      {!bootComplete && <BootSequence onComplete={handleBootComplete} />}

      {/* Cinematic Film Grain Overlay */}
      <div className="film-grain" />

      {showBg && (
        <Suspense fallback={null}>
          <InteractiveBg />
        </Suspense>
      )}

      <CursorFollower />
      <ScrollProgress />

      <ScrollProvider>
        {/* Floating Island Dock Navigation */}
        <Navbar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

        {/* Global Command Palette */}
        <CommandPalette
          isOpen={commandPaletteOpen}
          onClose={() => setCommandPaletteOpen(false)}
        />

        {/* High-Velocity Flow (Lando Norris Aesthetic for DevOps & Platform Engineering) */}
        <main className="relative z-10">
          <HeroSection />
          <LiveClusterSimulator />
          <ProjectsSection />
          <AboutSection />
          <ServicesSection />
          <ContactSection />
          <Footer />
        </main>
      </ScrollProvider>
    </ThemeProvider>
  );
};

export default App;
