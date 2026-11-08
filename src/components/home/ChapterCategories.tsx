import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../../data/products';
import { useIsDesktop, usePrefersReducedMotion } from '../../hooks/useMediaQuery';

const ChapterCategoriesMobile: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
            Chapter 04 · Disciplines
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-neutral-900 dark:text-white mt-1">
            Choose Your Pace
          </h2>
        </div>
        <Link
          to="/shop"
          className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white hover:text-neutral-600 dark:hover:text-[#C6F432] inline-flex items-center gap-1 group"
        >
          <span>View All Categories</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            to={`/shop?category=${cat.id}`}
            className="group relative h-96 rounded-3xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 border border-black/5 dark:border-white/10 shadow-sm"
          >
            <img
              src={cat.image}
              alt={cat.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#C6F432]">
                {cat.itemCount}
              </span>
              <h3 className="font-display text-2xl font-bold tracking-tight mt-1">
                {cat.title}
              </h3>
              <p className="text-xs text-neutral-300 mt-1 line-clamp-1">
                {cat.subtitle}
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-white group-hover:text-[#C6F432] transition-colors">
                <span>Explore Shoes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

const ChapterCategoriesDesktop: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Moves the cards track sideways as user scrolls vertically
  const x = useTransform(scrollYProgress, [0.05, 0.95], ['0%', '-45%']);

  return (
    <section ref={containerRef} className="relative h-[250vh] bg-[#F7F7F5] dark:bg-[#111111] transition-colors">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden px-8 lg:px-16">
        {/* Header */}
        <div className="max-w-7xl w-full mx-auto flex items-end justify-between mb-8 z-10 shrink-0">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 text-xs font-semibold tracking-wider text-neutral-600 dark:text-neutral-400 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6F432]" />
              <span>CHAPTER 04 · CHOOSE YOUR PACE</span>
            </div>
            <h2 className="font-display text-3xl lg:text-4xl font-black text-neutral-900 dark:text-white tracking-tight">
              Calibrated for Every Discipline.
            </h2>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold text-neutral-500">
            <span>Scroll horizontally</span>
            <div className="w-16 h-1 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
              <motion.div
                style={{ scaleX: scrollYProgress }}
                className="h-full bg-[#C6F432] origin-left"
              />
            </div>
          </div>
        </div>

        {/* Sideways scrolling track */}
        <div className="w-full overflow-visible z-10">
          <motion.div
            style={{ x }}
            className="flex gap-8 w-max items-center pr-24"
          >
            {CATEGORIES.map((cat, index) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="w-[340px] lg:w-[420px] shrink-0"
              >
                <Link
                  to={`/shop?category=${cat.id}`}
                  data-cursor="view"
                  className="group relative h-[480px] rounded-3xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 border border-black/10 dark:border-white/10 shadow-lg block transform transition-transform duration-500 hover:-translate-y-2"
                >
                  <img
                    src={cat.image}
                    alt={cat.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  {/* Atmospheric media scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity group-hover:opacity-95" />

                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#C6F432] block">
                      {cat.itemCount}
                    </span>
                    <h3 className="font-display text-3xl font-black tracking-tight mt-1">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-neutral-300 mt-1.5 transition-transform duration-300 group-hover:-translate-y-1">
                      {cat.subtitle}
                    </p>
                    <div className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-white group-hover:text-[#C6F432] transition-colors">
                      <span>Explore Collection</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const ChapterCategories: React.FC = () => {
  const isDesktop = useIsDesktop();
  const prefersReduced = usePrefersReducedMotion();

  if (!isDesktop || prefersReduced) {
    return <ChapterCategoriesMobile />;
  }

  return <ChapterCategoriesDesktop />;
};
