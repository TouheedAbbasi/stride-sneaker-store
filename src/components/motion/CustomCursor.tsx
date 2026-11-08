import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useIsDesktop, usePrefersReducedMotion } from '../../hooks/useMediaQuery';

export const CustomCursor: React.FC = () => {
  const isDesktop = useIsDesktop();
  const prefersReduced = usePrefersReducedMotion();

  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'view'>('default');
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for cursor follower
  const springX = useSpring(mouseX, { stiffness: 450, damping: 32 });
  const springY = useSpring(mouseY, { stiffness: 450, damping: 32 });

  useEffect(() => {
    if (!isDesktop || prefersReduced) return;

    const handleMouseMove = (e: MouseEvent) => {
      try {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
        setIsVisible(true);

        const target = e.target as HTMLElement | null;
        if (!target) return;

        const isViewable = Boolean(
          target.closest('[data-cursor="view"]') ||
          target.closest('.group')
        );

        const isClickable = Boolean(
          target.closest('button, a, input, select, textarea, [role="button"]')
        );

        if (isViewable) {
          setCursorType('view');
        } else if (isClickable) {
          setCursorType('pointer');
        } else {
          setCursorType('default');
        }
      } catch {
        // Safe fallback
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isDesktop, prefersReduced]);

  if (!isDesktop || prefersReduced || !isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Outer reactive ring / label */}
      <motion.div
        style={{
          x: springX,
          y: springY,
        }}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-colors duration-200"
        animate={{
          width: cursorType === 'view' ? 68 : cursorType === 'pointer' ? 44 : 26,
          height: cursorType === 'view' ? 68 : cursorType === 'pointer' ? 44 : 26,
          backgroundColor:
            cursorType === 'view'
              ? 'rgba(198, 244, 50, 0.95)'
              : cursorType === 'pointer'
              ? 'rgba(17, 17, 17, 0.12)'
              : 'rgba(0, 0, 0, 0)',
          borderColor:
            cursorType === 'view'
              ? '#C6F432'
              : cursorType === 'pointer'
              ? 'rgba(198, 244, 50, 0.8)'
              : 'rgba(17, 17, 17, 0.35)',
          borderWidth: cursorType === 'view' ? 0 : 1.5,
          scale: 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      >
        {cursorType === 'view' && (
          <span className="text-[10px] font-black uppercase tracking-wider text-black font-display select-none">
            VIEW
          </span>
        )}
      </motion.div>

      {/* Center dot (hidden in view mode) */}
      {cursorType !== 'view' && (
        <motion.div
          style={{
            x: mouseX,
            y: mouseY,
          }}
          className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#111111] dark:bg-[#C6F432]"
        />
      )}
    </div>
  );
};
