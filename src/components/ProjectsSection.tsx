import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from './FadeIn';
import SpotlightCard from './SpotlightCard';
import GitHubStats from './GitHubStats';
import {
  ShieldCheck,
  Zap,
  TrendingDown,
  ExternalLink,
  Terminal,
  Flag,
} from 'lucide-react';

const projects = [
  {
    number: '01',
    sector: 'SECTOR 01 // CLUSTER ORCHESTRATION',
    title: 'Kubernetes Multi-Region Migration & Canary Mesh',
    description:
      'Engineered an enterprise zero-downtime migration of 50+ microservices from legacy on-prem servers into AWS EKS. Designed automated GitOps sync with ArgoCD and progressive canary traffic weighting with Istio.',
    tech: ['AWS EKS', 'Terraform', 'ArgoCD', 'Istio Mesh', 'Canary Rollouts'],
    metric: {
      value: 'Zero Downtime',
      label: '50+ Microservices Migrated',
      icon: ShieldCheck,
      color: 'text-emerald-500 dark:text-[#D4FF00]',
    },
    codeSnippet: [
      '$ argocd app sync production-cluster --prune',
      'TIMESTAMP            GROUP        KIND         NAME        STATUS',
      '2026-09-04T10:00:12  apps         Deployment   api-mesh    Synced [OK]',
      '2026-09-04T10:00:15  networking   Ingress      alb-ingress Synced [OK]',
      'TELEMETRY VERIFIED: 100% traffic shifted with 0 dropped packets.',
    ],
    github: 'https://github.com/mr-mister007',
  },
  {
    number: '02',
    sector: 'SECTOR 02 // DEVSECOPS & SUPPLY CHAIN',
    title: 'High-Velocity Cryptographic Delivery Pipeline',
    description:
      'Constructed a hardened CI/CD supply chain platform for 15+ squads. Integrated vulnerability screening with Trivy, container provenance signing via Cosign, and automated blue/green deployment gates.',
    tech: ['GitHub Actions', 'Docker Buildx', 'Cosign OIDC', 'Trivy', 'Kubernetes'],
    metric: {
      value: '10x Faster',
      label: 'Deploy Lead Time (4m 12s)',
      icon: Zap,
      color: 'text-sky-500 dark:text-[#00F2FE]',
    },
    codeSnippet: [
      '$ cosign verify --key ecr-key.pub ecr.aws/prod/api:v2',
      'Verification for ecr.aws/prod/api:v2 --',
      '  - Cryptographic signatures validated via Sigstore OIDC [PASSED]',
      '  - 0 Critical / 0 High CVEs detected by Trivy gate [PASSED]',
      'PROMOTED: Image certified and pushed to production registry.',
    ],
    github: 'https://github.com/mr-mister007',
  },
  {
    number: '03',
    sector: 'SECTOR 03 // FINOPS & AUTONOMOUS SCALING',
    title: 'Autonomous Cloud Bin-Packing & Spot Optimizer',
    description:
      'Reduced monthly AWS infrastructure expenditure by 40% through Karpenter intelligent node bin-packing, Graviton ARM64 spot instances, and automated idle resource termination.',
    tech: ['AWS EKS', 'Terraform', 'Karpenter', 'Python SRE', 'Grafana'],
    metric: {
      value: '-40% Spend',
      label: 'Saved $140k+ Annually',
      icon: TrendingDown,
      color: 'text-emerald-500 dark:text-[#D4FF00]',
    },
    codeSnippet: [
      '$ karpenter-optimizer status --cluster=prod-core',
      'Provisioning Engine: Karpenter Spot + Graviton ARM64',
      'Monthly Baseline Spend:  $25,400/mo',
      'Optimized Active Spend:  $15,240/mo (Savings: 40.0%)',
      'EFFICIENCY: Node bin-packing density optimized to 91.2%.',
    ],
    github: 'https://github.com/mr-mister007',
  },
];

export const ProjectsSection: React.FC = () => {
  return (
    <section id="work" className="relative px-4 sm:px-6 md:px-12 py-24 max-w-6xl mx-auto">
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-800 dark:border-[#D4FF00]/20 dark:bg-[#D4FF00]/5 dark:text-[#D4FF00] font-mono text-xs uppercase tracking-widest mb-3 font-semibold">
          <Flag className="w-3.5 h-3.5" />
          <span>[ 03 // TRACK RECORD & DEPLOYMENTS ]</span>
        </div>
        <h2 className="text-[clamp(2.2rem,5.5vw,4.5rem)] font-black uppercase text-slate-900 dark:text-white tracking-tight leading-none mb-3">
          Production Deployments
        </h2>
        <p className="text-slate-600 dark:text-white/60 text-sm sm:text-base max-w-xl mx-auto font-normal">
          Real-world cloud platform migrations, security pipelines, and autonomous infrastructure built for scale.
        </p>
      </div>

      {/* Case Study Cards */}
      <div className="space-y-8">
        {projects.map((project, i) => {
          const MetricIcon = project.metric.icon;
          return (
            <FadeIn key={project.number} delay={0.1 + i * 0.08} y={20} variant="up" duration={0.6}>
              <SpotlightCard className="p-6 sm:p-10">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                  {/* Left Column: Info */}
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl sm:text-5xl font-mono font-black text-emerald-600 dark:text-[#D4FF00]">
                        {project.number}
                      </span>
                      <div className="h-6 w-[1px] bg-slate-200 dark:bg-white/15" />
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-white/60 font-bold">
                        {project.sector}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-black uppercase text-slate-900 dark:text-white mb-4 tracking-tight">
                      {project.title}
                    </h3>

                    <p className="text-slate-600 dark:text-white/70 font-normal text-sm sm:text-base leading-relaxed mb-6 max-w-2xl">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 rounded-lg text-xs font-mono font-semibold bg-slate-100 border border-slate-200/80 text-slate-700 dark:bg-white/5 dark:border-white/10 dark:text-white/90 hover:border-emerald-500/40 dark:hover:border-[#D4FF00]/40 transition-colors"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-[#D4FF00] font-bold hover:underline uppercase tracking-wider"
                    >
                      <span>Inspect Infrastructure Blueprint</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Right Column: Metric Badge & Live Audit Snippet */}
                  <div className="w-full lg:w-96 flex flex-col justify-between shrink-0 space-y-4">
                    {/* Metric Box */}
                    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#0E121B] border border-slate-200/80 dark:border-white/15 flex items-center justify-between text-left shadow-sm">
                      <div>
                        <span className="text-3xl font-black font-mono text-slate-900 dark:text-white block tracking-tight">
                          {project.metric.value}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-white/50 font-mono uppercase mt-1 block">
                          {project.metric.label}
                        </span>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-[#D4FF00]/10 border border-emerald-500/30 dark:border-[#D4FF00]/30 flex items-center justify-center">
                        <MetricIcon className={`w-5 h-5 ${project.metric.color}`} />
                      </div>
                    </div>

                    {/* Terminal Audit Log */}
                    <div className="rounded-2xl border border-slate-800 dark:border-white/10 bg-slate-950 p-4 font-mono text-xs leading-relaxed overflow-x-auto text-left shadow-inner">
                      <div className="flex items-center justify-between text-white/50 pb-2 mb-2 border-b border-white/10">
                        <div className="flex items-center gap-2">
                          <Terminal className="w-3.5 h-3.5 text-emerald-400 dark:text-[#D4FF00]" />
                          <span className="text-[11px] text-white/60">audit-trail.log</span>
                        </div>
                        <span className="text-[10px] text-emerald-400 dark:text-[#D4FF00] font-bold">VERIFIED</span>
                      </div>
                      <div className="space-y-1">
                        {project.codeSnippet.map((line, idx) => (
                          <div
                            key={idx}
                            className={
                              line.startsWith('$')
                                ? 'text-emerald-400 dark:text-[#D4FF00] font-bold'
                                : line.includes('TELEMETRY') || line.includes('PROMOTED') || line.includes('EFFICIENCY')
                                ? 'text-cyan-400 dark:text-[#00F2FE] font-bold'
                                : 'text-white/60'
                            }
                          >
                            {line}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </FadeIn>
          );
        })}
      </div>

      {/* GitHub Ecosystem Stats */}
      <div className="mt-14">
        <FadeIn delay={0.3} y={12} variant="up" duration={0.6}>
          <GitHubStats />
        </FadeIn>
      </div>
    </section>
  );
};

export default ProjectsSection;
