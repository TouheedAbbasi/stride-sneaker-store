import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const NotFoundPage: React.FC = () => {
  const suggested = PRODUCTS.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
      <div className="w-16 h-16 rounded-full bg-neutral-200/80 dark:bg-neutral-800 flex items-center justify-center mx-auto mb-6 text-neutral-500">
        <Compass className="w-8 h-8" />
      </div>

      <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
        404 Error
      </span>
      <h1 className="font-display text-4xl sm:text-5xl font-black text-neutral-900 dark:text-white mt-2 mb-4">
        Off The Designated Track.
      </h1>
      <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-md mx-auto mb-8">
        The route you requested could not be located. Let us guide you back to our performance archives.
      </p>

      <div className="flex justify-center gap-3 mb-16">
        <Link
          to="/"
          className="px-6 py-3 bg-[#111111] dark:bg-[#C6F432] text-white dark:text-black font-display font-bold text-xs rounded-full hover:opacity-90 transition-opacity"
        >
          Return Home
        </Link>
        <Link
          to="/shop"
          className="px-6 py-3 bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-display font-semibold text-xs rounded-full hover:bg-neutral-300 transition-colors inline-flex items-center gap-2"
        >
          <span>Explore Shoes</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="text-left pt-12 border-t border-black/5 dark:border-white/5">
        <h3 className="font-display text-lg font-bold mb-6">Trending Footwear</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {suggested.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
};
