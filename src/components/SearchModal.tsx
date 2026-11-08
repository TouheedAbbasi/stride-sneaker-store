import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, products } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearchTerm('');
      setResults([]);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }
    const q = searchTerm.toLowerCase();
    const filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.gender.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q)
    );
    setResults(filtered);
  }, [searchTerm, products]);

  if (!isSearchOpen) return null;

  const popularTags = ['Running', 'Lifestyle', 'Basketball', 'Recovery', 'Carbon-Plate', 'Waterproof'];

  const handleSelectProduct = (id: string) => {
    setIsSearchOpen(false);
    navigate(`/product/${id}`);
  };

  const handleSelectTag = (tag: string) => {
    setIsSearchOpen(false);
    navigate(`/shop?search=${encodeURIComponent(tag)}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="relative w-full max-w-2xl bg-[#F7F7F5] dark:bg-[#18181A] rounded-2xl shadow-2xl overflow-hidden z-10 border border-black/10 dark:border-white/10 animate-in fade-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-black/10 dark:border-white/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search footwear by model, running, lifestyle, carbon..."
            className="w-full bg-transparent text-base sm:text-lg text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 outline-hidden font-display"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-neutral-400 hover:text-black dark:hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs font-semibold px-2.5 py-1 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Live results or Quick tags */}
        <div className="p-5 max-h-96 overflow-y-auto">
          {searchTerm.trim() === '' ? (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">
                Trending Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleSelectTag(tag)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-neutral-200/60 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-8">
              <p className="font-display font-bold text-neutral-700 dark:text-neutral-300 text-base">
                No shoes found for &ldquo;{searchTerm}&rdquo;
              </p>
              <p className="text-xs text-neutral-400 mt-1">
                Try searching for &quot;Running&quot;, &quot;Aero&quot;, or &quot;Slide&quot;
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                Found {results.length} results
              </p>
              {results.map((p) => (
                <div
                  key={p.id}
                  onClick={() => handleSelectProduct(p.id)}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors group"
                >
                  <div className="w-14 h-14 rounded-lg bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 p-1 flex items-center justify-center shrink-0">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display text-sm font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-[#6a9000] dark:group-hover:text-[#C6F432] transition-colors truncate">
                      {p.name}
                    </h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                      {p.category} · {p.gender} · {p.tagline}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-bold text-sm tabular-nums text-neutral-900 dark:text-neutral-100">
                      ${p.price}
                    </span>
                    <ArrowRight className="w-4 h-4 ml-auto text-neutral-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
