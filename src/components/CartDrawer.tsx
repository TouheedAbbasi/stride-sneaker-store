import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, ArrowRight, ShoppingBag, ShieldCheck, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    subtotal,
    discountAmount,
    shippingFee,
    taxAmount,
    finalTotal,
    amountForFreeShipping,
    freeShippingThreshold,
    promoCode,
    discountPercentage,
    applyPromoCode,
    removePromoCode
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [promoError, setPromoError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = applyPromoCode(inputCode);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoError(null);
      setInputCode('');
    }
  };

  const handleProceedCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Slide-in Panel */}
      <div className="relative w-full max-w-md bg-[#F7F7F5] dark:bg-[#18181A] text-neutral-900 dark:text-neutral-100 h-full flex flex-col shadow-2xl z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="px-6 py-5 border-b border-black/10 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
            <h2 className="font-display text-lg font-bold">Your Bag</h2>
            <span className="text-xs text-neutral-500 dark:text-neutral-400 tabular-nums">
              ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)
            </span>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free shipping meter */}
        <div className="px-6 py-3 bg-neutral-100/70 dark:bg-neutral-800/50 border-b border-black/5 dark:border-white/5">
          <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
            {amountForFreeShipping > 0 ? (
              <span>
                Add <strong className="text-black dark:text-white tabular-nums">${amountForFreeShipping.toFixed(2)}</strong> for Free Express Shipping
              </span>
            ) : (
              <span className="text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
                ✓ You unlocked Free Express Shipping!
              </span>
            )}
            <span className="tabular-nums text-neutral-500">{freeShippingProgress}%</span>
          </div>
          <div className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#111111] dark:bg-[#C6F432] transition-all duration-300 rounded-full"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-black/5 dark:divide-white/5">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-neutral-200/60 dark:bg-neutral-800/80 flex items-center justify-center text-neutral-400 mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-display text-lg font-bold mb-1">Your bag is empty</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xs mb-6">
                Discover high-performance running sneakers and luxury everyday footwear designed to move different.
              </p>
              <button
                type="button"
                onClick={() => {
                  closeCart();
                  navigate('/shop');
                }}
                className="px-6 py-2.5 rounded-full bg-[#111111] dark:bg-[#C6F432] text-white dark:text-black text-xs font-bold hover:opacity-90 transition-opacity"
              >
                Explore All Footwear
              </button>
            </div>
          ) : (
            cart.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.35,
                  delay: Math.min(idx * 0.05, 0.25),
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="py-4 flex gap-4 items-center"
              >
                {/* Product thumbnail */}
                <div className="w-20 h-20 rounded-xl bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 p-2 flex items-center justify-center shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>

                {/* Info & steppers */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="font-display text-sm font-bold text-neutral-900 dark:text-neutral-100 truncate pr-2">
                      {item.name}
                    </h4>
                    <span className="text-sm font-bold tabular-nums text-neutral-900 dark:text-neutral-100">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>

                  <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 flex items-center gap-1.5">
                    <span>US {item.selectedSize}</span>
                    <span>·</span>
                    <span className="truncate">{item.selectedColor?.name || 'Standard'}</span>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Stepper */}
                    <div className="flex items-center border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-xs">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        aria-label="Decrease quantity"
                        className="px-2.5 py-1 text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                      >
                        -
                      </button>
                      <span className="px-2 font-semibold tabular-nums text-neutral-800 dark:text-neutral-200">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        aria-label="Increase quantity"
                        className="px-2.5 py-1 text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                      >
                        +
                      </button>
                    </div>

                    {/* Delete button */}
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remove item"
                      className="text-neutral-400 hover:text-red-500 dark:hover:text-red-400 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Footer calculation & checkout */}
        {cart.length > 0 && (
          <div className="px-6 py-5 bg-white dark:bg-[#141416] border-t border-black/10 dark:border-white/10 space-y-4">
            {/* Promo code form */}
            <div>
              {promoCode ? (
                <div className="flex items-center justify-between bg-neutral-100 dark:bg-neutral-800 px-3 py-1.5 rounded-lg text-xs">
                  <div className="flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-[#86b300] dark:text-[#C6F432]" />
                    <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                      {promoCode} ({discountPercentage}% OFF)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={removePromoCode}
                    className="text-neutral-400 hover:text-red-500 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCode} className="flex gap-2">
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => {
                      setInputCode(e.target.value);
                      if (promoError) setPromoError(null);
                    }}
                    placeholder="Promo code (e.g. STRIDE10)"
                    className="flex-1 px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-xs border border-transparent focus:border-black dark:focus:border-[#C6F432] outline-hidden uppercase tracking-wider"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity"
                  >
                    Apply
                  </button>
                </form>
              )}
              {promoError && <p className="text-[11px] text-red-500 mt-1">{promoError}</p>}
            </div>

            {/* Price lines */}
            <div className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="tabular-nums font-semibold text-neutral-900 dark:text-neutral-100">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-medium">
                  <span>Discount ({promoCode})</span>
                  <span className="tabular-nums">-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="tabular-nums">
                  {shippingFee === 0 ? (
                    <strong className="text-emerald-700 dark:text-emerald-400 font-semibold uppercase text-[11px]">
                      FREE
                    </strong>
                  ) : (
                    `$${shippingFee.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax</span>
                <span className="tabular-nums">${taxAmount.toFixed(2)}</span>
              </div>
              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex justify-between text-sm font-bold text-neutral-900 dark:text-neutral-100">
                <span>Total</span>
                <span className="tabular-nums font-display text-base">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout action */}
            <button
              type="button"
              onClick={handleProceedCheckout}
              className="w-full py-3.5 px-4 bg-[#111111] dark:bg-[#C6F432] text-white dark:text-black rounded-xl font-display font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 active:scale-98 transition-all shadow-md"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-500 dark:text-neutral-400">
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
              <span>30-day risk-free road test & free returns</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
