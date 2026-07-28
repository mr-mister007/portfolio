import { useEffect, useState } from 'react';

interface GaugeProps {
  value: number;  // 0–1
  label: string;
  color?: string;
}

/**
 * Circular gauge — like a speedometer, 0–100%.
 */
const CircularGauge: React.FC<GaugeProps> = ({ value, label, color = '#60A5FA' }) => {
  const [animVal, setAnimVal] = useState(0);
  const radius = 28;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const timer = setTimeout(() => setAnimVal(value), 200);
    return () => clearTimeout(timer);
  }, [value]);

  const offset = circumference * (1 - animVal);

  return (
    <div className="flex flex-col items-center gap-1.5">
      <svg width="72" height="72" viewBox="0 0 72 72" className="-rotate-90">
        {/* Background track */}
        <circle cx="36" cy="36" r={radius} fill="none" stroke="var(--color-border)" strokeWidth="5" opacity="0.3" />
        {/* Animated arc */}
        <circle
          cx="36" cy="36" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.22, 1, 0.36, 1)' }}
        />
        {/* Center value */}
        <text
          x="36" y="36"
          textAnchor="middle" dominantBaseline="central"
          fill="var(--color-text-primary)"
          fontSize="14"
          fontWeight="700"
          fontFamily="JetBrains Mono, monospace"
          transform="rotate(90, 36, 36)"
        >
          {Math.round(animVal * 100)}%
        </text>
      </svg>
      <span className="text-[10px] text-text-secondary font-mono tracking-wider">{label}</span>
    </div>
  );
};

interface StatRowProps {
  label: string;
  value: string;
  status?: 'ok' | 'warn' | 'error';
}

const StatRow: React.FC<StatRowProps> = ({ label, value, status = 'ok' }) => {
  const dotColor = status === 'ok'
    ? 'bg-green-400'
    : status === 'warn'
      ? 'bg-yellow-400'
      : 'bg-red-400';

  return (
    <div className="flex items-center justify-between py-1.5">
      <div className="flex items-center gap-2">
        <span className={`w-1.5 h-1.5 rounded-full ${dotColor} ${status === 'ok' ? 'animate-pulse' : ''}`}
          style={status === 'ok' ? { animationDuration: '3s' } : undefined}
        />
        <span className="text-xs text-text-secondary font-mono">{label}</span>
      </div>
      <span className="text-xs font-mono font-medium text-text-primary">{value}</span>
    </div>
  );
};

/**
 * Infrastructure dashboard card — Grafana-style monitoring panel
 * with gauges and live-ish stats.
 */
const DashboardCard: React.FC = () => {
  // Simulated "live" values that jitter slightly
  const [stats, setStats] = useState({
    uptime: 0.999,
    latency: 0.12,
    pods: 0.78,
    cpu: 0.45,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        uptime: 0.998 + Math.random() * 0.002,
        latency: 0.08 + Math.random() * 0.12,
        pods: 0.72 + Math.random() * 0.15,
        cpu: 0.35 + Math.random() * 0.25,
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-xl border border-border bg-surface/40 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border bg-surface/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" style={{ animationDuration: '2s' }} />
          <span className="text-xs font-mono font-semibold text-text-primary tracking-wider uppercase">
            Infrastructure Monitor
          </span>
        </div>
        <span className="text-[10px] text-text-secondary font-mono">LIVE</span>
      </div>

      {/* Gauges */}
      <div className="grid grid-cols-4 gap-2 px-4 py-5 border-b border-border/50">
        <CircularGauge value={stats.uptime} label="Uptime" color="#4ADE80" />
        <CircularGauge value={stats.latency} label="Latency" color="#60A5FA" />
        <CircularGauge value={stats.pods} label="Pods" color="#C084FC" />
        <CircularGauge value={stats.cpu} label="CPU" color="#F59E0B" />
      </div>

      {/* Stats rows */}
      <div className="px-4 py-3 divide-y divide-border/30">
        <StatRow label="Cluster" value="prod-us-east-1a" status="ok" />
        <StatRow label="Nodes" value="12/12 healthy" status="ok" />
        <StatRow label="Memory" value="64.2 / 128 GB" status="warn" />
        <StatRow label="Disk" value="1.2 / 5 TB" status="ok" />
      </div>

      {/* Footer — mini sparkline bars */}
      <div className="px-4 py-2.5 border-t border-border/30 bg-surface/10">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-text-secondary font-mono">p99 latency</span>
          <div className="flex items-end gap-[2px] h-6 flex-1">
            {Array.from({ length: 20 }, (_, i) => (
              <div
                key={i}
                className="w-full rounded-sm"
                style={{
                  height: `${20 + Math.sin(i * 0.8 + Date.now() * 0.0005) * 15 + Math.random() * 10}%`,
                  background: 'var(--color-text-primary)',
                  opacity: 0.15 + Math.sin(i * 0.5) * 0.1,
                  transition: 'height 3s ease',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
