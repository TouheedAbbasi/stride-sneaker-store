import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProductCard } from '../components/ProductCard';
import { CategoryType, GenderType, TagType } from '../types';
import { useCart } from '../context/CartContext';

export const ShopPage: React.FC = () => {
  const { products } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter States initialized from URL params if present
  const [category, setCategory] = useState<CategoryType | 'All'>(
    (searchParams.get('category') as CategoryType) || 'All'
  );
  const [gender, setGender] = useState<GenderType | 'All'>(
    (searchParams.get('gender') as GenderType) || 'All'
  );
  const [selectedTag, setSelectedTag] = useState<TagType | 'All'>(
    (searchParams.get('tag') as TagType) || 'All'
  );
  const [selectedSize, setSelectedSize] = useState<number | null>(
    searchParams.get('size') ? Number(searchParams.get('size')) : null
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState<number>(260);
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync state if URL search query changes
  useEffect(() => {
    const cat = searchParams.get('category') as CategoryType;
    if (cat) setCategory(cat);
    const gen = searchParams.get('gender') as GenderType;
    if (gen) setGender(gen);
    const tag = searchParams.get('tag') as TagType;
    if (tag) setSelectedTag(tag);
  }, [searchParams]);

  const categories: (CategoryType | 'All')[] = ['All', 'Running', 'Lifestyle', 'Basketball', 'Recovery'];
  const genders: (GenderType | 'All')[] = ['All', 'Men', 'Women', 'Unisex'];
  const availableSizes = [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12];
  const colorOptions = [
    { label: 'Volt Lime', hex: '#C6F432' },
    { label: 'Onyx Black', hex: '#111111' },
    { label: 'Pure Chalk', hex: '#EBEBE8' },
    { label: 'Slate Grey', hex: '#8A8D8F' },
    { label: 'Earth Olive', hex: '#4A5043' },
  ];

  // Filtering & Sorting logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (category !== 'All' && p.category !== category) return false;

      // Gender filter
      if (gender !== 'All' && p.gender !== gender && p.gender !== 'Unisex') return false;

      // Tag filter
      if (selectedTag !== 'All' && !(Array.isArray(p.tags) && p.tags.includes(selectedTag))) return false;

      // Size filter
      if (selectedSize !== null && !(Array.isArray(p.sizes) && p.sizes.includes(selectedSize))) return false;

      // Color filter
      if (selectedColor !== null) {
        const hasColor = Array.isArray(p.colors) && p.colors.some((c) => c?.hex?.toLowerCase() === selectedColor.toLowerCase());
        if (!hasColor) return false;
      }

      // Max price
      if (p.price > maxPrice) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [products, category, gender, selectedTag, selectedSize, selectedColor, maxPrice, sortBy]);

  const resetFilters = () => {
    setCategory('All');
    setGender('All');
    setSelectedTag('All');
    setSelectedSize(null);
    setSelectedColor(null);
    setMaxPrice(260);
    setSortBy('featured');
    setSearchParams({});
  };

  const hasActiveFilters =
    category !== 'All' ||
    gender !== 'All' ||
    selectedTag !== 'All' ||
    selectedSize !== null ||
    selectedColor !== null ||
    maxPrice < 260;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 border-b border-black/10 dark:border-white/10 gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
            Catalog & Archives
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-neutral-900 dark:text-white mt-1">
            All Footwear
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Showing <strong className="text-neutral-900 dark:text-neutral-100 tabular-nums">{filteredProducts.length}</strong> styles
          </p>
        </div>

        {/* Controls: Sort & Mobile filter trigger */}
        <div className="flex items-center gap-3">
          {/* Mobile Filter toggle button */}
          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-xs font-bold text-neutral-800 dark:text-neutral-200"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-[#C6F432]" />
            )}
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-neutral-900 dark:text-neutral-100 font-semibold outline-hidden cursor-pointer"
            >
              <option value="featured" className="dark:bg-neutral-800">Featured</option>
              <option value="newest" className="dark:bg-neutral-800">Newest</option>
              <option value="price-asc" className="dark:bg-neutral-800">Price: Low to High</option>
              <option value="price-desc" className="dark:bg-neutral-800">Price: High to Low</option>
              <option value="rating" className="dark:bg-neutral-800">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 flex-wrap py-4 border-b border-black/5 dark:border-white/5">
          <span className="text-xs text-neutral-500 font-medium">Applied:</span>
          {category !== 'All' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-200/80 dark:bg-neutral-800 rounded-full text-xs font-semibold">
              {category}
              <button onClick={() => setCategory('All')}><X className="w-3 h-3" /></button>
            </span>
          )}
          {gender !== 'All' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-200/80 dark:bg-neutral-800 rounded-full text-xs font-semibold">
              {gender}
              <button onClick={() => setGender('All')}><X className="w-3 h-3" /></button>
            </span>
          )}
          {selectedTag !== 'All' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-200/80 dark:bg-neutral-800 rounded-full text-xs font-semibold uppercase">
              {selectedTag}
              <button onClick={() => setSelectedTag('All')}><X className="w-3 h-3" /></button>
            </span>
          )}
          {selectedSize !== null && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-200/80 dark:bg-neutral-800 rounded-full text-xs font-semibold">
              Size US {selectedSize}
              <button onClick={() => setSelectedSize(null)}><X className="w-3 h-3" /></button>
            </span>
          )}
          {selectedColor !== null && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-200/80 dark:bg-neutral-800 rounded-full text-xs font-semibold">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: selectedColor }} />
              Color
              <button onClick={() => setSelectedColor(null)}><X className="w-3 h-3" /></button>
            </span>
          )}
          {maxPrice < 260 && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-200/80 dark:bg-neutral-800 rounded-full text-xs font-semibold">
              Under ${maxPrice}
              <button onClick={() => setMaxPrice(260)}><X className="w-3 h-3" /></button>
            </span>
          )}
          <button
            onClick={resetFilters}
            className="text-xs font-semibold text-neutral-500 hover:text-red-500 dark:hover:text-red-400 underline ml-2"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Main Layout: Desktop Sidebar + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-8 pr-4 border-r border-black/5 dark:border-white/5">
          {/* Category */}
          <div>
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 mb-3">
              Discipline
            </h3>
            <div className="space-y-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`w-full text-left text-xs font-medium py-1.5 px-2.5 rounded-lg transition-colors flex items-center justify-between ${
                    category === cat
                      ? 'bg-neutral-900 text-white dark:bg-[#C6F432] dark:text-black font-bold'
                      : 'text-neutral-600 dark:text-neutral-400 hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <span>{cat}</span>
                  {category === cat && <span className="w-1.5 h-1.5 rounded-full bg-white dark:bg-black" />}
                </button>
              ))}
            </div>
          </div>

          {/* Gender */}
          <div>
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 mb-3">
              Gender
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {genders.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGender(g)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    gender === g
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-black border-transparent'
                      : 'border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-black dark:hover:border-white'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* US Size Selector */}
          <div>
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 mb-3">
              US Size
            </h3>
            <div className="grid grid-cols-4 gap-1.5">
              {availableSizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSelectedSize(selectedSize === s ? null : s)}
                  className={`py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                    selectedSize === s
                      ? 'bg-neutral-900 text-white dark:bg-[#C6F432] dark:text-black border-transparent'
                      : 'border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:border-black dark:hover:border-white'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Colorway Tone */}
          <div>
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 mb-3">
              Color Tone
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              {colorOptions.map((c) => (
                <button
                  key={c.label}
                  type="button"
                  onClick={() => setSelectedColor(selectedColor === c.hex ? null : c.hex)}
                  title={c.label}
                  className={`w-6 h-6 rounded-full border transition-all ${
                    selectedColor === c.hex
                      ? 'ring-2 ring-offset-2 ring-black dark:ring-white dark:ring-offset-black scale-110'
                      : 'border-black/20 dark:border-white/20 hover:scale-105'
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 mb-2">
              <span>Max Price</span>
              <span className="tabular-nums font-bold text-neutral-900 dark:text-white">${maxPrice}</span>
            </div>
            <input
              type="range"
              min="60"
              max="260"
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-black dark:accent-[#C6F432] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-neutral-400 mt-1">
              <span>$60</span>
              <span>$260</span>
            </div>
          </div>

          {/* Tags */}
          <div>
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 mb-3">
              Collections
            </h3>
            <div className="space-y-1 text-xs">
              {(['All', 'new', 'bestseller', 'sale'] as (TagType | 'All')[]).map((tag) => (
                <label key={tag} className="flex items-center gap-2 cursor-pointer py-1">
                  <input
                    type="radio"
                    name="tag-filter"
                    checked={selectedTag === tag}
                    onChange={() => setSelectedTag(tag)}
                    className="accent-black dark:accent-[#C6F432]"
                  />
                  <span className="capitalize text-neutral-700 dark:text-neutral-300">
                    {tag === 'All' ? 'All Releases' : tag === 'new' ? 'New Arrivals' : tag === 'bestseller' ? 'Best Sellers' : 'Sale Specials'}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid Area (2 columns mobile, 3 columns desktop) */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-[#18181A] rounded-3xl border border-black/5 dark:border-white/5">
              <SlidersHorizontal className="w-10 h-10 mx-auto text-neutral-400 mb-3" />
              <h3 className="font-display text-lg font-bold">No footwear matches your filters</h3>
              <p className="text-xs text-neutral-500 mt-1 mb-6">
                Try expanding your price range or clearing color and size constraints.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="px-6 py-2.5 rounded-full bg-[#111111] dark:bg-[#C6F432] text-white dark:text-black text-xs font-bold hover:opacity-90 transition-opacity"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((p, idx) => (
                  <motion.div
                    layout
                    key={p.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.35,
                      delay: Math.min(idx * 0.04, 0.25),
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <ProductCard product={p} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative w-full max-w-xs bg-[#F7F7F5] dark:bg-[#18181A] h-full p-6 flex flex-col justify-between shadow-2xl z-10 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10 mb-6">
                <span className="font-display text-lg font-bold">Filters</span>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Discipline */}
              <div className="mb-6">
                <h4 className="font-display text-xs font-bold uppercase tracking-wider mb-2">Discipline</h4>
                <div className="flex flex-wrap gap-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                        category === cat
                          ? 'bg-neutral-900 text-white dark:bg-[#C6F432] dark:text-black border-transparent'
                          : 'border-neutral-300 dark:border-neutral-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gender */}
              <div className="mb-6">
                <h4 className="font-display text-xs font-bold uppercase tracking-wider mb-2">Gender</h4>
                <div className="flex flex-wrap gap-1.5">
                  {genders.map((g) => (
                    <button
                      key={g}
                      onClick={() => setGender(g)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                        gender === g
                          ? 'bg-neutral-900 text-white dark:bg-[#C6F432] dark:text-black border-transparent'
                          : 'border-neutral-300 dark:border-neutral-700'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span>Max Price:</span>
                  <span>${maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="260"
                  step="10"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-black/10 dark:border-white/10 space-y-2">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 bg-[#111111] dark:bg-[#C6F432] text-white dark:text-black font-display font-bold text-xs rounded-xl"
              >
                Apply Filters ({filteredProducts.length})
              </button>
              <button
                type="button"
                onClick={resetFilters}
                className="w-full py-2 text-xs font-semibold text-neutral-500 hover:text-black dark:hover:text-white"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
