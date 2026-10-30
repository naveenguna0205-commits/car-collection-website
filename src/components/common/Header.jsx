import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCar } from '../../context/CarContext';
import { CURRENCY_RATES } from '../../utils/formatters';
import { 
  Heart, 
  GitCompare, 
  Menu, 
  X, 
  Globe, 
  ChevronDown, 
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Header = () => {
  const navigate = useNavigate();
  const {
    currency,
    setCurrency,
    wishlistIds,
    setIsWishlistOpen,
    compareIds,
  } = useCar();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Collection', path: '/collection' },
    { label: 'Brands & Classes', path: '/brands' },
    { label: 'Comparison', path: '/compare' },
    { label: 'Heritage', path: '/about' },
    { label: 'Showrooms', path: '/contact' },
    { label: 'FAQ', path: '/faq' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-carbon-950/90 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3'
            : 'bg-gradient-to-b from-carbon-950/95 via-carbon-950/70 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 group select-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 flex items-center justify-center p-0.5 shadow-glow-gold group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
                <div className="w-full h-full bg-carbon-950 rounded-[10px] flex items-center justify-center">
                  <span className="font-cinzel font-black text-lg text-amber-400 leading-none">A</span>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="font-display font-extrabold text-lg sm:text-xl tracking-[0.16em] text-white uppercase leading-none">
                    AURA
                  </span>
                  <span className="text-[9px] sm:text-[10px] uppercase font-mono font-bold px-1.5 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded tracking-widest leading-none">
                    VAULT
                  </span>
                </div>
                <span className="hidden sm:block text-[10px] uppercase tracking-ultra-wide text-neutral-400 font-mono mt-1 leading-none">
                  Automotive Gallery
                </span>
              </div>
            </Link>

            {/* Desktop Navigation with Real Active Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3.5 py-2 text-xs font-display font-semibold uppercase tracking-wider transition-colors relative group rounded-lg ${
                      isActive ? 'text-amber-400 font-bold bg-white/5' : 'text-neutral-300 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{link.label}</span>
                      {isActive ? (
                        <motion.span
                          layoutId="activeNavIndicator"
                          className="absolute bottom-1 left-3.5 right-3.5 h-0.5 bg-amber-400 rounded-full"
                        />
                      ) : (
                        <span className="absolute bottom-1 left-3.5 right-3.5 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Header Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Currency Selector - Desktop Only (Hidden on mobile to keep header clean) */}
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                  className="h-10 flex items-center gap-1.5 px-3 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 border border-white/10 text-xs font-mono text-neutral-200 transition-colors"
                  aria-label="Select currency"
                >
                  <Globe className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span className="font-semibold">{currency}</span>
                  <ChevronDown className="w-3 h-3 text-neutral-400 flex-shrink-0" />
                </button>

                <AnimatePresence>
                  {isCurrencyDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.96 }}
                      className="absolute right-0 mt-2 w-40 rounded-2xl bg-neutral-900/95 backdrop-blur-xl border border-white/15 shadow-2xl py-2 z-50 overflow-hidden"
                    >
                      {Object.keys(CURRENCY_RATES).map((cur) => (
                        <button
                          key={cur}
                          onClick={() => {
                            setCurrency(cur);
                            setIsCurrencyDropdownOpen(false);
                          }}
                          className={`w-full px-3.5 py-2.5 text-left text-xs font-mono flex items-center justify-between hover:bg-neutral-800 transition-colors ${
                            currency === cur ? 'text-amber-400 font-bold bg-amber-500/10' : 'text-neutral-300'
                          }`}
                        >
                          <span>{cur}</span>
                          <span className="text-neutral-500">{CURRENCY_RATES[cur].symbol}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Compare Page Link - Desktop Only */}
              <Link
                to="/compare"
                className="hidden sm:flex h-10 w-10 relative items-center justify-center rounded-xl bg-neutral-900/90 hover:bg-neutral-800 border border-white/10 text-neutral-300 hover:text-white transition-colors flex-shrink-0"
                title="Compare Studio"
                aria-label="View comparison"
              >
                <GitCompare className="w-4 h-4 text-cyan-400" />
                {compareIds.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-500 text-black text-[9px] font-bold rounded-full flex items-center justify-center font-mono">
                    {compareIds.length}
                  </span>
                )}
              </Link>

              {/* Wishlist Link & Drawer Trigger (Visible on all screens) */}
              <Link
                to="/wishlist"
                className="h-10 w-10 relative flex items-center justify-center rounded-xl bg-neutral-900/90 hover:bg-neutral-800 border border-white/10 text-neutral-300 hover:text-white transition-colors group flex-shrink-0"
                title="View Saved Vehicles"
                aria-label="Open wishlist"
              >
                <Heart
                  className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                    wishlistIds.length > 0 ? 'fill-red-500 text-red-500' : 'text-neutral-300'
                  }`}
                />
                {wishlistIds.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center font-mono shadow-glow-red">
                    {wishlistIds.length}
                  </span>
                )}
              </Link>

              {/* VIP Concierge Booking CTA */}
              <Link
                to="/test-drive"
                className="h-10 hidden sm:inline-flex items-center gap-2 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs tracking-wider uppercase transition-all shadow-glow-gold hover:shadow-lg active:scale-95 flex-shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5 fill-black" />
                <span>Book Test Drive</span>
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="h-10 w-10 lg:hidden flex items-center justify-center rounded-xl bg-neutral-900/90 border border-white/10 text-neutral-300 hover:text-white flex-shrink-0"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 w-full sm:w-80 bg-neutral-950/98 backdrop-blur-2xl border-l border-white/10 p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500 text-black flex items-center justify-center font-cinzel font-bold text-lg">
                    A
                  </div>
                  <span className="font-display font-extrabold text-white tracking-widest text-lg">AURA VAULT</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <div className="flex flex-col gap-1.5 py-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.label}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `text-left text-sm font-display font-semibold uppercase tracking-wider py-2.5 px-3 rounded-xl transition-colors flex items-center justify-between ${
                        isActive ? 'text-amber-400 bg-white/5 font-bold' : 'text-neutral-200 hover:text-white hover:bg-white/5'
                      }`
                    }
                  >
                    <span>{link.label}</span>
                    <span className="text-neutral-500 text-sm font-mono">→</span>
                  </NavLink>
                ))}
              </div>

              {/* Currency Selector for Mobile Drawer (Clean Pill Buttons) */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <span className="uppercase tracking-wider">Currency:</span>
                  <span className="text-amber-400 font-bold">{CURRENCY_RATES[currency]?.label || currency}</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {Object.keys(CURRENCY_RATES).map((cur) => (
                    <button
                      key={cur}
                      onClick={() => setCurrency(cur)}
                      className={`h-9 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center ${
                        currency === cur
                          ? 'bg-amber-500 text-black shadow-glow-gold'
                          : 'bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/10'
                      }`}
                    >
                      {cur}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 space-y-3">
              <Link
                to="/test-drive"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold text-sm tracking-wider uppercase text-center shadow-glow-gold flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 fill-black" />
                Book Private Viewing
              </Link>

              <div className="flex items-center justify-center gap-2 text-neutral-400 text-xs font-mono">
                <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                <span>VIP Direct: +377 98 06 20 00</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

