import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { WordsPullUp } from '@/components/ui/prisma-hero';

const projects = [
  {
    number: '01',
    year: '2026',
    sector: 'APPLIED AI & AGENTS',
    title: 'Autonomous Multi-Agent & RAG Platform',
    description:
      'Multi-agent execution pipeline with semantic pgvector retrieval, dynamic tool calling, and streaming inference.',
    metric: '-65% Inference Latency · 100k+ Queries/Day',
    tech: ['Python', 'FastAPI', 'LangChain', 'pgvector'],
    github: 'https://github.com/mr-mister007',
  },
  {
    number: '02',
    year: '2026',
    sector: 'DISTRIBUTED SYSTEMS',
    title: 'High-Concurrency Event Stream Engine',
    description:
      'Distributed API gateway and worker pool processing 10,000+ events/sec with transactional consistency and zero message loss.',
    metric: '10k+ Req/Sec · Sub-15ms p99 Latency',
    tech: ['Go', 'Node.js', 'Kafka', 'Redis', 'PostgreSQL'],
    github: 'https://github.com/mr-mister007',
  },
  {
    number: '03',
    year: '2026',
    sector: 'CLOUD PLATFORMS',
    title: 'Multi-Region EKS & Canary Traffic Mesh',
    description:
      'Zero-downtime enterprise migration of 50+ microservices into AWS EKS with automated ArgoCD GitOps and Istio traffic routing.',
    metric: '50+ Microservices Migrated · Zero Downtime',
    tech: ['AWS EKS', 'Terraform', 'ArgoCD', 'Istio'],
    github: 'https://github.com/mr-mister007',
  },
];

export const ProjectsSection: React.FC = () => {
  return (
    <section id="work" className="relative w-full">
      {/* Expansive Framed Panel */}
      <div className="relative w-full overflow-hidden rounded-2xl md:rounded-[2.5rem] border border-white/10 shadow-2xl bg-black/60 backdrop-blur-xl p-5 sm:p-8 md:p-12 lg:p-14">
        {/* Film grain noise overlay */}
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.5] mix-blend-overlay" />

        {/* Ambient lighting gradients */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />
        <div className="pointer-events-none absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[var(--accent)]/10 blur-3xl" />

        {/* Top Architectural Notch */}
        <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2">
          <div className="flex items-center gap-2 rounded-b-2xl md:rounded-b-3xl bg-black/90 backdrop-blur-md border-b border-x border-white/10 px-4 py-1.5 sm:px-7 sm:py-2 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#E1E0CC]/80 shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            01 // SELECTED ARCHITECTURES
          </div>
        </div>

        {/* Section Header with Monumental WordsPullUp Typography */}
        <div className="relative z-10 pt-4 sm:pt-6 mb-8 sm:mb-12">
          <h2
            className="font-medium leading-[0.88] tracking-[-0.05em] text-[clamp(2.5rem,7.5vw,5.5rem)] select-none text-[#E1E0CC]"
          >
            <WordsPullUp text="Selected Works" showAsterisk />
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-white/75 max-w-2xl font-sans leading-relaxed mt-2 sm:mt-3">
            Production systems engineered for high concurrency, AI agent autonomy, and zero downtime.
          </p>
        </div>

        {/* Concise Project Cards */}
        <div className="relative z-10 space-y-4 sm:space-y-6">
          {projects.map((proj, idx) => (
            <motion.article
              key={proj.number}
              className="relative p-6 sm:p-8 rounded-xl sm:rounded-2xl md:rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md transition-all duration-300 hover:border-white/25 hover:bg-white/[0.05] group overflow-hidden"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex flex-col justify-between gap-5">
                {/* Meta Bar */}
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--accent)] font-bold text-sm">{proj.number}</span>
                    <span className="text-white/30">/</span>
                    <span className="text-[#E1E0CC]/60">{proj.year}</span>
                    <span className="text-white/20">·</span>
                    <span className="px-2.5 py-0.5 rounded-full border border-white/10 bg-white/[0.03] text-[10px] uppercase tracking-wider text-[#E1E0CC]/80">
                      {proj.sector}
                    </span>
                  </div>
                  <span className="text-[10px] text-[var(--accent)] font-mono hidden sm:inline font-bold">
                    VERIFIED
                  </span>
                </div>

                {/* Title & One-line Description */}
                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-sans font-semibold text-[#E1E0CC] mb-2 tracking-tight group-hover:text-white transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-white/70 leading-relaxed font-sans max-w-3xl">
                    {proj.description}
                  </p>
                </div>

                {/* Telemetry Metric Chip & Bottom Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-black/60 text-xs font-mono text-[#E1E0CC] font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-ping" />
                      {proj.metric}
                    </span>
                    <div className="hidden md:flex items-center gap-1.5 text-xs font-mono text-white/50">
                      {proj.tech.map((t, tIdx) => (
                        <span key={t}>
                          {t}
                          {tIdx < proj.tech.length - 1 && <span className="mx-1 text-white/20">·</span>}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn inline-flex items-center gap-2 self-start sm:self-auto rounded-full bg-[#E1E0CC] py-1 pl-4 pr-1 text-xs font-semibold text-black transition-all hover:gap-3 hover:bg-white no-underline shadow-md shrink-0 cursor-pointer"
                  >
                    <span>Inspect</span>
                    <span className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-black transition-transform group-hover/btn:scale-110">
                      <ArrowUpRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#E1E0CC]" />
                    </span>
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
