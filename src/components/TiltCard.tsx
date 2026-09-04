import React, { useRef, useState } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  glare?: boolean;
}

/**
 * Interactive card wrapper with mouse-tracking radial spotlight glow.
 */
const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  glare = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(0);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setOpacity(1)}
      onPointerLeave={() => setOpacity(0)}
      className={`relative group rounded-2xl ${className}`}
    >
      {/* Dynamic mouse-tracking radial spotlight */}
      {glare && (
        <div
          className="pointer-events-none absolute -inset-[1px] rounded-2xl transition-opacity duration-300 z-10"
          style={{
            opacity,
            background: `radial-gradient(380px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(96, 165, 250, 0.16), transparent 50%)`,
          }}
        />
      )}
      {children}
    </div>
  );
};

export { TiltCard };
export default TiltCard;
