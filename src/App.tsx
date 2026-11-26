import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import ServicesSection from './components/ServicesSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import CommandPalette from './components/CommandPalette';
import ScrollProgress from './components/ScrollProgress';
import { ScrollProvider } from './contexts/ScrollContext';
import { ThemeProvider } from './contexts/ThemeContext';

export const App: React.FC = () => {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

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
      <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] selection:bg-[var(--accent)] selection:text-[var(--accent-ink)] transition-colors duration-200">
        {/* Subtle Scroll Progress Indicator */}
        <ScrollProgress />

        <ScrollProvider>
          {/* Minimal Fixed Header */}
          <Navbar onOpenPalette={() => setCommandPaletteOpen(true)} />

          {/* Global ⌘K Command Palette */}
          <CommandPalette
            isOpen={commandPaletteOpen}
            onClose={() => setCommandPaletteOpen(false)}
          />

          {/* Main Content Flow — Spacious Minimal Editorial Layout */}
          <main id="main" className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 space-y-24 sm:space-y-32 md:space-y-36 pb-20 sm:pb-28">
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
