import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { products } from '../data';
import { ShoppingCart, Heart, Star, Sparkles, ShieldCheck, HelpCircle, ArrowLeft, Send } from 'lucide-react';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { selectedProductId, addToCart, toggleWishlist, wishlist, navigateTo, addNotification } = useApp();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'info' | 'specs' | 'reviews'>('info');

  // Review states mock input
  const [userComment, setUserComment] = useState('');
  const [userRating, setUserRating] = useState(5);
  const [localReviews, setLocalReviews] = useState([
    { name: 'Gabriel Vance', rating: 5, date: 'May 11, 2026', comment: 'Fantastic texture body, mixes absolutely cleanly with transparent linseed varnishes.' },
    { name: 'Sienna Sterling', rating: 4, date: 'April 29, 2026', comment: 'Very beautiful container case and rich saturation. Took 2 days to arrive but everything arrived safely packaged.' }
  ]);

  const product = products.find((p) => p.id === selectedProductId);

  if (!product) {
    return (
      <div className="max-w-md mx-auto text-center py-20 font-sans">
        <p className="text-4xl text-slate-300">🔍</p>
        <h3 className="font-bold text-slate-900 text-lg mt-3">Product not found</h3>
        <p className="text-slate-500 text-xs mt-1">
          This art supply reference does not exist or may have been archived.
        </p>
        <button
          onClick={() => navigateTo('shop')}
          className="mt-6 bg-violet-600 hover:bg-violet-750 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer"
        >
          Back to Shop Department
        </button>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product.id);
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Cross sell items
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigateTo('cart');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userComment.trim()) return;

    const newRev = {
      name: 'Anonymous Artist (Guest)',
      rating: userRating,
      date: 'Today',
      comment: userComment
    };

    setLocalReviews([newRev, ...localReviews]);
    setUserComment('');
    addNotification('Review added successfully. Thank you for your review!');
  };

  return (
    <div id="product-detail-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-left font-sans">
      
      {/* Breadcrumb row & Back to shop link */}
      <button
        onClick={() => navigateTo('shop')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-violet-600 transition-colors mb-8 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Advanced Catalog
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left Side: Product Gallery */}
        <div className="space-y-4">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-slate-50 border border-slate-100 shadow-sm relative">
            <img
              src={product.images[activeImageIdx]}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {discountPercent > 0 && (
              <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-sm">
                Save {discountPercent}%
              </span>
            )}
          </div>
          
          {/* Gallery Thumbnails list */}
          <div className="flex items-center gap-3">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIdx(idx)}
                className={`w-20 h-20 rounded-xl overflow-hidden bg-slate-50 border transition-all cursor-pointer ${
                  activeImageIdx === idx 
                    ? 'border-violet-600 ring-2 ring-violet-50' 
                    : 'border-slate-200 hover:border-slate-400'
                }`}
              >
                <img src={img} alt="Thumbnail image" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Product Purchase controls */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase font-mono tracking-wider text-violet-600">
              {product.categoryLabel}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {product.name}
            </h1>
          </div>

          {/* Rating overview */}
          <div className="flex items-center space-x-2">
            <div className="flex text-amber-400 text-sm">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
            <span className="text-xs font-bold text-slate-600">
              {product.rating.toFixed(1)} Rating
            </span>
            <span className="text-slate-300 text-xs">|</span>
            <span className="text-xs text-slate-400">
              {product.reviewsCount} customer assessments
            </span>
          </div>

          {/* Pricing Row */}
          <div className="py-4 border-y border-slate-100 flex items-center gap-4">
            <div className="flex flex-col">
              {product.originalPrice && (
                <span className="text-sm text-slate-400 line-through">
                  ₹{product.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="text-3xl font-extrabold text-slate-900">
                ₹{product.price.toFixed(2)}
              </span>
            </div>

            <div className="ml-auto">
              <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold uppercase font-mono tracking-wide ${
                product.availability === 'in-stock' ? 'bg-emerald-50 text-emerald-600' :
                product.availability === 'low-stock' ? 'bg-amber-50 text-amber-600' : 'bg-slate-50 text-slate-400'
              }`}>
                {product.availability === 'in-stock' ? 'In Stock (Ready)' :
                 product.availability === 'low-stock' ? `Hurry Only ${product.stockCount} left!` : 'Out of Stock'}
              </span>
            </div>
          </div>

          <p className="text-slate-500 text-sm leading-relaxed">
            {product.description}
          </p>

          {/* SKU and Category details */}
          <div className="grid grid-cols-2 gap-4 text-xs font-medium py-3 px-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div>
              <span className="text-slate-400 block uppercase font-mono">Stock Keeping Unit (SKU)</span>
              <strong className="text-slate-800">{product.sku}</strong>
            </div>
            <div>
              <span className="text-slate-400 block uppercase font-mono">Category Medium</span>
              <strong className="text-slate-800 capitalize">{product.categoryLabel}</strong>
            </div>
          </div>

          {/* Quantity and Checkout Triggers */}
          {product.availability !== 'out-of-stock' && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-slate-600">Quantity:</span>
                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3.5 py-2 hover:bg-slate-50 text-slate-600 font-bold"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 font-mono text-sm font-bold text-slate-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                    className="px-3.5 py-2 hover:bg-slate-50 text-slate-600 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* CTAs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <button
                  id="add-to-cart-detail"
                  onClick={handleAddToCart}
                  className="bg-slate-950 hover:bg-slate-850 text-white font-bold py-4 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 text-sm"
                >
                  <ShoppingCart className="w-5 h-5 text-orange-400" /> Add to Cart
                </button>
                
                <button
                  id="buy-now-detail"
                  onClick={handleBuyNow}
                  className="bg-gradient-to-r from-violet-600 to-orange-500 hover:from-violet-750 hover:to-orange-600 text-white font-bold py-4 rounded-xl shadow-md transition-all cursor-pointer text-sm"
                >
                  Quick Checkout
                </button>
              </div>
            </div>
          )}

          {/* Pin Wishlist Toggle */}
          <button
            id="detail-wishlist-toggle"
            onClick={() => toggleWishlist(product.id)}
            className={`w-full py-3.5 rounded-xl border font-semibold flex items-center justify-center gap-1.5 transition-all text-xs cursor-pointer ${
              isWishlisted
                ? 'bg-red-50 border-red-100 text-red-500'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-400'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
            {isWishlisted ? 'Marked in Wishlist' : 'Pin to My Design Wishlist'}
          </button>
          
        </div>
      </div>

      {/* Tabs description and reviews segment */}
      <div className="mt-16 bg-white border border-slate-100 rounded-3xl p-6 sm:p-10 shadow-sm text-left">
        {/* Tab Headers */}
        <div className="flex border-b border-slate-100 space-x-6 text-xs sm:text-sm font-bold mb-8">
          {[
            { id: 'info', name: 'Information & Outlines' },
            { id: 'specs', name: 'Premium Specifications' },
            { id: 'reviews', name: `Verified Reviews (${localReviews.length})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-4 relative cursor-pointer ${
                activeTab === tab.id ? 'text-violet-600 font-semibold' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab.name}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-600 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Tab content bodies */}
        <div className="text-xs sm:text-sm text-slate-600 leading-relaxed min-h-[150px]">
          {activeTab === 'info' && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-base">Unleash Creative Potential</h3>
              <p>{product.description}</p>
              <p>
                All Artify paints pass through double milling processes to ensure deep dispersion on diverse materials. Manufactured in eco-conscious chemical sites minimizing volatile compounds. Keep tubes closed to preserve longevity.
              </p>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="space-y-4 max-w-2xl">
              <h3 className="font-bold text-slate-900 text-base">Composition Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 block uppercase font-mono mb-1">Materials Sourced</span>
                  <strong className="text-slate-800">{product.specs.materials}</strong>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 block uppercase font-mono mb-1">Cylinder/Box Dimensions</span>
                  <strong className="text-slate-800">{product.specs.dimensions}</strong>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 block uppercase font-mono mb-1">Optimal Use Guides</span>
                  <strong className="text-slate-800">{product.specs.usage}</strong>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-8">
              {/* Form to submit reviews */}
              <form onSubmit={handleReviewSubmit} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 max-w-xl">
                <h4 className="font-bold text-slate-800 text-xs mb-3 uppercase tracking-wider font-mono">Submit Your Review</h4>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-xs font-semibold text-slate-500">Star Rating:</span>
                  <select
                    value={userRating}
                    onChange={(e) => setUserRating(parseInt(e.target.value))}
                    className="bg-white border border-slate-200 rounded py-1 px-2 text-xs"
                  >
                    <option value="5">★★★★★ (5 Stars)</option>
                    <option value="4">★★★★☆ (4 Stars)</option>
                    <option value="3">★★★☆☆ (3 Stars)</option>
                    <option value="2">★★☆☆☆ (2 Stars)</option>
                    <option value="1">★☆☆☆☆ (1 Star)</option>
                  </select>
                </div>
                
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter honest feedback..."
                    value={userComment}
                    onChange={(e) => setUserComment(e.target.value)}
                    className="flex-1 bg-white border border-slate-200 px-3 py-2 text-xs rounded-xl focus:ring-1 focus:ring-violet-500 outline-none"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-slate-900 hover:bg-violet-600 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                  >
                    Submit <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>

              {/* Dynamic local reviews lists */}
              <div className="space-y-4">
                {localReviews.map((rev, i) => (
                  <div key={i} className="p-4 bg-white border border-slate-100 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between text-xs font-medium">
                      <strong className="text-slate-800">{rev.name}</strong>
                      <span className="text-slate-400 font-mono">{rev.date}</span>
                    </div>
                    <div className="flex text-amber-400 text-xs">
                      {Array.from({ length: 5 }).map((_, st) => (
                        <span key={st}>{st < rev.rating ? '★' : '☆'}</span>
                      ))}
                    </div>
                    <p className="text-xs text-slate-500 italic leading-relaxed">
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related products recommendation segment */}
      {relatedProducts.length > 0 && (
        <section className="mt-16 pt-12 border-t border-slate-100">
          <h2 className="text-xl font-extrabold text-slate-900 mb-6 font-sans">
            Related Supplies of Interest
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
