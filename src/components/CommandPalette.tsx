import React, { useEffect, useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, Accent } from '../contexts/ThemeContext';
import {
  Search,
  ArrowRight,
  Sun,
  Moon,
  Palette,
  Copy,
  Check,
  ExternalLink,
  Code2,
  Server,
  Terminal,
  Layers,
  X,
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandItem {
  id: string;
  category: string;
  title: string;
  sub?: string;
  icon: React.ElementType;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme, toggleTheme, setAccent } = useTheme();

  // Scroll to section helper
  const scrollTo = (id: string) => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('hello@aravindmv.com');
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      onClose();
    }, 1200);
  };

  const commands: CommandItem[] = useMemo(
    () => [
      {
        id: 'nav-work',
        category: 'Navigation',
        title: '01 // Production Work',
        sub: 'Case studies, migrations & pipelines',
        icon: Code2,
        action: () => scrollTo('work'),
      },
      {
        id: 'nav-services',
        category: 'Navigation',
        title: '02 // Services & Capabilities',
        sub: 'Kubernetes, IaC, CI/CD, Observability',
        icon: Server,
        action: () => scrollTo('services'),
      },
      {
        id: 'nav-manifesto',
        category: 'Navigation',
        title: '03 // Manifesto & Architecture',
        sub: 'Telemetry record & toolchain specs',
        icon: Layers,
        action: () => scrollTo('about'),
      },
      {
        id: 'nav-contact',
        category: 'Navigation',
        title: '04 // Direct Dispatch',
        sub: 'Contact terminal & direct channel',
        icon: Terminal,
        action: () => scrollTo('contact'),
      },
      {
        id: 'action-theme',
        category: 'Appearance',
        title: theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme',
        sub: 'Toggle blueprint paper / carbon dark mode',
        icon: theme === 'dark' ? Sun : Moon,
        action: () => {
          toggleTheme();
          onClose();
        },
      },
      {
        id: 'accent-blue',
        category: 'Accent Color',
        title: 'Electric Blue Accent',
        sub: 'Set primary blueprint tone to #2F5BFF',
        icon: Palette,
        action: () => {
          setAccent('blue');
          onClose();
        },
      },
      {
        id: 'accent-lime',
        category: 'Accent Color',
        title: 'Acid Lime Accent',
        sub: 'Set high-visibility telemetry tone to #D4FF00',
        icon: Palette,
        action: () => {
          setAccent('lime');
          onClose();
        },
      },
      {
        id: 'accent-orange',
        category: 'Accent Color',
        title: 'Ember Orange Accent',
        sub: 'Set energetic warm tone to #FF5A1F',
        icon: Palette,
        action: () => {
          setAccent('orange');
          onClose();
        },
      },
      {
        id: 'copy-email',
        category: 'Direct Channels',
        title: copied ? 'Copied to Clipboard!' : 'Copy Dispatch Email',
        sub: 'hello@aravindmv.com',
        icon: copied ? Check : Copy,
        action: copyEmail,
      },
      {
        id: 'ext-github',
        category: 'External Repos',
        title: 'Open GitHub Profile',
        sub: '@mr-mister007 — Open source & infra code',
        icon: ExternalLink,
        action: () => {
          window.open('https://github.com/mr-mister007', '_blank');
          onClose();
        },
      },
      {
        id: 'ext-linkedin',
        category: 'External Repos',
        title: 'Open LinkedIn Profile',
        sub: 'in/aravindmv03 — Professional network',
        icon: ExternalLink,
        action: () => {
          window.open('https://linkedin.com/in/aravindmv03', '_blank');
          onClose();
        },
      },
    ],
    [theme, copied]
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        (c.sub && c.sub.toLowerCase().includes(q)) ||
        c.category.toLowerCase().includes(q)
    );
  }, [commands, query]);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K and Esc)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open
          setQuery('');
          setSelectedIndex(0);
        }
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Auto-focus on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Arrow navigation
  const handleNavKeys = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      e.preventDefault();
      filtered[selectedIndex].action();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-14 sm:pt-28 px-3 sm:px-4">
          {/* Backdrop blur */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Palette Dialog */}
          <motion.div
            className="relative w-full max-w-xl bg-[var(--bg-raised)] border border-[var(--border)] rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col text-[var(--ink)] max-h-[82vh] sm:max-h-[520px]"
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            onKeyDown={handleNavKeys}
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-2.5 sm:gap-3 px-4 sm:px-5 py-3 sm:py-4 border-b border-[var(--border)] bg-[var(--bg)]">
              <Search className="w-4 h-4 text-[var(--ink-secondary)] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Type a command or jump to section..."
                className="w-full bg-transparent text-sm font-sans focus:outline-none placeholder:text-[var(--ink-secondary)]"
              />
              <button
                onClick={onClose}
                className="p-1 rounded-md text-[var(--ink-secondary)] hover:text-[var(--ink)] hover:bg-[var(--accent-bg-subtle)] transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
              {filtered.length === 0 ? (
                <div className="py-8 text-center text-xs font-mono text-[var(--ink-secondary)]">
                  No commands match &ldquo;{query}&rdquo;
                </div>
              ) : (
                filtered.map((cmd, idx) => {
                  const Icon = cmd.icon;
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={cmd.id}
                      onClick={cmd.action}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-all text-xs ${
                        isSelected
                          ? 'bg-[var(--ink)] text-[var(--bg)]'
                          : 'text-[var(--ink)] hover:bg-[var(--accent-bg-subtle)]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-1.5 rounded-lg ${
                            isSelected
                              ? 'bg-[var(--bg)] text-[var(--ink)]'
                              : 'bg-[var(--border)] text-[var(--ink)]'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="font-semibold">{cmd.title}</div>
                          {cmd.sub && (
                            <div
                              className={`text-[11px] font-mono opacity-80 ${
                                isSelected ? 'text-[var(--bg)]' : 'text-[var(--ink-secondary)]'
                              }`}
                            >
                              {cmd.sub}
                            </div>
                          )}
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded ${
                          isSelected ? 'bg-white/20 text-white' : 'text-[var(--ink-secondary)]'
                        }`}
                      >
                        {cmd.category}
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer Navigation Help */}
            <div className="px-5 py-2.5 bg-[var(--bg)] border-t border-[var(--border)] flex items-center justify-between text-[11px] font-mono text-[var(--ink-secondary)]">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>ESC Close</span>
              </div>
              <span className="text-[var(--accent)] font-semibold">⌘K Dispatch</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
