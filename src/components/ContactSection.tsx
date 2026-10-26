import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check } from 'lucide-react';
import { WordsPullUp } from '@/components/ui/prisma-hero';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('hello@aravindmv.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative w-full">
      {/* Expansive Framed Panel */}
      <div className="relative w-full overflow-hidden rounded-2xl md:rounded-[2.5rem] border border-white/10 shadow-2xl bg-black/60 backdrop-blur-xl p-6 sm:p-10 md:p-14 lg:p-16">
        {/* Film grain noise overlay */}
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.5] mix-blend-overlay" />

        {/* Ambient radial glow */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[var(--accent)]/15 blur-3xl" />

        {/* Top Architectural Notch */}
        <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2">
          <div className="flex items-center gap-2 rounded-b-2xl md:rounded-b-3xl bg-black/90 backdrop-blur-md border-b border-x border-white/10 px-4 py-1.5 sm:px-7 sm:py-2 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#E1E0CC]/80 shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            04 // DIRECT DISPATCH &amp; CO-ORDINATES
          </div>
        </div>

        {/* Section Header with Monumental WordsPullUp Typography */}
        <div className="relative z-10 pt-4 sm:pt-6 mb-8 sm:mb-10">
          <h2
            className="font-medium leading-[0.88] tracking-[-0.05em] text-[clamp(2.5rem,7.5vw,5.5rem)] select-none text-[#E1E0CC]"
          >
            <WordsPullUp text="Direct Dispatch" showAsterisk />
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-white/75 max-w-2xl font-sans leading-relaxed mt-2 sm:mt-3">
            Have a distributed system to architect, AI agents to orchestrate, or cloud infrastructure to deploy? Direct channel below.
          </p>
        </div>

        <div className="relative z-10">
          {/* Monumental Email Link */}
          <div className="mb-8 sm:mb-10">
            <a
              href="mailto:hello@aravindmv.com"
              className="text-2xl sm:text-4xl md:text-6xl font-sans font-semibold text-[#E1E0CC] hover:text-white transition-colors inline-flex items-center gap-3 sm:gap-4 tracking-tight break-all no-underline group"
            >
              <span>hello@aravindmv.com</span>
              <span className="flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-white/10 border border-white/15 transition-transform group-hover:scale-110 group-hover:bg-[#E1E0CC] group-hover:text-black shrink-0">
                <ArrowUpRight className="w-5 h-5 sm:w-7 sm:h-7 transition-colors group-hover:text-black text-[#E1E0CC]" />
              </span>
            </a>
          </div>

          {/* Action Buttons in Prisma Pill Style */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pb-10 border-b border-white/10">
            <a
              href="mailto:hello@aravindmv.com"
              className="group inline-flex items-center gap-2 rounded-full bg-[#E1E0CC] py-1.5 pl-6 pr-1.5 text-xs sm:text-sm md:text-base font-semibold text-black transition-all hover:gap-3 hover:bg-white no-underline shadow-lg cursor-pointer"
            >
              <span>Send an email</span>
              <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110">
                <ArrowUpRight className="h-4 w-4 text-[#E1E0CC]" />
              </span>
            </a>

            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-xs sm:text-sm font-mono text-[#E1E0CC] hover:bg-white/10 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-[var(--accent)]" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to clipboard!' : 'Copy email address'}</span>
            </button>
          </div>

          {/* Directory & Telemetry Coordinates */}
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs font-mono">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#E1E0CC]/50 block mb-1">
                01 // GITHUB
              </span>
              <a
                href="https://github.com/mr-mister007"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#E1E0CC] hover:text-white transition-colors inline-flex items-center gap-1.5 no-underline"
              >
                <span>@mr-mister007</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[var(--accent)]" />
              </a>
              <span className="text-[11px] text-white/50 block mt-0.5">
                Repos &amp; IaC
              </span>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#E1E0CC]/50 block mb-1">
                02 // LINKEDIN
              </span>
              <a
                href="https://linkedin.com/in/aravindmv03"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#E1E0CC] hover:text-white transition-colors inline-flex items-center gap-1.5 no-underline"
              >
                <span>in/aravindmv03</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[var(--accent)]" />
              </a>
              <span className="text-[11px] text-white/50 block mt-0.5">
                Professional network
              </span>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#E1E0CC]/50 block mb-1">
                03 // BASE &amp; RESPONSE
              </span>
              <span className="font-bold text-[#E1E0CC] block">
                Bangalore / Remote · 12.97° N, 77.59° E
              </span>
              <span className="text-[11px] text-white/50 block mt-0.5">
                Direct response &lt; 24h
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
