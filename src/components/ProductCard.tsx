import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, Check } from 'lucide-react';
import { Product, ProductColor } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, isInWishlist, toggleWishlist, setQuickViewProduct } = useCart();
  const defaultColor: ProductColor = product?.colors?.[0] || { name: 'Standard', hex: '#111111' };
  const [selectedColor, setSelectedColor] = useState<ProductColor>(defaultColor);
  const [isHovered, setIsHovered] = useState(false);
  const [quickSizeOpen, setQuickSizeOpen] = useState(false);
  const [recentlyAddedSize, setRecentlyAddedSize] = useState<number | null>(null);

  const isFavorited = isInWishlist(product.id);

  // Active image: use selected color's image or secondary image on hover
  const mainImage = selectedColor?.image || product?.images?.[0] || '';
  const hoverImage = product?.images?.[1] || mainImage;
  const currentImage = isHovered && hoverImage ? hoverImage : mainImage;

  const handleQuickAdd = (size: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, size, selectedColor, 1);
    setRecentlyAddedSize(size);
    setTimeout(() => {
      setRecentlyAddedSize(null);
      setQuickSizeOpen(false);
    }, 1200);
  };

  const handleColorClick = (color: ProductColor, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedColor(color);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  return (
    <div
      data-cursor="view"
      className="group relative flex flex-col bg-white dark:bg-[#1A1A1C] rounded-2xl p-3 sm:p-4 border border-black/[0.04] dark:border-white/[0.06] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setQuickSizeOpen(false);
      }}
    >
      {/* Visual Canvas Container */}
      <div className="relative aspect-[4/3] w-full rounded-xl bg-[#F4F4F2] dark:bg-[#222226] overflow-hidden flex items-center justify-center">
        {/* Subtle Tag (at most 1 subtle tag per frontend design guideline) */}
        {product.originalPrice && product.originalPrice > product.price ? (
          <div className="absolute top-2.5 left-2.5 z-10 text-[11px] font-bold uppercase tracking-wider text-black bg-[#C6F432] px-2 py-0.5 rounded">
            Save ${(product.originalPrice - product.price)}
          </div>
        ) : product.isBestSeller ? (
          <div className="absolute top-2.5 left-2.5 z-10 text-[11px] font-semibold uppercase tracking-wider text-neutral-800 dark:text-neutral-200 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-2 py-0.5 rounded">
            Best Seller
          </div>
        ) : product.isNewArrival ? (
          <div className="absolute top-2.5 left-2.5 z-10 text-[11px] font-semibold uppercase tracking-wider text-neutral-800 dark:text-neutral-200 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-2 py-0.5 rounded">
            New Arrival
          </div>
        ) : null}

        {/* Action icons (Wishlist & Quick View) */}
        <div className="absolute top-2.5 right-2.5 z-10 flex flex-col gap-1.5">
          <button
            type="button"
            onClick={handleWishlistClick}
            aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
            className="w-8 h-8 rounded-full bg-white/90 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center text-neutral-700 dark:text-neutral-200 hover:text-red-500 dark:hover:text-red-400 transition-colors shadow-sm"
          >
            <Heart
              className={`w-4 h-4 transition-transform active:scale-125 ${
                isFavorited ? 'fill-red-500 text-red-500' : ''
              }`}
            />
          </button>

          <button
            type="button"
            onClick={handleQuickViewClick}
            aria-label="Quick preview"
            className="w-8 h-8 rounded-full bg-white/90 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center text-neutral-700 dark:text-neutral-200 hover:text-black dark:hover:text-white transition-opacity shadow-sm opacity-0 group-hover:opacity-100"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Product Image with smooth transition and fallback */}
        <Link
          to={`/product/${product.id}`}
          className="w-full h-full flex items-center justify-center p-3 relative"
        >
          <img
            src={currentImage}
            alt={product.name}
            referrerPolicy="no-referrer"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal transition-transform duration-500 ease-out group-hover:scale-105"
            onError={(e) => {
              // Resilient fallback container if external load fails
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement?.classList.add('bg-neutral-200', 'dark:bg-neutral-800');
            }}
          />
        </Link>

        {/* Slide-Up Quick Size Selector Overlay */}
        {quickSizeOpen && (
          <div className="absolute inset-x-0 bottom-0 z-20 bg-white/95 dark:bg-[#1E1E22]/95 backdrop-blur-md p-3 rounded-b-xl border-t border-black/5 dark:border-white/10 shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                Select US Size
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setQuickSizeOpen(false);
                }}
                className="text-[11px] text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              >
                Cancel
              </button>
            </div>
            <div className="grid grid-cols-4 gap-1.5 max-h-28 overflow-y-auto pr-1">
              {product.sizes.map((size) => {
                const isJustAdded = recentlyAddedSize === size;
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={(e) => handleQuickAdd(size, e)}
                    disabled={isJustAdded}
                    className={`py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                      isJustAdded
                        ? 'bg-[#C6F432] text-black border-[#C6F432]'
                        : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:border-black dark:hover:border-white active:scale-95'
                    }`}
                  >
                    {isJustAdded ? <Check className="w-3.5 h-3.5 mx-auto" /> : size}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Quick Add Button Bar (appears on card hover on desktop, or tap on mobile) */}
        {!quickSizeOpen && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setQuickSizeOpen(true);
            }}
            className="absolute bottom-2.5 left-2.5 right-2.5 py-2 px-3 bg-[#111111]/90 dark:bg-white/90 text-white dark:text-black rounded-xl text-xs font-bold tracking-tight opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-md backdrop-blur-sm hover:scale-[1.02] active:scale-95"
          >
            + Quick Add Size
          </button>
        )}
      </div>

      {/* Product Details Section */}
      <div className="mt-3 flex flex-col flex-1 justify-between">
        <div>
          {/* Unboxed Metadata (Zero-Pill discipline) */}
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>{product.gender}</span>
          </div>

          {/* Product Title */}
          <Link
            to={`/product/${product.id}`}
            className="font-display text-base font-bold text-neutral-900 dark:text-neutral-100 hover:text-neutral-600 dark:hover:text-[#C6F432] transition-colors line-clamp-1"
          >
            {product.name}
          </Link>

          {/* Color swatch dots */}
          <div className="flex items-center gap-1.5 mt-2">
            {product.colors.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={(e) => handleColorClick(c, e)}
                title={c.name}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColor.name === c.name
                    ? 'ring-2 ring-offset-2 ring-black dark:ring-white dark:ring-offset-black scale-110'
                    : 'border-black/20 dark:border-white/20 hover:scale-110'
                }`}
                style={{ backgroundColor: c.hex }}
                aria-label={`Color option: ${c.name}`}
              />
            ))}
            <span className="text-[11px] text-neutral-400 ml-1">
              {product.colors.length} {product.colors.length === 1 ? 'color' : 'colors'}
            </span>
          </div>
        </div>

        {/* Price & Rating Row */}
        <div className="mt-3 pt-2.5 border-t border-black/[0.05] dark:border-white/[0.06] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-neutral-900 dark:text-neutral-100 tabular-nums">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-neutral-400 line-through tabular-nums">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400">
            <span className="text-amber-500">★</span>
            <span className="font-semibold text-neutral-800 dark:text-neutral-200 tabular-nums">
              {product.rating}
            </span>
            <span className="text-[10px] text-neutral-400">({product.reviewCount})</span>
          </div>
        </div>
      </div>
    </div>
  );
};
