import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Address, PaymentMethod, OrderItem, Coupon } from '../types';
import { products, coupons } from '../data';

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

  // Profile and Orders persistence
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

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('artify_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('artify_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('artify_user', JSON.stringify(user));
  }, [user]);

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
    // Scroll to top of preview viewport
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

    // Spend limits
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

  const addAddress = (address: Address) => {
    setUser((prev) => {
      const updatedAddresses = address.isDefault
        ? prev.addresses.map((a) => ({ ...a, isDefault: false })).concat(address)
        : prev.addresses.concat(address);
      return { ...prev, addresses: updatedAddresses };
    });
    addNotification('Saved new shipping postal address.');
  };

  const deleteAddress = (id: string) => {
    setUser((prev) => ({
      ...prev,
      addresses: prev.addresses.filter((a) => a.id !== id)
    }));
    addNotification('Address deleted successfully.');
  };

  const addPaymentMethod = (card: PaymentMethod) => {
    setUser((prev) => ({
      ...prev,
      paymentMethods: [...prev.paymentMethods, card]
    }));
    addNotification('Registered new active payment card to files.');
  };

  const deletePaymentMethod = (id: string) => {
    setUser((prev) => ({
      ...prev,
      paymentMethods: prev.paymentMethods.filter((p) => p.id !== id)
    }));
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

    const newOrder: OrderItem = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
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

    clearCart();
    removeCoupon();
    addNotification(`Hooray! Custom supplies order ${newOrder.id} successfully queued for shipment!`);
    return { success: true, orderId: newOrder.id };
  };

  const addNotification = (message: string) => {
    setUser((prev) => ({
      ...prev,
      notifications: [message, ...prev.notifications].slice(0, 15) // max 15
    }));
  };

  const clearNotifications = () => {
    setUser((prev) => ({
      ...prev,
      notifications: []
    }));
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
        clearNotifications
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
