import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { Product, CartItem, ProductColor } from '../types';
import { PRODUCTS as DEFAULT_PRODUCTS } from '../data/products';

interface CartContextType {
  // Products Management
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  resetProducts: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size: number, color?: ProductColor, quantity?: number) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  
  // Wishlist
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Promo code
  promoCode: string;
  discountPercentage: number;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;

  // Dark Mode
  isDarkMode: boolean;
  toggleDarkMode: () => void;

  // Quick View Modal
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Sizing Modal
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;

  // Search Modal
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Computed Totals
  itemCount: number;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  freeShippingThreshold: number;
  amountForFreeShipping: number;
  taxAmount: number;
  finalTotal: number;

  // Toast notification
  toastMessage: string | null;
  showToast: (message: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_MIN = 100;
const STANDARD_SHIPPING_COST = 10;
const TAX_RATE = 0.07; // 7% standard sales tax

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Dynamic products list stored in localStorage, guaranteed to include all DEFAULT_PRODUCTS
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      // Purge any stale legacy cache that only held the original 8 products
      localStorage.removeItem('stride_custom_products');
      localStorage.removeItem('stride_custom_products_v2');

      const stored = localStorage.getItem('stride_custom_products_v3');
      if (stored) {
        const parsed: Product[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length >= DEFAULT_PRODUCTS.length) {
          const parsedIds = new Set(parsed.map((p) => p.id));
          const hasAllDefaults = DEFAULT_PRODUCTS.every((p) => parsedIds.has(p.id));
          if (hasAllDefaults) return parsed;
        }
      }
    } catch {
      // fallback
    }
    return DEFAULT_PRODUCTS;
  });

  // Cart state persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('stride_cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('stride_wishlist');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Promo code state
  const [promoCode, setPromoCode] = useState<string>(() => {
    return localStorage.getItem('stride_promo') || '';
  });
  const [discountPercentage, setDiscountPercentage] = useState<number>(() => {
    const promo = localStorage.getItem('stride_promo');
    if (promo === 'STRIDE10') return 10;
    if (promo === 'WELCOME15') return 15;
    if (promo === 'RUNFAST20') return 20;
    return 0;
  });

  // Dark mode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('stride_dark_mode');
      if (stored !== null) return stored === 'true';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  // Modal / Drawer state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync products to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('stride_custom_products_v3', JSON.stringify(products));
    } catch {
      // ignore
    }
  }, [products]);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('stride_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('stride_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  // Sync dark mode class to <html> tag
  useEffect(() => {
    try {
      localStorage.setItem('stride_dark_mode', String(isDarkMode));
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch {
      // ignore
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Product CRUD methods
  const addProduct = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
    showToast(`Added "${newProduct.name}" to catalog!`);
  };

  const updateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => (p.id === updated.id ? updated : p)));
    showToast(`Updated "${updated.name}" successfully!`);
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    // Also remove from cart and wishlist if present
    setCart(prev => prev.filter(item => item.productId !== productId));
    setWishlist(prev => prev.filter(id => id !== productId));
    showToast('Product removed from catalog.');
  };

  const resetProducts = () => {
    setProducts(DEFAULT_PRODUCTS);
    try {
      localStorage.removeItem('stride_custom_products');
      localStorage.removeItem('stride_custom_products_v2');
      localStorage.setItem('stride_custom_products_v3', JSON.stringify(DEFAULT_PRODUCTS));
    } catch {}
    showToast('Catalog reset to full 16 models.');
  };

  const addToCart = (product: Product, size: number, color?: ProductColor, quantity = 1) => {
    const chosenColor = color || product.colors[0];
    const itemId = `${product.id}-${chosenColor.name}-${size}`;
    const imageToUse = chosenColor.image || product.images[0];

    setCart(prev => {
      const existing = prev.find(item => item.id === itemId);
      if (existing) {
        return prev.map(item =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [
          ...prev,
          {
            id: itemId,
            productId: product.id,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            selectedColor: chosenColor,
            selectedSize: size,
            sizeUnit: 'US',
            image: imageToUse,
            quantity,
            category: product.category,
          }
        ];
      }
    });

    showToast(`Added ${product.name} (US ${size}) to cart`);
    setIsCartOpen(true);
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.id === itemId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
    showToast('Item removed from cart');
  };

  const clearCart = () => {
    setCart([]);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen(prev => !prev);

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to wishlist');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const applyPromoCode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'STRIDE10') {
      setPromoCode(cleanCode);
      setDiscountPercentage(10);
      localStorage.setItem('stride_promo', cleanCode);
      showToast('10% discount applied!');
      return { success: true, message: '10% discount applied successfully' };
    }
    if (cleanCode === 'WELCOME15') {
      setPromoCode(cleanCode);
      setDiscountPercentage(15);
      localStorage.setItem('stride_promo', cleanCode);
      showToast('15% welcome discount applied!');
      return { success: true, message: '15% welcome discount applied successfully' };
    }
    if (cleanCode === 'RUNFAST20') {
      setPromoCode(cleanCode);
      setDiscountPercentage(20);
      localStorage.setItem('stride_promo', cleanCode);
      showToast('20% speed discount applied!');
      return { success: true, message: '20% speed discount applied successfully' };
    }
    return { success: false, message: 'Invalid promo code. Try STRIDE10 or WELCOME15' };
  };

  const removePromoCode = () => {
    setPromoCode('');
    setDiscountPercentage(0);
    localStorage.removeItem('stride_promo');
    showToast('Promo code removed');
  };

  // Calculations
  const itemCount = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);

  const subtotal = useMemo(() => cart.reduce((acc, item) => acc + item.price * item.quantity, 0), [cart]);

  const discountAmount = useMemo(() => {
    if (discountPercentage <= 0) return 0;
    return Math.round((subtotal * (discountPercentage / 100)) * 100) / 100;
  }, [subtotal, discountPercentage]);

  const shippingFee = useMemo(() => {
    if (subtotal === 0) return 0;
    return subtotal >= FREE_SHIPPING_MIN ? 0 : STANDARD_SHIPPING_COST;
  }, [subtotal]);

  const amountForFreeShipping = useMemo(() => {
    return Math.max(0, FREE_SHIPPING_MIN - subtotal);
  }, [subtotal]);

  const taxAmount = useMemo(() => {
    const taxableAmount = Math.max(0, subtotal - discountAmount);
    return Math.round(taxableAmount * TAX_RATE * 100) / 100;
  }, [subtotal, discountAmount]);

  const finalTotal = useMemo(() => {
    if (subtotal === 0) return 0;
    return Math.max(0, Math.round((subtotal - discountAmount + shippingFee + taxAmount) * 100) / 100);
  }, [subtotal, discountAmount, shippingFee, taxAmount]);

  return (
    <CartContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProducts,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        wishlist,
        toggleWishlist,
        isInWishlist,
        promoCode,
        discountPercentage,
        applyPromoCode,
        removePromoCode,
        isDarkMode,
        toggleDarkMode,
        quickViewProduct,
        setQuickViewProduct,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        isSearchOpen,
        setIsSearchOpen,
        itemCount,
        subtotal,
        discountAmount,
        shippingFee,
        freeShippingThreshold: FREE_SHIPPING_MIN,
        amountForFreeShipping,
        taxAmount,
        finalTotal,
        toastMessage,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
