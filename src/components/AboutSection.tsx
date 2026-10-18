import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: '140+', label: 'Automated Pipelines', detail: 'GitHub Actions & ArgoCD GitOps' },
  { value: '500+', label: 'Production Containers', detail: 'Zero-downtime microservices' },
  { value: '99.999%', label: 'Infrastructure Availability', detail: 'Multi-region fault-tolerant clusters' },
  { value: '-42%', label: 'Cloud Spend Cut', detail: 'Karpenter spot auto-packing' },
];

const specCategories = [
  {
    category: '01 / APPLIED AI & LLMS',
    tools: 'Python, LangChain, LlamaIndex, OpenAI / Anthropic APIs, pgvector, Ollama, FastEmbed',
  },
  {
    category: '02 / BACKEND & DISTRIBUTED SYSTEMS',
    tools: 'Python / FastAPI, Node.js / TypeScript, Go, PostgreSQL, Redis, Apache Kafka, gRPC',
  },
  {
    category: '03 / CLOUD PLATFORMS & CONTAINERS',
    tools: 'AWS EKS, Docker Buildx, Terraform, Terragrunt, Helm, Karpenter, Istio Mesh',
  },
  {
    category: '04 / DELIVERY, SECURITY & TELEMETRY',
    tools: 'GitHub Actions, ArgoCD GitOps, Trivy, Cosign OIDC, Prometheus, Grafana, OpenTelemetry',
  },
];

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative px-4 sm:px-6 md:px-12 py-16 sm:py-24 max-w-6xl mx-auto text-left">
      {/* Section Divider Rule with Tag */}
      <div className="hd-rule">
        <span className="hd-rule__tag">[ 03 // MANIFESTO &amp; SPECS ]</span>
      </div>

      <div className="mb-12 sm:mb-16">
        <h2 className="display text-[var(--ink)] mb-3">
          Manifesto<span className="text-[var(--accent)]">.</span>
        </h2>
        <p className="lead max-w-2xl">
          Architectural discipline engineered for intelligent systems, high-velocity backends, and self-healing scale.
        </p>
      </div>

      {/* Architectural Wireframe Statement (Pier Gorelli manifesto typography) */}
      <div className="mb-12 sm:mb-16 space-y-1 sm:space-y-2">
        <p className="text-2xl sm:text-4xl md:text-5xl font-sans font-bold text-[var(--ink)] tracking-tight">
          Build what needs to exist.
        </p>
        <p className="text-2xl sm:text-4xl md:text-5xl font-sans font-bold text-[var(--ink-secondary)] tracking-tight">
          Deploy what refuses to break.
        </p>
      </div>

      {/* Narrative Columns directly on canvas (No boxes) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-14 text-sm sm:text-base text-[var(--ink-secondary)] leading-relaxed mb-16 sm:mb-20">
        <p>
          Software doesn&apos;t stop at the codebase, and infrastructure is meaningless without the systems running on it. I build end-to-end architectures: writing scalable backend services, orchestrating autonomous AI agent pipelines, and provisioning the production cloud platforms that power them.
        </p>
        <p>
          No artificial silos between engineering and operations. By combining clean backend software design with automated CI/CD, GitOps, and deep observability, ideas move from initial prototype to enterprise production scale with zero friction and guaranteed reliability.
        </p>
      </div>

      {/* Telemetry Ledger Row (Clean top and bottom hairline rules, 0 boxes) */}
      <div className="border-y border-[var(--border)] py-8 sm:py-12 mb-16 sm:mb-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
            >
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono text-[var(--ink)] block leading-none mb-1.5">
                {s.value}
              </span>
              <span className="text-xs font-bold font-mono text-[var(--accent)] uppercase block mb-1">
                {s.label}
              </span>
              <span className="text-[11px] font-mono text-[var(--ink-secondary)] block">
                {s.detail}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Production Toolchain Specifications (Typographic table list, 0 boxes) */}
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-[var(--border)] mb-6 text-xs font-mono text-[var(--ink-secondary)]">
          <span className="uppercase tracking-widest font-semibold text-[var(--ink)]">
            Production Engineering Toolchain Specifications
          </span>
          <span>rev. 2026 // verified stack</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          {specCategories.map((spec, idx) => (
            <div key={idx} className="pb-4 border-b border-[var(--border)]/60">
              <span className="font-mono text-[10px] tracking-widest text-[var(--accent)] font-bold uppercase block mb-1">
                {spec.category}
              </span>
              <span className="font-mono text-xs sm:text-sm text-[var(--ink)] font-medium">
                {spec.tools}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
