export type CategoryType = 'Running' | 'Lifestyle' | 'Basketball' | 'Recovery';
export type GenderType = 'Men' | 'Women' | 'Unisex';
export type TagType = 'new' | 'bestseller' | 'sale';

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  verified: boolean;
  title: string;
  comment: string;
  shoeSize: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  category: CategoryType;
  gender: GenderType;
  colors: ProductColor[];
  sizes: number[]; // US sizes (e.g. 6, 6.5, 7, ..., 12)
  images: string[];
  rating: number;
  reviewCount: number;
  description: string;
  features: string[];
  specs: {
    weight: string;
    drop: string;
    cushioning: string;
    terrain: string;
  };
  tags: TagType[];
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  inStock: boolean;
}

export interface CartItem {
  id: string; // unique item key: productId + color + size
  productId: string;
  name: string;
  price: number;
  originalPrice?: number;
  selectedColor: ProductColor;
  selectedSize: number;
  sizeUnit: 'US' | 'UK' | 'EU';
  image: string;
  quantity: number;
  category: CategoryType;
}

export interface FilterState {
  category: CategoryType | 'All';
  gender: GenderType | 'All';
  size: number | null;
  colorHex: string | null;
  priceRange: [number, number];
  tags: TagType | 'All';
  searchQuery: string;
  sortBy: 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating';
}

export interface CheckoutFormData {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  shippingMethod: 'standard' | 'express';
  paymentMethod: 'card' | 'apple_pay' | 'google_pay';
  cardNumber: string;
  cardExp: string;
  cardCvc: string;
  cardName: string;
}

export interface PlacedOrder {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: CheckoutFormData;
  createdAt: string;
  estimatedDelivery: string;
}
