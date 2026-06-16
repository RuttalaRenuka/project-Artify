import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Address, PaymentMethod, OrderItem, Coupon } from '../types';
import { products, coupons } from '../data';
import { auth, db } from '../lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  query, 
  where, 
  getDocs
} from 'firebase/firestore';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

interface AppContextType {
  cart: CartItem[];
  wishlist: string[];
  currentTab: string;
  selectedProductId: string | null;
  activeCoupon: Coupon | null;
  supportOpen: boolean;
  user: {
    name: string;
    email: string;
    addresses: Address[];
    paymentMethods: PaymentMethod[];
    orders: OrderItem[];
    notifications: string[];
  };
  firebaseUser: FirebaseUser | null;
  firebaseLoading: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setSupportOpen: (open: boolean) => void;
  navigateTo: (tab: string, productId?: string | null) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQty: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  applyCouponByCode: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  addAddress: (address: Address) => void;
  deleteAddress: (id: string) => void;
  addPaymentMethod: (card: PaymentMethod) => void;
  deletePaymentMethod: (id: string) => void;
  placeOrder: (shippingAddress: Address, paymentMethod: PaymentMethod) => { success: boolean; orderId: string };
  addNotification: (message: string) => void;
  clearNotifications: () => void;
  signInWithFirebase: (email: string, pass: string) => Promise<{ success: boolean; message: string }>;
  signUpWithFirebase: (name: string, email: string, pass: string) => Promise<{ success: boolean; message: string }>;
  signOutWithFirebase: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation states
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Cart & Wishlist persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('artify_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('artify_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeCoupon, setActiveCoupon] = useState<Coupon | null>(() => {
    const saved = localStorage.getItem('artify_coupon');
    return saved ? JSON.parse(saved) : null;
  });

  const [supportOpen, setSupportOpen] = useState<boolean>(false);

  // Firestore user + loading state
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [firebaseLoading, setFirebaseLoading] = useState<boolean>(true);

  // Profile and Orders local fallback
  const [user, setUser] = useState(() => {
    const defaultAddresses: Address[] = [
      {
        id: 'addr-1',
        name: 'Jane Doe',
        street: '108 Creative Studio Parkway, Block C',
        city: 'Vizag, Andhra Pradesh',
        zip: '530001',
        phone: '+91 98765 43210',
        isDefault: true
      },
      {
        id: 'addr-2',
        name: 'Jane Doe',
        street: '42 Editorial Way, Sector 5',
        city: 'Delhi, N.C.R.',
        zip: '110001',
        phone: '+91 91234 56789',
        isDefault: false
      }
    ];

    const defaultPayments: PaymentMethod[] = [
      {
        id: 'pay-1',
        cardBrand: 'Visa',
        last4: '4242',
        expDate: '12/28'
      },
      {
        id: 'pay-2',
        cardBrand: 'PayPal',
        email: 'renukaruttala4611@gmail.com'
      }
    ];

    const defaultOrders: OrderItem[] = [
      {
        id: 'ORD-98471',
        date: 'June 03, 2026',
        items: [
          {
            productId: 'acrylic-masterpiece-24',
            name: 'Artify Masterpiece Acrylic Set (24 Colors x 22ml)',
            price: 39.99,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=80'
          },
          {
            productId: 'fineline-synthetic-brushes',
            name: 'Fineline Series Synthetic Brush Bundle (8 Pcs)',
            price: 24.99,
            quantity: 2,
            image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=80'
          }
        ],
        subtotal: 89.97,
        discount: 10.00,
        shipping: 0.00,
        total: 79.97,
        status: 'Delivered',
        shippingAddress: defaultAddresses[0]
      }
    ];

    const defaultNotifications = [
      '🎨 Welcome to Artify! Use Coupon CREATIVE10 to save 10% off your entire first collection.',
      '📦 Your recent order ORD-98471 was delivered successfully to your default creative workspace.'
    ];

    const saved = localStorage.getItem('artify_user');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      name: 'Jane Doe',
      email: 'renukaruttala4611@gmail.com',
      addresses: defaultAddresses,
      paymentMethods: defaultPayments,
      orders: defaultOrders,
      notifications: defaultNotifications
    };
  });

  // Track Auth state changed and load database synced content
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fUser) => {
      setFirebaseLoading(true);
      if (fUser) {
        setFirebaseUser(fUser);
        try {
          const userDocRef = doc(db, 'users', fUser.uid);
          const userDocSnap = await getDoc(userDocRef);
          
          let addresses: Address[] = [];
          let paymentMethods: PaymentMethod[] = [];
          let notifications: string[] = [
            `🎨 Secured Firebase environment synchronized! Logged in as ${fUser.email}.`
          ];
          let userName = fUser.displayName || fUser.email?.split('@')[0] || 'Artify Creator';

          if (userDocSnap.exists()) {
            const data = userDocSnap.data();
            addresses = data.addresses || [];
            paymentMethods = data.paymentMethods || [];
            if (data.name) userName = data.name;
          } else {
            // Initiate dynamic file record if first time registration
            const initialUserData = {
              uid: fUser.uid,
              name: userName,
              email: fUser.email || '',
              addresses: [],
              paymentMethods: [],
              createdAt: new Date().toISOString()
            };
            await setDoc(userDocRef, initialUserData);
          }

          // Fetch user's orders from "orders" collection
          const ordersQuery = query(collection(db, 'orders'), where('userId', '==', fUser.uid));
          const querySnapshot = await getDocs(ordersQuery);
          const loadedOrders: OrderItem[] = [];
          querySnapshot.forEach((docSnap) => {
            loadedOrders.push(docSnap.data() as OrderItem);
          });

          // Sort loadedOrders by date in descending order
          loadedOrders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

          setUser({
            name: userName,
            email: fUser.email || '',
            addresses,
            paymentMethods,
            orders: loadedOrders.length > 0 ? loadedOrders : [],
            notifications
          });
        } catch (error) {
          console.error("Error loading user profile details from Firestore:", error);
          handleFirestoreError(error, OperationType.GET, `users/${fUser.uid}`);
        }
      } else {
        setFirebaseUser(null);
        // Load details from localStorage when Guest/unauthenticated
        const saved = localStorage.getItem('artify_user');
        if (saved) {
          setUser(JSON.parse(saved));
        }
      }
      setFirebaseLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Local state persistence
  useEffect(() => {
    localStorage.setItem('artify_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('artify_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (!firebaseUser) {
      localStorage.setItem('artify_user', JSON.stringify(user));
    }
  }, [user, firebaseUser]);

  useEffect(() => {
    if (activeCoupon) {
      localStorage.setItem('artify_coupon', JSON.stringify(activeCoupon));
    } else {
      localStorage.removeItem('artify_coupon');
    }
  }, [activeCoupon]);

  // Actions
  const navigateTo = (tab: string, productId: string | null = null) => {
    setCurrentTab(tab);
    if (productId) {
      setSelectedProductId(productId);
    } else if (tab !== 'product-detail') {
      setSelectedProductId(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex((item) => item.product.id === product.id);
      if (existingIdx > -1) {
        const nextCart = [...prev];
        nextCart[existingIdx] = {
          ...nextCart[existingIdx],
          quantity: nextCart[existingIdx].quantity + quantity
        };
        addNotification(`Updated quantity of "${product.name}" in your shopping cart.`);
        return nextCart;
      }
      addNotification(`Added "${product.name}" to your shopping cart successfully.`);
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      const removedItem = prev.find((item) => item.product.id === productId);
      if (removedItem) {
        addNotification(`Removed "${removedItem.product.name}" from your shopping cart.`);
      }
      return prev.filter((item) => item.product.id !== productId);
    });
  };

  const updateCartQty = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const found = prev.includes(productId);
      const matchedProd = products.find(p => p.id === productId);
      const prodName = matchedProd ? matchedProd.name : 'Product';
      if (found) {
        addNotification(`Removed "${prodName}" from your wishlist.`);
        return prev.filter((id) => id !== productId);
      } else {
        addNotification(`Pencil-marked "${prodName}" to your design wishlist.`);
        return [...prev, productId];
      }
    });
  };

  const applyCouponByCode = (code: string) => {
    const formattedCode = code.toUpperCase().trim();
    const matched = coupons.find((c) => c.code === formattedCode);
    if (!matched) {
      return { success: false, message: 'Invalid coupon. Try coupon code "CREATIVE10"!' };
    }

    const sub = cart.reduce((tot, item) => tot + item.product.price * item.quantity, 0);
    if (matched.minSpend && sub < matched.minSpend) {
      return { success: false, message: `This coupon requires a minimum subtotal spend of $${matched.minSpend}.` };
    }

    setActiveCoupon(matched);
    addNotification(`Promo Discount Coupon "${matched.code}" (${matched.discountPercent}% Off) applied to your order.`);
    return { success: true, message: `Successfully loaded ${matched.discountPercent}% OFF coupon value!` };
  };

  const removeCoupon = () => {
    setActiveCoupon(null);
  };

  const addAddress = async (address: Address) => {
    let updatedAddresses: Address[] = [];
    setUser((prev) => {
      updatedAddresses = address.isDefault
        ? prev.addresses.map((a) => ({ ...a, isDefault: false })).concat(address)
        : prev.addresses.concat(address);
      return { ...prev, addresses: updatedAddresses };
    });

    if (auth.currentUser) {
      try {
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userDocRef, { addresses: updatedAddresses });
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, `users/${auth.currentUser.uid}`);
      }
    }
    addNotification('Saved new shipping postal address.');
  };

  const deleteAddress = async (id: string) => {
    let updatedAddresses: Address[] = [];
    setUser((prev) => {
      updatedAddresses = prev.addresses.filter((a) => a.id !== id);
      return { ...prev, addresses: updatedAddresses };
    });

    if (auth.currentUser) {
      try {
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userDocRef, { addresses: updatedAddresses });
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, `users/${auth.currentUser.uid}`);
      }
    }
    addNotification('Address deleted successfully.');
  };

  const addPaymentMethod = async (card: PaymentMethod) => {
    let updatedPayments: PaymentMethod[] = [];
    setUser((prev) => {
      updatedPayments = [...prev.paymentMethods, card];
      return { ...prev, paymentMethods: updatedPayments };
    });

    if (auth.currentUser) {
      try {
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userDocRef, { paymentMethods: updatedPayments });
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, `users/${auth.currentUser.uid}`);
      }
    }
    addNotification('Registered new active payment card to files.');
  };

  const deletePaymentMethod = async (id: string) => {
    let updatedPayments: PaymentMethod[] = [];
    setUser((prev) => {
      updatedPayments = prev.paymentMethods.filter((p) => p.id !== id);
      return { ...prev, paymentMethods: updatedPayments };
    });

    if (auth.currentUser) {
      try {
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userDocRef, { paymentMethods: updatedPayments });
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, `users/${auth.currentUser.uid}`);
      }
    }
    addNotification('Payment record deleted from files.');
  };

  const placeOrder = (shippingAddress: Address, paymentMethod: PaymentMethod) => {
    if (cart.length === 0) {
      return { success: false, orderId: '' };
    }

    const subtotal = cart.reduce((tot, item) => tot + item.product.price * item.quantity, 0);
    const discount = activeCoupon ? (subtotal * activeCoupon.discountPercent) / 100 : 0;
    const shipping = subtotal - discount > 50 ? 0 : 5.99;
    const total = subtotal - discount + shipping;

    const orderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: OrderItem = {
      id: orderId,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      items: cart.map((c) => ({
        productId: c.product.id,
        name: c.product.name,
        price: c.product.price,
        quantity: c.quantity,
        image: c.product.images[0]
      })),
      subtotal: parseFloat(subtotal.toFixed(2)),
      discount: parseFloat(discount.toFixed(2)),
      shipping,
      total: parseFloat(total.toFixed(2)),
      status: 'Processing',
      shippingAddress
    };

    setUser((prev) => ({
      ...prev,
      orders: [newOrder, ...prev.orders]
    }));

    if (auth.currentUser) {
      const dbOrder = {
        ...newOrder,
        userId: auth.currentUser.uid
      };
      const orderDocRef = doc(db, 'orders', orderId);
      setDoc(orderDocRef, dbOrder)
        .catch((err) => {
          handleFirestoreError(err, OperationType.CREATE, `orders/${orderId}`);
        });
    }

    clearCart();
    removeCoupon();
    addNotification(`Hooray! Custom supplies order ${newOrder.id} successfully queued for shipment!`);
    return { success: true, orderId: orderId };
  };

  const addNotification = (message: string) => {
    setUser((prev) => ({
      ...prev,
      notifications: [message, ...prev.notifications].slice(0, 15)
    }));
  };

  const clearNotifications = () => {
    setUser((prev) => ({
      ...prev,
      notifications: []
    }));
  };

  // Firebase auth bindings
  const signInWithFirebase = async (email: string, pass: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      addNotification(`Signed in successfully as ${email}. Welcome back to Artify!`);
      return { success: true, message: 'Logged in successfully!' };
    } catch (err: any) {
      console.error(err);
      return { success: false, message: err?.message || 'Authentication failed. Please check credentials.' };
    }
  };

  const signUpWithFirebase = async (name: string, email: string, pass: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      const fUser = userCredential.user;
      
      const userDocRef = doc(db, 'users', fUser.uid);
      await setDoc(userDocRef, {
        uid: fUser.uid,
        name: name,
        email: email,
        addresses: [],
        paymentMethods: [],
        createdAt: new Date().toISOString()
      });

      addNotification(`Registered successfully as ${email}. Welcome to Artify!`);
      return { success: true, message: 'Account created successfully!' };
    } catch (err: any) {
      console.error(err);
      return { success: false, message: err?.message || 'Registration failed. Try checking details or existing email.' };
    }
  };

  const signOutWithFirebase = async () => {
    try {
      await signOut(auth);
      addNotification('Signed out from Firebase secure node.');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        wishlist,
        currentTab,
        selectedProductId,
        activeCoupon,
        supportOpen,
        user,
        firebaseUser,
        firebaseLoading,
        searchQuery,
        setSearchQuery,
        setSupportOpen,
        navigateTo,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        toggleWishlist,
        applyCouponByCode,
        removeCoupon,
        addAddress,
        deleteAddress,
        addPaymentMethod,
        deletePaymentMethod,
        placeOrder,
        addNotification,
        clearNotifications,
        signInWithFirebase,
        signUpWithFirebase,
        signOutWithFirebase
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
