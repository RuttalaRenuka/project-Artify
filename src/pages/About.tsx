import React from 'react';
import { Award, Heart, ShieldAlert, Sparkles, Users, Palette } from 'lucide-react';

export default function About() {
  const teamMembers = [
    { name: 'Marcus Vance', role: 'Chief Curator & Pigments Scholar', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80', bio: 'Former fine arts lecturer at Yale. Marcus oversees chemical purity and raw materials grade validations.' },
    { name: 'Sienna Sterling', role: 'Head of DIY Craft development', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80', bio: 'Sienna designs self-guided tutorial kits and fluid acrylic pouring ratios for home therapy activities.' },
    { name: 'Elena Rostova', role: 'Resin & Calligraphy Curator', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80', bio: 'Traditional copperplate cursivist. Elena curates obliques, stainless brass nib arrays, and gold shimmer inks.' }
  ];

  return (
    <div id="about-us-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans text-left space-y-16">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-600 text-xs font-semibold uppercase font-mono tracking-wide">
          Our Brand Biography
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Unleash Creativity. <br />
          <span className="bg-gradient-to-r from-violet-600 to-orange-500 bg-clip-text text-transparent">Create Without Limits.</span>
        </h1>
        <p className="text-slate-500 text-sm md:text-base leading-relaxed">
          Founded in Vizag by a small alliance of fine art lecturers and polymer chemists, Artify curates the worlds finest creative assets under one digital workshop roof.
        </p>
      </div>

      {/* Story & Vision */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-5 text-left">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Our Story & Creative Mission</h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            In traditional retail art stores, we often noticed creators stranded between low-quality craft school items and hyper-expensive, inaccessible professional imports. We wanted a reliable brand that delivers professional grade pigment purity, high-dispension watercolor half-pans, and slow-cure epoxies to beginners and active masters alike.
          </p>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Every product in our catalog runs through rigorous pigment testing and mechanical stretch tests before registering for shipment. We couple materials with expert educational tutorial guides to ensure that no artist faces a blank canvas alone.
          </p>

          <div className="grid grid-cols-2 gap-4 text-xs font-semibold py-4 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center">
                <Palette className="w-4.5 h-4.5" />
              </span>
              <span>100% Acid-Free Paper</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                <Award className="w-4.5 h-4.5" />
              </span>
              <span>Double-Milled Pigments</span>
            </div>
          </div>
        </div>

        <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-tr from-violet-200 to-orange-200 p-2 border border-slate-100 shadow-lg relative">
          <img
            src="https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80"
            alt="Art supplies workshop tables"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover rounded-2xl"
            loading="lazy"
          />
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-slate-50/70 border border-slate-100 rounded-[2rem] p-8 sm:p-12 text-center space-y-10">
        <div className="max-w-md mx-auto space-y-2">
          <span className="text-xs font-semibold text-orange-500 font-mono tracking-widest uppercase block">
            Our Foundation
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
            Values that Guide Our Studio
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
          {[
            { icon: Award, title: 'Absolute Quality', desc: 'No low-grade wood pulp composites. We double check linseed concentrations and synthetic nylon bristle snap counts.' },
            { icon: Sparkles, title: 'Limitless Creativity', desc: 'Tailor-make your personal color set by choosing exactly your 10 color pan pigments inside our custom curator.' },
            { icon: Users, title: 'Artist Community', desc: "Feature works in our Customer Showcase gallery. We sponsor creative school workshops and university bursaries." },
            { icon: Heart, title: 'Safe & Clean Materials', desc: 'All products are non-toxic, skin-safe, and shipped inside eco-friendly paper packaging wraps.' }
          ].map((val, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 space-y-3 shadow-inner">
              <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center mb-1">
                <val.icon className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm font-sans">{val.title}</h4>
              <p className="text-slate-400 text-xs leading-normal">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Crew Cards */}
      <section className="space-y-8">
        <div className="text-center max-w-sm mx-auto space-y-2">
          <span className="text-xs font-semibold text-violet-600 font-mono tracking-widest uppercase block">
            The Advisors
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Meet the Artify curators
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((tm, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-100 rounded-2xl overflow-hidden p-5 space-y-4 shadow-sm text-left group"
            >
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 relative">
                <img
                  src={tm.image}
                  alt={tm.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              
              <div className="space-y-1">
                <h4 className="font-extrabold text-slate-950 text-base font-sans">{tm.name}</h4>
                <span className="text-[10px] font-bold text-orange-600 uppercase font-mono tracking-wider">
                  {tm.role}
                </span>
                <p className="text-xs text-slate-400 leading-normal pt-2">{tm.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
