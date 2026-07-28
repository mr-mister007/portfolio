import { useEffect, useRef } from 'react';

interface SpotlightCursorProps {
  color?: string;
  size?: number;
}

/**
 * SpotlightCursor — direct DOM mutation via rAF-throttled mouse handler.
 * Previously called setState on every mouse pixel, re-rendering the
 * entire React tree each time.
 */
const SpotlightCursor: React.FC<SpotlightCursorProps> = ({
  color = 'rgba(6, 182, 212, 0.06)',
  size = 600,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handle = (e: MouseEvent) => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        el.style.background = `radial-gradient(${size}px circle at ${e.clientX}px ${e.clientY}px, ${color}, transparent 70%)`;
      });
    };

    window.addEventListener('mousemove', handle, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handle);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [color, size]);

  return (
    <div
      ref={ref}
      className="fixed inset-0 pointer-events-none z-[100]"
      style={{
        background: `radial-gradient(${size}px circle at 50% 50%, ${color}, transparent 70%)`,
      }}
    />
  );
};

export { SpotlightCursor };
export default SpotlightCursor;
