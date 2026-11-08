import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, ShieldCheck, Tag, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart,
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

  const [coupon, setCoupon] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coupon.trim()) return;
    const res = applyPromoCode(coupon);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError(null);
      setCoupon('');
    }
  };

  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-neutral-200/80 dark:bg-neutral-800 flex items-center justify-center mx-auto mb-4 text-neutral-400">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="font-display text-2xl font-bold mb-2">Your Bag is Empty</h2>
        <p className="text-xs text-neutral-500 mb-6 max-w-sm mx-auto">
          Explore our latest drops in carbon-plated racing shoes and luxury minimalist lifestyle models.
        </p>
        <Link
          to="/shop"
          className="px-6 py-3 bg-[#111111] dark:bg-[#C6F432] text-white dark:text-black font-display font-bold text-xs rounded-full inline-flex items-center gap-2"
        >
          <span>Explore Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="pb-6 mb-8 border-b border-black/10 dark:border-white/10">
        <h1 className="font-display text-3xl font-black text-neutral-900 dark:text-white">
          Shopping Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
        </h1>
      </div>

      {/* Free shipping banner */}
      <div className="mb-8 p-4 bg-white dark:bg-[#18181A] rounded-2xl border border-black/5 dark:border-white/5">
        <div className="flex justify-between items-center text-xs font-semibold mb-2">
          {amountForFreeShipping > 0 ? (
            <span>
              Add <strong className="text-black dark:text-white tabular-nums">${amountForFreeShipping.toFixed(2)}</strong> more for Free Express Shipping
            </span>
          ) : (
            <span className="text-emerald-700 dark:text-emerald-400">
              ✓ Free Express Delivery Unlocked!
            </span>
          )}
          <span className="tabular-nums text-neutral-500">{freeShippingProgress}%</span>
        </div>
        <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#111111] dark:bg-[#C6F432] transition-all duration-300 rounded-full"
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Item table */}
        <div className="lg:col-span-8 bg-white dark:bg-[#18181A] rounded-3xl border border-black/5 dark:border-white/5 p-6 divide-y divide-black/5 dark:divide-white/5">
          {cart.map((item) => (
            <div key={item.id} className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-4 items-center">
              <div className="w-24 h-24 rounded-2xl bg-neutral-100 dark:bg-neutral-900 p-2 flex items-center justify-center shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
              </div>

              <div className="flex-1 min-w-0 text-center sm:text-left">
                <h3 className="font-display text-base font-bold text-neutral-900 dark:text-white truncate">
                  {item.name}
                </h3>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  Size: US {item.selectedSize} · Color: {item.selectedColor?.name || 'Standard'}
                </div>
                <div className="text-xs font-bold tabular-nums text-neutral-900 dark:text-white mt-1">
                  ${item.price.toFixed(2)} each
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center border border-neutral-300 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-800 text-xs">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, -1)}
                    className="px-3 py-1.5 text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                  >
                    -
                  </button>
                  <span className="px-3 font-semibold tabular-nums text-neutral-800 dark:text-neutral-200">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, 1)}
                    className="px-3 py-1.5 text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                  >
                    +
                  </button>
                </div>

                <span className="font-display font-bold text-sm tabular-nums text-neutral-900 dark:text-white w-20 text-right">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>

                <button
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                  className="text-neutral-400 hover:text-red-500 transition-colors p-1.5"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary side */}
        <div className="lg:col-span-4 bg-white dark:bg-[#18181A] rounded-3xl border border-black/5 dark:border-white/5 p-6 sm:p-8 space-y-6">
          <h3 className="font-display text-lg font-bold pb-3 border-b border-black/5 dark:border-white/5">
            Summary
          </h3>

          {/* Promo code */}
          <div>
            {promoCode ? (
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-xs">
                <div className="flex items-center gap-2">
                  <Tag className="w-3.5 h-3.5 text-[#86b300] dark:text-[#C6F432]" />
                  <span className="font-bold">{promoCode} ({discountPercentage}% OFF)</span>
                </div>
                <button
                  type="button"
                  onClick={removePromoCode}
                  className="text-neutral-400 hover:text-red-500 text-xs"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApply} className="flex gap-2">
                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => {
                    setCoupon(e.target.value);
                    if (couponError) setCouponError(null);
                  }}
                  placeholder="Code (STRIDE10)"
                  className="flex-1 px-3 py-2 text-xs rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-transparent focus:border-black dark:focus:border-white outline-hidden uppercase"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-xl text-xs font-bold"
                >
                  Apply
                </button>
              </form>
            )}
            {couponError && <p className="text-[11px] text-red-500 mt-1">{couponError}</p>}
          </div>

          <div className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="tabular-nums font-semibold text-neutral-900 dark:text-white">${subtotal.toFixed(2)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-semibold">
                <span>Discount</span>
                <span className="tabular-nums">-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Estimated Shipping</span>
              <span className="tabular-nums">{shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Tax (7%)</span>
              <span className="tabular-nums">${taxAmount.toFixed(2)}</span>
            </div>
            <div className="pt-3 border-t border-black/5 dark:border-white/5 flex justify-between text-base font-bold text-neutral-900 dark:text-white">
              <span>Total</span>
              <span className="tabular-nums font-display text-lg">${finalTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate('/checkout')}
            className="w-full py-4 bg-[#111111] dark:bg-[#C6F432] text-white dark:text-black font-display font-bold text-sm rounded-2xl hover:opacity-90 active:scale-98 transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex items-center justify-center gap-2 text-xs text-neutral-500">
            <ShieldCheck className="w-4 h-4 text-neutral-400" />
            <span>30-Day Risk-Free Road Test</span>
          </div>
        </div>
      </div>
    </div>
  );
};
