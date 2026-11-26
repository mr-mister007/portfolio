import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('hello@aravindmv.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative w-full scroll-mt-28">
      {/* Minimal Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-6 border-b border-[var(--border)] mb-8 sm:mb-12">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] block mb-1.5">
            04 / Contact
          </span>
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[var(--ink)]">
            Direct Dispatch
          </h2>
        </div>
        <span className="text-xs font-mono text-[var(--ink-muted)]">
          Open for opportunities
        </span>
      </div>

      {/* Hero-like Direct Email Link */}
      <div className="mb-8">
        <a
          href="mailto:hello@aravindmv.com"
          className="text-3xl sm:text-5xl md:text-6xl font-medium text-[var(--ink)] hover:text-[var(--accent)] transition-colors inline-flex items-center gap-3 sm:gap-4 tracking-tight break-all no-underline group"
        >
          <span>hello@aravindmv.com</span>
          <ArrowUpRight className="w-6 h-6 sm:w-10 sm:h-10 text-[var(--accent)] transition-transform group-hover:translate-x-1.5 group-hover:-translate-y-1.5 shrink-0" />
        </a>
      </div>

      {/* Minimal Buttons */}
      <div className="flex flex-wrap items-center gap-3 pb-12 border-b border-[var(--border)]">
        <a
          href="mailto:hello@aravindmv.com"
          className="inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-5 py-2 text-xs sm:text-sm font-semibold text-[var(--bg)] transition-all hover:opacity-90 no-underline shadow-sm"
        >
          <span>Send an Email</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>

        <button
          onClick={copyEmail}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] text-xs sm:text-sm font-mono text-[var(--ink-secondary)] hover:text-[var(--ink)] hover:border-[var(--control-line)] transition-colors cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-[var(--accent)]" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy address'}</span>
        </button>
      </div>

      {/* Minimal Coordinate Grid */}
      <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-mono">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-[var(--ink-muted)] block mb-1">
            GitHub
          </span>
          <a
            href="https://github.com/mr-mister007"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[var(--ink)] hover:text-[var(--accent)] transition-colors inline-flex items-center gap-1 no-underline"
          >
            <span>@mr-mister007</span>
            <ArrowUpRight className="w-3 h-3 text-[var(--accent)]" />
          </a>
        </div>

        <div>
          <span className="text-[10px] uppercase tracking-wider text-[var(--ink-muted)] block mb-1">
            LinkedIn
          </span>
          <a
            href="https://linkedin.com/in/aravindmv03"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[var(--ink)] hover:text-[var(--accent)] transition-colors inline-flex items-center gap-1 no-underline"
          >
            <span>in/aravindmv03</span>
            <ArrowUpRight className="w-3 h-3 text-[var(--accent)]" />
          </a>
        </div>

        <div>
          <span className="text-[10px] uppercase tracking-wider text-[var(--ink-muted)] block mb-1">
            Location
          </span>
          <span className="text-[var(--ink)] block">
            Kochi, Kerala · +91 8330035029
          </span>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
