import { motion } from 'framer-motion';

interface SplitTextHeadingProps {
  text: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'span';
}

const SplitTextHeading: React.FC<SplitTextHeadingProps> = ({
  text,
  className = '',
  delay = 0,
  as: Tag = 'h2',
}) => {
  const chars = text.split('');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: delay },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 60,
      rotateX: -40,
      filter: 'blur(10px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="inline-block perspective-[1200px]"
    >
      <Tag className={className} style={{ display: 'inline' }}>
        {chars.map((char, i) => (
          <motion.span
            key={i}
            variants={child}
            className="inline-block"
            style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}
          >
            {char === ' ' ? ' ' : char}
          </motion.span>
        ))}
      </Tag>
    </motion.div>
  );
};

export { SplitTextHeading };
export default SplitTextHeading;
