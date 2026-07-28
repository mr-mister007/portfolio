import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface SectionCounterProps {
  index: number;
  total: number;
}

/**
 * Animated section number — like [01/03] that reveals as you scroll into the section.
 * Uses framer-motion's useScroll scoped to its parent container.
 */
const SectionCounter: React.FC<SectionCounterProps> = ({ index, total }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [12, 0, 0, -12]);

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.span
        className="font-mono text-[clamp(0.6rem,0.8vw,0.75rem)] tracking-[0.15em] text-text-secondary"
        style={{ opacity, y }}
      >
        [{String(index).padStart(2, '0')}/{String(total).padStart(2, '0')}]
      </motion.span>
    </div>
  );
};

export default SectionCounter;
