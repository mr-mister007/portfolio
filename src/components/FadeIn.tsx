import { motion, type MotionProps } from 'framer-motion';
import React from 'react';

type AnimationVariant = 'up' | 'down' | 'left' | 'right' | 'scale' | 'scale-up' | 'blur' | 'none';

interface FadeInProps extends MotionProps {
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  variant?: AnimationVariant;
  once?: boolean;
  margin?: string;
  amount?: number;
}

const getVariants = (variant: AnimationVariant, x: number, y: number) => {
  switch (variant) {
    case 'up':
      return { initial: { y: y || 40, opacity: 0 }, animate: { y: 0, opacity: 1 } };
    case 'down':
      return { initial: { y: -(y || 40), opacity: 0 }, animate: { y: 0, opacity: 1 } };
    case 'left':
      return { initial: { x: -(x || 60), opacity: 0 }, animate: { x: 0, opacity: 1 } };
    case 'right':
      return { initial: { x: x || 60, opacity: 0 }, animate: { x: 0, opacity: 1 } };
    case 'scale':
      return { initial: { scale: 0.9, opacity: 0 }, animate: { scale: 1, opacity: 1 } };
    case 'scale-up':
      return { initial: { scale: 0.95, y: y || 20, opacity: 0 }, animate: { scale: 1, y: 0, opacity: 1 } };
    case 'blur':
      return { initial: { filter: 'blur(10px)', opacity: 0 }, animate: { filter: 'blur(0px)', opacity: 1 } };
    case 'none':
      return { initial: { opacity: 1 }, animate: { opacity: 1 } };
    default:
      return { initial: { y: y || 30, opacity: 0 }, animate: { y: 0, opacity: 1 } };
  }
};

const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  variant = 'up',
  once = true,
  margin = '-50px',
  amount = 0.1,
  ...props
}) => {
  const variants = getVariants(variant, x, y);

  return (
    <motion.div
      initial={variants.initial}
      whileInView={variants.animate}
      viewport={{ once, margin, amount }}
      transition={{
        duration,
        ease: [0.22, 1, 0.36, 1],
        delay,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export { FadeIn };
export default FadeIn;
