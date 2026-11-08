import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Heart, Check, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ProductColor } from '../types';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, isInWishlist, toggleWishlist, setIsSizeGuideOpen } = useCart();
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (quickViewProduct) {
      const defaultCol = quickViewProduct.colors?.[0] || { name: 'Standard', hex: '#111111' };
      const defaultSz = quickViewProduct.sizes?.[2] || quickViewProduct.sizes?.[0] || 9;
      setSelectedColor(defaultCol);
      setSelectedSize(defaultSz);
      setActiveImageIndex(0);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const activeColor: ProductColor = selectedColor || quickViewProduct.colors?.[0] || { name: 'Standard', hex: '#111111' };
  const isFavorited = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addToCart(quickViewProduct, selectedSize, activeColor, 1);
    setQuickViewProduct(null);
  };

  const images = quickViewProduct.images && quickViewProduct.images.length > 0
    ? [activeColor.image || quickViewProduct.images[0], ...quickViewProduct.images.slice(1)]
    : [activeColor.image || ''];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-[#F7F7F5] dark:bg-[#18181A] rounded-3xl shadow-2xl overflow-hidden z-10 border border-black/10 dark:border-white/10 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={() => setQuickViewProduct(null)}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Gallery View */}
          <div className="p-6 bg-white dark:bg-[#1E1E22] flex flex-col justify-between items-center border-b md:border-b-0 md:border-r border-black/5 dark:border-white/5">
            <div className="relative w-full aspect-square flex items-center justify-center p-4">
              <img
                src={images[activeImageIndex] || images[0]}
                alt={quickViewProduct.name}
                className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal transition-all duration-300"
              />
            </div>

            {/* Thumbnail dots */}
            <div className="flex gap-2 mt-4">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-12 h-12 rounded-lg border p-1 bg-neutral-100 dark:bg-neutral-800 transition-all ${
                    activeImageIndex === idx
                      ? 'border-black dark:border-white ring-1 ring-black dark:ring-white'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* Details & Selection */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-neutral-500 uppercase tracking-wider mb-1.5">
                <span>{quickViewProduct.category} · {quickViewProduct.gender}</span>
                <span className="text-amber-500 font-semibold">★ {quickViewProduct.rating} ({quickViewProduct.reviewCount})</span>
              </div>

              <h2 className="font-display text-2xl font-black text-neutral-900 dark:text-neutral-100 mb-1">
                {quickViewProduct.name}
              </h2>

              <p className="text-xs text-neutral-600 dark:text-neutral-300 mb-4 line-clamp-2">
                {quickViewProduct.description}
              </p>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 tabular-nums">
                  ${quickViewProduct.price}
                </span>
                {quickViewProduct.originalPrice && (
                  <span className="text-sm text-neutral-400 line-through tabular-nums">
                    ${quickViewProduct.originalPrice}
                  </span>
                )}
              </div>

              {/* Color swatches */}
              <div className="mb-5">
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">Colorway</span>
                  <span className="text-neutral-500">{activeColor.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {quickViewProduct.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => {
                        setSelectedColor(c);
                        setActiveImageIndex(0);
                      }}
                      className={`w-7 h-7 rounded-full border transition-all ${
                        activeColor.name === c.name
                          ? 'ring-2 ring-offset-2 ring-black dark:ring-white dark:ring-offset-black scale-110'
                          : 'border-black/20 dark:border-white/20 hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size selector */}
              <div className="mb-6">
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">US Sizing</span>
                  <button
                    type="button"
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-neutral-500 hover:text-black dark:hover:text-white underline text-[11px]"
                  >
                    Size Guide
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-2 max-h-32 overflow-y-auto pr-1">
                  {quickViewProduct.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                        selectedSize === s
                          ? 'bg-neutral-900 dark:bg-white text-white dark:text-black border-transparent shadow-xs'
                          : 'bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border-neutral-200 dark:border-neutral-700 hover:border-black dark:hover:border-white'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 border-t border-black/5 dark:border-white/5 flex gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 py-3 px-4 bg-[#111111] dark:bg-[#C6F432] text-white dark:text-black font-display font-bold text-xs sm:text-sm rounded-xl hover:opacity-90 active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <span>Add to Bag</span>
                <Check className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(quickViewProduct.id)}
                aria-label="Wishlist"
                className="p-3 rounded-xl border border-neutral-300 dark:border-neutral-700 hover:border-black dark:hover:border-white transition-colors"
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
              </button>

              <Link
                to={`/product/${quickViewProduct.id}`}
                onClick={() => setQuickViewProduct(null)}
                className="p-3 rounded-xl bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors flex items-center justify-center"
                title="View Full Product Page"
              >
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
