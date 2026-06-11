import React from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { Heart, Star, ShoppingCart, Eye, Sparkles, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function ProductCard({ product }: { product: Product; key?: any }) {
  const { addToCart, toggleWishlist, wishlist, navigateTo } = useApp();

  const isWishlisted = wishlist.includes(product.id);
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleCardClick = () => {
    navigateTo('product-detail', product.id);
  };

  return (
    <motion.div
      id={`product-card-${product.id}`}
      whileHover={{ y: -6 }}
      onClick={handleCardClick}
      className="bg-white rounded-2xl border border-slate-100 hover:border-violet-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full group cursor-pointer relative"
    >
      {/* Badge Tags & Heart Button */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 pointer-events-none">
        {product.isBestSeller && (
          <span className="bg-orange-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5" /> Best Seller
          </span>
        )}
        {product.isNewArrival && (
          <span className="bg-teal-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
            New
          </span>
        )}
        {discountPercent > 0 && (
          <span className="bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
            Save {discountPercent}%
          </span>
        )}
      </div>

      <button
        id={`wish-btn-${product.id}`}
        onClick={handleToggleWishlist}
        className={`absolute top-4 right-4 z-10 p-2.5 rounded-full border shadow-sm transition-all duration-300 cursor-pointer ${
          isWishlisted
            ? 'bg-red-50 border-red-100 text-red-500'
            : 'bg-white/80 backdrop-blur-sm border-slate-100 text-slate-500 hover:text-red-500 hover:bg-red-50'
        }`}
        title={isWishlisted ? "Remove from Wishlist" : "Pin to Wishlist"}
      >
        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500' : ''}`} />
      </button>

      {/* Main Product Image Container */}
      <div className="relative aspect-[4/3] bg-slate-50 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Quick View Button on Hover */}
        <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="bg-white/95 text-slate-900 text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1.5 hover:bg-slate-900 hover:text-white transition-all">
            <Eye className="w-4 h-4" /> Quick View
          </span>
        </div>
      </div>

      {/* Product Information Body */}
      <div className="p-4 md:p-5 flex-1 flex flex-col">
        {/* Category badge */}
        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 mb-2 font-mono uppercase tracking-wider">
          <span>{product.categoryLabel}</span>
        </div>

        {/* Product Title */}
        <h3 className="font-sans text-sm md:text-base font-semibold text-slate-900 line-clamp-2 mb-1.5 group-hover:text-violet-600 transition-colors">
          {product.name}
        </h3>

        {/* Rating and Review Count */}
        <div className="flex items-center space-x-1.5 mb-3">
          <div className="flex text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-slate-200'
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-medium text-slate-500">
            {product.rating.toFixed(1)}
          </span>
          <span className="text-[11px] text-slate-300">|</span>
          <span className="text-xs text-slate-400">
            ({product.reviewsCount})
          </span>
        </div>

        {/* Price & Cart Segment at the bottom */}
        <div className="mt-auto pt-3 border-t border-slate-50 flex items-end justify-between">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through">
                ₹{product.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-[17px] font-bold text-slate-900">
              ₹{product.price.toFixed(2)}
            </span>
          </div>

          <div>
            {product.availability === 'out-of-stock' ? (
              <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> Out of stock
              </span>
            ) : (
              <button
                id={`add-cart-btn-${product.id}`}
                onClick={handleAddToCart}
                className="bg-violet-600 hover:bg-violet-700 text-white p-2.5 rounded-xl flex items-center justify-center shadow-md shadow-violet-100 hover:shadow-violet-200 transition-all cursor-pointer"
                title="Add to Cart"
              >
                <ShoppingCart className="w-4.5 h-4.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
