export interface Product {
  id: string;
  name: string;
  category: 'acrylic' | 'oil' | 'watercolor' | 'brushes' | 'canvas' | 'drawing' | 'craft' | 'customized' | 'kits' | 'calligraphy' | 'resin';
  categoryLabel: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  sku: string;
  availability: 'in-stock' | 'low-stock' | 'out-of-stock';
  stockCount: number;
  specs: {
    materials: string;
    dimensions: string;
    usage: string;
  };
  artistLevel: 'beginner' | 'professional' | 'all';
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  zip: string;
  phone: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  id: string;
  cardBrand: 'Visa' | 'MasterCard' | 'Amex' | 'PayPal' | 'GooglePay';
  last4?: string;
  expDate?: string;
  email?: string;
}

export interface OrderItem {
  id: string;
  date: string;
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  shippingAddress: Address;
}

export interface Coupon {
  id: string;
  code: string;
  discountPercent: number;
  description: string;
  expiryDate: string;
  minSpend?: number;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  snippet: string;
  content: string;
  author: string;
  date: string;
  image: string;
  readTime: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
}

export interface CustomerShowcase {
  id: string;
  image: string;
  artist: string;
  title: string;
  likes: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  time: string;
}
