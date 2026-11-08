import React from 'react';
import { motion } from 'motion/react';
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery';

interface MarqueeProps {
  text: string;
  speed?: number; // duration in seconds
  repeat?: number;
  className?: string;
  reverse?: boolean;
}

export const Marquee: React.FC<MarqueeProps> = ({
  text,
  speed = 22,
  repeat = 4,
  className = '',
  reverse = false,
}) => {
  const prefersReduced = usePrefersReducedMotion();

  if (prefersReduced) {
    return (
      <div className={`overflow-hidden whitespace-nowrap select-none opacity-10 ${className}`}>
        {Array.from({ length: 2 }).map((_, i) => (
          <span key={i} className="mr-8">{text}</span>
        ))}
      </div>
    );
  }

  return (
    <div className={`overflow-hidden whitespace-nowrap flex select-none pointer-events-none ${className}`}>
      <motion.div
        className="flex shrink-0 items-center"
        animate={{
          x: reverse ? ['0%', '50%'] : ['0%', '-50%'],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {Array.from({ length: repeat * 2 }).map((_, i) => (
          <span key={i} className="mr-8">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
};
