import React from 'react';
import { motion } from 'framer-motion';

const disciplines = [
  {
    num: '01',
    title: 'Cloud & Kubernetes',
    summary: 'Multi-cloud AKS and EKS infrastructure, Docker containerization, Helm charts, and Istio service mesh across AWS, Azure & GCP.',
    stack: 'Azure AKS · AWS EKS · GCP · Docker · Helm · Istio',
  },
  {
    num: '02',
    title: 'CI/CD & GitOps',
    summary: '100+ automated GitHub Actions workflows, declarative Terraform infrastructure, ArgoCD deployments, and canary release strategies.',
    stack: 'GitHub Actions · Terraform · ArgoCD · Canary Rollouts',
  },
  {
    num: '03',
    title: 'DevSecOps & Observability',
    summary: 'Continuous vulnerability scanning with Trivy, secure OIDC authentication, and monitoring with Prometheus, Grafana, and OpenTelemetry.',
    stack: 'Trivy · Cosign · OIDC · Prometheus · Grafana · OpenTelemetry',
  },
  {
    num: '04',
    title: 'Applied AI & Agents',
    summary: 'End-to-end AI applications using LangChain, pgvector embeddings, retrieval-augmented generation (RAG), and Model Context Protocol (MCP).',
    stack: 'Python · FastAPI · LangChain · RAG · pgvector · MCP',
  },
  {
    num: '05',
    title: 'Backend Microservices',
    summary: 'High-concurrency asynchronous services, event-driven streaming, and low-latency API layers designed for high availability.',
    stack: 'FastAPI · Go · PostgreSQL · Redis · Apache Kafka',
  },
  {
    num: '06',
    title: 'AWS Cloud Foundations',
    summary: 'AWS Certified Cloud Practitioner architecting scalable EC2, S3, IAM security policies, and automated multi-cloud topologies.',
    stack: 'AWS CCP · EC2 · S3 · IAM · VPC · Multi-Cloud',
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="relative w-full scroll-mt-28">
      {/* Minimal Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-6 border-b border-[var(--border)] mb-2">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] block mb-1.5">
            02 / Capabilities
          </span>
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[var(--ink)]">
            Engineering Disciplines
          </h2>
        </div>
        <span className="text-xs font-mono text-[var(--ink-muted)]">
          Core Pillars
        </span>
      </div>

      {/* Minimal 2-Column Editorial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
        {/* Column 1 */}
        <div className="divide-y divide-[var(--border)]">
          {disciplines.slice(0, 3).map((item, idx) => (
            <motion.div
              key={item.num}
              className="py-7 sm:py-8 group"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.04 }}
            >
              <div className="flex items-center gap-3 text-xs font-mono mb-2 text-[var(--ink-muted)]">
                <span className="text-[var(--accent)] font-semibold">{item.num}</span>
                <span>/</span>
                <span className="text-[var(--ink)] font-sans font-medium text-base group-hover:text-[var(--accent)] transition-colors">
                  {item.title}
                </span>
              </div>
              <p className="text-sm text-[var(--ink-secondary)] leading-relaxed font-sans mb-3">
                {item.summary}
              </p>
              <div className="text-xs font-mono text-[var(--ink-muted)]">
                {item.stack}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Column 2 */}
        <div className="divide-y divide-[var(--border)] md:pl-12">
          {disciplines.slice(3, 6).map((item, idx) => (
            <motion.div
              key={item.num}
              className="py-7 sm:py-8 group"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: (idx + 3) * 0.04 }}
            >
              <div className="flex items-center gap-3 text-xs font-mono mb-2 text-[var(--ink-muted)]">
                <span className="text-[var(--accent)] font-semibold">{item.num}</span>
                <span>/</span>
                <span className="text-[var(--ink)] font-sans font-medium text-base group-hover:text-[var(--accent)] transition-colors">
                  {item.title}
                </span>
              </div>
              <p className="text-sm text-[var(--ink-secondary)] leading-relaxed font-sans mb-3">
                {item.summary}
              </p>
              <div className="text-xs font-mono text-[var(--ink-muted)]">
                {item.stack}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
