import React from 'react';
import Monogram from './Monogram';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-[var(--border)] pt-12 pb-8 text-left">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        {/* Brand & Copyright */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-5">
            <Monogram className="w-full h-full text-[var(--ink)]" />
          </div>
          <span className="font-sans font-semibold text-sm text-[var(--ink)]">Aravind MV</span>
          <span className="font-mono text-xs text-[var(--ink-muted)]">
            &copy; {new Date().getFullYear()} · Software Engineer &amp; DevOps
          </span>
        </div>

        {/* Telemetry Status */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--ink)]/[0.03] text-[11px] font-mono text-[var(--ink-secondary)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
          <span>All systems nominal</span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center gap-5 sm:gap-7 font-mono text-xs text-[var(--ink-secondary)]">
          <a
            href="https://github.com/mr-mister007"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--ink)] transition-colors no-underline"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/aravindmv03"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--ink)] transition-colors no-underline"
          >
            LinkedIn
          </a>
          <a
            href="mailto:hello@aravindmv.com"
            className="hover:text-[var(--ink)] transition-colors no-underline"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
