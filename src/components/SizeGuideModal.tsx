import React, { useState } from 'react';
import { X, Ruler, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useCart();
  const [activeTab, setActiveTab] = useState<'men' | 'women'>('men');

  if (!isSizeGuideOpen) return null;

  const menSizes = [
    { us: '7.0', uk: '6.0', eu: '40.0', cm: '25.0' },
    { us: '7.5', uk: '6.5', eu: '40.5', cm: '25.5' },
    { us: '8.0', uk: '7.0', eu: '41.0', cm: '26.0' },
    { us: '8.5', uk: '7.5', eu: '42.0', cm: '26.5' },
    { us: '9.0', uk: '8.0', eu: '42.5', cm: '27.0' },
    { us: '9.5', uk: '8.5', eu: '43.0', cm: '27.5' },
    { us: '10.0', uk: '9.0', eu: '44.0', cm: '28.0' },
    { us: '10.5', uk: '9.5', eu: '44.5', cm: '28.5' },
    { us: '11.0', uk: '10.0', eu: '45.0', cm: '29.0' },
    { us: '11.5', uk: '10.5', eu: '45.5', cm: '29.5' },
    { us: '12.0', uk: '11.0', eu: '46.0', cm: '30.0' },
  ];

  const womenSizes = [
    { us: '5.5', uk: '3.0', eu: '36.0', cm: '22.5' },
    { us: '6.0', uk: '3.5', eu: '36.5', cm: '23.0' },
    { us: '6.5', uk: '4.0', eu: '37.5', cm: '23.5' },
    { us: '7.0', uk: '4.5', eu: '38.0', cm: '24.0' },
    { us: '7.5', uk: '5.0', eu: '38.5', cm: '24.5' },
    { us: '8.0', uk: '5.5', eu: '39.0', cm: '25.0' },
    { us: '8.5', uk: '6.0', eu: '40.0', cm: '25.5' },
    { us: '9.0', uk: '6.5', eu: '40.5', cm: '26.0' },
    { us: '9.5', uk: '7.0', eu: '41.0', cm: '26.5' },
    { us: '10.0', uk: '7.5', eu: '42.0', cm: '27.0' },
  ];

  const currentList = activeTab === 'men' ? menSizes : womenSizes;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsSizeGuideOpen(false)}
      />

      <div className="relative w-full max-w-2xl bg-[#F7F7F5] dark:bg-[#18181A] rounded-3xl shadow-2xl p-6 sm:p-8 z-10 border border-black/10 dark:border-white/10 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10 mb-6">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-neutral-800 dark:text-neutral-200" />
            <h3 className="font-display text-xl font-bold text-neutral-900 dark:text-neutral-100">
              STRIDE Precision Sizing Chart
            </h3>
          </div>
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            aria-label="Close size guide"
            className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-neutral-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-2 mb-6 p-1 bg-neutral-200/70 dark:bg-neutral-800/80 rounded-xl w-fit">
          <button
            type="button"
            onClick={() => setActiveTab('men')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'men'
                ? 'bg-white dark:bg-[#111111] text-black dark:text-white shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
            }`}
          >
            Men&apos;s Sizing
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('women')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'women'
                ? 'bg-white dark:bg-[#111111] text-black dark:text-white shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
            }`}
          >
            Women&apos;s Sizing
          </button>
        </div>

        {/* Conversion Table */}
        <div className="overflow-x-auto max-h-60 overflow-y-auto border border-black/10 dark:border-white/10 rounded-xl bg-white dark:bg-[#1A1A1E] mb-6">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-100 dark:bg-neutral-800 sticky top-0 border-b border-black/10 dark:border-white/10 font-bold text-neutral-700 dark:text-neutral-200">
              <tr>
                <th className="py-2.5 px-4">US</th>
                <th className="py-2.5 px-4">UK</th>
                <th className="py-2.5 px-4">EU</th>
                <th className="py-2.5 px-4">Foot Length (CM)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5 tabular-nums">
              {currentList.map((row) => (
                <tr key={row.us} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="py-2 px-4 font-bold text-neutral-900 dark:text-neutral-100">{row.us}</td>
                  <td className="py-2 px-4 text-neutral-600 dark:text-neutral-400">{row.uk}</td>
                  <td className="py-2 px-4 text-neutral-600 dark:text-neutral-400">{row.eu}</td>
                  <td className="py-2 px-4 text-neutral-600 dark:text-neutral-400">{row.cm} cm</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Fit tips */}
        <div className="bg-neutral-100 dark:bg-neutral-800/60 p-4 rounded-xl text-xs space-y-2 text-neutral-700 dark:text-neutral-300">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#84ad00] dark:text-[#C6F432] shrink-0 mt-0.5" />
            <p>
              <strong>True to Size Fit:</strong> STRIDE running shoes fit true to standard athletic sizing. For wide feet or marathon swelling, order a half-size up.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#84ad00] dark:text-[#C6F432] shrink-0 mt-0.5" />
            <p>
              <strong>How to Measure:</strong> Stand with your heel against a flat wall, mark your longest toe on a sheet of paper, and measure the distance in centimeters.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
