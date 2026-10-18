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
    <section id="contact" className="relative px-4 sm:px-6 md:px-12 py-16 sm:py-24 max-w-6xl mx-auto text-left">
      {/* Section Divider Rule with Tag */}
      <div className="hd-rule">
        <span className="hd-rule__tag">[ 04 // DISPATCH &amp; DIRECT CHANNEL ]</span>
      </div>

      <div className="mb-10 sm:mb-14">
        <h2 className="display text-[var(--ink)] mb-4">
          Tell me what you&apos;re building<span className="text-[var(--accent)]">.</span>
        </h2>
        <p className="lead max-w-2xl mb-8 sm:mb-10">
          Have a distributed backend to architect, an AI agent system to build, or cloud infrastructure to deploy? Send me the requirements.
        </p>

        {/* Large Editorial Direct Email Link (0 boxes, high-impact typography) */}
        <div className="mb-8">
          <a
            href="mailto:hello@aravindmv.com"
            className="text-2xl sm:text-4xl md:text-5xl font-sans font-bold text-[var(--ink)] hover:text-[var(--accent)] transition-colors inline-flex items-center gap-2 sm:gap-3 tracking-tight break-all"
          >
            <span>hello@aravindmv.com</span>
            <ArrowUpRight className="w-6 h-6 sm:w-10 sm:h-10 text-[var(--accent)] shrink-0" />
          </a>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <a
            href="mailto:hello@aravindmv.com"
            className="btn w-full sm:w-auto justify-center"
          >
            <span>Send an email</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <button
            onClick={copyEmail}
            className="btn btn--ghost w-full sm:w-auto justify-center cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-[var(--accent)]" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied to clipboard' : 'Copy email address'}</span>
          </button>
        </div>
      </div>

      {/* Directory & Telemetry Coordinates Ledger (No boxes, clean line-divided row) */}
      <div className="border-t border-[var(--border)] pt-8 mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-mono">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-[var(--ink-secondary)] block mb-1">
            01 // GITHUB
          </span>
          <a
            href="https://github.com/mr-mister007"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-[var(--ink)] hover:text-[var(--accent)] transition-colors inline-flex items-center gap-1"
          >
            <span>@mr-mister007</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
          <span className="text-[11px] text-[var(--ink-secondary)] block mt-0.5">
            Open source repositories &amp; IaC
          </span>
        </div>

        <div>
          <span className="text-[10px] uppercase tracking-wider text-[var(--ink-secondary)] block mb-1">
            02 // LINKEDIN
          </span>
          <a
            href="https://linkedin.com/in/aravindmv03"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-[var(--ink)] hover:text-[var(--accent)] transition-colors inline-flex items-center gap-1"
          >
            <span>in/aravindmv03</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
          <span className="text-[11px] text-[var(--ink-secondary)] block mt-0.5">
            Professional recommendations
          </span>
        </div>

        <div>
          <span className="text-[10px] uppercase tracking-wider text-[var(--ink-secondary)] block mb-1">
            03 // BASE &amp; RESPONSE
          </span>
          <span className="font-bold text-[var(--ink)] block">
            Bangalore (12.97° N, 77.59° E)
          </span>
          <span className="text-[11px] text-[var(--ink-secondary)] block mt-0.5">
            SLA: Direct response within 24h
          </span>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
