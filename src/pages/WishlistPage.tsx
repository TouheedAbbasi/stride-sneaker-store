import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';

export const WishlistPage: React.FC = () => {
  const { wishlist, openCart, products } = useCart();

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 border-b border-black/10 dark:border-white/10 mb-8 gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
            Personal Collection
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-neutral-900 dark:text-white mt-1">
            Saved Footwear
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            {wishlistedProducts.length} {wishlistedProducts.length === 1 ? 'shoe saved' : 'shoes saved'}
          </p>
        </div>

        {wishlistedProducts.length > 0 && (
          <button
            type="button"
            onClick={openCart}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-black font-display font-bold text-xs"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Open Bag</span>
          </button>
        )}
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="p-16 text-center bg-white dark:bg-[#18181A] rounded-3xl border border-black/5 dark:border-white/5 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mx-auto mb-4 text-neutral-400">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="font-display text-xl font-bold mb-2 text-neutral-900 dark:text-white">
            Your wishlist is empty
          </h3>
          <p className="text-xs text-neutral-500 mb-6">
            Tap the heart icon on any shoe in the catalog to save it for quick access or future marathon drops.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#111111] dark:bg-[#C6F432] text-white dark:text-black font-display font-bold text-xs rounded-full hover:opacity-90 transition-opacity"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {wishlistedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};
