import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, CreditCard, ArrowLeft, Tag, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CheckoutFormData, PlacedOrder } from '../types';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart,
    clearCart,
    subtotal,
    discountAmount,
    shippingFee,
    taxAmount,
    finalTotal,
    promoCode,
    discountPercentage,
    applyPromoCode,
    removePromoCode
  } = useCart();

  const [formData, setFormData] = useState<CheckoutFormData>({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
    shippingMethod: 'standard',
    paymentMethod: 'card',
    cardNumber: '',
    cardExp: '',
    cardCvc: '',
    cardName: '',
  });

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [expressShipping, setExpressShipping] = useState(false);

  // If cart is empty, redirect to shop
  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h2 className="font-display text-2xl font-bold mb-2">Your Bag is Empty</h2>
        <p className="text-sm text-neutral-500 mb-6">
          Add some footwear to your cart before proceeding to checkout.
        </p>
        <Link
          to="/shop"
          className="px-6 py-3 bg-[#111111] dark:bg-[#C6F432] text-white dark:text-black font-display font-bold text-xs rounded-full"
        >
          Explore All Shoes
        </Link>
      </div>
    );
  }

  const shippingCost = expressShipping ? 15 : shippingFee;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost + taxAmount);

  const fillTestData = () => {
    setFormData({
      email: 'alex.runner@example.com',
      phone: '+1 (555) 234-5678',
      firstName: 'Alex',
      lastName: 'Morgan',
      address: '742 Evergreen Terrace',
      apartment: 'Apt 4B',
      city: 'Portland',
      state: 'OR',
      postalCode: '97201',
      country: 'United States',
      shippingMethod: expressShipping ? 'express' : 'standard',
      paymentMethod: 'card',
      cardNumber: '4242 •••• •••• 4242',
      cardExp: '12/28',
      cardCvc: '888',
      cardName: 'Alex Morgan',
    });
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyPromoCode(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError(null);
      setCouponInput('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment authorization
    setTimeout(() => {
      const orderId = `STR-${Math.floor(100000 + Math.random() * 900000)}`;
      const placedOrder: PlacedOrder = {
        orderId,
        items: [...cart],
        subtotal,
        discount: discountAmount,
        shipping: shippingCost,
        tax: taxAmount,
        total: grandTotal,
        shippingAddress: { ...formData },
        createdAt: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        estimatedDelivery: new Date(Date.now() + (expressShipping ? 2 : 4) * 86400000).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        })
      };

      try {
        localStorage.setItem(`stride_order_${orderId}`, JSON.stringify(placedOrder));
        localStorage.setItem('stride_last_order', orderId);
      } catch {
        // ignore
      }

      clearCart();
      setIsProcessing(false);
      navigate(`/order-success/${orderId}`);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex items-center justify-between pb-6 mb-8 border-b border-black/10 dark:border-white/10">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </Link>
        <span className="font-display text-xl font-black">STRIDE CHECKOUT</span>
        <div className="flex items-center gap-1 text-xs text-neutral-500">
          <Lock className="w-3.5 h-3.5" />
          <span>256-Bit SSL Encrypted</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Form Left */}
        <div className="lg:col-span-7 space-y-8">
          {/* Quick Demo Autofill */}
          <div className="p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800/60 border border-black/5 dark:border-white/5 flex items-center justify-between">
            <div className="text-xs">
              <span className="font-bold text-neutral-900 dark:text-white">Testing Demo?</span>
              <p className="text-neutral-500 dark:text-neutral-400">Fill in sample shipping and card credentials with 1-click.</p>
            </div>
            <button
              type="button"
              onClick={fillTestData}
              className="px-3 py-1.5 bg-[#111111] dark:bg-[#C6F432] text-white dark:text-black text-xs font-bold rounded-lg hover:opacity-90 transition-opacity"
            >
              Autofill Form
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 1. Contact Information */}
            <div className="bg-white dark:bg-[#18181A] p-6 sm:p-8 rounded-3xl border border-black/5 dark:border-white/5 shadow-xs space-y-4">
              <h3 className="font-display text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <span>1. Contact Details</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="runner@example.com"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent outline-hidden focus:border-black dark:focus:border-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider block mb-1">Mobile Phone (Delivery SMS)</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent outline-hidden focus:border-black dark:focus:border-white"
                  />
                </div>
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div className="bg-white dark:bg-[#18181A] p-6 sm:p-8 rounded-3xl border border-black/5 dark:border-white/5 shadow-xs space-y-4">
              <h3 className="font-display text-base font-bold text-neutral-900 dark:text-white">
                2. Shipping Destination
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider block mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="Alex"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent outline-hidden"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider block mb-1">Last Name</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Morgan"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider block mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Street address or P.O. Box"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent outline-hidden"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider block mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Portland"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent outline-hidden"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider block mb-1">State / Region</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    placeholder="OR"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent outline-hidden"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider block mb-1">Postal Code</label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    placeholder="97201"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent outline-hidden"
                  />
                </div>
              </div>
            </div>

            {/* 3. Delivery Method */}
            <div className="bg-white dark:bg-[#18181A] p-6 sm:p-8 rounded-3xl border border-black/5 dark:border-white/5 shadow-xs space-y-4">
              <h3 className="font-display text-base font-bold text-neutral-900 dark:text-white">
                3. Shipping Speed
              </h3>

              <div className="space-y-3">
                <label
                  onClick={() => setExpressShipping(false)}
                  className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                    !expressShipping
                      ? 'border-neutral-900 dark:border-[#C6F432] bg-neutral-50 dark:bg-neutral-800/80 ring-1 ring-neutral-900 dark:ring-[#C6F432]'
                      : 'border-neutral-200 dark:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping_speed"
                      checked={!expressShipping}
                      onChange={() => setExpressShipping(false)}
                      className="accent-black dark:accent-[#C6F432]"
                    />
                    <div>
                      <div className="font-bold text-xs">Standard Road Delivery (3-5 Business Days)</div>
                      <div className="text-[11px] text-neutral-500">Free on orders over $100</div>
                    </div>
                  </div>
                  <span className="font-bold text-xs tabular-nums">
                    {shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}
                  </span>
                </label>

                <label
                  onClick={() => setExpressShipping(true)}
                  className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                    expressShipping
                      ? 'border-neutral-900 dark:border-[#C6F432] bg-neutral-50 dark:bg-neutral-800/80 ring-1 ring-neutral-900 dark:ring-[#C6F432]'
                      : 'border-neutral-200 dark:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping_speed"
                      checked={expressShipping}
                      onChange={() => setExpressShipping(true)}
                      className="accent-black dark:accent-[#C6F432]"
                    />
                    <div>
                      <div className="font-bold text-xs">Priority Air Courier (1-2 Business Days)</div>
                      <div className="text-[11px] text-neutral-500">Direct courier tracking with SMS dispatch</div>
                    </div>
                  </div>
                  <span className="font-bold text-xs tabular-nums">$15.00</span>
                </label>
              </div>
            </div>

            {/* 4. Payment */}
            <div className="bg-white dark:bg-[#18181A] p-6 sm:p-8 rounded-3xl border border-black/5 dark:border-white/5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-base font-bold text-neutral-900 dark:text-white">
                  4. Secure Payment
                </h3>
                <div className="flex items-center gap-2 text-neutral-400">
                  <CreditCard className="w-4 h-4" />
                  <span className="text-[11px] font-semibold">Test Mode Active</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider block mb-1">Card Number</label>
                  <input
                    type="text"
                    required
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    placeholder="4242 4242 4242 4242"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent outline-hidden font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider block mb-1">Expiry (MM/YY)</label>
                    <input
                      type="text"
                      required
                      value={formData.cardExp}
                      onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                      placeholder="12/28"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent outline-hidden font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider block mb-1">CVC Code</label>
                    <input
                      type="text"
                      required
                      value={formData.cardCvc}
                      onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                      placeholder="888"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent outline-hidden font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider block mb-1">Name on Card</label>
                  <input
                    type="text"
                    required
                    value={formData.cardName}
                    onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                    placeholder="Alex Morgan"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent outline-hidden"
                  />
                </div>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 px-6 bg-[#111111] dark:bg-[#C6F432] text-white dark:text-black font-display font-bold text-sm sm:text-base rounded-2xl hover:opacity-90 active:scale-98 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin" />
                  <span>Authorizing Order...</span>
                </div>
              ) : (
                <span>Complete Order · ${grandTotal.toFixed(2)}</span>
              )}
            </button>
          </form>
        </div>

        {/* Order Summary Right */}
        <div className="lg:col-span-5 bg-white dark:bg-[#18181A] p-6 sm:p-8 rounded-3xl border border-black/5 dark:border-white/5 shadow-xs space-y-6 lg:sticky lg:top-28">
          <h3 className="font-display text-lg font-bold text-neutral-900 dark:text-white pb-3 border-b border-black/5 dark:border-white/5">
            Order Summary ({cart.reduce((acc, i) => acc + i.quantity, 0)} Items)
          </h3>

          {/* Cart items preview list */}
          <div className="space-y-4 max-h-72 overflow-y-auto pr-1 divide-y divide-black/5 dark:divide-white/5">
            {cart.map((item) => (
              <div key={item.id} className="pt-3 first:pt-0 flex items-center gap-3">
                <div className="w-16 h-16 rounded-xl bg-neutral-100 dark:bg-neutral-900 p-1.5 flex items-center justify-center shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                </div>
                <div className="flex-1 min-w-0 text-xs">
                  <h4 className="font-display font-bold text-neutral-900 dark:text-white truncate">{item.name}</h4>
                  <div className="text-neutral-500 mt-0.5">
                    Size: US {item.selectedSize} · Qty: {item.quantity}
                  </div>
                  <div className="text-neutral-500 truncate">{item.selectedColor?.name || 'Standard'}</div>
                </div>
                <div className="font-bold text-xs tabular-nums text-neutral-900 dark:text-white">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* Promo code input */}
          <div className="pt-4 border-t border-black/5 dark:border-white/5">
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
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => {
                    setCouponInput(e.target.value);
                    if (couponError) setCouponError(null);
                  }}
                  placeholder="Promo Code (e.g. STRIDE10)"
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

          {/* Totals */}
          <div className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400 pt-4 border-t border-black/5 dark:border-white/5">
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
              <span>Shipping</span>
              <span className="tabular-nums">
                {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Sales Tax (7%)</span>
              <span className="tabular-nums">${taxAmount.toFixed(2)}</span>
            </div>
            <div className="pt-3 border-t border-black/10 dark:border-white/10 flex justify-between text-base font-bold text-neutral-900 dark:text-white">
              <span>Total</span>
              <span className="tabular-nums font-display text-lg">${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-100/70 dark:bg-neutral-800/40 text-[11px] text-neutral-500 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-neutral-800 dark:text-neutral-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#86b300] dark:text-[#C6F432]" />
              <span>30-Day Risk-Free Road Test</span>
            </div>
            <p>Every pair is protected by our zero-friction return warranty.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
