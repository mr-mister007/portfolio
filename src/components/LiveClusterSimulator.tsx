import React, { useState, useRef, useEffect } from 'react';
import {
  Server,
  Globe,
  Plus,
  Play,
  Flame,
  Radio,
  RotateCcw,
} from 'lucide-react';
import SpotlightCard from './SpotlightCard';

export const LiveClusterSimulator: React.FC = () => {
  const [trafficSplit, setTrafficSplit] = useState<'stable' | 'canary' | 'promoted'>('canary');
  const [podCount, setPodCount] = useState(6);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isChaosActive, setIsChaosActive] = useState(false);
  const [statusLog, setStatusLog] = useState('Cluster nominal: 90% traffic on v1.4 (Stable), 10% on v1.5 (Canary). 0 errors.');

  const rolloutTimeouts = useRef<number[]>([]);
  const chaosTimeouts = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      rolloutTimeouts.current.forEach((t) => clearTimeout(t));
      chaosTimeouts.current.forEach((t) => clearTimeout(t));
    };
  }, []);

  const runRollout = () => {
    rolloutTimeouts.current.forEach((t) => clearTimeout(t));
    rolloutTimeouts.current = [];

    setIsSimulating(true);
    setTrafficSplit('stable');
    setStatusLog('Initiating canary rollout: deploying v1.5 image manifests...');

    const t1 = window.setTimeout(() => {
      setTrafficSplit('canary');
      setStatusLog('Canary 50/50 progression: 50% traffic shifted to v1.5. All probes healthy.');
    }, 900);

    const t2 = window.setTimeout(() => {
      setTrafficSplit('promoted');
      setStatusLog('Canary Promotion complete: 100% traffic shifted to v1.5. 0 dropped requests.');
      setIsSimulating(false);
    }, 2200);

    rolloutTimeouts.current.push(t1, t2);
  };

  const autoscale = () => {
    setPodCount((prev) => {
      const next = prev >= 9 ? 6 : prev + 3;
      setStatusLog(
        next >= 9
          ? 'HPA trigger: CPU spike detected, auto-scaled to 9 pods across 3 nodes.'
          : 'HPA rebalance: Traffic normalized, cluster scaled back to 6 baseline pods.'
      );
      return next;
    });
  };

  const triggerChaos = () => {
    chaosTimeouts.current.forEach((t) => clearTimeout(t));
    chaosTimeouts.current = [];

    setIsChaosActive(true);
    setStatusLog('ALERT: Node failure simulated on worker-02! Pod eviction initiated...');

    const t1 = window.setTimeout(() => {
      setStatusLog('Kubelet auto-healing: Replacement pod scheduled onto worker-01.');
    }, 900);

    const t2 = window.setTimeout(() => {
      setStatusLog('Cluster self-healed: Traffic re-routed in 420ms. All health checks green.');
      setIsChaosActive(false);
    }, 2000);

    chaosTimeouts.current.push(t1, t2);
  };

  const resetCluster = () => {
    rolloutTimeouts.current.forEach((t) => clearTimeout(t));
    chaosTimeouts.current.forEach((t) => clearTimeout(t));
    rolloutTimeouts.current = [];
    chaosTimeouts.current = [];

    setIsSimulating(false);
    setIsChaosActive(false);
    setTrafficSplit('canary');
    setPodCount(6);
    setStatusLog('Cluster state reset: 90% stable, 10% canary. Replicas: 6.');
  };

  const podsPerNode = Math.max(1, Math.floor(podCount / 3));

  return (
    <section id="simulator" className="relative px-4 sm:px-6 md:px-12 py-24 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-800 dark:border-[#D4FF00]/20 dark:bg-[#D4FF00]/5 dark:text-[#D4FF00] font-mono text-xs uppercase tracking-widest mb-3 font-semibold">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>[ 02 // PIT-WALL TELEMETRY CONTROLLER ]</span>
        </div>
        <h2 className="text-[clamp(2.2rem,5.5vw,4.2rem)] font-black uppercase text-slate-900 dark:text-white tracking-tight leading-none mb-3">
          Live Kubernetes Platform Topology
        </h2>
        <p className="text-slate-600 dark:text-white/60 text-sm sm:text-base max-w-xl mx-auto font-normal">
          Interactive AWS EKS cluster with zero-downtime canary routing, Karpenter spot autoscaling, and real-time self-healing.
        </p>
      </div>

      <SpotlightCard className="p-6 sm:p-8">
        {/* Simulator Control Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:bg-[#D4FF00]/10 dark:border-[#D4FF00]/30 dark:text-[#D4FF00] flex items-center justify-center shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="text-[10px] font-mono text-emerald-600 dark:text-[#D4FF00] uppercase tracking-widest block font-bold">
                AWS REGION: US-EAST-1 · PROD-EKS-MESH
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-mono uppercase tracking-wide">
                vpc-production-mesh [10.0.0.0/16]
              </h3>
            </div>
          </div>

          {/* Interactive Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={runRollout}
              disabled={isSimulating}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-[#D4FF00] dark:hover:bg-[#CCFF00] dark:text-slate-950 font-mono text-xs font-black flex items-center gap-1.5 transition-all shadow-md dark:shadow-[0_0_15px_rgba(212,255,0,0.3)] disabled:opacity-50 uppercase tracking-wider cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isSimulating ? 'Deploying...' : 'Simulate Rollout'}</span>
            </button>

            <button
              type="button"
              onClick={autoscale}
              className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-white/20 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-800 dark:text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-all uppercase tracking-wider cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-emerald-600 dark:text-[#D4FF00]" />
              <span>{podCount >= 9 ? 'Scale Down' : 'Trigger HPA Scale'}</span>
            </button>

            <button
              type="button"
              onClick={triggerChaos}
              disabled={isChaosActive}
              className="px-3.5 py-2 rounded-xl bg-red-100 dark:bg-red-500/10 hover:bg-red-200 dark:hover:bg-red-500/20 border border-red-300 dark:border-red-500/30 text-red-700 dark:text-red-400 font-mono text-xs font-bold flex items-center gap-1.5 transition-all uppercase tracking-wider disabled:opacity-50 cursor-pointer"
            >
              <Flame className="w-3.5 h-3.5 text-red-500 dark:text-red-400" />
              <span>{isChaosActive ? 'Healing...' : 'Inject Chaos'}</span>
            </button>

            <button
              type="button"
              onClick={resetCluster}
              className="p-2 rounded-xl border border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-white/60 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
              title="Reset Cluster Simulator"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <div className="px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-700 dark:bg-[#D4FF00]/10 dark:border-[#D4FF00]/20 dark:text-[#D4FF00] flex items-center gap-1.5 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-[#D4FF00] animate-ping" />
              <span>99.999% SLA</span>
            </div>
          </div>
        </div>

        {/* Live Traffic Flow Line */}
        <div className="w-full h-[3px] bg-slate-200 dark:bg-white/10 relative my-4 overflow-hidden rounded-full">
          <div
            className={`h-full w-1/2 rounded-full will-change-transform ${
              isChaosActive
                ? 'bg-gradient-to-r from-transparent via-red-500 to-amber-400 shadow-[0_0_15px_rgba(239,68,68,0.8)]'
                : 'bg-gradient-to-r from-transparent via-emerald-500 dark:via-[#D4FF00] to-sky-500 dark:to-[#00F2FE] shadow-sm'
            }`}
            style={{
              animation: `trafficPulse ${isChaosActive ? '0.4s' : isSimulating ? '0.8s' : '2.2s'} linear infinite`,
            }}
          />
        </div>

        {/* Worker Nodes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
          {[
            { id: '01', role: 'Ingress ALB Node', status: 'Healthy', cpu: '22%' },
            {
              id: '02',
              role: 'Worker Node Core',
              status: isChaosActive ? 'Healing...' : 'Healthy',
              cpu: isChaosActive ? '94%' : isSimulating ? '54%' : '31%',
            },
            {
              id: '03',
              role: 'Canary Node Pool',
              status: trafficSplit === 'promoted' ? 'Promoted' : 'Active',
              cpu: '28%',
            },
          ].map((node) => (
            <div
              key={node.id}
              className={`p-4 rounded-2xl border transition-colors flex flex-col justify-between shadow-sm dark:shadow-lg text-left ${
                node.id === '02' && isChaosActive
                  ? 'border-red-400/50 bg-red-50 dark:bg-red-950/20'
                  : 'border-slate-200/80 bg-slate-50/70 dark:border-white/10 dark:bg-[#0E121B]'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono font-bold text-emerald-700 dark:text-[#D4FF00] flex items-center gap-1.5 uppercase">
                  <Server className="w-3.5 h-3.5" /> node-{node.id}.eks
                </span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-semibold ${
                    node.id === '02' && isChaosActive
                      ? 'text-red-700 bg-red-100 border-red-300 dark:text-red-400 dark:bg-red-500/10 dark:border-red-500/30'
                      : 'text-emerald-700 bg-emerald-100 border-emerald-300 dark:text-[#D4FF00] dark:bg-[#D4FF00]/10 dark:border-[#D4FF00]/20'
                  }`}
                >
                  {node.status}
                </span>
              </div>

              {/* Pod Replicas */}
              <div className="grid grid-cols-3 gap-2 my-2">
                {Array.from({ length: podsPerNode }).map((_, i) => {
                  const isCanaryPod = node.id === '03';
                  const isFailedPod = node.id === '02' && isChaosActive;
                  return (
                    <div
                      key={i}
                      className={`py-2 px-1 rounded-lg border flex flex-col items-center justify-center gap-1 transition-all ${
                        isFailedPod
                          ? 'border-red-300 bg-red-100 dark:border-red-500/40 dark:bg-red-500/10'
                          : isCanaryPod
                          ? 'border-emerald-300 bg-emerald-50 dark:border-[#D4FF00]/40 dark:bg-[#D4FF00]/10 shadow-sm'
                          : 'border-slate-200 bg-white dark:border-white/10 dark:bg-black/40'
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isFailedPod
                            ? 'bg-red-500 animate-pulse'
                            : isCanaryPod
                            ? 'bg-emerald-500 dark:bg-[#D4FF00] animate-ping'
                            : 'bg-sky-500 dark:bg-[#00F2FE]'
                        }`}
                      />
                      <span className="text-[9px] font-mono text-slate-600 dark:text-white/60">
                        {isCanaryPod ? `v1.5-${i + 1}` : `v1.4-${i + 1}`}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-white/50 pt-2 border-t border-slate-200 dark:border-white/5">
                <span>{node.role}</span>
                <span className="font-bold text-slate-700 dark:text-white/80">CPU: {node.cpu}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Live Simulator Console Log */}
        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-900 text-white font-mono text-xs flex items-center justify-between gap-2 shadow-inner">
          <div className="flex items-center gap-2 overflow-hidden text-left">
            <span className="text-emerald-400 dark:text-[#D4FF00] font-bold">$</span>
            <span className="truncate text-white/90">{statusLog}</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 dark:text-[#D4FF00] shrink-0 font-bold">
            {podCount} PODS ACTIVE
          </span>
        </div>

        {/* Bottom Telemetry HUD */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 mt-4 border-t border-slate-200 dark:border-white/10 text-left">
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-black/40 border border-slate-200/80 dark:border-white/5">
            <span className="text-[10px] font-mono text-slate-500 dark:text-white/40 block uppercase">LATENCY (P99)</span>
            <span className="text-base font-mono font-black text-emerald-600 dark:text-[#D4FF00]">
              {isChaosActive ? '48.2 ms' : '8.4 ms'}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-black/40 border border-slate-200/80 dark:border-white/5">
            <span className="text-[10px] font-mono text-slate-500 dark:text-white/40 block uppercase">PACKET LOSS</span>
            <span className="text-base font-mono font-black text-slate-900 dark:text-white">0.000%</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-black/40 border border-slate-200/80 dark:border-white/5">
            <span className="text-[10px] font-mono text-slate-500 dark:text-white/40 block uppercase">AUTO-RECOVERY</span>
            <span className="text-base font-mono font-black text-emerald-600 dark:text-[#D4FF00]">AUTONOMOUS</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-black/40 border border-slate-200/80 dark:border-white/5">
            <span className="text-[10px] font-mono text-slate-500 dark:text-white/40 block uppercase">UPTIME SLA</span>
            <span className="text-base font-mono font-black text-sky-600 dark:text-[#00F2FE]">99.999%</span>
          </div>
        </div>
      </SpotlightCard>

      <style>{`
        @keyframes trafficPulse {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
      `}</style>
    </section>
  );
};

export default LiveClusterSimulator;
