import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { SearchModal } from './components/SearchModal';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ScrollProgressBar } from './components/motion/ScrollProgressBar';
import { CustomCursor } from './components/motion/CustomCursor';
import { useSmoothScroll } from './hooks/useSmoothScroll';

// Keep HomePage eagerly loaded for instant initial render
import { HomePage } from './pages/HomePage';

// Code split all secondary routes to minimize initial bundle size and boost performance
const ShopPage = React.lazy(() => import('./pages/ShopPage').then((m) => ({ default: m.ShopPage })));
const ProductDetailPage = React.lazy(() => import('./pages/ProductDetailPage').then((m) => ({ default: m.ProductDetailPage })));
const CartPage = React.lazy(() => import('./pages/CartPage').then((m) => ({ default: m.CartPage })));
const CheckoutPage = React.lazy(() => import('./pages/CheckoutPage').then((m) => ({ default: m.CheckoutPage })));
const OrderSuccessPage = React.lazy(() => import('./pages/OrderSuccessPage').then((m) => ({ default: m.OrderSuccessPage })));
const WishlistPage = React.lazy(() => import('./pages/WishlistPage').then((m) => ({ default: m.WishlistPage })));
const AboutPage = React.lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const ContactPage = React.lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const AdminPage = React.lazy(() => import('./pages/AdminPage').then((m) => ({ default: m.AdminPage })));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

// Minimalistic loading fallback
const PageFallback: React.FC = () => (
  <div className="flex-1 min-h-[60vh] flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-black/10 dark:border-white/10 border-t-[#C6F432] animate-spin" />
  </div>
);

// Scroll to top on route change helper with Lenis integration
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    if ((window as any).__lenis) {
      (window as any).__lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [pathname]);
  return null;
};

// Global Toast Banner
const GlobalToast: React.FC = () => {
  const { toastMessage } = useCart();
  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
      <div className="bg-[#111111] dark:bg-[#F7F7F5] text-white dark:text-[#111111] px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10 dark:border-black/10 text-xs font-semibold">
        <span className="w-2 h-2 rounded-full bg-[#C6F432] dark:bg-black" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};

const AppContent: React.FC = () => {
  // Initialize desktop inertia smooth scrolling (Lenis)
  useSmoothScroll();
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F5] dark:bg-[#111111] text-[#111111] dark:text-[#F7F7F5] transition-colors duration-200">
      {/* Scroll Progress & Custom Cursor (desktop only) */}
      <ScrollProgressBar />
      <CustomCursor />
      <ScrollToTop />

      <Navbar />

      <main className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 flex flex-col"
          >
            <Suspense fallback={<PageFallback />}>
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-success/:orderId" element={<OrderSuccessPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />

      {/* Global Overlays & Drawers */}
      <CartDrawer />
      <QuickViewModal />
      <SizeGuideModal />
      <SearchModal />
      <GlobalToast />
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
