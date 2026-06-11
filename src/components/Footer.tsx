import React from 'react';
import { useApp } from '../context/AppContext';
import { Paintbrush, Instagram, Facebook, Youtube, Heart, MapPin, Phone, Mail, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const { navigateTo } = useApp();

  const currentYear = new Date().getFullYear();

  const handleFooterNav = (tab: string) => {
    navigateTo(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Column 1: Brand & socials */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => handleFooterNav('home')}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-orange-500 flex items-center justify-center text-white font-bold">
                <Paintbrush className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white bg-gradient-to-r from-violet-400 to-orange-400 bg-clip-text text-transparent">
                Artify
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Artify is a premier creative supplies boutique, curating the finest paints, brushes, canvas panels, and artisan workshop kits. Our mission is helper-guided access to creative expression.
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-violet-600 hover:text-white transition-colors flex items-center justify-center text-slate-400" title="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-violet-600 hover:text-white transition-colors flex items-center justify-center text-slate-400" title="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-violet-600 hover:text-white transition-colors flex items-center justify-center text-slate-400" title="YouTube">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Catalogs */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5 font-mono">Creative supplies</h4>
            <ul className="space-y-3.5 text-sm">
              <li>
                <button onClick={() => handleFooterNav('shop')} className="hover:text-violet-400 transition-colors cursor-pointer text-left">
                  Acrylic Paints
                </button>
              </li>
              <li>
                <button onClick={() => handleFooterNav('shop')} className="hover:text-violet-400 transition-colors cursor-pointer text-left">
                  Venerable Oil Tubes
                </button>
              </li>
              <li>
                <button onClick={() => handleFooterNav('shop')} className="hover:text-violet-400 transition-colors cursor-pointer text-left">
                  Transparent Watercolors
                </button>
              </li>
              <li>
                <button onClick={() => handleFooterNav('shop')} className="hover:text-violet-400 transition-colors cursor-pointer text-left">
                  Japanese Synthetic Brushes
                </button>
              </li>
              <li>
                <button onClick={() => handleFooterNav('shop')} className="hover:text-violet-400 transition-colors cursor-pointer text-left">
                  Solid Oak Studio Easels
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Corporate */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5 font-mono">Company Info</h4>
            <ul className="space-y-3.5 text-sm">
              <li>
                <button onClick={() => handleFooterNav('about')} className="hover:text-violet-400 transition-colors cursor-pointer text-left">
                  Our Story & Mission
                </button>
              </li>
              <li>
                <button onClick={() => handleFooterNav('blog')} className="hover:text-violet-400 transition-colors cursor-pointer text-left">
                  Studio Inspiration Blog
                </button>
              </li>
              <li>
                <button onClick={() => handleFooterNav('offers')} className="hover:text-violet-400 transition-colors cursor-pointer text-left">
                  Exclusive Offers
                </button>
              </li>
              <li>
                <button onClick={() => handleFooterNav('contact')} className="hover:text-violet-400 transition-colors cursor-pointer text-left">
                  Inquire & Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Help hubs */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5 font-mono">Studio Support</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>108 Creative Studio Parkway, Block C, Vizag, AP, 530001</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                <span>support@artify.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider and Sub-footer legal lines */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 font-mono">
            <span>&copy; {currentYear} Artify Ltd. Handcrafted for Creators.</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4.5 h-4.5 text-emerald-500" /> Secure SSL Checked Out
            </span>
            <span className="text-slate-700">|</span>
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
