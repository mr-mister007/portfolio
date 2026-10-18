import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    number: '01',
    year: '2026',
    sector: 'APPLIED AI & AGENTIC SYSTEMS',
    title: 'Autonomous Multi-Agent Orchestration & RAG Platform',
    description:
      'Engineered an enterprise multi-agent pipeline with dynamic tool execution, semantic vector search, and latency-optimized streaming inference. Integrated hybrid caching and automated evaluation loops to eliminate hallucinations.',
    metric: '-65% Inference Latency · 100k+ Queries/Day',
    outcome: 'Sub-second response times with pgvector semantic retrieval and MCP tool integration.',
    tech: ['Python', 'FastAPI', 'LangChain', 'pgvector', 'Docker', 'Kubernetes'],
    github: 'https://github.com/mr-mister007',
  },
  {
    number: '02',
    year: '2026',
    sector: 'BACKEND & DISTRIBUTED SYSTEMS',
    title: 'High-Concurrency Microservices & Event Stream Engine',
    description:
      'Architected distributed asynchronous API gateways and background worker pools capable of processing 10,000+ events per second with transactional consistency, circuit breakers, and zero message loss.',
    metric: '10k+ Req/Sec · 99.99% Availability',
    outcome: 'Sub-15ms p99 latency with horizontal pod autoscaling and Redis cluster caching.',
    tech: ['Node.js', 'Go', 'PostgreSQL', 'Redis', 'Apache Kafka', 'gRPC / REST'],
    github: 'https://github.com/mr-mister007',
  },
  {
    number: '03',
    year: '2026',
    sector: 'CLOUD PLATFORMS & PRODUCTION',
    title: 'Multi-Region EKS Migration & Canary Traffic Mesh',
    description:
      'Engineered an enterprise zero-downtime migration of 50+ microservices from legacy on-premises virtualization into AWS EKS. Built automated GitOps sync loops with ArgoCD and progressive canary traffic weighting via Istio.',
    metric: 'Zero Downtime · 50+ Microservices Migrated',
    outcome: '100% traffic shifted with 0 dropped packets across multi-region VPC peering.',
    tech: ['AWS EKS', 'Terraform', 'ArgoCD', 'Istio Mesh', 'Helm'],
    github: 'https://github.com/mr-mister007',
  },
];

export const ProjectsSection: React.FC = () => {
  return (
    <section id="work" className="relative px-4 sm:px-6 md:px-12 py-16 sm:py-24 max-w-6xl mx-auto text-left">
      {/* Section Divider Rule with Tag */}
      <div className="hd-rule">
        <span className="hd-rule__tag">[ 01 // SELECTED WORK ]</span>
      </div>

      <div className="mb-12 sm:mb-16">
        <h2 className="display text-[var(--ink)] mb-3">
          Selected work<span className="text-[var(--accent)]">.</span>
        </h2>
        <p className="lead max-w-2xl">
          From autonomous AI agent workflows and high-concurrency backend services to self-healing Kubernetes cloud platforms.
        </p>
      </div>

      {/* Editorial Case Studies (No boxes, clean line-divided editorial rows) */}
      <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
        {projects.map((proj, idx) => (
          <motion.article
            key={proj.number}
            className="py-10 sm:py-14 flex flex-col lg:flex-row lg:items-start justify-between gap-6 sm:gap-10 group"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.45, delay: idx * 0.08 }}
          >
            {/* Left Meta & Index */}
            <div className="lg:w-48 shrink-0 font-mono text-xs">
              <div className="flex items-center gap-2 text-[var(--ink-secondary)] mb-1">
                <span className="text-[var(--accent)] font-bold text-sm">{proj.number}</span>
                <span>/</span>
                <span>{proj.year}</span>
              </div>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[var(--ink-secondary)] block">
                {proj.sector}
              </span>
            </div>

            {/* Center Content */}
            <div className="flex-1 max-w-3xl">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-sans text-[var(--ink)] mb-3 tracking-tight group-hover:text-[var(--accent)] transition-colors duration-200">
                {proj.title}
              </h3>

              <p className="text-xs sm:text-sm md:text-base text-[var(--ink-secondary)] leading-relaxed mb-5">
                {proj.description}
              </p>

              {/* Architectural telemetry impact line */}
              <div className="py-2.5 px-3.5 mb-5 rounded bg-[var(--bg-raised)]/60 text-xs font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-l-2 border-[var(--accent)]">
                <span className="font-bold text-[var(--ink)]">{proj.metric}</span>
                <span className="text-[11px] text-[var(--ink-secondary)]">{proj.outcome}</span>
              </div>

              {/* Tech stack inline line */}
              <div className="flex flex-wrap items-center gap-x-2 text-xs font-mono text-[var(--ink-secondary)]">
                <span className="text-[10px] uppercase tracking-wider text-[var(--ink-secondary)] font-bold mr-1">
                  STACK:
                </span>
                {proj.tech.map((t, tIdx) => (
                  <span key={t} className="flex items-center gap-2">
                    <span className="text-[var(--ink)]">{t}</span>
                    {tIdx < proj.tech.length - 1 && <span className="text-[var(--ink-secondary)]/50">·</span>}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Action Link */}
            <div className="lg:w-36 shrink-0 lg:text-right pt-2 lg:pt-0">
              <a
                href={proj.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[var(--ink)] hover:text-[var(--accent)] transition-colors group/link"
              >
                <span>Inspect code</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
