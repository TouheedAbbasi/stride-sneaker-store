import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-[#111111] text-[#F7F7F5] border-t border-neutral-800 transition-colors">
      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-b border-neutral-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#C6F432]">
              The STRIDE Circuit
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-black mt-2 tracking-tight">
              Move first. Get 10% off your inaugural run.
            </h3>
            <p className="text-sm text-neutral-400 mt-2 max-w-lg">
              Join our engineering community for early drop notifications, athlete race reports, and exclusive lab prototypes.
            </p>
          </div>

          <div className="lg:col-span-5">
            {subscribed ? (
              <div className="p-4 bg-neutral-900 border border-[#C6F432]/30 rounded-2xl flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#C6F432] shrink-0" />
                <div className="text-xs">
                  <p className="font-bold text-white">Welcome to the Circuit.</p>
                  <p className="text-neutral-300">Use promo code <strong className="text-[#C6F432]">STRIDE10</strong> at checkout for 10% off.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-xl text-sm text-white placeholder:text-neutral-500 focus:border-[#C6F432] outline-hidden flex-1"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#C6F432] text-black font-display font-bold text-xs sm:text-sm rounded-xl hover:bg-[#b4e029] transition-all flex items-center justify-center gap-2 whitespace-nowrap active:scale-95"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
            <p className="text-[11px] text-neutral-500 mt-2">
              By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="font-display text-2xl font-black tracking-tighter text-white">
              STRIDE
            </Link>
            <p className="text-xs text-neutral-400 mt-3 leading-relaxed max-w-sm">
              Engineered footwear designed at the nexus of biomechanics and sculptural minimalism. Built with circular eco-polymers and kinetic propulsion foams for athletes who move different.
            </p>
            <div className="flex gap-4 mt-6 text-neutral-400">
              <a href="#instagram" className="hover:text-[#C6F432] text-xs font-semibold transition-colors">Instagram</a>
              <a href="#strava" className="hover:text-[#C6F432] text-xs font-semibold transition-colors">Strava</a>
              <a href="#twitter" className="hover:text-[#C6F432] text-xs font-semibold transition-colors">Twitter/X</a>
              <a href="#youtube" className="hover:text-[#C6F432] text-xs font-semibold transition-colors">YouTube</a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-neutral-300 mb-4">
              Footwear
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li><Link to="/shop?category=Running" className="hover:text-white transition-colors">Road Running</Link></li>
              <li><Link to="/shop?category=Running" className="hover:text-white transition-colors">Trail Racing</Link></li>
              <li><Link to="/shop?category=Lifestyle" className="hover:text-white transition-colors">Studio & City</Link></li>
              <li><Link to="/shop?category=Basketball" className="hover:text-white transition-colors">Court Lockdown</Link></li>
              <li><Link to="/shop?category=Recovery" className="hover:text-white transition-colors">Post-Run Recovery</Link></li>
              <li><Link to="/shop?tag=sale" className="hover:text-[#C6F432] transition-colors">End of Season Sale</Link></li>
            </ul>
          </div>

          {/* Technology & Lab */}
          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-neutral-300 mb-4">
              Engineering
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li><Link to="/about" className="hover:text-white transition-colors">KineticFoam™ 2.0</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Carbon Propulsion</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Circular Materials</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Biomechanics Lab</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Carbon Accounting</Link></li>
            </ul>
          </div>

          {/* Support & Stores */}
          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-neutral-300 mb-4">
              Assistance
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li><Link to="/contact" className="hover:text-white transition-colors">30-Day Road Trial</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Flagship Showrooms</Link></li>
              <li><Link to="/wishlist" className="hover:text-white transition-colors">My Wishlist</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
              <li><Link to="/admin" className="text-[#84ad00] dark:text-[#C6F432] font-semibold hover:underline">Product Studio (Admin)</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span>© {new Date().getFullYear()} STRIDE Athletics Inc. All rights reserved.</span>
            <span className="hidden sm:inline text-neutral-700">•</span>
            <span className="text-neutral-400 font-medium">
              Developed & Built by <span className="text-[#C6F432] font-semibold">Touheed Abbasi</span>
            </span>
          </div>
          {/* Payment Badges */}
          <div className="flex items-center gap-3">
            <span className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded text-[10px] font-bold text-neutral-300">VISA</span>
            <span className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded text-[10px] font-bold text-neutral-300">MASTERCARD</span>
            <span className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded text-[10px] font-bold text-neutral-300">AMEX</span>
            <span className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded text-[10px] font-bold text-neutral-300">APPLE PAY</span>
            <span className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded text-[10px] font-bold text-neutral-300">PAYPAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
