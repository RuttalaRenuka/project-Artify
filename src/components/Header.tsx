import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Heart, ShoppingCart, User, Menu, X, Sparkles, Bell, Paintbrush } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const { 
    cart, 
    wishlist, 
    currentTab, 
    navigateTo, 
    searchQuery, 
    setSearchQuery, 
    user 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlist.length;
  const unreadNotifications = user.notifications.length;

  const navLinks = [
    { label: 'Home', tab: 'home' },
    { label: 'Shop', tab: 'shop' },
    { label: 'Offers', tab: 'offers' },
    { label: 'About Us', tab: 'about' },
    { label: 'Blog', tab: 'blog' },
    { label: 'Contact', tab: 'contact' }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchQuery(searchInput.trim());
      navigateTo('shop');
      setShowSearch(false);
    }
  };

  const handleQuickSearch = (keyword: string) => {
    setSearchInput(keyword);
    setSearchQuery(keyword);
    navigateTo('shop');
    setShowSearch(false);
  };

  return (
    <header id="main-header" className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo element */}
          <div className="flex items-center space-x-2 shrink-0 cursor-pointer" onClick={() => navigateTo('home')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-orange-500 flex items-center justify-center text-white font-bold shadow-md shadow-violet-200">
              <Paintbrush className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-r from-violet-700 to-orange-500 bg-clip-text text-transparent">
                Artify
              </span>
              <span className="hidden leading-3 sm:block text-[9px] text-slate-400 font-mono tracking-wider uppercase font-medium">
                Unleash Creativity
              </span>
            </div>
          </div>

          {/* Core Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = currentTab === link.tab;
              return (
                <button
                  id={`nav-link-${link.tab}`}
                  key={link.tab}
                  onClick={() => navigateTo(link.tab)}
                  className={`text-[15px] font-medium relative py-2 transition-colors cursor-pointer ${
                    isActive ? 'text-violet-600 font-semibold' : 'text-slate-600 hover:text-violet-600'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeHeaderIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-600 to-orange-500 rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action icon links */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Quick search toggle */}
            <div className="relative">
              <button
                id="header-search-toggle"
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 text-slate-600 hover:text-violet-600 hover:bg-slate-50 rounded-full transition-all cursor-pointer"
                title="Search Products"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Wishlist Link */}
            <button
              id="header-wishlist-btn"
              onClick={() => navigateTo('dashboard')}
              className="p-2 text-slate-600 hover:text-orange-500 hover:bg-slate-50 rounded-full transition-all relative cursor-pointer"
              title="View Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-orange-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center animate-bounce">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Link */}
            <button
              id="header-cart-btn"
              onClick={() => navigateTo('cart')}
              className="p-2 text-slate-600 hover:text-violet-600 hover:bg-slate-50 rounded-full transition-all relative cursor-pointer animate-none"
              title="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-violet-600 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Profile dashboard */}
            <button
              id="header-account-btn"
              onClick={() => navigateTo('dashboard')}
              className={`p-2 rounded-full transition-all flex items-center space-x-1 border cursor-pointer ${
                currentTab === 'dashboard'
                  ? 'border-violet-600 text-violet-600 bg-violet-50/50'
                  : 'border-slate-100 text-slate-600 hover:text-violet-600 hover:bg-slate-50'
              }`}
              title="My Account Dashboard"
            >
              <User className="w-5 h-5" />
              <span className="hidden md:inline text-xs font-semibold px-1">{user.name.split(' ')[0]}</span>
              {unreadNotifications > 0 && (
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse inline-block" />
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              id="header-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-violet-600 hover:bg-slate-50 rounded-full transition-all cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Floating search input drawer */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-20 left-0 right-0 bg-white border-b border-slate-100 shadow-md py-4 px-4 sm:px-6 lg:px-8 z-40"
          >
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <input
                  id="search-overlay-input"
                  type="text"
                  placeholder="Ask Artify: 'watercolor paints for beginners' or 'heavy-duty easels'..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full pl-12 pr-28 py-3 bg-slate-50 text-slate-800 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-sm"
                  autoFocus
                />
                <Search className="absolute left-4 w-5 h-5 text-slate-400" />
                <button
                  id="search-submit-btn"
                  type="submit"
                  className="absolute right-2 bg-violet-600 hover:bg-violet-700 text-white px-4 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-all cursor-pointer"
                >
                  Search
                </button>
              </form>
              
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="font-medium text-slate-700 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-orange-500" /> Dynamic AI Phrases:
                </span>
                {['beginner watercolor', 'professional oil tubes', 'custom set', 'highly-rated brush', 'kids paint'].map((phrase) => (
                  <button
                    key={phrase}
                    onClick={() => handleQuickSearch(phrase)}
                    className="bg-slate-100 hover:bg-violet-50 hover:text-violet-600 px-3 py-1 rounded-full text-[11px] transition-colors cursor-pointer"
                  >
                    "{phrase}"
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-slate-100 shadow-inner overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => {
                const isActive = currentTab === link.tab;
                return (
                  <button
                    id={`mobile-nav-${link.tab}`}
                    key={link.tab}
                    onClick={() => {
                      navigateTo(link.tab);
                      setMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left px-3 py-3 rounded-lg text-base font-semibold transition-colors cursor-pointer ${
                      isActive 
                        ? 'bg-violet-50 text-violet-700' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-violet-600'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
              
              <div className="border-t border-slate-100 pt-4 mt-4 space-y-4">
                <div className="flex items-center justify-between px-3">
                  <span className="text-sm font-semibold text-slate-500">Fast Navigation Actions</span>
                  {unreadNotifications > 0 && (
                    <span className="bg-orange-100 text-orange-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {unreadNotifications} alerts
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => { navigateTo('cart'); setMobileMenuOpen(false); }}
                    className="flex items-center justify-center space-x-2 py-3 border border-slate-100 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4 text-violet-600" />
                    <span>Cart ({cartCount})</span>
                  </button>
                  <button
                    onClick={() => { navigateTo('dashboard'); setMobileMenuOpen(false); }}
                    className="flex items-center justify-center space-x-2 py-3 border border-slate-100 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    <Heart className="w-4 h-4 text-orange-500" />
                    <span>Wishlist ({wishlistCount})</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
