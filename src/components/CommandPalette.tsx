import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Terminal,
  Sun,
  Moon,
  Copy,
  ExternalLink,
  Compass,
  Check,
  X,
  Server,
  Code2,
  Mail,
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandItem {
  id: string;
  label: string;
  category: 'Navigation' | 'DevOps Shell' | 'Quick Actions';
  icon: React.ElementType;
  shortcut?: string;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const scrollTo = (id: string) => {
    onClose();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('hello@aravindmv.com');
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      onClose();
    }, 900);
  };

  const commands: CommandItem[] = [
    {
      id: 'nav-top',
      label: 'Jump to Overview (Top)',
      category: 'Navigation',
      icon: Compass,
      shortcut: 'H',
      action: () => {
        onClose();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    },
    {
      id: 'nav-work',
      label: 'Jump to Production Work',
      category: 'Navigation',
      icon: Code2,
      shortcut: 'W',
      action: () => scrollTo('work'),
    },
    {
      id: 'nav-about',
      label: 'Jump to Architecture & Capabilities',
      category: 'Navigation',
      icon: Server,
      shortcut: 'A',
      action: () => scrollTo('about'),
    },
    {
      id: 'nav-services',
      label: 'Jump to Platform Services & SLAs',
      category: 'Navigation',
      icon: Server,
      shortcut: 'S',
      action: () => scrollTo('services'),
    },
    {
      id: 'nav-contact',
      label: 'Jump to Contact Dispatcher',
      category: 'Navigation',
      icon: Mail,
      shortcut: 'C',
      action: () => scrollTo('contact'),
    },
    {
      id: 'action-theme',
      label: `Switch Theme to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
      category: 'Quick Actions',
      icon: theme === 'dark' ? Sun : Moon,
      shortcut: 'T',
      action: () => {
        toggle();
        onClose();
      },
    },
    {
      id: 'action-copy-email',
      label: copied ? 'Email Copied!' : 'Copy Email Address (hello@aravindmv.com)',
      category: 'Quick Actions',
      icon: copied ? Check : Copy,
      shortcut: 'E',
      action: copyEmail,
    },
    {
      id: 'action-github',
      label: 'Open GitHub Profile',
      category: 'Quick Actions',
      icon: ExternalLink,
      shortcut: 'GH',
      action: () => {
        window.open('https://github.com/mr-mister007', '_blank');
        onClose();
      },
    },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredCommands.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-24 px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl rounded-2xl border border-border/80 bg-surface/95 backdrop-blur-2xl shadow-2xl overflow-hidden z-10"
          >
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border/70">
              <Search className="w-5 h-5 text-accent shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Type a command or jump to section..."
                className="w-full bg-transparent text-sm sm:text-base font-sans text-text-primary placeholder:text-text-secondary/60 outline-none"
              />
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-[340px] overflow-y-auto p-2 space-y-1">
              {filteredCommands.length === 0 ? (
                <div className="py-8 text-center text-sm text-text-secondary font-mono">
                  No matching commands found for &ldquo;{query}&rdquo;
                </div>
              ) : (
                filteredCommands.map((cmd, idx) => {
                  const Icon = cmd.icon;
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={cmd.id}
                      onClick={cmd.action}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-all ${
                        isSelected
                          ? 'bg-accent/15 text-text-primary border border-accent/30'
                          : 'text-text-secondary hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-accent' : 'text-text-secondary'}`} />
                        <span className="text-sm font-sans truncate text-text-primary">
                          {cmd.label}
                        </span>
                      </div>
                      {cmd.shortcut && (
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-black/20 text-text-secondary border border-border/60 shrink-0 ml-2">
                          {cmd.shortcut}
                        </span>
                      )}
                    </button>
                  );
                })
              )}
            </div>

            <div className="flex items-center justify-between px-4 py-2.5 bg-black/30 border-t border-border/50 text-[11px] font-mono text-text-secondary">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>ESC Close</span>
              </div>
              <span className="text-accent font-semibold">DevOps Control Plane</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
