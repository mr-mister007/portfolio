import { useEffect, useState, useRef } from 'react';

const stages = [
  { label: 'Code', icon: '</>' },
  { label: 'Build', icon: '📦' },
  { label: 'Test', icon: '✓' },
  { label: 'Deploy', icon: '↑' },
];

/**
 * Animated CI/CD pipeline — flows through stages in a loop,
 * with glowing dots traveling along connection lines.
 */
const PipelineAnimation: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % stages.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="w-full max-w-2xl mx-auto select-none">
      <div className="flex items-center justify-between">
        {stages.map((stage, i) => {
          const isActive = i === activeStage;

          return (
            <div key={stage.label} className="flex items-center">
              {/* Stage node */}
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`
                    w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center
                    border transition-all duration-500
                    ${
                      isActive
                        ? 'border-accent bg-accent/10 shadow-[0_0_20px_rgba(96,165,250,0.15)]'
                        : 'border-border/30 bg-transparent'
                    }
                  `}
                >
                  <span
                    className={`
                      font-mono text-sm sm:text-base transition-all duration-500
                      ${isActive ? 'text-accent scale-110' : 'text-text-secondary'}
                    `}
                  >
                    {stage.icon}
                  </span>
                </div>
                <span
                  className={`
                    text-[10px] sm:text-xs font-medium tracking-wider uppercase transition-all duration-500
                    ${isActive ? 'text-accent' : 'text-text-secondary'}
                  `}
                >
                  {stage.label}
                </span>
              </div>

              {/* Connection line with flowing dots */}
              {i < stages.length - 1 && (
                <div className="relative mx-2 sm:mx-4 w-12 sm:w-20 md:w-28">
                  {/* Line */}
                  <div className="h-px bg-border/30 w-full" />

                  {/* Flowing dots */}
                  {[0, 1, 2].map((dotIdx) => {
                    const delay = dotIdx * 0.3;
                    const duration = 1.0;
                    // Only render if this connection is in the active flow direction
                    const isActiveConnection = i === activeStage || i === activeStage - 1 ||
                      (activeStage === stages.length - 1 && i === stages.length - 2);

                    return (
                      <div
                        key={dotIdx}
                        className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent"
                        style={{
                          opacity: isActiveConnection ? 0.6 : 0.08,
                          animation: isActiveConnection
                            ? `pipeline-flow-${dotIdx} ${duration}s ease-in-out ${delay}s infinite`
                            : 'none',
                        }}
                      />
                    );
                  })}

                  {/* Glow pulse that travels when stage changes */}
                  <div
                    className={`
                      absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent
                      transition-all duration-700 ease-out
                    `}
                    style={{
                      boxShadow: isActive || (i === activeStage - 1) || (activeStage === stages.length - 1 && i === stages.length - 2)
                        ? '0 0 8px rgba(96,165,250,0.6)'
                        : 'none',
                      opacity: isActive || (i === activeStage - 1) || (activeStage === stages.length - 1 && i === stages.length - 2)
                        ? 0.8 : 0,
                      left: isActive ? '0%' : '100%',
                      transition: 'left 0.7s ease-in-out, opacity 0.3s ease-in-out',
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes pipeline-flow-0 {
          0%, 100% { left: 0%; opacity: 0; }
          20% { opacity: 0.7; }
          50% { left: 50%; opacity: 0.7; }
          80% { opacity: 0.7; }
          100% { left: 100%; opacity: 0; }
        }
        @keyframes pipeline-flow-1 {
          0%, 100% { left: 0%; opacity: 0; }
          20% { opacity: 0; }
          45% { opacity: 0.7; }
          70% { left: 50%; opacity: 0.7; }
          90% { opacity: 0.7; }
          100% { left: 100%; opacity: 0; }
        }
        @keyframes pipeline-flow-2 {
          0%, 100% { left: 0%; opacity: 0; }
          30% { opacity: 0; }
          55% { opacity: 0.7; }
          85% { left: 50%; opacity: 0.7; }
          100% { left: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default PipelineAnimation;
