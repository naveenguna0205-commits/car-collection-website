import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCar } from '../../context/CarContext';
import { ArrowUp } from 'lucide-react';

export const Footer = () => {
  const { addToast } = useCar();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    addToast('success', 'Subscribed to Sovereign Dispatch', 'You will receive confidential allocations before public release.');
    setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-carbon-950 border-t border-white/10 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-14">
        
        {/* Newsletter Banner - Symmetrical H-12 Elements */}
        <div className="p-8 sm:p-10 rounded-3xl bg-neutral-900/80 border border-amber-500/30 shadow-glow-gold grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-2">
            <span className="text-[10px] font-mono uppercase font-bold px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400">
              PRIVATE CLIENT CIRCLE
            </span>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
              Subscribe to The Sovereign Dispatch
            </h3>
            <p className="text-neutral-400 text-xs sm:text-sm font-sans">
              Receive embargoed notifications of incoming unicorn hypercar allocations 48 hours prior to global public listing.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="lg:col-span-5 flex flex-col sm:flex-row gap-2.5">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your VIP email address..."
              className="flex-1 h-12 px-4 rounded-xl bg-neutral-950 border border-white/15 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-amber-400 font-sans"
            />
            <button
              type="submit"
              className="h-12 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-display font-bold text-xs uppercase tracking-wider shadow-glow-gold transition-all whitespace-nowrap"
            >
              Join Vault
            </button>
          </form>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pt-6">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center p-0.5">
                <div className="w-full h-full bg-carbon-950 rounded-[10px] flex items-center justify-center">
                  <span className="font-cinzel font-bold text-lg text-amber-400">A</span>
                </div>
              </div>
              <span className="font-display font-black text-xl tracking-[0.18em] text-white">
                AURA MOTORS
              </span>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm font-sans">
              The premier automotive gallery and investment vault. Curating the world's most distinguished hypercars, supercars, and coachbuilt icons with certified provenance and global white-glove air transport.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>SHOWROOMS OPEN • MONACO • DUBAI • LONDON</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 font-mono">
            <div className="text-xs uppercase tracking-wider text-neutral-200 font-bold">
              Collections
            </div>
            <ul className="space-y-2 text-xs text-neutral-400 font-sans">
              <li><Link to="/collection?category=Hypercar" className="hover:text-amber-400 transition-colors">Hypercars & Megacars</Link></li>
              <li><Link to="/collection?category=Supercar" className="hover:text-amber-400 transition-colors">Track Weapons (GT3 RS)</Link></li>
              <li><Link to="/collection?category=Grand%20Tourer" className="hover:text-amber-400 transition-colors">Grand Tourers & V12s</Link></li>
              <li><Link to="/collection?category=Luxury%20SUV" className="hover:text-amber-400 transition-colors">Ultra-Luxury SUVs</Link></li>
              <li><Link to="/collection" className="hover:text-amber-400 transition-colors">All 12 Curated Exotics</Link></li>
            </ul>
          </div>

          {/* Client Tools */}
          <div className="space-y-3 font-mono">
            <div className="text-xs uppercase tracking-wider text-neutral-200 font-bold">
              Client Tools
            </div>
            <ul className="space-y-2 text-xs text-neutral-400 font-sans">
              <li><Link to="/compare" className="hover:text-cyan-400 transition-colors">Car Comparison Arena</Link></li>
              <li><Link to="/wishlist" className="hover:text-red-400 transition-colors">Saved Vault & Wishlist</Link></li>
              <li><Link to="/test-drive" className="hover:text-amber-400 transition-colors">VIP Test Drive Booking</Link></li>
              <li><Link to="/about" className="hover:text-amber-400 transition-colors">Heritage & Vault Standard</Link></li>
              <li><Link to="/faq" className="hover:text-amber-400 transition-colors">Logistics & Escrow FAQ</Link></li>
            </ul>
          </div>

          {/* Global Salons */}
          <div className="space-y-3 font-mono">
            <div className="text-xs uppercase tracking-wider text-neutral-200 font-bold">
              Salons
            </div>
            <ul className="space-y-2 text-xs text-neutral-400 font-sans">
              <li>Monte Carlo, Monaco</li>
              <li>DIFC Gate, Dubai</li>
              <li>Berkeley Square, London</li>
              <li>Wilshire Blvd, Beverly Hills</li>
              <li>Bahnhofstrasse, Zurich</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-400">
          <div>
            © {new Date().getFullYear()} AURA MOTORS S.A.M. • All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-neutral-200 cursor-pointer">Privacy & NDA Policy</span>
            <span className="hover:text-neutral-200 cursor-pointer">AML / Escrow Terms</span>
            <button
              onClick={scrollToTop}
              className="h-9 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-white/10 transition-colors flex items-center gap-1.5"
              aria-label="Back to top"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
