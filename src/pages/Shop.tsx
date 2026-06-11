import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { products } from '../data';
import ProductCard from '../components/ProductCard';
import { Search, Sparkles, Filter, RefreshCw, X, SlidersHorizontal, Grid3X3, List } from 'lucide-react';
import { Product } from '../types';

export default function Shop() {
  const { searchQuery, setSearchQuery } = useApp();

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedStock, setSelectedStock] = useState<string>('all');
  const [sortOption, setSortOption] = useState<string>('best-seller');
  const [aiAnalysisResult, setAiAnalysisResult] = useState<string>('');

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedLevel('all');
    setSelectedStock('all');
    setSearchQuery('');
    setAiAnalysisResult('');
  };

  // Natural Language AI Search parsing local engine
  const parsedProducts = useMemo(() => {
    let result = [...products];

    // If there is any search query, parse it intelligently
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      let hasAiAnalysis = false;
      let categoriesMatched: string[] = [];
      let levelMatched: string = '';
      let keywordsMatched: string[] = [];

      // Check medium matches
      if (q.includes('acrylic')) { categoriesMatched.push('acrylic'); hasAiAnalysis = true; }
      if (q.includes('oil')) { categoriesMatched.push('oil'); hasAiAnalysis = true; }
      if (q.includes('watercolor') || q.includes('water color') || q.includes('water-color')) { categoriesMatched.push('watercolor'); hasAiAnalysis = true; }
      if (q.includes('brush') || q.includes('brushes')) { categoriesMatched.push('brushes'); hasAiAnalysis = true; }
      if (q.includes('canvas')) { categoriesMatched.push('canvas'); hasAiAnalysis = true; }
      if (q.includes('diy') || q.includes('kit') || q.includes('kits')) { categoriesMatched.push('kits'); hasAiAnalysis = true; }
      if (q.includes('resin')) { categoriesMatched.push('resin'); hasAiAnalysis = true; }
      if (q.includes('calligraphy')) { categoriesMatched.push('calligraphy'); hasAiAnalysis = true; }
      if (q.includes('custom') || q.includes('palette') || q.includes('personalized')) { categoriesMatched.push('customized'); hasAiAnalysis = true; }

      // Check artist level matches
      if (q.includes('beginner') || q.includes('start') || q.includes('learning') || q.includes('child') || q.includes('kids')) {
        levelMatched = 'beginner';
        hasAiAnalysis = true;
      } else if (q.includes('professional') || q.includes('advanced') || q.includes('expert') || q.includes('master')) {
        levelMatched = 'professional';
        hasAiAnalysis = true;
      }

      // Check auxiliary descriptive words
      if (q.includes('cheap') || q.includes('save') || q.includes('budget') || q.includes('under')) {
        keywordsMatched.push('price-focused');
        hasAiAnalysis = true;
      }

      // Generate a descriptive user alert on what the AI analyzer has detected
      if (hasAiAnalysis) {
        let textParts = [];
        if (categoriesMatched.length > 0) textParts.push(`Category: ${categoriesMatched.map(c => c.toUpperCase()).join(', ')}`);
        if (levelMatched) textParts.push(`Level Target: ${levelMatched.toUpperCase()}`);
        if (keywordsMatched.length > 0) textParts.push('Budget optimization enabled');
        setAiAnalysisResult(`💡 AI Search parsed request - ${textParts.join(' | ')}`);
      } else {
        setAiAnalysisResult('');
      }

      // Run filtering based on tokens
      result = result.filter(prod => {
        // Broad string matching
        const textToMatch = `${prod.name} ${prod.description} ${prod.tags.join(' ')} ${prod.categoryLabel}`.toLowerCase();
        
        // Exact keyword check or broad matching
        const matchesBroad = textToMatch.includes(q);
        
        // AI semantic intersection match
        let matchesAi = true;
        if (categoriesMatched.length > 0) {
          matchesAi = categoriesMatched.includes(prod.category);
        }
        if (levelMatched && prod.artistLevel !== 'all') {
          matchesAi = matchesAi && (prod.artistLevel === levelMatched);
        }

        return matchesBroad || matchesAi;
      });
    } else {
      setAiAnalysisResult('');
    }

    // Apply structured manual controls
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }
    if (selectedLevel !== 'all') {
      result = result.filter(p => p.artistLevel === 'all' || p.artistLevel === selectedLevel);
    }
    if (selectedStock === 'in-stock') {
      result = result.filter(p => p.availability !== 'out-of-stock');
    } else if (selectedStock === 'low-stock') {
      result = result.filter(p => p.availability === 'low-stock');
    }

    // Sorting implementations
    if (sortOption === 'price-low-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high-low') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'highest-rated') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === 'newest') {
      result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    } else {
      // best-seller default
      result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    }

    return result;
  }, [searchQuery, selectedCategory, selectedLevel, selectedStock, sortOption]);

  const categories = [
    { value: 'all', label: 'All Depts' },
    { value: 'acrylic', label: 'Acrylic Paints' },
    { value: 'oil', label: 'Oil Paints' },
    { value: 'watercolor', label: 'Watercolors' },
    { value: 'brushes', label: 'Paint Brushes' },
    { value: 'canvas', label: 'Canvas/Easels' },
    { value: 'drawing', label: 'Drawing Supplies' },
    { value: 'craft', label: 'Craft Supplies' },
    { value: 'kits', label: 'DIY Kits' },
    { value: 'resin', label: 'Resin Art' },
    { value: 'calligraphy', label: 'Calligraphy' }
  ];

  return (
    <div id="shop-page-wrapper" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-left font-sans">
      
      {/* Title Header banner */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          Advanced Art Supply Catalog
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Hand-picked premium creative assets and tools for professional studio work.
        </p>
      </div>

      {/* Real-time Dynamic AI Search Bar input */}
      <div className="bg-white border border-slate-100 rounded-2xl md:rounded-3xl p-4 sm:p-5 shadow-sm mb-8 space-y-4">
        <div className="relative">
          <input
            id="workspace-smart-search"
            type="text"
            placeholder="Type 'show me water colors for beginners' or 'oak wood easel' to activate AI search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-200 outline-none rounded-xl focus:ring-2 focus:ring-violet-500 text-sm placeholder-slate-400"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* AI Intelligent response notice if parsed */}
        {aiAnalysisResult && (
          <div className="bg-violet-50/70 border border-violet-100 text-violet-700 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 animate-pulse">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span>{aiAnalysisResult}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Side: Advanced Filters Draw Panel */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <SlidersHorizontal className="w-4.5 h-4.5 text-violet-600" /> Filters
              </h3>
              <button
                onClick={handleResetFilters}
                className="text-xs font-semibold text-slate-400 hover:text-violet-600 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <RefreshCw className="w-3 h-3" /> Clear
              </button>
            </div>

            {/* Department Categories List */}
            <div className="py-4 border-b border-slate-100 space-y-2.5">
              <h4 className="text-xs font-extrabold uppercase font-mono tracking-wider text-slate-400 mb-2">Departments</h4>
              <div className="max-h-48 overflow-y-auto space-y-1.5 pr-2 custom-scrollbar">
                {categories.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setSelectedCategory(c.value)}
                    className={`block w-full text-left px-2 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                      selectedCategory === c.value
                        ? 'bg-violet-50 text-violet-700 font-semibold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Stock status */}
            <div className="py-4 space-y-3">
              <h4 className="text-xs font-extrabold uppercase font-mono tracking-wider text-slate-400">Availability</h4>
              <div className="space-y-2">
                {[
                  { value: 'all', label: 'All Products' },
                  { value: 'in-stock', label: 'Exclude Out of Stock' },
                  { value: 'low-stock', label: 'Only Low Warehouse Stock' }
                ].map((st) => (
                  <label key={st.value} className="flex items-center space-x-2 text-xs font-medium text-slate-600 cursor-pointer">
                    <input
                      type="radio"
                      name="stock-radio"
                      checked={selectedStock === st.value}
                      onChange={() => setSelectedStock(st.value)}
                      className="accent-violet-600 cursor-pointer"
                    />
                    <span>{st.label}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Right Side: Product Catalog Grid matches */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Sorting panel header bar */}
          <div className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center justify-between text-xs text-slate-500 shadow-sm font-sans">
            <div>
              We found <strong className="text-slate-800">{parsedProducts.length}</strong> masterpiece collections matching.
            </div>

            <div className="flex items-center space-x-2">
              <span className="hidden sm:inline font-medium">Sort By:</span>
              <select
                id="catalog-sort"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-700 py-1.5 px-3 rounded-lg outline-none cursor-pointer focus:ring-1 focus:ring-violet-500 font-semibold text-xs"
              >
                <option value="best-seller">Best Sellers</option>
                <option value="newest">New Arrivals</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="highest-rated">Highest Reviewed</option>
              </select>
            </div>
          </div>

          {/* Grid list matches or empty state */}
          {parsedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {parsedProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center shadow-sm max-w-lg mx-auto">
              <p className="text-4xl">🎨</p>
              <h3 className="font-bold text-slate-900 text-lg mt-3">No creative items matched your criteria</h3>
              <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                Our workshop AI couldn't align specific pigments for this text. Try adjusting your price slider or searching for tags like "brushes" or "watercolor".
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-5 bg-violet-600 hover:bg-violet-750 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow transition-all cursor-pointer"
              >
                Reset Search Filters
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
