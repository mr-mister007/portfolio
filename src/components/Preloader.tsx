import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Monogram from './Monogram';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Check if already loaded in this session
    try {
      if (sessionStorage.getItem('pg-preloaded') === 'yes') {
        onComplete();
        return;
      }
    } catch {
      // ignore
    }

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setFading(true);
            try {
              sessionStorage.setItem('pg-preloaded', 'yes');
            } catch {}
            setTimeout(onComplete, 400);
          }, 200);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 10 > 100 ? 100 : prev + Math.floor(Math.random() * 12) + 8;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!fading && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col justify-between p-8 sm:p-12 bg-[var(--bg)] text-[var(--ink)] select-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
        >
          {/* Top metadata */}
          <div className="flex justify-between items-center text-xs font-mono uppercase tracking-widest text-[var(--ink-secondary)]">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
              Plotting aravindmv.com
            </span>
            <span>rev. 2026</span>
          </div>

          {/* Central Architectural Monogram */}
          <div className="flex flex-col items-center justify-center my-auto">
            <div className="w-20 h-16 sm:w-28 sm:h-20 flex items-center justify-center text-[var(--ink)] mb-4">
              <Monogram isPlotting={true} className="w-full h-full" />
            </div>
          </div>

          {/* Bottom metadata with counter */}
          <div className="flex justify-between items-end text-xs font-mono uppercase tracking-widest text-[var(--ink-secondary)]">
            <div className="flex items-center gap-2">
              <span className="text-[var(--accent)]">●</span>
              <span>Human + Machine</span>
            </div>
            <div className="text-xl sm:text-2xl font-mono font-bold text-[var(--ink)] tabular-nums">
              {count.toString().padStart(3, '0')}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
