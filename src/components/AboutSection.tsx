import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: '100+', label: 'CI/CD Pipelines' },
  { value: '100+', label: 'Containers Deployed' },
  { value: '3 Clouds', label: 'AWS, Azure & GCP' },
  { value: 'AWS CCP', label: 'Certified Practitioner' },
];

const skills = [
  { group: 'Cloud & Kubernetes', list: 'Azure AKS, AWS EKS, GCP, Docker, Helm, Istio' },
  { group: 'CI/CD & GitOps', list: 'GitHub Actions, Terraform, ArgoCD, Canary & Rolling Rollouts' },
  { group: 'DevSecOps & Observability', list: 'Trivy, Cosign, OIDC, Prometheus, Grafana, OpenTelemetry' },
  { group: 'Software & AI Engineering', list: 'Python, FastAPI, Go, LangChain, pgvector, MCP Tools, PostgreSQL, Redis' },
];

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative w-full scroll-mt-28">
      {/* Minimal Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-6 border-b border-[var(--border)] mb-8">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] block mb-1.5">
            03 / Background
          </span>
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[var(--ink)]">
            Experience &amp; Philosophy
          </h2>
        </div>
        <span className="text-xs font-mono text-[var(--ink-muted)]">
          Track Record
        </span>
      </div>

      {/* Editorial Narrative */}
      <div className="max-w-3xl mb-12">
        <p className="text-base sm:text-lg text-[var(--ink-secondary)] leading-relaxed font-sans mb-6">
          Software Engineer and DevOps practitioner focused on building cloud infrastructure, CI/CD automation, and production AI applications across AWS, Azure, and GCP. Specializing in zero-downtime AKS operations, automated developer platforms, and agentic LLM workflows.
        </p>

        {/* Minimal Understated Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-[var(--border)]">
          {stats.map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              <div className="text-xl sm:text-2xl font-mono font-semibold text-[var(--ink)]">
                {s.value}
              </div>
              <div className="text-xs font-mono text-[var(--ink-muted)] mt-0.5">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Work Experience Timeline */}
      <div className="pt-10 border-t border-[var(--border)] mb-12">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-4">
          <div>
            <h3 className="text-base sm:text-lg font-medium text-[var(--ink)]">
              Software Engineer &amp; DevOps — Quanhack
            </h3>
            <span className="text-xs font-mono text-[var(--accent)]">
              Production Workloads &amp; Platform Engineering
            </span>
          </div>
          <span className="text-xs font-mono text-[var(--ink-muted)]">
            2024 – Present · Kochi, Kerala
          </span>
        </div>

        <ul className="space-y-2 text-sm text-[var(--ink-secondary)] font-sans leading-relaxed list-disc pl-4 max-w-3xl">
          <li>Managed and scaled production workloads on Azure Kubernetes Service (AKS) with zero-downtime rolling and canary deployments.</li>
          <li>Built and maintained 100+ automated GitHub Actions CI/CD pipelines and containerized 100+ production services across AWS, Azure, and GCP.</li>
          <li>Developed end-to-end AI applications integrating LLM orchestration, RAG pipelines, and FastAPI backend microservices.</li>
          <li>Provisioned reproducible Terraform infrastructure, Trivy container security scanning, and centralized Prometheus, Grafana, and OpenTelemetry monitoring.</li>
        </ul>
      </div>

      {/* Verified Stack List */}
      <div className="pt-10 border-t border-[var(--border)]">
        <div className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] mb-4">
          Production Toolchain
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 text-sm">
          {skills.map((sk, idx) => (
            <div key={idx} className="space-y-1">
              <span className="text-xs font-mono text-[var(--ink)] font-semibold block">
                {sk.group}
              </span>
              <p className="text-xs font-mono text-[var(--ink-muted)] leading-relaxed">
                {sk.list}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
