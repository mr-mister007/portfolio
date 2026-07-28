import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon, Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

/**
 * Clean navbar with:
 * - Auto-hide on scroll down, show on scroll up
 * - Active section highlighting via IntersectionObserver
 * - Mobile slide-in menu with backdrop blur
 * - Dark/light theme toggle
 */
const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggle } = useTheme();

  // ── Scroll shadow ──
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Active section tracking ──
  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((i) => i.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: '-40% 0px -55% 0px' },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // ── Lock body scroll when mobile menu open ──
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12"
        initial={{ y: 0 }}
        style={{
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          background: scrolled ? 'color-mix(in srgb, var(--color-bg) 80%, transparent)' : 'transparent',
          borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-lg font-semibold tracking-tight text-text-primary hover:text-accent transition-colors"
          >
            Aravind<span className="text-accent">.</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => scrollTo(e, item.href)}
                  className={`text-sm transition-colors relative group ${
                    isActive ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px bg-accent transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </a>
              );
            })}

            {/* Theme toggle */}
            <button
              onClick={toggle}
              className="p-2 rounded-full text-text-secondary hover:text-text-primary hover:bg-accent-muted transition-all"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={toggle}
              className="p-2 rounded-full text-text-secondary hover:text-text-primary transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 rounded-full text-text-secondary hover:text-text-primary transition-colors"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile slide-in menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[60] bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Panel */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-[70] w-72 bg-bg border-l border-border backdrop-blur-2xl flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 h-16 border-b border-border">
                <span className="text-sm font-semibold text-text-primary">Navigation</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-full text-text-secondary hover:text-text-primary transition-colors"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Links */}
              <div className="flex-1 flex flex-col p-6 gap-2">
                {NAV_ITEMS.map((item, i) => {
                  const isActive = activeSection === item.href.replace('#', '');
                  return (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => scrollTo(e, item.href)}
                      className={`text-lg py-3 px-4 rounded-xl transition-all ${
                        isActive
                          ? 'text-text-primary bg-accent-muted font-medium'
                          : 'text-text-secondary hover:text-text-primary hover:bg-accent-muted/50'
                      }`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      {item.label}
                    </motion.a>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-border">
                <p className="text-xs text-text-secondary">Aravind<span className="text-accent">.</span></p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
