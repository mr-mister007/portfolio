import React from 'react';
import { FadeIn } from './FadeIn';
import SpotlightCard from './SpotlightCard';
import PipelineAnimation from './PipelineAnimation';
import TerminalWidget from './TerminalWidget';
import {
  Layers,
  Activity,
  Cpu,
  Zap,
  Gauge,
} from 'lucide-react';

const toolchain = [
  { name: 'Kubernetes / EKS', category: 'Orchestration', color: 'border-emerald-500/30 text-emerald-700 dark:text-[#D4FF00] dark:border-[#D4FF00]/30 bg-emerald-50/50 dark:bg-[#D4FF00]/5' },
  { name: 'Terraform / IaC', category: 'Provisioning', color: 'border-slate-300 dark:border-white/20 text-slate-800 dark:text-white bg-slate-100/50 dark:bg-white/5' },
  { name: 'Docker & Buildx', category: 'Containers', color: 'border-sky-500/30 text-sky-700 dark:text-[#00F2FE] dark:border-[#00F2FE]/30 bg-sky-50/50 dark:bg-[#00F2FE]/5' },
  { name: 'ArgoCD / GitOps', category: 'Delivery', color: 'border-emerald-500/30 text-emerald-700 dark:text-[#D4FF00] dark:border-[#D4FF00]/30 bg-emerald-50/50 dark:bg-[#D4FF00]/5' },
  { name: 'GitHub Actions', category: 'CI Automation', color: 'border-slate-300 dark:border-white/20 text-slate-800 dark:text-white bg-slate-100/50 dark:bg-white/5' },
  { name: 'Prometheus & Grafana', category: 'Observability', color: 'border-amber-500/30 text-amber-700 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-500/5' },
  { name: 'AWS Multi-Region', category: 'Cloud Architecture', color: 'border-emerald-500/30 text-emerald-700 dark:text-[#D4FF00] dark:border-[#D4FF00]/30 bg-emerald-50/50 dark:bg-[#D4FF00]/5' },
  { name: 'Trivy & Cosign', category: 'DevSecOps', color: 'border-sky-500/30 text-sky-700 dark:text-[#00F2FE] dark:border-[#00F2FE]/30 bg-sky-50/50 dark:bg-[#00F2FE]/5' },
];

const stats = [
  { value: '140+', label: 'Automated Pipelines', detail: 'GitHub Actions & ArgoCD' },
  { value: '500+', label: 'Containers in Production', detail: 'Zero-downtime clusters' },
  { value: '99.999%', label: 'Infrastructure SLA', detail: 'Multi-region high availability' },
  { value: '-42%', label: 'Cloud Spend Cut', detail: 'Karpenter spot auto-packing' },
];

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative px-4 sm:px-6 md:px-12 py-24 max-w-6xl mx-auto">
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-800 dark:border-[#D4FF00]/20 dark:bg-[#D4FF00]/5 dark:text-[#D4FF00] font-mono text-xs uppercase tracking-widest mb-3 font-semibold">
          <Gauge className="w-3.5 h-3.5" />
          <span>[ 04 // PLATFORM ARCHITECTURE & TECH SPECS ]</span>
        </div>
        <h2 className="text-[clamp(2.2rem,5.5vw,4.5rem)] font-black uppercase text-slate-900 dark:text-white tracking-tight leading-none mb-3">
          High-Velocity Capabilities
        </h2>
        <p className="text-slate-600 dark:text-white/60 text-sm sm:text-base max-w-xl mx-auto font-normal">
          Architectural discipline engineered for fault tolerance, rapid feedback loops, and self-healing scale.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Bento Card 1: Bio & Philosophy (2 Cols) */}
        <FadeIn delay={0.15} y={16} variant="up" duration={0.6} className="md:col-span-2">
          <SpotlightCard className="p-6 sm:p-8 h-full flex flex-col justify-between text-left">
            <div>
              <div className="flex items-center gap-2 mb-4 text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-[#D4FF00] font-bold">
                <Cpu className="w-4 h-4" />
                <span>ENGINEERING PHILOSOPHY</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black uppercase text-slate-900 dark:text-white mb-4 tracking-tight">
                Automating the path from code to production with zero friction.
              </h3>
              <p className="text-slate-600 dark:text-white/70 font-normal leading-relaxed text-sm sm:text-base mb-6">
                With over two years in cloud engineering and Kubernetes platform operations, I engineer immutable infrastructure, eliminate manual deployment bottlenecks, and maintain resilient production environments. Every cluster is declarative, observable, and reproducible through code.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-50 dark:border-[#D4FF00]/30 dark:bg-[#D4FF00]/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 dark:text-[#D4FF00]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-[#D4FF00] animate-ping" />
                <span className="font-bold">PRODUCTION RUNTIME GUARANTEE</span>
              </div>
              <span className="text-xs font-mono text-emerald-700 dark:text-[#D4FF00]/90 font-bold">
                SLO: 99.999% Availability
              </span>
            </div>
          </SpotlightCard>
        </FadeIn>

        {/* Bento Card 2: Production Scale Stats (1 Col) */}
        <FadeIn delay={0.25} y={16} variant="up" duration={0.6} className="md:col-span-1">
          <SpotlightCard className="p-6 sm:p-8 h-full flex flex-col justify-between text-left">
            <div className="flex items-center gap-2 mb-4 text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-[#D4FF00] font-bold">
              <Activity className="w-4 h-4" />
              <span>TELEMETRY RECORD</span>
            </div>

            <div className="space-y-4">
              {stats.map((s, idx) => (
                <div key={idx} className="pb-3 border-b border-slate-200 dark:border-white/10 last:border-0 last:pb-0">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white block leading-none mb-1">
                    {s.value}
                  </span>
                  <span className="text-xs font-bold font-mono text-emerald-600 dark:text-[#D4FF00] block uppercase">
                    {s.label}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-white/50 block">
                    {s.detail}
                  </span>
                </div>
              ))}
            </div>
          </SpotlightCard>
        </FadeIn>

        {/* Bento Card 3: Toolchain Matrix (Full Width) */}
        <FadeIn delay={0.3} y={16} variant="up" duration={0.6} className="md:col-span-3">
          <SpotlightCard className="p-6 sm:p-8 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-[#D4FF00] font-bold">
                <Layers className="w-4 h-4" />
                <span>PRODUCTION TOOLCHAIN &amp; PIT-CREW RIG</span>
              </div>
              <span className="text-xs text-slate-500 dark:text-white/50 font-mono">
                Battle-tested in high-load AWS environments
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {toolchain.map((tool, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border ${tool.color} flex flex-col justify-between transition-all hover:scale-[1.03] cursor-default`}
                >
                  <span className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                    {tool.name}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-white/50">
                    {tool.category}
                  </span>
                </div>
              ))}
            </div>
          </SpotlightCard>
        </FadeIn>

      </div>

      {/* Pipeline Visualizer Stream */}
      <FadeIn delay={0.35} y={12} variant="up" duration={0.6}>
        <div className="mb-10 py-5 px-4 rounded-2xl border border-slate-200 dark:border-white/15 bg-white/80 dark:bg-[#090C12] shadow-sm dark:shadow-lg text-left">
          <div className="flex items-center gap-2 px-2 mb-3 text-xs font-mono text-slate-600 dark:text-white/60">
            <Zap className="w-3.5 h-3.5 text-emerald-600 dark:text-[#D4FF00]" />
            <span className="font-bold text-slate-800 dark:text-white/80 uppercase">Continuous Delivery Pipeline Stream</span>
          </div>
          <PipelineAnimation />
        </div>
      </FadeIn>

      {/* Terminal Widget */}
      <FadeIn delay={0.4} y={12} variant="up" duration={0.6}>
        <TerminalWidget />
      </FadeIn>
    </section>
  );
};

export default AboutSection;
