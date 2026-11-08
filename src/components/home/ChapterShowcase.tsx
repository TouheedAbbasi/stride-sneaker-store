import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useIsDesktop, usePrefersReducedMotion } from '../../hooks/useMediaQuery';
import heroSneaker from '../../assets/images/stride_hero_sneaker_1790825406786.jpg';

interface FeatureCallout {
  id: string;
  step: string;
  title: string;
  description: string;
  spec: string;
  targetArea: { top: string; left: string }; // Position of pointer dot on shoe container
}

const FEATURES: FeatureCallout[] = [
  {
    id: 'cushioning',
    step: '01',
    title: 'Supercritical KineticFoam™',
    description: 'Dual-density nitrogen-expanded bio-polymers providing 38% superior rebound velocity without packing down over 500+ miles.',
    spec: '+38% Energy Return',
    targetArea: { top: '65%', left: '45%' },
  },
  {
    id: 'mesh',
    step: '02',
    title: 'Laser-Vented Mono-Mesh',
    description: 'Single-filament zero-friction upper adapting dynamically to foot expansion during grueling 20-mile marathon long efforts.',
    spec: 'Sub-40g Weight',
    targetArea: { top: '35%', left: '70%' },
  },
  {
    id: 'carbon',
    step: '03',
    title: 'Contoured Carbon Plate',
    description: 'Spoon-shaped 100% woven carbon fiber spine engineered with variable stiffness to accelerate forward toe-off torque.',
    spec: 'Sub-3hr Tuned',
    targetArea: { top: '55%', left: '35%' },
  },
  {
    id: 'outsole',
    step: '04',
    title: 'Bio-Algae Traction Lug Matrix',
    description: '30% recycled vulcanized natural rubber infused with sustainably harvested algae EVA for adhesive wet-asphalt grip.',
    spec: '5mm Wet-Grip Lugs',
    targetArea: { top: '75%', left: '20%' },
  },
];

const ChapterShowcaseMobile: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#84ad00] dark:text-[#C6F432]">
          Chapter 03 · Anatomy
        </span>
        <h2 className="font-display text-2xl sm:text-4xl font-black text-neutral-900 dark:text-white mt-1">
          Engineered Down to the Micron
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-2">
          Every component designed to propel human locomotion without unnecessary bulk.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="aspect-square rounded-3xl bg-white dark:bg-[#1A1A1E] p-8 flex items-center justify-center border border-black/5 dark:border-white/5">
          <img
            src={heroSneaker}
            alt="STRIDE Anatomy"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="space-y-4">
          {FEATURES.map((feat) => (
            <div
              key={feat.id}
              className="p-5 rounded-2xl bg-white dark:bg-[#18181A] border border-black/5 dark:border-white/5 space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#84ad00] dark:text-[#C6F432] font-mono">
                  {feat.step}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-black/5 dark:bg-white/10 px-2 py-0.5 rounded">
                  {feat.spec}
                </span>
              </div>
              <h4 className="font-display text-base font-bold text-neutral-900 dark:text-white">
                {feat.title}
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ChapterShowcaseDesktop: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Dynamic transforms for the shoe reacting to scroll stages
  const shoeRotate = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [-6, 12, -14, 18, -4]
  );

  const shoeScale = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [1.05, 1.25, 1.2, 1.15, 1.05]
  );

  const shoeY = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, -40, 30, -20, 0]
  );

  const shoeX = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, -50, 40, -30, 0]
  );

  return (
    <section ref={containerRef} className="relative h-[320vh] bg-[#F7F7F5] dark:bg-[#111111] transition-colors">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-6 lg:px-12">
        {/* Ambient backdrop circles */}
        <div className="absolute w-[700px] h-[700px] rounded-full bg-radial from-[#C6F432]/15 via-transparent to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-7xl w-full grid grid-cols-12 gap-8 items-center z-10">
          {/* Left Column: Interactive Feature Callouts that illuminate sequentially */}
          <div className="col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 text-xs font-semibold tracking-wider text-neutral-600 dark:text-neutral-400">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6F432]" />
              <span>CHAPTER 03 · UP CLOSE ANATOMY</span>
            </div>

            <h2 className="font-display text-3xl lg:text-4xl font-black text-neutral-900 dark:text-white tracking-tight leading-tight">
              Anatomy of Pure Propulsion.
            </h2>

            <div className="space-y-4 pt-2">
              {FEATURES.map((feat, index) => {
                const rangeStart = index * 0.24;
                const rangeEnd = (index + 1) * 0.24;

                return (
                  <FeatureCard
                    key={feat.id}
                    feature={feat}
                    progress={scrollYProgress}
                    range={[rangeStart, rangeEnd]}
                  />
                );
              })}
            </div>
          </div>

          {/* Right Column: Sticky 3D Transforming Shoe with Indicator Lines */}
          <div className="col-span-7 relative flex items-center justify-center h-[520px]">
            {/* Center Shoe with dynamic rotation and scale based on active callout */}
            <motion.div
              style={{
                rotate: shoeRotate,
                scale: shoeScale,
                x: shoeX,
                y: shoeY,
              }}
              className="relative w-full max-w-xl aspect-square flex items-center justify-center"
            >
              <img
                src={heroSneaker}
                alt="STRIDE Kinetic engineered architecture"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.25)] select-none pointer-events-none"
              />

              {/* Dynamic Accent Pointer Line & Indicator Node */}
              {FEATURES.map((feat, index) => (
                <FeatureHotspot
                  key={feat.id}
                  feature={feat}
                  progress={scrollYProgress}
                  index={index}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Sub-component for individual feature card highlighting based on scroll range
const FeatureCard: React.FC<{
  feature: FeatureCallout;
  progress: any;
  range: [number, number];
}> = ({ feature, progress, range }) => {
  const r0 = Math.max(0, range[0] - 0.04);
  const r1 = Math.max(r0 + 0.01, range[0]);
  const r2 = Math.min(0.99, range[1] - 0.02);
  const r3 = Math.min(1, Math.max(r2 + 0.01, range[1]));

  const opacity = useTransform(progress, [r0, r1, r2, r3], [0.35, 1, 1, 0.35]);
  const x = useTransform(progress, [r0, r1, r2, r3], [-8, 0, 0, -8]);
  const scale = useTransform(progress, [r0, r1, r2, r3], [0.98, 1.02, 1.02, 0.98]);

  return (
    <motion.div
      style={{ opacity, x, scale }}
      className="p-5 rounded-2xl bg-white/90 dark:bg-[#1A1A1E]/90 backdrop-blur-md border border-black/5 dark:border-white/10 shadow-sm transition-shadow duration-300"
    >
      <div className="flex items-center justify-between mb-1">
        <span className="font-mono text-xs font-bold text-[#7ca400] dark:text-[#C6F432]">
          {feature.step} // BIOMECHANICS
        </span>
        <span className="text-[11px] font-bold uppercase tracking-wider bg-black/5 dark:bg-white/10 px-2 py-0.5 rounded text-neutral-800 dark:text-neutral-200">
          {feature.spec}
        </span>
      </div>

      <h3 className="font-display text-base font-bold text-neutral-900 dark:text-white">
        {feature.title}
      </h3>

      <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
        {feature.description}
      </p>
    </motion.div>
  );
};

// Sub-component for the interactive glowing hotspot and connector line on the shoe
const FeatureHotspot: React.FC<{
  feature: FeatureCallout;
  progress: any;
  index: number;
}> = ({ feature, progress, index }) => {
  const rangeStart = index * 0.24;
  const rangeEnd = (index + 1) * 0.24;

  const r0 = Math.max(0, rangeStart - 0.04);
  const r1 = Math.max(r0 + 0.01, rangeStart);
  const r2 = Math.min(0.99, rangeEnd - 0.02);
  const r3 = Math.min(1, Math.max(r2 + 0.01, rangeEnd));

  const nodeOpacity = useTransform(progress, [r0, r1, r2, r3], [0, 1, 1, 0]);
  const nodeScale = useTransform(progress, [r0, r1, r2, r3], [0.5, 1, 1, 0.5]);

  return (
    <motion.div
      style={{
        top: feature.targetArea.top,
        left: feature.targetArea.left,
        opacity: nodeOpacity,
        scale: nodeScale,
      }}
      className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 z-20"
    >
      {/* Outer pulsing ring */}
      <span className="absolute -inset-2.5 rounded-full bg-[#C6F432]/40 animate-ping" />
      {/* Core glowing dot */}
      <div className="relative w-4 h-4 rounded-full bg-[#C6F432] border-2 border-black shadow-[0_0_15px_#C6F432]" />
    </motion.div>
  );
};

export const ChapterShowcase: React.FC = () => {
  const isDesktop = useIsDesktop();
  const prefersReduced = usePrefersReducedMotion();

  if (!isDesktop || prefersReduced) {
    return <ChapterShowcaseMobile />;
  }

  return <ChapterShowcaseDesktop />;
};
