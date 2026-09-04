import React, { useState } from 'react';
import { FadeIn } from './FadeIn';
import SpotlightCard from './SpotlightCard';
import {
  Mail,
  Copy,
  Check,
  Terminal,
  Clock,
  ArrowUpRight,
  Radio,
} from 'lucide-react';

const links = [
  {
    label: 'GITHUB // REPOS',
    href: 'https://github.com/mr-mister007',
    handle: '@mr-mister007',
    sub: 'Open source & infra repos',
  },
  {
    label: 'LINKEDIN // PROFILE',
    href: 'https://linkedin.com/in/aravindmv03',
    handle: 'in/aravindmv03',
    sub: 'Professional network',
  },
  {
    label: 'EMAIL // DISPATCH',
    href: 'mailto:hello@aravindmv.com',
    handle: 'hello@aravindmv.com',
    sub: 'Direct communications',
  },
];

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('hello@aravindmv.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative px-4 sm:px-6 md:px-12 py-24 max-w-5xl mx-auto w-full">
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-800 dark:border-[#D4FF00]/20 dark:bg-[#D4FF00]/5 dark:text-[#D4FF00] font-mono text-xs uppercase tracking-widest mb-3 font-semibold">
          <Radio className="w-3.5 h-3.5" />
          <span>[ 05 // DISPATCH &amp; DIRECT CHANNEL ]</span>
        </div>
        <h2 className="text-[clamp(2.2rem,5.5vw,4.5rem)] font-black uppercase text-slate-900 dark:text-white tracking-tight leading-none mb-3">
          Let&apos;s Build Something Resilient
        </h2>
        <p className="text-slate-600 dark:text-white/60 text-sm sm:text-base max-w-xl mx-auto font-normal">
          Have a cloud platform to engineer, a Kubernetes cluster to migrate, or CI/CD pipelines to accelerate? My terminal is always open.
        </p>
      </div>

      {/* Interactive Terminal Dispatcher Card */}
      <FadeIn delay={0.2} y={12} variant="up" duration={0.6}>
        <SpotlightCard className="p-6 sm:p-8 mb-10 shadow-xl">
          <div className="flex flex-wrap items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4 mb-5 gap-2 text-left">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-[#D4FF00] font-bold">
              <Terminal className="w-4 h-4" />
              <span>contact_dispatcher.sh</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-white/50">
              <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-[#D4FF00]" />
              <span>IST (UTC+5:30) · STATUS: OPEN FOR MISSIONS</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800 dark:border-white/10 shadow-inner">
            <div className="font-mono text-sm sm:text-base text-white text-left">
              <span className="text-emerald-400 dark:text-[#D4FF00] mr-2 font-black">$</span>
              <span>echo &ldquo;hello@aravindmv.com&rdquo; | mail</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={copyEmail}
                className="px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-mono text-white font-bold transition-all flex items-center gap-1.5 uppercase cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400 dark:text-[#D4FF00]" /> : <Copy className="w-3.5 h-3.5 text-emerald-400 dark:text-[#D4FF00]" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Email'}</span>
              </button>

              <a
                href="mailto:hello@aravindmv.com"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 dark:bg-[#D4FF00] dark:hover:bg-[#CCFF00] text-white dark:text-slate-950 font-black text-xs font-mono transition-all flex items-center gap-1.5 shadow-[0_4px_20px_rgba(16,185,129,0.3)] dark:shadow-[0_0_20px_rgba(212,255,0,0.3)] uppercase tracking-wider"
              >
                <span>Send Mail</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </SpotlightCard>
      </FadeIn>

      {/* Social / Network Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
        {links.map((link, i) => (
          <FadeIn key={link.label} delay={0.25 + i * 0.08} y={10} variant="up" duration={0.5}>
            <SpotlightCard className="p-5">
              <a
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="block group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-white/50 group-hover:text-emerald-600 dark:group-hover:text-[#D4FF00] transition-colors font-bold">
                    {link.label}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 dark:text-white/40 group-hover:text-emerald-600 dark:group-hover:text-[#D4FF00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <span className="text-base font-black font-mono text-slate-900 dark:text-white block mb-0.5 group-hover:text-emerald-600 dark:group-hover:text-[#D4FF00] transition-colors">
                  {link.handle}
                </span>
                <span className="text-xs text-slate-500 dark:text-white/50 font-normal">
                  {link.sub}
                </span>
              </a>
            </SpotlightCard>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

export default ContactSection;
