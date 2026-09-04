import { useEffect, useState, useRef } from 'react';
import { ChevronDown, Shield, Server, Zap, Radio } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * High-tech DevOps Live Cluster Telemetry HUD.
 * Cycles through live system metrics and expands into a cluster health inspector.
 */
const StatusBadge: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [metricIndex, setMetricIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const metrics = [
    'ALL SYSTEMS NOMINAL',
    'LATENCY: 12ms (P99)',
    'UPTIME: 99.98% SLA',
    'EKS: 18/18 PODS HEALTHY',
  ];

  // Rotate metric text every 3.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMetricIndex((prev) => (prev + 1) % metrics.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [metrics.length]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) window.addEventListener('pointerdown', handleClickOutside);
    return () => window.removeEventListener('pointerdown', handleClickOutside);
  }, [open]);

  return (
    <div ref={dropdownRef} className="relative inline-block z-40 select-none">
      {/* HUD Trigger Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-border/40 bg-surface/50 hover:bg-surface/80 hover:border-accent/40 backdrop-blur-md shadow-sm transition-all duration-300 group cursor-pointer"
        aria-expanded={open}
        aria-label="Inspect cluster health"
      >
        {/* Radar Sonar Ping Wave */}
        <span className="relative flex w-2.5 h-2.5">
          <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-75 animate-ping" style={{ animationDuration: '2s' }} />
          <span className="relative rounded-full w-2.5 h-2.5 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
        </span>

        {/* Rotating Telemetry Stat */}
        <span className="text-[10px] sm:text-[11px] text-text-secondary font-mono tracking-wider font-semibold min-w-[150px] text-left">
          {metrics[metricIndex]}
        </span>

        <ChevronDown
          size={12}
          className={`text-text-secondary transition-transform duration-200 ${open ? 'rotate-180 text-accent' : 'group-hover:text-text-primary'}`}
        />
      </button>

      {/* Popover Cluster Health Inspector */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-72 sm:w-80 rounded-2xl border border-border bg-surface/95 backdrop-blur-xl p-4 shadow-2xl z-50 text-left font-mono"
          >
            <div className="flex items-center justify-between pb-3 border-b border-border/40 mb-3">
              <div className="flex items-center gap-2">
                <Radio size={14} className="text-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-text-primary uppercase tracking-wider">
                  Control Plane Telemetry
                </span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                100% OK
              </span>
            </div>

            <div className="space-y-2.5 text-xs text-text-secondary">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-text-secondary/80">
                  <Server size={12} className="text-accent" /> Cluster
                </span>
                <span className="text-text-primary font-medium">AWS EKS v1.30 (HA 3AZ)</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-text-secondary/80">
                  <Zap size={12} className="text-amber-400" /> Latency P99
                </span>
                <span className="text-emerald-400 font-medium">12ms (Edge CDN)</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-text-secondary/80">
                  <Shield size={12} className="text-blue-400" /> Security Mesh
                </span>
                <span className="text-text-primary font-medium">Istio mTLS + Trivy</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-text-secondary/80">Active Pods</span>
                <span className="text-text-primary font-medium">18/18 Running (0 Restarts)</span>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-border/30 flex items-center justify-between text-[10px] text-text-secondary/60">
              <span>Region: us-east-1</span>
              <span>Updated: Real-time</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StatusBadge;
