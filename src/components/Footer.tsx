import React from 'react';
import Monogram from './Monogram';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-[var(--border)] py-12 px-4 sm:px-6 md:px-12 bg-[var(--bg)] text-left">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        {/* Brand & Copyright */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-5">
            <Monogram className="w-full h-full text-[var(--ink)]" />
          </div>
          <span className="font-sans font-bold text-sm text-[var(--ink)]">Aravind</span>
          <span className="font-mono text-xs text-[var(--ink-secondary)]">
            &copy; {new Date().getFullYear()} · Systems &amp; AI
          </span>
        </div>

        {/* Telemetry Status */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--bg-raised)] text-[11px] font-mono text-[var(--ink)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-ping" />
          <span>TELEMETRY: ALL SYSTEMS NOMINAL</span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-xs text-[var(--ink-secondary)]">
          <a
            href="https://github.com/mr-mister007"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--accent)] transition-colors no-underline"
          >
            GITHUB
          </a>
          <a
            href="https://linkedin.com/in/aravindmv03"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--accent)] transition-colors no-underline"
          >
            LINKEDIN
          </a>
          <a
            href="mailto:hello@aravindmv.com"
            className="hover:text-[var(--accent)] transition-colors no-underline"
          >
            EMAIL
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
