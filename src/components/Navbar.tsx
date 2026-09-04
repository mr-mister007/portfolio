import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon, Menu, X, Command } from 'lucide-react';

interface NavbarProps {
  onOpenCommandPalette?: () => void;
}

const NAV_ITEMS = [
  { label: 'Work', href: '#work' },
  { label: 'Capabilities', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const sectionIds = ['work', 'about', 'services', 'contact'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: '-30% 0px -50% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-3 sm:top-5 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pointer-events-none"
      >
        <nav className="pointer-events-auto flex items-center justify-between gap-3 sm:gap-6 px-4 sm:px-6 py-2 rounded-full border border-slate-200/80 bg-white/85 dark:border-white/10 dark:bg-[#0A0E18]/85 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_12px_36px_-8px_rgba(0,0,0,0.5)] transition-all duration-300 w-full max-w-4xl">
          {/* Logo & Availability Pill */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-base sm:text-lg font-heading font-black tracking-tight text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-[#D4FF00] transition-colors flex items-center gap-1 uppercase"
            >
              <span>Aravind</span>
              <span className="text-emerald-500 dark:text-[#D4FF00] font-mono">//</span>
            </button>

            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-700 dark:text-[#D4FF00] dark:bg-[#D4FF00]/10 dark:border-[#D4FF00]/30 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-[#D4FF00] animate-ping" />
              <span>ACTIVE · SRE</span>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.href)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                    isActive
                      ? 'text-emerald-700 dark:text-white'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100 dark:text-white/60 dark:hover:text-white dark:hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-emerald-500/10 border border-emerald-500/30 dark:bg-[#D4FF00]/15 dark:border-[#D4FF00]/40 -z-10 shadow-[0_0_15px_rgba(16,185,129,0.15)] dark:shadow-[0_0_15px_rgba(212,255,0,0.3)]"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenCommandPalette}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-200 bg-slate-100/80 text-slate-700 hover:text-emerald-700 hover:border-emerald-400 dark:border-white/15 dark:bg-black/40 dark:text-white/70 dark:hover:text-[#D4FF00] dark:hover:border-[#D4FF00]/40 transition-all text-xs font-mono group"
              title="Open Command Palette (Cmd + K)"
            >
              <Command className="w-3.5 h-3.5 text-emerald-600 dark:text-[#D4FF00] group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline font-bold">COMMANDS</span>
              <kbd className="hidden sm:inline px-1.5 py-0.5 rounded bg-slate-200/80 dark:bg-white/10 text-[10px] text-slate-600 dark:text-white/70 font-mono">
                ⌘K
              </kbd>
            </button>

            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="p-1.5 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-text-secondary dark:hover:text-text-primary dark:hover:bg-white/10 transition-all"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 hover:-rotate-12 transition-transform" />
              )}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle mobile menu"
              className="md:hidden p-1.5 rounded-full text-slate-700 dark:text-text-secondary hover:text-slate-900 dark:hover:text-text-primary"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-16 z-50 p-6 rounded-2xl border border-border/80 bg-white/95 dark:bg-surface/95 backdrop-blur-2xl shadow-2xl flex flex-col gap-3 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.href)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-left text-slate-800 dark:text-text-primary hover:bg-slate-100 dark:hover:bg-white/5"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setMobileOpen(false);
                onOpenCommandPalette?.();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:border-accent/30 dark:bg-accent/10 dark:text-accent font-mono text-xs font-semibold mt-2"
            >
              <Command className="w-4 h-4" /> Open Command Palette (⌘K)
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
