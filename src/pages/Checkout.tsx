import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Address, PaymentMethod } from '../types';
import { CheckCircle2, ShieldCheck, CreditCard, ChevronRight, ArrowLeft, Truck, PackageCheck, Sparkles } from 'lucide-react';

export default function Checkout() {
  const { cart, activeCoupon, user, placeOrder, navigateTo } = useApp();

  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    name: 'Jane Doe',
    email: 'renukaruttala4611@gmail.com',
    phone: '+91 98765 43210',
    street: '108 Creative Studio Parkway, Block C',
    city: 'Vizag, Andhra Pradesh',
    zip: '530001',
    carrier: 'standard',
    paymentMethodId: 'pay-1'
  });

  const [createdOrderId, setCreatedOrderId] = useState<string>('');

  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const discountAmount = activeCoupon ? (subtotal * activeCoupon.discountPercent) / 100 : 0;
  
  // Carrier cost addition
  const carrierCost = formData.carrier === 'express' ? 15.00 : (subtotal - discountAmount > 50 ? 0 : 5.99);
  const totalAmount = subtotal - discountAmount + carrierCost;

  const handleNextStep = () => {
    setStep((prev) => Math.min(prev + 1, 5));
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleCompleteOrder = () => {
    // Generate a temporary address entity
    const selectedAddress: Address = {
      id: `addr-${Date.now()}`,
      name: formData.name,
      street: formData.street,
      city: formData.city,
      zip: formData.zip,
      phone: formData.phone,
      isDefault: false
    };

    const selectedPayment: PaymentMethod = {
      id: formData.paymentMethodId,
      cardBrand: 'Visa',
      last4: '4242'
    };

    const res = placeOrder(selectedAddress, selectedPayment);
    if (res.success) {
      setCreatedOrderId(res.orderId);
      setStep(5); // goto confirmation step
    }
  };

  const selectedAddressObj = user.addresses.find((a) => a.id === 'addr-1') || user.addresses[0];

  // Steps checklist tags
  const checkoutSteps = [
    { num: 1, title: 'Details' },
    { num: 2, title: 'Address & Postal' },
    { num: 3, title: 'Courier' },
    { num: 4, title: 'Payments' },
    { num: 5, title: 'Success Receipt' }
  ];

  return (
    <div id="checkout-page-root" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans text-left">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-8">
        Studio Checkout Ledger
      </h1>

      {/* Progress navigation trail */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-6 border-b border-slate-100 mb-8">
        {checkoutSteps.map((chk) => (
          <div key={chk.num} className="flex items-center space-x-2">
            <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
              step >= chk.num 
                ? 'bg-violet-600 text-white' 
                : 'bg-slate-100 text-slate-400'
            }`}>
              {chk.num}
            </span>
            <span className={`text-xs font-semibold ${
              step >= chk.num ? 'text-slate-900' : 'text-slate-400'
            }`}>
              {chk.title}
            </span>
            {chk.num < 5 && <ChevronRight className="w-3.5 h-3.5 text-slate-300" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Main Step content panel */}
        <div className="lg:col-span-8 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-6">
          
          {/* STEP 1: Details */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-base">Step 1: Contact Guidelines</h3>
              <p className="text-xs text-slate-400">Provide an active phone number to track package progress notifications.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium">
                <div className="space-y-1.5 col-span-2">
                  <label htmlFor="chk-name" className="text-slate-500">FullName Address ID</label>
                  <input
                    id="chk-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 outline-none px-3.5 py-3 rounded-xl focus:ring-1 focus:ring-violet-500 text-slate-800"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="chk-email" className="text-slate-500">Email Address Register</label>
                  <input
                    id="chk-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 outline-none px-3.5 py-3 rounded-xl focus:ring-1 focus:ring-violet-500 text-slate-800"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="chk-phone" className="text-slate-500">Mobile Phone Coordinate</label>
                  <input
                    id="chk-phone"
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 outline-none px-3.5 py-3 rounded-xl focus:ring-1 focus:ring-violet-500 text-slate-800"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex justify-end">
                <button
                  id="chk-step-1-next"
                  onClick={handleNextStep}
                  className="bg-slate-950 hover:bg-violet-600 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all cursor-pointer flex items-center gap-1"
                >
                  Confirm Address Steps <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Address Selection */}
          {step === 2 && (
            <div className="space-y-5">
              <h3 className="font-bold text-slate-900 text-base">Step 2: Shipping Postal Address</h3>
              
              {/* Load preset address template cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {user.addresses.map((addr) => (
                  <div
                    key={addr.id}
                    onClick={() => setFormData({
                      ...formData,
                      street: addr.street,
                      city: addr.city,
                      zip: addr.zip
                    })}
                    className={`p-4 rounded-xl border text-xs cursor-pointer text-left transition-all ${
                      formData.street === addr.street
                        ? 'border-violet-600 bg-violet-50/20 shadow-sm'
                        : 'border-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <span className="font-extrabold block mb-1 text-slate-800">{addr.name}</span>
                    <p className="text-slate-500 leading-normal mb-2">{addr.street}, {addr.city}, {addr.zip}</p>
                    <span className="text-[10px] uppercase font-mono font-bold text-slate-400">
                      {addr.isDefault ? '⭐ Primary Address' : 'Secondary'}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3.5 text-xs font-medium pt-3 border-t border-slate-50">
                <span className="text-xs font-bold text-slate-700 block">Edit Custom Address Fields:</span>
                <div className="space-y-1.5">
                  <label htmlFor="chk-street" className="text-slate-500">Street & Studio Block</label>
                  <input
                    id="chk-street"
                    type="text"
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 outline-none px-3.5 py-3 rounded-xl focus:ring-1 focus:ring-violet-500 text-slate-800"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="chk-city" className="text-slate-500">City & Province</label>
                    <input
                      id="chk-city"
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 outline-none px-3.5 py-3 rounded-xl focus:ring-1 focus:ring-violet-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="chk-zip" className="text-slate-500">PIN / Zip Code</label>
                    <input
                      id="chk-zip"
                      type="text"
                      value={formData.zip}
                      onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 outline-none px-3.5 py-3 rounded-xl focus:ring-1 focus:ring-violet-500"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <button onClick={handlePrevStep} className="text-slate-400 hover:text-slate-600 text-xs font-bold inline-flex items-center gap-1 cursor-pointer">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  id="chk-step-2-next"
                  onClick={handleNextStep}
                  className="bg-slate-950 hover:bg-violet-600 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all cursor-pointer flex items-center gap-1"
                >
                  Choose Shipping Speed <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Courier Selection */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-base">Step 3: Archival Transit Speed</h3>

              <div className="space-y-3">
                {[
                  { value: 'standard', label: 'Archival Standard Transit', cost: subtotal - discountAmount > 50 ? 'FREE' : '₹5.99', schedule: 'Arrives in 3 to 5 business days. Safe, eco-friendly carton packaging.' },
                  { value: 'express', label: 'Urgent Studio Express (Courier Air)', cost: '₹15.00', schedule: 'Guaranteed arrival in 24-48 hours. Temperature-sealed bags protect oil tubes.' }
                ].map((car) => (
                  <div
                    key={car.value}
                    onClick={() => setFormData({ ...formData, carrier: car.value })}
                    className={`p-4 rounded-xl border flex items-start gap-3.5 text-xs cursor-pointer text-left transition-all ${
                      formData.carrier === car.value
                        ? 'border-violet-600 bg-violet-50/10'
                        : 'border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <Truck className="w-5 h-5 text-violet-600 mt-1 shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <strong className="text-slate-800 text-sm">{car.label}</strong>
                        <span className="font-extrabold text-violet-700">{car.cost}</span>
                      </div>
                      <p className="text-slate-400 text-[11px] leading-normal pt-1">{car.schedule}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <button onClick={handlePrevStep} className="text-slate-400 hover:text-slate-600 text-xs font-bold inline-flex items-center gap-1 cursor-pointer">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  id="chk-step-3-next"
                  onClick={handleNextStep}
                  className="bg-slate-950 hover:bg-violet-600 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all cursor-pointer flex items-center gap-1"
                >
                  Review payments <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Checkout Payments */}
          {step === 4 && (
            <div className="space-y-5">
              <h3 className="font-bold text-slate-900 text-base">Step 4: Secure Transaction gateway</h3>

              <div className="space-y-3">
                {[
                  { id: 'pay-1', label: 'Primary Visa Card (...4242)', desc: 'Pre-registered account card on files.' },
                  { id: 'paypal', label: 'PayPal & Apple Pay digital wallets', desc: 'Auto redirect popup handles credentials.' },
                  { id: 'upi', label: 'UPI / Google Pay instant transfer', desc: 'Generates secure dynamic QR code checkout scan.' }
                ].map((pay) => (
                  <div
                    key={pay.id}
                    onClick={() => setFormData({ ...formData, paymentMethodId: pay.id })}
                    className={`p-4 rounded-xl border flex items-start gap-3 text-xs cursor-pointer text-left transition-all ${
                      formData.paymentMethodId === pay.id
                        ? 'border-violet-600 bg-violet-50/20'
                        : 'border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-orange-500 mt-1 shrink-0" />
                    <div>
                      <strong className="text-slate-800 text-sm block">{pay.label}</strong>
                      <span className="text-slate-400 pt-1 block">{pay.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[10px] text-slate-400 flex items-center gap-2 font-mono">
                <ShieldCheck className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
                <span>By completing this purchase, you authorize Artify to secure-queue items from available shelves.</span>
              </div>

              {cart.length === 0 ? (
                <div className="p-4 bg-orange-50 text-orange-800 text-xs rounded-xl font-bold text-center">
                  ⚠️ Your shopping cart cleared. Click "Back" or keep selecting materials.
                </div>
              ) : (
                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  <button onClick={handlePrevStep} className="text-slate-400 hover:text-slate-600 text-xs font-bold inline-flex items-center gap-1 cursor-pointer">
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    id="chk-complete-order"
                    onClick={handleCompleteOrder}
                    className="bg-gradient-to-r from-violet-600 to-orange-500 hover:from-violet-700 hover:to-orange-600 text-white font-extrabold text-xs px-6 py-3.5 rounded-xl transition-all cursor-pointer shadow-md"
                  >
                    Confirm & Complete Commission Purchase (₹{totalAmount.toFixed(2)})
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STEP 5: SUCCESS Order Confirmation */}
          {step === 5 && (
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3 border border-emerald-100">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>
              
              <div className="space-y-2">
                <span className="text-xs font-semibold text-emerald-600 font-mono tracking-widest uppercase block">
                  Art supplies reserved successfully!
                </span>
                <h3 className="font-extrabold text-slate-900 text-xl md:text-2xl tracking-tight font-sans">
                  Your Order is En Route!
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed max-w-sm mx-auto">
                  Receipt and active tracking alerts dispatched to <strong>{formData.email}</strong>. Packing updates start in 4 hours.
                </p>
              </div>

              {/* Order specifications summary cards */}
              <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl max-w-md mx-auto text-left text-xs font-semibold space-y-2.5">
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-400">Transaction ID:</span>
                  <strong className="text-slate-800 font-mono">{createdOrderId || 'ORD-DEFAULT'}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total charge:</span>
                  <strong className="text-slate-800">₹{totalAmount.toFixed(2)}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Arrives via:</span>
                  <strong className="text-slate-800 capitalize">{formData.carrier === 'express' ? 'Urgent Studio Express' : 'Archival Standard Transit'}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Deliver Destination:</span>
                  <strong className="text-slate-800 truncate pl-3">{formData.street}, {formData.city}</strong>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 max-w-xs mx-auto">
                <button
                  id="chk-success-dashboard"
                  onClick={() => navigateTo('dashboard')}
                  className="bg-slate-950 hover:bg-slate-850 text-white font-bold text-xs py-3 rounded-xl transition-all cursor-pointer flex-1"
                >
                  My Orders History
                </button>
                <button
                  id="chk-success-shop"
                  onClick={() => navigateTo('shop')}
                  className="bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold text-xs py-3 rounded-xl transition-all cursor-pointer flex-1"
                >
                  Keep Selecting
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Right side overview sidebar */}
        {step < 5 && (
          <div className="lg:col-span-4 bg-slate-50 border border-slate-100 rounded-2xl p-6 text-xs font-medium space-y-4">
            <h4 className="font-bold text-slate-800 text-sm border-b border-slate-200 pb-3 uppercase font-mono">Ledger items</h4>
            
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.product.id} className="flex items-center space-x-2.5">
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-200 shrink-0">
                    <img src={item.product.images[0]} alt={item.product.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <h5 className="font-bold text-slate-800 truncate">{item.product.name}</h5>
                    <span className="text-[10px] text-slate-400 block font-mono">Qty: {item.quantity} x ₹{item.product.price}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Subtotal:</span>
                <span className="text-slate-800">₹{subtotal.toFixed(2)}</span>
              </div>
              {activeCoupon && (
                <div className="flex justify-between text-rose-600 font-semibold">
                  <span>Discount Code:</span>
                  <span>-₹{discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-400 font-mono">Carrier fee:</span>
                <span className="text-slate-800 font-mono">
                  {carrierCost === 0 ? 'FREE' : `₹${carrierCost.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-extrabold text-slate-900 uppercase">
                <span>Total Due:</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
