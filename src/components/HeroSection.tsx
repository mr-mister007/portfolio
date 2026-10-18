import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-28 sm:pt-36 md:pt-40 pb-16 sm:pb-24 px-4 sm:px-6 md:px-12 max-w-6xl mx-auto text-left">
      {/* Top Technical Metadata Bar */}
      <motion.div
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 sm:pb-5 border-b border-[var(--border)] text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[var(--ink-secondary)] mb-8 sm:mb-12"
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
          <span>Aravind · Systems &amp; AI Engineer</span>
        </div>
        <span className="hidden md:inline">Base camp · 12.97° N, 77.59° E · Bangalore / Remote</span>
        <span className="flex items-center gap-2 text-[var(--ink)] font-semibold text-[10px] sm:text-xs">
          <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-ping" />
          Taking ideas to production
        </span>
      </motion.div>

      {/* Main Dual Title (Human + Machine) */}
      <div className="mb-8 sm:mb-12">
        <motion.h1
          className="display text-[var(--ink)] mb-3 sm:mb-4 select-none"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        >
          I build systems<span className="text-[var(--accent)] blink-dot">.</span>
        </motion.h1>

        <motion.p
          className="h2 max-w-4xl"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.25, 1, 0.5, 1] }}
        >
          Backend architectures, applied AI engineering, and production cloud deployments — from first prototype to mission-critical scale.
        </motion.p>
      </div>

      {/* Micro-notes / Technical Tokens */}
      <motion.div
        className="flex flex-wrap items-center gap-x-6 gap-y-2.5 py-3 sm:py-4 border-y border-[var(--border)] text-[11px] sm:text-xs font-mono text-[var(--ink-secondary)] mb-8 sm:mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <p className="flex items-center gap-2">
          <span className="text-[var(--accent)] font-bold">●</span>
          <span>human · architected with discipline</span>
        </p>
        <p className="flex items-center gap-2">
          <span className="text-[var(--accent)] font-bold">◆</span>
          <span>machine · AI agents · distributed backends · 99.999% SLA</span>
        </p>
        <p className="flex items-center gap-2 hidden md:flex">
          <span className="text-[var(--accent)] font-bold">▲</span>
          <span>blueprint · full-lifecycle engineering</span>
        </p>
      </motion.div>

      {/* Hero Foot (Intro & CTAs) */}
      <motion.div
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 sm:gap-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.28 }}
      >
        <p className="lead max-w-xl">
          Bridging the gap between software engineering, applied AI, and production cloud infrastructure. Fast to iterate on, resilient at high-concurrency scale.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto shrink-0">
          <a href="#contact" className="btn w-full sm:w-auto justify-center">
            <span>Tell me what you&apos;re building</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a href="#work" className="btn btn--ghost w-full sm:w-auto justify-center">
            <span>See selected work</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
