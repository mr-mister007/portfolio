import React from 'react';
import { FadeIn } from './FadeIn';

const links = [
  { label: 'GITHUB', href: 'https://github.com/mr-mister007' },
  { label: 'LINKEDIN', href: 'https://linkedin.com/in/aravindmv03' },
  { label: 'EMAIL', href: 'mailto:hello@aravindmv.com' },
];

export const Footer: React.FC = () => {
  return (
    <footer className="px-6 md:px-12 py-14 border-t border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#06080C] text-left transition-colors">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <FadeIn delay={0} y={6} variant="up" duration={0.5}>
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono font-black text-slate-900 dark:text-white uppercase">ARAVIND</span>
              <span className="text-emerald-500 dark:text-[#D4FF00] text-xs font-mono">//</span>
              <p className="text-xs text-slate-500 dark:text-white/50 font-mono">
                &copy; {new Date().getFullYear()} CLOUD PLATFORM SRE. 99.999% SLA.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.05} y={6} variant="up" duration={0.5}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-50 text-emerald-800 dark:border-[#D4FF00]/20 dark:bg-[#D4FF00]/5 dark:text-[#D4FF00] font-mono text-[11px] font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-[#D4FF00] animate-ping" />
              <span>CLUSTER TELEMETRY: GREEN</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1} y={6} variant="up" duration={0.5}>
            <div className="flex gap-6">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs font-mono font-bold text-slate-600 hover:text-emerald-600 dark:text-white/60 dark:hover:text-[#D4FF00] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
