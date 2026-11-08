import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, RotateCcw, Truck, Leaf, Shield, Star, ChevronDown } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { TESTIMONIALS, HERO_ASSETS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { useIsDesktop, usePrefersReducedMotion } from '../hooks/useMediaQuery';
import { RevealOnScroll } from '../components/motion/RevealOnScroll';
import { CountUp } from '../components/motion/CountUp';
import { Marquee } from '../components/motion/Marquee';
import { ChapterStatement } from '../components/home/ChapterStatement';
import { ChapterShowcase } from '../components/home/ChapterShowcase';
import { ChapterCategories } from '../components/home/ChapterCategories';

export const HomePage: React.FC = () => {
  const { products } = useCart();
  const isDesktop = useIsDesktop();
  const prefersReduced = usePrefersReducedMotion();
  const carouselRef = useRef<HTMLDivElement>(null);

  // Parallax tilt for the hero shoe reacting to mouse movements on desktop
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const shoeTiltX = useTransform(springY, [-300, 300], [8, -8]);
  const shoeTiltY = useTransform(springX, [-300, 300], [-10, 10]);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop || prefersReduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleHeroMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 340;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const newArrivals = products.filter((p) => p.isNewArrival || (Array.isArray(p.tags) && p.tags.includes('new')));
  const bestSellers = products.filter((p) => p.isBestSeller || (Array.isArray(p.tags) && p.tags.includes('bestseller'))).slice(0, 8);

  return (
    <div className="space-y-16 sm:space-y-28 pb-16 overflow-x-clip">
      {/* ========================================================
          CHAPTER 1: ARRIVAL (HERO WITH CINEMATIC MASKED REVEAL)
          ======================================================== */}
      <section
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        className="relative overflow-hidden bg-[#EFEFEA] dark:bg-[#161618] border-b border-black/[0.06] dark:border-white/[0.08] transition-colors"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-28 min-h-[calc(100vh-80px)] flex flex-col justify-between">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center my-auto">
            {/* Left Hero Copy */}
            <div className="lg:col-span-6 z-10 space-y-6 text-center lg:text-left">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 text-xs font-semibold tracking-wider text-neutral-800 dark:text-neutral-200"
              >
                <span className="w-2 h-2 rounded-full bg-[#C6F432]" />
                <span>STRIDE LAB PROTO-04 RELEASE</span>
              </motion.div>

              {/* Masked Slide-Up Headline ("Move Different.") */}
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1.0, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-neutral-900 dark:text-white leading-[1.02]"
                >
                  Move Different<span className="text-[#9ec425] dark:text-[#C6F432]">.</span>
                </motion.h1>
              </div>

              {/* Subtext reveal */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-xl mx-auto lg:mx-0 leading-relaxed"
              >
                Supercritical kinetic foam. Spoon-contoured carbon propulsion plates. Engineered for runners who refuse standard physics.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2"
              >
                <Link
                  to="/shop"
                  data-cursor="view"
                  className="w-full sm:w-auto px-8 py-4 bg-[#111111] dark:bg-[#C6F432] text-white dark:text-black font-display font-bold text-sm sm:text-base rounded-full hover:opacity-90 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-3 group"
                >
                  <span>Shop Collection</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/shop?category=Running"
                  className="w-full sm:w-auto px-7 py-4 bg-white/80 dark:bg-white/10 backdrop-blur-sm text-neutral-900 dark:text-white font-display font-semibold text-sm sm:text-base rounded-full hover:bg-white dark:hover:bg-white/20 transition-all border border-black/10 dark:border-white/10 flex items-center justify-center"
                >
                  Explore Running
                </Link>
              </motion.div>

              {/* Trust metric stats strip with animated CountUp */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="pt-6 border-t border-black/10 dark:border-white/10 grid grid-cols-3 gap-4 text-center lg:text-left max-w-md mx-auto lg:mx-0"
              >
                <div>
                  <div className="font-display text-xl sm:text-2xl font-black text-neutral-900 dark:text-white">
                    <CountUp to={38} prefix="+" suffix="%" />
                  </div>
                  <div className="text-[11px] text-neutral-500 uppercase tracking-wider font-medium">
                    Energy Return
                  </div>
                </div>
                <div>
                  <div className="font-display text-xl sm:text-2xl font-black text-neutral-900 dark:text-white">
                    <CountUp to={185} suffix="g" />
                  </div>
                  <div className="text-[11px] text-neutral-500 uppercase tracking-wider font-medium">
                    Ultralight Spec
                  </div>
                </div>
                <div>
                  <div className="font-display text-xl sm:text-2xl font-black text-neutral-900 dark:text-white">
                    <CountUp to={30} suffix="-Day" />
                  </div>
                  <div className="text-[11px] text-neutral-500 uppercase tracking-wider font-medium">
                    Road Trial
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Hero Imagery with interactive Parallax Tilt & Idle Floating */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              <motion.div
                style={{
                  rotateX: shoeTiltX,
                  rotateY: shoeTiltY,
                }}
                className="relative w-full aspect-[4/3] sm:aspect-[16/11] flex items-center justify-center perspective-[1000px]"
              >
                {/* Glow backdrop aura */}
                <div className="absolute inset-0 bg-radial from-[#C6F432]/35 via-transparent to-transparent blur-3xl transform scale-90 pointer-events-none" />

                {/* Floating animated shoe */}
                <motion.div
                  initial={{ opacity: 1, scale: 1.04 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: prefersReduced ? 0 : [-6, 6, -6],
                  }}
                  transition={{
                    scale: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                    y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
                  }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <img
                    src={HERO_ASSETS.hero}
                    alt="STRIDE Aero Kinetic flagship running sneaker"
                    fetchPriority="high"
                    decoding="sync"
                    loading="eager"
                    width={1376}
                    height={768}
                    className="w-full h-full object-contain relative z-10 drop-shadow-2xl select-none"
                  />
                </motion.div>

                {/* Floating badge top right */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="absolute top-4 right-2 sm:right-6 z-20 bg-white/90 dark:bg-black/80 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-black/10 dark:border-white/10 shadow-lg hidden sm:block"
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#85b100] dark:text-[#C6F432] block">
                    Propulsion
                  </span>
                  <span className="font-display text-xs font-bold text-neutral-900 dark:text-white">
                    Carbon Matrix V2
                  </span>
                </motion.div>

                {/* Floating badge bottom left */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                  className="absolute bottom-4 left-2 sm:left-6 z-20 bg-white/90 dark:bg-black/80 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-black/10 dark:border-white/10 shadow-lg hidden sm:block"
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 block">
                    Zero-Waste
                  </span>
                  <span className="font-display text-xs font-bold text-neutral-900 dark:text-white">
                    Circular Foam
                  </span>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Gentle Bouncing Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex flex-col items-center justify-center gap-1.5 pt-6 text-neutral-400 dark:text-neutral-500 text-[11px] font-bold uppercase tracking-widest pointer-events-none"
          >
            <span>Scroll to Discover</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            >
              <ChevronDown className="w-4 h-4 text-[#86b300] dark:text-[#C6F432]" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================
          CHAPTER 2: THE IDEA (PINNED STATEMENT SCROLL HIGHLIGHT)
          ======================================================== */}
      <ChapterStatement />

      {/* ========================================================
          CHAPTER 3: THE SHOE UP CLOSE (STICKY ANATOMY SHOWCASE)
          ======================================================== */}
      <ChapterShowcase />

      {/* ========================================================
          CHAPTER 4: CHOOSE YOUR PACE (PINNED HORIZONTAL SCROLL)
          ======================================================== */}
      <ChapterCategories />

      {/* ========================================================
          CHAPTER 5: FRESH DROPS (NEW ARRIVALS + MARQUEE TICKER)
          ======================================================== */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Large Moving Text Marquee in background */}
        <div className="absolute -top-10 left-0 right-0 z-0">
          <Marquee
            text="NEW ARRIVALS · MOVE DIFFERENT · KINETIC PROPULSION · "
            speed={28}
            className="text-6xl sm:text-8xl lg:text-9xl font-black text-black/[0.03] dark:text-white/[0.04] font-display"
          />
        </div>

        <div className="relative z-10 flex items-center justify-between mb-8">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
              Chapter 05 · Fresh Drops
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-neutral-900 dark:text-white mt-1">
              New Arrivals
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollCarousel('left')}
              aria-label="Scroll left"
              className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-800 flex items-center justify-center text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors shadow-xs"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollCarousel('right')}
              aria-label="Scroll right"
              className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-800 flex items-center justify-center text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors shadow-xs"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel container */}
        <div
          ref={carouselRef}
          className="relative z-10 flex gap-6 overflow-x-auto no-scrollbar pb-4 snap-x snap-mandatory"
        >
          {newArrivals.map((product, idx) => (
            <div key={product.id} className="w-72 sm:w-80 shrink-0 snap-start">
              <RevealOnScroll delay={idx * 0.08} distance={20}>
                <ProductCard product={product} />
              </RevealOnScroll>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          CHAPTER 6: PROOF (BEST SELLERS & VERIFIED REVIEWS)
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Best Sellers */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                Chapter 06 · Tested & Proven
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-neutral-900 dark:text-white mt-1">
                Best Sellers
              </h2>
            </div>
            <Link
              to="/shop?tag=bestseller"
              className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white hover:text-neutral-600 dark:hover:text-[#C6F432] inline-flex items-center gap-1 group"
            >
              <span>View All Best Sellers</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {bestSellers.map((product, idx) => (
              <RevealOnScroll key={product.id} delay={idx * 0.08}>
                <ProductCard product={product} />
              </RevealOnScroll>
            ))}
          </div>
        </div>

        {/* Proof Metrics Strip */}
        <div className="p-8 sm:p-10 rounded-3xl bg-neutral-900 text-white grid grid-cols-2 lg:grid-cols-4 gap-6 text-center border border-neutral-800">
          <div>
            <div className="font-display text-3xl sm:text-4xl font-black text-[#C6F432]">
              <CountUp to={50} suffix="K+" />
            </div>
            <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider font-semibold">
              Active Runners
            </div>
          </div>
          <div>
            <div className="font-display text-3xl sm:text-4xl font-black text-white">
              <CountUp to={4.9} decimals={1} suffix=" / 5.0" />
            </div>
            <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider font-semibold">
              Average Rating
            </div>
          </div>
          <div>
            <div className="font-display text-3xl sm:text-4xl font-black text-[#C6F432]">
              <CountUp to={500} suffix="+ mi" />
            </div>
            <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider font-semibold">
              Foam Durability
            </div>
          </div>
          <div>
            <div className="font-display text-3xl sm:text-4xl font-black text-white">
              <CountUp to={99.4} decimals={1} suffix="%" />
            </div>
            <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider font-semibold">
              Trial Satisfaction
            </div>
          </div>
        </div>

        {/* Athlete Reviews */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-500">
              Road Tested & Verified
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-neutral-900 dark:text-white mt-1">
              Voices From The Circuit
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((test, idx) => (
              <RevealOnScroll key={test.id} delay={idx * 0.12}>
                <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#18181A] border border-black/5 dark:border-white/5 flex flex-col justify-between shadow-xs h-full hover:shadow-md transition-shadow">
                  <div>
                    <div className="flex items-center gap-1 text-amber-500 mb-4">
                      {[...Array(test.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-500" />
                      ))}
                    </div>
                    <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed italic mb-6">
                      &ldquo;{test.quote}&rdquo;
                    </p>
                  </div>

                  <div className="pt-4 border-t border-black/5 dark:border-white/5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-display text-sm font-bold text-neutral-900 dark:text-neutral-100">
                          {test.author}
                        </h4>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          {test.role} · {test.location}
                        </p>
                      </div>
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                        Verified
                      </span>
                    </div>
                    <div className="mt-2 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                      Wearing: <span className="text-neutral-500 dark:text-neutral-400 font-normal">{test.product}</span>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          CHAPTER 7: THE PROMISE (SVG STROKE DRAW & PROMO BANNER)
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Value Proposition Strip with Staggered Reveals */}
        <RevealOnScroll distance={20}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 bg-white dark:bg-[#18181A] rounded-3xl border border-black/[0.05] dark:border-white/[0.08] shadow-sm">
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3">
              <div className="p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shrink-0">
                <Truck className="w-5 h-5 text-[#86b300] dark:text-[#C6F432]" />
              </div>
              <div>
                <h4 className="font-display text-sm font-bold">Fast Free Shipping</h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Complimentary 2-day delivery on all orders over $100
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3">
              <div className="p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shrink-0">
                <RotateCcw className="w-5 h-5 text-[#86b300] dark:text-[#C6F432]" />
              </div>
              <div>
                <h4 className="font-display text-sm font-bold">30-Day Road Trial</h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Run outside. If you don&apos;t love them, return hassle-free
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3">
              <div className="p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shrink-0">
                <Leaf className="w-5 h-5 text-[#86b300] dark:text-[#C6F432]" />
              </div>
              <div>
                <h4 className="font-display text-sm font-bold">Carbon Neutral</h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Recycled ocean plastics and bio-based algae EVA foams
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3">
              <div className="p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shrink-0">
                <Shield className="w-5 h-5 text-[#86b300] dark:text-[#C6F432]" />
              </div>
              <div>
                <h4 className="font-display text-sm font-bold">2-Year Craftsmanship</h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Guaranteed against manufacturing defects for 500+ miles
                </p>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Editorial Innovation Spotlight Banner with Smooth Hover Shift */}
        <RevealOnScroll distance={30}>
          <div className="relative rounded-3xl overflow-hidden bg-[#111111] text-white group shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 space-y-6">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#C6F432]">
                  Chapter 07 · Innovation In Motion
                </span>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                  Supercritical KineticFoam™ 2.0
                </h2>
                <p className="text-sm text-neutral-300 leading-relaxed max-w-lg">
                  We infuse nitrogen under extreme pressure into bio-circular polymers to produce micro-cellular chambers. The result is the softest landing coupled with explosive, instantaneous forward drive.
                </p>
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-xs font-semibold text-neutral-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C6F432]" />
                    <span>Sub-200g racing chassis weight standard</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-semibold text-neutral-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C6F432]" />
                    <span>Full-length carbon composite spoon plate</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-semibold text-neutral-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C6F432]" />
                    <span>100% circular recycled upper yarns</span>
                  </div>
                </div>
                <div className="pt-4">
                  <Link
                    to="/product/stride-aero-speed-1"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#C6F432] text-black font-display font-bold text-xs sm:text-sm rounded-full hover:bg-[#b4e029] transition-all active:scale-95 shadow-md"
                  >
                    <span>Experience Aero Kinetic</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6 h-72 sm:h-96 lg:h-full relative overflow-hidden">
                <img
                  src={HERO_ASSETS.campaign}
                  alt="Athlete sprinting with STRIDE engineering"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#111111] via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>
    </div>
  );
};
