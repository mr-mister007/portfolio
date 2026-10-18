import React from 'react';

interface MonogramProps {
  className?: string;
  isPlotting?: boolean;
}

/**
 * Architectural vector monogram for "Aravind"
 * Features clean geometric strokes and an accent telemetry dot.
 */
export const Monogram: React.FC<MonogramProps> = ({ className = '', isPlotting = false }) => {
  return (
    <svg
      className={`monogram ${isPlotting ? 'is-plotting' : ''} ${className}`}
      viewBox="0 0 48 36"
      role="img"
      aria-label="Aravind Monogram"
    >
      {/* Geometric A stroke */}
      <path
        d="M6 32L24 4L42 32M13 22H35"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
        fill="none"
      />
      {/* Architectural accent dot */}
      <circle className="monogram__dot" cx="42" cy="32" r="2.8" />
    </svg>
  );
};

export default Monogram;
