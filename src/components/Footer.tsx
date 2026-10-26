import React from 'react';
import Monogram from './Monogram';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full rounded-2xl md:rounded-[2rem] border border-white/10 py-8 sm:py-10 px-6 sm:px-10 bg-black/80 backdrop-blur-xl text-left shadow-2xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        {/* Brand & Copyright */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-5">
            <Monogram className="w-full h-full text-[#E1E0CC]" />
          </div>
          <span className="font-sans font-bold text-sm text-[#E1E0CC]">Aravind</span>
          <span className="font-mono text-xs text-[#E1E0CC]/50">
            &copy; {new Date().getFullYear()} · Systems &amp; AI
          </span>
        </div>

        {/* Telemetry Status */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-[11px] font-mono text-[#E1E0CC]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-ping" />
          <span>TELEMETRY: ALL SYSTEMS NOMINAL</span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center gap-5 sm:gap-7 font-mono text-xs text-[#E1E0CC]/70">
          <a
            href="https://github.com/mr-mister007"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors no-underline"
          >
            GITHUB
          </a>
          <a
            href="https://linkedin.com/in/aravindmv03"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors no-underline"
          >
            LINKEDIN
          </a>
          <a
            href="mailto:hello@aravindmv.com"
            className="hover:text-white transition-colors no-underline"
          >
            EMAIL
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
