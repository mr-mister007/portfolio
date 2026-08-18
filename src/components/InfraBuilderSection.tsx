import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, ShieldCheck, Activity, X, RefreshCw, CheckCircle2, Terminal } from 'lucide-react';
import { FadeIn } from './FadeIn';
import SectionLabel from './SectionLabel';
import SectionCounter from './SectionCounter';

interface InfraNode {
  id: string;
  name: string;
  category: 'AWS Cloud' | 'Kubernetes' | 'CI/CD Pipeline' | 'Observability';
  status: 'Healthy' | 'Active' | 'Optimal';
  region: string;
  uptime: string;
  cpuUsage: string;
  memUsage: string;
  description: string;
  logs: string[];
}

const INFRA_NODES: InfraNode[] = [
  {
    id: 'eks-cluster',
    name: 'EKS Production Cluster',
    category: 'Kubernetes',
    status: 'Healthy',
    region: 'us-east-1 (N. Virginia)',
    uptime: '99.999%',
    cpuUsage: '34%',
    memUsage: '62%',
    description: 'Auto-scaling multi-AZ EKS control plane running 48 microservices across 12 worker node groups.',
    logs: [
      '[01:14:02] k8s-scheduler: pod/api-gateway-8f92 scale up (+2 replicas)',
      '[01:14:05] ingress-controller: SSL certificate renewed automatically',
      '[01:14:12] kubelet: Health check passed for 48/48 worker pods',
    ],
  },
  {
    id: 'argocd-pipeline',
    name: 'ArgoCD & GitOps Engine',
    category: 'CI/CD Pipeline',
    status: 'Active',
    region: 'Global / Multi-Region',
    uptime: '100%',
    cpuUsage: '14%',
    memUsage: '28%',
    description: 'Declarative continuous delivery engine syncing Git repo state with production EKS clusters in <10 seconds.',
    logs: [
      '[01:12:30] argocd-server: git commit 7774604 synced to main',
      '[01:12:32] argocd-application: sync status = Synced (Health: Healthy)',
      '[01:12:35] audit-logger: deployment revision 4 deployed with 0 errors',
    ],
  },
  {
    id: 'terraform-iac',
    name: 'Terraform IaC Registry',
    category: 'AWS Cloud',
    status: 'Optimal',
    region: 'us-east-1 / us-west-2',
    uptime: '100%',
    cpuUsage: '8%',
    memUsage: '18%',
    description: 'Version-controlled, immutable infrastructure code managing VPC networking, IAM policies, and security groups.',
    logs: [
      '[01:05:00] tf-engine: state file locked by terraform Cloud workspace',
      '[01:05:02] tf-provider-aws: 14 resources checked — 0 drift detected',
      '[01:05:04] tf-engine: state unlock complete (0 errors)',
    ],
  },
  {
    id: 'prom-grafana',
    name: 'Prometheus & Grafana SRE',
    category: 'Observability',
    status: 'Healthy',
    region: 'us-east-1',
    uptime: '99.99%',
    cpuUsage: '22%',
    memUsage: '45%',
    description: 'Real-time telemetry, alertmanager routing, and Grafana dashboard visualization for infrastructure SLIs/SLOs.',
    logs: [
      '[01:15:10] prom-alertmanager: 0 firing alerts across cluster',
      '[01:15:12] grafana-server: dashboard / cluster-overview rendered (lat: 1.2ms)',
      '[01:15:15] telemetry: metrics scraped from 12 node exporters',
    ],
  },
];

const InfraBuilderSection: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<InfraNode | null>(null);

  return (
    <section id="infra" className="relative px-6 md:px-12 py-24 border-t border-border/20">
      <div className="max-w-5xl mx-auto">
        <SectionLabel>Live Topology</SectionLabel>

        <FadeIn delay={0.1} y={16} variant="up" duration={0.6}>
          <h2 className="section-heading text-[clamp(2.5rem,8vw,5rem)] text-text-primary mb-1">
            Infrastructure <span className="text-accent">Architecture</span>
          </h2>
        </FadeIn>

        <div className="mb-12">
          <SectionCounter index={4} total={5} />
        </div>

        <FadeIn delay={0.2} y={12} variant="up" duration={0.6}>
          <p className="text-text-secondary font-light max-w-2xl leading-relaxed mb-10 text-[clamp(0.9rem,1.2vw,1.05rem)]">
            Explore live, interactive DevOps node components. Click on any architecture module to inspect cluster metrics, node logs, and real-time operational status.
          </p>
        </FadeIn>

        {/* Node Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {INFRA_NODES.map((node, idx) => (
            <FadeIn key={node.id} delay={0.25 + idx * 0.08} y={16} variant="up" duration={0.5}>
              <motion.div
                onClick={() => setSelectedNode(node)}
                whileHover={{ y: -3, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="card p-6 cursor-pointer group hover:border-accent/40 transition-all duration-300 relative overflow-hidden"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                    {idx === 0 && <Server size={20} />}
                    {idx === 1 && <RefreshCw size={20} />}
                    {idx === 2 && <ShieldCheck size={20} />}
                    {idx === 3 && <Activity size={20} />}
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <CheckCircle2 size={12} />
                    {node.status}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-text-primary mb-1 group-hover:text-accent transition-colors">
                  {node.name}
                </h3>
                <p className="text-xs font-mono text-text-secondary/70 mb-4">{node.category} · {node.region}</p>

                <div className="flex items-center justify-between text-xs font-mono pt-3 border-t border-border/30 text-text-secondary">
                  <span>CPU: <strong className="text-text-primary font-semibold">{node.cpuUsage}</strong></span>
                  <span>MEM: <strong className="text-text-primary font-semibold">{node.memUsage}</strong></span>
                  <span>Uptime: <strong className="text-emerald-400 font-semibold">{node.uptime}</strong></span>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Node Status Modal */}
      <AnimatePresence>
        {selectedNode && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNode(null)}
              className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
            />
            <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="w-full max-w-xl rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-2xl relative"
              >
                <button
                  onClick={() => setSelectedNode(null)}
                  className="absolute top-5 right-5 p-2 rounded-full text-text-secondary hover:text-text-primary hover:bg-accent/10 transition-colors"
                >
                  <X size={20} />
                </button>

                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-accent/10 text-accent border border-accent/20">
                    {selectedNode.category}
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-medium flex items-center gap-1">
                    <CheckCircle2 size={12} /> {selectedNode.status}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-text-primary mb-2">{selectedNode.name}</h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-6 font-light">{selectedNode.description}</p>

                {/* Metrics detail */}
                <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-accent/5 border border-border/40 mb-6 text-center font-mono">
                  <div>
                    <span className="text-[10px] text-text-secondary uppercase block mb-1">CPU Load</span>
                    <span className="text-sm font-semibold text-text-primary">{selectedNode.cpuUsage}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-text-secondary uppercase block mb-1">Memory</span>
                    <span className="text-sm font-semibold text-text-primary">{selectedNode.memUsage}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-text-secondary uppercase block mb-1">SLO Uptime</span>
                    <span className="text-sm font-semibold text-emerald-400">{selectedNode.uptime}</span>
                  </div>
                </div>

                {/* Live Node Logs */}
                <div className="rounded-xl border border-border bg-black/40 p-4 font-mono text-xs overflow-hidden">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-border/30 text-text-secondary text-[11px]">
                    <span className="flex items-center gap-1.5"><Terminal size={12} /> Live Node Stream</span>
                    <span className="text-emerald-400">● Streaming</span>
                  </div>
                  <div className="space-y-1.5 text-text-secondary/80">
                    {selectedNode.logs.map((log, i) => (
                      <p key={i} className="truncate">{log}</p>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default InfraBuilderSection;
