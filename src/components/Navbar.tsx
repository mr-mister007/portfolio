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
    blue: '#5b7cff',
    lime: '#d4ff00',
    orange: '#ff6b35',
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#05080d]/85 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl'
            : 'bg-transparent py-4 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between gap-4">
          {/* Brand with Monogram */}
          <a
            href="/"
            className="flex items-center gap-3 group text-[#E1E0CC] no-underline select-none"
            aria-label="Aravind — Home"
          >
            <div className="w-8 h-6 flex items-center justify-center transition-transform group-hover:scale-105">
              <Monogram className="w-full h-full text-[#E1E0CC]" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-sans font-bold text-sm tracking-tight leading-none text-[#E1E0CC]">
                Aravind
              </span>
              <span className="font-mono text-[10px] tracking-wider uppercase text-[#E1E0CC]/60 hidden sm:inline">
                / Systems &amp; AI
              </span>
            </div>
          </a>

          {/* Desktop Numbered Nav Links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group flex items-center gap-1.5 text-xs text-[#E1E0CC]/75 hover:text-white transition-colors no-underline font-medium"
              >
                <span className="font-mono text-[10px] text-[#E1E0CC]/40 group-hover:text-[var(--accent)] transition-colors">
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
              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#E1E0CC] hover:border-white/30 transition-colors cursor-pointer"
              aria-label="Toggle theme"
              title="Toggle Light / Dark mode"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            {/* Accent Swatch Cycler */}
            <button
              onClick={cycleAccent}
              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] hover:border-white/30 transition-colors cursor-pointer"
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
              className="hidden sm:inline-flex items-center gap-1.5 px-3 h-8 sm:h-9 rounded-full border border-white/10 bg-white/[0.04] text-[#E1E0CC]/80 hover:text-white hover:border-white/30 text-xs font-mono transition-colors cursor-pointer"
              aria-label="Open command palette"
              title="Command Palette (⌘K)"
            >
              <span className="text-[10px] font-bold">⌘K</span>
            </button>

            {/* Header CTA Button in Prisma Pill Style */}
            <a
              href="#contact"
              className="hidden lg:inline-flex group items-center gap-2 rounded-full bg-[#E1E0CC] py-1 pl-4 pr-1 text-xs font-semibold text-black transition-all hover:gap-3 hover:bg-white no-underline shadow-md"
            >
              <span>Let&apos;s talk</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110">
                <ArrowUpRight className="w-3.5 h-3.5 text-[#E1E0CC]" />
              </span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="md:hidden w-8 h-8 flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#E1E0CC]"
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
            className="fixed inset-0 z-30 bg-[#070708]/98 backdrop-blur-xl md:hidden pt-24 px-6 flex flex-col justify-between pb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="space-y-6">
              <span className="font-mono text-xs uppercase tracking-widest text-[#E1E0CC]/50 block mb-4">
                [ NAVIGATION ]
              </span>
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between py-3 border-b border-white/10 text-lg font-sans font-bold text-[#E1E0CC]"
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
                  className="w-full flex items-center justify-between p-3.5 rounded-xl border border-white/10 bg-white/[0.04] text-sm font-mono text-[#E1E0CC]"
                >
                  <span>Open Command Palette</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-[#E1E0CC] text-black font-bold">⌘K</span>
                </button>
              </div>
            </div>

            <div className="pt-8">
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="w-full group inline-flex items-center justify-center gap-2 rounded-full bg-[#E1E0CC] py-3 text-sm font-semibold text-black transition-all hover:bg-white no-underline shadow-lg"
              >
                <span>Let&apos;s talk</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#E1E0CC]" />
                </span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
