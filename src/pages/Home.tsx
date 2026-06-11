import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { products, communityGallery, testimonials } from '../data';
import ProductCard from '../components/ProductCard';
import Newsletter from '../components/Newsletter';
import PaintMixerWidget from '../components/PaintMixerWidget';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Flame, 
  Clock, 
  Award, 
  Truck, 
  CreditCard, 
  HelpCircle, 
  ThumbsUp, 
  Heart, 
  Share2 
} from 'lucide-react';
import { motion } from 'motion/react';

export default function Home() {
  const { navigateTo, toggleWishlist, wishlist, addToCart, setSearchQuery } = useApp();

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

  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);
  const newArrivals = products.filter(p => !p.isBestSeller).slice(0, 4);

  const artistChoicePacks = [
    {
      id: 'pro-artist-combo',
      title: 'Professional Artist Suite',
      description: 'Solid H-frame wooden Oak studio easel paired with archival flax linen stretched frames.',
      price: '₹210.00',
      badge: 'Expert Choice',
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'botanical-watercolor-diy',
      title: 'Beginner Botanical Watercolor Starter Pack',
      description: 'All-inclusive guided template board with natural gum transparent watercolor pans.',
      price: '₹29.99',
      badge: 'Best For Learning',
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'fluid-acrylic-master',
      title: 'Chameleon Fluid Acrylic Pour Kit',
      description: 'Pre-mixed high-flow paints configured with pure silicon for cellular dynamic abstract designs.',
      price: '₹42.00',
      badge: 'Therapeutic Hobby',
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&auto=format&fit=crop&q=80',
    }
  ];

  return (
    <div id="home-page-container" className="font-sans text-slate-800 bg-[#F8FAFC]">
      
      {/* 1. HERO SECTION */}
      <section id="hero-section" className="relative py-16 md:py-24 lg:py-28 overflow-hidden bg-white">
        {/* Dynamic backdrop paints and blobs */}
        <div className="absolute top-0 right-0 w-[45rem] h-[45rem] rounded-full bg-gradient-to-tr from-violet-100/40 via-purple-100/50 to-orange-100/20 blur-3xl pointer-events-none -translate-y-24 translate-x-24" />
        <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-teal-50/40 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-600 text-xs font-semibold tracking-wide uppercase font-mono">
                <Sparkles className="w-3.5 h-3.5 text-orange-500 animate-spin" /> Unveiling High-End Artist Pigments
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
                Bring Your <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-orange-500 bg-clip-text text-transparent">Creative Vision</span> to Sparkling Life
              </h1>

              <p className="text-slate-500 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
                Explore professional art supplies, premium customized color sets, handcrafted fine synthetic detail brushes, and creative tools manufactured for dedicated and hobby creators alike.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  id="hero-shop-cta"
                  onClick={() => navigateTo('shop')}
                  className="bg-gradient-to-r from-violet-600 to-orange-500 hover:from-violet-700 hover:to-orange-600 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-violet-200 hover:shadow-orange-200 cursor-pointer flex items-center gap-1.5 text-base"
                >
                  Shop Now
                  <ArrowRight className="w-5 h-5 animate-bounce-horizontal" />
                </button>
                <button
                  id="hero-offers-cta"
                  onClick={() => navigateTo('offers')}
                  className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold px-8 py-4 rounded-xl transition-all cursor-pointer text-base"
                >
                  Explore Collections
                </button>
              </div>

              {/* Small trust statistics */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-100 max-w-md">
                <div>
                  <span className="block text-2xl font-extrabold text-slate-900">45k+</span>
                  <span className="text-xs font-semibold text-slate-400 font-mono uppercase tracking-wider">Creators Served</span>
                </div>
                <div>
                  <span className="block text-2xl font-extrabold text-slate-900">100%</span>
                  <span className="text-xs font-semibold text-slate-400 font-mono uppercase tracking-wider">Pigment Purity</span>
                </div>
                <div>
                  <span className="block text-2xl font-extrabold text-slate-900">4.9 ★</span>
                  <span className="text-xs font-semibold text-slate-400 font-mono uppercase tracking-wider">Artist Reviews</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Image Column */}
            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/5] sm:aspect-[4/4] lg:aspect-[4/5] rounded-[2rem] bg-gradient-to-br from-violet-200 to-orange-200 p-2.5 shadow-2xl relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent z-10 rounded-[1.85rem]" />
                <img
                  src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&auto=format&fit=crop&q=80"
                  alt="Artist creating oil masterpiece"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-[1.85rem] group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute bottom-6 left-6 right-6 z-20 text-white text-left">
                  <span className="text-[10px] uppercase tracking-wider font-mono bg-white/20 backdrop-blur-md px-3 py-1 rounded-full font-bold">
                    Featured Artist Showcase
                  </span>
                  <h3 className="text-lg md:text-xl font-bold mt-2 font-sans">
                    "Flow of the Golden Aura"
                  </h3>
                  <p className="text-white/80 text-xs mt-1">Painted with Artify Artisanal Oils & French Brushes</p>
                </div>
              </div>

              {/* Floppy interactive stickers */}
              <div className="absolute -bottom-6 -left-6 bg-white border border-slate-100 rounded-2xl p-4 shadow-xl hidden sm:flex items-center space-x-3 max-w-[200px] animate-float">
                <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                  <Flame className="w-5 h-5 text-orange-500" />
                </div>
                <div className="text-left">
                  <span className="block text-xs font-bold text-slate-800">Flash Sales!</span>
                  <span className="text-[11px] text-slate-400">Up to 30% OFF</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. FEATURED CATEGORIES SECTION */}
      <section id="categories-section" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-transparent">
        <span className="text-xs font-semibold text-violet-600 font-mono tracking-widest uppercase block mb-2">
          Curated Department Categories
        </span>
        <h2 className="text-3xl md:text-4xl font-sans font-bold text-slate-900 tracking-tight">
          Explore by Creative Medium
        </h2>
        <p className="text-slate-400 text-sm max-w-md mx-auto mt-2">
          Find specifically matched supplies configured for your unique artist canvas.
        </p>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-11 gap-4 mt-12">
          {[
            { tag: 'acrylic', label: 'Acrylic Paints', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80', count: '5 Items' },
            { tag: 'oil', label: 'Oil Paints', image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=400&q=80', count: '4 Items' },
            { tag: 'watercolor', label: 'Watercolors', image: 'https://images.unsplash.com/photo-1525909002-1b05702214d4?w=400&q=80', count: '5 Items' },
            { tag: 'brushes', label: 'Fine Brushes', image: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=400&q=80', count: '5 Items' },
            { tag: 'canvas', label: 'Canvas & Stands', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&q=80', count: '3 Items' },
            { tag: 'drawing', label: 'Draw Supplies', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&q=80', count: '3 Items' },
            { tag: 'craft', label: 'Craft Things', image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=400&q=80', count: '5 Items' },
            { tag: 'kits', label: 'DIY Art Kits', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&q=80', count: '3 Items' },
            { tag: 'resin', label: 'Resin Art', image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&q=80', count: '3 Items' },
            { tag: 'calligraphy', label: 'Calligraphy', image: 'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?w=400&q=80', count: '2 Items' },
            { tag: 'customized', label: 'Studio Custom', image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&q=80', count: '4 Items' }
          ].map((cat) => (
            <div
              id={`cat-card-${cat.tag}`}
              key={cat.tag}
              onClick={() => {
                setSearchQuery(cat.tag);
                navigateTo('shop');
              }}
              className="bg-white p-3 py-4 rounded-2xl border border-slate-100 hover:border-violet-200 hover:shadow-lg transition-all cursor-pointer group text-center"
            >
              <div className="w-14 h-14 rounded-full overflow-hidden mx-auto mb-3 bg-slate-50 border border-slate-100 group-hover:scale-105 transition-all">
                <img src={cat.image} alt={cat.label} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              </div>
              <h4 className="font-semibold text-slate-800 text-[11px] sm:text-xs font-sans group-hover:text-violet-600 transition-colors truncate">
                {cat.label}
              </h4>
              <span className="text-[10px] text-slate-400 font-mono mt-0.5 inline-block">
                {cat.count}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. BEST SELLERS SECTION */}
      <section id="best-sellers" className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 text-left">
            <div>
              <span className="text-xs font-semibold text-orange-500 font-mono tracking-widest uppercase block mb-1">
                Highest rated by painters
              </span>
              <h2 className="text-3xl font-sans font-bold text-slate-900 tracking-tight">
                Our Best Selling Supplies
              </h2>
            </div>
            
            <button
              onClick={() => navigateTo('shop')}
              className="mt-4 md:mt-0 text-sm font-bold text-violet-600 hover:text-orange-500 inline-flex items-center gap-1 cursor-pointer transition-colors"
            >
              See All Products <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. DYNAMIC SPECIAL FLASH SALE COOLDOWN SECTION */}
      <section id="flash-sale-cooldown" className="py-16 bg-gradient-to-br from-violet-900 via-purple-950 to-orange-950 text-white relative overflow-hidden rounded-3xl mx-4 sm:mx-8 md:mx-12 lg:mx-16 my-12 shadow-xl shadow-violet-950/20 text-left">
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            <div className="space-y-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase font-mono tracking-wide">
                <Flame className="w-3.5 h-3.5" /> High-Heated Flash Deal
              </span>

              <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight">
                24-Hour Studio Clearance Sale! <br />
                <span className="bg-gradient-to-r from-orange-400 to-teal-300 bg-clip-text text-transparent">Save Up To 35% Off</span>
              </h2>

              <p className="text-slate-300 text-sm leading-relaxed max-w-md">
                Refurbish your paint tables and storage cupboards. These special bundles include step-by-step master tutorials and premium shipping protectors.
              </p>

              {/* Countdown Clocks */}
              <div className="flex items-center space-x-3 pt-2">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-md border border-white/12 flex items-center justify-center font-mono font-bold text-lg md:text-xl text-orange-300">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono mt-1">Hrs</span>
                </div>
                <span className="text-lg font-bold text-slate-500 mb-5">:</span>
                
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-md border border-white/12 flex items-center justify-center font-mono font-bold text-lg md:text-xl text-orange-300">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono mt-1">Mins</span>
                </div>
                <span className="text-lg font-bold text-slate-500 mb-5">:</span>

                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-md border border-white/12 flex items-center justify-center font-mono font-bold text-lg md:text-xl text-orange-300 animate-pulse">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono mt-1">Secs</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/12 p-6 rounded-2xl space-y-4 max-w-md mx-auto lg:ml-auto">
              <h4 className="text-lg font-bold text-white tracking-tight flex items-center gap-1.5 font-sans">
                ⭐ Premium Bundle Highlight
              </h4>
              <div className="flex items-center space-x-4 pb-4 border-b border-white/10">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-900 shrink-0">
                  <img src="https://images.unsplash.com/photo-1544816155-12df9643f363?w=300&q=80" alt="Botanical kit" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-semibold text-orange-400">Botanical Watercolor Kit</span>
                  <h4 className="text-sm font-bold text-white">Full-Guided DIY Tutorial combo</h4>
                  <span className="text-xs text-slate-400">Box includes 300gsm papers & Detail Brushes</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className="text-xs text-slate-400 block">Flash discount price:</span>
                  <span className="text-xl font-extrabold text-white">₹29.99</span>
                  <span className="text-xs text-slate-500 line-through pl-1.5">₹38.00</span>
                </div>
                
                <button
                  onClick={() => {
                    navigateTo('product-detail', 'diy-watercolor-botanical');
                  }}
                  className="bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold text-xs px-5 py-3 rounded-xl transition-all cursor-pointer shadow-sm shadow-orange-500/10"
                >
                  Claim Bundle Code
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. NEW ARRIVALS */}
      <section id="new-arrivals" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 text-left">
            <div>
              <span className="text-xs font-semibold text-teal-600 font-mono tracking-widest uppercase block mb-1">
                Freshly stocked in warehouse
              </span>
              <h2 className="text-3xl font-sans font-bold text-slate-900 tracking-tight">
                New Arrivals & Restocks
              </h2>
            </div>
            
            <button
              onClick={() => navigateTo('shop')}
              className="mt-4 md:mt-0 text-sm font-bold text-violet-600 hover:text-teal-600 inline-flex items-center gap-1 cursor-pointer transition-colors"
            >
              Browse Catalog <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. ARTIST CHOICE COLLECTIONS */}
      <section id="artist-choice-suit" className="py-16 bg-slate-100/50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-semibold text-violet-600 font-mono tracking-widest uppercase block mb-2">
            Curated combos
          </span>
          <h2 className="text-3xl font-sans font-bold text-slate-900 tracking-tight">
            Specialist Curated Kits
          </h2>
          <p className="text-slate-500 text-sm max-w-sm mx-auto mt-2 mb-12">
            Bundles engineered together by professional illustrators and paint scholars.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {artistChoicePacks.map((pack) => (
              <div
                id={`choice-pack-${pack.id}`}
                key={pack.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-violet-100 shadow-sm hover:shadow-md transition-all text-left flex flex-col h-full group"
              >
                <div className="aspect-[16/10] overflow-hidden bg-slate-50">
                  <img
                    src={pack.image}
                    alt={pack.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-orange-600 uppercase font-mono tracking-wider bg-orange-50 px-2.5 py-1 rounded">
                      {pack.badge}
                    </span>
                    <h4 className="font-bold text-slate-900 text-lg group-hover:text-violet-600 transition-colors font-sans">
                      {pack.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-sans">
                      {pack.description}
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Total bundle estimate:</span>
                      <span className="text-base font-extrabold text-slate-900">{pack.price}</span>
                    </div>
                    
                    <button
                      onClick={() => navigateTo('shop')}
                      className="bg-slate-950 hover:bg-violet-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                    >
                      View Suite Catalog
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6.5 DYNAMIC PAINT MIXOLOGY LAB */}
      <section id="paint-mixology-lab" className="py-20 bg-slate-900 border-y border-slate-950 text-white relative overflow-hidden">
        {/* Dynamic backdrop glows indicating liquid paints blending */}
        <div className="absolute top-0 right-1/4 w-[35rem] h-[35rem] rounded-full bg-gradient-to-tr from-violet-600/10 via-amber-500/10 to-transparent blur-3xl pointer-events-none -translate-y-20" />
        <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col justify-center">
          <span className="text-xs font-semibold text-orange-400 font-mono tracking-widest uppercase block mb-1.5">
            Interactive Paint Mixing Lab
          </span>
          <h2 className="text-3xl md:text-5xl font-sans font-bold tracking-tight text-white mb-2">
            The Artify Mixology Lab
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-lg mx-auto mt-2 mb-10 leading-relaxed font-sans">
            Become an academy formulator! Mix premium crimson red, phthalo blue, cadmium yellow, titanium white, and carbon black. Pour your unique blend into a customized 50ml studio jar.
          </p>

          <PaintMixerWidget navigateTo={navigateTo} addToCart={addToCart} />
        </div>
      </section>

      {/* 7. WHY CHOOSE ARTIFY */}
      <section id="why-choose-us" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-transparent">
        <span className="text-xs font-semibold text-teal-600 font-mono tracking-widest uppercase block mb-2">
          The Artify Integrity
        </span>
        <h2 className="text-3xl font-sans font-bold text-slate-900 tracking-tight">
          Tools Designed to Inspire Long term
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {[
            { icon: Award, title: 'Museum Quality Raw', desc: 'Sourced premium organic linseed polymers and ground mineral pure pigments for absolute color lightfastness.' },
            { icon: Truck, title: 'Safe Quick Transport', desc: 'Secure protective cardboard framing prevents tube burst. FREE delivery on purchases above ₹50.' },
            { icon: CreditCard, title: 'Secure Certified pay', desc: 'Checkout with local cards, major gateways, or UPI. 100% money back check guarantees in minutes.' },
            { icon: HelpCircle, title: 'Expert Artist Counsel', desc: "Need assistance? Toggle our interactive chat support widget to connect with academy guidelines." }
          ].map((feat, i) => (
            <div
              id={`integrity-card-${i}`}
              key={i}
              className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col items-center text-center space-y-3"
            >
              <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
                <feat.icon className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm sm:text-base font-sans">{feat.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xs">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. CUSTOMER TESTIMONIALS */}
      <section id="testimonials" className="py-16 bg-white border-y border-slate-100 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-semibold text-orange-500 font-mono tracking-widest uppercase block mb-2">
            Loved by 25,000+ artists
          </span>
          <h2 className="text-3xl font-sans font-bold text-slate-900 tracking-tight">
            Vouched for by Creators
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-left">
            {testimonials.map((test) => (
              <div
                id={`testimonial-card-${test.id}`}
                key={test.id}
                className="bg-slate-50/50 hover:bg-slate-50 border border-slate-100 p-6 rounded-2xl space-y-4 flex flex-col justify-between transition-colors"
                title={`${test.name} review`}
              >
                <div className="space-y-2">
                  {/* Rating Stars */}
                  <div className="flex text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className="text-lg">★</span>
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                    "{test.comment}"
                  </p>
                </div>

                <div className="flex items-center space-x-3 pt-4 border-t border-slate-100 shrink-0">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200">
                    <img src={test.avatar} alt={test.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 text-xs sm:text-sm font-sans">{test.name}</h5>
                    <span className="text-[10px] font-medium text-slate-400 uppercase font-mono tracking-wider">{test.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. COMMUNITY INSPIRATION GALLERY */}
      <section id="inspiration-showcase" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-semibold text-violet-600 font-mono tracking-widest uppercase block mb-2">
            Social Showcase
          </span>
          <h2 className="text-3xl font-sans font-bold text-slate-900 tracking-tight">
            Artify Community Canvas
          </h2>
          <p className="text-slate-400 text-sm max-w-sm mx-auto mt-2 mb-10">
            Click to inspire and see detailed customer paintings. Share your masterpiece with hashtag <strong className="text-slate-700">#ArtifyStudios</strong>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {communityGallery.map((sh) => (
              <div
                id={`gallery-showcase-${sh.id}`}
                key={sh.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm relative group h-full flex flex-col text-left"
              >
                <div className="aspect-[4/3] overflow-hidden bg-slate-50 relative">
                  <img
                    src={sh.image}
                    alt={sh.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Share buttons overlays */}
                  <div className="absolute inset-0 bg-slate-950/25 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-3">
                    <button className="p-2 bg-white rounded-xl text-slate-800 hover:bg-violet-600 hover:text-white shadow-md transition-colors cursor-pointer" title="Give like">
                      <ThumbsUp className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-white rounded-xl text-slate-800 hover:bg-violet-600 hover:text-white shadow-md transition-colors cursor-pointer" title="Share with friends">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="p-4 flex flex-col text-left">
                  <span className="text-[10px] text-violet-600 font-bold font-mono uppercase tracking-wider">{sh.artist}</span>
                  <h4 className="font-semibold text-slate-800 text-xs sm:text-sm truncate mt-1">{sh.title}</h4>
                  <span className="text-[10px] text-slate-400 mt-1 font-mono">💖 {sh.likes} painter recommendations</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. NEWSLETTER IMPORT */}
      <Newsletter />
    </div>
  );
}
