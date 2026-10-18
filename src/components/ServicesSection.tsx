import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const services = [
  {
    num: '01',
    title: 'Applied AI & LLM Engineering',
    tag: 'AI & AGENTS',
    description:
      'Autonomous multi-agent workflows, production RAG pipelines, dynamic tool execution, and low-latency inference architectures designed to eliminate hallucinations.',
    deliverables: ['Multi-agent orchestration & MCP tool integration', 'Semantic vector search & pgvector indexing', 'Prompt evaluation & token latency optimization'],
  },
  {
    num: '02',
    title: 'Backend Engineering & Distributed Systems',
    tag: 'DISTRIBUTED SYSTEMS',
    description:
      'High-concurrency microservice backends, asynchronous event queues, resilient database modeling, and caching layers built to handle heavy traffic.',
    deliverables: ['Scalable REST & gRPC APIs (Python, Go, Node.js)', 'Apache Kafka & Redis event streaming pipelines', 'PostgreSQL database tuning & connection pooling'],
  },
  {
    num: '03',
    title: 'Kubernetes & Cloud Platforms',
    tag: 'CLOUD PLATFORMS',
    description:
      'Production-grade EKS clusters, dynamic compute provisioning with Karpenter, Helm packaging, and automated cluster upgrades with zero dropped packets.',
    deliverables: ['AWS EKS auto-scaling clusters with Karpenter', 'Multi-region VPC & transit gateway networking', 'Istio service mesh & progressive canary traffic'],
  },
  {
    num: '04',
    title: 'Infrastructure as Code & GitOps',
    tag: 'PROVISIONING & GITOPS',
    description:
      'Declarative, version-controlled infrastructure definitions. Everything reproducible through code review with zero untracked cloud resources.',
    deliverables: ['Modular Terraform & Terragrunt libraries', 'ArgoCD GitOps continuous delivery loops', 'Automated drift detection & policy-as-code'],
  },
  {
    num: '05',
    title: 'Automated CI/CD & DevSecOps',
    tag: 'DELIVERY PIPELINES',
    description:
      'Sub-5-minute self-serve deployment pipelines, automated vulnerability gates, and tamper-proof cryptographic container provenance verification.',
    deliverables: ['GitHub Actions self-serve squad workflows', 'Trivy container CVE screening gates', 'Cosign cryptographic artifact signing (Sigstore)'],
  },
  {
    num: '06',
    title: 'Observability & Telemetry SRE',
    tag: 'RELIABILITY & SLAS',
    description:
      'Distributed tracing, real-time metrics, error budget tracking, and proactive alert runbooks that guarantee 99.999% production availability.',
    deliverables: ['Prometheus, Grafana & OpenTelemetry setups', 'SLO/SLI error budget monitoring & alerts', 'Proactive alerting runbooks & PagerDuty'],
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="relative px-4 sm:px-6 md:px-12 py-16 sm:py-24 max-w-6xl mx-auto text-left">
      {/* Section Divider Rule with Tag */}
      <div className="hd-rule">
        <span className="hd-rule__tag">[ 02 // SERVICES &amp; CAPABILITIES ]</span>
      </div>

      <div className="mb-12 sm:mb-16">
        <h2 className="display text-[var(--ink)] mb-3">
          What I do<span className="text-[var(--accent)]">.</span>
        </h2>
        <p className="lead max-w-2xl">
          End-to-end engineering across the stack: building intelligent AI agents, resilient backend services, and bulletproof cloud infrastructure.
        </p>
      </div>

      {/* Editorial Numbered List (No boxes, clean line-divided rows) */}
      <ol className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
        {services.map((svc, idx) => (
          <motion.li
            key={svc.num}
            className="py-7 sm:py-9 transition-colors duration-200 group"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
          >
            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 sm:gap-8">
              {/* Index & Tag */}
              <div className="flex items-center md:items-baseline gap-3 md:w-44 shrink-0 font-mono text-xs">
                <span className="text-[var(--accent)] font-bold">{svc.num}</span>
                <span className="text-[var(--ink-secondary)]">/</span>
                <span className="text-[var(--ink-secondary)] tracking-widest uppercase text-[10px] sm:text-[11px]">
                  {svc.tag}
                </span>
              </div>

              {/* Title & Body */}
              <div className="flex-1 max-w-2xl">
                <h3 className="font-sans font-bold text-lg sm:text-xl text-[var(--ink)] mb-2 tracking-tight group-hover:text-[var(--accent)] transition-colors duration-200">
                  {svc.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed mb-3">
                  {svc.description}
                </p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] sm:text-xs font-mono text-[var(--ink-secondary)]">
                  {svc.deliverables.map((item, dIdx) => (
                    <span key={dIdx} className="flex items-center gap-1.5">
                      <span className="text-[var(--accent)] text-[9px]">●</span>
                      <span>{item}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Minimal Arrow Indicator */}
              <div className="hidden md:flex items-center justify-end w-12 text-[var(--ink-secondary)] group-hover:text-[var(--accent)] transition-all duration-200 group-hover:translate-x-1">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
};

export default ServicesSection;
