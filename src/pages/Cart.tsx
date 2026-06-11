import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingCart, Trash2, ArrowRight, ShieldCheck, Tag, X, ArrowLeft } from 'lucide-react';

export default function Cart() {
  const { 
    cart, 
    updateCartQty, 
    removeFromCart, 
    activeCoupon, 
    applyCouponByCode, 
    removeCoupon, 
    navigateTo 
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const discountAmount = activeCoupon ? (subtotal * activeCoupon.discountPercent) / 100 : 0;
  
  // Free shipping above $50
  const shippingCharge = subtotal - discountAmount > 50 ? 0 : (subtotal > 0 ? 5.99 : 0);
  const totalAmount = subtotal - discountAmount + shippingCharge;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    const res = applyCouponByCode(couponInput);
    if (res.success) {
      setPromoMessage({ text: res.message, isError: false });
      setCouponInput('');
    } else {
      setPromoMessage({ text: res.message, isError: true });
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setPromoMessage(null);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-24 px-4 font-sans text-left">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-5 text-2xl">
          🎨
        </div>
        <h2 className="text-xl font-bold text-slate-900 text-center">Your shopping cart is clean & empty</h2>
        <p className="text-slate-400 text-xs text-center mt-1 max-w-sm mx-auto leading-relaxed">
          Unlock your next master project. Our premium pigments and Japanese synthetic detailing brushes are in warehouse waiting!
        </p>
        <button
          onClick={() => navigateTo('shop')}
          className="mt-6 w-full bg-gradient-to-tr from-violet-600 to-orange-500 hover:from-violet-750 hover:to-orange-600 text-white font-bold py-3.5 rounded-xl transition-all cursor-pointer shadow-md text-sm text-center"
        >
          Explore Creativity Colors
        </button>
      </div>
    );
  }

  return (
    <div id="cart-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans text-left">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-8">
        Your Creative Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column: List items */}
        <div className="lg:col-span-8 space-y-4">
          <div className="hidden sm:grid grid-cols-12 gap-4 pb-3 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
            <span className="col-span-6">Creative Item</span>
            <span className="col-span-2 text-center">Quantity</span>
            <span className="col-span-2 text-right">Price</span>
            <span className="col-span-2 text-right">Subtotal</span>
          </div>

          <div className="space-y-4">
            {cart.map((item) => (
              <div
                id={`cart-row-${item.product.id}`}
                key={item.product.id}
                className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col sm:grid sm:grid-cols-12 gap-4 items-center"
              >
                {/* Item brief */}
                <div className="col-span-6 flex items-center space-x-4 w-full">
                  <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-xl overflow-hidden shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm sm:text-base leading-tight">
                      {item.product.name}
                    </h3>
                    <span className="text-[11px] text-slate-400 font-mono block mt-1">
                      SKU: {item.product.sku} | {item.product.categoryLabel}
                    </span>
                    
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-xs text-red-500 hover:text-red-700 font-semibold inline-flex items-center gap-1.5 mt-2 cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>
                </div>

                {/* Quantity buttons */}
                <div className="col-span-2 flex items-center justify-center">
                  <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => updateCartQty(item.product.id, item.quantity - 1)}
                      className="px-2.5 py-1.5 hover:bg-slate-50 text-slate-600 font-bold"
                    >
                      -
                    </button>
                    <span className="px-3.5 py-1 font-mono text-sm font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQty(item.product.id, item.quantity + 1)}
                      className="px-2.5 py-1.5 hover:bg-slate-50 text-slate-600 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Unit price */}
                <div className="col-span-2 text-right hidden sm:block">
                  <span className="font-semibold text-slate-900">₹{item.product.price.toFixed(2)}</span>
                </div>

                {/* Combined price */}
                <div className="col-span-2 text-right self-center w-full sm:w-auto flex sm:block items-center justify-between sm:justify-start">
                  <span className="text-xs text-slate-400 sm:hidden">Total price:</span>
                  <strong className="font-bold text-slate-900 text-sm sm:text-base">
                    ₹{(item.product.price * item.quantity).toFixed(2)}
                  </strong>
                </div>

              </div>
            ))}
          </div>

          {/* Quick return anchors */}
          <button
            onClick={() => navigateTo('shop')}
            className="inline-flex items-center gap-1 text-xs font-semibold text-violet-600 hover:text-orange-500 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Keep Selecting Materials
          </button>
        </div>

        {/* Right column: Summaries panel */}
        <div className="lg:col-span-4">
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-6">
            <h3 className="font-bold text-slate-900 text-lg border-b border-slate-100 pb-3 font-sans">
              Commission Summary
            </h3>

            {/* Calculations lines */}
            <div className="space-y-3.5 text-xs sm:text-sm text-slate-500">
              <div className="flex justify-between">
                <span>Subtotal spend:</span>
                <strong className="text-slate-800">₹{subtotal.toFixed(2)}</strong>
              </div>

              {activeCoupon && (
                <div className="flex justify-between text-rose-600 font-medium">
                  <span className="flex items-center gap-1 font-mono">
                    🏷️ Promo ({activeCoupon.code} - {activeCoupon.discountPercent}%):
                  </span>
                  <strong>-₹{discountAmount.toFixed(2)}</strong>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1">
                  📦 Archival Packing & Shipping:
                </span>
                <strong className="text-slate-800">
                  {shippingCharge === 0 ? (
                    <span className="text-emerald-600 font-bold">FREE</span>
                  ) : (
                    `₹${shippingCharge.toFixed(2)}`
                  )}
                </strong>
              </div>

              {shippingCharge > 0 && (
                <div className="text-[10px] text-orange-500 pt-1 leading-relaxed bg-orange-50/50 p-2.5 rounded-xl border border-orange-100">
                  🎨 Tip: Add <strong>₹{(50 - (subtotal - discountAmount)).toFixed(2)}</strong> more of supplies for FREE shipping nationwide!
                </div>
              )}

              <div className="pt-4 border-t border-slate-100 flex justify-between text-base font-extrabold text-slate-900">
                <span>Total amount:</span>
                <span className="bg-slate-50 px-2 rounded font-mono text-[17px]">₹{totalAmount.toFixed(2)}</span>
              </div>
            </div>

            {/* Promo coupons application form */}
            <div className="py-2.5">
              {!activeCoupon ? (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon code: CREATIVE10"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-violet-500"
                  />
                  <button
                    type="submit"
                    className="bg-slate-950 hover:bg-violet-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              ) : (
                <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs px-3.5 py-2.5 rounded-xl flex items-center justify-between font-semibold">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" /> Code <strong>{activeCoupon.code}</strong> Loaded
                  </span>
                  <button onClick={handleRemoveCoupon} className="p-1 rounded hover:bg-emerald-100 cursor-pointer">
                    <X className="w-4 h-4 text-emerald-600" />
                  </button>
                </div>
              )}

              {promoMessage && (
                <p className={`text-xs font-semibold mt-1.5 ${promoMessage.isError ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {promoMessage.text}
                </p>
              )}
            </div>

            {/* Safe badges */}
            <div className="space-y-3">
              <button
                id="proceed-checkout-btn"
                onClick={() => navigateTo('checkout')}
                className="w-full bg-gradient-to-r from-violet-600 to-orange-500 hover:from-violet-750 hover:to-orange-600 text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md text-sm"
              >
                Proceed to Checkout <ArrowRight className="w-5 h-5" />
              </button>
              
              <div className="flex items-center justify-center space-x-1.5 text-[10px] text-slate-400 font-mono">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Secure SSL Checkout Protocol Assured</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
