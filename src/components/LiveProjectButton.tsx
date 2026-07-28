import React from 'react';

const LiveProjectButton: React.FC = () => {
  return (
    <button className="inline-flex items-center gap-1.5 text-xs font-medium text-text-secondary hover:text-accent transition-colors duration-300 group">
      <span>Live Project</span>
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-transform duration-300"
      >
        <path d="M3 9l6-6M4 3h5v5" />
      </svg>
    </button>
  );
};

export { LiveProjectButton };
export default LiveProjectButton;
