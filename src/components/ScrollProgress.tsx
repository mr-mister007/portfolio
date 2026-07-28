import { useScroll } from 'framer-motion';
import { useEffect, useRef } from 'react';

/**
 * Thin scroll-progress bar fixed at the very top of the viewport.
 * Fills from left to right as the user scrolls through the page.
 * Uses direct DOM subscription (no render thrashing).
 */
const ScrollProgress: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const unsub = scrollYProgress.on('change', (v) => {
      bar.style.transform = `scaleX(${v})`;
    });
    return () => unsub();
  }, [scrollYProgress]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] pointer-events-none">
      <div
        ref={barRef}
        className="h-full bg-accent origin-left"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
};

export default ScrollProgress;
