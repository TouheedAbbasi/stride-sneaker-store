import React, { useState } from 'react';
import { Mail, Phone, MapPin, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useCart();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Product Sizing & Fit');
  const [message, setMessage] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setFormSubmitted(true);
    showToast('Your message has been dispatched to our concierge.');
  };

  const faqs = [
    {
      q: 'How does the 30-Day Risk-Free Road Test work?',
      a: 'Lace them up, take them outside on the roads, trails, or track, and run your standard weekly miles. If they do not completely elevate your pace and comfort within 30 calendar days of delivery, contact our concierge for a free prepaid return label and 100% full refund.'
    },
    {
      q: 'How do STRIDE sizes compare to standard running shoes?',
      a: 'STRIDE shoes fit true to standard US athletic sizing with a precision midfoot lock and an anatomical toe box that accommodates natural foot splay during long efforts. For wide feet or ultra-marathons, we recommend sizing up by a half size.'
    },
    {
      q: 'Do you offer international expedited shipping?',
      a: 'Yes, we provide expedited international courier shipping via DHL Express to over 65 countries. Orders over $100 receive complimentary international standard delivery.'
    },
    {
      q: 'How should I clean and preserve my kinetic foam?',
      a: 'Spot clean by gently hand-washing with cool water and mild biodegradable soap using a soft bristle brush. Always air dry in shaded ventilation away from direct heat sources. Never put running shoes in a tumble dryer.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#84ad00] dark:text-[#C6F432]">
          Assistance & Concierge
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-black text-neutral-900 dark:text-white tracking-tight">
          How Can We Help?
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
          Our biomechanists and customer concierge team are available 7 days a week.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white dark:bg-[#18181A] p-6 sm:p-10 rounded-3xl border border-black/5 dark:border-white/5 shadow-xs">
          <h2 className="font-display text-xl font-bold text-neutral-900 dark:text-white mb-6">
            Send Us a Message
          </h2>

          {formSubmitted ? (
            <div className="p-8 text-center bg-neutral-50 dark:bg-neutral-800/50 rounded-2xl border border-black/5 dark:border-white/5 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#84ad00] dark:text-[#C6F432] mx-auto" />
              <h3 className="font-display text-lg font-bold text-neutral-900 dark:text-white">
                Message Dispatched
              </h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                Thank you, {name}. A member of our footwear concierge will respond to {email} within 4 business hours.
              </p>
              <button
                type="button"
                onClick={() => {
                  setFormSubmitted(false);
                  setName('');
                  setEmail('');
                  setMessage('');
                }}
                className="mt-4 px-5 py-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-black text-xs font-semibold"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jordan Miller"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent outline-hidden focus:border-black dark:focus:border-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jordan@example.com"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent outline-hidden focus:border-black dark:focus:border-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider block mb-1">Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent outline-hidden dark:bg-neutral-800"
                >
                  <option value="Product Sizing & Fit">Product Sizing & Fit Advice</option>
                  <option value="Order Tracking">Order Tracking & Dispatch</option>
                  <option value="Road Test Returns">30-Day Road Test Returns</option>
                  <option value="Athlete Sponsorship">Athlete Sponsorship & Racing Team</option>
                  <option value="Press & Lab">Press & Materials Engineering Inquiry</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider block mb-1">How can we assist?</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share details regarding your shoe requirements or order inquiry..."
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent outline-hidden focus:border-black dark:focus:border-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#111111] dark:bg-[#C6F432] text-white dark:text-black font-display font-bold text-xs sm:text-sm rounded-xl hover:opacity-90 active:scale-98 transition-all"
              >
                Send Inquiry
              </button>
            </form>
          )}
        </div>

        {/* Showrooms & Info Right */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-[#18181A] p-6 sm:p-8 rounded-3xl border border-black/5 dark:border-white/5 shadow-xs space-y-6">
            <h3 className="font-display text-lg font-bold text-neutral-900 dark:text-white">
              Flagship Experience Studios
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex gap-3">
                <MapPin className="w-4 h-4 text-[#84ad00] dark:text-[#C6F432] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-neutral-900 dark:text-white">STRIDE Soho Hub</h4>
                  <p className="text-neutral-500">482 Broome Street, New York, NY 10013</p>
                  <span className="text-[11px] text-neutral-400">Open Daily 10:00 AM - 7:00 PM</span>
                </div>
              </div>

              <div className="flex gap-3">
                <MapPin className="w-4 h-4 text-[#84ad00] dark:text-[#C6F432] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-neutral-900 dark:text-white">STRIDE Tokyo Biomechanics Lab</h4>
                  <p className="text-neutral-500">5-7-22 Minami-Aoyama, Minato-ku, Tokyo</p>
                  <span className="text-[11px] text-neutral-400">Mon - Sat 11:00 AM - 8:00 PM</span>
                </div>
              </div>

              <div className="flex gap-3">
                <MapPin className="w-4 h-4 text-[#84ad00] dark:text-[#C6F432] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-neutral-900 dark:text-white">STRIDE London Concept Store</h4>
                  <p className="text-neutral-500">24 Redchurch St, Shoreditch, London E2 7DD</p>
                  <span className="text-[11px] text-neutral-400">Tue - Sun 10:30 AM - 6:30 PM</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-black/5 dark:border-white/5 space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-neutral-400" />
                <span>concierge@strideathletics.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-neutral-400" />
                <span>+1 (800) 892-4112 (9 AM - 6 PM EST)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="pt-12 border-t border-black/10 dark:border-white/10 max-w-3xl mx-auto">
        <h2 className="font-display text-2xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-[#18181A] border border-black/5 dark:border-white/5"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between font-display text-sm font-bold text-left text-neutral-900 dark:text-white"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? <ChevronUp className="w-4 h-4 shrink-0" /> : <ChevronDown className="w-4 h-4 shrink-0" />}
              </button>
              {openFaq === idx && (
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-3 leading-relaxed">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
