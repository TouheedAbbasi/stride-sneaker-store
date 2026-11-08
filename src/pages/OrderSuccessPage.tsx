import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight, Truck, Calendar, MapPin } from 'lucide-react';
import { PlacedOrder } from '../types';

export const OrderSuccessPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<PlacedOrder | null>(null);

  useEffect(() => {
    if (orderId) {
      try {
        const stored = localStorage.getItem(`stride_order_${orderId}`);
        if (stored) {
          setOrder(JSON.parse(stored));
        }
      } catch {
        // ignore
      }
    }
  }, [orderId]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center">
      {/* Success Badge */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#C6F432]/20 text-[#84ad00] dark:text-[#C6F432] mx-auto flex items-center justify-center mb-6">
        <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12" />
      </div>

      <span className="text-xs font-bold uppercase tracking-widest text-[#84ad00] dark:text-[#C6F432]">
        Order Confirmed
      </span>

      <h1 className="font-display text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white mt-1 mb-2">
        Thank You for Moving Different.
      </h1>

      <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-md mx-auto mb-8">
        We received your order <strong className="text-neutral-900 dark:text-white">{orderId}</strong>. A digital tracking dispatch notification has been routed to your email.
      </p>

      {/* Order Details Card */}
      <div className="bg-white dark:bg-[#18181A] rounded-3xl border border-black/5 dark:border-white/5 p-6 sm:p-8 text-left shadow-xs space-y-6 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-black/5 dark:border-white/5 text-xs">
          <div>
            <span className="text-neutral-400 block font-medium">Order Number</span>
            <span className="font-mono font-bold text-neutral-900 dark:text-white text-sm">{orderId}</span>
          </div>
          <div>
            <span className="text-neutral-400 block font-medium">Estimated Arrival</span>
            <div className="flex items-center gap-1.5 font-bold text-neutral-900 dark:text-white text-sm mt-0.5">
              <Calendar className="w-3.5 h-3.5 text-neutral-500" />
              <span>{order?.estimatedDelivery || 'In 3-4 Business Days'}</span>
            </div>
          </div>
          <div>
            <span className="text-neutral-400 block font-medium">Payment Status</span>
            <span className="font-bold text-emerald-700 dark:text-emerald-400 text-sm">Authorized (Test Mode)</span>
          </div>
        </div>

        {/* Items List */}
        {order && (
          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
              Shipment Contents
            </h4>
            <div className="divide-y divide-black/5 dark:divide-white/5 space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="pt-3 first:pt-0 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl bg-neutral-100 dark:bg-neutral-900 p-1 flex items-center justify-center shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                    </div>
                    <div>
                      <h5 className="font-display font-bold text-neutral-900 dark:text-white">{item.name}</h5>
                      <span className="text-neutral-500">US {item.selectedSize} · {item.selectedColor.name} · Qty {item.quantity}</span>
                    </div>
                  </div>
                  <span className="font-bold tabular-nums text-neutral-900 dark:text-white">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Shipping address & totals summary */}
        {order && (
          <div className="pt-4 border-t border-black/5 dark:border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div>
              <span className="text-neutral-400 font-medium block mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>Shipping Address</span>
              </span>
              <p className="font-semibold text-neutral-800 dark:text-neutral-200">
                {order.shippingAddress.firstName} {order.shippingAddress.lastName}
              </p>
              <p className="text-neutral-500">{order.shippingAddress.address}</p>
              <p className="text-neutral-500">
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
              </p>
            </div>

            <div className="space-y-1.5 sm:text-right">
              <div className="text-neutral-500">
                Subtotal: <span className="font-semibold text-neutral-900 dark:text-white">${order.subtotal.toFixed(2)}</span>
              </div>
              {order.discount > 0 && (
                <div className="text-emerald-700 dark:text-emerald-400">
                  Discount: -${order.discount.toFixed(2)}
                </div>
              )}
              <div className="text-neutral-500">
                Shipping: <span className="font-semibold text-neutral-900 dark:text-white">{order.shipping === 0 ? 'FREE' : `$${order.shipping.toFixed(2)}`}</span>
              </div>
              <div className="text-sm font-bold text-neutral-900 dark:text-white pt-2 border-t border-black/5 dark:border-white/5">
                Total Paid: <span className="font-display">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          to="/shop"
          className="w-full sm:w-auto px-8 py-3.5 bg-[#111111] dark:bg-[#C6F432] text-white dark:text-black font-display font-bold text-xs sm:text-sm rounded-full hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          to="/"
          className="w-full sm:w-auto px-6 py-3.5 bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-display font-semibold text-xs sm:text-sm rounded-full hover:bg-neutral-300 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};
