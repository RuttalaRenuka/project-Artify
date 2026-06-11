import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Sparkles, Check, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Newsletter() {
  const { addNotification } = useApp();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      alert('Please state a valid artist email!');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      addNotification(`Welcome aboard! Special offer coupon CREATIVE10 registered for ${email}.`);
    }, 1200);
  };

  return (
    <section id="newsletter-section" className="relative py-16 bg-slate-900 overflow-hidden rounded-t-[2.5rem]">
      {/* Absolute background effects */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl -translate-x-12 -translate-y-12" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl translate-x-20 translate-y-20" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-orange-400 text-xs font-semibold tracking-wider uppercase mb-4 font-mono">
          <Sparkles className="w-3 h-3 text-orange-400" /> Creative Circles Digest
        </span>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold text-white tracking-tight leading-tight">
          Get Creative Inspiration <br />
          <span className="bg-gradient-to-r from-violet-400 via-orange-400 to-teal-400 bg-clip-text text-transparent">
            Delivered Weekly
          </span>
        </h2>

        <p className="mt-4 text-slate-400 text-sm md:text-base max-w-xl mx-auto font-sans">
          Subscribe to our newsletter and join 25,000+ artists worldwide. Get expert tutorials, supplies restocks, and a exclusive 10% coupon instant voucher.
        </p>

        <div className="mt-8 max-w-md mx-auto">
          {!submitted ? (
            <motion.form 
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-2"
              layout
            >
              <div className="relative flex-1">
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Enter your artist email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/12 text-white placeholder-slate-500 rounded-xl outline-none focus:ring-2 focus:ring-violet-500 text-sm transition-all"
                  required
                  disabled={loading}
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              </div>
              <button
                id="newsletter-submit"
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-violet-600 to-orange-500 hover:from-violet-500 hover:to-orange-400 text-white font-bold px-6 py-3.5 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md shadow-violet-900/10 cursor-pointer text-sm font-sans"
              >
                {loading ? 'Adding...' : 'Subscribe Now'}
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.form>
          ) : (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white/5 border border-violet-500/20 rounded-2xl p-6 text-center"
            >
              <div className="w-12 h-12 bg-emerald-500/15 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <Check className="w-6 h-6 animate-pulse" />
              </div>
              <h3 className="text-white font-semibold text-lg">Thank You for joining!</h3>
              <p className="text-slate-400 text-xs mt-1">Check your inbox or use code below right away at checkout:</p>
              
              <div className="mt-4 inline-flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2">
                <span className="text-xs text-slate-400 uppercase font-mono">CODE:</span>
                <span className="text-sm font-extrabold text-orange-400 font-mono tracking-wider">CREATIVE10</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
