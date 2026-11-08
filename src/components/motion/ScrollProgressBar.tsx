import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const prefersReduced = usePrefersReducedMotion();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (prefersReduced) return null;

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-[#C6F432] origin-left z-50 pointer-events-none shadow-[0_0_10px_#C6F432]"
    />
  );
};
