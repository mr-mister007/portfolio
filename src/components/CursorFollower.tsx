import { useEffect, useRef } from 'react';

/**
 * Elegant ring that follows the cursor with spring-like motion.
 * Uses direct DOM manipulation — no React re-renders on mouse move.
 *
 * The ring subtly changes size when hovering interactive elements
 * (detected via CSS :hover on the body).
 */
const CursorFollower: React.FC = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    let rafId = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let dotX = x;
    let dotY = y;
    let targetX = x;
    let targetY = y;

    const onMouse = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animate = () => {
      // Faster dot follow, smooth ring spring
      dotX += (targetX - dotX) * 0.4;
      dotY += (targetY - dotY) * 0.4;
      x += (targetX - x) * 0.15;
      y += (targetY - y) * 0.15;

      dot.style.transform = `translate3d(${dotX - 4}px, ${dotY - 4}px, 0)`;
      ring.style.transform = `translate3d(${x - 20}px, ${y - 20}px, 0)`;

      const hovered = document.querySelector(':hover') as HTMLElement | null;
      const isInteractive = Boolean(
        hovered && (
          hovered.tagName === 'A' ||
          hovered.tagName === 'BUTTON' ||
          hovered.getAttribute('role') === 'button' ||
          hovered.closest('a, button, [role="button"], input, textarea, select')
        )
      );

      ring.style.width = isInteractive ? '52px' : '40px';
      ring.style.height = isInteractive ? '52px' : '40px';
      ring.style.borderColor = isInteractive ? 'rgba(96,165,250,0.6)' : 'rgba(96,165,250,0.2)';
      ring.style.boxShadow = isInteractive
        ? '0 0 20px rgba(96,165,250,0.3), inset 0 0 10px rgba(96,165,250,0.15)'
        : '0 0 10px rgba(96,165,250,0.08)';

      dot.style.scale = isInteractive ? '1.6' : '1';
      dot.style.backgroundColor = isInteractive ? '#60a5fa' : '#93c5fd';

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouse, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouse);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Center pinpoint dot */}
      <div
        ref={dotRef}
        className="hidden md:block fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          width: '8px',
          height: '8px',
          backgroundColor: '#60a5fa',
          transition: 'scale 0.2s cubic-bezier(0.22, 1, 0.36, 1)',
          willChange: 'transform',
        }}
      />
      {/* Outer spring ring */}
      <div
        ref={ringRef}
        className="hidden md:block fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          width: '40px',
          height: '40px',
          border: '1px solid rgba(96,165,250,0.25)',
          backdropFilter: 'blur(1px)',
          transition: 'width 0.25s cubic-bezier(0.22, 1, 0.36, 1), height 0.25s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.25s ease, box-shadow 0.25s ease',
          willChange: 'transform',
        }}
      />
    </>
  );
};

export default CursorFollower;
