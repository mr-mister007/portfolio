import React from 'react';
import { motion } from 'framer-motion';
import { WordsPullUp } from '@/components/ui/prisma-hero';

const stats = [
  { value: '140+', label: 'Automated Pipelines', detail: 'GitHub Actions & ArgoCD' },
  { value: '500+', label: 'Production Containers', detail: 'Zero-downtime microservices' },
  { value: '99.999%', label: 'Infrastructure SLA', detail: 'Multi-region fault tolerance' },
  { value: '-42%', label: 'Cloud Compute Spend', detail: 'Karpenter spot auto-packing' },
];

const specCategories = [
  {
    category: '01 / AI & AGENTS',
    tools: ['Python', 'FastAPI', 'LangChain', 'pgvector', 'MCP Tools', 'LlamaIndex'],
  },
  {
    category: '02 / BACKENDS & STREAMING',
    tools: ['Go', 'Node.js', 'PostgreSQL', 'Redis', 'Apache Kafka', 'gRPC'],
  },
  {
    category: '03 / CLOUD PLATFORMS',
    tools: ['AWS EKS', 'Docker', 'Terraform', 'Terragrunt', 'Helm', 'Istio'],
  },
  {
    category: '04 / TELEMETRY & SECURITY',
    tools: ['ArgoCD', 'OpenTelemetry', 'Prometheus', 'Grafana', 'Trivy', 'Cosign'],
  },
];

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative w-full">
      {/* Expansive Framed Panel */}
      <div className="relative w-full overflow-hidden rounded-2xl md:rounded-[2.5rem] border border-white/10 shadow-2xl bg-black/60 backdrop-blur-xl p-5 sm:p-8 md:p-12 lg:p-14">
        {/* Film grain noise overlay */}
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.5] mix-blend-overlay" />

        {/* Ambient lighting gradients */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />
        <div className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[var(--accent)]/10 blur-3xl" />

        {/* Top Architectural Notch */}
        <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2">
          <div className="flex items-center gap-2 rounded-b-2xl md:rounded-b-3xl bg-black/90 backdrop-blur-md border-b border-x border-white/10 px-4 py-1.5 sm:px-7 sm:py-2 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#E1E0CC]/80 shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            03 // PHILOSOPHY &amp; RECORD
          </div>
        </div>

        {/* Section Header with Monumental WordsPullUp Typography */}
        <div className="relative z-10 pt-4 sm:pt-6 mb-8 sm:mb-12">
          <h2
            className="font-medium leading-[0.88] tracking-[-0.05em] text-[clamp(2.5rem,7.5vw,5.5rem)] select-none text-[#E1E0CC]"
          >
            <WordsPullUp text="Manifesto" showAsterisk />
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-white/75 max-w-2xl font-sans leading-relaxed mt-2 sm:mt-3">
            Architectural discipline engineered for intelligent systems, high-velocity backends, and self-healing scale.
          </p>
        </div>

        {/* Monumental Dual Statement */}
        <div className="relative z-10 mb-8 sm:mb-10 space-y-2">
          <div className="font-medium leading-[0.9] tracking-[-0.05em] text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#E1E0CC]">
            <WordsPullUp text="Build what needs to exist." />
          </div>
          <div className="font-medium leading-[0.9] tracking-[-0.05em] text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#E1E0CC]/40">
            <WordsPullUp text="Deploy what refuses to break." />
          </div>
        </div>

        {/* Concise Thesis Banner */}
        <div className="relative z-10 p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md mb-8 sm:mb-10">
          <p className="text-sm sm:text-base md:text-lg text-white/80 font-sans leading-relaxed max-w-3xl">
            I bridge backend software engineering, applied AI, and cloud infrastructure — eliminating silos to move ideas from prototype to production scale with 99.999% reliability.
          </p>
        </div>

        {/* High-Impact Stat Tiles */}
        <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-8 sm:mb-10">
          {stats.map((s, idx) => (
            <motion.div
              key={idx}
              className="p-4 sm:p-5 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
            >
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono text-[#E1E0CC] block leading-none mb-1.5">
                {s.value}
              </span>
              <span className="text-[11px] font-bold font-mono text-[var(--accent)] uppercase block mb-0.5">
                {s.label}
              </span>
              <span className="text-[10px] font-mono text-white/50 block">
                {s.detail}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Toolchain Specifications */}
        <div className="relative z-10 p-5 sm:p-7 rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-5 text-xs font-mono text-white/70">
            <span className="uppercase tracking-widest font-semibold text-[#E1E0CC] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              Verified Production Stack
            </span>
            <span className="text-[11px] text-white/40">rev. 2026</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {specCategories.map((spec, idx) => (
              <div key={idx} className="space-y-1.5">
                <span className="font-mono text-[10px] tracking-widest text-[var(--accent)] font-bold uppercase block">
                  {spec.category}
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {spec.tools.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md text-xs font-mono text-[#E1E0CC]/85 bg-white/[0.04] border border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
