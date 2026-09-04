import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TiltCard from './TiltCard';
import {
  Server,
  Layers,
  Activity,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';

const telemetryTabs = [
  {
    id: 'k8s',
    label: 'KUBECTL // CLUSTER',
    icon: Server,
    command: '$ kubectl get nodes,pods -n production --sort-by=.metadata.creationTimestamp',
    output: [
      'NAME                             STATUS   ROLES    AGE   VERSION',
      'node/ip-10-0-14-22.ec2.internal  Ready    worker   42d   v1.29.2-eks',
      'node/ip-10-0-28-59.ec2.internal  Ready    worker   42d   v1.29.2-eks',
      '',
      'NAME                             READY   STATUS    RESTARTS   LATENCY',
      'pod/api-gateway-8f7d9c6-x4b2     2/2     Running   0          4.2ms',
      'pod/auth-service-59bc74-k9m1     1/1     Running   0          2.8ms',
      'pod/order-pipeline-7d8e2-v3p8    1/1     Running   0          5.1ms',
    ],
  },
  {
    id: 'terraform',
    label: 'TERRAFORM // IAC',
    icon: Layers,
    command: '$ terraform apply -auto-approve -var-file=prod.tfvars',
    output: [
      'module.eks_cluster: Refreshing state... [id=prod-core]',
      'module.vpc.aws_subnet.private[0]: Refreshing state... [id=subnet-0a4f]',
      '',
      'Plan: 3 to add, 1 to change, 0 to destroy.',
      'aws_iam_role_policy_attachment.karpenter: Creating... [DONE]',
      'aws_eks_node_group.spot_workers: Modifying... [scaling: 12 -> 16]',
      'Apply complete! Resources: 3 added, 1 changed, 0 destroyed.',
    ],
  },
  {
    id: 'telemetry',
    label: 'TELEMETRY // SRE',
    icon: Activity,
    command: '$ curl -s https://metrics.production/telemetry/health | jq .',
    output: [
      '{',
      '  "service_mesh": "istio-1.21-healthy",',
      '  "global_p99_latency": "14.2ms",',
      '  "canary_traffic_weight": 0.10,',
      '  "active_error_budget": "99.999% (uncompromised)",',
      '  "auto_healing_triggers": "0 active alerts"',
      '}',
    ],
  },
];

const telemetryStats = [
  {
    num: '01',
    label: 'PRODUCTION DEPLOYS',
    value: '1,400+',
    sub: 'Zero downtime incidents',
  },
  {
    num: '02',
    label: 'CLUSTER UPTIME',
    value: '99.999%',
    sub: 'Multi-region AWS EKS',
  },
  {
    num: '03',
    label: 'DEPLOY VELOCITY',
    value: '4m 12s',
    sub: 'Commit to production',
  },
  {
    num: '04',
    label: 'INFRA COST SAVED',
    value: '-42%',
    sub: 'Karpenter spot autonomy',
  },
];

export const HeroSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const currentTab = telemetryTabs[activeTab];

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 pt-28 pb-16 text-center max-w-6xl mx-auto">
      {/* Telemetry Status Pill */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 text-emerald-800 dark:border-[#D4FF00]/30 dark:bg-[#0A0D14]/90 dark:text-white/90 backdrop-blur-xl mb-6 shadow-sm dark:shadow-[0_0_20px_rgba(212,255,0,0.12)]"
      >
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 dark:bg-[#D4FF00] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 dark:bg-[#D4FF00]" />
        </span>
        <span className="text-[11px] sm:text-xs font-mono tracking-wider uppercase font-bold">
          POLE POSITION // DEV & PLATFORM SRE // 99.999% UPTIME
        </span>
      </motion.div>

      {/* Main Massive Editorial Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-4"
      >
        <span className="block font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-slate-500 dark:text-white/60 mb-2 font-bold">
          [ 01 // PLATFORM & CLOUD ARCHITECTURE ]
        </span>
        <h1 className="text-[clamp(2.8rem,7.5vw,6.5rem)] font-black text-slate-900 dark:text-white tracking-tight uppercase leading-[0.92] select-none">
          ARAVIND <span className="text-slate-300 dark:text-white/30 font-light">//</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-slate-900 to-sky-600 dark:from-[#D4FF00] dark:via-white dark:to-[#00F2FE]">
            HIGH-VELOCITY
          </span>
          <br />
          PLATFORM ENGINEER
        </h1>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-slate-600 dark:text-white/70 text-[clamp(1rem,1.35vw,1.25rem)] font-normal max-w-2xl leading-relaxed mb-8 text-center"
      >
        Engineering high-speed, zero-downtime Kubernetes platforms, automated GitOps delivery pipelines, and self-healing cloud infrastructure on AWS.
      </motion.p>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-wrap items-center justify-center gap-4 mb-12"
      >
        <button
          type="button"
          onClick={() => {
            const el = document.getElementById('simulator');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="px-6 py-3 rounded-full bg-emerald-500 dark:bg-[#D4FF00] text-slate-950 font-black text-xs font-mono hover:opacity-95 hover:scale-105 transition-all shadow-[0_4px_20px_rgba(16,185,129,0.3)] dark:shadow-[0_0_30px_rgba(212,255,0,0.35)] flex items-center gap-2 group tracking-wider uppercase cursor-pointer"
        >
          <span>INTERACT WITH CLUSTER</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          type="button"
          onClick={() => {
            const el = document.getElementById('work');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="px-6 py-3 rounded-full border border-slate-300 dark:border-white/20 bg-white/60 dark:bg-white/5 text-slate-800 dark:text-white font-mono text-xs font-bold hover:border-emerald-500/50 dark:hover:border-[#D4FF00]/50 hover:bg-slate-100 dark:hover:bg-white/10 transition-all flex items-center gap-2 tracking-wider uppercase cursor-pointer"
        >
          <span>VIEW CASE STUDIES</span>
          <ChevronRight className="w-3.5 h-3.5 text-emerald-600 dark:text-[#D4FF00]" />
        </button>
      </motion.div>

      {/* F1 Telemetry Strip */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-4xl mb-12"
      >
        {telemetryStats.map((stat, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-[#0E1118]/80 backdrop-blur-md text-left shadow-sm hover:border-emerald-500/40 dark:hover:border-[#D4FF00]/40 transition-colors group"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[10px] text-slate-500 dark:text-white/40 tracking-widest uppercase font-semibold">
                {stat.num} // {stat.label}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 dark:bg-[#D4FF00]/40 group-hover:bg-emerald-500 dark:group-hover:bg-[#D4FF00] transition-colors" />
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white tracking-tight group-hover:text-emerald-600 dark:group-hover:text-[#D4FF00] transition-colors">
              {stat.value}
            </div>
            <div className="text-[11px] font-mono text-slate-500 dark:text-white/50 mt-1">
              {stat.sub}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Multi-Tab Interactive Telemetry Console */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="w-full max-w-3xl text-left"
      >
        <TiltCard maxTilt={3} scale={1.005} glare={false}>
          <div className="card overflow-hidden border border-slate-200 dark:border-white/15 bg-slate-900 dark:bg-[#090C12] shadow-2xl rounded-2xl">
            {/* Window Topbar */}
            <div className="flex flex-wrap items-center justify-between px-4 py-3 border-b border-white/10 bg-slate-950 dark:bg-[#0E1118]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-400 dark:bg-[#D4FF00]" />
                <span className="ml-2 font-mono text-[11px] text-white/50 hidden sm:inline">
                  TELEMETRY MISSION CONTROL
                </span>
              </div>

              {/* Tab Selector */}
              <div className="flex items-center gap-1.5">
                {telemetryTabs.map((tab, idx) => {
                  const TabIcon = tab.icon;
                  const isActive = idx === activeTab;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(idx)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-emerald-400 dark:bg-[#D4FF00] text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.4)] dark:shadow-[0_0_15px_rgba(212,255,0,0.4)]'
                          : 'text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <TabIcon className="w-3 h-3" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Terminal Screen */}
            <div className="p-5 font-mono text-xs sm:text-[13px] leading-relaxed min-h-[170px] bg-slate-950 dark:bg-[#05070A] text-left">
              <div className="flex items-center gap-2 text-white mb-3 font-bold border-b border-white/10 pb-2">
                <ChevronRight className="w-4 h-4 text-emerald-400 dark:text-[#D4FF00]" />
                <span className="text-emerald-400 dark:text-[#D4FF00]">{currentTab.command}</span>
              </div>

              <div className="space-y-1 text-white/70">
                {currentTab.output.map((line, i) => (
                  <div
                    key={i}
                    className={
                      line.includes('Ready') ||
                      line.includes('Running') ||
                      line.includes('complete') ||
                      line.includes('healthy') ||
                      line.includes('DONE')
                        ? 'text-emerald-400 dark:text-[#D4FF00] font-semibold'
                        : line.includes('Plan') ||
                          line.includes('Creating') ||
                          line.includes('Modifying')
                        ? 'text-amber-400'
                        : line.includes('latency') || line.includes('LATENCY')
                        ? 'text-cyan-400 dark:text-[#00F2FE]'
                        : ''
                    }
                  >
                    {line || '\u00A0'}
                  </div>
                ))}
              </div>
            </div>

            {/* Console Footer */}
            <div className="px-4 py-2 border-t border-white/10 bg-slate-950 dark:bg-[#0B0E16] flex items-center justify-between text-[11px] font-mono text-white/50">
              <span>REGION: us-east-1 (N. Virginia)</span>
              <span className="text-emerald-400 dark:text-[#D4FF00] font-bold">● CLUSTER OK</span>
            </div>
          </div>
        </TiltCard>
      </motion.div>
    </section>
  );
};

export default HeroSection;
