import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import ShopAll from './components/ShopAll';
import ProductDetails from './components/ProductDetails';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/PageTransition';
import CustomCursor from './components/CustomCursor';
import { useCartStore } from './store/useCartStore';
import MenuOverlay from './components/MenuOverlay';
import CartDrawer from './components/CartDrawer';
import DropCountdown from './components/DropCountdown';
import Checkout from './components/Checkout';
import Preloader from './components/Preloader';
import FeaturedLook from './components/FeaturedLook';
import CategoryGrid from './components/CategoryGrid';
import Newsletter from './components/Newsletter';
// We haven't connected Header to store yet, will do inline or in Header component.
// For now let's just render the CartDrawer

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleNavigate = (view: 'home' | 'shop') => {
    if (view === 'home') navigate('/');
    if (view === 'shop') navigate('/shop');
    setIsMenuOpen(false);
  };

  return (
    <main className="bg-brand-black min-h-screen text-brand-white selection:bg-brand-red selection:text-white relative">
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Header onOpenMenu={() => setIsMenuOpen(true)} />
          <CustomCursor />

          <MenuOverlay
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            currentView={location.pathname === '/shop' ? 'shop' : 'home'}
            onNavigate={handleNavigate}
          />

          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={
                <PageTransition>
                  <Hero />
                  <ProductGrid />
                  <FeaturedLook />
                  <CategoryGrid />
                  <Newsletter />
                </PageTransition>
              } />
              <Route path="/shop" element={
                <PageTransition>
                  <ShopAll />
                </PageTransition>
              } />
              <Route path="/product/:id" element={
                <PageTransition>
                  <ProductDetails />
                </PageTransition>
              } />
              <Route path="/checkout" element={
                <PageTransition>
                  <Checkout />
                </PageTransition>
              } />
            </Routes>
          </AnimatePresence>
          <CartDrawer />
          <DropCountdown />
        </>
      )}
    </main>
  );
}

export default App;
