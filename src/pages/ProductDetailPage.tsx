import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  Check,
  ChevronDown,
  ChevronUp,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Share2,
  ZoomIn,
  Edit3
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ProductColor, ReviewItem } from '../types';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, addToCart, isInWishlist, toggleWishlist, setIsSizeGuideOpen, showToast } = useCart();

  const product = products.find((p) => p.id === id) || products[0];

  const defaultColor: ProductColor = product?.colors?.[0] || { name: 'Standard', hex: '#111111' };
  const defaultSize: number = product?.sizes?.[2] || product?.sizes?.[0] || 9;

  const [selectedColor, setSelectedColor] = useState<ProductColor>(defaultColor);
  const [selectedSize, setSelectedSize] = useState<number>(defaultSize);
  const [sizeUnit, setSizeUnit] = useState<'US' | 'UK' | 'EU'>('US');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isAddedAnimating, setIsAddedAnimating] = useState(false);
  const [isFlyingItem, setIsFlyingItem] = useState(false);

  // Sync selectedColor/selectedSize if product changes
  useEffect(() => {
    if (product) {
      if (product.colors?.[0]) setSelectedColor(product.colors[0]);
      if (product.sizes?.[0]) setSelectedSize(product.sizes[2] || product.sizes[0]);
      setActiveImageIndex(0);
    }
  }, [product?.id]);

  // Accordion state
  const [openAccordion, setOpenAccordion] = useState<string | null>('specs');

  // Customer reviews state with mock submission
  const [reviews, setReviews] = useState<ReviewItem[]>([
    {
      id: 'r1',
      author: 'Julian Thorne',
      rating: 5,
      date: '2 weeks ago',
      verified: true,
      title: 'Most responsive carbon shoe on the market',
      comment: 'Put 60 miles on these so far during my marathon block. The turnover is effortless, and my calves feel substantially less beat up after 18-milers. True to size fit.',
      shoeSize: 'US 10.0'
    },
    {
      id: 'r2',
      author: 'Sophia Chen',
      rating: 5,
      date: '1 month ago',
      verified: true,
      title: 'Architectural masterpiece & ultra comfortable',
      comment: 'The materials are second to none. Minimalist branding with insane attention to seam finishing and insole contouring. Worth every penny.',
      shoeSize: 'US 8.5'
    },
    {
      id: 'r3',
      author: 'David K.',
      rating: 4,
      date: '2 months ago',
      verified: true,
      title: 'Fantastic lockdown, lightweight build',
      comment: 'A feather on the foot. Midfoot lockdown is super snug. If you have high arches, give yourself a 5-mile break-in period.',
      shoeSize: 'US 11.0'
    }
  ]);

  // Review Form state
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Reset when product changes
  useEffect(() => {
    setSelectedColor(product.colors[0]);
    setSelectedSize(product.sizes[2] || product.sizes[0]);
    setActiveImageIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id, product]);

  const isFavorited = isInWishlist(product.id);

  // Images list: selected color image first if available
  const images = [
    selectedColor.image || product.images[0],
    ...product.images.slice(1)
  ];

  const handleAddToCart = () => {
    setIsAddedAnimating(true);
    setIsFlyingItem(true);
    addToCart(product, selectedSize, selectedColor, quantity);
    setTimeout(() => {
      setIsAddedAnimating(false);
    }, 1200);
    setTimeout(() => {
      setIsFlyingItem(false);
    }, 750);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!');
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor,
      rating: newReviewRating,
      date: 'Just now',
      verified: true,
      title: newReviewTitle || 'Verified Athlete Review',
      comment: newReviewComment,
      shoeSize: `US ${selectedSize}`
    };

    setReviews([newRev, ...reviews]);
    setNewReviewAuthor('');
    setNewReviewTitle('');
    setNewReviewComment('');
    setShowReviewForm(false);
    showToast('Thank you! Your review has been published.');
  };

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  // Size conversion helper
  const getDisplaySize = (usSize: number) => {
    if (sizeUnit === 'UK') return (usSize - 1).toFixed(1).replace('.0', '');
    if (sizeUnit === 'EU') return (usSize + 33).toFixed(1).replace('.0', '');
    return usSize;
  };

  const relatedProducts = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb unboxed */}
      <div className="flex items-center justify-between mb-8">
        <nav className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
          <Link to="/" className="hover:text-black dark:hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link to={`/shop?category=${product.category}`} className="hover:text-black dark:hover:text-white transition-colors">{product.category}</Link>
          <span>/</span>
          <span className="text-neutral-900 dark:text-neutral-100 font-semibold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Quick Edit shortcut to admin portal */}
        <Link
          to={`/admin?edit=${product.id}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:border-black dark:hover:border-white transition-colors shadow-xs"
        >
          <Edit3 className="w-3.5 h-3.5 text-[#86b300] dark:text-[#C6F432]" />
          <span>Edit in Studio</span>
        </Link>
      </div>

      {/* Main PDP Grid: Gallery Left + Contiguous Purchase Module Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Gallery Section */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Visual Frame with Zoom */}
          <div
            className="relative aspect-[4/3] sm:aspect-square w-full rounded-3xl bg-white dark:bg-[#1A1A1E] border border-black/5 dark:border-white/5 p-6 flex items-center justify-center overflow-hidden group cursor-crosshair shadow-xs"
            onClick={() => setIsZoomed(!isZoomed)}
          >
            <motion.img
              key={activeImageIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: isZoomed ? 1.5 : 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              src={images[activeImageIndex] || images[0]}
              alt={product.name}
              className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute bottom-4 right-4 bg-white/80 dark:bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="w-3.5 h-3.5" />
              <span>{isZoomed ? 'Click to reset' : 'Click to zoom'}</span>
            </div>

            {product.originalPrice && (
              <div className="absolute top-4 left-4 bg-[#C6F432] text-black text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                Sale: ${(product.originalPrice - product.price)} Off
              </div>
            )}
          </div>

          {/* Thumbnail Strip */}
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setActiveImageIndex(idx);
                  setIsZoomed(false);
                }}
                className={`aspect-square rounded-2xl border p-2 bg-white dark:bg-[#1A1A1E] transition-all overflow-hidden ${
                  activeImageIndex === idx
                    ? 'border-neutral-900 dark:border-white ring-2 ring-neutral-900 dark:ring-white scale-102'
                    : 'border-black/5 dark:border-white/10 opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name} angle ${idx + 1}`}
                  className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                />
              </button>
            ))}
          </div>

          {/* Environmental commitment quote */}
          <div className="p-5 rounded-2xl bg-neutral-100/80 dark:bg-neutral-800/60 border border-black/5 dark:border-white/5 flex items-center gap-3 text-xs text-neutral-600 dark:text-neutral-300">
            <Sparkles className="w-5 h-5 text-[#7ea600] dark:text-[#C6F432] shrink-0" />
            <p>
              Crafted with zero-waste circular knitting and 40% bio-based foam derived from sustainably harvested algae.
            </p>
          </div>
        </div>

        {/* Purchase Module Right (Contiguous per frontend design guidelines) */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6 bg-white dark:bg-[#18181A] p-6 sm:p-8 rounded-3xl border border-black/5 dark:border-white/5 shadow-sm">
          {/* Header & Title */}
          <div>
            <div className="flex items-center justify-between text-xs text-neutral-500 uppercase tracking-wider mb-2 font-medium">
              <span>{product.category} · {product.gender}&apos;s Model</span>
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
            </div>

            <h1 className="font-display text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
              {product.name}
            </h1>

            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-medium italic">
              {product.tagline}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500" />
                ))}
              </div>
              <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200 tabular-nums">
                {product.rating}
              </span>
              <span className="text-xs text-neutral-400">({product.reviewCount} runner reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-4">
              <span className="font-display text-3xl font-black text-neutral-900 dark:text-white tabular-nums">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-base text-neutral-400 line-through tabular-nums">
                  ${product.originalPrice}
                </span>
              )}
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                In Stock & Ready to Ship
              </span>
            </div>
          </div>

          <div className="h-px bg-black/5 dark:bg-white/5" />

          {/* Colorway Selection */}
          <div>
            <div className="flex justify-between items-center text-xs mb-2.5">
              <span className="font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider text-[11px]">
                Colorway
              </span>
              <span className="text-neutral-500 font-medium">{selectedColor.name}</span>
            </div>
            <div className="flex items-center gap-3">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => {
                    setSelectedColor(c);
                    setActiveImageIndex(0);
                  }}
                  className={`w-8 h-8 rounded-full border transition-all ${
                    selectedColor.name === c.name
                      ? 'ring-2 ring-offset-2 ring-black dark:ring-white dark:ring-offset-black scale-110'
                      : 'border-black/20 dark:border-white/20 hover:scale-105'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                  aria-label={c.name}
                />
              ))}
            </div>
          </div>

          {/* Size Selection with US / UK / EU toggle */}
          <div>
            <div className="flex justify-between items-center text-xs mb-2.5">
              <div className="flex items-center gap-3">
                <span className="font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider text-[11px]">
                  Select Size ({sizeUnit})
                </span>
                {/* Unit switcher */}
                <div className="flex gap-1 bg-neutral-100 dark:bg-neutral-800 p-0.5 rounded">
                  {(['US', 'UK', 'EU'] as const).map((unit) => (
                    <button
                      key={unit}
                      type="button"
                      onClick={() => setSizeUnit(unit)}
                      className={`px-1.5 py-0.5 text-[10px] font-bold rounded ${
                        sizeUnit === unit
                          ? 'bg-black text-white dark:bg-white dark:text-black'
                          : 'text-neutral-500'
                      }`}
                    >
                      {unit}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-neutral-500 hover:text-black dark:hover:text-white underline text-[11px]"
              >
                Size Guide
              </button>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSelectedSize(s)}
                  className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                    selectedSize === s
                      ? 'bg-neutral-900 text-white dark:bg-[#C6F432] dark:text-black border-transparent shadow-xs scale-102'
                      : 'bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border-neutral-200 dark:border-neutral-700 hover:border-black dark:hover:border-white'
                  }`}
                >
                  {getDisplaySize(s)}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 text-[11px]">
              Quantity
            </span>
            <div className="flex items-center border border-neutral-300 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-800 text-xs">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white"
              >
                -
              </button>
              <span className="px-3 font-bold tabular-nums text-neutral-900 dark:text-neutral-100">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white"
              >
                +
              </button>
            </div>
          </div>

          {/* Actions: Add to Bag + Buy Now + Wishlist */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 py-4 px-6 bg-[#111111] dark:bg-[#C6F432] text-white dark:text-black font-display font-bold text-sm sm:text-base rounded-2xl hover:opacity-90 active:scale-98 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                {isAddedAnimating ? (
                  <>
                    <Check className="w-5 h-5 text-[#C6F432] dark:text-black" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <span>Add to Bag · ${(product.price * quantity).toFixed(2)}</span>
                )}
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                aria-label="Wishlist"
                className="p-4 rounded-2xl border border-neutral-300 dark:border-neutral-700 hover:border-black dark:hover:border-white transition-colors flex items-center justify-center"
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
            </div>

            <button
              type="button"
              onClick={handleBuyNow}
              className="w-full py-3.5 px-6 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 font-display font-bold text-xs sm:text-sm rounded-2xl transition-all active:scale-98"
            >
              Instant Checkout
            </button>
          </div>

          {/* Delivery & Warranty perks */}
          <div className="pt-4 border-t border-black/5 dark:border-white/5 space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-neutral-400" />
              <span>Free Express Delivery (estimated 2-3 business days)</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-neutral-400" />
              <span>30-Day Risk-Free Road Test guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-neutral-400" />
              <span>Full 2-Year Craftsmanship warranty included</span>
            </div>
          </div>
        </div>
      </div>

      {/* Accordions: Specs, Materials, Shipping & Care */}
      <div className="mt-16 max-w-3xl border-t border-black/10 dark:border-white/10 divide-y divide-black/10 dark:divide-white/10">
        {/* Specs Accordion */}
        <div className="py-5">
          <button
            onClick={() => toggleAccordion('specs')}
            className="w-full flex items-center justify-between font-display text-base font-bold text-left text-neutral-900 dark:text-white"
          >
            <span>Technical Specifications & Biomechanics</span>
            {openAccordion === 'specs' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          {openAccordion === 'specs' && (
            <div className="pt-4 text-xs space-y-4 text-neutral-600 dark:text-neutral-300">
              <p>{product.description}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-neutral-100 dark:bg-neutral-800">
                <div>
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block">Weight</span>
                  <span className="font-semibold text-neutral-900 dark:text-white tabular-nums">{product.specs.weight}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block">Heel-to-Toe Drop</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">{product.specs.drop}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block">Cushioning</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">{product.specs.cushioning}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block">Optimal Terrain</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">{product.specs.terrain}</span>
                </div>
              </div>
              <ul className="list-disc pl-5 space-y-1">
                {product.features.map((feat, idx) => (
                  <li key={idx}>{feat}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Materials & Circularity */}
        <div className="py-5">
          <button
            onClick={() => toggleAccordion('materials')}
            className="w-full flex items-center justify-between font-display text-base font-bold text-left text-neutral-900 dark:text-white"
          >
            <span>Materials & Circular Sustainability</span>
            {openAccordion === 'materials' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          {openAccordion === 'materials' && (
            <div className="pt-4 text-xs space-y-2 text-neutral-600 dark:text-neutral-300">
              <p>
                Every STRIDE sneaker represents our commitment to circular engineering:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Upper: 100% Recycled polyester yarns sourced from verified post-consumer plastic.</li>
                <li>Midsole: BLOOM™ algae bio-foam reducing petrochemical reliance by 42%.</li>
                <li>Outsole: 30% recycled vulcanized natural gum rubber.</li>
                <li>Packaging: 100% FSC-certified post-consumer unbleached kraft card, no single-use plastic tape.</li>
              </ul>
            </div>
          )}
        </div>

        {/* Shipping & Returns */}
        <div className="py-5">
          <button
            onClick={() => toggleAccordion('shipping')}
            className="w-full flex items-center justify-between font-display text-base font-bold text-left text-neutral-900 dark:text-white"
          >
            <span>Free Shipping & 30-Day Road Trial</span>
            {openAccordion === 'shipping' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          {openAccordion === 'shipping' && (
            <div className="pt-4 text-xs space-y-2 text-neutral-600 dark:text-neutral-300">
              <p>
                Take them for a run outside on pavement, trails, or the track. If they don&apos;t elevate your movement within 30 days, we provide a prepaid digital return label for a 100% refund.
              </p>
              <p>
                Orders placed before 2:00 PM EST ship the same business day from our automated fulfillment hub.
              </p>
            </div>
          )}
        </div>

        {/* Shoe Care Instructions */}
        <div className="py-5">
          <button
            onClick={() => toggleAccordion('care')}
            className="w-full flex items-center justify-between font-display text-base font-bold text-left text-neutral-900 dark:text-white"
          >
            <span>Shoe Care & Longevity</span>
            {openAccordion === 'care' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          {openAccordion === 'care' && (
            <div className="pt-4 text-xs space-y-2 text-neutral-600 dark:text-neutral-300">
              <p>
                To maximize the life of your kinetic foam:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Spot-clean with cold water and mild eco-detergent using a soft-bristled brush.</li>
                <li>Never machine wash or tumble dry; allow to air dry in an indirect, ventilated space.</li>
                <li>Remove insoles after wet or heavy sweat workouts to allow the strobel board to dry completely.</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Customer Reviews Section */}
      <section className="mt-16 pt-12 border-t border-black/10 dark:border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h3 className="font-display text-2xl font-black text-neutral-900 dark:text-white">
              Customer Reviews ({reviews.length})
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500" />
                ))}
              </div>
              <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                {product.rating} out of 5 stars
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="px-5 py-2.5 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-xs font-bold text-neutral-800 dark:text-neutral-200 hover:border-black dark:hover:border-white transition-colors"
          >
            {showReviewForm ? 'Cancel Review' : 'Write a Review'}
          </button>
        </div>

        {/* Review Form Drawer */}
        {showReviewForm && (
          <form onSubmit={handleReviewSubmit} className="mb-10 p-6 rounded-2xl bg-white dark:bg-[#18181A] border border-black/10 dark:border-white/10 max-w-xl space-y-4 animate-in fade-in duration-200">
            <h4 className="font-display text-sm font-bold">Write Your Athlete Review</h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent outline-hidden"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider block mb-1">Rating</label>
                <select
                  value={newReviewRating}
                  onChange={(e) => setNewReviewRating(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent outline-hidden dark:bg-neutral-800"
                >
                  <option value={5}>5 Stars - Exceptional</option>
                  <option value={4}>4 Stars - Great</option>
                  <option value={3}>3 Stars - Average</option>
                  <option value={2}>2 Stars - Below expectations</option>
                  <option value={1}>1 Star - Poor</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider block mb-1">Headline</label>
              <input
                type="text"
                value={newReviewTitle}
                onChange={(e) => setNewReviewTitle(e.target.value)}
                placeholder="Summary of your experience"
                className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent outline-hidden"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider block mb-1">Detailed Review</label>
              <textarea
                required
                rows={3}
                value={newReviewComment}
                onChange={(e) => setNewReviewComment(e.target.value)}
                placeholder="How does it feel on the run? How is the fit, cushioning, and lockdown?"
                className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent outline-hidden"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-[#111111] dark:bg-[#C6F432] text-white dark:text-black font-display font-bold text-xs rounded-xl hover:opacity-90 transition-opacity"
            >
              Submit Review
            </button>
          </form>
        )}

        {/* Reviews List */}
        <div className="space-y-4 max-w-3xl">
          {reviews.map((rev) => (
            <div key={rev.id} className="p-5 rounded-2xl bg-white dark:bg-[#18181A] border border-black/5 dark:border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-display text-sm font-bold text-neutral-900 dark:text-white">
                    {rev.author}
                  </span>
                  {rev.verified && (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#86b300] dark:text-[#C6F432]">
                      Verified Buyer
                    </span>
                  )}
                </div>
                <span className="text-xs text-neutral-400">{rev.date}</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  {rev.title}
                </span>
              </div>

              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {rev.comment}
              </p>

              <div className="text-[11px] text-neutral-400 font-medium">
                Purchased Size: {rev.shoeSize}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* "You May Also Like" Section */}
      {relatedProducts.length > 0 && (
        <section className="mt-20 pt-12 border-t border-black/10 dark:border-white/10">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-display text-2xl font-black text-neutral-900 dark:text-white">
              You May Also Like
            </h3>
            <Link
              to="/shop"
              className="text-xs font-bold uppercase tracking-wider hover:text-[#C6F432] transition-colors"
            >
              Explore All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Product flies into the cart icon animation */}
      <AnimatePresence>
        {isFlyingItem && (
          <motion.div
            initial={{
              position: 'fixed',
              left: '50%',
              bottom: '25%',
              x: '-50%',
              scale: 1,
              opacity: 1,
              zIndex: 9999,
            }}
            animate={{
              left: 'calc(100% - 70px)',
              bottom: 'calc(100% - 60px)',
              scale: 0.15,
              opacity: 0.2,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="pointer-events-none w-28 h-28 rounded-2xl bg-white dark:bg-neutral-850 p-2 border-2 border-[#C6F432] shadow-2xl flex items-center justify-center"
          >
            <img
              src={images[0]}
              alt=""
              className="w-full h-full object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
