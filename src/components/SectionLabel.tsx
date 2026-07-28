import { motion } from 'framer-motion';

interface SectionLabelProps {
  children: React.ReactNode;
  delay?: number;
}

/**
 * Magazine-style section label.
 * A horizontal line extends from the left, then the label text appears.
 * Animates when the element scrolls into view.
 */
const SectionLabel: React.FC<SectionLabelProps> = ({ children, delay = 0 }) => {
  return (
    <div className="flex items-center gap-3 overflow-hidden mb-4">
      <motion.div
        className="h-px bg-accent/50 shrink-0"
        initial={{ width: 0 }}
        whileInView={{ width: 36 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.span
        className="section-label"
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.4, delay: delay + 0.08, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </div>
  );
};

export default SectionLabel;
