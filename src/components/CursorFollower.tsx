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

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;

    let rafId = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let targetX = x;
    let targetY = y;

    const onMouse = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animate = () => {
      // Spring-like interpolation
      x += (targetX - x) * 0.12;
      y += (targetY - y) * 0.12;
      ring.style.transform = `translate(${x - 20}px, ${y - 20}px)`;

      // Check if hovering an interactive element
      const hovered = document.querySelector(':hover') as HTMLElement | null;
      const isInteractive = hovered && (
        hovered.tagName === 'A' ||
        hovered.tagName === 'BUTTON' ||
        hovered.getAttribute('role') === 'button' ||
        hovered.closest('a, button, [role="button"]')
      );

      ring.style.width = isInteractive ? '48px' : '40px';
      ring.style.height = isInteractive ? '48px' : '40px';
      ring.style.borderColor = isInteractive ? 'rgba(96,165,250,0.5)' : 'rgba(255,255,255,0.15)';

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouse, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouse);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Only show on devices with fine pointers (not touch)
  return (
    <div
      ref={ringRef}
      className="hidden md:block fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.15)',
        transition: 'width 0.2s ease, height 0.2s ease, border-color 0.2s ease',
        willChange: 'transform',
      }}
    />
  );
};

export default CursorFollower;
