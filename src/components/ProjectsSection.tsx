import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    number: '01',
    year: '2024–2026',
    role: 'Cloud Platforms & AKS',
    title: 'Cloud-Native AKS Platform & Zero-Downtime Delivery',
    description:
      'Multi-environment Azure Kubernetes Service (AKS) clusters with automated GitHub Actions pipelines, container registry integration, and zero-downtime rolling and canary rollout policies for production microservices.',
    metric: 'Zero-downtime rollouts · Multi-env AKS',
    tech: ['Azure AKS', 'Terraform', 'GitHub Actions', 'Docker', 'Helm'],
    github: 'https://github.com/mr-mister007',
  },
  {
    number: '02',
    year: '2024–2026',
    role: 'Applied AI & Agents',
    title: 'Production AI Applications & Agentic Workflows',
    description:
      'Containerized end-to-end AI applications featuring LLM orchestration, retrieval-augmented generation (RAG), Model Context Protocol (MCP) tool execution, and low-latency REST and streaming APIs.',
    metric: 'End-to-end RAG & agentic workflows',
    tech: ['Python', 'FastAPI', 'LangChain', 'pgvector', 'Docker'],
    github: 'https://github.com/mr-mister007',
  },
  {
    number: '03',
    year: '2024–2026',
    role: 'CI/CD & DevSecOps',
    title: 'Multi-Cloud CI/CD & Observability Mesh',
    description:
      'Over 100 automated CI/CD pipelines and 100+ containerized production services across AWS, Azure, and GCP with Trivy vulnerability scanning, OpenTelemetry tracing, Prometheus, and Grafana.',
    metric: '100+ pipelines · 100+ containers',
    tech: ['GitHub Actions', 'ArgoCD', 'Trivy', 'Prometheus', 'OpenTelemetry'],
    github: 'https://github.com/mr-mister007',
  },
];

export const ProjectsSection: React.FC = () => {
  return (
    <section id="work" className="relative w-full scroll-mt-28">
      {/* Minimal Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-6 border-b border-[var(--border)] mb-2">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] block mb-1.5">
            01 / Work
          </span>
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[var(--ink)]">
            Selected Systems
          </h2>
        </div>
        <span className="text-xs font-mono text-[var(--ink-muted)]">
          Production Deployments · 2024–2026
        </span>
      </div>

      {/* Minimal Architectural List */}
      <div className="divide-y divide-[var(--border)]">
        {projects.map((proj, idx) => (
          <motion.article
            key={proj.number}
            className="group py-8 sm:py-10 transition-colors"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: idx * 0.05 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
              {/* Left Column: Number & Role */}
              <div className="md:col-span-3 flex md:flex-col justify-between md:justify-start gap-1">
                <span className="font-mono text-sm text-[var(--accent)] font-semibold">
                  {proj.number}
                </span>
                <span className="text-xs font-mono text-[var(--ink-secondary)]">
                  {proj.role}
                </span>
                <span className="text-xs font-mono text-[var(--ink-muted)] hidden md:block mt-1">
                  {proj.year}
                </span>
              </div>

              {/* Middle Column: Title & Description */}
              <div className="md:col-span-7 space-y-2">
                <h3 className="text-lg sm:text-xl font-medium text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors tracking-tight">
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-underline text-inherit inline-flex items-center gap-1.5"
                  >
                    <span>{proj.title}</span>
                  </a>
                </h3>
                <p className="text-sm text-[var(--ink-secondary)] leading-relaxed font-sans max-w-2xl">
                  {proj.description}
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-[var(--ink-muted)]">
                  <span className="text-[var(--accent)] text-[11px] font-semibold">{proj.metric}</span>
                  <span>·</span>
                  <span>{proj.tech.join(' · ')}</span>
                </div>
              </div>

              {/* Right Column: Link Arrow */}
              <div className="md:col-span-2 flex justify-start md:justify-end pt-1">
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-mono text-[var(--ink-secondary)] hover:text-[var(--ink)] transition-colors no-underline"
                >
                  <span>Inspect</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[var(--accent)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
