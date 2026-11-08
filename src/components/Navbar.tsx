import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Heart, Sun, Moon, Menu, X } from 'lucide-react';
import { motion, useScroll } from 'motion/react';
import { useCart } from '../context/CartContext';
import { usePrefersReducedMotion } from '../hooks/useMediaQuery';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { itemCount, wishlist, toggleCart, isDarkMode, toggleDarkMode, setIsSearchOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  // Scroll visibility management (hide on scroll down, show on scroll up)
  const { scrollY } = useScroll();
  const prefersReduced = usePrefersReducedMotion();
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let lastY = 0;

    const unsubscribe = scrollY.on('change', (current) => {
      // Toggle blur/background after passing 50px
      if (current > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide on scroll down past hero, show on scroll up
      if (!prefersReduced && current > 200) {
        if (current > lastY + 8) {
          setIsHidden(true); // scrolling down
        } else if (current < lastY - 8) {
          setIsHidden(false); // scrolling up
        }
      } else {
        setIsHidden(false);
      }

      lastY = current;
    });

    return () => unsubscribe();
  }, [scrollY, prefersReduced]);

  const navLinks = [
    { label: 'Shop All', path: '/shop' },
    { label: 'Men', path: '/shop?gender=Men' },
    { label: 'Women', path: '/shop?gender=Women' },
    { label: 'Running', path: '/shop?category=Running' },
    { label: 'Lifestyle', path: '/shop?category=Lifestyle' },
    { label: 'Sale', path: '/shop?tag=sale' },
  ];

  const isActive = (path: string) => {
    if (path === '/shop' && location.pathname === '/shop' && !location.search) return true;
    return location.pathname + location.search === path;
  };

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: isHidden ? '-100%' : '0%' }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-40 w-full transition-colors duration-300 ${
        isScrolled
          ? 'bg-[#F7F7F5]/90 dark:bg-[#111111]/90 backdrop-blur-md shadow-xs'
          : 'bg-[#F7F7F5]/95 dark:bg-[#111111]/95'
      }`}
    >
      {/* Slim Promotional Bar (dismissible, <= 40px) */}
      {!bannerDismissed && (
        <div className="bg-[#111111] dark:bg-[#1C1C1E] text-white text-[11px] sm:text-xs py-2 px-4 flex items-center justify-between border-b border-neutral-800">
          <div className="mx-auto flex items-center gap-2 tracking-wide font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6F432]"></span>
            <span>Free Express Shipping on orders over $100</span>
            <span className="hidden sm:inline text-neutral-400">·</span>
            <span className="hidden sm:inline text-neutral-300">Use code <strong className="text-[#C6F432]">STRIDE10</strong> for 10% off</span>
          </div>
          <button
            onClick={() => setBannerDismissed(true)}
            aria-label="Dismiss announcement"
            className="text-neutral-400 hover:text-white transition-colors p-0.5 ml-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Bar Contract (Zone 1: Brand | Zone 2: Nav | Zone 3: Actions) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.08]">
        {/* Zone 1: Single element brand wordmark */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="md:hidden p-2 -ml-2 text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open mobile menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <Link
            to="/"
            className="font-display text-2xl sm:text-3xl font-black tracking-tighter text-[#111111] dark:text-[#F7F7F5] transition-transform active:scale-95"
          >
            STRIDE
          </Link>
        </div>

        {/* Zone 2: 4-6 Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-sm font-semibold tracking-tight text-neutral-600 dark:text-neutral-300">
          {navLinks.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`relative py-1 whitespace-nowrap transition-colors hover:text-black dark:hover:text-white ${
                  active ? 'text-black dark:text-white font-bold' : ''
                }`}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="navbar-active-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#111111] dark:bg-[#C6F432] rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 Primary functional action buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search */}
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search shoes"
            className="p-2.5 rounded-full text-neutral-700 dark:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Wishlist Link */}
          <Link
            to="/wishlist"
            aria-label="View wishlist"
            className="relative p-2.5 rounded-full text-neutral-700 dark:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#111111] dark:bg-[#C6F432] text-white dark:text-black text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Dark Mode Toggle */}
          <button
            type="button"
            onClick={toggleDarkMode}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2.5 rounded-full text-neutral-700 dark:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-[#C6F432]" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Bag / Cart trigger */}
          <button
            type="button"
            onClick={toggleCart}
            aria-label={`Open shopping cart with ${itemCount} items`}
            className="relative flex items-center gap-2 pl-3 pr-4 py-2 bg-[#111111] dark:bg-[#C6F432] text-white dark:text-black rounded-full font-medium text-xs sm:text-sm hover:opacity-90 transition-opacity active:scale-95 shadow-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline font-semibold">Bag</span>
            <span className="w-5 h-5 rounded-full bg-white/20 dark:bg-black/15 flex items-center justify-center font-bold tabular-nums text-xs">
              {itemCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-black/60 backdrop-blur-sm flex justify-start">
          <div className="w-4/5 max-w-sm bg-[#F7F7F5] dark:bg-[#18181B] h-full p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-black/10 dark:border-white/10">
                <span className="font-display text-2xl font-black tracking-tight">STRIDE</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="py-6 flex flex-col gap-4">
                {navLinks.map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-display text-xl font-bold text-neutral-800 dark:text-neutral-100 hover:text-black dark:hover:text-[#C6F432] transition-colors py-1"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-4 border-t border-black/10 dark:border-white/10 flex flex-col gap-3 text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About STRIDE</Link>
                  <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Store & Help</Link>
                  <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)}>Saved Wishlist ({wishlist.length})</Link>
                  <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="text-[#84ad00] dark:text-[#C6F432] font-bold">Product Studio (Admin)</Link>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-black/10 dark:border-white/10 text-xs text-neutral-500">
              <p className="font-semibold text-neutral-900 dark:text-neutral-200 mb-1">STRIDE Athletics Lab</p>
              <p>Engineered for relentless kinetic momentum.</p>
            </div>
          </div>
        </div>
      )}
    </motion.header>
  );
};
