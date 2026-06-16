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
  ExternalLink,
  Lock,
  Mail,
  UserPlus,
  LogIn,
  LogOut,
  ShieldCheck,
  CloudLightning,
  AlertTriangle,
  Flame
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
    navigateTo,
    firebaseUser,
    firebaseLoading,
    signInWithFirebase,
    signUpWithFirebase,
    signOutWithFirebase
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

  // Authentication inputs
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [authName, setAuthName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');
  const [submittingAuth, setSubmittingAuth] = useState(false);

  const handleAddNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addrForm.street || !addrForm.zip) {
      alert('Kindly state complete street & PIN properties!');
      return;
    }

    const newAddr: Address = {
      id: `addr-${Date.now()}`,
      name: firebaseUser ? (firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Jane Doe') : user.name,
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

  // Handle Auth submission
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');
    if (!authEmail || !authPassword) {
      setAuthError('Please fill in all email and password fields.');
      return;
    }
    if (authMode === 'signup' && !authName) {
      setAuthError('Please state your author/creator display name.');
      return;
    }

    setSubmittingAuth(true);
    try {
      if (authMode === 'signin') {
        const res = await signInWithFirebase(authEmail, authPassword);
        if (res.success) {
          setAuthSuccess(res.message);
          setAuthPassword('');
        } else {
          setAuthError(res.message);
        }
      } else {
        const res = await signUpWithFirebase(authName, authEmail, authPassword);
        if (res.success) {
          setAuthSuccess('Account registered successfully! Welcome aboard.');
          setAuthPassword('');
          setAuthName('');
        } else {
          setAuthError(res.message);
        }
      }
    } catch (err: any) {
      setAuthError(err?.message || 'Error occurred during authentication.');
    } finally {
      setSubmittingAuth(false);
    }
  };

  // Quick fill tester credentials
  const fillSampleCredentials = (type: 'new' | 'demo') => {
    setAuthError('');
    setAuthSuccess('');
    if (type === 'demo') {
      setAuthEmail('creator@artify.com');
      setAuthPassword('artify123');
      setAuthMode('signin');
    } else {
      const rand = Math.floor(Math.random() * 8999 + 1000);
      setAuthEmail(`scholar.${rand}@artify.com`);
      setAuthPassword('artify123');
      setAuthName('Elite Scholar');
      setAuthMode('signup');
    }
  };

  if (firebaseLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px]">
        <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mb-4" />
        <h4 className="text-slate-800 font-bold text-sm tracking-tight">Syncing Firebase Active Node...</h4>
        <p className="text-xs text-slate-400 mt-1">Connecting client safely to project: <span className="font-mono text-slate-500">artify-115fc</span></p>
      </div>
    );
  }

  return (
    <div id="dashboard-page-parent" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans text-left">
      
      {/* Dynamic Firebase Connection Ribbon */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 bg-white border border-slate-100 p-4 rounded-2xl shadow-sm">
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full ${firebaseUser ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'} shrink-0`} />
          <div>
            <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-slate-400">Database Synchronizer Status</span>
            <h5 className="text-xs font-bold text-slate-800 flex items-center gap-1">
              {firebaseUser ? (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Fully synchronized under secure Auth (UID: {firebaseUser.uid})
                </>
              ) : (
                <>
                  <CloudLightning className="w-3.5 h-3.5 text-amber-500 animate-bounce" /> Local Offline Sandbox mode — Auth unlinked
                </>
              )}
            </h5>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {firebaseUser ? (
            <button
              onClick={signOutWithFirebase}
              className="px-3.5 py-1.5 border border-slate-200 text-slate-600 hover:text-red-500 hover:border-red-200 hover:bg-red-50/50 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          ) : (
            <div className="text-xs font-semibold text-slate-400 flex items-center gap-1">
              <Flame className="w-4 h-4 text-orange-500 shrink-0" /> Real Firebase Activated (Project ID: artify-115fc)
            </div>
          )}
        </div>
      </div>

      {firebaseUser ? (
        <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-orange-500 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-full bg-white/20 border border-white/20 flex items-center justify-center text-xl font-black uppercase text-pink-100">
              {user.name.slice(0, 2)}
            </div>
            <div className="text-left space-y-0.5">
              <h2 className="text-xl font-bold flex items-center gap-1.5 font-sans whitespace-nowrap">
                {user.name} <Sparkles className="w-4 h-4 text-orange-200" />
              </h2>
              <span className="text-xs text-orange-100 font-mono block">Synchronized Studio Member | {user.email}</span>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-xs font-mono uppercase tracking-wider font-bold shrink-0">
            <div>
              <span className="block text-xl text-center font-black">{user.orders.length}</span>
              <span className="text-orange-100 text-[10px]">Cloud Orders</span>
            </div>
            <div className="border-l border-white/20 h-8" />
            
            <div>
              <span className="block text-xl text-center font-black">{wishlist.length}</span>
              <span className="text-orange-100 text-[10px]">Wishlisted</span>
            </div>
          </div>
        </div>
      ) : (
        /* Onboarding Auth Widget */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8 items-stretch">
          <div className="lg:col-span-7 bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <span className="bg-violet-50 text-violet-700 font-mono text-[10px] font-extrabold px-3 py-1 rounded-full uppercase inline-block">
                Firebase Web SDK Integration
              </span>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Welcome to your secure Artify Workspace
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                Connect seamlessly with our live database on Firebase to store your shipping addresses, payment details, and complete order history directly in the cloud. Placed orders sync immediately with Firebase Firestore collections.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-3">
              <h5 className="font-bold text-xs uppercase text-slate-700 tracking-wider font-mono flex items-center gap-1.5">
                <CloudLightning className="w-4 h-4 text-violet-600 animate-pulse" /> Sandboxed Sandbox Credentials:
              </h5>
              <p className="text-xs text-slate-500">
                Instantly connect using standard mock users, or register a new custom account:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  onClick={() => fillSampleCredentials('demo')}
                  className="bg-white hover:bg-slate-100 border border-slate-200 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 transition cursor-pointer flex items-center gap-1"
                >
                  <LogIn className="w-3.5 h-3.5 text-violet-600" /> Load Demo Account
                </button>
                <button
                  onClick={() => fillSampleCredentials('new')}
                  className="bg-white hover:bg-slate-100 border border-slate-200 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 transition cursor-pointer flex items-center gap-1"
                >
                  <UserPlus className="w-3.5 h-3.5 text-orange-500" /> Generate Random User
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex border-b border-slate-100 mb-6">
              <button
                onClick={() => setAuthMode('signin')}
                className={`flex-1 pb-3 text-sm font-bold border-b-2 transition-all cursor-pointer ${
                  authMode === 'signin' ? 'border-violet-600 text-violet-600' : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setAuthMode('signup')}
                className={`flex-1 pb-3 text-sm font-bold border-b-2 transition-all cursor-pointer ${
                  authMode === 'signup' ? 'border-violet-600 text-violet-600' : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                Create Account
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {authError && (
                <div className="bg-red-50 border border-red-100 text-red-600 px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-start gap-1.5 animate-headShake">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{authError}</span>
                </div>
              )}
              {authSuccess && (
                <div className="bg-emerald-50 border border-emerald-100 text-emerald-600 px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-start gap-1.5">
                  <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{authSuccess}</span>
                </div>
              )}

              {authMode === 'signup' && (
                <div className="space-y-1">
                  <label htmlFor="authName-input" className="text-xs font-bold text-slate-500">Artist Profile Name</label>
                  <input
                    id="authName-input"
                    type="text"
                    required
                    placeholder="e.g. Jane Doe"
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    className="w-full text-xs font-medium border border-slate-200 outline-none px-3.5 py-3 rounded-xl focus:ring-1 focus:ring-violet-500 bg-white"
                  />
                </div>
              )}

              <div className="space-y-1">
                <label htmlFor="authEmail-input" className="text-xs font-bold text-slate-500">Email Address</label>
                <div className="relative">
                  <input
                    id="authEmail-input"
                    type="email"
                    required
                    placeholder="e.g. creator@artify.com"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    className="w-full text-xs font-medium border border-slate-200 outline-none pl-10 pr-4 py-3 rounded-xl focus:ring-1 focus:ring-violet-500 bg-white"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="authPassword-input" className="text-xs font-bold text-slate-500">Password</label>
                <div className="relative">
                  <input
                    id="authPassword-input"
                    type="password"
                    required
                    placeholder="Secure password (min 6 characters)"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    className="w-full text-xs font-medium border border-slate-200 outline-none pl-10 pr-4 py-3 rounded-xl focus:ring-1 focus:ring-violet-500 bg-white"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                </div>
              </div>

              <button
                type="submit"
                disabled={submittingAuth}
                className="w-full bg-violet-600 hover:bg-violet-750 text-white font-extrabold text-xs py-3 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-violet-100 disabled:opacity-50"
              >
                {submittingAuth ? (
                  <>
                    <div className="w-4.5 h-4.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Connecting Secure Auth...
                  </>
                ) : authMode === 'signin' ? (
                  <>
                    <LogIn className="w-4.5 h-4.5" /> Access Registered Dashboard
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4.5 h-4.5" /> Initialize Scholar Profile
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Navigation Links drawer */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col gap-1.5">
            {[
              { id: 'orders', label: firebaseUser ? 'Cloud Historical Orders' : 'Order History Ledger', icon: ShoppingBag },
              { id: 'wishlist', label: 'Pinned Studio Wishlist', icon: Heart },
              { id: 'addresses', label: firebaseUser ? 'Cloud Shipping Addresses' : 'Shipping Postal Addresses', icon: MapPin },
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
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-base">Your Studio Purchases</h3>
                {firebaseUser && (
                  <span className="bg-emerald-50 text-emerald-700 text-[10px] font-mono font-bold px-2 py-1 rounded-lg border border-emerald-100">
                    Live Cloud Sync Active
                  </span>
                )}
              </div>
              
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
                <div className="text-center py-10 font-mono text-slate-400">
                  {firebaseUser ? (
                    "No historic transactions in cloud DB. Place some orders on Cart or Checkout!"
                  ) : (
                    "No historic transactions recorded."
                  )}
                </div>
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
                <h3 className="font-bold text-slate-900 text-base">Saved Postal Records</h3>
                <button
                  onClick={() => setShowAddAddr(!showAddAddr)}
                  className="bg-slate-950 hover:bg-violet-600 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer"
                >
                  {showAddAddr ? 'Cancel Fields' : '+ Register New Address'}
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
                      required
                      placeholder="e.g. 42 Editorial Way, Sector 5..."
                      value={addrForm.street}
                      onChange={(e) => setAddrForm({ ...addrForm, street: e.target.value })}
                      className="w-full bg-white border border-slate-200 outline-none px-3 py-2 rounded-lg focus:ring-1 focus:ring-violet-500 text-slate-800 animate-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="form-city" className="text-slate-500">City / State</label>
                      <input
                        id="form-city"
                        type="text"
                        required
                        value={addrForm.city}
                        onChange={(e) => setAddrForm({ ...addrForm, city: e.target.value })}
                        className="w-full bg-white border border-slate-200 outline-none px-3 py-2 rounded-lg focus:ring-1 focus:ring-violet-500 text-slate-800 animate-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="form-zip" className="text-slate-500">PIN Postal Zip Code</label>
                      <input
                        id="form-zip"
                        type="text"
                        required
                        placeholder="e.g. 530001"
                        value={addrForm.zip}
                        onChange={(e) => setAddrForm({ ...addrForm, zip: e.target.value })}
                        className="w-full bg-white border border-slate-200 outline-none px-3 py-2 rounded-lg focus:ring-1 focus:ring-violet-500 text-slate-800 animate-none"
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
                {user.addresses && user.addresses.length > 0 ? (
                  user.addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="border border-slate-100 hover:border-violet-100 p-4 rounded-xl text-xs text-left text-slate-600 relative bg-white"
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
                  ))
                ) : (
                  <div className="col-span-2 text-center py-8 font-mono text-slate-400">No saved postal coordinates. Click standard button to add one!</div>
                )}
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
                  <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl text-slate-800 font-bold">{user.name}</div>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-400 uppercase font-mono text-[10px]">Email Address Registered</span>
                  <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl text-slate-800 font-mono">{user.email}</div>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-400 uppercase font-mono text-[10px]">Registered VIP Tier Status</span>
                  <div className="bg-orange-50 border border-orange-100 p-3.5 rounded-xl text-orange-600 flex items-center gap-1.5 font-sans font-extrabold text-xs">
                    <Sparkles className="w-4.5 h-4.5 text-orange-500 animate-pulse" /> Academy Master Scholar Class
                  </div>
                </div>
                {firebaseUser ? (
                  <div className="space-y-1 pt-2">
                    <span className="text-slate-400 uppercase font-mono text-[10px]">Cloud Connection Metrics</span>
                    <div className="bg-emerald-50/50 border border-emerald-100 p-3.5 rounded-xl text-emerald-700 font-bold flex flex-col gap-1 font-mono text-[11px]">
                      <span>Authentication Node: Firebase Auth</span>
                      <span>Relational Store: Google Cloud Firestore</span>
                      <span>Realtime Listening: Active (Yes)</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1 pt-2">
                    <span className="text-slate-400 uppercase font-mono text-[10px]">Cloud Connection Metrics</span>
                    <div className="bg-amber-50 border border-amber-100 p-3.5 rounded-xl text-amber-700 font-bold flex flex-col gap-1 font-mono text-[11px]">
                      <span>Authentication Node: None (Guest Session)</span>
                      <span>Persisted Database: Local Storage Sandbox</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
