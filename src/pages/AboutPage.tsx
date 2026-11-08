import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Shield, Sparkles, Wind } from 'lucide-react';
import { HERO_ASSETS } from '../data/products';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-[#EFEFEA] dark:bg-[#161618] border-b border-black/[0.06] dark:border-white/[0.08] py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#7ea600] dark:text-[#C6F432]">
            The STRIDE Manifesto
          </span>
          <h1 className="font-display text-4xl sm:text-6xl font-black text-neutral-900 dark:text-white tracking-tight leading-tight">
            We Refuse Standard Physics.
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            STRIDE was founded with a singular conviction: athletic footwear should deliver elite biomechanical propulsion without the toxic microplastics and billboard branding of legacy footwear conglomerates.
          </p>
        </div>
      </section>

      {/* Visual Narrative Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-3xl overflow-hidden bg-neutral-900 aspect-[4/3] relative">
            <img
              src={HERO_ASSETS.campaign}
              alt="STRIDE athlete in motion"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
              01. Biomechanical Origin
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white">
              Born on the Pacific Crest, Proven in Tokyo
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              In 2024, an industrial design team from Berlin partnered with Olympic marathon biomechanists to challenge the status quo. We engineered a proprietary supercritical gas foaming chamber that expands biodegradable polymers at molecular scale, yielding unmatched spring rate and joint dissipation.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                <CheckCircle2 className="w-4 h-4 text-[#84ad00] dark:text-[#C6F432]" />
                <span>38% greater propulsion over standard EVA foams</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                <CheckCircle2 className="w-4 h-4 text-[#84ad00] dark:text-[#C6F432]" />
                <span>Zero petroleum virgin micro-beads in sole composition</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                <CheckCircle2 className="w-4 h-4 text-[#84ad00] dark:text-[#C6F432]" />
                <span>Anatomically mapped rocker curve for effortless toe-off</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
            The Technology Lab
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white mt-1">
            Three Core Inventions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-white dark:bg-[#18181A] border border-black/5 dark:border-white/5 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-900 dark:text-neutral-100">
              <Wind className="w-6 h-6 text-[#84ad00] dark:text-[#C6F432]" />
            </div>
            <h3 className="font-display text-lg font-bold">KineticFoam™ 2.0</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Infused with nitrogen supercritical fluids to produce millions of micro-cells. Delivers supreme responsiveness and ultra-durable resilience across 500+ miles.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-[#18181A] border border-black/5 dark:border-white/5 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-900 dark:text-neutral-100">
              <Sparkles className="w-6 h-6 text-[#84ad00] dark:text-[#C6F432]" />
            </div>
            <h3 className="font-display text-lg font-bold">Woven Carbon Spine</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Spoon-contoured full-length carbon plates stabilize the foot while multiplying energy release, saving vital seconds per mile on competitive race days.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-[#18181A] border border-black/5 dark:border-white/5 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-900 dark:text-neutral-100">
              <Shield className="w-6 h-6 text-[#84ad00] dark:text-[#C6F432]" />
            </div>
            <h3 className="font-display text-lg font-bold">Circular Lifecycle</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              When your STRIDE shoes reach their mileage ceiling, mail them back in our prepaid box. We deconstruct them into track surfacing for inner-city youth athletic grounds.
            </p>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <div className="p-10 sm:p-14 bg-[#111111] text-white rounded-3xl space-y-6">
          <h2 className="font-display text-2xl sm:text-4xl font-black">
            Ready to experience the difference?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto">
            Order your first pair today with complimentary shipping and our 30-day risk-free road test.
          </p>
          <div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#C6F432] text-black font-display font-bold text-xs sm:text-sm rounded-full hover:bg-[#b4e029] transition-all"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
