import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import Monogram from './Monogram';
import { Sun, Moon, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenPalette: () => void;
}

const NAV_ITEMS = [
  { num: '01', label: 'Work', href: '#work' },
  { num: '02', label: 'Services', href: '#services' },
  { num: '03', label: 'Manifesto', href: '#about' },
  { num: '04', label: 'Dispatch', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenPalette }) => {
  const { theme, toggleTheme, accent, cycleAccent } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const accentColorMap = {
    blue: '#2f5bff',
    lime: '#d4ff00',
    orange: '#ff5a1f',
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--border)] py-3'
            : 'bg-transparent py-4 sm:py-6'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between gap-4">
          {/* Brand with Monogram */}
          <a
            href="/"
            className="flex items-center gap-3 group text-[var(--ink)] no-underline select-none"
            aria-label="Aravind — Home"
          >
            <div className="w-8 h-6 flex items-center justify-center transition-transform group-hover:scale-105">
              <Monogram className="w-full h-full text-[var(--ink)]" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-sans font-bold text-sm tracking-tight leading-none text-[var(--ink)]">
                Aravind
              </span>
              <span className="font-mono text-[10px] tracking-wider uppercase text-[var(--ink-secondary)] hidden sm:inline">
                / Systems &amp; AI
              </span>
            </div>
          </a>

          {/* Desktop Numbered Nav Links */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group flex items-center gap-1.5 text-xs text-[var(--ink-secondary)] hover:text-[var(--ink)] transition-colors no-underline font-medium"
              >
                <span className="font-mono text-[10px] text-[var(--ink-secondary)]/60 group-hover:text-[var(--accent)] transition-colors">
                  {item.num}
                </span>
                <span className="font-sans tracking-tight">{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Toolbar Tools */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-raised)] text-[var(--ink)] hover:border-[var(--accent)] transition-colors cursor-pointer"
              aria-label="Toggle theme"
              title="Toggle Light / Dark mode"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            {/* Accent Swatch Cycler */}
            <button
              onClick={cycleAccent}
              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-raised)] hover:border-[var(--accent)] transition-colors cursor-pointer"
              aria-label="Change accent colour"
              title={`Cycle Accent color (Current: ${accent})`}
            >
              <span
                className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full transition-all"
                style={{ backgroundColor: accentColorMap[accent] }}
              />
            </button>

            {/* Command Palette KBD Tool */}
            <button
              onClick={onOpenPalette}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 h-8 sm:h-9 rounded-full border border-[var(--border)] bg-[var(--bg-raised)] text-[var(--ink-secondary)] hover:text-[var(--ink)] hover:border-[var(--accent)] text-xs font-mono transition-colors cursor-pointer"
              aria-label="Open command palette"
              title="Command Palette (⌘K)"
            >
              <span className="text-[10px] font-bold">⌘K</span>
            </button>

            {/* Header CTA Button */}
            <a href="#contact" className="hidden lg:inline-flex btn text-xs py-2 px-4">
              <span>Let&apos;s talk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="md:hidden w-8 h-8 flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-raised)] text-[var(--ink)]"
              aria-label="Open Menu"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-30 bg-[var(--bg)]/98 backdrop-blur-xl md:hidden pt-24 px-6 flex flex-col justify-between pb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="space-y-6">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--ink-secondary)] block mb-4">
                [ NAVIGATION ]
              </span>
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between py-3 border-b border-[var(--border)] text-lg font-sans font-bold text-[var(--ink)]"
                >
                  <span>{item.label}</span>
                  <span className="font-mono text-xs text-[var(--accent)]">{item.num}</span>
                </a>
              ))}
              <div className="pt-4">
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenPalette();
                  }}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg-raised)] text-sm font-mono text-[var(--ink)]"
                >
                  <span>Open Command Palette</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-[var(--ink)] text-[var(--bg)] font-bold">⌘K</span>
                </button>
              </div>
            </div>

            <div className="pt-8">
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="w-full btn py-3 text-sm flex items-center justify-center gap-2"
              >
                <span>Let&apos;s talk</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
