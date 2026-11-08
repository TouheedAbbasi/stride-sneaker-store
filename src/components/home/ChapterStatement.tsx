import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useIsDesktop, usePrefersReducedMotion } from '../../hooks/useMediaQuery';
import heroSneaker from '../../assets/images/stride_hero_sneaker_1790825406786.jpg';

const STATEMENT_WORDS = [
  'Built',
  'for',
  'every',
  'step',
  'you',
  "haven't",
  'taken',
  'yet.',
];

const ChapterStatementMobile: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-y border-black/5 dark:border-white/5 bg-[#EFEFEA]/60 dark:bg-[#141416]/60">
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#84ad00] dark:text-[#C6F432]">
          Chapter 02 · The Philosophy
        </span>
        <h2 className="font-display text-3xl sm:text-5xl font-black text-neutral-900 dark:text-white tracking-tight leading-tight">
          Built for every step you haven&apos;t taken yet.
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
          Engineered at the nexus of biomechanical science and minimal sculpture. Every gram calibrated for forward momentum.
        </p>
      </div>
    </section>
  );
};

const ChapterStatementDesktop: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Shoe transition transforms
  const shoeX = useTransform(scrollYProgress, [0, 0.4, 0.9], ['0%', '35%', '45%']);
  const shoeY = useTransform(scrollYProgress, [0, 0.5, 0.9], ['20%', '0%', '-10%']);
  const shoeScale = useTransform(scrollYProgress, [0, 0.5, 0.9], [1, 0.75, 0.65]);
  const shoeRotate = useTransform(scrollYProgress, [0, 0.5, 0.9], [-12, -2, 8]);
  const shoeOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.3, 0.9, 0.9, 0.4]);

  const paragraphOpacity = useTransform(scrollYProgress, [0.65, 0.85], [0, 1]);
  const paragraphY = useTransform(scrollYProgress, [0.65, 0.85], [20, 0]);

  return (
    <section ref={containerRef} className="relative h-[220vh] bg-[#F7F7F5] dark:bg-[#111111] transition-colors">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-6 lg:px-12">
        {/* Subtle background circular glow */}
        <div className="absolute w-[600px] h-[600px] rounded-full bg-[#C6F432]/10 dark:bg-[#C6F432]/5 blur-3xl pointer-events-none" />

        {/* Floating shoe that shrinks and shifts to the side */}
        <motion.div
          style={{
            x: shoeX,
            y: shoeY,
            scale: shoeScale,
            rotate: shoeRotate,
            opacity: shoeOpacity,
          }}
          className="absolute z-10 w-[420px] lg:w-[540px] pointer-events-none select-none right-12 lg:right-24"
        >
          <img
            src={heroSneaker}
            alt="STRIDE Kinetic engineering silhouette"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_25px_35px_rgba(0,0,0,0.5)]"
          />
        </motion.div>

        {/* Narrative Statement with word-by-word reveal */}
        <div className="max-w-4xl z-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 text-xs font-semibold tracking-wider text-neutral-600 dark:text-neutral-400">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6F432]" />
            <span>THE STRIDE THESIS</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] flex flex-wrap gap-x-4 gap-y-2">
            {STATEMENT_WORDS.map((word, index) => {
              const start = (index / STATEMENT_WORDS.length) * 0.75;
              const end = Math.min(1, ((index + 1) / STATEMENT_WORDS.length) * 0.75);
              return (
                <WordHighlight
                  key={index}
                  word={word}
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              );
            })}
          </h2>

          <motion.p
            style={{
              opacity: paragraphOpacity,
              y: paragraphY,
            }}
            className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-xl leading-relaxed"
          >
            We stripped away traditional heavy rubber, rigid plastic shanks, and billboard branding to create pure kinetic connection between your foot and the earth.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

// Sub-component to highlight each word from muted grey to near-black based on scroll
const WordHighlight: React.FC<{
  word: string;
  progress: any;
  range: [number, number];
}> = ({ word, progress, range }) => {
  const r0 = Math.max(0, range[0]);
  const r1 = Math.max(r0 + 0.01, Math.min(1, range[1]));
  const opacity = useTransform(progress, [r0, r1], [0.2, 1]);
  const y = useTransform(progress, [r0, r1], [6, 0]);

  return (
    <motion.span
      style={{ opacity, y }}
      className="inline-block transition-colors duration-200 text-neutral-900 dark:text-white"
    >
      {word}
    </motion.span>
  );
};

export const ChapterStatement: React.FC = () => {
  const isDesktop = useIsDesktop();
  const prefersReduced = usePrefersReducedMotion();

  if (!isDesktop || prefersReduced) {
    return <ChapterStatementMobile />;
  }

  return <ChapterStatementDesktop />;
};
