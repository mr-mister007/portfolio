import React from 'react';
import { FadeIn } from './FadeIn';
import TiltCard from './TiltCard';
import SectionLabel from './SectionLabel';
import SectionCounter from './SectionCounter';
import DashboardCard from './DashboardCard';
import {
  Server,
  Cloud,
  Layers,
  GitBranch,
  Activity,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';

const services = [
  {
    icon: Cloud,
    title: 'Cloud Platform Engineering',
    tag: 'ARCHITECTURE',
    deliverables: ['Multi-region VPC peering', 'Transit gateway topologies', 'Zero-trust IAM & SSO'],
    description:
      'Scalable, cost-effective architectures on AWS, GCP, and Azure. VPC design, hybrid networking, and multi-cloud strategies designed for high reliability.',
  },
  {
    icon: Server,
    title: 'Kubernetes & Containers',
    tag: 'ORCHESTRATION',
    deliverables: ['EKS / GKE auto-scaling clusters', 'Helm package registries', 'Canary & Blue/Green rollouts'],
    description:
      'Production-grade Kubernetes clusters, Docker containerisation, Karpenter dynamic node autoscaling, and GitOps workflows with ArgoCD.',
  },
  {
    icon: GitBranch,
    title: 'Automated CI/CD Platforms',
    tag: 'CONTINUOUS DELIVERY',
    deliverables: ['Self-serve squad pipelines', 'Automated security gates', 'Sub-10-minute build times'],
    description:
      'End-to-end pipeline automation with GitHub Actions. Container vulnerability scanning, automated rollback triggers, and comprehensive audit logs.',
  },
  {
    icon: Layers,
    title: 'Infrastructure as Code (IaC)',
    tag: 'PROVISIONING',
    deliverables: ['Modular Terraform libraries', 'Automated state locking', 'Drift detection & policy checks'],
    description:
      'Declarative, version-controlled infrastructure with Terraform and Terragrunt. Repeatable, auditable deployments with automated drift detection.',
  },
  {
    icon: Activity,
    title: 'Observability & SRE',
    tag: 'TELEMETRY & SLAS',
    deliverables: ['Prometheus & Grafana dashboards', 'Distributed tracing', 'Automated PagerDuty runbooks'],
    description:
      'Real-time metrics, logging, and synthetic monitoring with Prometheus, Grafana, and Datadog. Proactive incident response and reliability engineering.',
  },
  {
    icon: ShieldCheck,
    title: 'DevSecOps & Compliance',
    tag: 'SECURITY GATES',
    deliverables: ['Trivy container scanning', 'Cosign artifact signing', 'CIS benchmark compliance'],
    description:
      'Shift-left security integration: static analysis, secrets detection, software bill of materials (SBOM), and automated compliance enforcement.',
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="relative min-h-screen px-6 md:px-12 py-28">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>Capabilities &amp; SLAs</SectionLabel>

        <FadeIn delay={0.1} y={16} variant="up" duration={0.6}>
          <h2 className="section-heading text-[clamp(2.5rem,7vw,4.5rem)] text-text-primary mb-2">
            Enterprise platform capabilities<br />
            <span className="text-shimmer">engineered for uptime</span>
          </h2>
        </FadeIn>

        <div className="mb-14">
          <SectionCounter index={4} total={5} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <FadeIn key={service.title} delay={0.12 + i * 0.05} y={20} variant="up" duration={0.5}>
                <TiltCard maxTilt={5} scale={1.01} glare={false}>
                  <div className="card p-6 sm:p-7 h-full flex flex-col justify-between border border-border/80 bg-surface/85 backdrop-blur-xl group hover:border-accent/40 transition-all duration-300">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-mono tracking-widest text-text-secondary uppercase px-2 py-0.5 rounded bg-black/20 border border-border/60">
                          {service.tag}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold font-heading text-text-primary mb-3 group-hover:text-accent transition-colors duration-300">
                        {service.title}
                      </h3>

                      <p className="text-text-secondary text-xs sm:text-sm font-light leading-relaxed mb-6">
                        {service.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-border/60 space-y-1.5">
                      {service.deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-[11px] font-mono text-text-secondary">
                          <CheckCircle className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </FadeIn>
            );
          })}
        </div>

        {/* Live Cluster Dashboard monitor */}
        <div className="mt-14 max-w-md">
          <FadeIn delay={0.3} y={12} variant="up" duration={0.6}>
            <DashboardCard />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
