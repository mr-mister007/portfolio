import { useEffect, useState } from 'react';

/**
 * Live status badge — shows a pulsing "All systems operational" indicator.
 * Currently static; can be connected to a real health-check API later.
 */
const StatusBadge: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/30 bg-white/[0.02]">
      <span className="relative flex w-2 h-2">
        <span className="absolute inset-0 rounded-full bg-green-400/60 animate-ping" style={{ animationDuration: '2s' }} />
        <span className="relative rounded-full w-2 h-2 bg-green-400" />
      </span>
      <span className="text-[10px] sm:text-[11px] text-text-secondary font-medium tracking-wide uppercase">
        All systems operational
      </span>
    </div>
  );
};

export default StatusBadge;
