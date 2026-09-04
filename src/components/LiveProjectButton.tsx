import React from 'react';

interface LiveProjectButtonProps {
  href?: string;
  label?: string;
  className?: string;
}

const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({
  href = 'https://github.com/mr-mister007',
  label = 'View Architecture',
  className = '',
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 text-xs font-medium text-text-secondary hover:text-accent transition-colors duration-300 group ${className}`}
      aria-label={`${label} (opens in a new tab)`}
    >
      <span>{label}</span>
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
    </a>
  );
};

export { LiveProjectButton };
export default LiveProjectButton;
