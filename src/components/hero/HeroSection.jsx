import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCar } from '../../context/CarContext';
import { CARS_DATA } from '../../data/cars';
import { formatPrice } from '../../utils/formatters';
import { 
  Sparkles, 
  ArrowRight, 
  Gauge, 
  Zap, 
  Timer, 
  ShieldCheck, 
  Plane, 
  Award,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const HeroSection = () => {
  const { setSelectedCar, openBookingForCar, currency, jumpToSection } = useCar();
  const featuredCars = CARS_DATA.filter((c) => c.isFeatured).slice(0, 4);

  const [activeIndex, setActiveIndex] = useState(0);
  const currentCar = featuredCars[activeIndex] || featuredCars[0];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % featuredCars.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [featuredCars.length]);

  const handleSlideChange = (index) => {
    setActiveIndex(index);
  };

  return (
    <section id="hero" className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 bg-carbon-950">
      {/* Background Image with Smooth Crossfade */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCar.id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${currentCar.heroImage})`,
            }}
          >
            {/* Cinematic Multi-layer Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-carbon-950 via-carbon-950/75 to-carbon-950/45" />
            <div className="absolute inset-0 bg-gradient-to-r from-carbon-950 via-carbon-950/85 to-transparent" />
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-carbon-950/40 to-carbon-950/90" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Ambient Lighting Orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headline, Story & Telemetry */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Badges Row - Clean Horizontally Aligned */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider bg-amber-500/15 border border-amber-500/30 text-amber-300 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                {currentCar.badge || 'Official Vault Allocation'}
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-neutral-300 bg-white/5 border border-white/10 backdrop-blur-md">
                <span>{currentCar.brand}</span>
                <span className="text-neutral-500">•</span>
                <span>{currentCar.modelYear} Edition</span>
              </span>

              <span className="text-xs font-mono text-neutral-400 hidden sm:inline-flex items-center gap-1.5 ml-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Vault: <strong className="text-neutral-200">{currentCar.showroomLocation}</strong>
              </span>
            </div>

            {/* Main Headline & Tagline */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCar.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
                className="space-y-3"
              >
                <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-7xl text-white tracking-tight leading-[1.08] break-words">
                  {currentCar.name}
                </h1>
                
                <p className="text-lg sm:text-xl font-display font-semibold text-amber-300/90 max-w-2xl">
                  {currentCar.tagline}
                </p>

                <p className="text-sm sm:text-base text-neutral-300/80 max-w-2xl leading-relaxed">
                  {currentCar.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Telemetry HUD Grid - Neatly Symmetrical 4-Card Bar */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCar.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, delay: 0.05 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 max-w-3xl pt-2"
              >
                {/* Horsepower */}
                <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-neutral-900/80 border border-white/10 backdrop-blur-md flex flex-col justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-neutral-400 font-mono mb-1">
                    <Zap className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span>OUTPUT</span>
                  </div>
                  <div className="font-display font-black text-xl sm:text-3xl text-white">
                    {currentCar.specs.powerHp} <span className="text-[10px] sm:text-xs font-mono font-medium text-amber-400">BHP</span>
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-neutral-400 font-mono mt-0.5 truncate">
                    {currentCar.specs.powerKw} kW Power
                  </div>
                </div>

                {/* 0-100 Acceleration */}
                <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-neutral-900/80 border border-white/10 backdrop-blur-md flex flex-col justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-neutral-400 font-mono mb-1">
                    <Timer className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    <span>0 - 100 KM/H</span>
                  </div>
                  <div className="font-display font-black text-xl sm:text-3xl text-white">
                    {currentCar.specs.acceleration0to100} <span className="text-[10px] sm:text-xs font-mono font-medium text-cyan-400">SEC</span>
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-neutral-400 font-mono mt-0.5 truncate">
                    Sub-3s Class
                  </div>
                </div>

                {/* Top Speed */}
                <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-neutral-900/80 border border-white/10 backdrop-blur-md flex flex-col justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-neutral-400 font-mono mb-1">
                    <Gauge className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                    <span>TOP SPEED</span>
                  </div>
                  <div className="font-display font-black text-xl sm:text-3xl text-white">
                    {currentCar.specs.topSpeedKmh} <span className="text-[10px] sm:text-xs font-mono font-medium text-red-400">KM/H</span>
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-neutral-400 font-mono mt-0.5 truncate">
                    {Math.round(currentCar.specs.topSpeedKmh * 0.621371)} MPH
                  </div>
                </div>

                {/* Powertrain */}
                <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-neutral-900/80 border border-white/10 backdrop-blur-md flex flex-col justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-neutral-400 font-mono mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span>POWERTRAIN</span>
                  </div>
                  <div className="font-display font-bold text-base sm:text-lg text-white truncate" title={currentCar.specs.engine}>
                    {currentCar.specs.fuelType}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-neutral-400 font-mono truncate mt-0.5">
                    {currentCar.specs.transmission}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Action Buttons - Mobile Stack & Desktop Row */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-2">
              <Link
                to={`/car/${currentCar.id}`}
                className="h-12 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-black font-display font-bold text-xs tracking-wider uppercase transition-all shadow-glow-gold hover:shadow-2xl hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Inspect Specifications</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to={`/test-drive?car=${currentCar.id}`}
                className="h-12 px-6 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 text-white font-display font-semibold text-xs tracking-wider uppercase border border-white/15 backdrop-blur-md transition-all hover:border-amber-400/50 flex items-center justify-center gap-2"
              >
                <span>Private Viewing</span>
              </Link>

            </div>
          </div>

          {/* Right Column: Pricing Card & Slide Selector */}
          <div className="lg:col-span-4 flex flex-col justify-end space-y-5">
            {/* Valuation Card */}
            <div className="p-6 rounded-3xl bg-neutral-900/85 border border-white/15 backdrop-blur-xl shadow-2xl space-y-2">
              <div className="text-xs uppercase font-mono tracking-wider text-neutral-400">
                Collector Vault Valuation
              </div>
              <div className="font-display font-black text-3xl sm:text-4xl text-white">
                {formatPrice(currentCar.priceUsd, currency)}
              </div>
              <div className="text-xs text-neutral-400 font-mono flex items-center gap-2 pt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Duty Paid • Ready for Worldwide Air Dispatch</span>
              </div>
            </div>

            {/* Slide Navigation & Thumbnails */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400 px-1">
                <span className="font-semibold">FEATURED ALLOCATIONS ({activeIndex + 1}/{featuredCars.length})</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleSlideChange((activeIndex - 1 + featuredCars.length) % featuredCars.length)}
                    className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-white/10 text-neutral-300 hover:text-white transition-colors"
                    aria-label="Previous featured vehicle"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleSlideChange((activeIndex + 1) % featuredCars.length)}
                    className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-white/10 text-neutral-300 hover:text-white transition-colors"
                    aria-label="Next featured vehicle"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2.5">
                {featuredCars.map((car, idx) => (
                  <button
                    key={car.id}
                    onClick={() => handleSlideChange(idx)}
                    className={`relative rounded-xl overflow-hidden aspect-[4/3] border transition-all duration-300 text-left ${
                      idx === activeIndex
                        ? 'border-amber-400 ring-2 ring-amber-400/40 scale-105 shadow-glow-gold'
                        : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={car.heroImage}
                      alt={car.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                    <div className="absolute bottom-1.5 left-1.5 right-1.5 text-[10px] font-mono text-white truncate font-medium">
                      {car.brand}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Trust Banner - Balanced 3-Column Symmetrical Bar */}
        <div className="mt-14 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-display font-bold text-white tracking-wide">100% Certified Provenance</div>
              <div className="text-[11px] text-neutral-400 font-sans mt-0.5">Factory verified chassis, logbooks & title</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex-shrink-0">
              <Plane className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-display font-bold text-white tracking-wide">Global Sealed Air Transport</div>
              <div className="text-[11px] text-neutral-400 font-sans mt-0.5">Enclosed delivery to any airport or estate</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex-shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-display font-bold text-white tracking-wide">Confidential Escrow Settlement</div>
              <div className="text-[11px] text-neutral-400 font-sans mt-0.5">Multi-currency wire, CHF, or digital asset</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
