import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { WordsPullUp } from '@/components/ui/prisma-hero';

const services = [
  {
    num: '01',
    title: 'Applied AI & Agents',
    tag: 'AI & LLMS',
    description:
      'Autonomous multi-agent orchestration, production RAG pipelines, and low-latency inference architectures.',
    tags: ['LangChain', 'pgvector', 'MCP Tools', 'LlamaIndex'],
  },
  {
    num: '02',
    title: 'Distributed Backends',
    tag: 'ARCHITECTURE',
    description:
      'High-concurrency microservice APIs, asynchronous message queues, and low-latency database architectures.',
    tags: ['FastAPI', 'Go', 'Kafka', 'Redis', 'PostgreSQL'],
  },
  {
    num: '03',
    title: 'Cloud & Kubernetes',
    tag: 'INFRASTRUCTURE',
    description:
      'Auto-scaling AWS EKS clusters with Karpenter dynamic compute, Helm packaging, and Istio canary meshes.',
    tags: ['AWS EKS', 'Karpenter', 'Istio', 'Docker'],
  },
  {
    num: '04',
    title: 'IaC & GitOps Delivery',
    tag: 'AUTOMATION',
    description:
      'Declarative Terraform infrastructure modules with automated ArgoCD continuous deployment sync loops.',
    tags: ['Terraform', 'Terragrunt', 'ArgoCD', 'GitOps'],
  },
  {
    num: '05',
    title: 'CI/CD & Security',
    tag: 'DEVSECOPS',
    description:
      'Sub-5-minute self-serve deployment pipelines with automated container vulnerability screening and image signing.',
    tags: ['GitHub Actions', 'Trivy', 'Cosign', 'OIDC'],
  },
  {
    num: '06',
    title: 'Observability & SRE',
    tag: 'RELIABILITY',
    description:
      'Distributed OpenTelemetry tracing, error budget monitoring, and proactive alert runbooks targeting 99.999% uptime.',
    tags: ['Prometheus', 'Grafana', 'OpenTelemetry', 'SLO/SLI'],
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="relative w-full">
      {/* Expansive Framed Panel */}
      <div className="relative w-full overflow-hidden rounded-2xl md:rounded-[2.5rem] border border-white/10 shadow-2xl bg-black/60 backdrop-blur-xl p-5 sm:p-8 md:p-12 lg:p-14">
        {/* Film grain noise overlay */}
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.5] mix-blend-overlay" />

        {/* Ambient lighting gradients */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[var(--accent)]/10 blur-3xl" />

        {/* Top Architectural Notch */}
        <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2">
          <div className="flex items-center gap-2 rounded-b-2xl md:rounded-b-3xl bg-black/90 backdrop-blur-md border-b border-x border-white/10 px-4 py-1.5 sm:px-7 sm:py-2 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#E1E0CC]/80 shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            02 // DISCIPLINES &amp; CAPABILITIES
          </div>
        </div>

        {/* Section Header with Monumental WordsPullUp Typography */}
        <div className="relative z-10 pt-4 sm:pt-6 mb-8 sm:mb-12">
          <h2
            className="font-medium leading-[0.88] tracking-[-0.05em] text-[clamp(2.5rem,7.5vw,5.5rem)] select-none text-[#E1E0CC]"
          >
            <WordsPullUp text="Capabilities" showAsterisk />
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-white/75 max-w-2xl font-sans leading-relaxed mt-2 sm:mt-3">
            Core engineering pillars across AI systems, distributed backends, and cloud platforms.
          </p>
        </div>

        {/* Crisp Grid of Discipline Cards */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((svc, idx) => (
            <motion.div
              key={svc.num}
              className="relative p-6 sm:p-7 rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md flex flex-col justify-between group hover:border-white/25 hover:bg-white/[0.06] transition-all overflow-hidden"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-block px-2.5 py-0.5 rounded-full border border-white/10 bg-white/[0.03] text-[10px] font-mono uppercase tracking-widest text-[#E1E0CC]/80">
                    {svc.tag}
                  </span>
                  <span className="font-mono text-xs font-bold text-[var(--accent)]">
                    {svc.num}
                  </span>
                </div>

                <h3 className="font-sans font-semibold text-lg sm:text-xl text-[#E1E0CC] mb-2 tracking-tight group-hover:text-white transition-colors">
                  {svc.title}
                </h3>

                <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans mb-5">
                  {svc.description}
                </p>
              </div>

              {/* Stack Chips & Explore Trigger */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-1.5">
                  {svc.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[10px] font-mono text-white/60 bg-white/[0.03]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-white/40 group-hover:text-[var(--accent)] transition-colors shrink-0" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
