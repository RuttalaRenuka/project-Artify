import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { products } from '../data';
import { OrderItem, Address, PaymentMethod } from '../types';
import { 
  User, 
  ShoppingBag, 
  Heart, 
  MapPin, 
  Trash2, 
  Bell, 
  X, 
  CheckCircle, 
  Package, 
  Clock, 
  CreditCard, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function Dashboard() {
  const { 
    user, 
    wishlist, 
    toggleWishlist, 
    addAddress, 
    deleteAddress, 
    clearNotifications,
    addNotification,
    addToCart,
    navigateTo
  } = useApp();

  const [activeSegment, setActiveSegment] = useState<'profile' | 'orders' | 'wishlist' | 'addresses'>('orders');

  // New Address helper state
  const [addrForm, setAddrForm] = useState({
    name: 'Jane Doe',
    street: '',
    city: 'Vizag, Andhra Pradesh',
    zip: '',
    phone: '+91 98765 43210'
  });

  const [showAddAddr, setShowAddAddr] = useState(false);

  const handleAddNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addrForm.street || !addrForm.zip) {
      alert('Kindly state complete street & PIN properties!');
      return;
    }

    const newAddr: Address = {
      id: `addr-${Date.now()}`,
      name: addrForm.name,
      street: addrForm.street,
      city: addrForm.city,
      zip: addrForm.zip,
      phone: addrForm.phone,
      isDefault: false
    };

    addAddress(newAddr);
    setShowAddAddr(false);
    setAddrForm({ ...addrForm, street: '', zip: '' });
  };

  // Resolve products in wishlist
  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  // Clear single wishlist item
  const handleRemoveWish = (id: string) => {
    toggleWishlist(id);
  };

  const handleWishAddToCart = (p: any) => {
    addToCart(p, 1);
  };

  return (
    <div id="dashboard-page-parent" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans text-left">
      
      {/* Dashboard banner */}
      <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-orange-500 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-full bg-white/20 border border-white/20 flex items-center justify-center text-xl font-black">
            JD
          </div>
          <div className="text-left space-y-0.5">
            <h2 className="text-xl font-bold flex items-center gap-1.5 font-sans">
              Jane Doe <Sparkles className="w-4 h-4 text-orange-200" />
            </h2>
            <span className="text-xs text-orange-100 font-mono block">Premium Curator Member | {user.email}</span>
          </div>
        </div>

        {/* Small stats summary widgets */}
        <div className="flex items-center space-x-6 text-xs font-mono uppercase tracking-wider font-bold">
          <div>
            <span className="block text-xl text-center font-black">{user.orders.length}</span>
            <span className="text-orange-100 text-[10px]">Historic Orders</span>
          </div>
          <div className="border-l border-white/20 h-8" />
          
          <div>
            <span className="block text-xl text-center font-black">{wishlist.length}</span>
            <span className="text-orange-100 text-[10px]">Wishlisted</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Navigation Links drawer */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col gap-1.5">
            {[
              { id: 'orders', label: 'Order History Ledger', icon: ShoppingBag },
              { id: 'wishlist', label: 'Pinned Studio Wishlist', icon: Heart },
              { id: 'addresses', label: 'Shipping Postal Addresses', icon: MapPin },
              { id: 'profile', label: 'Profile Coordinates', icon: User }
            ].map((seg) => {
              const isSelected = activeSegment === seg.id;
              const IconComp = seg.icon;
              return (
                <button
                  key={seg.id}
                  onClick={() => setActiveSegment(seg.id as any)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-violet-600 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-violet-600'
                  }`}
                >
                  <IconComp className="w-4 h-4" /> {seg.label}
                </button>
              );
            })}
          </div>

          {/* Quick Notifications panel */}
          <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1">
                <Bell className="w-3.5 h-3.5 text-orange-500 shrink-0" /> Notifications ({user.notifications.length})
              </span>
              {user.notifications.length > 0 && (
                <button
                  onClick={clearNotifications}
                  className="text-[10px] text-slate-400 hover:text-red-500 font-mono uppercase cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </div>
            
            <div className="space-y-2.5 max-h-40 overflow-y-auto text-[10px] leading-relaxed text-slate-500 text-left">
              {user.notifications.length > 0 ? (
                user.notifications.map((not, i) => (
                  <div key={i} className="p-2 bg-white border border-orange-100/50 rounded-lg">
                    {not}
                  </div>
                ))
              ) : (
                <div className="text-center text-slate-300 py-4 font-mono">No active alerts</div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side Segment detail panes */}
        <div className="lg:col-span-9 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm min-h-[350px]">
          
          {/* ORDERS HISTORIES LISTING */}
          {activeSegment === 'orders' && (
            <div className="space-y-6 text-left">
              <h3 className="font-bold text-slate-900 text-base">Your Studio Purchases</h3>
              
              {user.orders.length > 0 ? (
                <div className="space-y-5">
                  {user.orders.map((ord: OrderItem) => (
                    <div key={ord.id} className="border border-slate-100 rounded-2xl overflow-hidden p-4 sm:p-5 space-y-4">
                      
                      {/* Order brief detail banner */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs font-mono pb-3 border-b border-slate-50 gap-2">
                        <div>
                          <span className="text-slate-400 block font-bold text-[10px]">TRANSACTION ID</span>
                          <strong className="text-slate-800 text-sm select-all">{ord.id}</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 block font-bold text-[10px]">DATE PLACED</span>
                          <strong className="text-slate-800">{ord.date}</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 block font-bold text-[10px]">STATUS</span>
                          <strong className={`px-2 py-0.5 rounded text-[10px] ${
                            ord.status === 'Processing' ? 'bg-violet-50 text-violet-600' : 'bg-emerald-50 text-emerald-600'
                          }`}>
                            ● {ord.status}
                          </strong>
                        </div>
                        <div>
                          <span className="text-slate-400 block font-bold text-[10px]">TOTAL CHARGED</span>
                          <strong className="text-slate-900">₹{ord.total.toFixed(2)}</strong>
                        </div>
                      </div>

                      {/* Items loop */}
                      <div className="space-y-3">
                        {ord.items.map((it, idx) => (
                          <div key={idx} className="flex items-center space-x-3 text-xs leading-normal">
                            <div className="w-12 h-12 bg-slate-50 rounded-lg overflow-hidden shrink-0 border border-slate-100">
                              <img src={it.image} alt={it.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 text-left">
                              <h5 className="font-bold text-slate-800 line-clamp-1">{it.name}</h5>
                              <span className="text-slate-400 text-[10px]">Quantity: {it.quantity} x ₹{it.price.toFixed(2)}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Destination address summary */}
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[10px] text-slate-400 flex items-center justify-between font-mono">
                        <span>Postal Destination: <strong>{ord.shippingAddress.street}, {ord.shippingAddress.city}</strong></span>
                        <span className="text-violet-600 font-bold inline-flex items-center gap-0.5 cursor-pointer">
                          Track Shipment <ExternalLink className="w-3 h-3" />
                        </span>
                      </div>

                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 font-mono text-slate-400">No historic transactions recorded.</div>
              )}
            </div>
          )}

          {/* WISHLIST PINNED ITEMS */}
          {activeSegment === 'wishlist' && (
            <div className="space-y-6 text-left">
              <h3 className="font-bold text-slate-900 text-base">Your Pinned Art Tools</h3>

              {wishlistedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {wishlistedProducts.map((p) => (
                    <div
                      key={p.id}
                      className="bg-white border border-slate-100 rounded-xl p-3 flex items-center space-x-3 text-xs justify-between"
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        <div className="w-12 h-12 rounded bg-slate-50 overflow-hidden shrink-0">
                          <img src={p.images[0]} alt={p.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                        </div>
                        <div className="truncate text-left min-w-0">
                          <h4 className="font-bold text-slate-800 truncate">{p.name}</h4>
                          <span className="text-slate-500 font-mono">₹{p.price.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 shrink-0">
                        <button
                          onClick={() => handleWishAddToCart(p)}
                          className="bg-violet-600 hover:bg-violet-750 text-white font-bold text-[10px] px-2.5 py-1.5 rounded-lg cursor-pointer"
                        >
                          Buy
                        </button>
                        <button
                          onClick={() => handleRemoveWish(p.id)}
                          className="p-1.5 rounded hover:bg-slate-50 text-red-500 cursor-pointer"
                          title="Remove pin"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 font-mono text-slate-400">Wishlist empty. Explore materials and click heart icons!</div>
              )}
            </div>
          )}

          {/* ADDRESS PROTOCOLS */}
          {activeSegment === 'addresses' && (
            <div className="space-y-6 text-left">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-slate-900 text-base">Saved postal records</h3>
                <button
                  onClick={() => setShowAddAddr(!showAddAddr)}
                  className="bg-slate-950 hover:bg-violet-600 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer"
                >
                  {showAddAddr ? 'Cancel fields' : '+ Register New Address'}
                </button>
              </div>

              {/* Form to submit addresses */}
              {showAddAddr && (
                <form onSubmit={handleAddNewAddress} className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs font-semibold space-y-4 max-w-xl">
                  <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider font-mono">Create postal address card</h4>
                  
                  <div className="space-y-1">
                    <label htmlFor="form-street" className="text-slate-500">Street / Road Coordinates</label>
                    <input
                      id="form-street"
                      type="text"
                      placeholder="e.g. 42 Editorial Way, Sector 5..."
                      value={addrForm.street}
                      onChange={(e) => setAddrForm({ ...addrForm, street: e.target.value })}
                      className="w-full bg-white border border-slate-200 outline-none px-3 py-2 rounded-lg focus:ring-1 focus:ring-violet-500 text-slate-800"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="form-city" className="text-slate-500">City / State</label>
                      <input
                        id="form-city"
                        type="text"
                        value={addrForm.city}
                        onChange={(e) => setAddrForm({ ...addrForm, city: e.target.value })}
                        className="w-full bg-white border border-slate-200 outline-none px-3 py-2 rounded-lg focus:ring-1 focus:ring-violet-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="form-zip" className="text-slate-500">PIN Postal Zip Code</label>
                      <input
                        id="form-zip"
                        type="text"
                        placeholder="e.g. 530001"
                        value={addrForm.zip}
                        onChange={(e) => setAddrForm({ ...addrForm, zip: e.target.value })}
                        className="w-full bg-white border border-slate-200 outline-none px-3 py-2 rounded-lg focus:ring-1 focus:ring-violet-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="bg-violet-600 hover:bg-violet-750 text-white font-extrabold text-xs px-5 py-2 rounded-xl transition-all cursor-pointer"
                  >
                    Save Postal Card
                  </button>
                </form>
              )}

              {/* Loop addresses lists */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {user.addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="border border-slate-100 hover:border-violet-100 p-4 rounded-xl text-xs text-left text-slate-600 relative"
                  >
                    <strong className="block text-slate-800 text-[13px] mb-1">{addr.name}</strong>
                    <p className="leading-relaxed mb-3">{addr.street}, {addr.city}, {addr.zip}</p>
                    <p className="font-mono text-slate-400">Tel: {addr.phone}</p>
                    
                    <button
                      onClick={() => deleteAddress(addr.id)}
                      className="absolute bottom-4 right-4 text-slate-400 hover:text-red-500 p-1 rounded hover:bg-red-50 transition-colors cursor-pointer"
                      title="Delete card"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PROFILE COORDINATES PANELS */}
          {activeSegment === 'profile' && (
            <div className="space-y-5 text-left text-xs font-semibold">
              <h3 className="font-bold text-slate-900 text-base">Your Profiling Credentials</h3>
              
              <div className="max-w-md space-y-4">
                <div className="space-y-1">
                  <span className="text-slate-400 uppercase font-mono text-[10px]">Artist Full Name</span>
                  <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl text-slate-800">{user.name}</div>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-400 uppercase font-mono text-[10px]">Email Address Registered</span>
                  <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl text-slate-800">{user.email}</div>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-400 uppercase font-mono text-[10px]">Registered VIP tier status</span>
                  <div className="bg-orange-50 border border-orange-100 p-3 rounded-xl text-orange-600 flex items-center gap-1.5 font-sans font-extrabold">
                    <Sparkles className="w-4.5 h-4.5 text-orange-500 animate-pulse" /> Academy Master Scholar Class
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
