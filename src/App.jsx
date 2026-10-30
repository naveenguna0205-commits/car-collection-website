import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { CarProvider } from './context/CarProvider';
import { ScrollToTop } from './components/common/ScrollToTop';
import { Header } from './components/common/Header';
import { Footer } from './components/footer/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { PageTransition } from './components/common/PageTransition';
import { ModuleProgressBar } from './components/common/ModuleProgressBar';

// Dedicated Website Pages
import { HomePage } from './pages/HomePage';
import { CollectionPage } from './pages/CollectionPage';
import { CarDetailsPage } from './pages/CarDetailsPage';
import { BrandsPage } from './pages/BrandsPage';
import { ComparePage } from './pages/ComparePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { TestDrivePage } from './pages/TestDrivePage';
import { WishlistPage } from './pages/WishlistPage';

// Interactive Overlays
import { CarDetailsModal } from './components/details/CarDetailsModal';
import { CarCompareModal } from './components/comparison/CarCompareModal';
import { WishlistDrawer } from './components/wishlist/WishlistDrawer';
import { TestDriveModal } from './components/booking/TestDriveModal';

const AppContent = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-carbon-950 text-neutral-100 font-sans selection:bg-amber-500 selection:text-black flex flex-col justify-between relative overflow-x-hidden">
      {/* Sleek top ambient module change indicator */}
      <ModuleProgressBar />

      <ScrollToTop />
      
      {/* Global Header Navigation */}
      <Header />

      {/* Main Website Page Routing with Module-to-Module Animations */}
      <main className="flex-1 pt-20 flex flex-col">
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
            <Route path="/collection" element={<PageTransition><CollectionPage /></PageTransition>} />
            <Route path="/car/:id" element={<PageTransition><CarDetailsPage /></PageTransition>} />
            <Route path="/brands" element={<PageTransition><BrandsPage /></PageTransition>} />
            <Route path="/compare" element={<PageTransition><ComparePage /></PageTransition>} />
            <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
            <Route path="/faq" element={<PageTransition><FaqPage /></PageTransition>} />
            <Route path="/wishlist" element={<PageTransition><WishlistPage /></PageTransition>} />
            <Route path="/test-drive" element={<PageTransition><TestDrivePage /></PageTransition>} />
            <Route path="*" element={<PageTransition><HomePage /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Persistent Interactive Overlays & Drawers */}
      <CarDetailsModal />
      <CarCompareModal />
      <WishlistDrawer />
      <TestDriveModal />
      <ToastContainer />
    </div>
  );
};

export const App = () => {
  return (
    <BrowserRouter>
      <CarProvider>
        <AppContent />
      </CarProvider>
    </BrowserRouter>
  );
};

export default App;
