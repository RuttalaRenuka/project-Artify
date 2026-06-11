import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { coupons } from '../data';
import { Gift, Copy, Check, Clock, Flame, Sparkles, Tag, ArrowRight } from 'lucide-react';

export default function Offers() {
  const { navigateTo } = useApp();

  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Urgent Flash Sale timer
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 22, seconds: 19 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 }; // reset
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const highTensionDeals = [
    { id: 'bogo-brushes', title: 'Buy 2 Get 1 FREE on Paint Brushes', desc: 'Secure maximum precision. Restock your detail fine synthetic hair brushes. Discount automatically applies at cart.', code: 'DETAILBOGO' },
    { id: 'free-primed-flax', title: 'Linseed Oil Bundle Accessory deal', desc: 'Acquire 2 classic oil paint packages and pick up 1 natural linseed liquid glazing cup free!', code: 'ARTIFYMASTER' },
    { id: 'custom-palette-save', title: 'Save ₹15 on Customized Paint Sets', desc: 'Custom curate matching palette jars for museum illustration works. Limited and highly coveted.', code: 'CREATIVE10' }
  ];

  return (
    <div id="offers-page-wrapper" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans text-left space-y-12">
      
      {/* Page Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          Exclusive Artist Offers & Promo Codes
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Stock up your studio shelves. Apply codes at checkout to unlock savings.
        </p>
      </div>

      {/* Countdown Timer Promo */}
      <section className="bg-gradient-to-r from-violet-900 via-purple-950 to-orange-950 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-xl shadow-violet-900/10">
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase font-mono tracking-wide">
              <Flame className="w-3.5 h-3.5 animate-pulse" /> Limited-Time clearance
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Summer Solstice Art Fest <br />
              <span className="bg-gradient-to-r from-orange-400 to-teal-300 bg-clip-text text-transparent">Save up to 35% on everything</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm max-w-md leading-relaxed">
              Our seasonal stocks clear fast. Get premium cotton canvases, oblique lettering kits, and resin geodes with guaranteed safe delivery before the countdown finishes!
            </p>
          </div>

          {/* Countdown Clock Display */}
          <div className="flex items-center space-x-3 bg-white/5 border border-white/10 px-6 py-4 rounded-2xl">
            <Clock className="w-5 h-5 text-orange-400 shrink-0" />
            <div className="flex items-center space-x-2 text-sm font-semibold font-mono text-orange-200">
              <span className="bg-white/10 px-2.5 py-1.5 rounded-lg text-white">
                {String(timeLeft.hours).padStart(2, '0')}h
              </span>
              <span>:</span>
              <span className="bg-white/10 px-2.5 py-1.5 rounded-lg text-white">
                {String(timeLeft.minutes).padStart(2, '0')}m
              </span>
              <span>:</span>
              <span className="bg-white/10 px-2.5 py-1.5 rounded-lg text-white animate-pulse">
                {String(timeLeft.seconds).padStart(2, '0')}s
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Grid of Copy Coupons */}
      <section className="space-y-6">
        <h3 className="font-bold text-slate-900 text-lg flex items-center gap-1.5 font-sans">
          <Tag className="w-5 h-5 text-violet-600" /> Live Promo Coupons
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coupons.map((cop) => (
            <div
              key={cop.id}
              className="bg-white rounded-2xl border border-slate-100 hover:border-violet-100 p-6 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md transition-all text-left"
            >
              <div className="space-y-2">
                <span className="text-xs font-extrabold uppercase font-mono tracking-wider text-violet-600">
                  {cop.discountPercent}% Discount Voucher
                </span>
                <h4 className="font-bold text-slate-900 text-base font-sans">
                  {cop.description}
                </h4>
                <p className="text-slate-400 text-xs">
                  Expiry date: {cop.expiryDate} {cop.minSpend ? `| Minimum subtotal: ₹${cop.minSpend}` : ''}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                <span className="bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl font-mono text-sm font-extrabold text-slate-800 uppercase tracking-wide">
                  {cop.code}
                </span>

                <button
                  onClick={() => handleCopyCode(cop.id, cop.code)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold font-sans flex items-center gap-1 cursor-pointer transition-all ${
                    copiedId === cop.id
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'bg-violet-600 hover:bg-violet-700 text-white shadow-sm shadow-violet-100'
                  }`}
                >
                  {copiedId === cop.id ? <Check className="w-4 h-4 animate-scale" /> : <Copy className="w-4 h-4" />}
                  {copiedId === cop.id ? 'Copied' : 'Copy Code'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* High-Tension Deals list */}
      <section className="space-y-6">
        <h3 className="font-bold text-slate-900 text-lg flex items-center gap-1.5 font-sans">
          <Gift className="w-5 h-5 text-orange-500" /> Bundle Deal Specials
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highTensionDeals.map((dl) => (
            <div
              key={dl.id}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-full blur-xl pointer-events-none" />
              
              <div className="space-y-2 text-left">
                <span className="bg-orange-50 text-orange-600 text-[10px] font-bold px-2 py-0.5 rounded font-mono uppercase tracking-wider">
                  Featured Combination Sale
                </span>
                <h4 className="font-bold text-slate-900 text-sm sm:text-base font-sans">{dl.title}</h4>
                <p className="text-slate-500 text-xs leading-relaxed">{dl.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">Coupon Code: {dl.code}</span>
                <button
                  onClick={() => navigateTo('shop')}
                  className="text-xs font-bold text-violet-600 hover:text-orange-500 inline-flex items-center gap-0.5 cursor-pointer"
                >
                  Go to Shop <ArrowRight className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
